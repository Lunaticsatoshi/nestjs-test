import { Module } from '@nestjs/common';

import { Chat, ChatSchema } from './chat/chat.model';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';
import { Room, RoomSchema } from './room.model';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  providers: [RoomService, ChatService, ChatGateway],
  controllers: [RoomController],
  exports: [RoomService, ChatService],
})
export class RoomModule {}
