export default class SiteEntity {
  constructor(
    readonly contestNumber: number,
    readonly siteNumber: number,
    readonly siteIp: string,
    readonly siteName: string,
    readonly siteActive: boolean,
    readonly sitePermitLogins: boolean,
    readonly siteGlobalScore: string,
    readonly siteScoreLevel: number,
    readonly siteNextUser: number,
    readonly siteNextClar: number,
    readonly siteNextRun: number,
    readonly siteNextTask: number,
    readonly siteMaxTask: number,
    readonly updateTime: number,
    readonly siteChiefName: string,
    readonly siteMaxRuntime: number,
    readonly siteMaxJudgeWaitTime: number,
    readonly siteLastMileAnswer?: number,
    readonly siteLastMileScore?: number,
    readonly siteDuration?: number,
    readonly siteAutoEnd?: boolean,
    readonly siteJudging?: string,
    readonly siteTasking?: string,
    readonly siteAutoJudge?: boolean
  ) {}

  static fromJson(json: any) {
    return new SiteEntity(
      json.contestnumber,
      json.sitenumber,
      json.siteip,
      json.sitename,
      json.siteactive,
      json.sitepermitlogins,
      json.siteglobalscore,
      json.sitescorelevel,
      json.sitenextuser,
      json.sitenextclar,
      json.sitenextrun,
      json.sitenexttask,
      json.sitemaxtask,
      json.updatetime,
      json.sitechiefname,
      json.sitemaxruntime,
      json.sitemaxjudgewaittime,
      json.sitelastmileanswer,
      json.sitelastmilescore,
      json.siteduration,
      json.siteautoend,
      json.sitejudging,
      json.sitetasking,
      json.siteautojudge
    );
  }
}
