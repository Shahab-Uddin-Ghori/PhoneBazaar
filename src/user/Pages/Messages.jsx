import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../../components/UserContextProvider";
import { ThemeContext } from "../../components/ModeThemeContext";
import { FaPaperPlane, FaUserCircle, FaMicrophone } from "react-icons/fa";
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
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const messagesEndRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    if (user.isLogin === false) {
      navigate("/");
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
      sender: "buyer",
      message: newMessage,
    };
    setChatMessages([...chatMessages, newChat]);
    setNewMessage("");

    // Implement Firebase/Backend message saving logic here
  };

  // Handle voice recording
  const handleRecordVoice = async () => {
    if (recording) {
      mediaRecorder.stop();
      setRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);

        // Save/send audio message here (e.g., Firebase)
        const newChat = {
          id: chatMessages.length + 1,
          sender: "buyer",
          message: "Voice Message",
          audioURL: audioURL,
        };
        setChatMessages([...chatMessages, newChat]);
      };

      recorder.start();
      setRecording(true);
    }
  };

  return (
    <section
      className={`${
        theme === "light"
          ? "bg-zinc-50 h-screen text-zinc-800"
          : "bg-zinc-800 h-screen text-zinc-300"
      } flex flex-col min-h-[calc(100vh-6rem)]`}
    >
      {/* topbar */}
      <div className="flex justify-between items-center  px-4 py-3 shadow-md mt-28">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h2 className="text-lg font-semibold">Chat with Seller</h2>
        <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-300" />
      </div>
      {/*  */}

      {/* chat sec */}
      <div
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer/Edge */,
        }}
        className="container mx-auto overflow-y-auto h-full w-full flex flex-col  mt-8 p-5"
      >
        {/* Chat Header */}

        {/* Chat Messages */}
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.sender === "buyer" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.audioURL ? (
              <audio controls src={msg.audioURL}></audio>
            ) : (
              <div
                className={`p-3 rounded-lg max-w-xs min-h-10 overflow-y-clip ${
                  msg.sender === "buyer"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                }`}
              >
                {msg.message}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input and Voice Recording */}
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
          type="button"
          onClick={handleRecordVoice}
          className={`ml-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition ease-in-out ${
            recording ? "bg-red-600" : "bg-red-500"
          }`}
        >
          <FaMicrophone />
        </button>
        <button
          type="submit"
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition ease-in-out"
        >
          <FaPaperPlane />
        </button>
      </form>
    </section>
  );
}

export default Messages;
