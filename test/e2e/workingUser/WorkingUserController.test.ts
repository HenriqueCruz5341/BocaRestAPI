import axios, { AxiosError } from 'axios';

describe('WorkingUser', () => {
  const baseContest = 'http://localhost:3000/api/contest';
  const contest = {
    contestNumber: 110,
    contestName: 'Contest 110',
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
    workingNumber: 30,
    workingName: 'Working 30',
    workingStartDate: 1655931780,
    workingEndDate: 1655931790,
    workingMaxFileSize: 50,
    workingIsMultiLogin: true,
  };
  const workingOne = { ...working, workingNumber: 21 };
  const workingTwo = { ...working, workingNumber: 22 };
  const workingThree = { ...working, workingNumber: 23 };
  const workingFour = { ...working, workingNumber: 24 };
  const workingFive = { ...working, workingNumber: 25 };

  const baseSite = `http://localhost:3000/api/contest/${contest.contestNumber}/site`;
  const site = {
    siteNumber: 60,
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
  const baseUser = `http://localhost:3000/api/contest/${contest.contestNumber}/site/${site.siteNumber}/user`;
  const user = {
    userNumber: 100,
    userName: 'User 100',
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
  const userOne = { ...user, userNumber: 90, userName: 'User 90' };
  const userTwo = { ...userOne, userNumber: 91, userName: 'User 91' };
  const userThree = { ...userOne, userNumber: 92, userName: 'User 92' };
  const userFour = { ...userOne, userNumber: 93, userName: 'User 93' };
  const userFive = { ...userOne, userNumber: 94, userName: 'User 94' };

  const baseUrl = `http://localhost:3000/api/contest/${contest.contestNumber}/working/${working.workingNumber}/user`;
  const workingUser = {
    userSiteNumbers: [
      { siteNumber: site.siteNumber, userNumber: userOne.userNumber },
      { siteNumber: site.siteNumber, userNumber: userTwo.userNumber },
      { siteNumber: site.siteNumber, userNumber: userThree.userNumber },
    ],
  };

  const baseUrlUserWorking = `http://localhost:3000/api/contest/${contest.contestNumber}/site/${site.siteNumber}/user/${user.userNumber}/working`;
  const userWorking = {
    workingNumbers: [
      workingOne.workingNumber,
      workingTwo.workingNumber,
      workingThree.workingNumber,
    ],
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseWorking, working);
      await axios.post(baseWorking, workingOne);
      await axios.post(baseWorking, workingTwo);
      await axios.post(baseWorking, workingThree);
      await axios.post(baseWorking, workingFour);
      await axios.post(baseWorking, workingFive);
      await axios.post(baseSite, site);
      await axios.post(baseUser, user);
      await axios.post(baseUser, userOne);
      await axios.post(baseUser, userTwo);
      await axios.post(baseUser, userThree);
      await axios.post(baseUser, userFour);
      await axios.post(baseUser, userFive);
      await axios.post(baseUrl, workingUser);
      await axios.post(baseUrlUserWorking, userWorking);
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para o workingUser');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(baseUrl, {
        data: {
          userSiteNumbers: [
            { siteNumber: site.siteNumber, userNumber: userThree.userNumber },
            { siteNumber: site.siteNumber, userNumber: userFour.userNumber },
            { siteNumber: site.siteNumber, userNumber: userFive.userNumber },
          ],
        },
      });
      await axios.delete(baseUrlUserWorking, {
        data: {
          workingNumbers: [
            workingThree.workingNumber,
            workingFour.workingNumber,
            workingFive.workingNumber,
          ],
        },
      });
      await axios.delete(`${baseUser}/${userOne.userNumber}`);
      await axios.delete(`${baseUser}/${userTwo.userNumber}`);
      await axios.delete(`${baseUser}/${userThree.userNumber}`);
      await axios.delete(`${baseUser}/${userFour.userNumber}`);
      await axios.delete(`${baseUser}/${userFive.userNumber}`);
      await axios.delete(`${baseSite}/${site.siteNumber}`);
      await axios.delete(`${baseWorking}/${working.workingNumber}`);
      await axios.delete(`${baseWorking}/${workingOne.workingNumber}`);
      await axios.delete(`${baseWorking}/${workingTwo.workingNumber}`);
      await axios.delete(`${baseWorking}/${workingThree.workingNumber}`);
      await axios.delete(`${baseWorking}/${workingFour.workingNumber}`);
      await axios.delete(`${baseWorking}/${workingFive.workingNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do workingUser');
    }
  });

  describe('User à Working', () => {
    test('Deve testar a rota de listar os users de um working', async function () {
      try {
        const response = await axios.get(baseUrl);
        const output = response.data;
        const statusCode = response.status;

        expect(statusCode).toBe(200);
        expect(output).toBeInstanceOf(Array);
        for (let i = 0; i < workingUser.userSiteNumbers.length; i++) {
          expect(output[i].siteNumber).toBe(
            workingUser.userSiteNumbers[i].siteNumber
          );
          expect(output[i].userNumber).toBe(
            workingUser.userSiteNumbers[i].userNumber
          );
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        fail();
      }
    });

    test('Deve testar a rota de associar users à workings', async function () {
      const newWorkingUser = {
        userSiteNumbers: [
          { siteNumber: site.siteNumber, userNumber: userFour.userNumber },
          { siteNumber: site.siteNumber, userNumber: userFive.userNumber },
        ],
      };
      try {
        const response = await axios.post(baseUrl, newWorkingUser);
        const output = response.data;
        const statusCode = response.status;

        expect(statusCode).toBe(201);
        for (let i = 0; i < newWorkingUser.userSiteNumbers.length; i++) {
          expect(output[i].siteNumber).toBe(
            newWorkingUser.userSiteNumbers[i].siteNumber
          );
          expect(output[i].userNumber).toBe(
            newWorkingUser.userSiteNumbers[i].userNumber
          );
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        fail();
      }
    });

    test('Deve retornar erro 500 se tentar tentar associar users à workings que já foi feita', async function () {
      try {
        await axios.post(baseUrl, workingUser);
      } catch (err) {
        const error = err as AxiosError;
        expect(error.response?.status).toBe(500);
      }
    });

    test('Deve testar a rota de deletar uma associação de users à workings', async function () {
      try {
        let response = await axios.delete(baseUrl, {
          data: {
            userSiteNumbers: [
              { siteNumber: site.siteNumber, userNumber: userOne.userNumber },
              { siteNumber: site.siteNumber, userNumber: userTwo.userNumber },
            ],
          },
        });
        let output = response.data;
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

  describe('Working à User', () => {
    test('Deve testar a rota de listar os workings de um user', async function () {
      try {
        const response = await axios.get(baseUrlUserWorking);
        const output = response.data;
        const statusCode = response.status;

        expect(statusCode).toBe(200);
        expect(output).toBeInstanceOf(Array);
        for (let i = 0; i < userWorking.workingNumbers.length; i++) {
          expect(output[i].workingNumber).toBe(userWorking.workingNumbers[i]);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        fail();
      }
    });

    test('Deve testar a rota de associar workings à users', async function () {
      const newUserWorking = {
        workingNumbers: [workingFour.workingNumber, workingFive.workingNumber],
      };
      try {
        const response = await axios.post(baseUrlUserWorking, newUserWorking);
        const output = response.data;
        const statusCode = response.status;

        expect(statusCode).toBe(201);
        for (let i = 0; i < newUserWorking.workingNumbers.length; i++) {
          expect(output[i].workingNumber).toBe(
            newUserWorking.workingNumbers[i]
          );
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        fail();
      }
    });

    test('Deve retornar erro 500 se tentar tentar associar workings à users que já foi feita', async function () {
      try {
        await axios.post(baseUrlUserWorking, userWorking);
      } catch (err) {
        const error = err as AxiosError;
        expect(error.response?.status).toBe(500);
      }
    });

    test('Deve testar a rota de deletar uma associação de working à users', async function () {
      try {
        let response = await axios.delete(baseUrlUserWorking, {
          data: {
            workingNumbers: [
              workingOne.workingNumber,
              workingTwo.workingNumber,
            ],
          },
        });
        let output = response.data;
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
});
