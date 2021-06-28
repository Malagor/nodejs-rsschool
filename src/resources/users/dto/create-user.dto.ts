export class CreateUserDto {
  readonly id: string;
  readonly name: string;
  readonly login: string;
  readonly password: string;

  constructor(user: CreateUserDto) {
    this.id = user.id;
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  static toResponse(user: CreateUserDto): Partial<CreateUserDto> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
