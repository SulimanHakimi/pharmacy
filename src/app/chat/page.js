"use client";

import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User as UserIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "سلام! زه ستاسو هوښيار درمل جوړونکی مرستیال یم. زه نن څنګه ستاسو سره مرسته کولی شم؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add a placeholder assistant message that will be filled live
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      // ────── STREAMING STARTS HERE ──────
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Append chunk to the last (assistant) message
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === "assistant") {
            lastMsg.content += chunk;
          }
          return newMessages;
        });
      }
      // ────── STREAMING ENDS ──────

    } catch (error) {
      console.error("Chat streaming error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.role === "assistant") {
          lastMsg.content = "بخښنه غواړم، د اتصال یوه ستونزه رامنځته شوه. مهرباني وکړئ بیا هڅه وکړئ.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 pb-24 px-4 max-w-4xl mx-auto w-full flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-6 p-4 rounded-lg bg-[#112240] border border-gray-800 shadow-xl mb-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-[#64ffda] text-[#0a192f]"
                    : "bg-[#233554] text-[#64ffda]"
                }`}
              >
                {msg.role === "user" ? <UserIcon size={20} /> : <Bot size={20} />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-[#64ffda] text-[#0a192f]"
                    : "bg-[#233554] text-gray-200"
                }`}
              >
                <p className="whitespace-pre-wrap text-right leading-relaxed" dir="rtl">
                  {msg.content || (msg.role === "assistant" && isLoading && "تفکر کوي...")}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator inside the last bubble */}
          {isLoading && messages[messages.length - 1]?.role === "assistant" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#233554] flex items-center justify-center shrink-0">
                <Bot size={20} className="text-[#64ffda]" />
              </div>
              <div className="p-4 rounded-2xl bg-[#233554] flex items-center gap-3">
                <Loader2 className="animate-spin text-[#64ffda]" size={20} />
                <span className="text-gray-400">لیکي...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="د درملو یا روغتیا په اړه پوښتنه وکړئ..."
            className="w-full bg-[#112240] border border-gray-700 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda] text-right disabled:opacity-50"
            disabled={isLoading}
            dir="rtl"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute left-2 top-2 p-2 bg-[#64ffda] text-[#0a192f] rounded-full hover:bg-[#4fd1c5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} className="rotate-180" />
          </button>
        </form>
      </div>
    </main>
  );
}