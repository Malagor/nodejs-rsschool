import Express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as tasksService from './tasks.service.js';
import Task from './tasks.model.js';
import { errorResponse } from '../../utils/errorResponse.js';

const router: Express.Router = Router({ mergeParams: true });

router.route('/').get(async (req: Express.Request, res: Express.Response) => {
  const { boardId } = req.params;
  if (!boardId) return errorResponse(res, StatusCodes.BAD_REQUEST);

  const tasks = await tasksService.getAll(boardId);

  if (!tasks) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(tasks);
});

router
  .route('/:taskId')
  .get(async (req: Express.Request, res: Express.Response) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) return errorResponse(res, StatusCodes.BAD_REQUEST);

    const task = await tasksService.get(boardId, taskId);

    if (!task) return errorResponse(res, StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json(task);
  });

router.route('/').post(async (req: Express.Request, res: Express.Response) => {
  const { boardId } = req.params;
  const task = await tasksService.create(
    new Task({
      ...req.body,
      boardId,
    })
  );

  if (!task) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.CREATED).json(task);
});

router
  .route('/:taskId')
  .put(async (req: Express.Request, res: Express.Response) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) return errorResponse(res, StatusCodes.BAD_REQUEST);

    const taskData = req.body;
    const task = await tasksService.update(boardId, taskId, taskData);

    if (!task) return errorResponse(res, StatusCodes.BAD_REQUEST);

    return res.status(StatusCodes.OK).json(task);
  });

router
  .route('/:taskId')
  .delete(async (req: Express.Request, res: Express.Response) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId) return errorResponse(res, StatusCodes.BAD_REQUEST);

    const isSuccess = await tasksService.remove(boardId, taskId);

    if (!isSuccess) {
      return errorResponse(res, StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  });

export { router };
