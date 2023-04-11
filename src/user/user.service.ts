import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './enitity/user.entity';
import * as bcrypt from 'bcrypt';
import { comparePasswords } from 'src/core/utils/compare-password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(options?: any): Promise<UserEntity> {
    const user = await this.userRepo.findOne(options);
    return user;
  }

  async findOneByPayload(payload: { email: string }): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    return user;
  }

  async findOneByLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        'Email or password is Invalid!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // compare password
    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      throw new HttpException(
        'Email or password is Invalid!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, last_name, first_name } = userDto;
    const userExist = await this.userRepo.findOne({
      where: { email },
    });
    if (userExist) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    const newPasswordHashed = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({
      email,
      password: newPasswordHashed,
      last_name,
      first_name,
    });
    const user = await this.userRepo.save(newUser);
    return user;
  }
}
