const User = require('./user.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash')


exports.create = function (req, res) {
  let body = _.pick(req.body, [ 'email', 'password' ]);

  let user = new User(body);

  user.save().then( doc => {
    res.send(user);
  }).catch( err => {
    res.status(400).send({
      message: err.message || "cannot save."
    });
  });
};


exports.findAll = (req, res) => {
  User.find({}).then(
    users => {
      res.send({users});
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
  
  User.findOne(id).then(user => {
    if(!user){
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });
    }
    res.send(user);
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
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price 
  }, {new:true}).then( user => {
    if(!user){
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });
    }
    res.send(user);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.id
    });
  });
};


exports.delete = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  User.findByIdAndRemove(req.params.id)
  .then( user => {
    if(!user){
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });
    }
    res.send({ message: `User deleted` });
  }).catch( err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.id
    });
  });

};


exports.patch = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  let body = _.pick(req.body, ['name', 'price']);

  body.updatedAt = new Date().getTime();

  User.findByIdAndUpdate(req.params.id, {
    $set: body 
  }, {new:true}).then( user => {
    if(!user){
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });
    }
    res.send(user);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. User with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.id
    });
  });

};