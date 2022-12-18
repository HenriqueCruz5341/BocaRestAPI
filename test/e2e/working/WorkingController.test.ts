import axios, { AxiosError } from 'axios';

describe('Working', () => {
  const baseContest = 'http://localhost:3000/contest';
  const contest = {
    contestNumber: 100,
    contestName: 'Contest 100',
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
  const baseUrl = `http://localhost:3000/contest/${contest.contestNumber}/working`;
  const working = {
    workingNumber: 80,
    workingName: 'Working 80',
    workingStartDate: 1655931780,
    workingEndDate: 1655931790,
    workingMaxFileSize: 50,
    workingIsMultiLogin: true,
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseUrl, working);
      await axios.post(baseUrl, {
        ...working,
        workingNumber: working.workingNumber + 1,
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o working');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${working.workingNumber - 1}`);
      await axios.delete(`${baseUrl}/${working.workingNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do working');
    }
  });

  test('Deve testar a rota de listar os working de um contest', async function () {
    const response = await axios.get(baseUrl);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBeInstanceOf(Array);
  });

  test('Deve testar a rota de listar working por id', async function () {
    const response = await axios.get(`${baseUrl}/${working.workingNumber}`);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output.workingNumber).toBe(working.workingNumber);
  });

  test('Deve testar a rota de listar working por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um working', async function () {
    const newWorking = { ...working };
    newWorking.workingNumber--;

    const response = await axios.post(baseUrl, newWorking);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(201);
    expect(output.workingNumber).toBe(newWorking.workingNumber);
  });

  test('Deve retornar erro 500 se tentar criar working que já existe', async function () {
    try {
      await axios.post(baseUrl, working);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um working', async function () {
    const updatedWorking = { ...working };
    updatedWorking.workingName = 'New Working Name';

    const response = await axios.put(
      `${baseUrl}/${updatedWorking.workingNumber}`,
      updatedWorking
    );
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output.workingNumber).toBe(updatedWorking.workingNumber);
  });

  test('Deve testar a rota de deletar um working', async function () {
    const response = await axios.delete(
      `${baseUrl}/${working.workingNumber + 1}`
    );
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBe('');
  });
});
