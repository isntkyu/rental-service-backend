import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { BusinessCode } from '../../user/entities/business-code.entity';

export default class BusinessCodeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(BusinessCode);
    await repository.clear();
    await repository.query('set foreign_key_checks = 0;');
    await repository.insert([
      {
        userId: 1,
        businessCode: '00123',
      },
    ]);
  }
}
