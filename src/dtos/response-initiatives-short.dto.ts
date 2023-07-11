import { ApiProperty } from '@nestjs/swagger';

export class ResponseInitiativesShortDto {
  @ApiProperty({ example: 'bb4f9b06-2011-11ee-be56-0242ac120002' })
  id: string;

  @ApiProperty({ example: 'Nexus Initiative' })
  title: string;

  @ApiProperty({ example: ['DevOps', 'Backend', 'Frontend'] })
  roles: string[];
}
