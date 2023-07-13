import { ApiProperty } from '@nestjs/swagger';

export default class ResponseInitaitiveStatusDto {
  @ApiProperty({ example: '2567-363sdfhsdjfs-7f83f-2f4' })
  id: string;
  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({ example: 'You are approved' })
  moderatorComment: string;

  @ApiProperty({ example: 'Nexus Initiative' })
  title: string;
}
