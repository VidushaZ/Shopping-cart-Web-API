/* eslint-disable quotes */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');

const app = express();
app.use(helmet());

const morgan = require('morgan');
const rt = require('file-stream-rotator');
const products = require('./routes/Product/products');
const home = require('./routes/Home/home');
const users = require('./routes/Authentication/users');
const auth = require('./routes/Authentication/auth');
const carts = require('./routes/Cart/carts');
const orders = require('./routes/Order/orders');
const services = require('./routes/Service/services');
require('dotenv').config();

const port = process.env.PORT;
const host = process.env.HOST;
const { MONGO_URL } = process.env;

// Generating Logs middleware and Saving logs into seperate folders and rotate logs daily.
const fileWriter = rt.getStream({ filename: 'Middlewares/Logs/Error logs/errors.log', frequency: 'daily', verbose: true });
const successWriter = rt.getStream({ filename: 'Middlewares/Logs/Success logs/success.log', frequency: 'daily', verbose: true });

// Seperating success and error requests using response status code.
const skipSuccess = (req, res) => res.statusCode < 400; const skipError = (req, res) => res.statusCode >= 400;

// error logging
app.use(morgan('combined', {
  skip: skipSuccess,
  stream: fileWriter,
}));

// success logging
app.use(morgan('combined', {
  skip: skipError,
  stream: successWriter,
}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  /*
  Local Mongo DB connection code
  mongoose
  .connect(`mongodb://localhost/productsDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  */

  .then(() => console.log('Connected to db successfully ...'.green))
  .catch((err) => console.log('Error has occured while connecting to db'.red, err));

app.use(cors());
app.use(express.json());

// Declaring routes
app.use(home);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/carts/', carts);
app.use('/api/orders/', orders);
app.use('/api/products', products);
app.use('/api/services/', services);

// Declaring listning port.
module.exports = app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
