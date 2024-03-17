const jwt = require("jsonwebtoken");

const generateTokenInCookie = (userId, roleId, res) => {
  const token = jwt.sign({ userId, roleId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // XSS attaques
    sameSite: "strict", // CSRF attaques
  });
  return token;
};

module.exports = {
  generateTokenInCookie,
};
