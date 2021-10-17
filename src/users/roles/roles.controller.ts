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

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: RoleQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.rolesService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateOne(id, updateRoleDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.rolesService.deleteOne(id);
  }
}
