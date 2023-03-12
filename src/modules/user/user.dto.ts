import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @Length(6, 255, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @Length(6, 255, { message: 'Must be at least 6 characters long' })
  password: string;
}
