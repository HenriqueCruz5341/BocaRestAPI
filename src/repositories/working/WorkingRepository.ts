import { IdWorking } from '@src/models/interfaces';
import WorkingUpdateDto from '@src/models/working/WorkingUpdateDto';
import Connection from '@src/providers/db/Connection';
import WorkingEntity from '../../entities/WorkingEntity';
import WorkingCreateDto from '../../models/working/WorkingCreateDto';
import WorkingRepositoryInterface from './WorkingRepositoryInterface';

export default class WorkingRepository implements WorkingRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<WorkingEntity[]> {
    const workings = await this.connection.manyOrNone<WorkingEntity>(
      'select * from workingtable order by contestnumber, workingnumber',
      WorkingEntity.fromJson
    );

    return workings;
  }

  async findByContest(idC: number): Promise<WorkingEntity[]> {
    const workings = await this.connection.manyOrNone<WorkingEntity>(
      'select * from workingtable where contestnumber = $1 order by workingnumber',
      WorkingEntity.fromJson,
      [idC]
    );

    return workings;
  }

  async create(workingCreateDto: WorkingCreateDto): Promise<WorkingEntity> {
    const working = await this.connection.one<WorkingEntity>(
      `insert into workingtable
        (contestnumber, workingnumber, workingname, workingstartdate, workingenddate, workinglastanswerdate, workingmaxfilesize, workingismultilogin, createdat, updatedat, deletedat)
      values  
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      returning *`,
      WorkingEntity.fromJson,
      [
        workingCreateDto.getContestNumber(),
        workingCreateDto.getWorkingNumber(),
        workingCreateDto.getWorkingName(),
        workingCreateDto.getWorkingStartDate(),
        workingCreateDto.getWorkingEndDate(),
        workingCreateDto.getWorkingLastAnswerDate(),
        workingCreateDto.getWorkingMaxFileSize(),
        workingCreateDto.getWorkingIsMultiLogin(),
        Math.trunc(new Date().getTime() / 1000),
        Math.trunc(new Date().getTime() / 1000),
        null,
      ]
    );
    return working;
  }

  findById(id: IdWorking): Promise<WorkingEntity | null> {
    const working = this.connection.oneOrNone<WorkingEntity>(
      'select * from workingtable where workingnumber = $1 and contestnumber = $2',
      this.mapToEntityOrNull,
      [id.idW, id.idC]
    );
    return working;
  }

  update(
    id: IdWorking,
    workingUpdateDto: WorkingUpdateDto
  ): Promise<WorkingEntity | null> {
    const working = this.connection.oneOrNone<WorkingEntity>(
      `update workingtable 
      set workingname = $3, workingstartdate = $4, workingenddate = $5, workinglastanswerdate = $6, workingmaxfilesize = $7, workingismultilogin = $8, updatedat = $9
      where workingnumber = $1 and contestnumber = $2
      returning *`,
      this.mapToEntityOrNull,
      [
        id.idW,
        id.idC,
        workingUpdateDto.getWorkingName(),
        workingUpdateDto.getWorkingStartDate(),
        workingUpdateDto.getWorkingEndDate(),
        workingUpdateDto.getWorkingLastAnswerDate(),
        workingUpdateDto.getWorkingMaxFileSize(),
        workingUpdateDto.getWorkingIsMultiLogin(),
        Math.trunc(new Date().getTime() / 1000),
      ]
    );
    return working;
  }

  async delete(id: IdWorking): Promise<WorkingEntity | null> {
    return this.connection.oneOrNone(
      'delete from workingtable where workingnumber = $1 and contestnumber = $2 returning *',
      this.mapToEntityOrNull,
      [id.idW, id.idC]
    );
  }

  mapToEntityOrNull(json: any): WorkingEntity | null {
    return json !== null ? WorkingEntity.fromJson(json) : null;
  }
}
