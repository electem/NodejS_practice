// src/post/dto/create-post.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'My first post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Post content', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
