export default interface RepositoryManyInterface<R, S, T> {
  createMany(createDto: T): Promise<R[]>;
  deleteMany(deleteDto: S): Promise<R[] | null>;
}
