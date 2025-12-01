import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '9876543210', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '123 Main Street', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
