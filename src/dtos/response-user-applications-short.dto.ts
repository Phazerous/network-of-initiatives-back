import { ApiProperty } from '@nestjs/swagger';

export default class ResponseUserApplicationShort {
  @ApiProperty({ example: 'fw863-f3382-f7582f2' })
  id: string;

  @ApiProperty({ example: { title: 'Nexus Initiative' } })
  initiative: {
    title: string;
  };

  @ApiProperty({ example: 2 })
  status: number;
}
