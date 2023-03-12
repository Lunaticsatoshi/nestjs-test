import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    getters: true,
    virtuals: true,
  },
})
export class Room {
  _id: ObjectId;

  @Prop()
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
