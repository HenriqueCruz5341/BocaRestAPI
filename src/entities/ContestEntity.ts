export default class ContestEntity {
  constructor(
    readonly contestNumber: number,
    readonly contestName: string,
    readonly contestStartDate: number,
    readonly contestDuration: number,
    readonly contestLocalSite: number,
    readonly contestPenalty: number,
    readonly contestMaxFileSize: number,
    readonly contestActive: boolean,
    readonly contestMainSite: number,
    readonly contestKeys: string,
    readonly contestUnlockKey: string,
    readonly contestMainSiteUrl: string,
    readonly updateTime: number,
    readonly contestLastMileAnswer?: number,
    readonly contestLastMileScore?: number
  ) {}

  static fromJson(json: any) {
    return new ContestEntity(
      json.contestnumber,
      json.contestname,
      json.conteststartdate,
      json.contestduration,
      json.contestlocalsite,
      json.contestpenalty,
      json.contestmaxfilesize,
      json.contestactive,
      json.contestmainsite,
      json.contestkeys,
      json.contestunlockkey,
      json.contestmainsiteurl,
      json.updatetime,
      json.contestlastmileanswer,
      json.contestlastmilescore
    );
  }
}
