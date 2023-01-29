const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const endpointUrl = '/todos/';
describe(endpointUrl, () => {
  it('POST' + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it('should return error 500 on malformed data with POST', async () => {
    const malformedPayload = newTodo;
    malformedPayload.done = null;
    const response = await request(app)
      .post(endpointUrl)
      .send(malformedPayload);
    expect(response.statusCode).toBe(500);
    expect(response.body.message?.toLowerCase()).toContain(
      'todo validation failed'
    );
  });
});
describe(endpointUrl, () => {
  it('GET' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
