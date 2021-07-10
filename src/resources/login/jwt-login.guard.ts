import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtLoginGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const [type, token] = authHeader.split(' ');

      if (type !== 'Bearer' || !token) {
        return false;
      }
      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException({ message: 'User Unauthorized' });
    }
  }
}
