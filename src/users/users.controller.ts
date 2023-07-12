import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
  Patch,
  UsePipes,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import UserAuthProps from 'src/auth/user-auth.interface';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UpdateUserDto from 'src/dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':userId')
  // TODO
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('userId') requestedUserId: string, @Request() req: any) {
    const user = req.user as UserAuthProps;

    return await this.userService.getUserProfile(requestedUserId, user);
  }

  @Patch(':userId')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    await this.userService.updateUser(userId, user, updateUserDto);
  }
}
