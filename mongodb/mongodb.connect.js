const mongoose = require('mongoose');
function connect() {
  try {
    mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
