import WorkingUseCase from '@src/usecases/WorkingUseCase';
import WorkingCreateDto from '../models/working/WorkingCreateDto';
import WorkingUpdateDto from '../models/working/WorkingUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';

export default class WorkingController {
  constructor(
    readonly httpServer: HttpServer,
    readonly workingUseCase: WorkingUseCase
  ) {
    httpServer.register(
      'get',
      '/contest/:idC/working',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const workings = await workingUseCase.findByContest(idC);

          return new HttpResponse(200, workings);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/contest/:idC/working/:idW',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const working = await workingUseCase.findById({ idC, idW });

          if (working !== null) return new HttpResponse(200, working);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/contest/:idC/working',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const working = await workingUseCase.create(
            new WorkingCreateDto(
              idC,
              body.workingNumber,
              body.workingName,
              body.workingStartDate,
              body.workingEndDate,
              body.workingMaxFileSize,
              body.workingIsMultiLogin
            )
          );

          return new HttpResponse(201, working);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/contest/:idC/working/:idW',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const working = await workingUseCase.update(
            { idC, idW },
            new WorkingUpdateDto(
              body.workingName,
              body.workingStartDate,
              body.workingEndDate,
              body.workingMaxFileSize,
              body.workingIsMultiLogin,
              body.workingLastAnswerDate
            )
          );

          if (working !== null) return new HttpResponse(200, working);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/contest/:idC/working/:idW',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const working = await workingUseCase.delete({ idC, idW });

          if (working !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
