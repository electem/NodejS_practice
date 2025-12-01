// src/profile/profile.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request, Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);

  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProfileDto) {
    this.logger.log(`Creating profile for user ID: ${dto.userId}`);
    return this.profileService.create(dto.userId, dto);
  }



  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Fetching profile ID ${id}`);
    return this.profileService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
    this.logger.log(`Updating profile ID ${id}`);
    return this.profileService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log(`Deleting profile ID ${id}`);
    return this.profileService.remove(Number(id));
  }
}
