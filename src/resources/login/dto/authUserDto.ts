import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    example: 'maxim77',
    description: 'Логин',
  })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    example: '12Khdn!!_ll2',
    description: 'Пароль',
  })
  @IsNotEmpty()
  login!: string;
}
