import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PRODUCT_TYPE } from './product.entity';

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
    nullable: true,
    type: 'int',
    name: 'price',
  })
  price: number | null;

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