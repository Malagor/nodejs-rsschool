import Express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import * as usersService from './user.service';
import { errorResponse } from '../../utils/errorResponse';

const router: Express.Router = Router();

router.route('/').get(async (_req: Express.Request, res: Express.Response) => {
  const users = await usersService.getAll();
  if (!users) return errorResponse(res, StatusCodes.NOT_FOUND);

  return res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

router
  .route('/:id')
  .get(async (req: Express.Request, res: Express.Response) => {
    if (!req.params.id) return errorResponse(res, StatusCodes.BAD_REQUEST);

    const user = await usersService.get(req.params.id);
    if (!user) return errorResponse(res, StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json(User.toResponse(user));
  });

router.route('/').post(async (req: Express.Request, res: Express.Response) => {
  const user = await usersService.create(new User({ ...req.body }));
  if (!user) return errorResponse(res, StatusCodes.BAD_REQUEST);

  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router
  .route('/:id')
  .put(async (req: Express.Request, res: Express.Response) => {
    const { id } = req.params;
    const userData = req.body;
    const user = await usersService.update(id, userData);
    if (!user) return errorResponse(res, StatusCodes.BAD_REQUEST);

    return res.status(StatusCodes.OK).json(User.toResponse(user));
  });

router
  .route('/:id')
  .delete(async (req: Express.Request, res: Express.Response) => {
    if (!req.params.id) return errorResponse(res, StatusCodes.BAD_REQUEST);

    const answer = await usersService.remove(req.params.id);
    if (!answer.every((item) => !!item)) {
      return errorResponse(res, StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  });

export { router };
