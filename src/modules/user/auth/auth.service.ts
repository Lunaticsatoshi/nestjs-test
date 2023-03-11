import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user.model';
import { UsersService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne(email);
    const validPassword = await bcrypt.compare(pass, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const validUser = await this.validateUser(email, password);
    console.log({ validUser });
    const payload = { email: validUser.email, id: validUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: Partial<User>): Promise<User> {
    const existingUser = await this.usersService.findOne(user.email);

    if (existingUser) {
      throw new Error('User Already exists');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.usersService.createUser(user);
  }
}
