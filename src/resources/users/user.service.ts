import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { checkHash, createHash } from '../../helpers/bcryptHash';
// import { CustomError } from '../../middlewares/errorHandler';
import { generateAccessToken } from '../../helpers/generateAccessToken';
import { TokenDto } from '../login/dto/tokenDto';
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

  async getOneByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOne({ login });
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async getByLogin(
    login: string,
    password: string
  ): Promise<TokenDto | QueryAnswers.FORBIDDEN> {
    const user = await this.usersRepository.findOne({ login });
    if (!user) return QueryAnswers.FORBIDDEN;

    const isCorrectPass = checkHash(password, user?.password ?? '');

    if (!isCorrectPass) return QueryAnswers.FORBIDDEN;

    const token = generateAccessToken(user.id, user.login);
    return { message: 'User Authorized', token };
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const passwordHash = createHash(userDto.password);
    const newUser = this.usersRepository.create({
      ...userDto,
      password: passwordHash,
    });
    const user = await this.usersRepository.save(newUser);

    if (!user) {
      throw new UserNotFoundError();
    }

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
