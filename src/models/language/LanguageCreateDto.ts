export default class ProblemCreateDto {
  constructor(
    readonly contestNumber: number,
    readonly langNumber: number,
    readonly langName: string,
    readonly langExtension: string
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getLangNumber(): number {
    return this.langNumber;
  }

  getLangName(): string {
    return this.langName;
  }

  getLangExtension(): string {
    return this.langExtension;
  }
}
