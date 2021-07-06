import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(5, 25)
  login!: string;

  name!: string;

  password!: string;
}
