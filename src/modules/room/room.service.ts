import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId, QueryOptions } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination';

import { Room } from './room.model';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomRepository: Model<Room>) {}

  async findAll(
    filter: FilterQuery<Room>,
    options?: QueryOptions,
  ): Promise<Room[] | undefined> {
    const rooms = await this.roomRepository.find(filter, null, options);
    return rooms.map((room) => room.toObject());
  }

  async findOneById(id: ObjectId): Promise<Room | undefined> {
    const room = await this.roomRepository.findOne({ _id: id });
    return room.toObject();
  }

  async findOneByName(name: string): Promise<Room | undefined> {
    const room = await this.roomRepository.findOne({ name });
    return room.toObject();
  }

  async createRoom(room: Partial<Room>): Promise<Room | undefined> {
    return this.roomRepository.create(room);
  }

  async updateRoom(
    id: ObjectId,
    updatedName: string,
  ): Promise<Room | undefined> {
    const updatedRoom = await this.roomRepository.findOneAndUpdate(
      { _id: id },
      { name: updatedName },
    );
    return updatedRoom.toObject();
  }

  async deleteRoom(id: ObjectId): Promise<Room | undefined> {
    const deletedRoom = await this.roomRepository.findOne({ _id: id });
    await this.roomRepository.findOneAndDelete({ _id: id });
    return deletedRoom.toObject();
  }
}
