import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(<string>process.env.POSTGRES_PORT),
  username: 'postgres',
  password: 'secret',
  database: 'my_movies_db',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  // entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
