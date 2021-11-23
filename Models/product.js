const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name should contain atleast 3 characters'],
    maxlength: [20, 'Name exceeded maximum number of characters'],
    unique: [true, 'Name should be unique'],

  },
  description: {

    type: String,
    required: [true, 'Description is required'],
    minlength: [4, 'Description should contain atlease 4 characters'],
    maxlength: [20, 'Description exceeded maximum number of characters'],

  },

  category: {
    type: [String],
    required: [true, 'category is required'],
    enum: ['Child Care', 'Adult Care', 'Covid Care', 'Other'],

  },
  price: Number,

  imgUrl: {
    type: String,
    default: 'https://picsum.photos/seed/picsum/200/300',
  },

  isAvailable: {
    type: Boolean,
    required: [true, 'Available status required'],

  },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
