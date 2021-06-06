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
    try {
      const users = await usersService.getAll();
      if (!users) {
        throw new CustomError(INTERNAL_SERVER_ERROR, `Can not get users data`);
      }
      res.status(OK).json(users.map(User.toResponse));
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new CustomError(BAD_REQUEST, `Not correct user id`);
      }

      const user = await usersService.get(id);

      if (!user) {
        throw new CustomError(NOT_FOUND, `User with id: ${id} not found`);
      }

      res.status(OK).json(User.toResponse(user));
    } catch (e) {
      next(e);
    }
  });

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.create(new User({ ...req.body }));
      if (!user) {
        throw new CustomError(NOT_FOUND, `User not created`);
      }

      res.status(CREATED).json(User.toResponse(user));
    } catch (e) {
      next(e);
    }
  });

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new CustomError(
          BAD_REQUEST,
          `Not correct param - user id: ${id}`
        );
      }

      const user = await usersService.update(id, req.body);
      if (!user) {
        throw new CustomError(NOT_FOUND, `User not updated`);
      }

      res.status(OK).json(User.toResponse(user));
    } catch (e) {
      next(e);
    }
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new CustomError(
          BAD_REQUEST,
          `Not correct param - user id: ${id}`
        );
      }

      const answer = await usersService.remove(id);
      if (!answer.every((item) => item)) {
        throw new CustomError(NOT_FOUND, `User not deleted`);
      }
      res.status(NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  });

export { router };
