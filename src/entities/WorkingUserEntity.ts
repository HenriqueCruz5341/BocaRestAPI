export default class WorkingUserEntity {
  constructor(
    readonly contestNumber: number,
    readonly workingNumber: number,
    readonly siteNumber: number,
    readonly userNumber: number
  ) {}

  static fromJson(json: any) {
    return new WorkingUserEntity(
      json.contestnumber,
      json.workingnumber,
      json.sitenumber,
      json.usernumber
    );
  }
}
