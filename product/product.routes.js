const express = require('express');
const router = express.Router();

// Require the controllers
const product_controller = require('./product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

// Create new
router.post('/', product_controller.create);
// Retrieve all
router.get('/', product_controller.findAll);
// Retrieve one
router.get('/:id', product_controller.findOne);
// Update one 
router.put('/:id', product_controller.update);
// Delete one
router.delete('/:id', product_controller.delete);
// Update a field
router.patch('/:id', product_controller.patch);


module.exports = router;