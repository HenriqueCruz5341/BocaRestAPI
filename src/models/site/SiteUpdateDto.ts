export default class SiteUpdateDto {
  constructor(
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

  getSiteIp(): string {
    return this.siteIp;
  }

  getSiteName(): string {
    return this.siteName;
  }

  getSiteActive(): boolean {
    return this.siteActive;
  }

  getSitePermitLogins(): boolean {
    return this.sitePermitLogins;
  }

  getSiteGlobalScore(): string {
    return this.siteGlobalScore;
  }

  getSiteScoreLevel(): number {
    return this.siteScoreLevel;
  }

  getSiteNextUser(): number {
    return this.siteNextUser;
  }

  getSiteNextClar(): number {
    return this.siteNextClar;
  }

  getSiteNextRun(): number {
    return this.siteNextRun;
  }

  getSiteNextTask(): number {
    return this.siteNextTask;
  }

  getSiteMaxTask(): number {
    return this.siteMaxTask;
  }

  getSiteChiefName(): string {
    return this.siteChiefName;
  }

  getSiteMaxRuntime(): number {
    return this.siteMaxRuntime;
  }

  getSiteMaxJudgeWaitTime(): number {
    return this.siteMaxJudgeWaitTime;
  }

  getSiteLastMileAnswer(): number | undefined {
    return this.siteLastMileAnswer;
  }

  getSiteLastMileScore(): number | undefined {
    return this.siteLastMileScore;
  }

  getSiteDuration(): number | undefined {
    return this.siteDuration;
  }

  getSiteAutoEnd(): boolean | undefined {
    return this.siteAutoEnd;
  }

  getSiteJudging(): string | undefined {
    return this.siteJudging;
  }

  getSiteTasking(): string | undefined {
    return this.siteTasking;
  }

  getSiteAutoJudge(): boolean | undefined {
    return this.siteAutoJudge;
  }
}
