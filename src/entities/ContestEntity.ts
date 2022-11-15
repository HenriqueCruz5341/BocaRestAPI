export default class ContestEntity {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
