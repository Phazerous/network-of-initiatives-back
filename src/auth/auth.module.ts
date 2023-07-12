import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtVerificationStrategy } from './jwt-verification.strategy';

@Module({
  imports: [
    SharedModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, JwtVerificationStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
