export default class ProblemUpdateDto {
  constructor(readonly langName: string, readonly langExtension: string) {}

  getLangName(): string {
    return this.langName;
  }

  getLangExtension(): string {
    return this.langExtension;
  }
}
