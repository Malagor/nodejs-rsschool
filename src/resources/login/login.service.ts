import { Injectable } from '@nestjs/common';
import { TokenDto } from './dto/tokenDto';
import { UserService } from '../users/user.service';
import { QueryAnswers } from '../../constants';

@Injectable()
export class LoginService {
  constructor(private userService: UserService) {}

  async getByLogin(
    login: string,
    password: string
  ): Promise<TokenDto | QueryAnswers.FORBIDDEN> {
    return this.userService.getByLogin(login, password);
  }
}
