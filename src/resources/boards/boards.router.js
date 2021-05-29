const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const boardsService = require('./boards.service');
const Board = require('./boards.model');
const errorResponse = require('../../utils/errorResponse');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (!boards) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  if (!board) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({ ...req.body }));
  if (!board) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.CREATED).json(board);
});

router.route('/:id').put(async (req, res) => {
  const newData = await boardsService.update(req.params.id, req.body);
  if (!newData) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.OK).json(newData);
});

router.route('/:id').delete(async (req, res) => {
  const answer = await boardsService.remove(req.params.id);
  if (!answer.every((item) => !!item)) {
    return errorResponse(res, StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.NO_CONTENT).send();
});

module.exports = router;
