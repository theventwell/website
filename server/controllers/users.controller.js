const User = require('../models/users.model');
const Booking = require('../models/booking.model');
const bcrypt = require('bcryptjs');
const { signToken } = require('../utilities/jwt.util');
const { COOKIE_NAME, getCookieOptions, getClearCookieOptions } = require('../utilities/cookie.util');

const serializeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
});

const getUserBookings = (userId) =>
  Booking.find({ user: userId }).sort({ dateOfAppointment: -1 }).select('-__v');

const SIGNUP_USER = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name?.trim() || !email?.trim() || !password || !phoneNumber?.trim()) {
      return res.status(400).json({ success: false, message: 'Name, email, phone number, and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account already exists for this email' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      phoneNumber: phoneNumber.trim(),
      role: 'user',
    });
    const token = signToken({ userId: user._id, email: user.email, role: user.role });
    res.cookie(COOKIE_NAME, token, getCookieOptions());
    return res.status(201).json({ success: true, message: 'Account created successfully', data: { user: serializeUser(user), bookings: [] } });
  } catch (error) {
    console.error('SIGNUP_USER error:', error);
    return res.status(500).json({ success: false, message: 'Unable to create your account. Please try again later' });
  }
};

const LOGIN_USER = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');

    if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    res.cookie(COOKIE_NAME, token, getCookieOptions());
    const bookings = await getUserBookings(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: serializeUser(user),
        bookings,
      },
    });
  } catch (error) {
    console.error('LOGIN_USER error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to log in. Please try again later',
    });
  }
};

const GET_CURRENT_USER = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      res.clearCookie(COOKIE_NAME, getClearCookieOptions());
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const bookings = await getUserBookings(user._id);

    return res.status(200).json({
      success: true,
      data: {
        user: serializeUser(user),
        bookings,
      },
    });
  } catch (error) {
    console.error('GET_CURRENT_USER error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to restore session',
    });
  }
};

const LOGOUT_USER = async (req, res) => {
  res.clearCookie(COOKIE_NAME, getClearCookieOptions());
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = { SIGNUP_USER, LOGIN_USER, GET_CURRENT_USER, LOGOUT_USER };
