import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Bbaebak } from 'src/apis/bbaebaks/entities/bbaebak.entity';
import { Mate } from 'src/apis/bbaebaks/entities/mate.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Bbaebak, Mate],
  migrations: [__dirname + '/src/migrations/*.ts'],
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: false,
  keepConnectionAlive: true,
};

export = config;
