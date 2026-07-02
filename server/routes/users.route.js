const express = require('express');
const userRouter = express.Router();
const { LOGIN_USER, VERIFY_USER_OTP } = require('../controllers/users.controller.js');

userRouter.post('/login', LOGIN_USER);
userRouter.post('/verify_otp', VERIFY_USER_OTP);

module.exports = userRouter;