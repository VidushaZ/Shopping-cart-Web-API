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
const Service = require('../../Models/Service/service');
const { addProductValidaion } = require('../../Middlewares/Validations/products/product.validation');
require('dotenv').config();

const router = express.Router();
const { SECRET_KEY } = process.env;

// Get all products
router.get('/', async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1,_id: 1, imgUrl: 1, status: 1,
      });
    if (!services) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (services) {
      return res.status(200).send(services);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Get product details by product id
router.get('/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const service = await Service.findById(requstedID)
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, _id: 1, imgUrl: 1, status: 1,
      });
    if (!service) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (service) {
      return res.status(200).send(service);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Check product available or not before adding cart.
router.get('/checkAvailablity/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const service = await Product.findById(requstedID)
      .sort({ name: 'asc' })
      .select({
        name: 1, description: 1, _id: 1, imgUrl: 1, status: 1,
      });

    if (!service) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (service.status == "Not Available") {
      res.status(200).send('outOfStock');
    }
    if (service.isAvailable == "Available") {
      res.status(200).send('inStock');
    }
    if (service.isAvailable == "Buzy") {
        res.status(200).send('buzy');
      }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Updating product details by product id.(ADMIN)
router.put('/:id', async (req, res) => {
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
    const service = await Service.findById(requstedID);

    if (!service) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }

    service.set({
      name: req.body.name,
      description: req.body.description,
      status: req.body.isAvailable,
      imgUrl: req.body.imgUrl,
    });

    try {
      await service.save();

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
    
   
      for (status in err.errors) {
        console.log(err.errors[status].message);
        return res.status(400).json({
          success: false,
          error: err.errors[status].message,
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
    const service = await Service.findById(requstedID);

    if (!service) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    service.set({
      status: req.body.status,

    });

    try {
      await service.save();

      return res.status(200).send(service);
    } catch (err) {
      for (status in err.errors) {
        console.log(err.errors[status].message);
        return res.status(400).json({
          success: false,
          error: err.errors[status].message,
        });
      }
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Posting a new product(ADMIN)
router.post('', async (req, res) => {
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

  let newService = new Service({

    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    imgUrl: req.body.imgUrl,

  });

  try {
    newService = await newService.save();
    return res.status(200).send(newService);
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
    
    for (status in err.errors) {
      console.log(err.errors[status].message);
      return res.status(400).json({
        success: false,
        error: err.errors[status].message,
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
  const service = await Service.findById(requstedID);
  if (!service) {
    return res.status(404).send('Requested  Delete id not found');
  }

  const delService = await service.deleteOne({ requstedID });

  return res.status(200).send(delService);
});

module.exports = router;