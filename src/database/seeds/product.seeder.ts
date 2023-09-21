import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product, PRODUCT_TYPE } from '../../rental/entities/product.entity';

export default class ProductSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Product);
    await repository.clear();
    await repository.insert([
      {
        serialNumber: 'ABCD-EFGH',
        productType: PRODUCT_TYPE.PRO,
      },
      {
        serialNumber: 'ZXCV-EFGH',
        productType: PRODUCT_TYPE.LIGHT,
      },
    ]);
  }
}
