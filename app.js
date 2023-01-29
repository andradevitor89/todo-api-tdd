const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');
const todoRoutes = require('./routes/todo.routes');
const errorHandlingMiddleware = require('./middlewares/error-handling.middleware');
mongodb.connect();

const app = express();
app.use(express.json());

app.use('/todos', todoRoutes);
app.use(errorHandlingMiddleware);

app.get('/', (request, response) => {
  response.json({ message: 'hello world!!' });
});

module.exports = app;
