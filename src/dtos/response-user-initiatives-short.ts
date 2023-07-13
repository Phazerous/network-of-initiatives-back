import { ApiProperty } from '@nestjs/swagger';

export default class ResponseUserInitiativesShort {
  @ApiProperty({ example: '25g2d2-dsfsf36-adf735' })
  id: string;

  @ApiProperty({ example: 'Nexus initiatives' })
  title: string;

  @ApiProperty({ example: 2 })
  status: number;
}
