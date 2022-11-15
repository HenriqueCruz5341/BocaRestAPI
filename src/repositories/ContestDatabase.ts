import ContestEntity from '@src/entities/ContestEntity';
import ContestCreateDto from '../models/dtos/ContestCreateDto';
import Connection from '@src/providers/db/Connection';
import Contest from './Contest';

export default class CostestDatabase implements Contest {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<ContestEntity[]> {
    const contests = await this.connection.query<ContestEntity[]>(
      'select * from contest'
    );
    return contests;
  }

  async create(contestCreateDto: ContestCreateDto): Promise<ContestEntity> {
    const contests = await this.connection.query<ContestEntity[]>(
      'insert into contest (name, start_time, end_time, description, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning *',
      [
        contestCreateDto.getName(),
        contestCreateDto.getStartTime().toISOString(),
        contestCreateDto.getEndTime().toISOString(),
        contestCreateDto.getDescription(),
        new Date().toISOString(),
        new Date().toISOString(),
      ]
    );
    return contests[0];
  }
}
