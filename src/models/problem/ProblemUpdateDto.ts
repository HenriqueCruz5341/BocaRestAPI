export default class ProblemUpdateDto {
  constructor(
    readonly problemName: string,
    readonly fake: boolean,
    readonly problemFullName?: string,
    readonly problemBaseFileName?: string,
    readonly problemInputFileName?: string,
    readonly problemInputFile?: number,
    readonly problemInputFileHash?: string,
    readonly problemColorName?: string,
    readonly problemColor?: string
  ) {}

  getProblemName(): string {
    return this.problemName;
  }

  getFake(): boolean {
    return this.fake;
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
