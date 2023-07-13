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
import {
  DocsUpdateUserProfile,
  DocsUserApplicationsShort,
  DocsUserInitiativesShort,
  DocsUserProfile,
} from 'src/docs/docs';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private initiativesService: InitiativesService,
    private applicationService: ApplicationsService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserId(@Request() req: any) {
    const user = req.user as UserAuthProps;

    return user.userId;
  }

  @Get(':userId')
  @DocsUserProfile()
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('userId') requestedUserId: string, @Request() req: any) {
    const user = req.user as UserAuthProps;

    return await this.userService.getUserProfile(requestedUserId, user);
  }

  @Patch(':userId')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @DocsUpdateUserProfile()
  async updateUserProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    await this.userService.updateUser(userId, user, updateUserDto);
  }

  @Get(':userId/initiatives')
  @UseGuards(JwtAuthGuard)
  @DocsUserInitiativesShort()
  async getUserInitiatives(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.initiativesService.getUserInitiativesShort(
      requestedUserId,
      user,
    );
  }

  @Get(':userId/applications')
  @UseGuards(JwtAuthGuard)
  @DocsUserApplicationsShort()
  async getUserApplications(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.applicationService.getUserApplicationsShort(
      requestedUserId,
      user,
    );
  }
}
