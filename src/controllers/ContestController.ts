import ContestCreateDto from '../models/dtos/ContestCreateDto';
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

    httpServer.register(
      'post',
      '/contest',
      async function (params: any, body: any) {
        // try {
        const contest = await contestUseCase.create(
          new ContestCreateDto(
            body.name,
            body.description,
            new Date(body.startTime),
            new Date(body.endTime)
          )
        );
        // } catch (error) {
        //   return {"Invalid body"}
        // }
        return contest;
      }
    );
  }
}
