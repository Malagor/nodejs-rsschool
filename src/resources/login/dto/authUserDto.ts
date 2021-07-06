import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  login!: string;
}
