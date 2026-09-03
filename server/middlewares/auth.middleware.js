const { verifyToken } = require('../utilities/jwt.util');
const { COOKIE_NAME } = require('../utilities/cookie.util');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  const bearerToken = header?.startsWith('Bearer ') ? header.slice(7) : null;
  const token = req.cookies?.[COOKIE_NAME] || bearerToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired. Please log in again',
    });
  }
};

module.exports = { authenticate };
