import axios, { AxiosError } from 'axios';

describe('Language', () => {
  const baseContest = 'http://localhost:3000/api/contest';
  const contest = {
    contestNumber: 40,
    contestName: 'Contest 40',
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
  const baseUrl = `http://localhost:3000/api/contest/${contest.contestNumber}/language`;
  const language = {
    langNumber: 80,
    langName: 'Language 80',
    langExtension: 'ext80',
  };

  beforeAll(async () => {
    try {
      await axios.post(baseContest, contest);
      await axios.post(baseUrl, language);
      await axios.post(baseUrl, {
        ...language,
        langNumber: language.langNumber + 1,
      });
    } catch (e) {
      console.log('ERROR: Não pode criar a base de teste para a language');
    }
  });

  afterAll(async () => {
    try {
      await axios.delete(`${baseUrl}/${language.langNumber - 1}`);
      await axios.delete(`${baseUrl}/${language.langNumber}`);
      await axios.delete(`${baseContest}/${contest.contestNumber}`);
    } catch (e) {
      console.log('ERROR: Não pode limpar a base de teste da language');
    }
  });

  test('Deve testar a rota de listar os languages de um contest', async function () {
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

  test('Deve testar a rota de listar language por id', async function () {
    try {
      const response = await axios.get(`${baseUrl}/${language.langNumber}`);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.langNumber).toBe(language.langNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
    }
  });

  test('Deve testar a rota de listar language por id com um id inválido', async function () {
    try {
      await axios.get(`${baseUrl}/-1`);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(404);
    }
  });

  test('Deve testar a rota de criar um language', async function () {
    const newLanguage = { ...language };
    newLanguage.langNumber--;

    try {
      const response = await axios.post(baseUrl, newLanguage);
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(201);
      expect(output.langNumber).toBe(newLanguage.langNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve retornar erro 500 se tentar criar language que já existe', async function () {
    try {
      await axios.post(baseUrl, language);
    } catch (err) {
      const error = err as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });

  test('Deve testar a rota de atualizar um language', async function () {
    const updatedLanguage = { ...language };
    updatedLanguage.langName = 'New Language Name';

    try {
      const response = await axios.put(
        `${baseUrl}/${updatedLanguage.langNumber}`,
        updatedLanguage
      );
      const output = response.data;
      const statusCode = response.status;

      expect(statusCode).toBe(200);
      expect(output.langNumber).toBe(updatedLanguage.langNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      fail();
    }
  });

  test('Deve testar a rota de deletar um language', async function () {
    try {
      const response = await axios.delete(
        `${baseUrl}/${language.langNumber + 1}`
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
