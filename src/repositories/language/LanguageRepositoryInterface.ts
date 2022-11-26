import LanguageEntity from '@src/entities/LanguageEntity';
import { IdLanguage } from '@src/models/interfaces';
import LanguageCreateDto from '@src/models/language/LanguageCreateDto';
import LanguageUpdateDto from '@src/models/language/LanguageUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface LanguageRepositoryInterface
  extends RepositoryInterface<
    LanguageEntity,
    IdLanguage,
    LanguageCreateDto,
    LanguageUpdateDto
  > {
  findByContest(contestNumber: number): Promise<LanguageEntity[]>;
}
