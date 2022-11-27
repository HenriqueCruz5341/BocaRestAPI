import axios, { AxiosError } from 'axios';

describe('Language', () => {
  const baseContest = 'http://localhost:3000/contest';
  const contest = {
    contestNumber: 60,
    contestName: 'Contest 60',
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
  const baseUrl = `http://localhost:3000/contest/${contest.contestNumber}/site`;
  const site = {
    siteNumber: 80,
    siteIp: '127.0.0.1/boca',
    siteName: 'Site',
    siteActive: true,
    sitePermitLogins: true,
    siteGlobalScore: 1,
    siteScoreLevel: 3,
    siteNextUser: 0,
    siteNextClar: 0,
    siteNextRun: 0,
    siteNextTask: 0,
    siteMaxTask: 10,
    siteChiefName: 'Chief',
    siteMaxRuntime: 600,
    siteMaxJudgeWaitTime: 900,
    siteLastMileAnswer: 17100,
    siteLastMileScore: 14400,
    siteDuration: 18000,
    siteAutoEnd: true,
    siteJudging: 1,
    siteTasking: 1,
    siteAutoJudge: false,
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseUrl, site);
      await axios.post(baseUrl, {
        ...site,
        siteNumber: site.siteNumber + 1,
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o site');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${site.siteNumber - 1}`);
      await axios.delete(`${baseUrl}/${site.siteNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do site');
    }
  });

  test('Deve testar a rota de listar os sites de um contest', async function () {
    const response = await axios.get(baseUrl);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBeInstanceOf(Array);
    // TODO banco de teste, testar resultados output
  });

  test('Deve testar a rota de listar site por id', async function () {
    const response = await axios.get(`${baseUrl}/${site.siteNumber}`);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output.siteNumber).toBe(site.siteNumber);
  });

  test('Deve testar a rota de listar site por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um site', async function () {
    const newLanguage = { ...site };
    newLanguage.siteNumber--;

    const response = await axios.post(baseUrl, newLanguage);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(201);
    expect(output.siteNumber).toBe(newLanguage.siteNumber);
  });

  test('Deve retornar erro 500 se tentar criar site que já existe', async function () {
    try {
      await axios.post(baseUrl, site);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um site', async function () {
    const updatedLanguage = { ...site };
    updatedLanguage.siteName = 'New Site Name';

    const response = await axios.put(
      `${baseUrl}/${updatedLanguage.siteNumber}`,
      updatedLanguage
    );
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output.siteNumber).toBe(updatedLanguage.siteNumber);
  });

  test('Deve testar a rota de deletar um site', async function () {
    const response = await axios.delete(`${baseUrl}/${site.siteNumber + 1}`);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBe('');
  });
});
