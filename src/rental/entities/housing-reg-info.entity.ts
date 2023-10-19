import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'housing_reg_info',
  database: 'diveroid',
})
export class HousingRegInfo {
  @PrimaryColumn({ length: 20, name: 'serial_number' })
  serialNumber: string;

  @Column({ length: 50, name: 'first_register_user_id' })
  firstRegisterUserId: string;

  @Column('bigint', { name: 'first_register_millisecond' })
  firstRegisterMillisecond: number;

  @Column({ length: 50, name: 'register_user_id' })
  registerUserId: string;

  @Column('bigint', { name: 'register_millisecond' })
  registerMillisecond: number;

  @Column({ length: 20, default: 'NONE', name: 'status' })
  status: string;

  @Column({ length: 50, default: 'GENERAL', nullable: true, name: 'role_code' })
  roleCode: string | null;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_date',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_date',
  })
  updateDate: Date;
}
