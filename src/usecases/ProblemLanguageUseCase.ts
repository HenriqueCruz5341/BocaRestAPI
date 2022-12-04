import ProblemLanguageEntity from '@src/entities/ProblemLanguageEntity';
import ProblemLanguageCreateDto from '@src/models/problemLanguage/ProblemLanguageCreateDto';
import ProblemLanguageDeleteDto from '@src/models/problemLanguage/ProblemLanguageDeleteDto';
import ProblemLanguageRepositoryInterface from '@src/repositories/problemLanguage/ProblemLanguageRepositoryInterface';

export default class ProblemLanguageUseCase {
  constructor(readonly problemLanguage: ProblemLanguageRepositoryInterface) {}

  async findByContestAndProblem(
    idC: number,
    idP: number
  ): Promise<ProblemLanguageEntity[]> {
    const problems = await this.problemLanguage.findByContestAndProblem(
      idC,
      idP
    );
    return problems;
  }

  async createMany(
    problemLanguageCreateDto: ProblemLanguageCreateDto
  ): Promise<ProblemLanguageEntity[]> {
    const problems = await this.problemLanguage.createMany(
      problemLanguageCreateDto
    );
    return problems;
  }

  async deleteMany(
    problemLanguageDeleteDto: ProblemLanguageDeleteDto
  ): Promise<ProblemLanguageEntity[] | null> {
    return await this.problemLanguage.deleteMany(problemLanguageDeleteDto);
  }
}
