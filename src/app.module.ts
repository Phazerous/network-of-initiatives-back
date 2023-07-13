import { Module } from '@nestjs/common';
import { InitiativesModule } from './initiatives/initiatives.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [InitiativesModule, AuthModule, UsersModule, ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
