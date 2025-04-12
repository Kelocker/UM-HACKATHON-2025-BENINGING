import { IconArrowLeft, IconRobot } from "@tabler/icons-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton.tsx";
import Marquee from "react-fast-marquee";
// @ts-ignore
import aiEventMap from "../assets/aiEvents.json";

const AiBotPage = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your assistant. How can I assist you today?",
      direction: "incoming",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState([
    "Everything is amazing",
    "Weather is nice",
    "I hope you're enjoying your day",
  ]);

  const location = useLocation();
  const state = location.state ?? {};
  const navigate = useNavigate();

  const typeText = (
    text: string,
    callback: (partial: string) => void,
    delay = 25
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, delay);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, direction: "outgoing" };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    const normalized = input.trim().toLowerCase();
    setInput("");

    const event = aiEventMap[normalized] as {
      reply: string;
      suggestions: string[];
    } | undefined;

    if (event) {
      setMessages((prev) => [...prev, { message: "...", direction: "typing" }]);

      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { message: "", direction: "incoming" };
          return updated;
        });

        typeText(event.reply, (partial) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              message: partial,
              direction: "incoming",
            };
            return updated;
          });
        });
      }, Math.min(1000 + event.reply.length * 10, 3000));

      setRecommendations(event.suggestions);
      return;
    }

    await processMessageToChatGPT(userMessage.message);
  };

  const processMessageToChatGPT = async (text: string) => {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const fullReply = data.choices[0].message.content;

        setMessages((prev) => [...prev, { message: "...", direction: "typing" }]);

        setTimeout(() => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              message: "",
              direction: "incoming",
            };
            return updated;
          });

          typeText(fullReply, (partial) => {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                message: partial,
                direction: "incoming",
              };
              return updated;
            });
          });
        }, Math.min(1000 + fullReply.length * 10, 4000)); // Max 4s delay
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an error contacting the AI service.",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleRecommendationClick = (rec: string) => {
    setInput(rec);
    setTimeout(() => handleSend(), 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate(-1)} Icon={IconArrowLeft} />
          <span className="font-bold text-sm">Chat</span>
        </div>
        {state.title ? (
          <div className="flex items-center gap-2">
            <IconButton onClick={() => navigate("/aibot")} Icon={IconRobot} />
          </div>
        ) : null}
      </div>

      {state.title ? (
        <Marquee gradient={false} speed={80} className="bg-lime-400 py-2">
          <div className="text-black font-bold text-sm tracking-wide">
            · {state.title}
          </div>
        </Marquee>
      ) : null}

      <div className="flex-grow p-4 overflow-auto flex flex-col gap-3">
        {messages.map((msg, index) => {
          if (msg.direction === "typing") {
            return (
              <div
                key={index}
                className="bg-gray-100 text-black p-3 rounded-lg max-w-[60%] self-start typing flex gap-1"
              >
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            );
          }

          return (
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
          );
        })}
      </div>

      <div className="px-4 pb-2 flex gap-2 flex-wrap">
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
