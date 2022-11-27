import SiteEntity from '@src/entities/SiteEntity';
import { IdSite } from '@src/models/interfaces';
import SiteCreateDto from '@src/models/site/SiteCreateDto';
import SiteUpdateDto from '@src/models/site/SiteUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface SiteRepositoryInterface
  extends RepositoryInterface<
    SiteEntity,
    IdSite,
    SiteCreateDto,
    SiteUpdateDto
  > {
  findByContest(contestNumber: number): Promise<SiteEntity[]>;
}
