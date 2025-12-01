// src/modules/email/email.scheduler.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from './email.service';

@Injectable()
export class EmailScheduler {
  constructor(private emailService: EmailService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const pendingEmails = await this.emailService.getPendingEmails();

    for (const email of pendingEmails) {
      await this.emailService.sendEmail(email);
    }
  }
}
