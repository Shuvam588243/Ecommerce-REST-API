const router = require('express').Router();
const {UserSignUpController, UserSignInController,UserProfile,UserForgetPassword,UserResetPassword} = require('../../controllers/Users');
const signInRateLimiter = require('../../limiters/signinLimiter');
const signUpRateLimiter = require('../../limiters/signupLimiter');
const {Auth} = require('../../middlewares')



router.post('/signup', signUpRateLimiter, UserSignUpController);
router.post('/signin', signInRateLimiter, UserSignInController);
router.get('/profile', Auth, UserProfile);
router.post('/forgetpassword',UserForgetPassword);
router.put('/resetPassword/:id/:token',UserResetPassword);


module.exports = router