// src/modules/twilio/twilio.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  /**
   * API to send SMS
   * POST /twilio/send
   */
  @Post('send')
  async sendSms(@Body() sendMessageDto: SendMessageDto) {
    const { phoneNumber, message } = sendMessageDto;
    return await this.twilioService.sendMessage(phoneNumber, message);
  }
}
