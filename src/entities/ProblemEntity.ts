export default class ProblemEntity {
  constructor(
    readonly contestNumber: number,
    readonly problemNumber: number,
    readonly problemName: string,
    readonly fake: boolean,
    readonly updateTime: number,
    readonly problemFullName?: string,
    readonly problemBaseFileName?: string,
    readonly problemInputFileName?: string,
    readonly problemInputFile?: number,
    readonly problemInputFileHash?: string,
    readonly problemColorName?: string,
    readonly problemColor?: string
  ) {}

  static fromJson(json: any) {
    return new ProblemEntity(
      json.contestnumber,
      json.problemnumber,
      json.problemname,
      json.fake,
      json.updatetime,
      json.problemfullname,
      json.problembasefilename,
      json.probleminputfilename,
      json.probleminputfile,
      json.probleminputfilehash,
      json.problemcolorname,
      json.problemcolor
    );
  }
}
