const express = require('express');
const bodyParser = require('body-parser');

// Require the db
const mongoose = require('./db');
// Get the routes for the product
const product = require('./product/product.routes');


// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', product);

// When deploy you can get the port where the process is running
// You can also set 3000 for default
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`started at port: ${app.get('port')}`);
});



