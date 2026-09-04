const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const GET_DASHBOARD = async (req, res) => {
  try {
    const {
      bookingNumber = "",
      bookingType = "",
      dateFrom = "",
      dateTo = "",
    } = req.query;

    const today = getStartOfToday();

    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const filters = {};

    // Booking Number
    if (bookingNumber.trim()) {
      filters.bookingNumber = bookingNumber.trim();
    }

    // Booking Type
    if (bookingType.trim()) {
      filters.therapyName = {
        $regex: `^${bookingType.trim()}$`,
        $options: "i",
      };
    }

    // Date range
    if (dateFrom || dateTo) {
      filters.dateOfAppointment = {};

      if (dateFrom) {
        filters.dateOfAppointment.$gte = new Date(`${dateFrom}T00:00:00.000Z`);
      }

      if (dateTo) {
        filters.dateOfAppointment.$lte = new Date(`${dateTo}T23:59:59.999Z`);
      }
    }

    const [pastMonth, active, total, bookings] = await Promise.all([
      Booking.countDocuments({
        createdAt: { $gte: monthAgo },
      }),

      Booking.countDocuments({
        dateOfAppointment: { $gte: today },
      }),

      Booking.countDocuments(),

      Booking.find(filters)
        .populate("user", "name email role")
        .sort({
          dateOfAppointment: -1,
          createdAt: -1,
        })
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          pastMonth,
          active,
          total,
        },
        bookings,
      },
    });
  } catch (error) {
    console.error("GET_DASHBOARD error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard data",
    });
  }
};

module.exports = { GET_DASHBOARD };
