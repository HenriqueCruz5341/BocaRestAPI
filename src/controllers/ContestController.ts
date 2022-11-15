import HttpServer from '@src/providers/http/HttpServer';
import ContestUseCase from '@src/usecases/ContestUseCase';

export default class ContestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly contestUseCase: ContestUseCase
  ) {
    httpServer.register(
      'get',
      '/contest',
      async function (params: any, body: any) {
        const contests = await contestUseCase.list();
        return contests;
      }
    );
  }
}
