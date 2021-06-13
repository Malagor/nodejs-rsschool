import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import * as usersService from './user.service';
import { CustomError } from '../../middlewares/handlerError';

const router: Router = Router();
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  CREATED,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = StatusCodes;

router
  .route('/')
  .get(async (_req: Request, res: Response, next: NextFunction) => {
    const users = await usersService.getAll();
    if (!users) {
      next(new CustomError(INTERNAL_SERVER_ERROR, `Can not get users data`));
      return;
    }
    res.status(OK).json(users.map(User.toResponse));
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct user id`));
      return;
    }

    const user = await usersService.get(id);

    if (!user) {
      next(new CustomError(NOT_FOUND, `User with id: ${id} not found`));
      return;
    }

    res.status(OK).json(User.toResponse(user));
  });

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersService.create(new User({ ...req.body }));
    if (!user) {
      next(new CustomError(NOT_FOUND, `User not created`));
      return;
    }

    res.status(CREATED).json(User.toResponse(user));
  });

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct param - user id: ${id}`));
      return;
    }

    const user = await usersService.update(id, req.body);
    if (!user) {
      next(new CustomError(NOT_FOUND, `User not updated`));
      return;
    }

    res.status(OK).json(User.toResponse(user));
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct param - user id: ${id}`));
      return;
    }

    const answer = await usersService.remove(id);
    if (!answer.every((item) => item)) {
      next(new CustomError(NOT_FOUND, `User not deleted`));
      return;
    }
    res.status(NO_CONTENT).send();
  });

export { router };
