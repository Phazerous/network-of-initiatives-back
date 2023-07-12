import { Inject, Injectable } from '@nestjs/common';
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
}
