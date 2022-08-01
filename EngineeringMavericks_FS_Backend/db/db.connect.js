const mongoose = require('mongoose');
// TODO: move to .env/sec
// TODO: use async await instead of then/catch
function initializeDBConnection() {
  // Connecting to DB
  mongoose
    .connect(process.env['REACT_APP_MONGOOSE_CONNECTION'], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('Mongo DB successfully connected'))
    .catch((error) => console.error('mongoose connection failed...', error));
}

module.exports = { initializeDBConnection };
