import { ApiProperty } from '@nestjs/swagger';

export default class ResponseInitiativeApplicationShortDto {
  @ApiProperty({ example: 'bfgs4-sdv353-vs646' })
  id: string;

  @ApiProperty({ example: { name: 'Nikita', lastname: 'Frolov' } })
  applier: {
    name: string;
    lastname: string;
  };

  @ApiProperty({ example: 2 })
  status: number;
}
