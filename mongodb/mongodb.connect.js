const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect(
      'mongodb://todo-api:todotddnode100@localhost:27017/todo-tdd',
      { useNewUrlParser: true }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
