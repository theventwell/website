const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const OTP_EXPIRY_MINUTES = 10;
const OTP_SALT_ROUNDS = 10;

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const hashOtp = async (otp) => {
  return bcrypt.hash(otp, OTP_SALT_ROUNDS);
};

const compareOtp = async (otp, otpHash) => {
  return bcrypt.compare(otp, otpHash);
};

const getOtpExpiry = () => {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
};

module.exports = {
  generateOtp,
  hashOtp,
  compareOtp,
  getOtpExpiry,
  OTP_EXPIRY_MINUTES,
};