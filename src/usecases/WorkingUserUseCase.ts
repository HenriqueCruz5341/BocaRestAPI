import WorkingUserEntity from '@src/entities/WorkingUserEntity';
import UserWorkingCreateDto from '@src/models/workingUser/UserWorkingCreateDto';
import UserWorkingDeleteDto from '@src/models/workingUser/UserWorkingDeleteDto';
import WorkingUserCreateDto from '@src/models/workingUser/WorkingUserCreateDto';
import WorkingUserDeleteDto from '@src/models/workingUser/WorkingUserDeleteDto';
import WorkingUserRepositoryInterface from '@src/repositories/workingUser/WorkingUserRepositoryInterface';

export default class WorkingUserUseCase {
  constructor(readonly workingUser: WorkingUserRepositoryInterface) {}

  async findByContestAndWorking(
    idC: number,
    idW: number
  ): Promise<WorkingUserEntity[]> {
    const users = await this.workingUser.findByContestAndWorking(idC, idW);
    return users;
  }

  async createMany(
    workingUserCreateDto: WorkingUserCreateDto
  ): Promise<WorkingUserEntity[]> {
    const users = await this.workingUser.createMany(workingUserCreateDto);
    return users;
  }

  async deleteMany(
    workingUserDeleteDto: WorkingUserDeleteDto
  ): Promise<WorkingUserEntity[] | null> {
    return await this.workingUser.deleteMany(workingUserDeleteDto);
  }

  async findByContestAndSiteAndUser(
    idC: number,
    idS: number,
    idU: number
  ): Promise<WorkingUserEntity[]> {
    const users = await this.workingUser.findByContestAndSiteAndUser(
      idC,
      idS,
      idU
    );
    return users;
  }

  async createManyWorkingsForUser(
    userWorkingCreateDto: UserWorkingCreateDto
  ): Promise<WorkingUserEntity[]> {
    const users = await this.workingUser.createManyWorkingsForUser(
      userWorkingCreateDto
    );
    return users;
  }

  async deleteManyWorkingsFromUser(
    userWorkingDeleteDto: UserWorkingDeleteDto
  ): Promise<WorkingUserEntity[] | null> {
    return await this.workingUser.deleteManyWorkingsFromUser(
      userWorkingDeleteDto
    );
  }
}
