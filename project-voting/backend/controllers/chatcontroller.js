const { chat_messages, Citizen, Admin } = require('../models');

const chatController = {
  getMessages: async (req, res) => {
    try {
      const nationalID = req.user.id;
      
      const messages = await chat_messages.findAll({
        where: { user_id: nationalID },
        order: [['createdAt', 'ASC']],
      });
      
      console.log('Fetched messages for user', nationalID, ':', messages);
      res.json(messages);
    } catch (error) {
      console.error('Error in getMessages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const nationalID = req.user.id;
      const { message } = req.body;
      const isAdmin = req.user.isAdmin || false;

      const newMessage = await chat_messages.create({
        user_id: nationalID,
        message,
        is_admin: isAdmin,
      });

      // Emit the new message to the specific user's room and admin room
      req.app.get('io').to(nationalID).emit('new message', newMessage);
      req.app.get('io').to('admin').emit('new message', newMessage);

      console.log('New message created and emitted:', newMessage);
      res.json(newMessage);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      res.status(500).json(error);
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await chat_messages.findAll({
        order: [['createdAt', 'ASC']],
      });

      const groupedMessages = messages.reduce((acc, message) => {
        if (!acc[message.user_id]) {
          acc[message.user_id] = [];
        }
        acc[message.user_id].push(message);
        return acc;
      }, {});

      res.json(groupedMessages);
    } catch (error) {
      console.error('Error in getAllMessages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  adminReply: async (req, res) => {
    try {
      const { userId, message } = req.body;
      const isAdmin = true;

      const newMessage = await chat_messages.create({
        user_id: userId,
        message,
        is_admin: isAdmin,
      });

      // Emit the new message to all connected clients
      req.app.get('io').emit('new message', newMessage);

      res.json(newMessage);
    } catch (error) {
      console.error('Error in adminReply:', error);
      res.status(500).json(error);
    }
  },
};

module.exports = chatController;