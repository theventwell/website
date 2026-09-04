const User = require('../models/users.model');
const Booking = require('../models/booking.model');
const Counter = require('../models/counter.model');
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

const CREATE_BOOKING = async (req, res) => {
  try {
    const {
      dateOfAppointment,
      startTime,
      endTime,
      therapyName,
      phone,
      countryCode = '+91',
      mode,
    } = req.body;

    if (
      !dateOfAppointment ||
      !startTime ||
      !endTime ||
      !therapyName?.trim() ||
      !phone?.trim() ||
      !mode
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Date, time slot, booking type, phone number, and mode are required',
      });
    }

    if (!['offline', 'virtual'].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment mode',
      });
    }

    const appointmentDate = new Date(dateOfAppointment);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(appointmentDate.getTime()) ||
      appointmentDate < today
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please choose a future appointment date',
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    // Check whether the selected slot is already booked
    const existingBooking = await Booking.findOne({
      dateOfAppointment: appointmentDate,
      startTime,
      endTime,
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please select another slot.',
      });
    }

    // Get current year and month
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');

    // Counter is maintained separately for each month
    const counterId = `booking-${year}-${month}`;

    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
      }
    );

    const sequence = String(counter.sequence).padStart(4, '0');

    const bookingNumber = Number(`${year}${month}${sequence}`);

    const booking = await Booking.create({
      bookingNumber,
      user: user._id,
      countryCode: countryCode.trim() || '+91',
      phone: phone.trim(),
      email: user.email,
      fullName: user.name,
      dateOfAppointment: appointmentDate,
      startTime,
      endTime,
      mode,
      therapyName: therapyName.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: booking,
    });
  } catch (error) {
    console.error('CREATE_BOOKING error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to book your appointment. Please try again later',
    });
  }
};

const GET_BOOKED_SLOTS = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required',
      });
    }

    const appointmentDate = new Date(date);

    if (Number.isNaN(appointmentDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date',
      });
    }

    const bookings = await Booking.find({
      dateOfAppointment: appointmentDate,
    }).select('startTime endTime -_id');

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('GET_BOOKED_SLOTS error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch available slots',
    });
  }
};

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

module.exports = { SIGNUP_USER, LOGIN_USER, CREATE_BOOKING, GET_BOOKED_SLOTS, GET_CURRENT_USER, LOGOUT_USER };
