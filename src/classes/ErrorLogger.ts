import chalk from 'chalk';
import { appendFileSync } from 'fs';
import { currentTime } from '../common/currentTime';
import { coloredStatusCode } from '../common/coloredSratusCode';
import { CustomError } from '../middlewares/handlerError';

export const errorLogger = (err: CustomError | Error): void => {
  const curTime = currentTime();

  let strForConsole = `${chalk.red('[error]')} ${curTime}`;
  let strForFile = `[error] ${curTime}`;

  if (err instanceof CustomError) {
    strForConsole += ` ${coloredStatusCode(err.statusCode)}`;
    strForFile += ` ${err.statusCode}`;
  }

  strForConsole += ` ${err.name} ${err.message}`;
  strForFile += ` ${err.name} ${err.message}`;

  appendFileSync('./src/queries.log', `${strForFile}\n`, {
    flag: 'a',
    encoding: 'utf-8',
  });
  appendFileSync('./src/error.log', `${strForFile}\n`, {
    flag: 'a',
    encoding: 'utf-8',
  });

  process.stdout.write(`${strForConsole}\n`);
};
