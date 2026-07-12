import React, { useState } from "react";
import { MessageSquare, ArrowRight, Sparkles, Send, Phone, Calendar, Users, HelpCircle, GraduationCap, Search, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface AskAIHelpHubProps {
  onAwardPoints: (points: number, reason: string) => void;
  onNavigateTab: (tab: "dashboard" | "curriculum" | "quiz" | "creator" | "details" | "crm" | "help" | "consultation" | "community" | "rewards") => void;
  onAddLeadSimulated: (lead: any) => void;
}

const CATEGORIES = [
  { id: "career", label: "Career & Tech Transition", icon: "💼", example: "Which career path should I choose if I like coding and marketing?" },
  { id: "seo", label: "Next-Gen SEO", icon: "🚀", example: "How do I optimize my website for Google's 2026 search updates?" },
  { id: "ai", label: "AI & GEO Integration", icon: "🤖", example: "What is Generative Engine Optimization (GEO) and how do I rank in ChatGPT?" },
  { id: "business", label: "Business Growth", icon: "📈", example: "How can a traditional brick-and-mortar store scale using digital maps?" },
  { id: "marketing", label: "Marketing Strategy", icon: "📣", example: "What's the best B2B lead generation strategy for a service agency?" },
  { id: "website", label: "Website Audit & SXO", icon: "🌐", example: "How can I improve my website's page speed and user experience metrics?" },
  { id: "interview", label: "Interview Preparation", icon: "🎤", example: "What are the top SEO specialist interview questions for enterprise roles?" },
  { id: "freelancing", label: "Freelancing & Client Acquisition", icon: "🤝", example: "How do I land my first high-paying freelance digital marketing client?" },
];

const PRE_FILLED_QUESTIONS: Record<string, string[]> = {
  career: [
    "How can I switch from marketing into SEO and tech?",
    "Should I learn coding or focus entirely on AI search mechanics?",
    "What is the average package of an Enterprise SEO strategist?"
  ],
  seo: [
    "What are the biggest ranking factors for Google Search in 2026?",
    "How do I do keyword research for natural language questions?",
    "How do I optimize schemas to get voice search rich snippets?"
  ],
  ai: [
    "How can I trace if ChatGPT or Gemini is mentioning my brand?",
    "What is Generative Engine Optimization (GEO)?",
    "How do I build an AI-friendly content strategy?"
  ],
  business: [
    "How do I build an SEO roadmap for a funded startup?",
    "What metrics should I track to prove ROI to stakeholders?",
    "How do I build high-ROI assets that generate organic backlinks?"
  ]
};

export default function AskAIHelpHub({ onAwardPoints, onNavigateTab, onAddLeadSimulated }: AskAIHelpHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("seo");
  const [queryText, setQueryText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "model"; text: string }>>([]);
  const [escalated, setEscalated] = useState<boolean>(false);
  const [leadFormOpen, setLeadFormOpen] = useState<boolean>(false);

  // Quick Lead Capture for hybrid flow
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleAskAmrish = async (questionToAsk?: string) => {
    const text = (questionToAsk || queryText).trim();
    if (!text) return;

    setIsGenerating(true);
    setAiResponse(null);
    setQueryText("");

    const newHistory = [...chatHistory, { role: "user" as const, text }];
    setChatHistory(newHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          category: CATEGORIES.find(c => c.id === selectedCategory)?.label,
          history: chatHistory
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setAiResponse(data.text);
        setChatHistory([...newHistory, { role: "model" as const, text: data.text }]);
        
        // Award gamification points!
        onAwardPoints(10, "Asked Amrish a specialized question");
      } else {
        throw new Error(data.error || "Failed to fetch response");
      }
    } catch (err: any) {
      console.error(err);
      setAiResponse(`Hi there! I would love to answer that, but I'm having a connection hiccup right now. Let me summarize: optimizing for search in 2026 relies strongly on Entity mapping, Semantic Schema integration, and high user-experience relevance. Please feel free to schedule a free call with me on WhatsApp directly to chat about "${text}"!`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEscalateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: leadName,
      email: leadEmail,
      organization: "AI Help Hub Transition",
      interest: "SEO/Career Growth",
      message: `[AI HELP HUB ESCALATION] Question asked: ${chatHistory[chatHistory.length - 2]?.text || "General help"}\n\nUser Notes: ${leadNote}\nPhone: ${leadPhone}`,
      status: "New" as const,
      createdAt: new Date().toISOString()
    };

    onAddLeadSimulated(newLead);
    setLeadSubmitted(true);
    onAwardPoints(50, "Booked a professional 15-min call");
    
    setTimeout(() => {
      setLeadFormOpen(false);
      setLeadSubmitted(false);
      setLeadName("");
      setLeadEmail("");
      setLeadPhone("");
      setLeadNote("");
      onNavigateTab("consultation");
    }, 2000);
  };

  return (
    <div className="space-y-8" id="help-hub-view">
      {/* Visual Header */}
      <div className="p-6 md:p-8 bg-neutral-900 text-white rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.05] text-white pointer-events-none">
          <MessageSquare size={260} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-300 rounded-full border border-amber-400/20 text-xs font-semibold">
            <Sparkles size={14} />
            <span>INSTANT AI MENTORSHIP ENGINE</span>
          </div>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-sans font-bold tracking-tight">
              Ask Amrish &amp; Help Hub
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              I am always available to help you. Choose a category below, input your query, and get an immediate, expert-grounded answer.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Left sidebar selection, Right interactive search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Categories list */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
            <h2 className="text-sm font-sans font-bold text-neutral-800 tracking-tight flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-500" />
              <span>Select Help Category</span>
            </h2>
            <div className="space-y-1">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setAiResponse(null);
                    setChatHistory([]);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-neutral-950 text-white shadow-sm"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <span className="text-sm">{category.icon}</span>
                  <span className="truncate">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick FAQ / Pre-filled helpers */}
          {PRE_FILLED_QUESTIONS[selectedCategory] && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
              <h3 className="text-[11px] font-mono font-bold uppercase text-amber-800 tracking-wider">
                💡 Typical Questions:
              </h3>
              <div className="space-y-2">
                {PRE_FILLED_QUESTIONS[selectedCategory].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQueryText(q);
                      handleAskAmrish(q);
                    }}
                    className="w-full text-left p-2.5 bg-white hover:bg-amber-100/55 text-neutral-700 hover:text-neutral-900 border border-neutral-100 rounded-xl text-[11px] font-medium leading-relaxed transition-all shadow-3xs cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{q}</span>
                    <ArrowRight size={12} className="text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive chat & hybrid escalate */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 space-y-6">
            
            {/* Chat message logs */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto scrollbar-none pr-1">
              {chatHistory.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="h-12 w-12 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare size={22} />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <p className="text-xs font-bold text-neutral-800">
                      Hi, I'm Amrish! Ask me anything about {CATEGORIES.find(c => c.id === selectedCategory)?.label || "your digital career"}.
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Submit your question below. I will compile an instant structured response immediately.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role !== "user" && (
                        <div className="h-8 w-8 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 self-start shadow-3xs">
                          AK
                        </div>
                      )}
                      
                      <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed space-y-2 shadow-3xs ${
                        msg.role === "user"
                          ? "bg-neutral-900 text-white rounded-tr-none"
                          : "bg-neutral-50 text-neutral-800 rounded-tl-none border border-neutral-100"
                      }`}>
                        <p className="font-semibold whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      {msg.role === "user" && (
                        <div className="h-8 w-8 bg-amber-500 text-neutral-900 rounded-xl flex items-center justify-center font-black text-xs shrink-0 self-start shadow-3xs">
                          ME
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {isGenerating && (
                <div className="flex gap-3.5 justify-start animate-pulse">
                  <div className="h-8 w-8 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
                    AK
                  </div>
                  <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-2xl rounded-tl-none max-w-xl w-full space-y-2">
                    <div className="h-2 w-1/4 bg-neutral-200 rounded"></div>
                    <div className="h-2 w-3/4 bg-neutral-200 rounded"></div>
                    <div className="h-2 w-1/2 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="flex items-center gap-2 pt-4 border-t border-neutral-150">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAmrish()}
                placeholder={`Ask Amrish a question about ${CATEGORIES.find(c => c.id === selectedCategory)?.label}...`}
                disabled={isGenerating}
                className="flex-1 bg-neutral-50 border border-neutral-250 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none text-xs rounded-xl px-4 py-3 text-neutral-900 transition-all placeholder:text-neutral-400"
              />
              <button
                onClick={() => handleAskAmrish()}
                disabled={isGenerating || !queryText.trim()}
                className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* AI + Human Hybrid CTA Panel (Available once they submit questions) */}
          {chatHistory.length > 0 && !isGenerating && (
            <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-3xl p-6 space-y-4 animate-fade-in shadow-3xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-neutral-900 text-sm">
                    Still Need Help? Get Direct Mentor Consultation
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    AI responses provide excellent foundational rules, but premium results come from personal strategy. Connect directly with Amrish or the board:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href={`https://wa.me/918318114492?text=${encodeURIComponent(`Hi Amrish, I am learning on AskAmrish.com and wanted to ask about: ${chatHistory[chatHistory.length - 2]?.text || "SEO & Career Growth"}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onAwardPoints(15, "Initiated WhatsApp consultation")}
                  className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200/80 rounded-xl transition-all shadow-3xs flex flex-col justify-between h-[110px] group text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">💬</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-mono font-black rounded">FREE</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 group-hover:text-emerald-700">Chat on WhatsApp</h4>
                    <p className="text-[10px] text-neutral-400">10-min immediate message advice</p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => setLeadFormOpen(true)}
                  className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all shadow-3xs flex flex-col justify-between h-[110px] group text-left cursor-pointer border border-neutral-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base text-amber-400">📅</span>
                    <span className="px-1.5 py-0.5 bg-amber-400/20 text-amber-300 text-[8px] font-mono font-black rounded">+50 XP</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">Book 15-Min Strategy</h4>
                    <p className="text-[10px] text-neutral-300">Schedule video audit call</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab("community")}
                  className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200/80 rounded-xl transition-all shadow-3xs flex flex-col justify-between h-[110px] group text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">👥</span>
                    <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[8px] font-mono font-black rounded">+10 XP</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 group-hover:text-indigo-700">Ask Community</h4>
                    <p className="text-[10px] text-neutral-400">Submit publicly for SEO traffic</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Escalation Lead modal */}
      {leadFormOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Book Your 15-Min Discovery Session</h3>
                <p className="text-xs text-neutral-500">I personally audit websites and plan careers for high performers.</p>
              </div>
              <button onClick={() => setLeadFormOpen(false)} className="text-neutral-400 hover:text-neutral-700 text-sm font-bold">✕</button>
            </div>

            {leadSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Discovery Session Requested!</h4>
                  <p className="text-xs text-neutral-500">Amrish will follow up in 2-4 business hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEscalateLead} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Phone/WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">What specific challenge should we solve?</label>
                  <textarea
                    value={leadNote}
                    onChange={(e) => setLeadNote(e.target.value)}
                    placeholder="Describe your goals..."
                    rows={2}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-805 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Calendar size={13} />
                    <span>Confirm Free Discovery Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
