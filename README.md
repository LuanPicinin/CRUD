# CRUD

Este projeto foi desenvolvido com o intuito de criar um CRUD no qual irá sanar a necessidade de listar, criar, atualizar e deletar desenvolvedores.

### Pré-requisitos

Para testar esse projeto você irá precisar de:

1. [NodeJS](https://nodejs.org/en/)
   - Siga a documentação de instalação: https://nodejs.org/en/download/.
2. [Docker](https://docs.docker.com/)
   - Siga a documentação de instalação: https://docs.docker.com/get-started/.
3. [Docker-compose](https://docs.docker.com/compose/)
   - Siga a documentação de instalação: https://docs.docker.com/compose/install/.
4. [Yarn](https://yarnpkg.com/)
   - Siga a documentação de instalação: https://yarnpkg.com/getting-started/install.

### Instalação

1. Clone o repositório onde desejar em seu computador;

2. Entre na pasta CRUD onde esta localizado o arquivo 'docker-compose.yml':

   ```
   docker-compose up -d --build
   ```

3. Entre na pasta BACKEND e digite o comando:

   ```
   yarn typeorm migration:run
   ```

4. Entre no link: http://localhost:3000/.

### Tecnologias

- [NodeJS](https://nodejs.org/en/) - O Node.js é um ambiente de execução Javascript server-side.
- [ExpressJS](https://expressjs.com/pt-br/) - Express.js é um framework para aplicações web para Node.js.
- [PostgreSQL](https://www.postgresql.org/) - PostgreSQL um sistema de gerenciamento de banco de dados objeto-relacional.
- [ReactJS](https://pt-br.reactjs.org/) - O React é a biblioteca mais popular do JavaScript e é usada para construir uma interface de usuário (IU).
- [Styled-Components](https://styled-components.com/) - É uma biblioteca para React e React Native que permite que você use estilos ao nível de componente na sua aplicação.
- [Jest](https://jestjs.io/) - Jest é uma estrutura de teste de JavaScript agradável com foco na simplicidade.

### Autor

- [Luan Picinin](https://github.com/LuanPicinin).
