import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthsService } from './auths.service';
import { LocalAuthGuard } from '../locals/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';

@ApiTags('auths')
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authsService.login(req.user);
  }

  @Post('refreshToken')
  async refreshtoken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authsService.refreshtoken(refreshTokenDto);
  }
}
