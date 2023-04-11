import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  synchronize: true,
  type: 'mysql',
  host: process.env.DATABASE_TYPE,
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'ecommerce_platform',
  entities: ['dist/**/*.entity.js'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
