import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import chalk from 'chalk';
import { coloredStatusCode } from '../helpers/coloredSratusCode';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line class-methods-use-this
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { method, url, body, query } = request;

    const strForConsole = `${chalk.red('[ERROR]')} ${chalk.blue(
      method
    )} url:${url} query:${JSON.stringify(query)} body:${JSON.stringify(
      body || {}
    )}  code:${coloredStatusCode(status)}`;

    process.stdout.write(`${strForConsole}\n`);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
