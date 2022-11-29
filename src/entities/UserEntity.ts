export default class UserEntity {
  constructor(
    readonly contestNumber: number,
    readonly userSiteNumber: number,
    readonly userNumber: number,
    readonly userName: string,
    readonly userDesc: string,
    readonly userType: string,
    readonly userEnabled: boolean,
    readonly userMultiLogin: boolean,
    readonly updateTime: number,
    readonly userFullName?: string,
    readonly userPassword?: string,
    readonly userIp?: string,
    readonly userLastLogin?: number,
    readonly userSession?: string,
    readonly userSessionExtra?: string,
    readonly userLastLogout?: number,
    readonly userPermitIp?: string,
    readonly userInfo?: string,
    readonly userIcpcId?: string
  ) {}

  static fromJson(json: any) {
    return new UserEntity(
      json.contestnumber,
      json.usersitenumber,
      json.usernumber,
      json.username,
      json.userdesc,
      json.usertype,
      json.userenabled,
      json.usermultilogin,
      json.updatetime,
      json.userfullname,
      json.userpassword,
      json.userip,
      json.userlastlogin,
      json.usersession,
      json.usersessionextra,
      json.userlastlogout,
      json.userpermitip,
      json.userinfo,
      json.usericpcid
    );
  }
}
