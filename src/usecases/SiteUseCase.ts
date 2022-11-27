import SiteCreateDto from '@src/models/site/SiteCreateDto';
import SiteEntity from '@src/entities/SiteEntity';
import SiteRepositoryInterface from '@src/repositories/site/SiteRepositoryInterface';
import SiteUpdateDto from '@src/models/site/SiteUpdateDto';
import { IdSite } from '@src/models/interfaces';

export default class SiteUseCase {
  constructor(readonly site: SiteRepositoryInterface) {}

  async listByContest(idC: number): Promise<SiteEntity[]> {
    const sites = await this.site.findByContest(idC);
    return sites;
  }

  async create(siteCreateDto: SiteCreateDto): Promise<SiteEntity> {
    const sites = await this.site.create(siteCreateDto);
    return sites;
  }

  async findById(id: IdSite): Promise<SiteEntity | null> {
    const sites = await this.site.findById(id);
    return sites;
  }

  async update(
    id: IdSite,
    siteUpdateDto: SiteUpdateDto
  ): Promise<SiteEntity | null> {
    const site = await this.site.update(id, siteUpdateDto);
    return site;
  }

  async delete(id: IdSite): Promise<SiteEntity | null> {
    return await this.site.delete(id);
  }
}
