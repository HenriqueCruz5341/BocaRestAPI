import UserCreateDto from '../models/user/UserCreateDto';
import UserUpdateDto from '../models/user/UserUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';
import UserUseCase from '../usecases/UserUseCase';

export default class UserController {
  constructor(
    readonly httpServer: HttpServer,
    readonly userUseCase: UserUseCase
  ) {
    httpServer.register(
      'get',
      '/api/contest/:idC/site/:idS/user',
      async function (params: any, body: any) {
        try {
          const { idC, idS } = params;
          const user = await userUseCase.listByContestAndSite(idC, idS);

          return new HttpResponse(200, user);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/api/contest/:idC/site/:idS/user/:idU',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const user = await userUseCase.findById({ idC, idS, idU });

          if (user !== null) return new HttpResponse(200, user);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/api/contest/:idC/site/:idS/user',
      async function (params: any, body: any) {
        try {
          const { idC, idS } = params;
          const user = await userUseCase.create(
            new UserCreateDto(
              idC,
              idS,
              body.userNumber,
              body.userName,
              body.userDesc,
              body.userType,
              body.userEnabled,
              body.userMultiLogin,
              body.userFullName,
              body.userPassword,
              body.userIp,
              body.userLastLogin,
              body.userSession,
              body.userSessionExtra,
              body.userLastLogout,
              body.userPermitIp,
              body.userInfo,
              body.userIcpcId
            )
          );

          return new HttpResponse(201, user);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/api/contest/:idC/site/:idS/user/:idU',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const user = await userUseCase.update(
            { idC, idS, idU },
            new UserUpdateDto(
              idC,
              idS,
              idU,
              body.userName,
              body.userDesc,
              body.userType,
              body.userEnabled,
              body.userMultiLogin,
              body.userFullName,
              body.userPassword,
              body.userIp,
              body.userLastLogin,
              body.userSession,
              body.userSessionExtra,
              body.userLastLogout,
              body.userPermitIp,
              body.userInfo,
              body.userIcpcId
            )
          );

          if (user !== null) return new HttpResponse(200, user);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/api/contest/:idC/site/:idS/user/:idU',
      async function (params: any, body: any) {
        try {
          const { idC, idS, idU } = params;
          const user = await userUseCase.delete({ idC, idS, idU });

          if (user !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
