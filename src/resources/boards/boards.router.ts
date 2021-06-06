import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Board } from './boards.model';
import * as boardsService from './boards.service';
import { CustomError } from '../../middlewares/handlerError';

const { NOT_FOUND, BAD_REQUEST, OK, CREATED, NO_CONTENT } = StatusCodes;
const router: Router = Router();

router
  .route('/')
  .get(async (_req: Request, res: Response, next: NextFunction) => {
    const boards = await boardsService.getAll();
    if (!boards) {
      next(new CustomError(NOT_FOUND, `Error request boards`));
    }

    res.status(OK).json(boards);
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct board id: ${id}`));
      return;
    }

    const board = await boardsService.get(id);
    if (!board) {
      next(new CustomError(NOT_FOUND, `Error request board with id: ${id}`));
    }

    res.status(OK).json(board);
  });

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const board = await boardsService.create(new Board({ ...req.body }));
    if (!board) {
      next(new CustomError(NOT_FOUND, `Error create board`));
    }

    res.status(CREATED).json(board);
  });

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct board id: ${id}`));
      return;
    }

    const newData = await boardsService.update(id, req.body);
    if (!newData) {
      next(new CustomError(NOT_FOUND, `Error update board with id: ${id}`));
    }

    res.status(OK).json(newData);
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new CustomError(BAD_REQUEST, `Not correct board id: ${id}`));
      return;
    }

    const answer = await boardsService.remove(id);
    if (!answer.every((item) => item)) {
      next(new CustomError(NOT_FOUND, `Error delete board with id: ${id}`));
    }
    res.status(NO_CONTENT).send();
  });

export { router };
