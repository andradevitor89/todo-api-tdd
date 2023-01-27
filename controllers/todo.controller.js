const TodoModel = require('../model/todo.model');

exports.createTodo = (req, res, next) => {
  console.log('req:', req.body);
  const todo = TodoModel.create(req.body);
  res.status(201).json(todo);
};
