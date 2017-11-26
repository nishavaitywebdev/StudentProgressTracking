const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, { useMongoClient: true });
mongoose.connection;

module.exports = {
  mongoose
};
