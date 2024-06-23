const jwt = require("jsonwebtoken");
const User = require("../models/user");

///const JWT_SECRET_KEY = process.env.JWT_SECRET; // Replace with your actual secret
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  //  console.log("req=======", req);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //console.log("token=======", token);

  if (!token) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(payload.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
