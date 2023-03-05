import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from './chat/chat.model';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';
import { Room } from './room.model';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Chat])],
  providers: [RoomService, ChatService, ChatGateway],
  controllers: [RoomController],
  exports: [RoomService, ChatService],
})
export class RoomModule {}
