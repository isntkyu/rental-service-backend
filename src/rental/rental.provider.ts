import { DataSource } from 'typeorm';
import { DATA_SOURCE, RENTAL_REPOSITORY } from '../constants';
import { Rental } from './entities/rental.entity';

export const rentalProviders = [
  {
    provide: RENTAL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rental),
    inject: [DATA_SOURCE],
  },
];
