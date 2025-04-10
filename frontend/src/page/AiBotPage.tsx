import { IconArrowLeft } from "@tabler/icons-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton.tsx";

const AiBotPage = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your assistant. How can I assist you today?",
      direction: "incoming",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const state = location.state;
  console.log("location state now", state);

  // Sample recommendations
  const recommendations = [
    "Everything is amazing",
    "Weather is nice",
    "I hope you're enjoying your day",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, direction: "outgoing" };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setInput("");

    await processMessageToChatGPT(userMessage.message);
  };

  const processMessageToChatGPT = async (text: string) => {
    const requestBody = {
      model: "gpt-3.5-turbo",
      prompt: text,
      max_tokens: 150,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const botMessage = {
          message: data.choices[0].text,
          direction: "incoming",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
    setIsTyping(false);
  };

  const handleRecommendationClick = (rec: string) => {
    setInput(rec);
    setTimeout(() => handleSend(), 0);
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate(-1)} Icon={IconArrowLeft} />
          <span className="font-bold text-sm">Chat</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-sm" />
          <div className="w-4 h-4 bg-black rounded-sm" />
        </div> */}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-auto flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[60%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.direction === "incoming"
                ? "bg-gray-100 text-black self-start"
                : "bg-black text-white self-end"
            }`}
          >
            {msg.message}
          </div>
        ))}

        {isTyping && (
          <div className="bg-gray-100 text-black p-3 rounded-lg max-w-[60%] self-start typing flex gap-1">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
      </div>

      <div className="px-4 pb-2 flex gap-2">
        {recommendations.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-200 px-3 py-2 rounded cursor-pointer text-sm"
            onClick={() => handleRecommendationClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t border-gray-300">
        <input
          className="flex-grow p-2 border rounded border-gray-300 text-sm"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button
          className="bg-black text-white px-4 py-2 rounded text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiBotPage;
