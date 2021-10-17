import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { AuthsService } from './auths/auths.service';
import { LocalStrategy } from './locals/local.strategy';
import { JwtStrategy } from './jwts/jwt.strategy';
import { AuthsController } from './auths/auths.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRE_LOGIN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthsService, ConfigService, LocalStrategy, JwtStrategy],
  controllers: [AuthsController],
})
export class AuthsModule {}
