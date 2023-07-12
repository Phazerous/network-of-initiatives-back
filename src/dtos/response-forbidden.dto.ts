import { ApiProperty } from '@nestjs/swagger';

export class ResponseForbiddenDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
