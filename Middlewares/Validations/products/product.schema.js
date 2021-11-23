/* eslint-disable newline-per-chained-call */
const joi = require('@hapi/joi');

// defining a schema to validate product post and put methods.
const schema = {
  product: joi.object({

    name: joi
      .string()
      .min(3)
      .max(20)
      .required()
      .messages({
        'string.base': 'Product name should be a type of \'text\'',
        'string.empty': 'Product name cannot be an empty field',
        'string.min': 'Product name  should have a minimum length of {#limit}. Please enter again!',
        'string.max': 'Product name exceed maximum length of {#limit}. Please enter again!',
        'any.required': 'Product name is a required field',
      }),

    description: joi
      .string()
      .min(10)
      .max(200)
      .required()
      .messages({
        'string.base': 'Description should be a type of \'text\'',
        'string.empty': 'Description cannot be an empty field',
        'string.min': 'Description  should have a minimum length of {#limit}. Please enter again!',
        'string.max': 'Description exceed maximum length of {#limit}. Please enter again!',
        'any.required': 'Description is a required field',
      }),

    category: joi
      .string()
      .required()
      .messages({
        'string.base': 'Category should be a type of \'text\'',
        'string.empty': 'Category cannot be an empty field',
        'any.required': 'Category is a required field',
      }),

    isAvailable: joi
      .boolean()
      .required()
      .messages({
        'boolean.base': 'Category should be a type of \'boolean\'',
        'boolean.empty': 'Category cannot be an empty field',
        'any.required': 'Category is a required field',
      }),

    price: joi
      .number()
      .min(1)
      .max(1000000)
      .required()
      .messages({
        'number.base': 'Price should be a type of \'number\'',
        'number.empty': 'Price cannot be an empty field',
        'number.min': 'Price  should have a minimum length of {#limit}. Please enter again!',
        'number.max': 'Price should have a minimum length of {#limit}. Please enter again!',
        'any.required': 'Price is a required field',
      }),

    imgUrl: joi
      .string()
      .messages({
        'string.base': 'Category should be a type of \'text\'',

      }),

  }),
};

module.exports = schema;
