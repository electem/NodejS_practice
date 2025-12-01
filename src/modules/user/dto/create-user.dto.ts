import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Secret@123' })
  @IsString()
  @MinLength(6)
  password: string;
}
