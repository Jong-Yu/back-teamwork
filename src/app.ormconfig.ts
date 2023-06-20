import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '327812',
  database: 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  charset: 'utf8mb4_unicode_ci',
  synchronize: true,
};
