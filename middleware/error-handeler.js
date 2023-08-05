const { customError } = require("../errors/custom-error");

const errorHandelerMiddleware = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: `something broke, please try again` });
};

module.exports = errorHandelerMiddleware;
