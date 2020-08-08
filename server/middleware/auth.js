const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    req.auth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.auth = false;
    return next();
  }
  var verified;
  try {
    verified = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    req.auth = false;
    return next();
  }

  if (!verified) {
    req.auth = false;
    return next();
  }
  req.auth = true;
  req.userId = verified.userId;
  next();
};
