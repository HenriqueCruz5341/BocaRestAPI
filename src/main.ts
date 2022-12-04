import ContestController from './controllers/ContestController';
import PgPromiseAdapter from './providers/db/PgPromiseAdapter';
import ExpressAdapter from './providers/http/ExpressAdapter';
import ContestRepository from './repositories/contest/ContestRepository';
import ContestUseCase from './usecases/ContestUseCase';
import ProblemRepository from './repositories/problem/ProblemRepository';
import ProblemUseCase from './usecases/ProblemUseCase';
import ProblemController from './controllers/ProblemController';
import LanguageRepository from './repositories/language/LanguageRepository';
import LanguageUseCase from './usecases/LanguageUseCase';
import LanguageController from './controllers/LanguageController';
import SiteRepository from './repositories/site/SiteRepository';
import SiteUseCase from './usecases/SiteUseCase';
import SiteController from './controllers/SiteController';
import UserRepository from './repositories/user/UserRepository';
import UserUseCase from './usecases/UserUseCase';
import UserController from './controllers/UserController';
import ProblemLanguageRepository from './repositories/problemLanguage/ProblemLanguageRepository';
import ProblemLanguageUseCase from './usecases/ProblemLanguageUseCase';
import ProblemLanguageController from './controllers/ProblemLanguageController';
import appConfig from '../configs/app.json';

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();

(async () => {
  if (appConfig.upDatabase) {
    await connection.upDatabase('../database/up.sql');
  }

  const contestRepository = new ContestRepository(connection);
  const contestUseCase = new ContestUseCase(contestRepository);
  new ContestController(httpServer, contestUseCase);

  const problemRepository = new ProblemRepository(connection);
  const problemUseCase = new ProblemUseCase(problemRepository);
  new ProblemController(httpServer, problemUseCase);

  const languageRepository = new LanguageRepository(connection);
  const languageUseCase = new LanguageUseCase(languageRepository);
  new LanguageController(httpServer, languageUseCase);

  const siteRepository = new SiteRepository(connection);
  const siteUseCase = new SiteUseCase(siteRepository);
  new SiteController(httpServer, siteUseCase);

  const userRepository = new UserRepository(connection);
  const userUseCase = new UserUseCase(userRepository);
  new UserController(httpServer, userUseCase);

  const problemLanguageRepository = new ProblemLanguageRepository(connection);
  const problemLanguageUseCase = new ProblemLanguageUseCase(
    problemLanguageRepository
  );
  new ProblemLanguageController(httpServer, problemLanguageUseCase);

  httpServer.listen(3000);
})();
