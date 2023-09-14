import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessCode } from './business-code.entity';

export enum UserType {
  GENERAL = 'general',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'userId',
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
    name: 'userType',
  })
  userType: UserType;

  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deletedAt',
    default: null,
  })
  deletedAt: Date | null;

  @OneToOne(() => BusinessCode, (businessCode) => businessCode.user)
  businessCode?: BusinessCode;
}
