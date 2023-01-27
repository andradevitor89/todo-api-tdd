const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'hello world!!' });
});

app.listen(3000, () => {
  console.log('Server is now running');
});
