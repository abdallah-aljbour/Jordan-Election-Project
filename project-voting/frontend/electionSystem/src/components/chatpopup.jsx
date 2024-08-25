import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "../components/axios";
import { motion } from "framer-motion";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBoxRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nationalID = localStorage.getItem("nationalID");

    socketRef.current = io("http://localhost:4026", {
      query: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");
      console.log("Joining room for user:", nationalID);
      socketRef.current.emit("join", nationalID);
    });

    socketRef.current.on("new message", (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    if (isOpen) {
      fetchMessages();
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    console.log("Messages updated:", messages);
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/chat/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched messages:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      const nationalID = localStorage.getItem("nationalID");

      const newMessage = {
        user_id: nationalID,
        message: inputMessage,
        is_admin: false,
        createdAt: new Date(),
      };

      socketRef.current.emit("send message", {
        userId: nationalID,
        message: inputMessage,
        token,
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-[#01924C] hover:bg-[#016d39] text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#01924C] focus:ring-opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMessageCircle className="h-6 w-6 inline-block mr-2" />
          Chat with Admin
        </motion.button>
      )}
      {isOpen && (
        <motion.div
          className="bg-white rounded-lg shadow-2xl w-96 h-[32rem] flex flex-col overflow-hidden border-t-2 border-[#DA2A29]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#DA2A29] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center">
              <FiMessageCircle className="mr-2" /> Chat with Admin
            </h3>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX className="h-6 w-6" />
            </motion.button>
          </div>
          <div
            ref={chatBoxRef}
            className="flex-grow p-4 overflow-y-auto bg-gray-100"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={`${msg.id}-${index}`}
                className={`mb-4 flex ${
                  msg.is_admin ? "justify-start" : "justify-end"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.is_admin
                      ? "border-l-2 border-[#01924C] bg-white text-gray-800"
                      : "border-r-2 border-[#DA2A29] bg-white text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center bg-gray-200 rounded-md">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-grow bg-transparent border-none focus:outline-none px-3 py-2"
                placeholder="Type a message..."
              />
              <motion.button
                onClick={sendMessage}
                className="text-[#01924C] p-2 rounded-md mx-1 hover:text-[#016d39] transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatPopup;
