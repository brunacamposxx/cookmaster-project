const chai = require('chai');
const chaiHttp = require('chai-http');
// const MongoClient = require('mongodb/lib/mongo_client');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');
describe('POST /login - Crie um endpoint para o login de usuários', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(() => {
    MongoClient.connect.restore();
  });
  describe('Quando não é passado email e senha', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/login').send({})
    });
    
    it('retorna código de status "401"', () => {
      // expect(response.status).to.be.equal(401);
      expect(response).to.have.status(401);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('retorna um objeto no body com uma "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" tem o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    })
  });
  describe('Quando é passado email ou senha com incorreta', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/login').send({
        username: 'xablau@gmail.com',
        password: '123456'
      })
    });

    it('retorna codigo de status "401"', () => {
      expect(response).to.have.status(401);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" tem o valor ""Incorrect username or password""', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando login é feito com sucesso', () => {
    let response;
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        username: 'brunacampos@gmail.com',
        password: '123456ok',
      });
      response = await chai.request(server).post('/login').send({
        username: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
      expect(response).to.have.status(401);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" não está vazia', () => {
      expect(response.body.message).to.not.be.empty;
    });
  });

  describe("Quando o email já existe", () => {
    let response;

    before(async () => {
			await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({ 
          username: 'brunacampos@gmail.com',
          password: '123456ok',
        });
      response = await chai.request(server).post("/users").send({ 
        username: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    });

    after(async () => {
      await connectionMock.db("Cookmaster").collection("users").drop();
    });

    it("Retorna o status code 409", () => {
      expect(response).to.have.status(409);
    });

    it("Retorna um objeto", () => {
      expect(response.body).to.be.a("object");
    });

    it("Verifica se o objeto response tem a propriedade message", () => {
      expect(response.body).to.have.property("message");
    });

    it("Retorna uma mensagem de erro de validação", () => {
      expect(response.body.message).to.be.equals("Email already registered");
    });
  });


describe('POST /users - Crie um endpoint para o cadastro de usuários', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado name, email e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({})
    });

    it('retorna código de status "400"', () => {
      // expect(response.status).to.be.equal(401);
      expect(response).to.have.status(400);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('retorna um objeto no body com uma "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
  });

  describe('Quando é passado email invalido', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        name: 'xablm',
        email: 'xablaum',
        password: '123456'
      })
    });
    it('retorna codigo de status "400"', () => {
      expect(response).to.have.status(400);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando login é feito com sucesso', () => {
    let response;

    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'bruna',
        email: 'brunacampos@gmail.com',
        password: '123456ok',
      });
      response = await chai.request(server).post('/users').send({
        name: 'bruna',
        email: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(201);
    });
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" não está vazia', () => {
      expect(response.body.message).to.not.be.empty;
    });
  });

  describe("Quando o email já existe", () => {
    let response;

    before(async () => {
			await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({ 
          email: 'brunacampos@gmail.com',
          password: '123456ok',
        });
      response = await chai.request(server).post("/users").send({ 
        email: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    });

    after(async () => {
      await connectionMock.db("Cookmaster").collection("users").drop();
    });

    it("Retorna o status code 409", () => {
      expect(response).to.have.status(409);
    });

    it("Retorna um objeto", () => {
      expect(response.body).to.be.a("object");
    });

    it("Verifica se o objeto response tem a propriedade message", () => {
      expect(response.body).to.have.property("message");
    });

    it("Retorna uma mensagem de erro de validação", () => {
      expect(response.body.message).to.be.equals("Email already registered");
    });
  });

});


describe('Quando login é feito com sucesso', () => {
  let response;

  before(async () => {
    const userCollection = connectionMock.db('Cookmaster').collection('users')
    await userCollection.insertOne({
      name: 'bruna',
      email: 'brunacampos@gmail.com',
      password: '123456ok',
    });
    response = await chai.request(server).post('/users').send({
      name: 'bruna',
      email: 'brunacampos@gmail.com',
      password: '123456ok',
    });
  });

  it('retorna código de status "200"', () => {
    expect(response).to.have.status(201);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('objeto de resposta possui a propriedade "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" não está vazia', () => {
    expect(response.body.message).to.not.be.empty;
  });
});

describe("Quando o email já existe", () => {
  let response;

  before(async () => {
    await connectionMock
      .db("Cookmaster")
      .collection("users")
      .insertOne({ 
        email: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    response = await chai.request(server).post("/users").send({ 
      email: 'brunacampos@gmail.com',
      password: '123456ok',
    });
  });

  after(async () => {
    await connectionMock.db("Cookmaster").collection("users").drop();
  });

  it("Retorna o status code 409", () => {
    expect(response).to.have.status(409);
  });

  it("Retorna um objeto", () => {
    expect(response.body).to.be.a("object");
  });

  it("Verifica se o objeto response tem a propriedade message", () => {
    expect(response.body).to.have.property("message");
  });

  it("Retorna uma mensagem de erro de validação", () => {
    expect(response.body.message).to.be.equals("Email already registered");
  });
});

describe('Cria um endpoint para o cadastro de receitas', () => {
  let response;

  before(async () => {
    const userCollection = connectionMock.db('Cookmaster').collection('recipes')
    await userCollection.insertOne({
      name: 'string',
      ingredients: 'string',
      preparation: 'string',
    });
    response = await chai.request(server).post('/recipes').send({
      name: 'string',
      ingredients: 'string',
      preparation: 'string',
    });
  });

  it('retorna código de status "200"', () => {
    expect(response).to.have.status(201);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('objeto de resposta possui a propriedade "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" não está vazia', () => {
    expect(response.body.message).to.not.be.empty;
  });
});

describe("Quando não é passado o campo 'name'", () => {
  let response;

  before(async () => {
    await connectionMock
      .db("Cookmaster")
      .collection("recipes")
      .insertOne({ 
        ingredients: 'string',
        preparation: 'string',
      });
    response = await chai.request(server).post("/recipes").send({ 
      ingredients: 'string',
      preparation: 'string',
    });
  });

  after(async () => {
    await connectionMock.db("Cookmaster").collection("recipes").drop();
  });

  it("Retorna o status code 400", () => {
    expect(response).to.have.status(400);
  });

  it("Retorna um objeto", () => {
    expect(response.body).to.be.a("object");
  });

  it("Verifica se o objeto response tem a propriedade message", () => {
    expect(response.body).to.have.property("message");
  });

  it("Retorna uma mensagem de erro de validação", () => {
    expect(response.body.message).to.be.equals("Invalid entries. Try again.");
  });
});

describe('Crie um endpoit para listagem de receitas', () => {
  let response;

  before(async () => {
    response = await chai.request(server).get('/recipes').send({})
  });

  it('retorna código de status "200"', () => {
    // expect(response.status).to.be.equal(401);
    expect(response).to.have.status(200);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('retorna um objeto no body com uma "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" tem o valor', () => {
    expect(response.body.message).not.to.be.empty;
  })
});


describe('Crie um endpoit para visualizar uma receita específica', () => {
  let response;

  before(async () => {
    response = await chai.request(server).get('/recipes/:id').send({})
  });

  it('retorna código de status "200"', () => {
    // expect(response.status).to.be.equal(401);
    expect(response).to.have.status(200);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('retorna um objeto no body com uma "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" tem o valor', () => {
    expect(response.body.message).not.to.be.empty;
  })
});

describe('Quando uma receita não existe', () => {
  let response;

  before(async () => {
    response = await chai.request(server).post('/recipes/:id').send({})
  });
  it('retorna codigo de status "401"', () => {
    expect(response).to.have.status(404);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('objeto de resposta possui a propriedade "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" tem o valor ""Incorrect username or password""', () => {
    expect(response.body.message).to.be.equal('recipe not found');
  });
});


describe('Quando login é feito com sucesso', () => {
  let response;

  before(async () => {
    const userCollection = connectionMock.db('Cookmaster').collection('users')
    await userCollection.insertOne({
      username: 'brunacampos@gmail.com',
      password: '123456ok',
    });
    response = await chai.request(server).post('/login').send({
      username: 'brunacampos@gmail.com',
      password: '123456ok',
    });
  });

  it('retorna código de status "200"', () => {
    expect(response).to.have.status(401);
  });
  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object');
  });
  it('objeto de resposta possui a propriedade "message"', () => {
    expect(response.body).to.have.property('message');
  });
  it('a propriedade "message" não está vazia', () => {
    expect(response.body.message).to.not.be.empty;
  });
});

describe("Quando o email já existe", () => {
  let response;

  before(async () => {
    await connectionMock
      .db("Cookmaster")
      .collection("users")
      .insertOne({ 
        username: 'brunacampos@gmail.com',
        password: '123456ok',
      });
    response = await chai.request(server).post("/users").send({ 
      username: 'brunacampos@gmail.com',
      password: '123456ok',
    });
  });

  after(async () => {
    await connectionMock.db("Cookmaster").collection("users").drop();
  });

  it("Retorna o status code 409", () => {
    expect(response).to.have.status(409);
  });

  it("Retorna um objeto", () => {
    expect(response.body).to.be.a("object");
  });

  it("Verifica se o objeto response tem a propriedade message", () => {
    expect(response.body).to.have.property("message");
  });

  it("Retorna uma mensagem de erro de validação", () => {
    expect(response.body.message).to.be.equals("Email already registered");
  });
});
}); 