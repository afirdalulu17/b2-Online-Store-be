const express = require("express");
const router = express.Router();

const userAPI = require("./api/user");
const authAPI = require("./api/auth");

router.use("/users", userAPI);
router.use("/auth", authAPI);

module.exports = router;