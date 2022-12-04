export default class WorkingCreateDto {
  constructor(
    readonly contestNumber: number,
    readonly workingNumber: number,
    readonly workingName: string,
    readonly workingStartDate: number,
    readonly workingEndDate: number,
    readonly workingMaxFileSize: number,
    readonly workingIsMultiLogin: boolean,
    readonly workingLastAnswerDate?: number
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getWorkingNumber(): number {
    return this.workingNumber;
  }

  getWorkingName(): string {
    return this.workingName;
  }

  getWorkingStartDate(): number {
    return this.workingStartDate;
  }

  getWorkingEndDate(): number {
    return this.workingEndDate;
  }

  getWorkingIsMultiLogin(): boolean {
    return this.workingIsMultiLogin;
  }

  getWorkingMaxFileSize(): number {
    return this.workingMaxFileSize;
  }

  getWorkingLastAnswerDate(): number | undefined {
    return this.workingLastAnswerDate;
  }
}
