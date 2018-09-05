const User = require('../user/user.model');
const Product = require('../product/product.model')


let checkOrder = (req, res, next) => {
  let body = _.pick(req.body, ['products']);
  Product.find({
    _id: { $in: [
      body.products
    ]
    }
  })
}


let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};


module.exports = {checkOrder};
