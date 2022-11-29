import { IdUser } from '@src/models/interfaces';
import UserUpdateDto from '@src/models/user/UserUpdateDto';
import Connection from '@src/providers/db/Connection';
import UserEntity from '../../entities/UserEntity';
import UserCreateDto from '../../models/user/UserCreateDto';
import UserRepositoryInterface from './UserRepositoryInterface';

export default class UserRepository implements UserRepositoryInterface {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.connection.manyOrNone<UserEntity>(
      'select * from usertable order by contestnumber, usernumber',
      UserEntity.fromJson
    );

    return users;
  }

  async findByContestAndSite(idC: number, idS: number): Promise<UserEntity[]> {
    const users = await this.connection.manyOrNone<UserEntity>(
      'select * from usertable where contestnumber = $1 and usersitenumber = $2 order by usernumber',
      UserEntity.fromJson,
      [idC, idS]
    );

    return users;
  }

  async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const user = await this.connection.one<UserEntity>(
      `insert into usertable
        (contestnumber, usersitenumber, usernumber, username, userdesc, usertype, userenabled, usermultilogin, updatetime, userfullname, userpassword, userip, userlastlogin, usersession, usersessionextra, userlastlogout, userpermitip, userinfo, usericpcid)
      values  
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      returning *`,
      UserEntity.fromJson,
      [
        userCreateDto.getContestNumber(),
        userCreateDto.getUserSiteNumber(),
        userCreateDto.getUserNumber(),
        userCreateDto.getUserName(),
        userCreateDto.getUserDesc(),
        userCreateDto.getUserType(),
        userCreateDto.getUserEnabled(),
        userCreateDto.getUserMultiLogin(),
        Math.trunc(new Date().getTime() / 1000),
        userCreateDto.getUserFullName(),
        userCreateDto.getUserPassword(),
        userCreateDto.getUserIp(),
        userCreateDto.getUserLastLogin(),
        userCreateDto.getUserSession(),
        userCreateDto.getUserSessionExtra(),
        userCreateDto.getUserLastLogout(),
        userCreateDto.getUserPermitIp(),
        userCreateDto.getUserInfo(),
        userCreateDto.getUserIcpcId(),
      ]
    );
    return user;
  }

  findById(id: IdUser): Promise<UserEntity | null> {
    const user = this.connection.oneOrNone<UserEntity>(
      'select * from usertable where usernumber = $1 and usersitenumber = $2 and contestnumber = $3',
      this.mapToEntityOrNull,
      [id.idU, id.idS, id.idC]
    );
    return user;
  }

  update(id: IdUser, userUpdateDto: UserUpdateDto): Promise<UserEntity | null> {
    const user = this.connection.oneOrNone<UserEntity>(
      `update usertable 
      set username = $4, userdesc = $5, usertype = $6, userenabled = $7, usermultilogin = $8, updatetime = $9, userfullname = $10, userpassword = $11, userip = $12, userlastlogin = $13, usersession = $14, usersessionextra = $15, userlastlogout = $16, userpermitip = $17, userinfo = $18, usericpcid = $19
      where usernumber = $1 and usersitenumber = $2 and contestnumber = $3
      returning *`,
      this.mapToEntityOrNull,
      [
        id.idU,
        id.idS,
        id.idC,
        userUpdateDto.getUserName(),
        userUpdateDto.getUserDesc(),
        userUpdateDto.getUserType(),
        userUpdateDto.getUserEnabled(),
        userUpdateDto.getUserMultiLogin(),
        Math.trunc(new Date().getTime() / 1000),
        userUpdateDto.getUserFullName(),
        userUpdateDto.getUserPassword(),
        userUpdateDto.getUserIp(),
        userUpdateDto.getUserLastLogin(),
        userUpdateDto.getUserSession(),
        userUpdateDto.getUserSessionExtra(),
        userUpdateDto.getUserLastLogout(),
        userUpdateDto.getUserPermitIp(),
        userUpdateDto.getUserInfo(),
        userUpdateDto.getUserIcpcId(),
      ]
    );
    return user;
  }

  async delete(id: IdUser): Promise<UserEntity | null> {
    return this.connection.oneOrNone(
      'delete from usertable where usernumber = $1 and usersitenumber = $2 and contestnumber = $3 returning *',
      this.mapToEntityOrNull,
      [id.idU, id.idS, id.idC]
    );
  }

  mapToEntityOrNull(json: any): UserEntity | null {
    return json !== null ? UserEntity.fromJson(json) : null;
  }
}
