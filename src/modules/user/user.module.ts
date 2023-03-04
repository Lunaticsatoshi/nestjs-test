import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './user.model';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { jwtConstants } from '../../constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60min' },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [UsersService, AuthService],
})
export class UserModule {}
