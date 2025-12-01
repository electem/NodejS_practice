// src/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile,User])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
