const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');
const Task = require('./tasks.model');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.status(tasks ? 200 : 400).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const { taskId, boardId } = req.params;

  const task = await tasksService.get(boardId, taskId);
  res.status(task ? 200 : 404).json(task);
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.set(
    new Task({
      ...req.body,
      boardId,
    })
  );

  res.status(task ? 201 : 400).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const { taskId, boardId } = req.params;
  const taskData = req.body;
  const task = await tasksService.update(boardId, taskId, taskData);

  res.status(task ? 200 : 400).json(task || {});
});

router.route('/:taskId').delete(async (req, res) => {
  const { taskId, boardId } = req.params;
  const index = await tasksService.remove(boardId, taskId);
  res.status(index !== -1 ? 204 : 404).json();
});

module.exports = router;
