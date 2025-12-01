import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { ErrorResponseDto } from './dto/error-response.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Secret@123' })
  @IsString()
  @MinLength(6)
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Success', type: LoginResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid credentials', type: ErrorResponseDto })
  async login(@Body() body: LoginDto) {
    if (!body.email || !body.password) {
      console.log("body",body);

      throw new BadRequestException('email and password are required');
    }

    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService.login({ email: body.email });
  }
}
