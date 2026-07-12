import React, { useState } from "react";
import { MessageSquare, Send, Phone, Calendar, Sparkles, X, ChevronUp, Zap } from "lucide-react";

interface FloatingAskButtonProps {
  onAwardPoints: (points: number, reason: string) => void;
  onNavigateTab: (tab: "dashboard" | "curriculum" | "quiz" | "creator" | "details" | "crm" | "help" | "consultation" | "community" | "rewards") => void;
}

const QUICK_TAGS = ["Career Transition 💼", "Next-Gen SEO 🚀", "Generative SEO 🤖", "Business Growth 📈"];

export default function FloatingAskButton({ onAwardPoints, onNavigateTab }: FloatingAskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([
    { role: "model", text: "Hi! 👋 I'm Amrish. Ask me any question about your digital career, SEO, WordPress, or marketing strategies. How can I help you today?" }
  ]);

  const handleSendMessage = async (textToSubmit?: string) => {
    const text = (textToSubmit || inputText).trim();
    if (!text) return;

    setInputText("");
    const newMessages = [...messages, { role: "user" as const, text }];
    setMessages(newMessages);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          category: "Floating Quick Chat",
          history: messages.slice(-4) // Keep history compact
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages([...newMessages, { role: "model" as const, text: data.text }]);
        onAwardPoints(10, "Asked quick question to Amrish via floating widget");
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, {
        role: "model",
        text: "I'm having a brief connection issue, but let's connect! I would love to answer that personally on WhatsApp or we can book a discovery video call right now!"
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-neutral-900" id="floating-ask-widget">
      
      {/* Expanded chat drawer */}
      {isOpen && (
        <div className="bg-white border border-neutral-250 shadow-2xl rounded-3xl w-[350px] sm:w-[380px] h-[480px] flex flex-col justify-between overflow-hidden mb-4 animate-scale-up">
          
          {/* Header */}
          <div className="bg-neutral-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-amber-500 text-neutral-950 rounded-xl flex items-center justify-center font-black text-xs animate-pulse">
                AK
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">Amrish Kumar Singh</h4>
                <p className="text-[9px] text-emerald-400 font-mono mt-1 font-bold">● ALWAYS ONLINE TO HELP</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-none space-y-3 bg-neutral-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                  <div className="h-6 w-6 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-black text-[9px] shrink-0 self-start">
                    AK
                  </div>
                )}
                
                <div className={`p-3 rounded-2xl text-[11px] leading-relaxed max-w-[240px] shadow-3xs ${
                  msg.role === "user"
                    ? "bg-neutral-900 text-white rounded-tr-none"
                    : "bg-white border border-neutral-150 text-neutral-800 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex gap-2.5 justify-start animate-pulse">
                <div className="h-6 w-6 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0">
                  AK
                </div>
                <div className="p-3 bg-white border border-neutral-150 rounded-2xl rounded-tl-none w-[140px] space-y-1">
                  <div className="h-1.5 w-1/3 bg-neutral-200 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-neutral-200 rounded"></div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Category Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2.5 bg-white border-t border-neutral-100 flex flex-wrap gap-1.5">
              {QUICK_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const cleanTag = tag.replace(/[^a-zA-Z-\s]/g, "").trim();
                    handleSendMessage(`Give me advice about ${cleanTag}`);
                  }}
                  className="px-2 py-1 bg-neutral-100 hover:bg-amber-100/50 hover:text-amber-950 border border-neutral-200 rounded-lg text-[9.5px] font-bold text-neutral-600 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Escalated CTA Buttons */}
          <div className="px-4 py-2 bg-amber-50/60 border-t border-neutral-150 flex items-center justify-between gap-2">
            <a
              href="https://wa.me/918318114492"
              target="_blank"
              rel="noreferrer"
              onClick={() => onAwardPoints(15, "Initiated WhatsApp chat via float widget")}
              className="flex-1 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-xl text-[10px] font-bold transition-all shadow-3xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Phone size={10} className="text-emerald-500" />
              <span>WhatsApp Advice</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateTab("consultation");
              }}
              className="flex-1 py-1.5 bg-neutral-950 hover:bg-neutral-805 text-white rounded-xl text-[10px] font-bold transition-all shadow-3xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Calendar size={10} className="text-amber-400" />
              <span>Book Call</span>
            </button>
          </div>

          {/* Input Form footer */}
          <div className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask Amrish a question..."
              className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-neutral-950 outline-none text-[11px] rounded-lg px-3 py-2 text-neutral-900 transition-colors placeholder:text-neutral-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isGenerating}
              className="p-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send size={11} />
            </button>
          </div>
        </div>
      )}

      {/* Circular floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full shadow-2xl hover:shadow-amber-500/10 transition-all cursor-pointer border border-neutral-800 shrink-0 transform hover:scale-105 active:scale-95 group relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
        <MessageSquare size={16} className="text-amber-400" />
        <span className="text-xs font-bold font-sans tracking-wide">💬 Ask Amrish</span>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>

    </div>
  );
}
