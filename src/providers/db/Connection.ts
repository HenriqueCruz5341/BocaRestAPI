export default interface Connection {
  query(statement: string, params?: any[]): Promise<any>;

  none(statement: string, params?: any[]): Promise<null>;

  one<T>(
    statement: string,
    mapTo: (json: any) => T,
    params?: any[]
  ): Promise<T>;

  oneOrNone<T>(
    statement: string,
    mapTo: (json: any) => T | null,
    params?: any[]
  ): Promise<T | null>;

  many<T>(
    statement: string,
    mapTo: (json: any) => T,
    params?: any[]
  ): Promise<T[]>;

  manyOrNone<T>(
    statement: string,
    mapTo: (json: any) => T | null,
    params?: any[]
  ): Promise<T[]>;

  close(): Promise<any>;
}
