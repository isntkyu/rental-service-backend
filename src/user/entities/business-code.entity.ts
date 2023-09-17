import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'business_code',
  database: 'rental',
})
export class BusinessCode {
  @Column({
    unique: true,
    type: 'int',
    nullable: false,
    name: 'userId',
  })
  userId: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 8,
    nullable: false,
    name: 'businessCode',
  })
  businessCode: string;

  @OneToOne(() => User, (user) => user.businessCode)
  @JoinColumn({
    name: 'userId',
  })
  user?: User;

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
}
