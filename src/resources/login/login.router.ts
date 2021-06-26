import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as loginService from './login.service';
import { CustomError } from '../../middlewares/errorHandler';
import { QueryAnswers } from '../../types';

import { generateAccessToken } from '../../helpers/generateAccessToken';
import { checkHash } from '../../helpers/bcryptHash';

// const EXPIRES_TIME_SEC = 60 * 60 * 24;

const router: Router = Router();
const { BAD_REQUEST, FORBIDDEN, OK } = StatusCodes;

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;

    if (!login || !password) {
      next(new CustomError(BAD_REQUEST, `No login or password`));
      return;
    }
    const user = await loginService.get(login);

    if (user === QueryAnswers.FORBIDDEN) {
      next(new CustomError(FORBIDDEN, `No user with login ${login}`));
      return;
    }

    const isCorrectPass = await checkHash(password, user.password);

    if (!isCorrectPass) {
      next(new CustomError(FORBIDDEN, `Password ${password} is not correct`));
      return;
    }

    const token = generateAccessToken(user.id, user.login);

    res.status(OK).json({ message: 'User has authorization', token });
  });

export { router };
