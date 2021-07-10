import bcrypt from 'bcrypt';
import { env } from '../common/config';

const { SALT } = env;

const createHash = (password: string): string => {
  const salt = bcrypt.genSaltSync(+`${SALT}`);
  return bcrypt.hashSync(password, salt);
};

const checkHash = (password: string, passwordHash: string): boolean => {
  return bcrypt.compareSync(password, passwordHash);
};

export { createHash, checkHash };
