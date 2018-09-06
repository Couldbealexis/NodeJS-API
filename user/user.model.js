const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  type: {
    type: mongoose.Schema.Types.ObjectId
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


// Hashing pass before save
UserSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});


// Override method toJSON - Sends back what you want and not all the model.
UserSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};


// Create a new method in order to create tokens
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then( () => {
    return token;
  });
};


// Instance method in order to delete tokens
UserSchema.methods.removeToken = function( token ) {
  let user = this;
  return user.update({
    $pull: {
      tokens:{token}
    }
  });
  
};


// Create a search method used in the schema 
UserSchema.statics.findByToken = function(token){
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


// Create a search method in the schema
UserSchema.statics.findByCredentials = function(email, passwd){
  let User = this;
  return User.findOne({email}).then( (user)=> {
    if (!user){
      return Promise.reject();
    }
    
    return new Promise( (resolve, reject) =>{
      bcrypt.compare(passwd, user.password, (err, res) => {
        if(res){
          resolve(user);
        } else{
          reject();
        }
      });
    });
  });
};


// Export the model
module.exports = mongoose.model('User', UserSchema);