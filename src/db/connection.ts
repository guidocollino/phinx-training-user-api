import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

export const connect = async (): Promise<Connection> => {
  const connection: Connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'user_api_develop',
    synchronize: false,
    entities: ['dist/db/entity/*.{ts,js}'],
    migrations: ['dist/db/migration/*.{ts,js}'],
    cli: {
      entitiesDir: '@db/entity',
      migrationsDir: '@db/migration'
  }
  });
  return connection;
};
