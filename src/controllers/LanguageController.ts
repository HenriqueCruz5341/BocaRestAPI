import LanguageCreateDto from '../models/language/LanguageCreateDto';
import LanguageUpdateDto from '../models/language/LanguageUpdateDto';
import HttpResponse from '../providers/http/HttpResponse';
import HttpServer from '../providers/http/HttpServer';
import LanguageUseCase from '../usecases/LanguageUseCase';

export default class LanguageController {
  constructor(
    readonly httpServer: HttpServer,
    readonly languageUseCase: LanguageUseCase
  ) {
    httpServer.register(
      'get',
      '/contest/:idC/language',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const language = await languageUseCase.listByContest(idC);

          return new HttpResponse(200, language);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'get',
      '/contest/:idC/language/:idL',
      async function (params: any, body: any) {
        try {
          const { idC, idL } = params;
          const language = await languageUseCase.findById({ idC, idL });

          if (language !== null) return new HttpResponse(200, language);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'post',
      '/contest/:idC/language',
      async function (params: any, body: any) {
        try {
          const { idC } = params;
          const language = await languageUseCase.create(
            new LanguageCreateDto(
              idC,
              body.langNumber,
              body.langName,
              body.langExtension
            )
          );

          return new HttpResponse(201, language);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'put',
      '/contest/:idC/language/:idL',
      async function (params: any, body: any) {
        try {
          const { idC, idL } = params;
          const language = await languageUseCase.update(
            { idC, idL },
            new LanguageUpdateDto(body.langName, body.langExtension)
          );

          if (language !== null) return new HttpResponse(200, language);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );

    httpServer.register(
      'delete',
      '/contest/:idC/language/:idL',
      async function (params: any, body: any) {
        try {
          const { idC, idL } = params;
          const language = await languageUseCase.delete({ idC, idL });

          if (language !== null) return new HttpResponse(200, null);
          return new HttpResponse(404, null);
        } catch (e: any) {
          return new HttpResponse(500, e.message);
        }
      }
    );
  }
}
