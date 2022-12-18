import Connection from './Connection';
import pgp, { IDatabase, QueryFile } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import path from 'path';

export default class PgPromiseAdapter implements Connection {
  private connection: IDatabase<{}, IClient>;

  constructor() {
    const dbConfig = {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

    this.connection = pgp()(dbConfig);
  }

  upDatabase(file: string): Promise<null> {
    const basePath = path.join(__dirname, '../../');
    const fullPath = path.join(basePath, file);
    const sqlUpDatabase = new QueryFile(fullPath, { minify: true });

    return this.connection.none(sqlUpDatabase);
  }

  query(statement: string, params: any[] = []): Promise<any> {
    return this.connection.query(statement, params);
  }

  none(statement: string, params: any[] = []): Promise<null> {
    return this.connection.none(statement, params);
  }

  one<T>(
    statement: string,
    mapTo: (json: any) => T,
    params: any[] = []
  ): Promise<T> {
    return this.connection.one(statement, params, (row: any) => mapTo(row));
  }

  oneOrNone<T>(
    statement: string,
    mapTo: (json: any) => T | null,
    params: any[] = []
  ): Promise<T | null> {
    return this.connection.oneOrNone(statement, params, (row: any) =>
      mapTo(row)
    );
  }

  async many<T>(
    statement: string,
    mapTo: (json: any) => T,
    params: any[] = []
  ): Promise<T[]> {
    return this.connection
      .many(statement, params)
      .then((rows: any[]) => rows.map((row: any) => mapTo(row)));
  }

  async manyOrNone<T>(
    statement: string,
    mapTo: (json: any) => T | null,
    params: any[] = []
  ): Promise<T[]> {
    return this.connection
      .manyOrNone(statement, params)
      .then((rows: any[]) =>
        rows.length > 0 ? rows.map((row: any) => mapTo(row)) : rows
      );
  }

  close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
