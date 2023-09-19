import { DataSource } from 'typeorm';
import { BUSINESS_CODE_REPOSITORY, DATA_SOURCE } from '../constants';
import { BusinessCode } from './entities/business-code.entity';

export const businessCodeProviders = [
  {
    provide: BUSINESS_CODE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BusinessCode),
    inject: [DATA_SOURCE],
  },
];
