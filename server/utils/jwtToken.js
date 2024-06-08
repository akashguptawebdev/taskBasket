export const generateToken = (user, message, statusCode, res) => {
  if (!user || !user.generateJsonWebToken) {
      throw new Error('User object or generateJsonWebToken method is missing.');
  }

  const token = user.generateJsonWebToken();
  const cookieName = "loginToken";
  // const COOKIE_EXPIRE = 7; // 7 days

  res
      .status(statusCode)
      .cookie(cookieName, token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None', // Set SameSite attribute to None
          expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // 7 days from now
      })
      .json({
          success: true,
          message,
          user,
          token,
      });
};
