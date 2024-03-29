import ProblemEntity from '../../entities/ProblemEntity';
import ProblemCreateDto from '../../models/problem/ProblemCreateDto';
import Connection from '@src/providers/db/Connection';
import ProblemRepositoryInterface from './ProblemRepositoryInterface';
import ProblemUpdateDto from '@src/models/problem/ProblemUpdateDto';
import { IdProblem } from '@src/models/interfaces';

export default class ProblemRepository implements ProblemRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<ProblemEntity[]> {
    const problems = await this.connection.manyOrNone<ProblemEntity>(
      'select * from problemtable order by contestnumber, problemnumber',
      ProblemEntity.fromJson
    );

    return problems;
  }

  async findByContest(idC: number): Promise<ProblemEntity[]> {
    const problems = await this.connection.manyOrNone<ProblemEntity>(
      'select * from problemtable where contestnumber = $1 order by problemnumber',
      ProblemEntity.fromJson,
      [idC]
    );

    return problems;
  }

  async create(problemCreateDto: ProblemCreateDto): Promise<ProblemEntity> {
    const problem = await this.connection.one<ProblemEntity>(
      `insert into problemtable
        (contestnumber, problemnumber, workingnumber, problemname, problemfullname, problembasefilename, probleminputfilename, probleminputfile, probleminputfilehash, fake, problemcolorname, problemcolor, updatetime)
      values  
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      returning *`,
      ProblemEntity.fromJson,
      [
        problemCreateDto.getContestNumber(),
        problemCreateDto.getProblemNumber(),
        problemCreateDto.getWorkingNumber(),
        problemCreateDto.getProblemName(),
        problemCreateDto.getProblemFullName(),
        problemCreateDto.getProblemBaseFileName(),
        problemCreateDto.getProblemInputFileName(),
        problemCreateDto.getProblemInputFile(),
        problemCreateDto.getProblemInputFileHash(),
        problemCreateDto.getFake(),
        problemCreateDto.getProblemColorName(),
        problemCreateDto.getProblemColor(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return problem;
  }

  findById(id: IdProblem): Promise<ProblemEntity | null> {
    const problem = this.connection.oneOrNone<ProblemEntity>(
      'select * from problemtable where problemnumber = $1 and contestnumber = $2',
      this.mapToEntityOrNull,
      [id.idP, id.idC]
    );
    return problem;
  }

  update(
    id: IdProblem,
    problemUpdateDto: ProblemUpdateDto
  ): Promise<ProblemEntity | null> {
    const problem = this.connection.oneOrNone<ProblemEntity>(
      `update problemtable 
      set workingnumber = $3, problemname = $4, problemfullname = $5, problembasefilename = $6, probleminputfilename = $7, probleminputfile = $8, probleminputfilehash = $9, fake = $10, problemcolorname = $11, problemcolor = $12, updatetime = $13
      where problemnumber = $1 and contestnumber = $2
      returning *`,
      this.mapToEntityOrNull,
      [
        id.idP,
        id.idC,
        problemUpdateDto.getWorkingNumber(),
        problemUpdateDto.getProblemName(),
        problemUpdateDto.getProblemFullName(),
        problemUpdateDto.getProblemBaseFileName(),
        problemUpdateDto.getProblemInputFileName(),
        problemUpdateDto.getProblemInputFile(),
        problemUpdateDto.getProblemInputFileHash(),
        problemUpdateDto.getFake(),
        problemUpdateDto.getProblemColorName(),
        problemUpdateDto.getProblemColor(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return problem;
  }

  async delete(id: IdProblem): Promise<ProblemEntity | null> {
    return this.connection.oneOrNone(
      'delete from problemtable where problemnumber = $1 and contestnumber = $2 returning *',
      this.mapToEntityOrNull,
      [id.idP, id.idC]
    );
  }

  mapToEntityOrNull(json: any): ProblemEntity | null {
    return json !== null ? ProblemEntity.fromJson(json) : null;
  }
}
