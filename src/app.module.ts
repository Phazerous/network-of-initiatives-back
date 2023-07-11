import { Module } from '@nestjs/common';
import { InitiativesModule } from './initiatives/initiatives.module';

@Module({
  imports: [InitiativesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
