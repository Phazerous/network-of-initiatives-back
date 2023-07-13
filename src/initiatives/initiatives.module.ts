import { Module } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { InitiativesController } from './initiatives.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ApplicationsService } from 'src/applications/applications.service';

@Module({
  imports: [SharedModule],
  controllers: [InitiativesController],
  providers: [InitiativesService, ApplicationsService],
})
export class InitiativesModule {}
