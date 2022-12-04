import ProblemLanguageEntity from '@src/entities/ProblemLanguageEntity';
import ProblemLanguageCreateDto from '@src/models/problemLanguage/ProblemLanguageCreateDto';
import ProblemLanguageDeleteDto from '@src/models/problemLanguage/ProblemLanguageDeleteDto';
import RepositoryManyInterface from '../RepositoryManyInterface';

export default interface ProblemLanguageRepositoryInterface
  extends RepositoryManyInterface<
    ProblemLanguageEntity,
    ProblemLanguageDeleteDto,
    ProblemLanguageCreateDto
  > {
  findByContestAndProblem(
    contestNumber: number,
    problemNumber: number
  ): Promise<ProblemLanguageEntity[]>;
}
