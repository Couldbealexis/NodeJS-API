const mongoose = require('mongoose');

// Set up mongoose connection
mongoose.Promise = global.Promise;
let dev_db_url = 'mongodb://admin:admin1234@ds133202.mlab.com:33202/ecommerce';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  'mongoose':db
};