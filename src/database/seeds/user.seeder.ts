import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User, UserType } from '../../user/entities/user.entity';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'businessUser@email.com',
        name: '사업자A',
        userType: UserType.BUSINESS,
        password: 'business@2',
      },
      {
        email: 'diveroid@email.com',
        name: '관리자A',
        userType: UserType.ADMIN,
        password: 'diveroid@2',
      },
      {
        email: 'user@email.com',
        name: '사용자A',
        userType: UserType.GENERAL,
        password: 'general@2',
      },
    ]);
  }
}
