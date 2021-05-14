const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllTasks(boardId);
  res
    .status(tasks ? 200 : 400)
    .json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const { taskId, boardId } = req.params;

  const task = await tasksService.getTask(boardId, taskId );
  res
    .status(task ? 200 : 404)
    .json(task);
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.setTask(boardId, req.body);
  res
    .status(task ? 201 : 400)
    .json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const {taskId, boardId} = req.params;
  const taskData = req.body;
  const task = await tasksService.updateTask(boardId, taskId, taskData);

  res
    .status(task ? 200 : 400)
    .json(task || {});
});

router.route('/:taskId').delete(async (req, res) => {
  const {taskId, boardId} = req.params;
  const index = await tasksService.deleteTask(boardId, taskId);
  res
    .status(index !== -1 ? 204 : 404)
    .json();
});

module.exports = router;
