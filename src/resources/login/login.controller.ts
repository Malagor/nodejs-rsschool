import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
  async checkUser(@Body() authUserDto: AuthUserDto): Promise<TokenDto> {
    const { login, password } = authUserDto;

    try {
      return await this.loginService.login(login, password);
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.FORBIDDEN);
    }
  }
}
