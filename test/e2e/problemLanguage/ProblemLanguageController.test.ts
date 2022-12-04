import axios, { AxiosError } from 'axios';

describe('ProblemLanguage', () => {
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
  const baseProblem = `http://localhost:3000/contest/${contest.contestNumber}/problem`;
  const problem = {
    problemNumber: 90,
    problemName: 'Problem 90',
    problemFullName: null,
    problemBaseFileName: null,
    problemInputFileName: 'problem.zip',
    problemInputFile: '101010',
    problemInputFileHash: 'sjhdgajsfbjhdsgfjhsdfbkjhsdgf',
    fake: false,
    problemColorName: 'blue',
    problemColor: 'A8E7F0',
  };
  const baseLanguage = `http://localhost:3000/contest/${contest.contestNumber}/language`;
  const languageOne = {
    langNumber: 90,
    langName: 'Language 90',
    langExtension: 'ext90',
  };
  const languageTwo = {
    langNumber: 91,
    langName: 'Language 91',
    langExtension: 'ext91',
  };
  const languageThree = {
    langNumber: 92,
    langName: 'Language 92',
    langExtension: 'ext92',
  };
  const languageFour = {
    langNumber: 93,
    langName: 'Language 93',
    langExtension: 'ext93',
  };
  const languageFive = {
    langNumber: 94,
    langName: 'Language 94',
    langExtension: 'ext94',
  };

  const baseUrl = `http://localhost:3000/contest/${contest.contestNumber}/problem/${problem.problemNumber}/language`;
  const problemLanguage = {
    languageNumbers: [90, 91, 92],
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseProblem, problem);
      await axios.post(baseLanguage, languageOne);
      await axios.post(baseLanguage, languageTwo);
      await axios.post(baseLanguage, languageThree);
      await axios.post(baseLanguage, languageFour);
      await axios.post(baseLanguage, languageFive);
      await axios.post(baseUrl, problemLanguage);
    } catch (e) {
      console.log(
        'ERROR: Não pode criar a base de teste para o problemLanguage'
      );
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(baseUrl, {
        data: { languageNumbers: [92, 93, 94] },
      });
      await axios.delete(`${baseLanguage}/${languageOne.langNumber}`);
      await axios.delete(`${baseLanguage}/${languageTwo.langNumber}`);
      await axios.delete(`${baseLanguage}/${languageThree.langNumber}`);
      await axios.delete(`${baseLanguage}/${languageFour.langNumber}`);
      await axios.delete(`${baseLanguage}/${languageFive.langNumber}`);
      await axios.delete(`${baseProblem}/${problem.problemNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste do problemLanguage');
    }
  });

  test('Deve testar a rota de listar os problemLanguages de um problem', async function () {
    const response = await axios.get(baseUrl);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBeInstanceOf(Array);
    for (let i = 0; i < problemLanguage.languageNumbers.length; i++) {
      expect(output[i].languageNumber).toBe(problemLanguage.languageNumbers[i]);
    }
  });

  test('Deve testar a rota de criar problemLanguages', async function () {
    const newProblemLanguage = {
      languageNumbers: [93, 94],
    };
    const response = await axios.post(baseUrl, newProblemLanguage);
    const output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(201);
    for (let i = 0; i < newProblemLanguage.languageNumbers.length; i++) {
      expect(output[i].languageNumber).toBe(
        newProblemLanguage.languageNumbers[i]
      );
    }
  });

  test('Deve retornar erro 500 se tentar tentar criar um problemNumber que já existe', async function () {
    try {
      await axios.post(baseUrl, problemLanguage);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de deletar problemNumbers', async function () {
    let response = await axios.delete(baseUrl, {
      data: { languageNumbers: [90, 91] },
    });
    let output = response.data;
    const statusCode = response.status;

    expect(statusCode).toBe(200);
    expect(output).toBe('');
  });
});
