import express from 'express';
import swaggerUI from 'swagger-ui-express';

import path from 'path';
import YAML from 'yamljs';

import { fileURLToPath } from 'url';
import { router as userRouter } from './resources/users/user.router.js';
import { router as boardsRouter } from './resources/boards/boards.router.js';
import { router as tasksRouter } from './resources/tasks/tasks.router.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const swaggerDocument = YAML.load(path.join(dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use('/boards', boardsRouter);

export default app;
