const router = require('express').Router();
const {AdminSignUpController, AdminSignInController, AdminProfile} = require('../../controllers/Admins');
const signInRateLimiter = require('../../limiters/signinLimiter');
const signUpRateLimiter = require('../../limiters/signupLimiter');
const {Auth} = require('../../middlewares')


router.post('/signup', signUpRateLimiter, AdminSignUpController);
router.post('/signin', signInRateLimiter, AdminSignInController);

router.get('/profile', Auth, AdminProfile)


module.exports = router