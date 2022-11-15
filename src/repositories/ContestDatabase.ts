import ContestEntity from '@src/entities/ContestEntity';
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
}
