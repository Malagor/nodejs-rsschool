import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
// import { UserService } from '../users/user.service';
import { UserModule } from '../users/user.module';

@Module({
  providers: [],
  controllers: [LoginController],
  imports: [UserModule],
})
export class LoginModule {}
