import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { TokenDto } from '../login/dto/tokenDto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string): Promise<User | null> {
    const user = await this.usersService.getOneByLogin(login);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<TokenDto> {
    const payload = { username: user.id, sub: user.login };
    return {
      message: 'User Authorized',
      token: this.jwtService.sign(payload),
    };
  }
}
