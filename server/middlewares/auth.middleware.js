const { verifyToken } = require('../utilities/jwt.util');
const { COOKIE_NAME } = require('../utilities/cookie.util');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  const bearerToken = header?.match(/^Bearer\s+(.+)$/i)?.[1]
    ?.trim();
  const cookieToken = req.cookies?.[COOKIE_NAME];

  console.log('========== AUTH ==========');
  console.log('Origin:', req.headers.origin);
  console.log('Referer:', req.headers.referer);
  console.log('Cookie header:', req.headers.cookie);
  console.log('Parsed cookies:', req.cookies);
  console.log('Authorization:', req.headers.authorization);

  if (!cookieToken && !bearerToken) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  // Retain cookie authentication, but fall back to a valid Bearer token when
  // a stale or otherwise invalid cookie is present.
  for (const token of [cookieToken, bearerToken]) {
    if (!token) continue;

    try {
      req.user = verifyToken(token);
      return next();
    } catch (error) {
      // Try the next credential source.
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Session expired. Please log in again',
  });
};


module.exports = { authenticate };
