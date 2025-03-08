import { useState } from "react";
import axios from "axios";

function Faq() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Help-Hive Chatbot
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 shadow-inner h-96 overflow-y-auto mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg mb-3 max-w-xs ${
                message.type === "bot" ? "bg-blue-100" : "bg-green-100 self-end"
              }`}
            >
              <strong
                className={`font-semibold ${
                  message.type === "bot" ? "text-blue-800" : "text-green-800"
                }`}
              >
                {message.type === "bot" ? "Bot:" : "You:"}
              </strong>
              <p className="text-gray-700">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchAnswer()}
            placeholder="Type your question..."
            className="flex-grow p-3 border-2 border-blue-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchAnswer}
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-r hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Faq;
