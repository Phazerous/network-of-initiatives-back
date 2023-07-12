import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({ example: 'Phazerous' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ab24$1345' })
  @IsString()
  password: string;
}
