const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      res.status(204).send();
    } else {
      res.status(200).json(todo);
    }
  } catch (error) {
    next(error);
  }
};
