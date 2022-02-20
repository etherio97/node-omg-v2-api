import { PG_DATABASE_URL } from '@/config';
import { Pool, PoolClient } from 'pg';

export let db: PoolClient;

export const connect = () =>
  new Pool({
    connectionString: PG_DATABASE_URL,
  })
    .connect()
    .then((value) => (db = value));

export const sql = (args) => {
  console.log(args);
  return args;
};
