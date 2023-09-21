import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User, UserType } from '../../user/entities/user.entity';
import { Rental } from '../../rental/entities/rental.entity';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const rentalRepository = dataSource.getRepository(Rental);
    await rentalRepository.clear();
    await repository.clear();
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
      {
        email: 'user2@email.com',
        name: '사용자B',
        userType: UserType.GENERAL,
        password: 'general@2',
      },
    ]);
  }
}
