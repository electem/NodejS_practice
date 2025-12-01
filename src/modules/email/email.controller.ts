// src/modules/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('queue')
  create(@Body() dto: SendEmailDto) {
    return this.emailService.createEmail(dto);
  }
}
