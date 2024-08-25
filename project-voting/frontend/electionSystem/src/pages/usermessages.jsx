import React, { useState, useEffect, useCallback } from "react";
import AdminDashboard from "../pages/AdminDashboard";
import axios from "../components/axios";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiMessageCircle, FiRefreshCw } from "react-icons/fi";
import io from "socket.io-client";

const UserMessages = () => {
  const [userMessages, setUserMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewMessage = useCallback((newMessage) => {
    console.log("Received new message:", newMessage);
    setUserMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      if (!updatedMessages[newMessage.user_id]) {
        updatedMessages[newMessage.user_id] = [];
      }
      // Check if the message already exists to avoid duplicates
      const messageExists = updatedMessages[newMessage.user_id].some(
        (msg) => msg.id === newMessage.id
      );
      if (!messageExists) {
        updatedMessages[newMessage.user_id].push(newMessage);
      }
      return updatedMessages;
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newSocket = io("http://localhost:4026", {
      query: { token },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("join", "admin");
    });

    newSocket.on("new message", handleNewMessage);

    setSocket(newSocket);

    return () => {
      newSocket.off("new message", handleNewMessage);
      newSocket.disconnect();
    };
  }, [handleNewMessage]);

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const fetchAllMessages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/chat/all-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendReply = async () => {
    if (replyMessage.trim() === "" || !selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/chat/admin-reply",
        {
          userId: selectedUser,
          message: replyMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleNewMessage(response.data);
      setReplyMessage("");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white ">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-[#201D1E] font-amiri text-center mb-12 mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          لوحة رسائل المستخدمين
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 lg:col-span-1 border-t-4 border-[#01924C]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                <FiUser className="mr-2 text-[#01924C]" /> المستخدمون
              </h2>
              <motion.button
                onClick={fetchAllMessages}
                className="text-[#01924C] hover:text-[#016d39] transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
              >
                <FiRefreshCw
                  className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </motion.button>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
              {Object.entries(userMessages).map(([userId, messages]) => (
                <motion.button
                  key={userId}
                  onClick={() => setSelectedUser(userId)}
                  className={`w-full text-left p-3 rounded-md transition duration-200 ease-in-out ${
                    selectedUser === userId
                      ? "bg-[#01924C] text-white shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {userId} ({messages.length})
                </motion.button>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2 border-t-4 border-[#DA2A29]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedUser ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                  <FiMessageCircle className="mr-2 text-[#DA2A29]" /> محادثة مع{" "}
                  {selectedUser}
                </h2>
                <div className="bg-gray-100 p-4 h-[calc(100vh-350px)] overflow-y-auto mb-4 rounded-md shadow-inner">
                  {userMessages[selectedUser].map((msg, index) => (
                    <motion.div
                      key={msg.id || index}
                      className={`mb-3 ${
                        msg.is_admin ? "text-right" : "text-left"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <span
                        className={`inline-block p-3 rounded-lg shadow-sm ${
                          msg.is_admin
                            ? "bg-[#DA2A29] text-white"
                            : "bg-white text-gray-800 border border-gray-300"
                        }`}
                      >
                        {msg.message}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center bg-gray-200 rounded-md overflow-hidden shadow-sm">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-grow bg-transparent border-none focus:outline-none px-4 py-3 text-gray-700"
                    placeholder="اكتب رسالتك هنا..."
                  />
                  <motion.button
                    onClick={sendReply}
                    className="bg-[#01924C] text-white p-3 hover:bg-[#016d39] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSend />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="h-[calc(100vh-250px)] flex items-center justify-center text-xl text-gray-500">
                اختر مستخدمًا لبدء المحادثة
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
