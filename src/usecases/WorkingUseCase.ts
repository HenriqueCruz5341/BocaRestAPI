import WorkingCreateDto from '@src/models/working/WorkingCreateDto';
import WorkingEntity from '@src/entities/WorkingEntity';
import WorkingRepositoryInterface from '@src/repositories/working/WorkingRepositoryInterface';
import WorkingUpdateDto from '@src/models/working/WorkingUpdateDto';
import { IdWorking } from '@src/models/interfaces';

export default class WorkingUseCase {
  constructor(readonly working: WorkingRepositoryInterface) {}

  async findByContest(idC: number): Promise<WorkingEntity[]> {
    const workings = await this.working.findByContest(idC);
    return workings;
  }

  async create(workingCreateDto: WorkingCreateDto): Promise<WorkingEntity> {
    const workings = await this.working.create(workingCreateDto);
    return workings;
  }

  async findById(id: IdWorking): Promise<WorkingEntity | null> {
    const workings = await this.working.findById(id);
    return workings;
  }

  async update(
    id: IdWorking,
    workingUpdateDto: WorkingUpdateDto
  ): Promise<WorkingEntity | null> {
    const working = await this.working.update(id, workingUpdateDto);
    return working;
  }

  async delete(id: IdWorking): Promise<WorkingEntity | null> {
    return await this.working.delete(id);
  }
}
