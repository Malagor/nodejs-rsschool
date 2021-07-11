import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: '18af7b72-ea23-43fb-864d-0eca2d682b08',
    description: 'Уникальный ID',
  })
  id?: string;

  @ApiProperty({
    example: 'Big Maxim',
    description: 'Имя пользователя',
  })
  name?: string;

  @ApiProperty({
    example: 'maxim77',
    description: 'Логин',
  })
  login?: string;

  @ApiProperty({
    example: '324dfsaDSF',
    description: 'Пароль',
  })
  password?: string;
}
