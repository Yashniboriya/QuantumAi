const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/search", chatController.searchChats);

module.exports = router;
