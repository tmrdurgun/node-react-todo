/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../../../app');

const todoModel = require('../../../../models/todo');

const request = supertest(app);

const todoJson = require('../../../../__mocks__/data/todos.json');

const todoData = JSON.parse(JSON.stringify(todoJson.data));
require('dotenv').config();

describe('todos', () => {
  beforeAll(async (done) => {
    try {

      await mongoose.createConnection(process.env.DB_URL_TEST, {
        useNewUrlParser: true,
        autoReconnect: true,
        maxPoolSize: 10
      });

      await todoModel.insertMany(todoData);
      
    } catch (error) {
      console.log(error.message);
    }

    done();
  });

  afterAll(async (done) => {
    await todoModel.deleteMany({});
    await mongoose.connection.close();

    done();
  });

  it('should retrieve todos', async (done) => { 
      const response = await request
        .get('/todo/list');
  
        console.log(response.body.data.length);

      expect(response.status).toBe(200);
      expect(response.body.data.length > 0).toBeTruthy();
      done();
  });

  it('should create todo', async (done) => {
      await request
        .post('/todo/create').send({
          title: 'asdasd',
          desc: '123123'
        })
        .set('Accept', 'application/json');

        const response = await request
          .get('/todo/list');

        console.log(response.body.data.length);

      expect(response.status).toBe(200);
      expect(response.body.data.length > 2).toBeTruthy();
      done();
  });

  it('should edit todo', async (done) => {
      await request
        .post('/todo/edit').send({
          id: "TASK_90fac17f040315fc718dd0fbcd53",
          title: 'dedede',
          desc: '123123'
        })
        .set('Accept', 'application/json');

        const item = await todoModel.findOne({id: "TASK_90fac17f040315fc718dd0fbcd53"});

      expect(item.title).toBe("dedede");
      done();
  });

  it('should delete todo', async (done) => {
      await request
        .post('/todo/remove').send({
            "id": "TASK_90fac17f040315fc718dd0fbcd53"
        })
        .set('Accept', 'application/json');

        const items = await todoModel.count();

      expect(items).toBe(2);
      done();
  });

});
