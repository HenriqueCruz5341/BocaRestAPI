import UserCreateDto from '@src/models/user/UserCreateDto';
import UserEntity from '@src/entities/UserEntity';
import UserRepositoryInterface from '@src/repositories/user/UserRepositoryInterface';
import UserUpdateDto from '@src/models/user/UserUpdateDto';
import { IdUser } from '@src/models/interfaces';

export default class UserUseCase {
  constructor(readonly user: UserRepositoryInterface) {}

  async listByContestAndSite(idC: number, idS: number): Promise<UserEntity[]> {
    const users = await this.user.findByContestAndSite(idC, idS);
    return users;
  }

  async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const users = await this.user.create(userCreateDto);
    return users;
  }

  async findById(id: IdUser): Promise<UserEntity | null> {
    const users = await this.user.findById(id);
    return users;
  }

  async update(
    id: IdUser,
    userUpdateDto: UserUpdateDto
  ): Promise<UserEntity | null> {
    const user = await this.user.update(id, userUpdateDto);
    return user;
  }

  async delete(id: IdUser): Promise<UserEntity | null> {
    return await this.user.delete(id);
  }
}
