import chalk from 'chalk';
import fs, { appendFileSync } from 'fs';
import path from 'path';
import { currentTime } from '../helpers/currentTime';
import { coloredStatusCode } from '../helpers/coloredSratusCode';
import { CustomError } from '../middlewares/errorHandler';

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
  appendFileSync(path.join(__dirname, '../logs/error.log'), `${strForFile}\n`, {
    flag: 'a',
    encoding: 'utf-8',
  });

  process.stdout.write(`${strForConsole}\n`);
};
