import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const oldRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });

    const permissions = await this.permissionRepository.find({
      where: { id: In(createRoleDto.permissions) },
    });

    if (oldRole)
      throw new HttpException('Role is already exist', HttpStatus.BAD_REQUEST);

    return this.roleRepository.save({ ...createRoleDto, permissions });
  }

  findAll(
    query: RoleQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Role>> {
    const roles = this.roleRepository.createQueryBuilder('role');

    if (query.search) {
      roles.andWhere('role.name like :search', {
        search: `%${query.search}%`,
      });
    }

    return paginate<Role>(roles, options);
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOneOrFail(id, {
      relations: ['permissions'],
    });
  }

  async updateOne(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { permissions, ...data } = updateRoleDto;

    const oldRole = await this.roleRepository.findOne({
      where: { name: updateRoleDto.name, id: Not(id) },
    });

    if (oldRole)
      throw new HttpException('Role is already exist', HttpStatus.BAD_REQUEST);

    const role = await this.roleRepository.findOneOrFail(id);

    const _permissions = await this.permissionRepository.find({
      where: { id: In(updateRoleDto.permissions) },
    });

    return this.roleRepository.save({
      ...role,
      permissions: _permissions,
      ...data,
    });
  }

  async deleteOne(id: number) {
    const role = await this.roleRepository.findOneOrFail(id);

    const user = await this.userRepository.count({
      where: { role: role.id },
    });

    if (user)
      throw new HttpException(
        'still have user using this role',
        HttpStatus.BAD_REQUEST,
      );

    return this.roleRepository.softDelete(id);
  }
}
