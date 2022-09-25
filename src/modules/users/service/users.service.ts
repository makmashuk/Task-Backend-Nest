import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

type IUser = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {}
  async create(user: IUser) {
    const isExist = await this.findOneByEmail(user.email);
    if (isExist) {
      throw new BadRequestException('User Already exist');
    }
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const payload = {
      password: hashedPassword,
      salt: salt,
      name: user.name,
      email: user.email,
    };
    const newUser = await this.userRepository.create(payload).save();
    return newUser;
  }
  async findAll() {
    return await this.userRepository.find();
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });
    if (user) {
      return user;
    }
  }
}
