/* eslint-disable consistent-return */
/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable indent */
const express = require('express');

const router = express.Router();
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');
const Order = require('../../Models/Order/order');
const Cart = require('../../Models/Cart/cart');
require('dotenv').config();

const { SECRET_KEY } = process.env;
const array1 = [];

// Posting a new Order
router.post('/', async (req, res) => {
    try {
        const uniqueOrderId = uniqid();
        const productsCart = await Cart.find({ userId: req.body.userId })
        .sort({ name: 'asc' })
        .select({
        name: 1, price: 1, _id: 1, imgUrl: 1, category: 1, userId: 1, description: 1,
        });

      productsCart.forEach((order) => {
        // eslint-disable-next-line prefer-const
        let newOrder = new Order({

            userId: order.userId,
            name: order.name,
            category: order.category,
            price: order.price,
            description: order.description,
            imgUrl: order.imgUrl,
            orderId: uniqueOrderId,
            status: 'Pending',
          });

          newOrder = newOrder.save();
    });

    // deleting cart items after placing order
    const delOrder = await Cart.deleteMany({ userId: req.body.userId });
        return res.status(200).send(productsCart);
    } catch (ex) {
      return res.status(500).send('Error:', ex.message);
    }
  });

  // eslint-disable-next-line consistent-return

  // Getting all  the orders(Admin)
  router.get('/', async (req, res) => {
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

    try {
    const orderProducts = await Order.find().distinct('orderId');
    if (!orderProducts) {
      return res
        .status(404)
        .send('Requested  orders not found');
    }
    if (orderProducts) {
      return res.status(200).send(orderProducts);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
  });

  // Get all user orders by userId
  router.get('/:userId', async (req, res) => {
    const requstedID = req.params.userId;
    try {
    const orders = await Order.find({ userId: requstedID }).distinct('orderId');
    if (!orders) {
      return res
        .status(404)
        .send('No current orders available');
    }
    if (orders) {
      return res.status(200).send(orders);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
  });

  // eslint-disable-next-line consistent-return
  // Get order details by order id(ADMIN)
  router.get('/all/:orderId', async (req, res) => {
    const requstedID = req.params.orderId;
    try {
    const orderProducts = await Order.find({ orderId: requstedID });
    if (!orderProducts) {
      return res
        .status(404)
        .send('Requested  order id not found');
    }
    if (orderProducts) {
      return res.status(200).send(orderProducts);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
  });

  // Find order status of order id by order id(ADMIN)
  router.get('/status/:orderId', async (req, res) => {
    const requstedID = req.params.orderId;
    try {
    const orderProducts = await Order.findOne({ orderId: requstedID })
    .select({
      status: 1,
    });
    if (!orderProducts) {
      return res
        .status(404)
        .send('Requested  order id not found');
    }
    if (orderProducts) {
      return res.status(200).send(orderProducts);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
  });

   // Get order details by order id of user(USER)
   router.get('/user/:orderId', async (req, res) => {
    const requstedID = req.params.orderId;
    try {
    const orderProducts = await Order.find({ orderId: requstedID });
    if (!orderProducts) {
      return res
        .status(404)
        .send('Requested  order id not found');
    }
    if (orderProducts) {
      return res.status(200).send(orderProducts);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
  });

  // eslint-disable-next-line consistent-return
  // deleting an order(Admin)
  router.delete('/:orderId', async (req, res) => {
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
   const requstedID = req.params.orderId;
    const finishOrder = await Order.find({ orderId: requstedID });
    if (!finishOrder) {
      return res
        .status(404)
        .send('Requested  order id not found');
    }
    if (finishOrder) {
      const delOrder = await Order.deleteMany({ orderId: requstedID });
      return res.status(200).send(delOrder);
    }
  });

  // Changing order status(pending,prepared,delivered)
  router.put('/:orderId', async (req, res) => {
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
    const requstedID = req.params.orderId;
    try {
    const orderProducts = await Order.find({ orderId: requstedID });

    if (!orderProducts) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    orderProducts.forEach(async (order) => {
      // eslint-disable-next-line prefer-const

      order.set({

          status: req.body.status,

        });

        try {
          // eslint-disable-next-line no-param-reassign
         await order.save();

           res.status(200).send(orderProducts);
        } catch (err) {
          for (status in err.errors) {
            console.log(err.errors[status].message);
            return res.status(400).json({
              success: false,
              error: err.errors[status].message,
            });
            // return res.status(400).send(err.errors[status].message);
          }
        }
  });
} catch (ex) {
  return res.status(500).send('Error:', ex.message);
}
  });
  module.exports = router;
