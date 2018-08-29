const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new Schema({
  
  email:{
    type: String,
    required: true,
    trim: true,
    minlength:5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      require: true
    }
  }]
},{
  timestamps: true 
});

// Override method toJSON - Sends back what you want and not all the model.
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Create a new method in order to create tokens
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret123').toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then( () => {
    return token;
  });
};

// Create a search method used in the schema 
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'secret123');
  } catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};


// Export the model
module.exports = mongoose.model('User', UserSchema);