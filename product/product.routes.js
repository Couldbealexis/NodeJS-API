const express = require('express');
const router = express.Router();
const {authenticate, adminAuthenticate} = require('../middleware/authenticate');
const querymen = require('querymen');

// Require the controllers
const product_controller = require('./product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

// Like a product
router.post('/:id/like', authenticate, product_controller.like);
// Create new
router.post('/', adminAuthenticate, product_controller.create);
// Retrieve all
router.get('/', querymen.middleware(), product_controller.findAll);
// Retrieve one
router.get('/:id', product_controller.findOne);
// Update one 
router.put('/:id', adminAuthenticate, product_controller.update);
// Delete one
router.delete('/:id', adminAuthenticate, product_controller.delete);
// Update a field
router.patch('/:id', adminAuthenticate, product_controller.patch);


module.exports = router;