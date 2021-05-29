const router = require('express').Router({ mergeParams: true });
const { StatusCodes } = require('http-status-codes');
const tasksService = require('./tasks.service');
const Task = require('./tasks.model');
const errorResponse = require('../../utils/errorResponse');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);

  if (!tasks) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const { taskId, boardId } = req.params;

  const task = await tasksService.get(boardId, taskId);

  if (!task) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(task);
});

router.route('/').post(async (req, res) => {
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

router.route('/:taskId').put(async (req, res) => {
  const { taskId, boardId } = req.params;
  const taskData = req.body;
  const task = await tasksService.update(boardId, taskId, taskData);

  if (!task) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.OK).json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const { taskId, boardId } = req.params;
  const isSuccess = await tasksService.remove(boardId, taskId);

  if (!isSuccess) {
    return errorResponse(res, StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.NO_CONTENT).send();
});

module.exports = router;
