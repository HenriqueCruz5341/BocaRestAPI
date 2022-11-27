import ProblemCreateDto from '@src/models/problem/ProblemCreateDto';
import ProblemEntity from '@src/entities/ProblemEntity';
import ProblemRepositoryInterface from '@src/repositories/problem/ProblemRepositoryInterface';
import ProblemUpdateDto from '@src/models/problem/ProblemUpdateDto';
import { IdProblem } from '@src/models/interfaces';

export default class ProblemUseCase {
  constructor(readonly problem: ProblemRepositoryInterface) {}

  async listByContest(idC: number): Promise<ProblemEntity[]> {
    const problems = await this.problem.findByContest(idC);
    return problems;
  }

  async create(problemCreateDto: ProblemCreateDto): Promise<ProblemEntity> {
    const problems = await this.problem.create(problemCreateDto);
    return problems;
  }

  async findById(id: IdProblem): Promise<ProblemEntity | null> {
    const problems = await this.problem.findById(id);
    return problems;
  }

  async update(
    id: IdProblem,
    problemUpdateDto: ProblemUpdateDto
  ): Promise<ProblemEntity | null> {
    const problem = await this.problem.update(id, problemUpdateDto);
    return problem;
  }

  async delete(id: IdProblem): Promise<ProblemEntity | null> {
    return await this.problem.delete(id);
  }
}
