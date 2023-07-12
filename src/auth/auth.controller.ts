import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Res,
  Request,
} from '@nestjs/common';
import RequestVerificationCodeDto from 'src/dtos/request-verification-code.dto';
import { AuthService } from './auth.service';
import {
  DocsLogin,
  DocsRequestVerificationCode,
  DocsSignup,
  DocsVerifyEmail,
} from 'src/docs/docs';
import { VerifyEmailDto } from 'src/dtos/verify-email.dto';
import { Response, response } from 'express';
import { JwtEmailVerificationGuard } from './jwt-verification.guard';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import LoginDto from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('request-verification-code')
  @UsePipes(new ValidationPipe())
  @DocsRequestVerificationCode()
  async requestVerificationCode(
    @Body() requestVerificationCodeDto: RequestVerificationCodeDto,
  ) {
    return await this.authService.requestVerificationCode(
      requestVerificationCodeDto.email,
    );
  }

  @Post('verify-email')
  @DocsVerifyEmail()
  @UsePipes(new ValidationPipe())
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.verifyEmail(verifyEmailDto);

    const token = await this.authService.generateRegistrationToken(
      verifyEmailDto.email,
    );

    response.cookie('REG_TOKEN', token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });
  }

  @Post('signup')
  @UseGuards(JwtEmailVerificationGuard)
  @UsePipes(new ValidationPipe())
  @DocsSignup()
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const email = req.user.email;

    const userId = await this.userService.createUser(createUserDto, email);

    const token = await this.authService.generateUserToken(userId);

    response.cookie('USER_TOKEN', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return userId;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @DocsLogin()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userId = await this.userService.loginUser(loginDto);

    const token = await this.authService.generateUserToken(userId);

    response.cookie('USER_TOKEN', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return userId;
  }
}
