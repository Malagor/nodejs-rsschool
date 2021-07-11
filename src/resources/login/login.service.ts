import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/tokenDto';
import { UserService } from '../users/user.service';
import { checkHash } from '../../helpers/bcryptHash';
import { UserNotFoundError } from '../users/errors/user-not-found.error';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(login: string, password: string): Promise<TokenDto> {
    const user = await this.userService.getByLogin(login);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isCorrectPass = checkHash(password, user.password ?? '');

    if (!isCorrectPass) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ id: user.id, login: user.login });
    return { message: 'User Authorized', token };
  }
}
