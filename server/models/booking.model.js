const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfAppointment: {
      type: Date,
      required: true,
    },
    therapyName: {
      type: String,
      required: true,
      trim: true,
    },
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);