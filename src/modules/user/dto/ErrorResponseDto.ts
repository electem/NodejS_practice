import { ApiProperty } from '@nestjs/swagger';

export class UserErrorResponseDto {
  @ApiProperty({ example: ['password must be longer than or equal to 6 characters'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
