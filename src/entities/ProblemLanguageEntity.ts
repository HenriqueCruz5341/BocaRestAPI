export default class ProblemLanguageEntity {
  constructor(
    readonly contestNumber: number,
    readonly problemNumber: number,
    readonly languageNumber: number
  ) {}

  static fromJson(json: any) {
    return new ProblemLanguageEntity(
      json.contestnumber,
      json.problemnumber,
      json.langnumber
    );
  }
}
