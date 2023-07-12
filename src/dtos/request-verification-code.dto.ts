import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class RequestVerificationCodeDto {
  @IsEmail()
  @ApiProperty({ example: 'nphazerous@gmail.com' })
  email: string;
}
