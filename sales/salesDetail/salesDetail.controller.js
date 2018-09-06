const Detail = require('./salesDetail.model');
// const Detail = require('../salesDetail/salesDetail.model');
// const Product = require('../../product/product.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const mongoose = require('mongoose');


exports.findOne = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);
  
  Detail.find({header: id}).then(details => {
    if(!details){
      return res.status(404).send({
        message: `Not found purchase with id: ${id}`
      });
    }
    res.send(details);
  }).catch(err => {
    return res.status(400).send({
      message: err.message || "cannot get."
    });
  });
};