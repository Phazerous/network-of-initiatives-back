import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto } from 'src/dtos/create-initiative.dto';
import UserAuthProps from 'src/auth/user-auth.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateApplicationDto from 'src/dtos/create-application.dto';
import {
  DocsCreateApplication,
  DocsCreateInitiative,
  DocsGetInitiative,
  DocsGetInitiativeShort,
  DocsGetInitiatives,
} from 'src/docs/docs';

@Controller('initiatives')
export class InitiativesController {
  constructor(private initiativeService: InitiativesService) {}

  @Get()
  @DocsGetInitiatives()
  async getInitiatives() {
    return await this.initiativeService.getInitiativesShort();
  }

  @Get(':initiativeId/short')
  @DocsGetInitiativeShort()
  async getInitiativeShortById(@Param('initiativeId') initiativeId: string) {
    return await this.initiativeService.getInitiativeShortById(initiativeId);
  }

  @Get(':initiativeId/full')
  @DocsGetInitiative()
  async getInitiativeById(@Param('initiativeId') initiativeId: string) {
    return await this.initiativeService.getInitiativeById(initiativeId);
  }

  @Post('new')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @DocsCreateInitiative()
  async createInitiative(
    @Request() req: any,
    @Body() createInitiativeDto: CreateInitiativeDto,
  ) {
    const user = req.user as UserAuthProps;

    return await this.initiativeService.createInitiative(
      user.userId,
      createInitiativeDto,
    );
  }

  @Post(':initiativeId/apply')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @DocsCreateApplication()
  async createApplication(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const user = req.user as UserAuthProps;

    return await this.initiativeService.applyToInitiative(
      user.userId,
      initiativeId,
      createApplicationDto,
    );
  }
}
