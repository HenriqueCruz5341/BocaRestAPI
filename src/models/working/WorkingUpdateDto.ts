export default class WorkingUpdateDto {
  constructor(
    readonly workingName: string,
    readonly workingStartDate: number,
    readonly workingEndDate: number,
    readonly workingMaxFileSize: number,
    readonly workingIsMultiLogin: boolean,
    readonly workingLastAnswerDate?: number
  ) {}

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
