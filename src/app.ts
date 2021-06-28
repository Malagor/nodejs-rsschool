// import express, { NextFunction, Request, Response } from 'express';
// import swaggerUI from 'swagger-ui-express';
//
// import path from 'path';
// import YAML from 'yamljs';
//
// import { router as userRouter } from './resources/users/user.router';
// import { router as boardsRouter } from './resources/boards/boards.router';
// import { router as tasksRouter } from './resources/tasks/tasks.router';
// import { router as loginRouter } from './resources/login/login.router';
// import { CustomError, errorHandler } from './middlewares/errorHandler';
// import { loggerHandler } from './middlewares/loggerHandler';
// import { errorLogger } from './classes/ErrorLogger';
// import { verifyAuth } from './middlewares/autentification';
//
// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
//
// app.use(express.json());
//
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//
// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });
//
// app.use(loggerHandler);
//
// app.use('/login', loginRouter);
// app.use(verifyAuth);
// app.use('/users', userRouter);
// app.use('/boards/:boardId/tasks', tasksRouter);
// app.use('/boards', boardsRouter);
// app.get('/error', () => {
//   throw new Error('Test error!');
// });
//
// app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
//   errorLogger(err);
//   errorHandler(err, req, res, next);
// });
//
// process.on('uncaughtException', (err) => {
//   errorLogger(err);
//   setTimeout(() => process.exit(1), 1000);
// });
//
// process.on('unhandledRejection', (err: Error) => {
//   errorLogger(err);
//   setTimeout(() => process.exit(1), 1000);
// });
//
// // throw Error('Oops! - uncaughtException');
// // Promise.reject(Error('Oops! - unhandledRejection'));
//
// export default app;
