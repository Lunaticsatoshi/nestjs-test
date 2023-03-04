import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() { email, password }: LoginUserDto) {
    try {
      return this.authService.login(email, password);
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Post('auth/register')
  async register(@Body() user: CreateUserDto) {
    try {
      return this.authService.signup(user);
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }
}
