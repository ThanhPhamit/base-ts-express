import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigApp } from '@/config/constant';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: ConfigApp.DATABASE.TYPE,
  host: ConfigApp.DATABASE.HOST,
  port: ConfigApp.DATABASE.PORT,
  username: ConfigApp.DATABASE.USERNAME,
  password: ConfigApp.DATABASE.PASSWORD,
  database: ConfigApp.DATABASE.DATABASE,
  schema: ConfigApp.DATABASE.SCHEMA,
  synchronize: false,
  logging: ConfigApp.DATABASE.LOGGING,
  entities: [`${__dirname}/../modules/**/entities/*.entity.{js,ts}`],
  subscribers: [],
  migrations: [`${__dirname}/../db/migrations/*.{js,ts}`],
  factories: [`${__dirname}/../db/factories/*.factory.{js,ts}`],
  seeds: [`${__dirname}/../db/seeds/*.seed.{js,ts}`],
};

export const AppDataSource = new DataSource(options);
