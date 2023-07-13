import { ApiProperty } from '@nestjs/swagger';

export default class ResponseModeratorInitiativesDto {
  @ApiProperty({ example: 'fsj-53f23-f25' })
  id: string;

  @ApiProperty({ example: 'Nexus Initiative' })
  title: string;
}
