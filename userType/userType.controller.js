const UserType = require('./userType.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


exports.create = function (req, res) {
  let userType = new UserType(
      {
        description: req.body.description,
        _user: req.user._id
      }
  );

  userType.save().then( doc => {
    res.send(userType);
  }).catch( err => {
    res.status(400).send({
      message: err.message || "cannot save."
    });
  });
};


exports.findAll = (req, res) => {
  UserType.find({}).then(
    userType => {
      res.send({userType});
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
  
  UserType.findOne(id).then(userType => {
    if(!userType){
      return res.status(404).send({
        message: `Not found. UserType with id ${id}`
      });
    }
    res.send(userType);
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
  UserType.findByIdAndUpdate(req.params.id, {
    description: req.body.description,
    active: req.body.active,
    _user: req.user._id
  }, {new:true}).then( userType => {
    if(!userType){
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });
    }
    res.send(userType);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error updating userType with id " + req.params.id
    });
  });
};


exports.delete = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  UserType.findByIdAndUpdate(req.params.id, {
    active: false,
    _user: req.user._id
  }, {new:true}).then( userType => {
    if(!userType){
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });
    }
    res.send(userType);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });                
    }
    return res.status(500).send({
      message: "Error deleting userType with id " + req.params.id
    });
  });

};


exports.patch = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send();

  let id = new ObjectID(req.params.id);

  let body = _.pick(req.body, ['description', 'active']);

  body.updatedAt = new Date().getTime();

  UserType.findByIdAndUpdate(req.params.id, {
    $set: body 
  }, {new:true}).then( userType => {
    if(!userType){
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });
    }
    res.send(userType);
  }).catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Not found. userType with id ${id}`
      });                
    }
    return res.status(500).send({
      message: `Error updating userType with id ${id}`
    });
  });

};

