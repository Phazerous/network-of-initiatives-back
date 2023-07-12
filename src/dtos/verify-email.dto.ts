import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @ApiProperty({ description: 'nphazerous@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'someMagicalVerificationCode' })
  verificationCode: string;
}
