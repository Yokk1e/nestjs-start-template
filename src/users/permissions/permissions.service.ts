import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { Permission } from './permission.entity';
import { PermissionQueryDto } from './dto/permission-query.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  findAll(
    query: PermissionQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Permission>> {
    const permissions =
      this.permissionRepository.createQueryBuilder('permission');

    if (query.search) {
      permissions.andWhere('permission.name like :search', {
        search: `%${query.search}%`,
      });
    }

    return paginate<Permission>(permissions, options);
  }

  async findOne(id: number): Promise<Permission> {
    return this.permissionRepository.findOneOrFail(id);
  }
}
