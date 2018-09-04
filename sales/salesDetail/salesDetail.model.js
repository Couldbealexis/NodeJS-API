const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SalesDetailSchema = new Schema({
  header: {
    type: mongoose.Schema.Types.ObjectId
  },
  product: {
    type: mongoose.Schema.Types.ObjectId
  },
  quantity: {
    type: Number, 
    required: true
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 0
  },
  fullPrice: {
    type: Number,
    required: true,
    default: 0
  }
},{ 
  // Adds automatically createdAt and updatedAt
  timestamps: true 
});


// Export the model
module.exports = mongoose.model('SalesDetail', SalesDetailSchema);