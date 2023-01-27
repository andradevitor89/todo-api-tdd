const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const todoRoutes = require('./routes/todo.routes');

app.get('/', (request, response) => {
  response.json({ message: 'hello world!!' });
});

app.use('/todos', todoRoutes);

app.listen(3000, () => {
  console.log('Server is now running');
});

module.exports = app;
