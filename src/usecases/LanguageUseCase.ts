import LanguageCreateDto from '@src/models/language/LanguageCreateDto';
import LanguageEntity from '@src/entities/LanguageEntity';
import LanguageRepositoryInterface from '@src/repositories/language/LanguageRepositoryInterface';
import LanguageUpdateDto from '@src/models/language/LanguageUpdateDto';
import { IdLanguage } from '@src/models/interfaces';

export default class LanguageUseCase {
  constructor(readonly language: LanguageRepositoryInterface) {}

  async listByContest(idC: number): Promise<LanguageEntity[]> {
    const languages = await this.language.findByContest(idC);
    return languages;
  }

  async create(languageCreateDto: LanguageCreateDto): Promise<LanguageEntity> {
    const languages = await this.language.create(languageCreateDto);
    return languages;
  }

  async findById(id: IdLanguage): Promise<LanguageEntity | null> {
    const languages = await this.language.findById(id);
    return languages;
  }

  async update(
    id: IdLanguage,
    languageUpdateDto: LanguageUpdateDto
  ): Promise<LanguageEntity | null> {
    const language = await this.language.update(id, languageUpdateDto);
    return language;
  }

  async delete(id: IdLanguage): Promise<LanguageEntity | null> {
    return await this.language.delete(id);
  }
}
