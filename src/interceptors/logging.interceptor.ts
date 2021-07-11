import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import chalk from 'chalk';
import { currentTime } from '../helpers/currentTime';
import { coloredStatusCode } from '../helpers/coloredSratusCode';
// import { coloredStatusCode } from '../helpers/coloredSratusCode';
// import fs, { appendFileSync } from 'fs';
// import path from 'path';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url, body, query } = req;

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const curTime = currentTime();
        const { statusCode } = res;

        if (body && body.password) {
          body.password = '******';
        }

        const strForConsole = `[log] ${curTime} ${chalk.blue(
          method
        )} url:${url} query:${JSON.stringify(query)} body:${JSON.stringify(
          body || {}
        )} code:${coloredStatusCode(statusCode)} [${end - start}ms]`;

        process.stdout.write(`${strForConsole}\n`);
      })
    );
  }
}
