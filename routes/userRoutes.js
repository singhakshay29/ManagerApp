const express = require("express");
const {
  loginUser,
  currentUser,
  registerUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const route = express.Router();

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/current", validateToken, currentUser);

module.exports = route;
