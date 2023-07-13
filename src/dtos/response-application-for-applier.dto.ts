import { ApiProperty } from '@nestjs/swagger';

export default class ResponseApplicationForApplierDto {
  @ApiProperty({ example: 'I want to join' })
  about: string;

  @ApiProperty({ example: 0 })
  status: number;

  @ApiProperty({ example: 'We would like to see you in here' })
  answer: string;

  @ApiProperty({
    example: {
      title: 'Nexus Initiative',
    },
  })
  initiative: {
    title: string;
  };
}
