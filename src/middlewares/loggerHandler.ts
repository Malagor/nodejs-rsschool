import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import fs, { appendFileSync } from 'fs';
import chalk from 'chalk';
import path from 'path';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { coloredStatusCode } from '../helpers/coloredSratusCode';
import { currentTime } from '../helpers/currentTime';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // eslint-disable-next-line class-methods-use-this
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url, body, query } = req;

    const start = Date.now();

    next();

    finished(res, () => {
      const end = Date.now();
      const curTime = currentTime();
      const { statusCode } = res;

      if (body.password) {
        body.password = '******';
      }

      const strForConsole = `[log] ${curTime} ${chalk.blue(
        method
      )} url:${url} query:${JSON.stringify(query)} body:${JSON.stringify(
        body
      )} code:${coloredStatusCode(statusCode)} [${end - start}ms]`;

      const strForFile = `${curTime} ${method} url:${url} query:${JSON.stringify(
        query
      )} body:${JSON.stringify(body)} code:${statusCode} [${end - start}ms]`;

      process.stdout.write(`${strForConsole}\n`);

      fs.mkdir(path.join(__dirname, '../logs/'), (error) => {
        if (error && error.code !== 'EEXIST') {
          process.stderr.write('Catalog have not been created');
        }
      });
      appendFileSync(
        path.join(__dirname, '../logs/queries.log'),
        `${strForFile}\n`,
        {
          flag: 'a',
          encoding: 'utf-8',
        }
      );
    });
  }
}
