import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'business_code',
  database: 'rental',
})
export class BusinessCode {
  @PrimaryColumn({
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
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updatedAt',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deletedAt',
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;
}
