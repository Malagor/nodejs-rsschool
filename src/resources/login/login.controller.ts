import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CustomError } from '../../middlewares/errorHandler';
import { AuthUserDto } from './dto/authUserDto';
import { TokenDto } from './dto/tokenDto';
import { UserService } from '../users/user.service';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line class-methods-use-this
  checkUser(@Body() authUserDto: AuthUserDto): Promise<TokenDto> {
    const { login, password } = authUserDto;

    if (!login || !password) {
      throw new CustomError(HttpStatus.BAD_REQUEST, `No Login or password`);
    }
    return this.userService.getByLogin(login, password);
    // return Promise.resolve({
    //   message: 'User authorized',
    //   token: 'token',
    // });
  }
}
