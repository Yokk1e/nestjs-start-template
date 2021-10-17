import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Role extends ManagedEntity {
  @Column({ length: 255, unique: true })
  name: string;

  @OneToMany((type) => User, (user) => user.role)
  users: User[];

  @ManyToMany((type) => Permission)
  @JoinTable()
  permissions: Permission[];
}
