import axios, { AxiosError } from 'axios';

describe('Problem', () => {
  const baseContest = 'http://localhost:3000/api/contest';
  const contest = {
    contestNumber: 50,
    contestName: 'Contest 50',
    contestStartDate: 1655931780,
    contestDuration: 3600,
    contestLocalSite: 1,
    contestPenalty: 20,
    contestMaxFileSize: 100,
    contestActive: true,
    contestMainSite: 1,
    contestKeys: 'key1,key2,key3',
    contestUnlockKey: 'unlockKey',
    contestMainSiteUrl: 'https://www.google.com',
  };
  const baseWorking = `http://localhost:3000/api/contest/${contest.contestNumber}/working`;
  const working = {
    workingNumber: 10,
    workingName: 'Working 10',
    workingStartDate: 1655931780,
    workingEndDate: 1655931790,
    workingMaxFileSize: 50,
    workingIsMultiLogin: true,
  };

  const baseUrl = `http://localhost:3000/api/contest/${contest.contestNumber}/problem`;
  const problem = {
    workingNumber: working.workingNumber,
    problemNumber: 80,
    problemName: 'Problem 80',
    problemFullName: null,
    problemBaseFileName: null,
    problemInputFileName: 'problem.zip',
    problemInputFile: '101010',
    problemInputFileHash: 'sjhdgajsfbjhdsgfjhsdfbkjhsdgf',
    fake: false,
    problemColorName: 'blue',
    problemColor: 'A8E7F0',
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseWorking, working);
      await axios.post(baseUrl, problem);
      await axios.post(baseUrl, {
        ...problem,
        problemNumber: problem.problemNumber + 1,
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o problem');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${problem.problemNumber - 1}`);
      await axios.delete(`${baseUrl}/${problem.problemNumber}`);
      await axios.delete(`${baseWorking}/${working.workingNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do problem');
    }
  });

  test('Deve testar a rota de listar os problems de um contest', async function () {
    try {
      const response = await axios.get(baseUrl);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output).toBeInstanceOf(Array);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de listar problem por id', async function () {
    try {
      const response = await axios.get(`${baseUrl}/${problem.problemNumber}`);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.problemNumber).toBe(problem.problemNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de listar problem por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um problem', async function () {
    const newProblem = { ...problem };
    newProblem.problemNumber--;

    try {
      const response = await axios.post(baseUrl, newProblem);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(201);
      expect(output.problemNumber).toBe(newProblem.problemNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve retornar erro 500 se tentar criar problem que já existe', async function () {
    try {
      await axios.post(baseUrl, problem);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um problem', async function () {
    const updatedProblem = { ...problem };
    updatedProblem.problemName = 'New Problem Name';

    try {
      const response = await axios.put(
        `${baseUrl}/${updatedProblem.problemNumber}`,
        updatedProblem
      );
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.problemNumber).toBe(updatedProblem.problemNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de deletar um problem', async function () {
    try {
      const response = await axios.delete(
        `${baseUrl}/${problem.problemNumber + 1}`
      );
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output).toBe('');
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });
});
