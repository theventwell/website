const User = require('../models/users.model');
const Otp = require('../models/otp.model');
const Booking = require('../models/booking.model');
const { generateOtp, hashOtp, compareOtp, getOtpExpiry } = require('../utilities/otp.util');
const { signToken } = require('../utilities/jwt.util');
const { sendWhatsAppOtp } = require('../utilities/whatsapp.util');

const LOGIN_USER = async (req, res) => {
  try {
    const { phoneNumber, countryCode } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    const user = await User.findOne({ phoneNumber: phoneNumber.trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this phone number',
      });
    }

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiresAt = getOtpExpiry();

    await Otp.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        phoneNumber: user.phoneNumber,
        otpHash,
        expiresAt,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendWhatsAppOtp({
      countryCode: countryCode || '',
      phoneNumber: user.phoneNumber,
      otp,
    });

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully via WhatsApp',
      data: {
        userId: user._id,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error('LOGIN_USER error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again later',
    });
  }
};

const VERIFY_USER_OTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'User ID and OTP are required',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const otpRecord = await Otp.findOne({ user: user._id });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new one',
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one',
      });
    }

    const isValidOtp = await compareOtp(otp.toString(), otpRecord.otpHash);

    if (!isValidOtp) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    const token = signToken({
      userId: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

    const bookings = await Booking.find({ user: user._id })
      .sort({ dateOfAppointment: -1 })
      .select('-__v');

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
        bookings,
      },
    });
  } catch (error) {
    console.error('VERIFY_USER_OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP. Please try again later',
    });
  }
};

module.exports = { LOGIN_USER, VERIFY_USER_OTP };