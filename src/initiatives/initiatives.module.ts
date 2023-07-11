import { Module } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { InitiativesController } from './initiatives.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [InitiativesController],
  providers: [InitiativesService],
})
export class InitiativesModule {}
