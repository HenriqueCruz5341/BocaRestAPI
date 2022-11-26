import Connection from './Connection';
import * as dbConfig from '../../../db-config.json';
import pgp, { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

export default class PgPromiseAdapter implements Connection {
  private connection: IDatabase<{}, IClient>;

  constructor() {
    this.connection = pgp()(dbConfig);
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
