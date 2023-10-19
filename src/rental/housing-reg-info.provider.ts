import { DataSource } from 'typeorm';
import { DATA_SOURCE, HOUSING_REG_INFO_REPOSITORY } from '../constants';
import { HousingRegInfo } from './entities/housing-reg-info.entity';

export const housingRegInfoProviders = [
  {
    provide: HOUSING_REG_INFO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HousingRegInfo),
    inject: [DATA_SOURCE],
  },
];
