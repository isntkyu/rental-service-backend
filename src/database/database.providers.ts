import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
      });

      return dataSource.initialize();
    },
  },
];
