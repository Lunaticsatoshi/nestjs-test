import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Schema as MongooseSchema } from 'mongoose';

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
export class Chat {
  _id: ObjectId;

  @Prop()
  body: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', index: true })
  roomId: ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
