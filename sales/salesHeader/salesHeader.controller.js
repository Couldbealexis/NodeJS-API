const Header = require('./salesHeader.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


exports.buy = function (req, res) {
  // let header = new Header({
  //   customer: req.user._id
  // });
  let body = _.pick(req.body, ['products']);

  console.log(body);

  res.send(200);

};

