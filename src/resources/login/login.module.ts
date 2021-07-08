import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from '../users/user.module';
import { env } from '../../common/config';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
  imports: [
    UserModule,
    // PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: env.EXPIRES_TIME_SEC },
    }),
  ],
})
export class LoginModule {}
