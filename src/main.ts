import ContestController from './controllers/ContestController';
import PgPromiseAdapter from './providers/db/PgPromiseAdapter';
import ExpressAdapter from './providers/http/ExpressAdapter';
import ContestRepository from './repositories/contest/ContestRepository';
import ContestUseCase from './usecases/ContestUseCase';
import ProblemRepository from './repositories/problem/ProblemRepository';
import ProblemUseCase from './usecases/ProblemUseCase';
import ProblemController from './controllers/ProblemController';

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();

const contestRepository = new ContestRepository(connection);
const contestUseCase = new ContestUseCase(contestRepository);
new ContestController(httpServer, contestUseCase);
const problemRepository = new ProblemRepository(connection);
const problemUseCase = new ProblemUseCase(problemRepository);
new ProblemController(httpServer, problemUseCase);

httpServer.listen(3000);
