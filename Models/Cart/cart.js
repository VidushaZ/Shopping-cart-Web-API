const mongoose = require('mongoose');

// Creating an mongoose schema.
const cartSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name should contain atleast 3 characters'],
    maxlength: [20, 'Name exceeded maximum number of characters'],
    unique: [false],

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
    enum: ['Child Care', 'Adult Care', 'Covid Care', 'Other'],

  },
  price: Number,

  imgUrl: {
    type: String,
    default: 'https://picsum.photos/seed/picsum/200/300',
  },

  userId: {
    type: String,
    required: [true, 'User id is required'],
    unique: false,
  },

});

// Creating a mongoose model.
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
