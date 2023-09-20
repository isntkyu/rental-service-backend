import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PRODUCT_TYPE } from './product.entity';
import { User } from '../../user/entities/user.entity';

export enum RENTAL_STATUS {
  RENTAL = 100,
  RETURNED = 200,
  PAID = 300,
  SETTLED = 400,
}

@Entity({
  database: 'rental',
  name: 'rental',
})
export class Rental {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'rentalId',
  })
  rentalId: number;

  @Column({
    type: 'datetime',
    name: 'rentalDate',
    nullable: false,
  })
  rentalDate: Date;

  @Column({
    type: 'datetime',
    name: 'returnDate',
    nullable: true,
  })
  returnDate: Date | null;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 10,
    name: 'serialNumber',
  })
  serialNumber: string;

  @Column({
    unique: false,
    nullable: false,
    type: 'varchar',
    length: 55,
    name: 'productType',
  })
  productType: PRODUCT_TYPE;

  @Column({
    name: 'status',
    type: 'int',
    nullable: false,
  })
  status: RENTAL_STATUS;

  @Column({
    name: 'rentalUserId',
    type: 'int',
    nullable: false,
  })
  rentalUserId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'rentalUserEmail',
  })
  rentalUserEmail: string;

  @Column({
    name: 'businessUserId',
    type: 'int',
    nullable: false,
  })
  businessUserId: number;

  @Column({
    type: 'varchar',
    length: 8,
    nullable: false,
    name: 'businessCode',
  })
  businessCode: string;

  @Column({
    nullable: true,
    type: 'int',
    name: 'price',
  })
  price: number | null;

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

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({
    name: 'rentalUserId',
  })
  rentalUser?: User;
}
