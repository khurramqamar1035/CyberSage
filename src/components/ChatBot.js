import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [chatLocked, setChatLocked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiry: "",
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const callChatGPT = async (chatMessages) => {
    const res = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: chatMessages,
        questionCount,
      }),
    });
    return res.json();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || chatLocked) return;

    const userMessage = {
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await callChatGPT([...messages, userMessage]);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      if (data.limitReached) {
        setChatLocked(true);
      } else {
        setQuestionCount((prev) => prev + 1);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-cyan-600 rounded-full text-white flex items-center justify-center shadow-lg"
        >
          <MessageCircle size={32} />
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[520px] bg-slate-900 border border-cyan-500/40 rounded-lg shadow-2xl flex flex-col">
          <div className="p-4 bg-cyan-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span>CyberSage AI</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded text-sm ${
                    m.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-gray-200 border border-cyan-500/30"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-cyan-400">
                <Loader2 className="animate-spin" size={18} />
                Thinking...
              </div>
            )}

            {chatLocked && (
              <div className="text-center p-3 border border-cyan-500/30 rounded bg-cyan-500/10">
                <p className="text-cyan-400 mb-2">
                  🔒 Free AI limit reached
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-cyan-600 px-4 py-2 rounded text-white"
                >
                  Click for further queries
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-cyan-500/20 flex gap-2">
            <input
              disabled={chatLocked || isLoading}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about cybersecurity..."
              className="flex-1 bg-slate-800 text-white p-2 rounded border border-cyan-500/30"
            />
            <button
              disabled={chatLocked || isLoading}
              onClick={handleSendMessage}
              className="bg-cyan-600 p-2 rounded text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* CONTACT FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg w-[400px] border border-cyan-500/40">
            <h2 className="text-white mb-4">Contact CyberSage</h2>

            {["firstName", "lastName", "email", "phone"].map((f) => (
              <input
                key={f}
                placeholder={f.replace(/([A-Z])/g, " $1")}
                className="w-full mb-2 p-2 bg-slate-800 text-white border border-cyan-500/30 rounded"
                value={formData[f]}
                onChange={(e) =>
                  setFormData({ ...formData, [f]: e.target.value })
                }
              />
            ))}

            <textarea
              placeholder="Your enquiry..."
              rows={4}
              className="w-full p-2 mb-3 bg-slate-800 text-white border border-cyan-500/30 rounded"
              value={formData.enquiry}
              onChange={(e) =>
                setFormData({ ...formData, enquiry: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-600 p-2 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const res = await fetch(
                    "http://localhost:5001/api/contact",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formData),
                    }
                  );

                  if (res.ok) {
                    alert("✅ Enquiry sent!");
                    setShowForm(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      enquiry: "",
                    });
                  } else {
                    alert("❌ Failed to send enquiry");
                  }
                }}
                className="flex-1 bg-cyan-600 p-2 rounded text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
