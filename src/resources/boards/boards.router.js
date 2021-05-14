const router = require('express').Router();
const boardsService = require('./boards.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res
    .status(boards ? 200 : 400)
    .json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const {boardId} = req.params;
  const boards = await boardsService.getBoard(boardId);
  res
    .status(boards ? 200 : 404)
    .json(boards);
});

router.route('/').post(async (req, res) => {
  const boards = await boardsService.setBoard(req.body);
  res
    .status(boards ? 201 : 400)
    .json(boards);
});

router.route('/:boardId').put(async (req, res) => {
  const {boardId} = req.params;
  const boardData = req.body;
  const board = await boardsService.updateBoard(boardId, boardData);

  res
    .status(board ? 200 : 400)
    .json(board || {});
});

router.route('/:boardId').delete(async (req, res) => {
  const {boardId} = req.params;

  const index = await boardsService.deleteBoard(boardId);
  res
    .status(index !== -1 ? 204 : 404)
    .json();
});

module.exports = router;
