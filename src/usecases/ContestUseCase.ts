import ContestCreateDto from '@src/models/contest/ContestCreateDto';
import ContestEntity from '@src/entities/ContestEntity';
import ContestRepositoryInterface from '@src/repositories/contest/ContestRepositoryInterface';
import ContestUpdateDto from '@src/models/contest/ContestUpdateDto';

export default class ContestUseCase {
  constructor(readonly contest: ContestRepositoryInterface) {}

  async list(): Promise<ContestEntity[]> {
    const contests = await this.contest.findAll();
    return contests;
  }

  async create(contestCreateDto: ContestCreateDto): Promise<ContestEntity> {
    const contest = await this.contest.create(contestCreateDto);
    return contest;
  }

  async findById(id: number): Promise<ContestEntity | null> {
    const contest = await this.contest.findById(id);
    return contest;
  }

  async update(
    id: number,
    contestUpdateDto: ContestUpdateDto
  ): Promise<ContestEntity | null> {
    const contest = await this.contest.update(id, contestUpdateDto);
    return contest;
  }

  async delete(id: number): Promise<ContestEntity | null> {
    return await this.contest.delete(id);
  }
}
