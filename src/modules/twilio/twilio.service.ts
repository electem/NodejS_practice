import { Injectable, Logger } from '@nestjs/common';
import Twilio from 'twilio';
import type { Twilio as TwilioClientType } from 'twilio'; // Import type only

@Injectable()
export class TwilioService {
  private client: TwilioClientType;
  private readonly logger = new Logger(TwilioService.name);

  constructor() {
    // Initialize Twilio client using environment variables
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!,
    );
  }

  /**
   * Send SMS message using Twilio API
   * @param phoneNumber Recipient phone number (with country code)
   * @param message Message body to send
   */
  async sendMessage(phoneNumber: string, message: string): Promise<any> {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: phoneNumber,
      });
      this.logger.log(`Message sent successfully to ${phoneNumber}`);
      return response;
    } catch (error) {
      this.logger.error(`Failed to send message to ${phoneNumber}`, (error as Error).stack);
      throw error;
    }
  }
}
