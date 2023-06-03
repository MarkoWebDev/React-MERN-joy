const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser, loginUser } = require("../controllers/authController");

router.use(cors({ origin: "http://localhost:3000", credentials: true }));

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);

module.exports = router;
