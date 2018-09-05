const Header = require('./salesHeader.model');
const Product = require('../../product/product.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const mongoose = require('mongoose');

function checkOrder(order){
  OrderArr = order.map( (product) => {
    Product.findOne({
      '_id': product.product
    }).then( p => {
      if(!p){
        return false;
      }
      if(p.stock < product.quantity){
        return false;
      }
      return true;
    }).catch( (e) => { 
      return false;
    });
  })

  console.log(OrderArr);
  
};

exports.buy = function (req, res) {
  // let header = new Header({
  //   customer: req.user._id
  // });
  let body = _.pick(req.body, ['products']);
  
  const IDs = body.products.map(e => e.product);
  

  Product.find({
    '_id' : { $in: IDs }
  }).then( docs => console.log(docs)).catch(e => console.log(e));
  

  return res.sendStatus(200);

};

