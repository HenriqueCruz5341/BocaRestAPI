export default class ContestCreateDto {
  constructor(
    private name: string,
    private description: string,
    private startTime: Date,
    private endTime: Date
  ) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getEndTime(): Date {
    return this.endTime;
  }
}
