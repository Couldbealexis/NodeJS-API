const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

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

// UserSchema.virtual('info').get(function () {
//   return this.name + ': $' + this.price;
// });



// Export the model
module.exports = mongoose.model('User', UserSchema);