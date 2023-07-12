import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nikita' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Frolov' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Ab12$3456' })
  @IsString()
  password: string;
}
