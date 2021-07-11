import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor(id?: string) {
    const message = id ? `User with id: ${id} not found` : 'User not found';

    super(message, HttpStatus.NOT_FOUND);
  }
}
