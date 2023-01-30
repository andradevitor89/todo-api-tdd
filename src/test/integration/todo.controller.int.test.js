const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const endpointUrl = '/todos/';

describe('POST ' + endpointUrl, () => {
  it('should return success', async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it('should return error 500 on malformed data', async () => {
    const malformedPayload = { ...newTodo, done: null };
    const response = await request(app)
      .post(endpointUrl)
      .send(malformedPayload);
    expect(response.statusCode).toBe(500);
    expect(response.body.message?.toLowerCase()).toContain(
      'todo validation failed'
    );
  });
});

describe('GET ' + endpointUrl, () => {
  it('should return success with array of todos', async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
  });
});

describe('GET ' + endpointUrl + ':id', () => {
  it('should return success', async () => {
    const newCreatedTodo = await createMockTodo();
    const response = await request(app).get(
      endpointUrl + newCreatedTodo._id
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(newCreatedTodo.title);
    expect(response.body.done).toBe(newCreatedTodo.done);
  });
  it('should return 204 when id is not found', async () => {
    const response = await request(app).get(
      endpointUrl + '63d677711d50c82dc7a9794A'
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('PUT ' + endpointUrl + ':id', () => {
  it('should return success', async () => {
    const newCreatedTodo = await createMockTodo();
    const payload = {
      title: 'New name',
      done: true,
    };
    const response = await request(app)
      .put(endpointUrl + newCreatedTodo._id)
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(payload.title);
    expect(response.body.done).toBe(payload.done);
  });
  it('should return 404 when id is not found', async () => {
    const payload = {
      title: 'New name',
      done: false,
    };

    const response = await request(app)
      .put(endpointUrl + '63d677711d50c82dc7a9794A')
      .send(payload);

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE ' + endpointUrl + ':id', () => {
  it('should return 200 with deleted todo', async () => {
    const newCreatedTodo = await createMockTodo();

    const response = await request(app).delete(
      endpointUrl + newCreatedTodo._id
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(newCreatedTodo.title);
    expect(response.body.done).toBe(newCreatedTodo.done);
  });
  it('should return 404 when todo is not found', async () => {
    const response = await request(app).delete(
      endpointUrl + '63d677711d50c82dc7a9794A'
    );

    expect(response.statusCode).toBe(404);
  });
});

async function createMockTodo() {
  const response = await request(app)
    .post(endpointUrl)
    .send(newTodo);
  return response.body;
}
