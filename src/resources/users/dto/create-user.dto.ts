import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Maxim',
    description: 'Имя пользователя',
  })
  name!: string;

  @ApiProperty({
    example: 'maxim77',
    description: 'Логин',
  })
  @Length(5, 25)
  login!: string;

  @ApiProperty({
    example: '12Khdn!!_ll2',
    description: 'Пароль',
  })
  password!: string;
}
