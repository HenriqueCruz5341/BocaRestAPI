import WorkingUserEntity from '@src/entities/WorkingUserEntity';
import UserWorkingCreateDto from '@src/models/workingUser/UserWorkingCreateDto';
import UserWorkingDeleteDto from '@src/models/workingUser/UserWorkingDeleteDto';
import WorkingUserCreateDto from '@src/models/workingUser/WorkingUserCreateDto';
import WorkingUserDeleteDto from '@src/models/workingUser/WorkingUserDeleteDto';
import RepositoryManyInterface from '../RepositoryManyInterface';

export default interface WorkingUserRepositoryInterface
  extends RepositoryManyInterface<
    WorkingUserEntity,
    WorkingUserDeleteDto,
    WorkingUserCreateDto
  > {
  findByContestAndWorking(
    contestNumber: number,
    workingNumber: number
  ): Promise<WorkingUserEntity[]>;

  findByContestAndSiteAndUser(
    contestNumber: number,
    siteNumber: number,
    userNumber: number
  ): Promise<WorkingUserEntity[]>;

  createManyWorkingsForUser(
    userWorkingCreateDto: UserWorkingCreateDto
  ): Promise<WorkingUserEntity[]>;

  deleteManyWorkingsFromUser(
    userWorkingDeleteDto: UserWorkingDeleteDto
  ): Promise<WorkingUserEntity[] | null>;
}
