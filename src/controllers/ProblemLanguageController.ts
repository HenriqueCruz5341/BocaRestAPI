import ProblemLanguageUseCase from '@src/usecases/ProblemLanguageUseCase';
import ProblemLanguageCreateDto from '../models/problemLanguage/ProblemLanguageCreateDto';
import ProblemLanguageDeleteDto from '../models/problemLanguage/ProblemLanguageDeleteDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';

export default class ProblemLanguageController {
  constructor(
    readonly httpServer: HttpServer,
    readonly problemLanguageUseCase: ProblemLanguageUseCase
  ) {
    httpServer.register(
      'get',
      '/contest/:idC/problem/:idP/language',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problems = await problemLanguageUseCase.findByContestAndProblem(
            idC,
            idP
          );

          return new HttpResponse(200, problems);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/contest/:idC/problem/:idP/language',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problem = await problemLanguageUseCase.createMany(
            new ProblemLanguageCreateDto(idC, idP, body.languageNumbers)
          );

          return new HttpResponse(201, problem);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/contest/:idC/problem/:idP/language',
      async function (params: any, body: any) {
        try {
          const { idC, idP } = params;
          const problem = await problemLanguageUseCase.deleteMany(
            new ProblemLanguageDeleteDto(idC, idP, body.languageNumbers)
          );

          if (problem !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
