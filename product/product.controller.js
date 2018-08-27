const Product = require('./product.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
  let product = new Product(
      {
          name: req.body.name,
          price: req.body.price
      }
  );

  product.save().then( doc => {
    res.send(product);
  }).catch( err => {
    res.status(400).send({
      message: err.message || "cannot save."
    });
  });
};


exports.findAll = (req, res) => {
  Product.find({}).then(
    products => {
      res.send({products});
    }).catch(err => {
      res.status(400).send({
        message: err.message || "cannot retrive."
      });
    });
};


exports.findOne = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);
  
  Product.findOne(id).then(product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    res.send(product);
  }).catch(err => {
    return res.status(400).send({
      message: err.message || "cannot get."
    });
  });
};


exports.update = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);
  Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price 
  }, {new:true}).then( product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    res.send(product);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating note with id " + req.params.id
    });
  });
};


exports.delete = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  Product.findByIdAndRemove(req.params.id)
  .then( product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    res.send({ message: `Product deleted` });
  }).catch( err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating note with id " + req.params.id
    });
  });

};


exports.patch = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  let body = _.pick(req.body, ['name', 'price']);

  body.updatedAt = new Date().getTime();

  Product.findByIdAndUpdate(req.params.id, {
    $set: body 
  }, {new:true}).then( product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    res.send(product);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating note with id " + req.params.id
    });
  });

};