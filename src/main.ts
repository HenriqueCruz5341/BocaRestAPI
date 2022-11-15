import ContestController from './controllers/ContestController';
import PgPromiseAdapter from './providers/db/PgPromiseAdapter';
import ExpressAdapter from './providers/http/ExpressAdapter';
import ContestDatabase from './repositories/ContestDatabase';
import ContestUseCase from './usecases/ContestUseCase';

const connection = new PgPromiseAdapter();
const transactionDAO = new ContestDatabase(connection);
const contestUseCase = new ContestUseCase(transactionDAO);
const httpServer = new ExpressAdapter();

new ContestController(httpServer, contestUseCase);

httpServer.listen(3000);
