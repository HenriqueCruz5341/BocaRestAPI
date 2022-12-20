import axios, { AxiosError } from 'axios';

describe('User', () => {
  const baseContest = 'http://localhost:3000/api/contest';
  const contest = {
    contestNumber: 70,
    contestName: 'Contest 70',
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
  const baseSite = `http://localhost:3000/api/contest/${contest.contestNumber}/site`;
  const site = {
    siteNumber: 70,
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
  const baseUrl = `http://localhost:3000/api/contest/${contest.contestNumber}/site/${site.siteNumber}/user`;
  const user = {
    userNumber: 80,
    userName: 'User',
    userDesc: "User's description",
    userType: 'user',
    userEnabled: true,
    userMultiLogin: true,
    userFullName: 'User',
    userPassword: 'password',
    userIp: '127.0.0.1',
    userLastLogin: 1655931780,
    userSession: 'session',
    userSessionExtra: 'sessionExtra',
    userLastLogout: 1655931780,
    userPermitIp: '127.0.0.1',
    userInfo: 'info',
    userIcpcId: 'icpcId',
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseSite, site);
      await axios.post(baseUrl, user);
      await axios.post(baseUrl, {
        ...user,
        userNumber: user.userNumber + 1,
        userName: user.userName + (user.userNumber + 1),
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o user');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${user.userNumber - 1}`);
      await axios.delete(`${baseUrl}/${user.userNumber}`);
      await axios.delete(`${baseSite}/${site.siteNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do site');
    }
  });

  test('Deve testar a rota de listar os users de um contest', async function () {
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

  test('Deve testar a rota de listar user por id', async function () {
    try {
      const response = await axios.get(`${baseUrl}/${user.userNumber}`);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.userNumber).toBe(user.userNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de listar user por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um user', async function () {
    const newUser = { ...user };
    newUser.userNumber--;
    newUser.userName = newUser.userName + newUser.userNumber;

    try {
      const response = await axios.post(baseUrl, newUser);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(201);
      expect(output.userNumber).toBe(newUser.userNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve retornar erro 500 se tentar criar user que já existe', async function () {
    try {
      await axios.post(baseUrl, user);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um user', async function () {
    const updatedUser = { ...user };
    updatedUser.userName = 'New Site Name';

    try {
      const response = await axios.put(
        `${baseUrl}/${updatedUser.userNumber}`,
        updatedUser
      );
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.userNumber).toBe(updatedUser.userNumber);
      expect(output.userName).toBe(updatedUser.userName);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de deletar um user', async function () {
    try {
      const response = await axios.delete(`${baseUrl}/${user.userNumber + 1}`);
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
