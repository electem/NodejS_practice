// src/post/post.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Posts')
@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postService.remove(Number(id));
  }
}
