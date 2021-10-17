import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Header,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';
import { Permissions } from '../permissions/decorator/Permissions.decorator';
import { Permission } from '../permissions/permission.enum';
import { PermissionsGuard } from '../permissions/permissions.guard';
import { GetJwtUser } from 'src/auths/jwts/decorator/get-jwt-user.decorator';
import { JwtUser } from 'src/auths/jwts/jwt.strategy';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions(Permission.ROLE_CREATE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  @Permissions(Permission.ROLE_VIEW)
  findAll(@Query() query: RoleQueryDto, @GetJwtUser() user: JwtUser) {
    const options = { limit: query.limit, page: query.page };

    return this.rolesService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  @Permissions(Permission.ROLE_VIEW)
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.ROLE_EDIT)
  updateOne(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateOne(id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions(Permission.ROLE_DELETE)
  deleteOne(@Param('id') id: number) {
    return this.rolesService.deleteOne(id);
  }
}
