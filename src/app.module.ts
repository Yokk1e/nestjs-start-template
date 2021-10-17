import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { PermissionsGuard } from './users/permissions/permissions.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    AuthsModule,
    UsersModule,
  ],
})
export class AppModule {}
