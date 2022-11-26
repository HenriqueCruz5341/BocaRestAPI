import LanguageEntity from '../../entities/LanguageEntity';
import LanguageCreateDto from '../../models/language/LanguageCreateDto';
import Connection from '@src/providers/db/Connection';
import LanguageRepositoryInterface from './LanguageRepositoryInterface';
import LanguageUpdateDto from '@src/models/language/LanguageUpdateDto';
import { IdLanguage } from '@src/models/interfaces';

export default class LanguageRepository implements LanguageRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<LanguageEntity[]> {
    const languages = await this.connection.manyOrNone<LanguageEntity>(
      'select * from langtable order by contestnumber, langnumber',
      LanguageEntity.fromJson
    );

    return languages;
  }

  async findByContest(idC: number): Promise<LanguageEntity[]> {
    const languages = await this.connection.manyOrNone<LanguageEntity>(
      'select * from langtable where contestnumber = $1 order by langnumber',
      LanguageEntity.fromJson,
      [idC]
    );

    return languages;
  }

  async create(languageCreateDto: LanguageCreateDto): Promise<LanguageEntity> {
    const language = await this.connection.one<LanguageEntity>(
      `insert into langtable
        (contestnumber, langnumber, langname, langextension, updatetime)
      values  
        ($1, $2, $3, $4, $5)
      returning *`,
      LanguageEntity.fromJson,
      [
        languageCreateDto.getContestNumber(),
        languageCreateDto.getLangNumber(),
        languageCreateDto.getLangName(),
        languageCreateDto.getLangExtension(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return language;
  }

  findById(id: IdLanguage): Promise<LanguageEntity | null> {
    const language = this.connection.oneOrNone<LanguageEntity>(
      'select * from langtable where langnumber = $1 and contestnumber = $2',
      this.mapToEntityOrNull,
      [id.idL, id.idC]
    );
    return language;
  }

  update(
    id: IdLanguage,
    languageUpdateDto: LanguageUpdateDto
  ): Promise<LanguageEntity | null> {
    const language = this.connection.oneOrNone<LanguageEntity>(
      `update langtable 
      set langname = $3, langextension = $4, updatetime = $5
      where langnumber = $1 and contestnumber = $2
      returning *`,
      this.mapToEntityOrNull,
      [
        id.idL,
        id.idC,
        languageUpdateDto.getLangName(),
        languageUpdateDto.getLangExtension(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return language;
  }

  async delete(id: IdLanguage): Promise<LanguageEntity | null> {
    return this.connection.oneOrNone(
      'delete from langtable where langnumber = $1 and contestnumber = $2 returning *',
      this.mapToEntityOrNull,
      [id.idL, id.idC]
    );
  }

  mapToEntityOrNull(json: any): LanguageEntity | null {
    return json !== null ? LanguageEntity.fromJson(json) : null;
  }
}
