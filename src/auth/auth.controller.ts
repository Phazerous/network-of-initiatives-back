import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get()
  async test() {
    const token = {
      sub: 'admin',
    };

    return await this.jwtService.signAsync(JSON.stringify(token));
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async maga(@Request() req: any) {
    return req.user;
  }
}
