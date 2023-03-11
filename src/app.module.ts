import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getEnvVariable } from './common/utils/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gameRoom',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: getEnvVariable('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    RoomModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
