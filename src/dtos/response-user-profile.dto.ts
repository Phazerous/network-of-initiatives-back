import { ApiProperty } from '@nestjs/swagger';

export default class ResponseUserProfileDto {
  @ApiProperty({ description: 'Nikita' })
  name: string;

  @ApiProperty({ description: 'Frolov' })
  lastname: string;

  @ApiProperty({ description: 'Cambridge University' })
  university: string;

  @ApiProperty({ description: 'Moscow' })
  location: string;

  @ApiProperty({ description: '@phazerous' })
  contact: string;

  @ApiProperty({ description: 'NestJS and NextJS kinda crazy' })
  about: string;
}
