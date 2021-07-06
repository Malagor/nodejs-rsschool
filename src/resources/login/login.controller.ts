import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  // Res
} from '@nestjs/common';
import { Response } from 'express';
import { AuthUserDto } from './dto/authUserDto';
import { TokenDto } from './dto/tokenDto';
import { LoginService } from './login.service';
import { QueryAnswers } from '../../constants';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async checkUser(
    @Body() authUserDto: AuthUserDto,
    @Req() response: Response
  ): Promise<TokenDto> {
    const { login, password } = authUserDto;
    const result = await this.loginService.getByLogin(login, password);

    if (result === QueryAnswers.FORBIDDEN) {
      throw new ForbiddenException('Login or/and password is uncorrected');
    }
    response.header('authorization', `Bearer ${result.token}`);

    return result;
  }
}
