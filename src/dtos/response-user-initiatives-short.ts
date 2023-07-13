import { ApiProperty } from '@nestjs/swagger';

export default class ResponseUserInitiativesShort {
  @ApiProperty({ description: '25g2d2-dsfsf36-adf735' })
  id: string;

  @ApiProperty({ description: 'Nexus initiatives' })
  title: string;

  @ApiProperty({ description: 'Rejected' })
  status: string;
}
