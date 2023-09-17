import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PRODUCT_TYPE {
  PRO = '유니버셜 프로 & 미니',
  LIGHT = '유니버셜 라이트',
}

@Entity({
  database: 'rental',
  name: 'product',
})
export class Product {
  @PrimaryColumn({
    unique: true,
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
