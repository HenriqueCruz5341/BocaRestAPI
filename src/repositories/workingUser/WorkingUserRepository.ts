import UserWorkingCreateDto from '@src/models/workingUser/UserWorkingCreateDto';
import UserWorkingDeleteDto from '@src/models/workingUser/UserWorkingDeleteDto';
import WorkingUserDeleteDto from '@src/models/workingUser/WorkingUserDeleteDto';
import Connection from '@src/providers/db/Connection';
import WorkingUserEntity from '../../entities/WorkingUserEntity';
import WorkingUserCreateDto from '../../models/workingUser/WorkingUserCreateDto';
import WorkingUserRepositoryInterface from './WorkingUserRepositoryInterface';

export default class WorkingUserRepository
  implements WorkingUserRepositoryInterface
{
  constructor(readonly connection: Connection) {}

  async createMany(
    workingUserCreateDto: WorkingUserCreateDto
  ): Promise<WorkingUserEntity[]> {
    let values: string[] = [];
    let init = 3;
    let size = workingUserCreateDto.getUserSiteNumbers().length;

    workingUserCreateDto.getUserSiteNumbers().forEach(() => {
      values.push(`($1, $2, $${init}, $${init + size})`);
      init++;
    });
    const resultValues = values.join(', ');

    const workingUsers = await this.connection.many<WorkingUserEntity>(
      `insert into workingusertable
        (contestnumber, workingnumber, sitenumber, usernumber)
      values  
        ${resultValues}
      returning *`,
      WorkingUserEntity.fromJson,
      [
        workingUserCreateDto.getContestNumber(),
        workingUserCreateDto.getWorkingNumber(),
        ...workingUserCreateDto
          .getUserSiteNumbers()
          .map((userSiteNumber) => userSiteNumber.siteNumber),
        ...workingUserCreateDto
          .getUserSiteNumbers()
          .map((userSiteNumber) => userSiteNumber.userNumber),
      ]
    );
    return workingUsers;
  }

  async deleteMany(
    workingUserDeleteDto: WorkingUserDeleteDto
  ): Promise<WorkingUserEntity[] | null> {
    let values: string[] = [];
    let init = 3;
    let size = workingUserDeleteDto.getUserSiteNumbers().length;

    workingUserDeleteDto.getUserSiteNumbers().forEach(() => {
      values.push(`(sitenumber = $${init} and usernumber = $${size + init})`);
      init++;
    });
    const resultValues = values.join(' or ');

    return this.connection.manyOrNone(
      `delete from workingusertable where contestnumber = $1 and workingnumber = $2 and (${resultValues}) returning *`,
      WorkingUserEntity.fromJson,
      [
        workingUserDeleteDto.getContestNumber(),
        workingUserDeleteDto.getWorkingNumber(),
        ...workingUserDeleteDto
          .getUserSiteNumbers()
          .map((userSiteNumber) => userSiteNumber.siteNumber),
        ...workingUserDeleteDto
          .getUserSiteNumbers()
          .map((userSiteNumber) => userSiteNumber.userNumber),
      ]
    );
  }

  async findByContestAndWorking(
    idC: number,
    idW: number
  ): Promise<WorkingUserEntity[]> {
    const workingUsers = await this.connection.manyOrNone<WorkingUserEntity>(
      `select * from workingusertable where contestnumber = $1 and workingnumber = $2`,
      WorkingUserEntity.fromJson,
      [idC, idW]
    );

    return workingUsers;
  }

  async findByContestAndSiteAndUser(
    idC: number,
    idS: number,
    idU: number
  ): Promise<WorkingUserEntity[]> {
    const workingUsers = await this.connection.manyOrNone<WorkingUserEntity>(
      `select * from workingusertable where contestnumber = $1 and sitenumber = $2 and usernumber = $3`,
      WorkingUserEntity.fromJson,
      [idC, idS, idU]
    );

    return workingUsers;
  }

  async createManyWorkingsForUser(
    userWorkingCreateDto: UserWorkingCreateDto
  ): Promise<WorkingUserEntity[]> {
    let values: string[] = [];
    let init = 4;

    userWorkingCreateDto.getWorkingNumbers().forEach(() => {
      values.push(`($1, $2, $3, $${init})`);
      init++;
    });
    const resultValues = values.join(', ');

    const workingUsers = await this.connection.many<WorkingUserEntity>(
      `insert into workingusertable
        (contestnumber, sitenumber, usernumber, workingnumber)
      values  
        ${resultValues}
      returning *`,
      WorkingUserEntity.fromJson,
      [
        userWorkingCreateDto.getContestNumber(),
        userWorkingCreateDto.getSiteNumber(),
        userWorkingCreateDto.getUserNumber(),
        ...userWorkingCreateDto.getWorkingNumbers(),
      ]
    );
    return workingUsers;
  }

  async deleteManyWorkingsFromUser(
    userWorkingDeleteDto: UserWorkingDeleteDto
  ): Promise<WorkingUserEntity[] | null> {
    let values: string[] = [];
    let init = 4;

    userWorkingDeleteDto.getWorkingNumbers().forEach(() => {
      values.push(`workingnumber = $${init}`);
      init++;
    });
    const resultValues = values.join(' or ');

    return this.connection.manyOrNone(
      `delete from workingusertable where contestnumber = $1 and sitenumber = $2 and usernumber = $3 and (${resultValues}) returning *`,
      WorkingUserEntity.fromJson,
      [
        userWorkingDeleteDto.getContestNumber(),
        userWorkingDeleteDto.getSiteNumber(),
        userWorkingDeleteDto.getUserNumber(),
        ...userWorkingDeleteDto.getWorkingNumbers(),
      ]
    );
  }

  mapToEntityOrNull(json: any): WorkingUserEntity | null {
    return json !== null ? WorkingUserEntity.fromJson(json) : null;
  }
}
