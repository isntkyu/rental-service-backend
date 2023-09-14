import { Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

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
}
