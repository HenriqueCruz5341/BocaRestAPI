import ContestCreateDto from 'src/models/dtos/ContestCreateDto';
import Contest from '@src/repositories/Contest';

export default class ContestUseCase {
  constructor(readonly contest: Contest) {}

  async list() {
    const contests = await this.contest.findAll();
    return contests;
  }

  async create(contestCreateDto: ContestCreateDto) {
    const contest = await this.contest.create(contestCreateDto);
    return contest;
  }
}
