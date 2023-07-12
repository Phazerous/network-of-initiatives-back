import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Nikita' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Frolov' })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({ example: 'Almaty' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Cambridge University' })
  @IsOptional()
  @IsString()
  university?: string;

  @ApiPropertyOptional({ example: '@phazerous' })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiPropertyOptional({ example: `I'm inspried Junior+ FullStack Developer` })
  @IsOptional()
  @IsString()
  about?: string;
}
