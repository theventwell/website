const mongoose = require('mongoose');
const Booking = require('../models/booking.model');

const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const GET_DASHBOARD = async (req, res) => {
  try {
    const { bookingId = '', bookingType = '' } = req.query;
    const today = getStartOfToday();
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    const filters = {};

    if (bookingId.trim()) {
      if (!mongoose.isValidObjectId(bookingId.trim())) {
        return res.status(200).json({ success: true, data: { stats: { pastMonth: 0, active: 0, total: 0 }, bookings: [] } });
      }
      filters._id = bookingId.trim();
    }
    if (bookingType.trim()) filters.therapyName = { $regex: bookingType.trim(), $options: 'i' };

    const [pastMonth, active, total, bookings] = await Promise.all([
      Booking.countDocuments({ createdAt: { $gte: monthAgo } }),
      Booking.countDocuments({ dateOfAppointment: { $gte: today } }),
      Booking.countDocuments(),
      Booking.find(filters).populate('user', 'name email role').sort({ dateOfAppointment: -1, createdAt: -1 }).lean(),
    ]);

    return res.status(200).json({ success: true, data: { stats: { pastMonth, active, total }, bookings } });
  } catch (error) {
    console.error('GET_DASHBOARD error:', error);
    return res.status(500).json({ success: false, message: 'Unable to load dashboard data' });
  }
};

module.exports = { GET_DASHBOARD };
