const { verifyToken } = require('../utilities/jwt.util');
const { COOKIE_NAME } = require('../utilities/cookie.util');

const authenticate = (req, res, next) => {
  console.log('========== AUTH ==========');
  console.log('Origin:', req.headers.origin);
  console.log('Referer:', req.headers.referer);
  console.log('Cookie header:', req.headers.cookie);
  console.log('Parsed cookies:', req.cookies);
  console.log('Authorization:', req.headers.authorization);

  const header = req.headers.authorization;

  const bearerToken = header?.startsWith('Bearer ')
    ? header.slice(7)
    : null;

  const cookieToken = req.cookies?.[COOKIE_NAME];

  console.log('Cookie token:', !!cookieToken);
  console.log('Bearer token:', !!bearerToken);

  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired. Please log in again',
    });
  }
};


module.exports = { authenticate };
