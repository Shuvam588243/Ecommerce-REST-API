const rateLimit = require("express-rate-limit");

const signUpRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute window
    max: 6, // start blocking after 5 requests
    message:
      "Too many Sign Up attempts from this IP, please try again after 15 Minute"
  });

  module.exports = signUpRateLimiter