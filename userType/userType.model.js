const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserTypeSchema = new Schema({
  description:{
    type: String,
    required: true,
    trim: true,
    minlength:2,
    unique: true
  },
  active: {
    type: Boolean,
    default: true,
    require: true,
    minlength: 6
  },
  _user:{
    type: mongoose.Schema.Types.ObjectId
  }
},{
  timestamps: true 
});


// Export the model
module.exports = mongoose.model('UserType', UserTypeSchema);