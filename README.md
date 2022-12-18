# boca-api

## Introdução

Esta API foi feita com o objetivo de propor uma interface de comunicação com o banco de dados do sistema de correção automático BOCA. O trabalho foi proposto pelo professor Rodrigo Laiola na disciplina de Banco de Dados I do Curso Engenharia de Computação na UFES, e realizado pelos alunos Henrique Faria Ribeiro e Henrique Paulino Cruz.

## Desenvolvimento

Como foi dito, o código foi desenvolvido pelos alunos Henrique Faria Ribeiro e Henrique Paulino Cruz. Para isso foi utilizado o Visual Studio Code com a extensão Live Share, que permite que dois desenvolvedores trabalhem em um mesmo código ao mesmo tempo.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Bibliotecas

- [Express](https://expressjs.com/pt-br/): Framework para Node.js que facilita a criação de rotas e requisições HTTP.
- [pgpromise](https://www.npmjs.com/package/pg-promise): Biblioteca para Node.js que facilita a conexão com o banco de dados PostgreSQL.
- [axios](https://www.npmjs.com/package/axios): Biblioteca para Node.js que facilita a criação de requisições HTTP.
- [jest](https://jestjs.io/pt-BR/): Biblioteca para Node.js que facilita a criação de testes unitários.

## Decisões de projeto

## Instalação

Para instalar o projeto, é necessário ter o Node.js e o Docker instalados. Após isso, basta clonar o repositório e executar o comando `npm install` para instalar as dependências do projeto.

### Dev

Para executar o projeto em produção, basta executar o comando `npm run docker:dev`. Isso irá subir o banco de dados, a API e o adminer em containers Docker.

### Produção

Para executar o projeto em produção, basta executar o comando `npm run docker:prod`. Isso irá subir o banco de dados e a API em containers Docker. Mas diferente do modo de desenvolvimento, o código da API não será atualizado automaticamente, sendo necessário parar e subir novamente o container, e será todo compilado para JavaScript, ao invés de rodar o código TypeScript, o que dá uma pequena melhora de performance.

### Testes

Os testes feitos na aplicação são os testes E2E (end to end), que testam a aplicação como um todo, desde a requisição HTTP até a resposta HTTP. Para executar os testes, basta executar o projeto com modo [Dev](#dev) e depois utilizar o comando `npm run test`.

Da forma que foi mostrado anteriormente todos os testes serão executados, mas é possível executar apenas um teste específico, utilizando um comando personalizado para cada componente testado:

- `npm run test:content`: Testa o componente de contents.
- `npm run test:problem`: Testa o componente de problemas.
- `npm run test:language`: Testa o componente de linguagens.
- `npm run test:site`: Testa o componentes de sites.
- `npm run test:user`: Testa o componentes de usuários.
- `npm run test:problemLanguage`: Testa o componente de problemas linguagens.
- `npm run test:working`: Testa o componente de listas de exercícios.
- `npm run test:workingUser`: Testa o componente de listas de exercícios usuários.

## Documentação

Toda a documentação da API pode ser encontrada [aqui](https://documenter.getpostman.com/view/19737871/2s8YzZPJsn). Ela foi feita utilizando o Postman, e contém todas as rotas da API, com exemplos de requisições e respostas.
