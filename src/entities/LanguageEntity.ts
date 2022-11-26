export default class LanguageEntity {
  constructor(
    readonly contestNumber: number,
    readonly langNumber: number,
    readonly langName: string,
    readonly langExtension: string,
    readonly updateTime: number
  ) {}

  static fromJson(json: any) {
    return new LanguageEntity(
      json.contestnumber,
      json.langnumber,
      json.langname,
      json.langextension,
      json.updatetime
    );
  }
}
