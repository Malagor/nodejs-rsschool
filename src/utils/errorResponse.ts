import { getReasonPhrase } from 'http-status-codes';
import Express from 'express';

export const errorResponse = (
  res: Express.Response,
  code: number
): Express.Response =>
  res.status(code).json({ message: getReasonPhrase(code) });
