import { ApiProperty } from '@nestjs/swagger';

export class ResponseNotFoundDto {
  @ApiProperty({ example: '404' })
  statusCode: string;

  @ApiProperty({ example: 'Not Found' })
  message: string;
}
