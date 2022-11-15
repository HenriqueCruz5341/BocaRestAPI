import ContestEntity from '@src/entities/ContestEntity';
import ContestCreateDto from '@src/models/dtos/ContestCreateDto';

export default interface Contest {
  findAll(): Promise<ContestEntity[]>;
  create(contestCreateDto: ContestCreateDto): Promise<ContestEntity>;
}
