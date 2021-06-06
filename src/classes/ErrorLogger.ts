import chalk from 'chalk';
import { appendFile } from 'fs';
import { currentTime } from '../common/currentTime';
import { coloredStatusCode } from '../common/coloredSratusCode';
import { CustomError } from '../middlewares/handlerError';

export const errorLogger = (err: CustomError | Error): void => {
  const curTime = currentTime();

  let strForConsole = `${chalk.red('[error]')} ${curTime}`;
  let strForFile = `[error] ${curTime}`;

  if (err instanceof CustomError) {
    strForConsole += `${coloredStatusCode(err.statusCode)}`;
    strForFile += `${err.statusCode}`;
  }

  strForConsole += ` ${err.name} ${err.message}`;
  strForFile += ` ${err.name} ${err.message}`;

  appendFile(
    './src/queries.log',
    `${strForFile}\n`,
    { flag: 'a', encoding: 'utf-8' },
    (error) => {
      if (error) {
        const errStr = JSON.stringify(error);
        process.stderr.write(
          `${chalk.red(
            '[error]'
          )} Can not write log file error.log. ${errStr}\n`
        );
      }
    }
  );
  appendFile(
    './src/error.log',
    `${strForFile}\n`,
    { flag: 'a', encoding: 'utf-8' },
    (error) => {
      if (error) {
        const errStr = JSON.stringify(error);
        process.stderr.write(
          `${chalk.red('[error]')} Can not write log file ${errStr}\n`
        );
      }
    }
  );

  process.stdout.write(`${strForConsole}\n`);
};
