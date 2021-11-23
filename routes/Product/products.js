/* eslint-disable eqeqeq */
/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const parseJson = require('parse-json');
const Product = require('../../Models/Product/product');
const { addProductValidaion } = require('../../Middlewares/Validations/products/product.validation');
require('dotenv').config();

const router = express.Router();
const { SECRET_KEY } = process.env;

// Get all products admin
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, price: 1, _id: 1, imgUrl: 1, isAvailable: 1, category: 1,
      });
    if (!products) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (products) {
      return res.status(200).send(products);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Get all available products (USER)
router.get('/available/', async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, price: 1, _id: 1, imgUrl: 1, isAvailable: 1, category: 1,
      });
    if (!products) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (products) {
      return res.status(200).send(products);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Get product details by product id
router.get('/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const product = await Product.findById(requstedID)
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, price: 1, _id: 1, imgUrl: 1, isAvailable: 1, category: 1,
      });
    if (!product) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (product) {
      return res.status(200).send(product);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Check product available or not before adding cart.
router.get('/checkAvailablity/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const product = await Product.findById(requstedID)
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, price: 1, _id: 1, imgUrl: 1, isAvailable: 1, category: 1,
      });

    if (!product) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (product.isAvailable == false) {
      res.status(200).send('outOfStock');
    }
    if (product.isAvailable == true) {
      res.status(200).send('inStock');
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Updating product details by product id.(ADMIN)
router.put('/:id', addProductValidaion, async (req, res) => {
  const token = req.header('token');

  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded) {
    return res.status(401).send('Access denied. No token');
  }

  if (!decoded.isAdmin) {
    return res.status(403).send('Forbidden - No authorization');
  }

  const requstedID = req.params.id;
  try {
    const product = await Product.findById(requstedID);

    if (!product) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }

    product.set({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      isAvailable: req.body.isAvailable,
      imgUrl: req.body.imgUrl,
    });

    try {
      await product.save();

      return res.status(200).send(product);
    } catch (err) {
      for (name in err.errors) {
        console.log(err.errors[name].message);
        return res.status(400).json({
          success: false,
          error: err.errors[name].message,
        });
      // return res.status(400).send(err.errors[name].message);
      }
      for (description in err.errors) {
        console.log(err.errors[description].message);
        return res.status(400).json({
          success: false,
          error: err.errors[description].message,
        });
      }
      for (category in err.errors) {
        console.log(err.errors[category].message);
        return res.status(400).json({
          success: false,
          error: err.errors[category].message,
        });
      }
      for (price in err.errors) {
        console.log(err.errors[price].message);
        return res.status(400).json({
          success: false,
          error: err.errors[price].message,
        });
      }
      for (isAvailable in err.errors) {
        console.log(err.errors[isAvailable].message);
        return res.status(400).json({
          success: false,
          error: err.errors[isAvailable].message,
        });
      }
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Updating product availability by product id.(ADMIN)
router.put('/availablity/:id', async (req, res) => {
  const token = req.header('token');

  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded) {
    return res.status(401).send('Access denied. No token');
  }

  if (!decoded.isAdmin) {
    return res.status(403).send('Forbidden - No authorization');
  }

  const requstedID = req.params.id;
  try {
    const product = await Product.findById(requstedID);

    if (!product) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    product.set({
      isAvailable: req.body.isAvailable,

    });

    try {
      await product.save();

      return res.status(200).send(product);
    } catch (err) {
      for (isAvailable in err.errors) {
        console.log(err.errors[isAvailable].message);
        return res.status(400).json({
          success: false,
          error: err.errors[isAvailable].message,
        });
      }
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Posting a new product(ADMIN)
router.post('/', addProductValidaion, async (req, res) => {
  if (!req.body) {
    // return res.status(400).send("Bad Request: Please add avenger name");
  }
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded.isAdmin) {
    return res.status(403).send('Forbidden - No authorization');
  }

  let newProduct = new Product({

    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
    imgUrl: req.body.imgUrl,

  });

  try {
    newProduct = await newProduct.save();
    return res.status(200).send(newProduct);
  } catch (err) {
    for (name in err.errors) {
      console.log(err.errors[name].message);
      return res.status(400).json({
        success: false,
        error: err.errors[name].message,
      });
      // return res.status(400).send(err.errors[name].message);
    }
    for (description in err.errors) {
      console.log(err.errors[description].message);
      return res.status(400).json({
        success: false,
        error: err.errors[description].message,
      });
    }
    for (category in err.errors) {
      console.log(err.errors[category].message);
      return res.status(400).json({
        success: false,
        error: err.errors[category].message,
      });
    }
    for (price in err.errors) {
      console.log(err.errors[price].message);
      return res.status(400).json({
        success: false,
        error: err.errors[price].message,
      });
    }
    for (isAvailable in err.errors) {
      console.log(err.errors[isAvailable].message);
      return res.status(400).json({
        success: false,
        error: err.errors[isAvailable].message,
      });
    }
  }
});

// Deleting a product(ADMIN)
router.delete('/:id', async (req, res) => {
  const token = req.header('token');

  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded) {
    return res.status(401).send('Access denied. No token');
  }

  if (!decoded.isAdmin) {
    return res.status(403).send('Forbidden - No authorization');
  }

  const requstedID = req.params.id;
  const product = await Product.findById(requstedID);
  if (!product) {
    return res.status(404).send('Requested  Delete id not found');
  }

  const delProduct = await product.deleteOne({ requstedID });

  return res.status(200).send(delProduct);
});

module.exports = router;
