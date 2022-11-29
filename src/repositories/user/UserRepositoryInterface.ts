import UserEntity from '@src/entities/UserEntity';
import { IdUser } from '@src/models/interfaces';
import UserCreateDto from '@src/models/user/UserCreateDto';
import UserUpdateDto from '@src/models/user/UserUpdateDto';
import RepositoryInterface from '../RepositoryInterface';

export default interface UserRepositoryInterface
  extends RepositoryInterface<
    UserEntity,
    IdUser,
    UserCreateDto,
    UserUpdateDto
  > {
  findByContestAndSite(
    contestNumber: number,
    siteNumber: number
  ): Promise<UserEntity[]>;
}
