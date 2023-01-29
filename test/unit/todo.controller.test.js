const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

jest.mock('../../model/todo.model');
let req, res, next;
const errorMessage = { message: 'Error Message' };
const rejectedPromise = Promise.reject(errorMessage);

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe(
      'function'
    );
  });
  it('should call TodoModel.create', () => {
    TodoController.createTodo(req, res, next);

    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  it('should return 201 response code', async () => {
    await TodoController.createTodo(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo);

    await TodoController.createTodo(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors', async () => {
    const error = { message: 'Error Message' };
    const rejectedPromise = Promise.reject(error);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});

describe('TodoController.getTodos', () => {
  it('should have a getTodos function', () => {
    expect(typeof TodoController.getTodos).toBe('function');
  });
  it('should call TodoModel.find', async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toBeCalled();
  });
  it('should return 200 and all todos', async () => {
    TodoModel.find.mockReturnValue([newTodo]);

    await TodoController.getTodos(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([newTodo]);
  });
  it('should handle error', async () => {
    const error = { message: 'Error Message' };
    const rejectedPromise = Promise.reject(error);
    TodoModel.find.mockReturnValue(rejectedPromise);

    await TodoController.getTodos(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});

describe('TodoController.getTodoById', () => {
  it('should have a getTodoById function', () => {
    expect(typeof TodoController.getTodoById).toBe(
      'function'
    );
  });
  it('should call TodoModel.findById with route params', async () => {
    const id = '74328943798';
    req = httpMocks.createRequest({ params: { id } });

    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith(id);
  });
  it('should return 200 and todo', async () => {
    const id = '74328943798';

    TodoModel.findById.mockReturnValue(newTodo);
    req = httpMocks.createRequest({ params: { id } });

    await TodoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(TodoModel.findById).toBeCalledWith(
      req.params.id
    );
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should return 204 if todo is not found in database', async () => {
    const id = '74328943798';
    TodoModel.findById.mockReturnValue(null);
    req = httpMocks.createRequest({ params: { id } });

    await TodoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(204);
    expect(TodoModel.findById).toBeCalledWith(
      req.params.id
    );
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should handle error', async () => {
    const id = '74328943798';
    req = httpMocks.createRequest({ params: { id } });
    const error = { message: 'Error Message' };
    const rejectedPromise = Promise.reject(error);
    TodoModel.findById.mockReturnValue(rejectedPromise);

    await TodoController.getTodoById(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});

describe('TodoController.update', () => {
  it('should have a updateTodo function', () => {
    expect(typeof TodoController.updateTodo).toBe(
      'function'
    );
  });
  it('should call TodoModel.findByIdAndUpdate method', () => {
    const id = '74328943798';
    req.params.id = id;
    req.body = newTodo;
    TodoController.updateTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toBeCalledWith(
      id,
      newTodo,
      {
        new: true,
        useFindAndModify: false,
      }
    );
  });
  it('should return updated todo', async () => {
    req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);

    await TodoController.updateTodo(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(
      rejectedPromise
    );

    await TodoController.updateTodo(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
  it('should return 404 if todo doesnt exist', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(null);

    await TodoController.updateTodo(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('TodoController.delete', () => {
  it('should have a delete method', () => {
    expect(typeof TodoController.deleteTodo).toBe(
      'function'
    );
  });
  it('should call TodoModel.findByIdAndDelete method', () => {
    req.params.id = '32142';

    TodoController.deleteTodo(req, res, next);

    expect(TodoModel.findByIdAndDelete).toBeCalledWith(
      req.params.id
    );
  });
  it('should return 200', async () => {
    req.params.id = '32142';
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);

    await TodoController.deleteTodo(req, res, next);

    expect(TodoModel.findByIdAndDelete).toBeCalledWith(
      req.params.id
    );
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors', async () => {
    req.params.id = '32142';
    TodoModel.findByIdAndDelete.mockReturnValue(
      rejectedPromise
    );
    await TodoController.deleteTodo(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
  it('should return 404 when todo is not found', async () => {
    req.params.id = '32142';
    TodoModel.findByIdAndDelete.mockReturnValue(null);

    await TodoController.deleteTodo(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
