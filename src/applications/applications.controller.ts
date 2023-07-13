import {
  Controller,
  Get,
  UseGuards,
  Param,
  Request,
  ValidationPipe,
  UsePipes,
  Body,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UserAuthProps from 'src/auth/user-auth.interface';
import { ApplicationsService } from './applications.service';
import RespondApplicationDto from 'src/dtos/respond-application.dto';
import {
  DocsApplicationForApplier,
  DocsApplicationForInitiator,
  DocsApplicationRespond,
} from 'src/docs/docs';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationService: ApplicationsService) {}

  @Get(':applicationId/initiator')
  @UseGuards(JwtAuthGuard)
  @DocsApplicationForInitiator()
  async getApplicationForInitiator(
    @Param('applicationId') applicationId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.applicationService.getApplicationForInitiator(
      applicationId,
      user,
    );
  }

  @Patch(':applicationId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @DocsApplicationRespond()
  async respondToApplication(
    @Param('applicationId') applicationId: string,
    @Body() respondApplicationDto: RespondApplicationDto,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    await this.applicationService.respondToApplication(
      applicationId,
      user,
      respondApplicationDto,
    );
  }

  @Get(':applicationId/applier')
  @UseGuards(JwtAuthGuard)
  @DocsApplicationForApplier()
  async getApplicationForApplier(
    @Param('applicationId') applicationId: string,
    @Request() req: any,
  ) {
    const user = req.user as UserAuthProps;

    return await this.applicationService.getApplicationForApplier(
      applicationId,
      user,
    );
  }
}
