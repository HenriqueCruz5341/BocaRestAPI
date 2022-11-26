import ContestController from './controllers/ContestController';
import PgPromiseAdapter from './providers/db/PgPromiseAdapter';
import ExpressAdapter from './providers/http/ExpressAdapter';
import ContestRepository from './repositories/contest/ContestRepository';
import ContestUseCase from './usecases/ContestUseCase';

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();

const contestRepository = new ContestRepository(connection);
const contestUseCase = new ContestUseCase(contestRepository);
new ContestController(httpServer, contestUseCase);

httpServer.listen(3000);
