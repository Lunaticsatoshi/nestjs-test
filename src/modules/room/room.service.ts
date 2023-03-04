import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[] | undefined> {
    return this.roomRepository.find();
  }

  async findOneById(id: number): Promise<Room | undefined> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Room | undefined> {
    return this.roomRepository.findOne({ where: { name } });
  }

  async createRoom(room: Partial<Room>): Promise<Room | undefined> {
    return this.roomRepository.save(room);
  }

  async updateRoom(id: number, updatedName: string): Promise<Room | undefined> {
    await this.roomRepository.update({ id }, { name: updatedName });
    return this.roomRepository.findOne({ where: { id } });
  }

  async deleteRoom(id: number): Promise<Room | undefined> {
    const deletedRoom = this.roomRepository.findOne({ where: { id } });
    await this.roomRepository.delete({ id });
    return deletedRoom;
  }
}
