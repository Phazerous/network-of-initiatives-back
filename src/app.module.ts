import { Module } from '@nestjs/common';
import { InitiativesModule } from './initiatives/initiatives.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [InitiativesModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
