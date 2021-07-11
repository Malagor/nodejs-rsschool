import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
// eslint-disable-next-line import/no-cycle
import { UserModule } from '../users/user.module';
import { env } from '../../common/config';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: env.EXPIRES_TIME_SEC },
    }),
  ],
  exports: [LoginService, JwtModule],
})
export class LoginModule {}
