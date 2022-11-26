export default interface RepositoryInterface<Q, R, S, T> {
  findAll(): Promise<Q[]>;
  findById(id: R): Promise<Q | null>;
  create(createDto: S): Promise<Q>;
  update(id: R, updateDto: T): Promise<Q | null>;
  delete(id: R): Promise<Q | null>;
}
