import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email, EmailStatus } from './email.entity';
import { SendEmailDto } from './dto/send-email.dto';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { emailConfig } from '../../config/email.config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @InjectRepository(Email)
    private emailRepo: Repository<Email>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });
  }

  // ----------------------------
  // STEP 1: Queue Email (PENDING)
  // ----------------------------
  async createEmail(dto: SendEmailDto): Promise<Email> {
    const templateContent = this.loadTemplate(dto.template);
    const replacedBody = this.applyPayload(templateContent, dto.payload);

    const email = this.emailRepo.create({
      to: dto.to,
      subject: dto.subject || 'Notification',
      body: replacedBody,
      status: EmailStatus.PENDING,
    });

    return this.emailRepo.save(email);
  }

  // ----------------------------
  // STEP 2: Load template safely
  // ----------------------------
  private loadTemplate(templateName: string): string {
    // Determine templates folder dynamically
    const basePath = path.resolve(__dirname, 'templates');
    const filePath = path.join(basePath, templateName);

    if (!existsSync(filePath)) {
      console.error(`Template path checked: ${filePath}`);
      throw new NotFoundException(`Template "${templateName}" not found`);
    }

    return readFileSync(filePath, 'utf-8');
  }

  // ----------------------------
  // STEP 3: Replace placeholders
  // ----------------------------
  private applyPayload(template: string, payload: Record<string, any>): string {
    let result = template;

    for (const key in payload) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(regex, payload[key]);
    }

    return result;
  }

  // ----------------------------
  // STEP 4: Scheduler helper
  // ----------------------------
  async getPendingEmails(): Promise<Email[]> {
    return this.emailRepo.find({ where: { status: EmailStatus.PENDING } });
  }

  async updateStatus(id: number, status: EmailStatus) {
    await this.emailRepo.update(id, { status });
  }

  // ----------------------------
  // STEP 5: Send email
  // ----------------------------
  async sendEmail(email: Email) {
    try {
      await this.transporter.sendMail({
        from: emailConfig.from,
        to: email.to,
        subject: email.subject,
        html: email.body,
      });

      await this.updateStatus(email.id, EmailStatus.SENT);
      console.log(`Email sent: ${email.to}`);
    } catch (error) {
      console.error(`Email send failed for ${email.to}:`, error);
      await this.updateStatus(email.id, EmailStatus.FAILED);
    }
  }
}
