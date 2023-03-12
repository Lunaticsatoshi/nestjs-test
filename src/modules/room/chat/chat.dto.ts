import { ObjectId } from 'mongoose';

export class CreateChatDto {
  body: string;
  roomId: ObjectId;
}
