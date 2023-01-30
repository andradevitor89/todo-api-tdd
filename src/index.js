const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}]Server is now running on :${port}`
  );
});
