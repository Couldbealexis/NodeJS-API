const Header = require('./salesHeader.model');
const Detail = require('../salesDetail/salesDetail.model');
const Product = require('../../product/product.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const mongoose = require('mongoose');


exports.buy = function (req, res) {
  let body = _.pick(req.body, ['products']);
  let products = req.products;
  let order = body.products;

  let header = new Header({
    customer: req.user._id
  });
  header.save().then( (h) => {
    let total = 0;
    let items = 0;
    let promises = order.map( (od, index) => {
      let detail = new Detail({
        header: header._id,
        product: products[index]._id,
        quantity: od.quantity,
        unitPrice: products[index].price,
        fullPrice: products[index].price * od.quantity
      });
      detail.save();
      total += products[index].price * od.quantity;
      items += Number(od.quantity);
    });

    total = total.toFixed(2);
    Promise.all(promises).then( () => {
      
      Header.findOneAndUpdate( header._id, {
        total: total,
        items: items,
        updatedAt: new Date().getTime()
      }, {new: true}).then( head => {

        res.send(head);
      }).catch( err => {
        console.log(err);
        if(err.kind === 'ObjectId') {
          return res.sendStatus(404);            
        }
        return res.sendStatus(500);
      });
    }).catch( e => res.sendStatus(500) );
  }).catch( e => res.status(500).send(e.message) );
};

