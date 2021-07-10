import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  // Res,
  // Res
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from './dto/authUserDto';
import { TokenDto } from './dto/tokenDto';
import { LoginService } from './login.service';

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

    try {
      const result = await this.loginService.login(login, password);
      response.setHeader('authorization', `Bearer ${result.token}`);
      return result;
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.FORBIDDEN);
    }
  }
}
