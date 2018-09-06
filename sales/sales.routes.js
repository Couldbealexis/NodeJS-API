const express = require('express');
const router = express.Router();
const {authenticate, adminAuthenticate} = require('../middleware/authenticate');
const {checkOrder} = require('../middleware/checkOrder');
const querymen = require('querymen');

// Require the controllers
const salesHeader_controller = require('./salesHeader/salesHeader.controller');
const salesDetail_controller = require('./salesDetail/salesDetail.controller')

// Buy products
router.post('/buy', [authenticate, checkOrder], salesHeader_controller.buy);
// Retrieve all the purchases for a user
// router.get('/:user', [authenticate, querymen.middleware()], salesHeader_controller.findForUser);
// // Retrieve all the purchases for all users
// router.get('/', [adminAuthenticate, querymen.middleware()], salesHeader_controller.findAll);
// // Retrieve one purchase
// router.get('/:id', authenticate, salesDetail_controller.findOne);


module.exports = router;