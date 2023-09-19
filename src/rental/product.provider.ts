import { DataSource } from 'typeorm';
import { DATA_SOURCE, PRODUCT_REPOSITORY } from '../constants';
import { Product } from './entities/product.entity';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [DATA_SOURCE],
  },
];
