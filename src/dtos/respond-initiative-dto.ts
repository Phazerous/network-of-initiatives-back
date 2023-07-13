import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class RespondInitiativeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  status: number;

  @ApiProperty({ example: 'Excellent initiative, lets go' })
  @IsString()
  moderatorComment: string;
}
