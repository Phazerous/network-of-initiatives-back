import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { VerifyEmailDto } from 'src/dtos/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService') private prisma: PrismaClient,
    private jwtService: JwtService,
  ) {}

  async requestVerificationCode(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user)
      throw new ConflictException(
        'User with the specified email already exists',
      );

    const verificationCode = 'bla-bla';

    const record = await this.prisma.emailVerificationCode.upsert({
      create: {
        email,
        verificationCode,
      },
      update: {
        email,
      },
      where: { email },
    });

    return;
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, verificationCode } = verifyEmailDto;

    const record = await this.prisma.emailVerificationCode.findUnique({
      where: {
        email,
      },
    });

    if (!record) throw new NotFoundException();

    if (record.verificationCode !== verificationCode)
      throw new BadRequestException();
  }

  async generateRegistrationToken(email: string) {
    const token = {
      email,
    };

    const jwtToken = await this.jwtService.signAsync(token);

    return jwtToken;
  }

  async generateUserToken(userId: string) {
    const token = {
      sub: userId,
    };

    const jwtToken = await this.jwtService.signAsync(token);

    return jwtToken;
  }
}
