export default class ProblemLanguageCreateDto {
  constructor(
    readonly contestNumber: number,
    readonly problemNumber: number,
    readonly languageNumbers: number[]
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getProblemNumber(): number {
    return this.problemNumber;
  }

  getLanguageNumbers(): number[] {
    return this.languageNumbers;
  }
}
