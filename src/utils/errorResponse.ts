import { getReasonPhrase } from 'http-status-codes';
import { Response } from 'express';

export const errorResponse = (res: Response, code: number): Response =>
  res.status(code).json({ message: getReasonPhrase(code) });
