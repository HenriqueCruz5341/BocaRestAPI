export default class UserUpdateDto {
  constructor(
    readonly contestNumber: number,
    readonly userSiteNumber: number,
    readonly userNumber: number,
    readonly userName: string,
    readonly userDesc: string,
    readonly userType: string,
    readonly userEnabled: boolean,
    readonly userMultiLogin: boolean,
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

  getContestNumber(): number {
    return this.contestNumber;
  }

  getUserSiteNumber(): number {
    return this.userSiteNumber;
  }

  getUserNumber(): number {
    return this.userNumber;
  }

  getUserName(): string {
    return this.userName;
  }

  getUserDesc(): string {
    return this.userDesc;
  }

  getUserType(): string {
    return this.userType;
  }

  getUserEnabled(): boolean {
    return this.userEnabled;
  }

  getUserMultiLogin(): boolean {
    return this.userMultiLogin;
  }

  getUserFullName(): string | undefined {
    return this.userFullName;
  }

  getUserPassword(): string | undefined {
    return this.userPassword;
  }

  getUserIp(): string | undefined {
    return this.userIp;
  }

  getUserLastLogin(): number | undefined {
    return this.userLastLogin;
  }

  getUserSession(): string | undefined {
    return this.userSession;
  }

  getUserSessionExtra(): string | undefined {
    return this.userSessionExtra;
  }

  getUserLastLogout(): number | undefined {
    return this.userLastLogout;
  }

  getUserPermitIp(): string | undefined {
    return this.userPermitIp;
  }

  getUserInfo(): string | undefined {
    return this.userInfo;
  }

  getUserIcpcId(): string | undefined {
    return this.userIcpcId;
  }
}
