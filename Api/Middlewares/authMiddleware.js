const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header must start with Bearer",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      };
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
