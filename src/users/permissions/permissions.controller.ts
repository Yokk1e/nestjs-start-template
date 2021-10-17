import { Controller, Get, Header, Query, UseGuards } from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { PermissionQueryDto } from './dto/permission-query.dto';

@ApiTags('permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: PermissionQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.permissionsService.findAll(query, options);
  }
}
