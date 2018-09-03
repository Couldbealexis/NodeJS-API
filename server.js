const express = require('express');
const bodyParser = require('body-parser');
const cors          = require('cors');

// Require the db
const mongoose = require('./db');
// Get the routes
const product = require('./product/product.routes');
const user = require('./user/user.routes');
const userType = require('./userType/userType.routes')

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// CORS
app.use(cors());

app.use('/products', product);
app.use('/users', user);
app.use('/admin/userType', userType);

// When deploy you can get the port where the process is running
// You can also set 3000 for default
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`started at port: ${app.get('port')}`);
});



