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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from './dto/authUserDto';
import { TokenDto } from './dto/tokenDto';
import { LoginService } from './login.service';
import { QueryAnswers } from '../../constants';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Получение токена пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: TokenDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  async checkUser(
    @Body() authUserDto: AuthUserDto,
    @Req() response: Response
  ): Promise<TokenDto> {
    const { login, password } = authUserDto;
    const result = await this.loginService.login(login, password);

    if (result === QueryAnswers.FORBIDDEN) {
      throw new ForbiddenException('Login or/and password is uncorrected');
    }
    response.header('authorization', `Bearer ${result.token}`);

    return result;
  }
}
