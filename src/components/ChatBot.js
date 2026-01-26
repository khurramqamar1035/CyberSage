import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

export default function ChatBot() {
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

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const callChatGPT = async (chatMessages) => {
    const res = await fetch(`${backendURL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages, questionCount }),
    });
    return res.json();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || chatLocked) return;

    const userMessage = { role: "user", content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await callChatGPT([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      if (data.limitReached) setChatLocked(true);
      else setQuestionCount((prev) => prev + 1);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitContactForm = async () => {
    try {
      const res = await fetch(`${backendURL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Enquiry sent!");
        setShowForm(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", enquiry: "" });
      } else {
        alert("❌ Failed to send enquiry");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send enquiry");
    }
  };

  return React.createElement(
    "div",
    { className: "fixed bottom-6 right-6 z-50" },
    !isOpen &&
      React.createElement(
        "button",
        {
          onClick: () => setIsOpen(true),
          className: "w-16 h-16 bg-cyan-600 rounded-full text-white flex items-center justify-center shadow-lg",
        },
        React.createElement(MessageCircle, { size: 32 })
      ),
    isOpen &&
      React.createElement(
        "div",
        { className: "w-96 h-[520px] bg-slate-900 border border-cyan-500/40 rounded-lg shadow-2xl flex flex-col" },
        React.createElement(
          "div",
          { className: "p-4 bg-cyan-600 text-white flex justify-between items-center" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(Bot, { size: 18 }),
            React.createElement("span", null, "CyberSage AI")
          ),
          React.createElement("button", { onClick: () => setIsOpen(false) }, React.createElement(X, { size: 20 }))
        ),
        React.createElement(
          "div",
          { className: "flex-1 p-4 overflow-y-auto space-y-4" },
          messages.map((m, i) =>
            React.createElement(
              "div",
              { key: i, className: m.role === "user" ? "flex justify-end" : "flex justify-start" },
              React.createElement(
                "div",
                {
                  className:
                    "max-w-[75%] p-3 rounded text-sm " +
                    (m.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-gray-200 border border-cyan-500/30"),
                },
                m.content
              )
            )
          ),
          isLoading &&
            React.createElement(
              "div",
              { className: "flex items-center gap-2 text-cyan-400" },
              React.createElement(Loader2, { className: "animate-spin", size: 18 }),
              "Thinking..."
            ),
          chatLocked &&
            React.createElement(
              "div",
              { className: "text-center p-3 border border-cyan-500/30 rounded bg-cyan-500/10" },
              React.createElement(
                "p",
                { className: "text-cyan-400 mb-2" },
                "🔒 Free AI limit reached"
              ),
              React.createElement(
                "button",
                { onClick: () => setShowForm(true), className: "bg-cyan-600 px-4 py-2 rounded text-white" },
                "Click for further queries"
              )
            ),
          React.createElement("div", { ref: messagesEndRef })
        ),
        React.createElement(
          "div",
          { className: "p-4 border-t border-cyan-500/20 flex gap-2" },
          React.createElement("input", {
            disabled: chatLocked || isLoading,
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSendMessage(),
            placeholder: "Ask about cybersecurity...",
            className: "flex-1 bg-slate-800 text-white p-2 rounded border border-cyan-500/30",
          }),
          React.createElement(
            "button",
            {
              disabled: chatLocked || isLoading,
              onClick: handleSendMessage,
              className: "bg-cyan-600 p-2 rounded text-white",
            },
            React.createElement(Send, { size: 18 })
          )
        ),
        showForm &&
          React.createElement(
            "div",
            { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50" },
            React.createElement(
              "div",
              { className: "bg-slate-900 p-6 rounded-lg w-[400px] border border-cyan-500/40" },
              React.createElement("h2", { className: "text-white mb-4" }, "Contact CyberSage"),
              ["firstName", "lastName", "email", "phone"].map((f) =>
                React.createElement("input", {
                  key: f,
                  placeholder: f.replace(/([A-Z])/g, " $1"),
                  className: "w-full mb-2 p-2 bg-slate-800 text-white border border-cyan-500/30 rounded",
                  value: formData[f],
                  onChange: (e) => setFormData({ ...formData, [f]: e.target.value }),
                })
              ),
              React.createElement("textarea", {
                placeholder: "Your enquiry...",
                rows: 4,
                className: "w-full p-2 mb-3 bg-slate-800 text-white border border-cyan-500/30 rounded",
                value: formData.enquiry,
                onChange: (e) => setFormData({ ...formData, enquiry: e.target.value }),
              }),
              React.createElement(
                "div",
                { className: "flex gap-2" },
                React.createElement(
                  "button",
                  { onClick: () => setShowForm(false), className: "flex-1 bg-gray-600 p-2 rounded text-white" },
                  "Cancel"
                ),
                React.createElement(
                  "button",
                  { onClick: submitContactForm, className: "flex-1 bg-cyan-600 p-2 rounded text-white" },
                  "Submit"
                )
              )
            )
          )
      )
  );
}
