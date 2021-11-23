const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name should contain atleast 3 characters'],
    maxlength: [20, 'Name exceeded maximum number of characters'],

  },
  email: {

    type: String,
    required: [true, 'Email  is required'],
    minlength: [10, 'Provide a valid email'],
    maxlength: [40, 'Email Name exceeded maximum number of characters'],
    unique: [true, 'Email doesnt exit or invalid!'],

  },

  password: {
    type: String,
    minlength: [4, 'Password should contain more than 4 charcters'],
    required: [true, 'Password is required'],

  },

  isAdmin: {
    type: Boolean,
  },

});

const user = mongoose.model('User', userSchema);

module.exports = user;
