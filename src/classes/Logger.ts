import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import { appendFile } from 'fs';
import chalk from 'chalk';
import { coloredStatusCode } from '../common/coloredSratusCode';
import { currentTime } from '../common/currentTime';

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url, body, query } = req;

  const start = Date.now();

  next();

  finished(res, () => {
    const end = Date.now();
    const curTime = currentTime();
    const { statusCode } = res;

    const strForConsole = `[log] ${curTime} ${chalk.blue(
      method
    )} url:${url} query:${JSON.stringify(query)} body:${JSON.stringify(
      body
    )} code:${coloredStatusCode(statusCode)} [${end - start}ms]`;

    const strForFile = `${curTime} ${method} url:${url} query:${JSON.stringify(
      query
    )} body:${JSON.stringify(body)} code:${statusCode} [${end - start}ms]`;

    process.stdout.write(`${strForConsole}\n`);

    appendFile(
      './src/queries.log',
      `${strForFile}\n`,
      { flag: 'a', encoding: 'utf-8' },
      (err) => {
        if (err) {
          const errStr = JSON.stringify(err);
          process.stderr.write(
            `${chalk.red('[error]')} Can not write log file ${errStr}\n`
          );
        }
      }
    );
  });
};