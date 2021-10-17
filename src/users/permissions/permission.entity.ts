import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class Permission extends ManagedEntity {
  @Column({ length: 255, unique: true })
  name: string;
}
