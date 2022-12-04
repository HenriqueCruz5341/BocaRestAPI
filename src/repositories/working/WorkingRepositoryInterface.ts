import WorkingEntity from '@src/entities/WorkingEntity';
import { IdWorking } from '@src/models/interfaces';
import WorkingCreateDto from '@src/models/working/WorkingCreateDto';
import WorkingUpdateDto from '@src/models/working/WorkingUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface ProblemRepositoryInterface
  extends RepositoryInterface<
    WorkingEntity,
    IdWorking,
    WorkingCreateDto,
    WorkingUpdateDto
  > {
  findByContest(contestNumber: number): Promise<WorkingEntity[]>;
}
