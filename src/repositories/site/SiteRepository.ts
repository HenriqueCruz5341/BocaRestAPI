import { IdSite } from '@src/models/interfaces';
import SiteUpdateDto from '@src/models/site/SiteUpdateDto';
import Connection from '@src/providers/db/Connection';
import SiteEntity from '../../entities/SiteEntity';
import SiteCreateDto from '../../models/site/SiteCreateDto';
import SiteRepositoryInterface from './SiteRepositoryInterface';

export default class SiteRepository implements SiteRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<SiteEntity[]> {
    const sites = await this.connection.manyOrNone<SiteEntity>(
      'select * from sitetable order by contestnumber, sitenumber',
      SiteEntity.fromJson
    );

    return sites;
  }

  async findByContest(idC: number): Promise<SiteEntity[]> {
    const sites = await this.connection.manyOrNone<SiteEntity>(
      'select * from sitetable where contestnumber = $1 order by sitenumber',
      SiteEntity.fromJson,
      [idC]
    );

    return sites;
  }

  async create(siteCreateDto: SiteCreateDto): Promise<SiteEntity> {
    const site = await this.connection.one<SiteEntity>(
      `insert into sitetable
        (contestnumber, sitenumber, siteip, sitename, siteactive, sitepermitlogins, siteglobalscore, sitescorelevel, sitenextuser, sitenextclar, sitenextrun, sitenexttask, sitemaxtask, updatetime, sitechiefname, sitemaxruntime, sitemaxjudgewaittime, sitelastmileanswer, sitelastmilescore, siteduration, siteautoend, sitejudging, sitetasking, siteautojudge)
      values  
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      returning *`,
      SiteEntity.fromJson,
      [
        siteCreateDto.getContestNumber(),
        siteCreateDto.getSiteNumber(),
        siteCreateDto.getSiteIp(),
        siteCreateDto.getSiteName(),
        siteCreateDto.getSiteActive(),
        siteCreateDto.getSitePermitLogins(),
        siteCreateDto.getSiteGlobalScore(),
        siteCreateDto.getSiteScoreLevel(),
        siteCreateDto.getSiteNextUser(),
        siteCreateDto.getSiteNextClar(),
        siteCreateDto.getSiteNextRun(),
        siteCreateDto.getSiteNextTask(),
        siteCreateDto.getSiteMaxTask(),
        Math.trunc(new Date().getTime() / 1000),
        siteCreateDto.getSiteChiefName(),
        siteCreateDto.getSiteMaxRuntime(),
        siteCreateDto.getSiteMaxJudgeWaitTime(),
        siteCreateDto.getSiteLastMileAnswer(),
        siteCreateDto.getSiteLastMileScore(),
        siteCreateDto.getSiteDuration(),
        siteCreateDto.getSiteAutoEnd(),
        siteCreateDto.getSiteJudging(),
        siteCreateDto.getSiteTasking(),
        siteCreateDto.getSiteAutoJudge(),
      ]
    );
    return site;
  }

  findById(id: IdSite): Promise<SiteEntity | null> {
    const site = this.connection.oneOrNone<SiteEntity>(
      'select * from sitetable where sitenumber = $1 and contestnumber = $2',
      this.mapToEntityOrNull,
      [id.idS, id.idC]
    );
    return site;
  }

  update(id: IdSite, siteUpdateDto: SiteUpdateDto): Promise<SiteEntity | null> {
    const site = this.connection.oneOrNone<SiteEntity>(
      `update sitetable 
      set siteip = $3, sitename = $4, siteactive = $5, sitepermitlogins = $6, siteglobalscore = $7, sitescorelevel = $8, sitenextuser = $9, sitenextclar = $10, sitenextrun = $11, sitenexttask = $12, sitemaxtask = $13, updatetime = $14, sitechiefname = $15, sitemaxruntime = $16, sitemaxjudgewaittime = $17, sitelastmileanswer = $18, sitelastmilescore = $19, siteduration = $20, siteautoend = $21, sitejudging = $22, sitetasking = $23, siteautojudge = $24
      where sitenumber = $1 and contestnumber = $2
      returning *`,
      this.mapToEntityOrNull,
      [
        id.idS,
        id.idC,
        siteUpdateDto.getSiteIp(),
        siteUpdateDto.getSiteName(),
        siteUpdateDto.getSiteActive(),
        siteUpdateDto.getSitePermitLogins(),
        siteUpdateDto.getSiteGlobalScore(),
        siteUpdateDto.getSiteScoreLevel(),
        siteUpdateDto.getSiteNextUser(),
        siteUpdateDto.getSiteNextClar(),
        siteUpdateDto.getSiteNextRun(),
        siteUpdateDto.getSiteNextTask(),
        siteUpdateDto.getSiteMaxTask(),
        Math.trunc(new Date().getTime() / 1000),
        siteUpdateDto.getSiteChiefName(),
        siteUpdateDto.getSiteMaxRuntime(),
        siteUpdateDto.getSiteMaxJudgeWaitTime(),
        siteUpdateDto.getSiteLastMileAnswer(),
        siteUpdateDto.getSiteLastMileScore(),
        siteUpdateDto.getSiteDuration(),
        siteUpdateDto.getSiteAutoEnd(),
        siteUpdateDto.getSiteJudging(),
        siteUpdateDto.getSiteTasking(),
        siteUpdateDto.getSiteAutoJudge(),
      ]
    );
    return site;
  }

  async delete(id: IdSite): Promise<SiteEntity | null> {
    return this.connection.oneOrNone(
      'delete from sitetable where sitenumber = $1 and contestnumber = $2 returning *',
      this.mapToEntityOrNull,
      [id.idS, id.idC]
    );
  }

  mapToEntityOrNull(json: any): SiteEntity | null {
    return json !== null ? SiteEntity.fromJson(json) : null;
  }
}
