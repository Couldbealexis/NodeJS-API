const Product = require('./product.model');
const {ObjectID} = require('mongodb');

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
  let id = new ObjectID(req.params.id);
  Product.findOne(id).then(product => {
    if(!product){
      return res.status(404).send({
        message: `Not found. Product with id ${id}`
      });
    }
    res.send(product);
  }).catch(err => {
    res.status(400).send({
      message: err.message || "cannot get."
    });
  });
};


exports.update = (req, res) => {

};


exports.delete = (req, res) => {

};

