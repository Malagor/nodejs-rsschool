import express, { Response, Request, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';

import path from 'path';
import YAML from 'yamljs';

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { router as userRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/boards.router';
import { router as tasksRouter } from './resources/tasks/tasks.router';
import { handlerError, CustomError } from './middlewares/handlerError';
import { logger } from './classes/Logger';
import { errorLogger } from './classes/ErrorLogger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger);

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use('/boards', boardsRouter);

app.use(
  (
    err: CustomError | Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof CustomError) {
      errorLogger(err);
      handlerError(err, res);
      return;
    }
    next(err);
  }
);

app.use((err: Error, _req: Request, res: Response) => {
  errorLogger(err);
  res.status(INTERNAL_SERVER_ERROR).send(err.message);

  // next(err);
});

process.on('uncaughtException', (err) => {
  errorLogger(err);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  errorLogger(err);
  process.exit(1);
});

// throw Error('Oops! - uncaughtException');
// Promise.reject(Error('Oops! - unhandledRejection'));

export default app;
