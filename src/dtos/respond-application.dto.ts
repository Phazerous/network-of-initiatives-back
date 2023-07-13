import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class RespondApplicationDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  status: number;

  @ApiProperty({ example: 'We need a person with more commercial experience' })
  @IsString()
  answer: string;
}
