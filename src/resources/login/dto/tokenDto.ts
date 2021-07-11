import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example: 'User Authorized',
    description: 'Информационное сообщение',
  })
  message!: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhYTkyZTczLTdkMTYtNGE0ZC1iZjI2LWY3Y2M1MTI3MDA1OSIsImxvZ2luIjoiYWRtaW4iLCJpYXQiOjE2MjU5MDc4OTMsImV4cCI6MTYyNTk5NDI5M30.uizCfYH5kXytZpdSldC3SzEqiGPAFdZ5YPkieeFSCOQ',
    description: 'Токен',
  })
  token!: string;
}
