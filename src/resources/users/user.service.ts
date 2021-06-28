import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from '../../helpers/bcryptHash';
import { CustomError } from '../../middlewares/errorHandler';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { CustomError } from '../../middlewares/errorHandler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `User with id: ${id} not found.`
      );
    }

    return User.toResponse(user);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const passwordHash = createHash(userDto.password);
    const newUser = this.usersRepository.create({
      ...userDto,
      password: passwordHash,
    });
    return this.usersRepository.save(newUser);
  }

  // async update(id: string, userDto: UpdateUserDto): Promise<User> {
  //   const user = this.usersRepository.findOne(id);
  //
  //   if (!user) {
  //     throw new CustomError(
  //       HttpStatus.NOT_FOUND,
  //       `Not found user with id: ${id}`
  //     );
  //   } else {
  //     await this.usersRepository.merge(user, userDto);
  //     return this.usersRepository.save(user);
  //   }
  // }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
