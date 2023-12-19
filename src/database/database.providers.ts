import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.host,
        port: +process.env.port,
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
