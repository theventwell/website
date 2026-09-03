const express = require('express');
const userRouter = express.Router();
const {
  LOGIN_USER,
  SIGNUP_USER,
  CREATE_BOOKING,
  GET_CURRENT_USER,
  LOGOUT_USER,
} = require('../controllers/users.controller.js');
const { authenticate } = require('../middlewares/auth.middleware.js');

userRouter.post('/signup', SIGNUP_USER);
userRouter.post('/login', LOGIN_USER);
userRouter.post('/bookings', authenticate, CREATE_BOOKING);
userRouter.get('/me', authenticate, GET_CURRENT_USER);
userRouter.post('/logout', LOGOUT_USER);

module.exports = userRouter;
