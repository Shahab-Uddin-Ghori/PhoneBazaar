import React, { useContext, useEffect, useState, useRef } from "react"; // Importing necessary React hooks
import { useNavigate } from "react-router"; // Importing hook to navigate between routes
import { toast } from "react-toastify"; // Importing toast for notifications
import { UserContext } from "../../components/UserContextProvider"; // Importing UserContext to access user information
import { ThemeContext } from "../../components/ModeThemeContext"; // Importing ThemeContext for theme management
import { FaPaperPlane, FaUserCircle, FaMicrophone } from "react-icons/fa"; // Importing icons for UI
import { IoMdArrowBack } from "react-icons/io"; // Importing back arrow icon

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
  // Accessing user information and theme settings from context
  const { user } = useContext(UserContext);
  const [theme] = useContext(ThemeContext);
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [chatMessages, setChatMessages] = useState(dummyChat); // State to hold chat messages
  const [newMessage, setNewMessage] = useState(""); // State to hold new message input
  const [recording, setRecording] = useState(false); // State to manage voice recording status
  const [audioURL, setAudioURL] = useState(""); // State to store audio URL of recorded voice
  const [mediaRecorder, setMediaRecorder] = useState(null); // State to hold MediaRecorder instance
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message

  // Check if user is logged in; if not, redirect to home
  useEffect(() => {
    if (user.isLogin === false) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [user, navigate]);

  // Scroll to the latest message whenever chatMessages changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the latest message
    }
  }, [chatMessages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newMessage.trim() === "") {
      toast.error("Message cannot be empty"); // Show error if message is empty
      return;
    }
    const newChat = {
      id: chatMessages.length + 1, // Generate a unique ID for the new message
      sender: "buyer", // Set the sender to 'buyer'
      message: newMessage, // Store the new message
    };
    setChatMessages([...chatMessages, newChat]); // Update chat messages with the new message
    setNewMessage(""); // Clear the input field

    // TODO: Implement Firebase/Backend message saving logic here
  };

  // Handle voice recording functionality
  const handleRecordVoice = async () => {
    if (recording) {
      mediaRecorder.stop(); // Stop recording if already recording
      setRecording(false); // Update recording state
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Get audio stream
      const recorder = new MediaRecorder(stream); // Create a MediaRecorder instance
      setMediaRecorder(recorder); // Store the recorder instance

      // Event triggered when audio data is available
      recorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" }); // Create a blob from the recorded audio
        const audioURL = URL.createObjectURL(audioBlob); // Create a URL for the audio blob
        setAudioURL(audioURL); // Set the audio URL in state

        // TODO: Save/send audio message here (e.g., Firebase)
        const newChat = {
          id: chatMessages.length + 1, // Generate a unique ID for the voice message
          sender: "buyer", // Set the sender to 'buyer'
          message: "Voice Message", // Placeholder text for voice message
          audioURL: audioURL, // Store the audio URL
        };
        setChatMessages([...chatMessages, newChat]); // Update chat messages with the new voice message
      };

      recorder.start(); // Start recording
      setRecording(true); // Update recording state
    }
  };

  return (
    <section
      className={`${
        theme === "light"
          ? "bg-zinc-50 h-screen text-zinc-800" // Light theme styles
          : "bg-zinc-800 h-screen text-zinc-300" // Dark theme styles
      } flex flex-col min-h-[calc(100vh-6rem)]`}
    >
      {/* Topbar with navigation and user info */}
      <div className="flex justify-between items-center px-4 py-3 shadow-md mt-28">
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h2 className="text-lg font-semibold">Chat with Seller</h2>
        <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-300" />
      </div>

      {/* Chat section */}
      <div
        style={{
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          msOverflowStyle: "none", // Hide scrollbar in IE/Edge
        }}
        className="container mx-auto overflow-y-auto h-full w-full flex flex-col mt-8 p-5"
      >
        {/* Chat Messages */}
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.sender === "buyer" ? "justify-end" : "justify-start" // Align messages based on sender
            }`}
          >
            {msg.audioURL ? (
              // Render audio controls if the message contains an audio URL
              <audio controls src={msg.audioURL}></audio>
            ) : (
              <div
                className={`p-3 rounded-lg max-w-xs min-h-10 overflow-y-clip ${
                  msg.sender === "buyer"
                    ? "bg-blue-500 text-white" // Styles for buyer messages
                    : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white" // Styles for seller messages
                }`}
              >
                {msg.message} {/* Display the text message */}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* Scroll reference for the latest message */}
      </div>

      {/* Message Input and Voice Recording Controls */}
      <form
        onSubmit={handleSendMessage} // Handle form submission to send message
        className="px-4 py-3 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Update new message state on input change
          className="flex-1 bg-white text-zinc-800 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          placeholder="Type your message..."
        />
        <button
          type="button"
          onClick={handleRecordVoice} // Handle voice recording on button click
          className={`ml-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition ease-in-out ${
            recording ? "bg-red-600" : "bg-red-500" // Change button color based on recording state
          }`}
        >
          <FaMicrophone /> {/* Microphone icon */}
        </button>
        <button
          type="submit" // Submit button for sending text message
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition ease-in-out"
        >
          <FaPaperPlane /> {/* Paper plane icon */}
        </button>
      </form>
    </section>
  );
}

export default Messages; // Exporting the Messages component for use in other parts of the application
