// src/modules/twilio/dto/send-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {

  @ApiProperty({ example: '+919391826986', required: true })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Hi', required: true })
  @IsNotEmpty()
  @IsString()
  message: string;
}
