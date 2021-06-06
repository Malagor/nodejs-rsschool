import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Board } from './boards.model';
import * as boardsService from './boards.service';
import { CustomError } from '../../middlewares/handlerError';

const { NOT_FOUND, BAD_REQUEST, OK, CREATED, NO_CONTENT } = StatusCodes;
const router: Router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const boards = await boardsService.getAll();
      if (!boards) {
        throw new CustomError(NOT_FOUND, `Error request boards`);
      }

      res.status(OK).json(boards);
    } catch (e) {
      next(e);
    }
  })
);

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new CustomError(BAD_REQUEST, `Not correct board id: ${id}`);
      }

      const board = await boardsService.get(id);
      if (!board) {
        throw new CustomError(NOT_FOUND, `Error request board with id: ${id}`);
      }

      res.status(OK).json(board);
    } catch (e) {
      next(e);
    }
  });

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await boardsService.create(new Board({ ...req.body }));
      if (!board) {
        throw new CustomError(NOT_FOUND, `Error create board`);
      }

      res.status(CREATED).json(board);
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
        throw new CustomError(BAD_REQUEST, `Not correct board id: ${id}`);
      }

      const newData = await boardsService.update(id, req.body);
      if (!newData) {
        throw new CustomError(NOT_FOUND, `Error update board with id: ${id}`);
      }

      res.status(OK).json(newData);
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
        throw new CustomError(BAD_REQUEST, `Not correct board id: ${id}`);
      }

      const answer = await boardsService.remove(id);
      if (!answer.every((item) => item)) {
        throw new CustomError(NOT_FOUND, `Error delete board with id: ${id}`);
      }
      res.status(NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  });

export { router };
