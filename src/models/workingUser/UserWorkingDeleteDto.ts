export default class UserWorkingDeleteDto {
  constructor(
    readonly contestNumber: number,
    readonly siteNumber: number,
    readonly userNumber: number,
    readonly workingNumbers: number[]
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getSiteNumber(): number {
    return this.siteNumber;
  }

  getUserNumber(): number {
    return this.userNumber;
  }

  getWorkingNumbers(): number[] {
    return this.workingNumbers;
  }
}
