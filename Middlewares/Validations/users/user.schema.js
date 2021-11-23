/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
const joi = require('@hapi/joi');

// Declaring schema to validate User registration process.
const schema = {
  user: joi.object({

    userName: joi
      .string()
      .min(3)
      .max(20)
      .required()
      .messages({
        'string.base': 'User name should be a type of \'text\'',
        'string.empty': 'User name cannot be an empty field',
        'string.min': 'User name  should have a minimum length of {#limit}. Please enter again!',
        'string.max': 'User name should have a minimum length of {#limit}. Please enter again!',
        'any.required': 'User name is a required field',
      }),

    password: joi
      .string()
      .min(8)
      .max(20)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/).message('Make sure your password contain atleast 1 Uppercase letter, Special character and a number')
      .required()
      .messages({
        'string.base': 'Password should be a type of \'text\'',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password  should have a minimum length of {#limit}. Please enter again!',
        'string.max': 'Password should have a minimum length of {#limit}. Please enter again!',
        'any.required': 'Password is a required field',
      }),

    email: joi
      .string()
      .required()
      .regex(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/).message('Please enter a valid email address')
      .messages({
        'string.base': 'Email should be a type of \'text\'',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
      }),

  }),
};

module.exports = schema;
