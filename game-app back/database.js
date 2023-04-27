const mongoose = require('mongoose');

async function connect() {
  const url = 'mongodb://127.0.0.1:27017/gameData';
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

module.exports = { connect };
