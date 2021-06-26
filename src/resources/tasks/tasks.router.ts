import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as tasksService from './tasks.service';
import { Task } from '../../entities/Task';
import { CustomError } from '../../middlewares/errorHandler';
import { QueryAnswers } from '../../types';

const router: Router = Router({ mergeParams: true });
const { NOT_FOUND, BAD_REQUEST, OK, CREATED, NO_CONTENT } = StatusCodes;

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    if (!boardId) {
      next(new CustomError(BAD_REQUEST, `Not correct board id: ${boardId}`));
      return;
    }

    const tasks = await tasksService.getAll(boardId);
    if (!tasks) {
      next(
        new CustomError(
          NOT_FOUND,
          `Error request tasks from board with id: ${boardId}`
        )
      );
      return;
    }

    res.status(OK).json(tasks);
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({ ...req.body, boardId }));

    if (!task) {
      next(new CustomError(NOT_FOUND, `Error create task`));
      return;
    }

    res.status(CREATED).json(task);
  });

router
  .route('/:taskId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) {
      next(new CustomError(BAD_REQUEST, `Not correct board or task id`));
      return;
    }

    const task = await tasksService.get(boardId, taskId);
    if (task === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `Task with id: ${taskId} not found`));
      return;
    }

    res.status(OK).json(task);
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) {
      next(new CustomError(BAD_REQUEST, `Not correct board or task id`));
      return;
    }

    const taskData = req.body;
    const task = await tasksService.update(boardId, taskId, taskData);

    if (task === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `Error update task`));
      return;
    }

    res.status(OK).json(task);
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) {
      next(new CustomError(BAD_REQUEST, `Not correct board or task id`));
      return;
    }

    const result = await tasksService.remove(boardId, taskId);

    if (result === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `Error delete task`));
      return;
    }
    res.status(NO_CONTENT).send();
  });

export { router };
