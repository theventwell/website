const COOKIE_NAME = 'token';

const getBaseCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  };
};

const getCookieOptions = () => ({
  ...getBaseCookieOptions(),
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const getClearCookieOptions = () => getBaseCookieOptions();

module.exports = { COOKIE_NAME, getCookieOptions, getClearCookieOptions };
