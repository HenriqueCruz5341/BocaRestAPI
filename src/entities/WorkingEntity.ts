export default class WorkingEntity {
  constructor(
    readonly contestNumber: number,
    readonly workingNumber: number,
    readonly workingName: string,
    readonly workingStartDate: number,
    readonly workingEndDate: number,
    readonly workingMaxFile: number,
    readonly workingIsMultiLogin: boolean,
    readonly createdAt: number,
    readonly updatedAt: number,
    readonly workingLastAnswerDate?: number,
    readonly deletedAt?: number
  ) {}

  static fromJson(json: any) {
    return new WorkingEntity(
      json.contestnumber,
      json.workingnumber,
      json.workingname,
      json.workingstartdate,
      json.workingenddate,
      json.workingmaxfilesize,
      json.workingismultilogin,
      json.createdat,
      json.updatedat,
      json.workinglastanswerdate,
      json.deletedat
    );
  }
}
