import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from '../users/users/user.entity';
import { Role } from '../users/roles/role.entity';
import { Permission } from '../users/permissions/permission.entity';

export default class SetupRolesAndPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        { name: 'Permission_View' },
        { name: 'Role_View' },
        { name: 'Role_Create' },
        { name: 'Role_Edit' },
        { name: 'Role_Delete' },
        { name: 'User_View' },
        { name: 'User_Create' },
        { name: 'User_Edit' },
        { name: 'User_Delete' },
        { name: 'Content_Create' },
        { name: 'Content_Edit' },
        { name: 'Content_Delete' },
        { name: 'Episode_Create' },
        { name: 'Episode_Edit' },
        { name: 'Episode_Delete' },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([{ name: 'admin' }])
      .execute();

    const adminRole = await connection
      .getRepository(Role)
      .createQueryBuilder('role')
      .where('role.name = :name', { name: 'admin' })
      .getOne();

    const adminPermissions = await connection
      .getRepository(Permission)
      .createQueryBuilder('permission')
      .getMany();

    await connection
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(adminRole)
      .add(adminPermissions);

    const salt = await genSalt(Number(process.env.SALT_ROUND));
    const password = await hash(process.env.DEFAULT_ADMIN_PASSWORD, salt);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: process.env.DEFAULT_ADMIN_EMAIL,
          password,
          firstName: 'admin',
          lastName: 'admin',
          role: adminRole,
        },
      ])
      .execute();
  }
}
