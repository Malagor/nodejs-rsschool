const router = require('express').Router();
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  // const data = req;
  // console.log('data', data.param('boardId'));
  const tasks = await tasksService.getAllTasks(req.body);

  // const tasks = 'all tasks';

  res
    .status(tasks ? 200 : 400)
    .json(tasks);
});

// router.route('/:boardId').get(async (req, res) => {
//   const boards = await boardsService.getBoard(req.params.boardId);
//   res
//     .status(boards ? 200 : 404)
//     .json(boards);
// });
//
// router.route('/').post(async (req, res) => {
//   const boards = await boardsService.setBoard(req.body);
//   res
//     .status(boards ? 201 : 400)
//     .json(boards);
// });
//
// router.route('/:boardId').put(async (req, res) => {
//   const id = req.params.boardId;
//   const boardData = req.body;
//   const board = await boardsService.updateBoard(id, boardData);
//
//   res
//     .status(board ? 200 : 400)
//     .json(board || {});
// });
//
// router.route('/:boardId').delete(async (req, res) => {
//   const index = await boardsService.deleteBoard(req.params.boardId);
//   res
//     .status(index !== -1 ? 204 : 404)
//     .json();
// });

module.exports = router;
