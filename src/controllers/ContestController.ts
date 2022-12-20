import ContestCreateDto from '../models/contest/ContestCreateDto';
import ContestUpdateDto from '../models/contest/ContestUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';
import ContestUseCase from '../usecases/ContestUseCase';

export default class ContestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly contestUseCase: ContestUseCase
  ) {
    httpServer.register(
      'get',
      '/api/contest',
      async function (params: any, body: any) {
        try {
          const contests = await contestUseCase.list();

          return new HttpResponse(200, contests);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/api/contest/:id',
      async function (params: any, body: any) {
        try {
          const { id } = params;
          const contest = await contestUseCase.findById(id);

          if (contest !== null) return new HttpResponse(200, contest);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest',
      async function (params: any, body: any) {
        try {
          const contest = await contestUseCase.create(
            new ContestCreateDto(
              body.contestNumber,
              body.contestName,
              body.contestStartDate,
              body.contestDuration,
              body.contestLocalSite,
              body.contestPenalty,
              body.contestMaxFileSize,
              body.contestActive,
              body.contestMainSite,
              body.contestKeys,
              body.contestUnlockKey,
              body.contestMainSiteUrl
            )
          );

          return new HttpResponse(201, contest);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/api/contest/:id',
      async function (params: any, body: any) {
        try {
          const { id } = params;
          const contest = await contestUseCase.update(
            id,
            new ContestUpdateDto(
              body.contestName,
              body.contestStartDate,
              body.contestDuration,
              body.contestLocalSite,
              body.contestPenalty,
              body.contestMaxFileSize,
              body.contestActive,
              body.contestMainSite,
              body.contestKeys,
              body.contestUnlockKey,
              body.contestMainSiteUrl
            )
          );

          if (contest !== null) return new HttpResponse(200, contest);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:id',
      async function (params: any, body: any) {
        try {
          const { id } = params;
          const contest = await contestUseCase.delete(id);

          if (contest !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
