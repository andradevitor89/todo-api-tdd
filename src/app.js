const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');
const todoRoutes = require('./routes/todo.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../swagger.json');
const cors = require('cors');
const errorHandlingMiddleware = require('./middlewares/error-handling.middleware');

mongodb.connect();

const app = express();
app.use(errorHandlingMiddleware);
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/todos', todoRoutes);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition)
);

app.get('/', (request, response) => {
  response.json({ message: 'API is ON!' });
});

module.exports = app;
