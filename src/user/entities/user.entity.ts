import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessCode } from './business-code.entity';
import { Rental } from '../../rental/entities/rental.entity';

export enum UserType {
  GENERAL = 'general',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

@Entity({
  database: 'rental_web',
  name: 'user',
})
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

  @OneToOne(() => BusinessCode, (businessCode) => businessCode.user)
  businessCode?: BusinessCode;

  @OneToMany(() => Rental, (rental) => rental.rentalUser)
  rentals?: Rental[];
}
