const User = require('./user.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


exports.me = (req, res) => {
  res.send(req.user);
};


exports.login = (req, res) => {
  let body = _.pick(req.body, [ 'email', 'password' ]);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then( (token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch( (e) => {
    res.status(400).send();
  });
};


exports.logout = (req, res) => {
  req.user.removeToken(req.token).then( () => {
    res.status(200).send();
  }).catch( (e) => {
    res.status(404).send();
  });
};


exports.create = function (req, res) {
  let body = _.pick(req.body, [ 'email', 'password', 'type' ]);

  let user = new User(body);

  user.save().then( () => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
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
      message: "Error deleting user with id " + req.params.id
    });
  });

};


exports.patch = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  let body = _.pick(req.body, ['email', 'password']);

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
