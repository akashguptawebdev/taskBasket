export const generateToken = (user, message, statusCode, res) => {
  if (!user || !user.generateJsonWebToken) {
    throw new Error('User object or generateJsonWebToken method is missing.');
  }

  const token = user.generateJsonWebToken();
  const cookieName = "loginToken";
  const COOKIE_EXPIRE = 7; // 7 days

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production', // send cookie over HTTPS only in production
      sameSite: 'Strict', // helps protect against CSRF attacks
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
