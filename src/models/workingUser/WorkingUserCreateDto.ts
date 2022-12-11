interface UserSiteNumbers {
  userNumber: number;
  siteNumber: number;
}

export default class WorkingUserCreateDto {
  constructor(
    readonly contestNumber: number,
    readonly workingNumber: number,
    readonly userSiteNumbers: UserSiteNumbers[]
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getWorkingNumber(): number {
    return this.workingNumber;
  }

  getUserSiteNumbers(): UserSiteNumbers[] {
    return this.userSiteNumbers;
  }
}
