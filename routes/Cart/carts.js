/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const express = require('express');

const router = express.Router();
const Cart = require('../../Models/Cart/cart');
require('dotenv').config();

// Adding a new Cart item
router.post('/', async (req, res) => {
  let cartProduct = new Cart({

    userId: req.body.userId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    imgUrl: req.body.imgUrl,
    description: req.body.description,

  });

  try {
    cartProduct = await cartProduct.save();
    return res.status(200).send(cartProduct);
  } catch (err) {
    for (name in err.errors) {
      console.log(err.errors[name].message);
      return res.status(400).json({
        success: false,
        error: err.errors[name].message,
      });
      // return res.status(400).send(err.errors[name].message);
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
    for (description in err.errors) {
      console.log(err.errors[description].message);
      return res.status(400).json({
        success: false,
        error: err.errors[description].message,
      });
    }
    for (imgUrl in err.errors) {
      console.log(err.errors[imgUrl].message);
      return res.status(400).json({
        success: false,
        error: err.errors[imgUrl].message,
      });
    }
  }
});

// Filtering cart item according to userId
router.post('/myCart', async (req, res) => {
  try {
    const product = await Cart.find({ userId: req.body.userId })
      .sort({ name: 'asc' })
      .select({
        name: 1, price: 1, _id: 1, imgUrl: 1, category: 1, description: 1,
      });
    return res.status(200).send(product);
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Deleting cart item
router.delete('/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const product = await Cart.find({ _id: requstedID });
    if (!product) {
      return res.status(404).send('Requested  Delete id not found');
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }

  const delProductCart = await Cart.deleteOne({ _id: requstedID });

  return res.status(200).send(delProductCart);
});

module.exports = router;
