// eslint-disable-next-line import/no-unresolved
const { product } = require('./product.schema');

module.exports = {
  // eslint-disable-next-line consistent-return
  addProductValidaion: async (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('Product validaion running...'.blue);
    // Add console log message and change color to blue (process)
    const value = await product.validate(req.body);
    // Validating request body using schema validations.
    if (value.error) {
      // eslint-disable-next-line no-console
      console.log('Product validaion failed!'.red);
      // Add console log message and change color to red (failiure)
      return res.status(400).json({
        success: 0,
        message: value.error.details[0].message,
      });
    }
    // eslint-disable-next-line no-console
    console.log('Product validaion successfull.'.green);
    // Add console log message and change color to green (success)
    next();
  },
};
