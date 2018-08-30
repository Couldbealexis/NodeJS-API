const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authenticate');

const user_controller = require('./user.controller');

// Private route - Profile
router.get('/me', authenticate, user_controller.me);
// Login
router.post('/login', user_controller.login);
// Logout
router.delete('/logout', authenticate, user_controller.logout);
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