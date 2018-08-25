const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    max: 100,
    minlength: 5,
    trim: true
  },
  price: {
    type: Number, 
    required: true
  },
},{ 
  // Adds automatically createdAt and updatedAt
  timestamps: true 
});

ProductSchema.virtual('info').get(function () {
  return this.name + ': $' + this.price;
});
// for call just product.info


// Export the model
module.exports = mongoose.model('Product', ProductSchema);