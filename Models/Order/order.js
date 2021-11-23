const mongoose = require('mongoose');

// Creating an mongoose schema.
const orderSchema = new mongoose.Schema({

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
    minlength: [4, 'Description should contain atlease 4 characters'],
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
    required: [true, 'Description is required'],
    unique: false,
  },

  orderId: {
    type: String,
    required: [true, 'Description is required'],
    unique: false,
  },
  status: {
    type: String,
    required: [true, 'Description is required'],
    unique: false,
  },

});

// Creating a mongoose model.
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
