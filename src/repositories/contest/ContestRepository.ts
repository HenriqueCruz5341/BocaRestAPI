import ContestEntity from '../../entities/ContestEntity';
import ContestCreateDto from '../../models/contest/ContestCreateDto';
import Connection from '@src/providers/db/Connection';
import ContestRepositoryInterface from './ContestRepositoryInterface';
import ContestUpdateDto from '@src/models/contest/ContestUpdateDto';

export default class ContestRepository implements ContestRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<ContestEntity[]> {
    const contests = await this.connection.manyOrNone<ContestEntity>(
      'select * from contesttable order by contestnumber',
      ContestEntity.fromJson
    );
    return contests;
  }

  async create(contestCreateDto: ContestCreateDto): Promise<ContestEntity> {
    const contest = await this.connection.one<ContestEntity>(
      `insert into contesttable
        (contestnumber, contestname, conteststartdate, contestduration, contestlocalsite, contestpenalty, contestmaxfilesize, contestactive, contestmainsite, contestkeys, contestunlockkey, contestmainsiteurl, updatetime)
      values  
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      returning *`,
      ContestEntity.fromJson,
      [
        contestCreateDto.getContestNumber(),
        contestCreateDto.getContestName(),
        contestCreateDto.getContestStartDate(),
        contestCreateDto.getContestDuration(),
        contestCreateDto.getContestLocalSite(),
        contestCreateDto.getContestPenalty(),
        contestCreateDto.getContestMaxFileSize(),
        contestCreateDto.getContestActive(),
        contestCreateDto.getContestMainSite(),
        contestCreateDto.getContestKeys(),
        contestCreateDto.getContestUnlockKey(),
        contestCreateDto.getContestMainSiteUrl(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return contest;
  }

  findById(id: number): Promise<ContestEntity | null> {
    const contest = this.connection.oneOrNone<ContestEntity>(
      'select * from contesttable where contestnumber = $1',
      this.mapToEntityOrNull,
      [id.toString()]
    );
    return contest;
  }

  update(
    id: number,
    contestUpdateDto: ContestUpdateDto
  ): Promise<ContestEntity | null> {
    const contest = this.connection.oneOrNone<ContestEntity>(
      `update contesttable 
      set contestname = $2, conteststartdate = $3, contestduration = $4, contestlocalsite = $5, contestpenalty = $6, contestmaxfilesize = $7, contestactive = $8, contestmainsite = $9, contestkeys = $10, contestunlockkey = $11, contestmainsiteurl = $12, updatetime = $13
      where contestnumber = $1 
      returning *`,
      this.mapToEntityOrNull,
      [
        id,
        contestUpdateDto.getContestName(),
        contestUpdateDto.getContestStartDate(),
        contestUpdateDto.getContestDuration(),
        contestUpdateDto.getContestLocalSite(),
        contestUpdateDto.getContestPenalty(),
        contestUpdateDto.getContestMaxFileSize(),
        contestUpdateDto.getContestActive(),
        contestUpdateDto.getContestMainSite(),
        contestUpdateDto.getContestKeys(),
        contestUpdateDto.getContestUnlockKey(),
        contestUpdateDto.getContestMainSiteUrl(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return contest;
  }

  async delete(id: number): Promise<ContestEntity | null> {
    return this.connection.oneOrNone(
      'delete from contesttable where contestnumber = $1 returning *',
      this.mapToEntityOrNull,
      [id.toString()]
    );
  }

  mapToEntityOrNull(json: any): ContestEntity | null {
    return json !== null ? ContestEntity.fromJson(json) : null;
  }
}
