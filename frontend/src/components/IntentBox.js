import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./IntentBox.css";

function IntentBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async () => {
    if (!input.trim() || isBlocked) return;
  
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);
  
    try {
      const res = await axios.post("http://localhost:5000/api/intent", {
        input,
      });
  
      if (
        res.data.context ===
        "Session history limit reached. Please refresh to start a new session."
      ) {
        setIsBlocked(true);
        alert("You've reached the session limit. Please refresh to continue.");
      }
  
      const aiMessages = [
        { sender: "ai", text: "🧠 Context" },
        { sender: "ai", text: res.data.context },
        { sender: "ai", text: "📊 Panda Query" },
        { sender: "ai", text: res.data.panda_query || "null" },
        { sender: "ai", text: "📂 Required DataFrames" },
        {
          sender: "ai",
          text: res.data.required_dataframes
            ? JSON.stringify(res.data.required_dataframes, null, 2)
            : "None",
        },
        { sender: "ai", text: "🔍 Reasoning" },
        { sender: "ai", text: res.data.reasoning },
      ];
  
      // ✅ Append AI messages to chat
      setMessages((prev) => [...prev, ...aiMessages]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "🧠 Context" },
        { sender: "ai", text: "Error" },
        { sender: "ai", text: "📊 Panda Query" },
        { sender: "ai", text: "null" },
        { sender: "ai", text: "📂 Required DataFrames" },
        { sender: "ai", text: "Unavailable due to error." },
        { sender: "ai", text: "🔍 Reasoning" },
        { sender: "ai", text: "Failed to connect to backend." },
      ]);
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Grabpt</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isBlocked ? "Session ended. Please refresh." : "Ask me anything"
          }
          disabled={isBlocked}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit} disabled={loading || isBlocked}>
          {loading ? "..." : "→"}
        </button>
      </div>

      {isBlocked && (
        <button className="refresh-button" onClick={() => window.location.reload()}>
          🔄 Refresh Session
        </button>
      )}
    </div>
  );
}

export default IntentBox;
