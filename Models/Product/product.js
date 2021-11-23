const mongoose = require('mongoose');

// Creating an mongoose schema.
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
    minlength: [10, 'Description should contain atlease 4 characters'],
    maxlength: [200, 'Description exceeded maximum number of characters'],

  },

  category: {
    type: [String],
    required: [true, 'category is required'],
    // eslint-disable-next-line comma-spacing
    enum: ['Child Care','Adult Care','Covid Care','AC', 'Lights','Other'],

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

// Creating a mongoose model.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
