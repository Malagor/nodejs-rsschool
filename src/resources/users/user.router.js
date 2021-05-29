const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const usersService = require('./user.service');
const User = require('./user.model');
const errorResponse = require('../../utils/errorResponse');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (!users) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (!user) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({ ...req.body }));
  if (!user) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const user = await usersService.update(id, userData);
  if (!user) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const answer = await usersService.remove(req.params.id);
  if (!answer.every((item) => !!item)) {
    return errorResponse(res, StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.NO_CONTENT).send();
});

module.exports = router;
