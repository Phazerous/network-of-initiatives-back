import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateInitiativeDto {
  @ApiProperty({ example: 'Nexus Initiative' })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    example: `Saint Petersburg`,
  })
  @IsString()
  @MinLength(2)
  location: string;

  @ApiProperty({
    example: `In active development`,
  })
  @IsString()
  @MinLength(2)
  stage: string;

  @ApiPropertyOptional({
    example: `Cambridge University`,
  })
  @IsOptional()
  @IsString()
  university?: string;

  @ApiProperty({
    example: `The Nexus Initiative" is an innovative project that aims to bridge the gap between different technologies and bring them together in a unified ecosystem. With its cutting-edge solutions and collaborative approach, the project seeks to create a seamless integration platform where diverse systems and applications can interact harmoniously. By fostering collaboration and leveraging the power of interconnected technologies, "The Nexus Initiative" opens up endless possibilities for improved efficiency, enhanced communication, and transformative digital experiences`,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: `"The Nexus Initiative is searching for a talented and dedicated technical professional to join their team. As a technical person for the Nexus Initiative, you will play a crucial role in driving the success of this innovative project. You will have the opportunity to contribute your expertise in cutting-edge technologies, working with a diverse range of systems and applications`,
  })
  @IsOptional()
  @IsString()
  searching: string;

  @ApiPropertyOptional({
    example: ['DevOps', 'FullStack', 'Productivity Consultant'],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  roles?: number[];
}
