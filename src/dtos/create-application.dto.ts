import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export default class CreateApplicationDto {
  @ApiProperty({
    example: `I am a passionate individual with a strong background in painting. My passion for painting has honed my creativity skills and allowed me to think outside the box. I am excited to apply my skills and contribute to your project`,
  })
  @IsString()
  about: string;

  @ApiPropertyOptional({
    example: ['DevOps', 'FullStack', 'Productivity Consultant'],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  roles?: number[];
}
