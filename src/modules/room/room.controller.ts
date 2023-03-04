import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from './room.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    try {
      return await this.roomService.findAll();
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Gets the Room by id',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getRoom(@Param() params) {
    try {
      const room = await this.roomService.findOneById(params.id);

      if (!room) {
        return { status: 404, message: 'Room not found' };
      }

      return room;
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Post('create')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async createRoom(@Body() roomData: CreateRoomDto) {
    try {
      return await this.roomService.createRoom(roomData);
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Put('update/:id')
  @ApiParam({
    name: 'id',
    description: 'Updates the Room by id',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async updateRoom(@Param() params, @Body() { name }: CreateRoomDto) {
    try {
      return await this.roomService.updateRoom(params.id, name);
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }

  @Delete('delete/:id')
  @ApiParam({
    name: 'id',
    description: 'Deletes the Room by id',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Param() params) {
    try {
      return await this.roomService.deleteRoom(params.id);
    } catch (error) {
      return { status: 500, message: 'Something went wrong' };
    }
  }
}
