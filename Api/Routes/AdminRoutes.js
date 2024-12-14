const express = require("express");
const {
  loginAdmin,
  getStats,
  getAllUsers,
  deleteUser,
} = require("../Controllers/AdminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Admin auth routes
router.post("/login", loginAdmin);

// Protected admin routes
router.get("/stats", [authMiddleware, roleMiddleware(["admin"])], getStats);

router.get("/users", [authMiddleware, roleMiddleware(["admin"])], getAllUsers);

router.delete(
  "/users/:id",
  [authMiddleware, roleMiddleware(["admin"])],
  deleteUser
);

module.exports = router;
