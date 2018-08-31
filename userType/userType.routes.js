const express = require('express');
const router = express.Router();
const {adminAuthenticate} = require('../middleware/authenticate');

// Require the controllers
const userType_controller = require('./userType.controller');



// Create new
router.post('/', adminAuthenticate, userType_controller.create);
// Retrieve all
router.get('/', adminAuthenticate, userType_controller.findAll);
// Retrieve one
router.get('/:id', adminAuthenticate, userType_controller.findOne);
// Update one 
router.put('/:id', adminAuthenticate, userType_controller.update);
// Delete one
router.delete('/:id', adminAuthenticate, userType_controller.delete);
// Update a field
router.patch('/:id', adminAuthenticate, userType_controller.patch);


module.exports = router;