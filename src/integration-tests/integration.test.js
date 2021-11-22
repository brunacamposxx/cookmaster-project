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
  
});
