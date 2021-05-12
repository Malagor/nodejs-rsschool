const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res
    .status(users ? 200 : 400)
    .json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res
    .status(user ? 200: 404)
    .json(user? User.toResponse(user) : {});
});

router.route('/').post(async (req, res) => {
  const user = await usersService.setUser(req.body);
  res
    .status(user ? 201: 400)
    .json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const {id} = req.params;
  const userData = req.body;
  const user = await usersService.updateUser(id, userData);

  res
    .status(user !== -1 ? 200: 400)
    .json(user? User.toResponse(user) : {});
});

router.route('/:id').delete(async (req, res) => {
  const index = await usersService.deleteUser(req.params.id);
  res
    .status(index !== -1 ? 204 : 404)
    .json();
});

module.exports = router;
