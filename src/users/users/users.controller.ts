import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Permissions } from '../permissions/decorator/Permissions.decorator';
import { Permission } from '../permissions/permission.enum';
import { PermissionsGuard } from '../permissions/permissions.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(Permission.USER_CREATE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  @Permissions(Permission.USER_VIEW)
  findAll(@Query() query: UserQueryDto) {
    const options = { limit: query.limit, page: query.page };
    return this.usersService.findAll(query, options);
  }

  @Get(':id')
  @Permissions(Permission.USER_VIEW)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(Permission.USER_EDIT)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/set-password')
  @Permissions(Permission.USER_EDIT)
  setPassword(@Param('id') id: string, @Body() setPasswordDto: SetPasswordDto) {
    return this.usersService.setPassword(+id, setPasswordDto);
  }

  @Delete(':id')
  @Permissions(Permission.USER_DELETE)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
