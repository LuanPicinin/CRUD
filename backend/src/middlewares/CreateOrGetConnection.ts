import { NextFunction, Request, Response } from 'express';
import {
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';

const objConnection = {
  name: process.env.POSTGRES_NAME,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  type: 'postgres',
  entities: ['./src/models/*.ts'],
  migrations: ['./src/shared/migrations/*.ts'],
  cli: { migrationsDir: './src/shared/migrations' },
} as ConnectionOptions;

export default async function CreateOrGetConnection(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hasConnection = getConnectionManager().has(
      process.env.POSTGRES_DATABASE || 'postgres'
    );

    if (!hasConnection) {
      await createConnection(objConnection);
    }

    const getConnection = getConnectionManager().get(
      process.env.POSTGRES_DATABASE || 'postgres'
    );

    if (!getConnection.isConnected) {
      await createConnection(objConnection);
    }

    return next();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
