import bcrypt from 'bcrypt';
import { env } from '../common/config';

const { SALT } = env;

const createHash = (password: string, round = 10): string => {
  const salt = bcrypt.genSaltSync(round || +`${SALT}`);
  return bcrypt.hashSync(password, salt);
};

const checkHash = (password: string, passwordHash: string): boolean => {
  return bcrypt.compareSync(password, passwordHash);
};

export { createHash, checkHash };
