import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from '../../helpers/bcryptHash';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryAnswers } from '../../constants';
import { UserNotFoundError } from './errors/user-not-found.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => User.toResponse(user));
  }

  async getOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new UserNotFoundError(id);
    }

    return User.toResponse(user);
  }

  async getByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const passwordHash = createHash(userDto.password);
    const newUser = await this.usersRepository.create({
      ...userDto,
      password: passwordHash,
    });
    const user = await this.usersRepository.save(newUser);

    return User.toResponse(user);
  }

  async update(
    id: string,
    userDto: UpdateUserDto
  ): Promise<User | QueryAnswers.NOT_FOUND> {
    const user = await this.usersRepository.findOne({ id });

    if (!user) return QueryAnswers.NOT_FOUND;

    this.usersRepository.merge(user, userDto);
    const newUser = await this.usersRepository.save(user);
    return User.toResponse(newUser);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
