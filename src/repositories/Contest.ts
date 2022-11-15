import ContestEntity from '@src/entities/ContestEntity';

export default interface Contest {
  findAll(): Promise<ContestEntity[]>;
}
