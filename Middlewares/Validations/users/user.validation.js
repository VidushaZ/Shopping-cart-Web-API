// eslint-disable-next-line import/no-unresolved
const { user } = require('./user.schema');

module.exports = {
  // eslint-disable-next-line consistent-return
  addUserValidaion: async (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('User POST validaion running...'.blue);
    // Add console log message and change color to blue (process)
    const value = await user.validate(req.body);
    if (value.error) {
      // eslint-disable-next-line no-console
      console.log('User POST validaion failed!'.red);
      // Add console log message and change color to red (failuire)
      return res.status(400).json({
        success: 0,
        message: value.error.details[0].message,
      });
    }
    // eslint-disable-next-line no-console
    console.log('User POST validaion successfull.'.green);
    // Add console log message and change color to green (success)
    next();
  },
};
