import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseInitiativeShortDto {
  @ApiProperty({ example: 'Nexus Initiative' })
  title: string;

  @ApiProperty({
    example: `
  "The Nexus Initiative" is an innovative project that aims to bridge the gap between different technologies and bring them together in a unified ecosystem. With its cutting-edge solutions and collaborative approach, the project seeks to create a seamless integration platform where diverse systems and applications can interact harmoniously. By fostering collaboration and leveraging the power of interconnected technologies, "The Nexus Initiative" opens up endless possibilities for improved efficiency, enhanced communication, and transformative digital experiences`,
  })
  description: string;

  @ApiProperty({
    example: `Saint Petersburg`,
  })
  location: string;

  @ApiProperty({
    example: `Cambridge University`,
  })
  university: string;

  @ApiProperty({
    example: `In active development`,
  })
  stage: string;

  @ApiProperty({
    example: `2023-07-11T22:53:18.308Z`,
  })
  dateOfPublication: string;

  @ApiPropertyOptional({
    example: ['DevOps', 'FullStack', 'Productivity Consultant'],
  })
  roles?: string[];
}
