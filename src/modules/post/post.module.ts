// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User } from '../user/user.entity';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post, User]),EmailModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
