import SiteCreateDto from '../models/site/SiteCreateDto';
import SiteUpdateDto from '../models/site/SiteUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';
import SiteUseCase from '../usecases/SiteUseCase';

export default class SiteController {
  constructor(
    readonly httpServer: HttpServer,
    readonly siteUseCase: SiteUseCase
  ) {
    httpServer.register(
      'get',
      '/api/contest/:idC/site',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const site = await siteUseCase.listByContest(idC);

          return new HttpResponse(200, site);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/api/contest/:idC/site/:idS',
      async function (params: any, body: any) {
        try {
          const { idC, idS } = params;
          const site = await siteUseCase.findById({ idC, idS });

          if (site !== null) return new HttpResponse(200, site);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest/:idC/site',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const site = await siteUseCase.create(
            new SiteCreateDto(
              idC,
              body.siteNumber,
              body.siteIp,
              body.siteName,
              body.siteActive,
              body.sitePermitLogins,
              body.siteGlobalScore,
              body.siteScoreLevel,
              body.siteNextUser,
              body.siteNextClar,
              body.siteNextRun,
              body.siteNextTask,
              body.siteMaxTask,
              body.siteChiefName,
              body.siteMaxRuntime,
              body.siteMaxJudgeWaitTime,
              body.siteLastMileAnswer,
              body.siteLastMileScore,
              body.siteDuration,
              body.siteAutoEnd,
              body.siteJudging,
              body.siteTasking,
              body.siteAutoJudge
            )
          );

          return new HttpResponse(201, site);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/api/contest/:idC/site/:idS',
      async function (params: any, body: any) {
        try {
          const { idC, idS } = params;
          const site = await siteUseCase.update(
            { idC, idS },
            new SiteUpdateDto(
              body.siteIp,
              body.siteName,
              body.siteActive,
              body.sitePermitLogins,
              body.siteGlobalScore,
              body.siteScoreLevel,
              body.siteNextUser,
              body.siteNextClar,
              body.siteNextRun,
              body.siteNextTask,
              body.siteMaxTask,
              body.siteChiefName,
              body.siteMaxRuntime,
              body.siteMaxJudgeWaitTime,
              body.siteLastMileAnswer,
              body.siteLastMileScore,
              body.siteDuration,
              body.siteAutoEnd,
              body.siteJudging,
              body.siteTasking,
              body.siteAutoJudge
            )
          );

          if (site !== null) return new HttpResponse(200, site);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:idC/site/:idS',
      async function (params: any, body: any) {
        try {
          const { idC, idS } = params;
          const site = await siteUseCase.delete({ idC, idS });

          if (site !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
