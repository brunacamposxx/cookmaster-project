# Projeto Cookmaster

---

### Desenvolvido por 💬:

### Bruna Campos @brunacamposxx


Por favor, me envie seu feedback sobre esse projeto e me ajude a evoluir 🧠


---



Esse projeto se trata de um app onde é possível fazer o cadastro e login de pessoas usuárias, onde apenas essas pessoas poderão acessar, modificar e deletar as receitas que cadastrou. 

Através dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Além disso, as pessoas usuárias devem poder ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

A autenticação é feita via `JWT`.

É possível adicionar uma imagem à uma receita, utilizando o upload de arquivos fornecido pelo `multer`.



---



# Técnologias usadas:
  - Node.js
  - Express.js
  - MongoDB
  - Arquitetura MSC e padrão Rest;


---

# Habilidades

Neste projeto, você quero demonstrar minha capacidade em:

- Gerar tokens a partir de informações como login e senha e entender o que há dentro de um token de autenticação;

- Autenticar rotas do Express, usando o token JWT;

- Fazer upload de arquivos em APIs REST;

- Salvar arquivos no servidor através de uma API REST;

- Consultar arquivos do servidor através de uma api REST.

- Realizar testes de integração


---

# Instruções para acessar esse projeto

1. Clone o repositório

- `git clone https://github.com/brunacamposxx/project-cookmaster`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd project-cookmaster`

2. Instale as dependências

- `npm install`

3. Startar node com Nodemon

- `npm run dev`


---

## Conexão com o Banco

## Coleções

O banco tem duas coleções: usuários e receitas.

A coleção de usuários tem o seguinte nome: `users`.

Os campos da coleção `users` tem este formato:

```json
{ 
  "name" : "Erick Jacquin",
  "email" : "erickjacquin@gmail.com",
  "password" : "12345678",
  "role" : "user"
}
```

A resposta do insert para ser retornada após a criação é esta:

```json
{ 
  "_id" : ObjectId("5f46914677df66035f61a355"),
  "name" : "Erick Jacquin",
  "email" : "erickjacquin@gmail.com",
  "password" : "12345678",
  "role" : "user"
}
```
(O _id será gerado automaticamente pelo mongodb)

A coleção de receitas tem o seguinte nome: `recipes`.

Os campos da coleção `recipes` terão este formato:

```json
{ 
  "name" : "Receita do Jacquin",
  "ingredients" : "Frango", 
  "preparation" : "10 minutos no forno"
}
```

A resposta do insert para ser retornada após a criação é esta:

```json
{ 
  "_id" : ObjectId("5f46919477df66035f61a356"),
  "name" : "string", 
  "ingredients" : "string", 
  "preparation" : "string", 
  "userId" : ObjectId("5f46914677df66035f61a355") 
}
```
(O _id será gerado automaticamente pelo mongodb, e o userId será gerado com o id do usuário que criou a receita)

---

## Linter

Foi usado o [ESLint](https://eslint.org/) para fazer a análise estática código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivos `package.json`.

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm run lint`.


---

# Testando as requisições:
Utilizei o Postman para testar a aplicação. 

### Cadastro de usuários:

- POST /users - rota que cria um novo usuário

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```


- Para criar um usuário através da API, todos os campos são obrigatórios, com exceção do Role.

- O campo Email deve ser único.

- Usuários criados através desse endpoint devem ter seu campo Role com o atributo _user_, ou seja, devem ser usuários comuns, e não admins.


### Login de usuários:

- POST /login 

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- Esses campos serão validados no banco de dados.

- Um token `JWT` será gerado e retornado caso haja sucesso no login. No seu payload estará presente o id, email e role do usuário.


### Cadastro de receitas

- POST /recipes 

- A receita só será criada caso o usuário esteja logado e o token `JWT` validado.

- No banco, a receita terá os campos Nome, Ingredientes, Modo de preparo, URL da imagem e Id do Autor.

- Nome, ingredientes e modo de preparo devem ser recebidos no corpo da requisição, com o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```


- O campo ID do autor, será preenchido automaticamente com o ID do usuário logado.


### Endpoint para a listagem de receitas

GET /recipes


### Endpoint para visualizar uma receita específica

- A rota deve ser (`/recipes/:id`).
GET /recipes/:id


### Permissões de admin

Há um `seed.js` na raiz do projeto com uma query do Mongo DB capaz de inserir um usuário na coleção _users_ com os seguintes valores:

`{ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }`

**Obs.:** Esse usuário tem o poder de criar, deletar, atualizar ou remover qualquer receita, independente de quem a cadastrou. 


### Edição de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado, ou caso esse usuário seja um admin.

- O corpo da requisição deve receber o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```


### Exclusão de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser excluída caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin.


### Endpoint para a adição de uma imagem a uma receita

- A rota deve ser (`/recipes/:id/image/`).

- A imagem deve ser lida do campo `image`.

- O endpoint deve aceitar requisições no formato `multipart/form-data`.

- O nome do arquivo será o ID da receita, e sua extensão `.jpeg`.

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado ou caso o usuário logado seja admin.


### Acessar a imagem de uma receita

- As imagens estão disponíveis através da rota `/images/<id-da-receita>.jpeg` na API.


### Crie um endpoint para cadastro de pessoas administradoras

- A rota deve ser (`/users/admin`).

- Só será possível adicionar um admin caso esta ação esteja sendo feita por outro admin, portanto, deve ser validado se há um admin logado.

- Por padrão, as requisições pra esse endpoint adicionam um usuário com a role _admin_.

- O corpo da requisição deve ter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

---

# Proximas features:
 🎯 Testes de integração
