// src/modules/email/email.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailScheduler } from './email.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService, EmailScheduler],
  controllers: [EmailController],
  exports: [EmailService,EmailScheduler],
})
export class EmailModule {}
