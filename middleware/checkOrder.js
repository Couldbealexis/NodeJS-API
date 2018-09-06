const Product = require('../product/product.model')
const _ = require('lodash');


let checkOrder = (req, res, next) => {

  let body = _.pick(req.body, ['products']);
  const IDs = body.products.map(e => e.product);

  Product.find({
    '_id' : { $in: IDs }
  }).then( (docs) => {
    if(docs.length == IDs.length){
      let elements = body.products.map( (product, index) => {
        if(product.quantity <= docs[index].stock ){
          return true;
        }else{
          return false;
        }
      });
      if( !elements.includes(false) ){
        req.products = docs;
        req.order = body.products;
        next();
      }else{
        res.status(400).send('not enough stock');
      }
    }else{
      res.status(400).send('invalid products');
    }
  }).catch( (e) => {
    res.status(400).send(e.message);
  });

};


module.exports = {checkOrder};
