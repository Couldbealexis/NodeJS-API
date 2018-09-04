const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SalesHeaderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId
  },
  items: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
},{ 
  // Adds automatically createdAt and updatedAt
  timestamps: true 
});


// Export the model
module.exports = mongoose.model('SalesHeader', SalesHeaderSchema);