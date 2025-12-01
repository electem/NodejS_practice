import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserResponseDto } from './dto/UserResponseDto';
import { UserErrorResponseDto } from './dto/ErrorResponseDto';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name); // Logger instance

  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserResponseDto,  // Swagger reads example from DTO properties
  })
  @ApiBadRequestResponse({ type: UserErrorResponseDto, description: 'Invalid request data' })
  async create(@Body() dto: CreateUserDto) {
    this.logger.log(`Creating new user with email: ${dto.email}`);
    const result = await this.userService.create(dto);
    this.logger.log(`User created with ID: ${result.id}`);
    return result;
  }

  // Protected route
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req) {
    this.logger.log(`Fetching all users, requested by: ${req.user?.email || 'unknown'}`);
    const users = await this.userService.findAll();
    this.logger.log(`Total users fetched: ${users.length}`);
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
    } else {
      this.logger.log(`User found: ${user.email}`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log(`Deleting user with ID: ${id}`);
    const result = await this.userService.remove(Number(id));
    this.logger.log(`User with ID ${id} deleted successfully`);
    return result;
  }
}
