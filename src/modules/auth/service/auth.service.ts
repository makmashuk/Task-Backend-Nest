import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/create-auth.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const newUser = await this.userService.create(registerDto);
    if (newUser) {
      return this.login(newUser);
    }
  }
  async login(user) {
    const payload = { username: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const hashedPassword = await bcrypt.hash(password, user.salt);
      if (user.password === hashedPassword) {
        return user;
      }
    }
    return null;
  }
}
