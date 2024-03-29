import axios, { AxiosError } from 'axios';

describe('Contest', () => {
  const baseUrl = 'http://localhost:3000/api/contest';
  const contest = {
    contestNumber: 80,
    contestName: 'Contest 80',
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

  beforeAll(async () => {
    try {
      await axios.post(baseUrl, contest);
      await axios.post(baseUrl, {
        ...contest,
        contestNumber: contest.contestNumber + 1,
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o contest');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${contest.contestNumber - 1}`);
      await axios.delete(`${baseUrl}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do contest');
    }
  });

  test('Deve testar a rota de listar todos os contests', async function () {
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

  test('Deve testar a rota de listar contests por id', async function () {
    try {
      const response = await axios.get(`${baseUrl}/${contest.contestNumber}`);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.contestNumber).toBe(contest.contestNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de listar contests por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um contest', async function () {
    try {
      const newContest = { ...contest };
      newContest.contestNumber--;

      const response = await axios.post(baseUrl, newContest);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(201);
      expect(output.contestNumber).toBe(newContest.contestNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve retornar erro 500 se tentar criar contest que já existe', async function () {
    try {
      await axios.post(baseUrl, contest);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um contest', async function () {
    try {
      const updatedContest = { ...contest };
      updatedContest.contestName = 'New Contest Name';

      const response = await axios.put(
        `${baseUrl}/${updatedContest.contestNumber}`,
        updatedContest
      );
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.contestNumber).toBe(updatedContest.contestNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de deletar um contest', async function () {
    try {
      const response = await axios.delete(
        `${baseUrl}/${contest.contestNumber + 1}`
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
