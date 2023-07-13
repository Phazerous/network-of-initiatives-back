import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import UserAuthProps from 'src/auth/user-auth.interface';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import LoginDto from 'src/dtos/login.dto';
import UpdateUserDto from 'src/dtos/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async isAdmin(userId: string) {
    const record = await this.prisma.admin.findUnique({
      where: {
        userId,
      },
    });

    return !!record;
  }

  async createUser(createUserDto: CreateUserDto, email: string) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        email,
      },
    });

    return user.id;
  }

  async getUserProfile(requestedUserId: string, userAuthProps: UserAuthProps) {
    if (!(userAuthProps.userId === requestedUserId || userAuthProps.isAdmin))
      throw new ForbiddenException();

    const user = await this.prisma.user.findUnique({
      where: {
        id: requestedUserId,
      },
      select: {
        name: true,
        lastname: true,
        email: true,
        university: true,
        location: true,
        contact: true,
        about: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user || user.password !== loginDto.password)
      throw new BadRequestException();

    return user.id;
  }

  async updateUser(
    requestedUserId: string,
    userAuthProps: UserAuthProps,
    updateUserDto: UpdateUserDto,
  ) {
    console.log(requestedUserId, userAuthProps.userId);

    if (!(requestedUserId === userAuthProps.userId || userAuthProps.isAdmin))
      throw new ForbiddenException();

    const user = await this.prisma.user.update({
      where: {
        id: requestedUserId,
      },
      data: {
        ...updateUserDto,
      },
    });
  }
}
