const mongoose = require('mongoose');

// Set up mongoose connection
mongoose.Promise = global.Promise;
let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  'mongoose':db
};