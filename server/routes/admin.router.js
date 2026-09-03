const express = require('express');
const adminRouter = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/admin.middleware');
const { GET_DASHBOARD } = require('../controllers/admin.controller');

adminRouter.get('/dashboard', authenticate, requireAdmin, GET_DASHBOARD);
module.exports = adminRouter;
