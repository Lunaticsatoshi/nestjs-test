import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chat } from './chat.model';
@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatRepository: Model<Chat>) {}

  private allUsers = [];
  private connectedUsers = [];

  async getChats(): Promise<Chat[]> {
    const chats = await this.chatRepository.find();
    return chats.map((chat) => chat.toObject());
  }

  async saveChat(chat: Partial<Chat>): Promise<void> {
    await this.chatRepository.create({ ...chat });
  }

  userConnected(userName: string, registrationToken: string) {
    let user = { userName: userName, registrationToken: registrationToken };
    const filteredUsers = this.allUsers.filter((u) => u.userName === userName);
    if (filteredUsers.length == 0) {
      this.allUsers.push(user);
    } else {
      user = filteredUsers[0];
      user.registrationToken = registrationToken;
    }
    this.connectedUsers.push(userName);
    console.log('All Users', this.allUsers);
    console.log('Connected Users', this.connectedUsers);
  }

  userDisconnected(userName: string) {
    const userIndex = this.connectedUsers.indexOf(userName);
    this.connectedUsers.splice(userIndex, 1);
    console.log('All Users', this.allUsers);
    console.log('Connected Users', this.connectedUsers);
  }

  //   async sendMessagesToOfflineUsers(chat: any) {
  //     var messagePayload = {
  //       data: {
  //         type: "CHAT",
  //         title: 'chat',
  //         message: chat.message,
  //         sender: chat.sender,
  //         recipient: chat.recipient,
  //         time: chat.time
  //       },
  //       tokens: []
  //     };
  //     const userTokens = this.allUsers.filter(user => !this.connectedUsers.includes(user.userName)).map(user => { return user.registrationToken });
  //     if (userTokens.length == 0) {
  //       return;
  //     }
  //     messagePayload.tokens = userTokens;
  //     try {
  //       await defaultApp.messaging().sendMulticast(messagePayload);
  //     } catch (ex) {
  //       console.log(JSON.stringify(ex));
  //     }
  //   }
}
