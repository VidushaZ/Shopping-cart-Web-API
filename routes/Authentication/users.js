/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../Models/Authentication/user');
const { addUserValidaion } = require('../../Middlewares/Validations/users/user.validation');

const router = express.Router();

// Registering a new User
router.post('/', addUserValidaion, async (req, res) => {
  if (!req.body.name) {
    // return res.status(400).send("Bad Request: Please add avenger name");
  }

  // use this for check password. Because when we bcrypt password size get incresed threfore we canot identify its minmum length or empty password.
  const validatePassword = new User({

    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,

  });

  try {
    await validatePassword.validate();
  } catch (err) {
    for (password in err.errors) {
      console.log(err.errors[password].message);
      return res.status(400).json({
        success: false,
        error: err.errors[password].message,
      });
    }
  }

  // Encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);

  let user = new User({

    userName: req.body.userName,
    email: req.body.email,
    password: hashedPw,
    isAdmin: false,

  });

  try {
    user = await user.save();
    req.body.password;
    return res.status(200).send({
      userName: user.userName,
      email: user.email,
    });
  } catch (err) {
    for (userName in err.errors) {
      console.log(err.errors[userName].message);
      return res.status(400).json({
        success: false,
        error: err.errors[userName].message,
      });
      // return res.status(400).send(err.errors[name].message);
    }
    for (email in err.errors) {
      console.log(err.errors[email].message);
      return res.status(400).json({
        success: false,
        error: err.errors[email].message,
      });
    }
    for (password in err.errors) {
      console.log(err.errors[password].message);
      return res.status(400).json({
        success: false,
        error: err.errors[password].message,
      });
    }
  }
});

// Get user details by user id
router.get('/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const user = await User.findById(requstedID)
      .sort({ name: 'asc' })
      .select({
        userName: 1, email: 1,
      });
    if (!user) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }
    if (user) {
      return res.status(200).send(user);
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

// Edit user details (email, passwords)
router.put('/:id', async (req, res) => {
  const requstedID = req.params.id;
  try {
    const userExit = await User.findById(requstedID)
      .select({
        userName: 1, email: 1,
      });

    if (!userExit) {
      return res
        .status(404)
        .send('Requested  Updated id not found');
    }

    userExit.set({
      userName: req.body.userName,
      email: req.body.email,

    });

    try {
      await userExit.save();

      return res.status(200).send(userExit);
    } catch (err) {
      for (userName in err.errors) {
        console.log(err.errors[userName].message);
        return res.status(400).json({
          success: false,
          error: err.errors[userName].message,
        });
      }
      for (email in err.errors) {
        console.log(err.errors[email].message);
        return res.status(400).json({
          success: false,
          error: err.errors[email].message,
        });
      }
    }
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

module.exports = router;
