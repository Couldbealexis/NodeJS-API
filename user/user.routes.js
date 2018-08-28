const express = require('express');
const router = express.Router();

const user_controller = require('./user.controller');

// Create new
router.post('/', user_controller.create);
// Retrieve all
router.get('/', user_controller.findAll);
// Retrieve one
router.get('/:id', user_controller.findOne);
// Update one 
router.put('/:id', user_controller.update);
// Delete one
router.delete('/:id', user_controller.delete);
// Update a field
router.patch('/:id', user_controller.patch);


module.exports = router;