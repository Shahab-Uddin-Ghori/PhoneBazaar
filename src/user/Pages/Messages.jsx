import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../../components/UserContextProvider";
import { ThemeContext } from "../../components/ModeThemeContext";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

// Dummy chat data (to be replaced with real-time Firebase chat)
const dummyChat = [
  { id: 1, sender: "buyer", message: "Is the phone still available?" },
  { id: 2, sender: "seller", message: "Yes, it is available." },
  { id: 3, sender: "buyer", message: "What is the final price?" },
  {
    id: 4,
    sender: "seller",
    message: "It's negotiable, please make an offer.",
  },
];

function Messages() {
  const { user } = useContext(UserContext);
  const [theme] = useContext(ThemeContext);
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState(dummyChat);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    if (user.isLogin === false) {
      navigate("/");
      toast.info("Please Login First");
    }
  }, [user, navigate]);

  // Scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    const newChat = {
      id: chatMessages.length + 1,
      sender: "buyer", // Assuming the logged-in user is the buyer
      message: newMessage,
    };
    setChatMessages([...chatMessages, newChat]);
    setNewMessage("");

    // Implement Firebase/Backend message saving logic here
  };

  return (
    <section
      className={`${
        theme === "light"
          ? "bg-zinc-50 h-screen text-zinc-800"
          : "bg-zinc-800 h-screen text-zinc-300"
      } flex flex-col min-h-[calc(100vh-6rem)]`}
    >
      <div className="container mx-auto flex flex-col h-full mt-28">
        {/* Chat Header */}
        <div className="flex justify-between items-center  px-4 py-3 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
          >
            <IoMdArrowBack className="text-2xl" />
          </button>
          <h2 className="text-lg font-semibold">Chat with Seller</h2>
          <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-300" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-6">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${
                msg.sender === "buyer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "buyer"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          {/* Reference div to scroll to the latest message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <form
          onSubmit={handleSendMessage}
          className=" px-4 py-3 flex items-center"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white text-zinc-800 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition ease-in-out"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Messages;
