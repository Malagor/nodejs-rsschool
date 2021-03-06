import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../entities/User';
import * as usersService from './user.service';
import { CustomError } from '../../middlewares/errorHandler';
import { QueryAnswers } from '../../types';
import { createHash } from '../../helpers/bcryptHash';

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

  // GET ALL

  .get(async (_req: Request, res: Response, next: NextFunction) => {
    const users = await usersService.getAll();
    if (!users) {
      next(new CustomError(INTERNAL_SERVER_ERROR, `Can not get users data`));
      return;
    }
    res.status(OK).json(users.map(User.toResponse));
  })

  // CREATE

  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password) {
      next(new CustomError(BAD_REQUEST, `No password`));
      return;
    }

    const passwordHash = createHash(password);
    const user = await usersService.create(
      new User({ ...req.body, password: passwordHash })
    );
    if (user === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `User not created`));
      return;
    }
    res.status(CREATED).json(User.toResponse(user));
  });

router
  .route('/:id')

  // GET BY ID

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct user id`));
      return;
    }

    const user = await usersService.get(id);

    if (user === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `User with id: ${id} not found`));
      return;
    }

    res.status(OK).json(User.toResponse(user));
  })

  // UPDATE

  .put(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct param - user id: ${id}`));
      return;
    }

    const user = await usersService.update(id, req.body);
    if (user === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `User not updated`));
      return;
    }

    res.status(OK).json(User.toResponse(user));
  })

  // DELETE

  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct param - user id: ${id}`));
      return;
    }

    const answer = await usersService.remove(id);
    if (answer === QueryAnswers.NOT_FOUND) {
      next(new CustomError(NOT_FOUND, `User not deleted`));
      return;
    }
    res.status(NO_CONTENT).send();
  });

export { router };
