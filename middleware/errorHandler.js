const { logEvent } = require("./logger");

const errorHandler = (err, req, res, next) => {
  const message = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvent(message, "errLog.log");
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : "500"; //Server error
  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
