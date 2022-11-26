import ProblemEntity from '@src/entities/ProblemEntity';
import { IdProblem } from '@src/models/interfaces';
import ProblemCreateDto from '@src/models/problem/ProblemCreateDto';
import ProblemUpdateDto from '@src/models/problem/ProblemUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface ProblemRepositoryInterface
  extends RepositoryInterface<
    ProblemEntity,
    IdProblem,
    ProblemCreateDto,
    ProblemUpdateDto
  > {
  findByContest(contestNumber: number): Promise<ProblemEntity[]>;
}
