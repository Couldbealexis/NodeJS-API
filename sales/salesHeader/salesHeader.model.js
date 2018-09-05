const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../../product/product.model');

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

SalesHeaderSchema.statics.checkOrder = function(orderArray){
  body.products.forEach(element => (product) => {
    Product.findOne({
      '_id': product.product
    }).then( p => {
      console.log(p);
      if(!p){
        return Promise.reject();
      }
      if(p.stock < product.quantity){
        return Promise.reject();
      }
    }).catch( (e) => { 
      return Promise.reject();
    });
  });
};

// Export the model
module.exports = mongoose.model('SalesHeader', SalesHeaderSchema);