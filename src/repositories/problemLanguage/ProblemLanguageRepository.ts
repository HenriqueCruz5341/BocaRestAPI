import ProblemLanguageDeleteDto from '@src/models/problemLanguage/ProblemLanguageDeleteDto';
import Connection from '@src/providers/db/Connection';
import ProblemLanguageEntity from '../../entities/ProblemLanguageEntity';
import ProblemLanguageCreateDto from '../../models/problemLanguage/ProblemLanguageCreateDto';
import ProblemLanguageRepositoryInterface from './ProblemLanguageRepositoryInterface';

export default class ProblemLanguageRepository
  implements ProblemLanguageRepositoryInterface
{
  constructor(readonly connection: Connection) {}

  async findByContestAndProblem(
    idC: number,
    idP: number
  ): Promise<ProblemLanguageEntity[]> {
    const problemLanguages =
      await this.connection.manyOrNone<ProblemLanguageEntity>(
        `select * from problemlangtable where contestnumber = $1 and problemnumber = $2`,
        ProblemLanguageEntity.fromJson,
        [idC, idP]
      );

    return problemLanguages;
  }

  async createMany(
    problemLanguageCreateDto: ProblemLanguageCreateDto
  ): Promise<ProblemLanguageEntity[]> {
    let values: string[] = [];
    let init = 3;

    problemLanguageCreateDto.getLanguageNumbers().forEach((langNumber) => {
      values.push(`($1, $2, $${init})`);
      init++;
    });
    const resultValues = values.join(', ');

    const problemLanguages = await this.connection.many<ProblemLanguageEntity>(
      `insert into problemlangtable
        (contestnumber, problemnumber, langnumber)
      values  
        ${resultValues}
      returning *`,
      ProblemLanguageEntity.fromJson,
      [
        problemLanguageCreateDto.getContestNumber(),
        problemLanguageCreateDto.getProblemNumber(),
        ...problemLanguageCreateDto.getLanguageNumbers(),
      ]
    );
    return problemLanguages;
  }

  async deleteMany(
    problemLanguageDeleteDto: ProblemLanguageDeleteDto
  ): Promise<ProblemLanguageEntity[] | null> {
    let values: string[] = [];
    let init = 3;

    problemLanguageDeleteDto.getLanguageNumbers().forEach((langNumber) => {
      values.push(`langnumber = $${init}`);
      init++;
    });
    const resultValues = values.join(' or ');

    return this.connection.manyOrNone(
      `delete from problemlangtable where problemnumber = $1 and contestnumber = $2 and (${resultValues}) returning *`,
      ProblemLanguageEntity.fromJson,
      [
        problemLanguageDeleteDto.getProblemNumber(),
        problemLanguageDeleteDto.getContestNumber(),
        ...problemLanguageDeleteDto.getLanguageNumbers(),
      ]
    );
  }

  mapToEntityOrNull(json: any): ProblemLanguageEntity | null {
    return json !== null ? ProblemLanguageEntity.fromJson(json) : null;
  }
}
