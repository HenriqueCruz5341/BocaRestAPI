import ContestController from './controllers/ContestController';
import PgPromiseAdapter from './providers/db/PgPromiseAdapter';
import ExpressAdapter from './providers/http/ExpressAdapter';
import ContestDatabase from './repositories/ContestDatabase';
import CalculateInvoice from './usecases/ContestUseCase';

const connection = new PgPromiseAdapter();
const transactionDAO = new ContestDatabase(connection);
const calculateInvoice = new CalculateInvoice(transactionDAO);
const httpServer = new ExpressAdapter();

new ContestController(httpServer, calculateInvoice);

httpServer.listen(3000);
