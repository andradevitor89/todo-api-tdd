const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');
const app = express();
mongodb.connect();
app.use(express.json());
const todoRoutes = require('./routes/todo.routes');

app.get('/', (request, response) => {
  response.json({ message: 'hello world!!' });
});

app.use('/todos', todoRoutes);

module.exports = app;
