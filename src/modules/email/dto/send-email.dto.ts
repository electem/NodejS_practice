// src/modules/email/dto/send-email.dto.ts
import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  template: string; // template string with placeholders like {{name}}, {{orderId}}

  @IsObject()
  payload: Record<string, any>; // key-value to replace placeholders
}
