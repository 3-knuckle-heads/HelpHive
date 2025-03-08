import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa"; // Icon for send button

function Faq() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef(null); // Ref for auto-scroll

  useEffect(() => {
    // Scroll to the latest message when messages update
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchAnswer = async () => {
    if (!question.trim()) return; // Prevent sending empty questions

    setLoading(true);
    const userMessage = { type: "user", text: question.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/gemini/prompt-post",
        { prompt: question.trim() }
      );

      const botMessage = { type: "bot", text: response.data.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching FAQ answer:", error);
      const errorMessage = { type: "bot", text: "Failed to get an answer." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-center text-lg font-semibold">
        Help-Hive AI Chat
      </header>

      {/* Chat Container */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 max-w-lg rounded-xl shadow-md ${
                message.type === "bot"
                  ? "bg-gray-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="p-4 max-w-lg rounded-xl bg-gray-700 text-white">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchAnswer()}
          placeholder="Type your question..."
          className="flex-grow p-3 bg-gray-700 text-white rounded-lg outline-none border-none"
        />
        <button
          onClick={fetchAnswer}
          disabled={loading}
          className="ml-4 bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <FaPaperPlane className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default Faq;
