import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email });
    return user.toObject();
  }

  async createUser(user: Partial<User>): Promise<User | undefined> {
    return await this.userRepository.create(user);
  }
}
