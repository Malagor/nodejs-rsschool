import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(dirname, '../../.env'),
});

export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } =
  process.env;
export const AUTH_MODE = process.env['AUTH_MODE'] === 'true';
