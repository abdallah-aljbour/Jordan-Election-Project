const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatcontroller');
const authenticateToken = require('../middlwares/auth');

router.get('/messages', authenticateToken, chatController.getMessages);
router.post('/messages', authenticateToken, chatController.sendMessage);
router.get('/all-messages', chatController.getAllMessages);
router.post('/admin-reply', chatController.adminReply);

module.exports = router;