import UserWorkingCreateDto from '../models/workingUser/UserWorkingCreateDto';
import UserWorkingDeleteDto from '../models/workingUser/UserWorkingDeleteDto';
import WorkingUserCreateDto from '../models/workingUser/WorkingUserCreateDto';
import WorkingUserDeleteDto from '../models/workingUser/WorkingUserDeleteDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';
import WorkingUserUseCase from '../usecases/WorkingUserUseCase';

export default class WorkingUserController {
  constructor(
    readonly httpServer: HttpServer,
    readonly workingUserUseCase: WorkingUserUseCase
  ) {
    // user for working
    httpServer.register(
      'get',
      '/api/contest/:idC/working/:idW/user',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const users = await workingUserUseCase.findByContestAndWorking(
            idC,
            idW
          );

          return new HttpResponse(200, users);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest/:idC/working/:idW/user',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const user = await workingUserUseCase.createMany(
            new WorkingUserCreateDto(idC, idW, body.userSiteNumbers)
          );

          return new HttpResponse(201, user);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:idC/working/:idW/user',
      async function (params: any, body: any) {
        try {
          const { idC, idW } = params;
          const user = await workingUserUseCase.deleteMany(
            new WorkingUserDeleteDto(idC, idW, body.userSiteNumbers)
          );

          if (user !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    // working for user
    httpServer.register(
      'get',
      '/api/contest/:idC/site/:idS/user/:idU/working',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const workings = await workingUserUseCase.findByContestAndSiteAndUser(
            idC,
            idS,
            idU
          );

          return new HttpResponse(200, workings);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest/:idC/site/:idS/user/:idU/working',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const working = await workingUserUseCase.createManyWorkingsForUser(
            new UserWorkingCreateDto(idC, idS, idU, body.workingNumbers)
          );

          return new HttpResponse(201, working);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:idC/site/:idS/user/:idU/working',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const working = await workingUserUseCase.deleteManyWorkingsFromUser(
            new UserWorkingDeleteDto(idC, idS, idU, body.workingNumbers)
          );

          if (working !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
