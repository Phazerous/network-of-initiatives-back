import { ApiProperty } from '@nestjs/swagger';

export default class ResponseApplicationForInitiatorDto {
  @ApiProperty({ example: 'Passionated developer' })
  about: string;

  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({
    example: {
      name: 'Nikita',
      lastname: 'Frolov',
      location: 'Moscow',
      university: 'Cambridge University',
      contact: '@phazerous',
      about: 'Description about me is...',
    },
  })
  applier: {
    name: string;
    lastname: string;
    location: string;
    university: string;
    contact: string;
    about: string;
  };
}
