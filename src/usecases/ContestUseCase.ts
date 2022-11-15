import Contest from '@src/repositories/Contest';

export default class ContestUseCase {
  constructor(readonly contest: Contest) {}

  async list() {
    const contests = await this.contest.findAll();
    return contests;
  }
}
