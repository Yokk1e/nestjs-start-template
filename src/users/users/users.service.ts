import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcrypt';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.roleRepository.findOneOrFail(createUserDto.role);

    const oldUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (oldUser) {
      throw new BadRequestException('Email is already exist');
    }

    const salt = await genSalt(Number(this.configService.get('SALT_ROUND')));
    const password = await hash(createUserDto.password, salt);

    return this.userRepository.save({ ...createUserDto, password });
  }

  findAll(
    query: UserQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    const users = this.userRepository.createQueryBuilder('user');

    if (query.search) {
      users.andWhere('user.email like :search', {
        search: `%${query.search}%`,
      });
    }

    return paginate<User>(users, options);
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const email = await this.userRepository.findOne({
      where: { email: updateUserDto.email, id: Not(id) },
    });

    if (email) {
      throw new BadRequestException('Email is already exist');
    }

    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async setPassword(id: number, setPassowrDto: SetPasswordDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const salt = await genSalt(Number(this.configService.get('SALT_ROUND')));
    const password = await hash(setPassowrDto.password, salt);

    return this.userRepository.save({ ...user, password });
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
