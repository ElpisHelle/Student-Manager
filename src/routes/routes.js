const express = require("express");
const router = express.Router();
// const mainRoutes = require('./mainRoutes');
const authenticationRoutes = require("./authenticationRoutes");
const userRoutes = require("./userRoutes");
const displayRoutes = require("./displayRoutes");

// Mount the authentication routes
router.use("/", authenticationRoutes);

// Mount the user routes
router.use("/", userRoutes);

// Mount the display routes (scores, etc.)
router.use("/", displayRoutes);

module.exports = router;
