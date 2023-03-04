import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './user.model';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[] | undefined> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: Partial<Users>): Promise<Users | undefined> {
    return this.userRepository.save(user);
  }
}
