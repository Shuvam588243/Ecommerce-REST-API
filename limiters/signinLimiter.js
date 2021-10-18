const rateLimit = require("express-rate-limit");

const signInRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 minute window
    max: 3, // start blocking after 5 requests
    message:
      "Too many Login attempts from this IP, please try again after 15 Minute"
  });

  module.exports = signInRateLimiter