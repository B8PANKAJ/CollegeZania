// Example: roleMiddleware.js

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "No role specified" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You don't have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
