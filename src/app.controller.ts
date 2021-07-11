import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { LocalAuthGuard } from './resources/auth/local-auth.guard';
// import { AuthService } from './resources/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService // private authService: AuthService
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req: Request) {
  //   return this.authService.login(req.user);
  // }

  @Get()
  get(): string {
    return this.appService.get();
  }
}

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}
//
//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   // eslint-disable-next-line class-methods-use-this
//   async login(@Request() req: Request): Promise<Request> {
//     return req.user;
//   }
//
//   // @Controller()
//   // export class AppController {
//   //   constructor(private readonly appService: AppService) {}
//   //
//   @Get()
//   get(): string {
//     return this.appService.get();
//   }
// }
