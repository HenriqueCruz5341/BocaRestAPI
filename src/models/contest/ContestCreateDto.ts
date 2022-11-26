export default class ContestCreateDto {
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
    readonly contestMainSiteUrl: string
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getContestName(): string {
    return this.contestName;
  }

  getContestStartDate(): number {
    return this.contestStartDate;
  }

  getContestDuration(): number {
    return this.contestDuration;
  }

  getContestLocalSite(): number {
    return this.contestLocalSite;
  }

  getContestPenalty(): number {
    return this.contestPenalty;
  }

  getContestMaxFileSize(): number {
    return this.contestMaxFileSize;
  }

  getContestActive(): boolean {
    return this.contestActive;
  }

  getContestMainSite(): number {
    return this.contestMainSite;
  }

  getContestKeys(): string {
    return this.contestKeys;
  }

  getContestUnlockKey(): string {
    return this.contestUnlockKey;
  }

  getContestMainSiteUrl(): string {
    return this.contestMainSiteUrl;
  }
}
