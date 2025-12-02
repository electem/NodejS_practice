// src/modules/email/email.scheduler.ts

// Import necessary decorators and classes from NestJS
import { Injectable } from '@nestjs/common'; // Allows the class to be injected as a service
import { Cron, CronExpression } from '@nestjs/schedule'; // For scheduling tasks
import { EmailService } from './email.service'; // Service that handles email logic

// @Injectable() makes this class available for dependency injection
@Injectable()
export class EmailScheduler {
  // Inject the EmailService so we can use its methods
  constructor(private emailService: EmailService) {}

  /**
   * @Cron decorator schedules a task to run periodically.
   * CronExpression.EVERY_MINUTE => This task runs every minute.
   * handleCron() is the function executed on every schedule tick.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    // Get all emails that are pending to be sent from the EmailService
    const pendingEmails = await this.emailService.getPendingEmails();

    // Loop through each pending email
    for (const email of pendingEmails) {
      // Send each email using the EmailService
      // Await ensures emails are sent one by one sequentially
      await this.emailService.sendEmail(email);
    }

    // Optional: You can add a log here to see when the scheduler runs
    // console.log(`${pendingEmails.length} emails processed at ${new Date().toISOString()}`);
  }
}
