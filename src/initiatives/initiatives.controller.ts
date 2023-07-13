import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  Patch,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
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
  DocsInitiativeApplicationsShort,
  DocsInitiativeStatus,
  DocsModeratorInitiatives,
  DocsUpdateInitiativeStatus,
} from 'src/docs/docs';
import { ApplicationsService } from 'src/applications/applications.service';
import RespondInitiativeDto from 'src/dtos/respond-initiative-dto';

@Controller('initiatives')
export class InitiativesController {
  constructor(
    private initiativeService: InitiativesService,
    private applicationService: ApplicationsService,
  ) {}

  @Get('mod')
  @UseGuards(JwtAuthGuard)
  @DocsModeratorInitiatives()
  async getInitiativesToModerate(@Request() req: any) {
    if (!req.user.isAdmin) throw new UnauthorizedException();

    return await this.initiativeService.getInitiativesToModerate();
  }

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

  @Get(':initiativeId/status')
  @DocsInitiativeStatus()
  @UseGuards(JwtAuthGuard)
  async getInitiativeStatus(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.initiativeService.getInitiativeStatus(initiativeId, user);
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

  @Get(':initiativeId/applications')
  @UseGuards(JwtAuthGuard)
  @DocsInitiativeApplicationsShort()
  async getInitiativeApplications(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.applicationService.getInitiativeApplicationsShort(
      initiativeId,
      user,
    );
  }

  @Patch(':initiativeId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @DocsUpdateInitiativeStatus()
  async respondToInitiative(
    @Param('initiativeId') initiativeId: string,
    @Body() respondInitiativeDto: RespondInitiativeDto,
    @Request() req: any,
  ) {
    if (!req.user.isAdmin) throw new ForbiddenException();

    await this.initiativeService.respondInitiative(
      initiativeId,
      respondInitiativeDto,
    );
  }
}
