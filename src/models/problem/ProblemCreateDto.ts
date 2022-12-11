export default class ProblemCreateDto {
  constructor(
    readonly contestNumber: number,
    readonly problemNumber: number,
    readonly problemName: string,
    readonly fake: boolean,
    readonly workingNumber: number,
    readonly problemFullName?: string,
    readonly problemBaseFileName?: string,
    readonly problemInputFileName?: string,
    readonly problemInputFile?: number,
    readonly problemInputFileHash?: string,
    readonly problemColorName?: string,
    readonly problemColor?: string
  ) {}

  getContestNumber(): number {
    return this.contestNumber;
  }

  getProblemNumber(): number {
    return this.problemNumber;
  }

  getProblemName(): string {
    return this.problemName;
  }

  getFake(): boolean {
    return this.fake;
  }

  getWorkingNumber(): number {
    return this.workingNumber;
  }

  getProblemFullName(): string | undefined {
    return this.problemFullName;
  }

  getProblemBaseFileName(): string | undefined {
    return this.problemBaseFileName;
  }

  getProblemInputFileName(): string | undefined {
    return this.problemInputFileName;
  }

  getProblemInputFile(): number | undefined {
    return this.problemInputFile;
  }

  getProblemInputFileHash(): string | undefined {
    return this.problemInputFileHash;
  }

  getProblemColorName(): string | undefined {
    return this.problemColorName;
  }

  getProblemColor(): string | undefined {
    return this.problemColor;
  }
}
