const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/todo.routes.js'];

swaggerAutogen(outputFile, endpointsFiles);
