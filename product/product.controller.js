const Product = require('./product.model');
// const User = require('./user.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  console.log(req.query);
  res.send('Greetings from the Test controller!');
};

exports.like = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);
  Product.findOne(id).then(product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    product.likes += 1;
    product.updatedAt = new Date().getTime();
    product.save().then( doc => {
      res.send(product);
    }).catch( err => {
      res.status(400).send({
        message: err.message || `cannot like the product ${id}.`
      });
    });
  }).catch(err => {
    return res.status(400).send({
      message: err.message || "cannot get."
    });
  });
};

exports.create = function (req, res) {
  let product = new Product(
      {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock
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
  let query = req.querymen;
  Product.find(query.query, query.select, query.cursor).then(
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
    price: req.body.price,
    stock: req.body.stock,
    likes: req.body.likes
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
      message: "Error updating product with id " + req.params.id
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
      message: "Error updating product with id " + req.params.id
    });
  });

};


exports.patch = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  let body = _.pick(req.body, ['name', 'price', 'stock', 'likes']);

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
      message: "Error updating product with id " + req.params.id
    });
  });

};