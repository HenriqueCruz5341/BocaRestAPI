import ProblemUseCase from '@src/usecases/ProblemUseCase';
import ProblemCreateDto from '../models/problem/ProblemCreateDto';
import ProblemUpdateDto from '../models/problem/ProblemUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';

export default class ProblemController {
  constructor(
    readonly httpServer: HttpServer,
    readonly problemUseCase: ProblemUseCase
  ) {
    httpServer.register(
      'get',
      '/api/contest/:idC/problem',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const problems = await problemUseCase.listByContest(idC);

          return new HttpResponse(200, problems);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/api/contest/:idC/problem/:idP',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problem = await problemUseCase.findById({ idC, idP });

          if (problem !== null) return new HttpResponse(200, problem);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest/:idC/problem',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const problem = await problemUseCase.create(
            new ProblemCreateDto(
              idC,
              body.problemNumber,
              body.problemName,
              body.fake,
              body.workingNumber,
              body.problemFullName,
              body.problemBaseFileName,
              body.problemInputFileName,
              body.problemInputFile,
              body.problemInputFileHash,
              body.problemColorName,
              body.problemColor
            )
          );

          return new HttpResponse(201, problem);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/api/contest/:idC/problem/:idP',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problem = await problemUseCase.update(
            { idC, idP },
            new ProblemUpdateDto(
              body.problemName,
              body.fake,
              body.workingNumber,
              body.problemFullName,
              body.problemBaseFileName,
              body.problemInputFileName,
              body.problemInputFile,
              body.problemInputFileHash,
              body.problemColorName,
              body.problemColor
            )
          );

          if (problem !== null) return new HttpResponse(200, problem);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:idC/problem/:idP',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problem = await problemUseCase.delete({ idC, idP });

          if (problem !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
