const mongoose = require('mongoose');

// Creating an mongoose schema.
const serviceSchema = new mongoose.Schema({

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

imgUrl: {
type: String,
default: 'https://picsum.photos/seed/picsum/200/300',
},

status: {
type: [String],
required: [true, 'status is required'],
// eslint-disable-next-line comma-spacing
enum: ['Available','Not Available','Buzy'],

},

});

// Creating a mongoose model.
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;