// ChatbotIcon.js (assuming you want to define it in a separate file)
import React from "react";
import { Link } from "react-router-dom";

function ChatbotIcon() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to="/chatbot"
        className="border border-green-500 text-green-500 rounded-full px-6 py-3 shadow-md hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
      >
        Chatbot
      </Link>
    </div>
  );
}

export default ChatbotIcon;