import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Send, Search, Users, Sparkles, HelpCircle, AlertCircle, CheckCircle } from "lucide-react";

interface CommunityQuestion {
  id: string;
  title: string;
  category: string;
  author: string;
  role: "Student" | "Founder" | "SEO Specialist" | "Developer" | string;
  content: string;
  votes: number;
  voted?: boolean;
  createdAt: string;
  replies: Array<{
    author: string;
    isAmrish: boolean;
    content: string;
    createdAt: string;
  }>;
}

interface AskCommunityProps {
  onAwardPoints: (points: number, reason: string) => void;
  userPoints: number;
}

const INITIAL_COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: "q-1",
    title: "How do I deal with Google's SGE indexing zero-click searches?",
    category: "Next-Gen SEO",
    author: "Amit Patel",
    role: "SEO Specialist",
    content: "With Google displaying complete AI overviews on the search result page directly, my informational blogs are losing organic clicks. How should I pivot my content strategy?",
    votes: 42,
    createdAt: "2026-06-15T10:30:00.000Z",
    replies: [
      {
        author: "Amrish Kumar Singh",
        isAmrish: true,
        content: "Great question, Amit. informational 'zero-click' searches are indeed rising. The solution is to pivot your content away from basic definitions (which AI answers instantly) and towards high-ROI experiential assets: original case studies, survey results, proprietary formulas, or interactive tools. Also, ensure your Schema.org structures are optimized so Google attributes your brand as the direct source in the AI snapshot citations.",
        createdAt: "2026-06-15T11:45:00.000Z"
      }
    ]
  },
  {
    id: "q-2",
    title: "Should I learn Next.js or WordPress for modern SEO career growth?",
    category: "Career & Tech Transition",
    author: "Divya Sen",
    role: "Student",
    content: "I want to transition into digital tech optimization. Many traditional agencies use WordPress, but technical SEO guides mention Next.js, Headless CMS, and structured routing. What should I prioritize?",
    votes: 28,
    createdAt: "2026-06-14T08:15:00.000Z",
    replies: [
      {
        author: "Amrish Kumar Singh",
        isAmrish: true,
        content: "Divya, learn WordPress first because ~43% of the internet runs on it and it has the lowest barrier to entry. However, if you want to stand out in the top 5% of Enterprise SEO roles, learn headless React architectures (like Next.js) and understand Core Web Vitals (LCP, INP). Being a hybrid digital marketer who can edit code is a massive superpower.",
        createdAt: "2026-06-14T10:00:00.000Z"
      }
    ]
  },
  {
    id: "q-3",
    title: "How to trace if ChatGPT Search is recommending our SaaS brand?",
    category: "AI & GEO Integration",
    author: "Vikram Malhotra",
    role: "Founder",
    content: "We launched a B2B SaaS platform. Standard GSC doesn't track ChatGPT referrals. How do we measure generative engine visibility?",
    votes: 35,
    createdAt: "2026-06-12T14:20:00.000Z",
    replies: [
      {
        author: "Amrish Kumar Singh",
        isAmrish: true,
        content: "Hi Vikram. Since OpenAI doesn't expose clean query reports yet, you have to trace this using referral traffic strings in GA4 (look for referrals from chatgpt.com or search.chatgpt.com) and combine it with brand-mention audits. Use LLM API scraping models to run routine prompt testing like 'What are the top SaaS tools for X?' and check if your brand is recommended.",
        createdAt: "2026-06-12T15:30:00.000Z"
      }
    ]
  }
];

export default function AskCommunity({ onAwardPoints, userPoints }: AskCommunityProps) {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => {
    const saved = localStorage.getItem("lms_community_questions");
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_QUESTIONS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<CommunityQuestion | null>(null);
  
  // Submit new question
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Next-Gen SEO");
  const [newContent, setNewContent] = useState("");
  const [askModalOpen, setAskModalOpen] = useState(false);

  // Submit new reply
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    localStorage.setItem("lms_community_questions", JSON.stringify(questions));
  }, [questions]);

  const handleUpvote = (e: React.MouseEvent, qId: string) => {
    e.stopPropagation();
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        if (q.voted) {
          return { ...q, votes: q.votes - 1, voted: false };
        } else {
          onAwardPoints(2, "Upvoted a community question");
          return { ...q, votes: q.votes + 1, voted: true };
        }
      }
      return q;
    }));

    // Update selected question if it's currently open
    if (selectedQuestion && selectedQuestion.id === qId) {
      setSelectedQuestion(prev => {
        if (!prev) return null;
        return {
          ...prev,
          votes: prev.voted ? prev.votes - 1 : prev.votes + 1,
          voted: !prev.voted
        };
      });
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newQuestion: CommunityQuestion = {
      id: `q-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: "Verified Student",
      role: "SEO Apprentice",
      content: newContent.trim(),
      votes: 1,
      voted: true,
      createdAt: new Date().toISOString(),
      replies: []
    };

    setQuestions(prev => [newQuestion, ...prev]);
    onAwardPoints(10, "Published a public Q&A question");
    
    // Reset form
    setNewTitle("");
    setNewContent("");
    setAskModalOpen(false);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedQuestion) return;

    const newReply = {
      author: "Verified Apprentice",
      isAmrish: false,
      content: replyText.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestion.id) {
        return {
          ...q,
          replies: [...q.replies, newReply]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setSelectedQuestion(prev => {
      if (!prev) return null;
      return {
        ...prev,
        replies: [...prev.replies, newReply]
      };
    });

    onAwardPoints(20, "Answered/replied to a community question");
    setReplyText("");
  };

  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8" id="community-view">
      {/* Banner */}
      <div className="p-6 md:p-8 bg-indigo-900 text-white rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.05] text-white pointer-events-none">
          <Users size={260} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-400/20 text-xs font-semibold">
            <Users size={14} />
            <span>COMMUNITY SEARCH DRIVEN FORUM</span>
          </div>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-sans font-bold tracking-tight">
              Ask Community &amp; Public Q&amp;A
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Share queries, read replies from other specialists, or contribute answers to earn community points and build authority.
            </p>
          </div>
        </div>
      </div>

      {/* Main Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Questions List / Thread details */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/80 p-4 rounded-2xl shadow-3xs">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-3.5 text-neutral-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community threads..."
                className="w-full bg-neutral-50 border border-neutral-250 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none text-xs rounded-xl pl-9 pr-4 py-2.5"
              />
            </div>

            <button
              onClick={() => setAskModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-neutral-805 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Ask Community (+10 XP)</span>
            </button>
          </div>

          {selectedQuestion ? (
            /* Open Question Thread */
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 space-y-6 animate-fade-in">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 focus:outline-none"
              >
                ← Back to Threads
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-mono font-black uppercase rounded-md">
                    {selectedQuestion.category}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Asked by {selectedQuestion.author} ({selectedQuestion.role})
                  </span>
                </div>

                <h2 className="text-lg font-sans font-extrabold text-neutral-900 leading-snug">
                  {selectedQuestion.title}
                </h2>

                <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {selectedQuestion.content}
                </p>

                <div className="flex items-center gap-4 pt-2 border-b border-neutral-100 pb-4">
                  <button
                    onClick={(e) => handleUpvote(e, selectedQuestion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-bold transition-all ${
                      selectedQuestion.voted
                        ? "bg-amber-500 border-amber-400 text-neutral-950 shadow-3xs"
                        : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>{selectedQuestion.votes} Upvotes</span>
                  </button>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {new Date(selectedQuestion.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Replies list */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
                  💬 Discussion &amp; Answers ({selectedQuestion.replies.length})
                </h3>

                {selectedQuestion.replies.length === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-400">
                    No community replies yet. Be the first to answer (+20 XP)!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedQuestion.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          reply.isAmrish
                            ? "bg-emerald-50/50 border-emerald-200/60 shadow-3xs"
                            : "bg-neutral-50/50 border-neutral-150"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">{reply.author}</span>
                            {reply.isAmrish && (
                              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-mono font-black rounded-md inline-flex items-center gap-1">
                                <CheckCircle size={9} /> Verified Amrish Answer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleAddReply} className="space-y-3.5 pt-4 border-t border-neutral-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Your Answer/Reply *</label>
                  <textarea
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Contribute your expertise to earn +20 community XP points..."
                    rows={3}
                    className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-4 py-3 text-xs resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send size={12} />
                    <span>Post Reply (+20 XP)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Threads Grid */
            <div className="grid grid-cols-1 gap-4">
              {filteredQuestions.length === 0 ? (
                <div className="p-12 text-center bg-white border border-neutral-200 rounded-3xl space-y-2">
                  <div className="text-neutral-300 text-4xl">👥</div>
                  <h3 className="text-xs font-bold text-neutral-800">No community threads found</h3>
                  <p className="text-[11px] text-neutral-500">Be the first to ask a query under this category!</p>
                </div>
              ) : (
                filteredQuestions.map(q => (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className="p-5 bg-white hover:bg-neutral-50/40 border border-neutral-200/80 rounded-2xl shadow-3xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between h-[180px]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8.5px] font-mono font-black uppercase rounded">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          by {q.author} • {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-sm font-sans font-bold text-neutral-900 tracking-tight leading-snug line-clamp-1">
                        {q.title}
                      </h3>

                      <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                        {q.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
                      <button
                        onClick={(e) => handleUpvote(e, q.id)}
                        className={`p-1.5 border rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all ${
                          q.voted
                            ? "bg-amber-500 border-amber-400 text-neutral-950"
                            : "bg-white hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        <ThumbsUp size={10} />
                        <span>{q.votes} Upvotes</span>
                      </button>

                      <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 font-sans">
                        <MessageSquare size={10} />
                        <span>{q.replies.length} Replies ({q.replies.some(r => r.isAmrish) ? "Expert Answered" : "Active"})</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Column: Community Sidebar info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-3xs">
            <h3 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
              🏆 Top Community Contributors
            </h3>
            
            <div className="space-y-3">
              {[
                { name: "Amrish Kumar Singh", points: "Global Admin", rank: "Mentor", icon: "👑" },
                { name: "Divya Sen", points: "450 XP", rank: "Top Specialist", icon: "🥈" },
                { name: "Rahul Sharma", points: "320 XP", rank: "Contributor", icon: "🥉" },
                { name: "Vikram Malhotra", points: "150 XP", rank: "Syllabus Explorer", icon: "🎖️" },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-neutral-50 border border-neutral-150 rounded-xl">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{user.icon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 truncate leading-none mb-1">{user.name}</h4>
                      <p className="text-[9px] text-neutral-400 font-medium leading-none">{user.rank}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-neutral-700 bg-white border px-1.5 py-0.5 rounded shrink-0">{user.points}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-neutral-800 flex items-center gap-1">
              <Sparkles size={14} className="text-amber-600 animate-pulse" />
              <span>Community Point Mechanics</span>
            </h3>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Earn community XP points by engaging with queries:
            </p>
            <div className="space-y-2 font-mono text-[10px] text-amber-900 font-semibold">
              <div className="flex justify-between border-b border-amber-100 pb-1">
                <span>Ask Community:</span>
                <span>+10 XP</span>
              </div>
              <div className="flex justify-between border-b border-amber-100 pb-1">
                <span>Reply / Answer Thread:</span>
                <span>+20 XP</span>
              </div>
              <div className="flex justify-between">
                <span>Upvote Helpful Thread:</span>
                <span>+2 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question modal */}
      {askModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Ask the AskAmrish Public Community</h3>
                <p className="text-xs text-neutral-500">Post your challenge. Let's solve it together (+10 XP).</p>
              </div>
              <button onClick={() => setAskModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800"
                >
                  <option value="Next-Gen SEO">Next-Gen SEO</option>
                  <option value="Career & Tech Transition">Career & Tech Transition</option>
                  <option value="AI & GEO Integration">AI & GEO Integration</option>
                  <option value="Business Growth">Business Growth</option>
                  <option value="Website Audit & SXO">Website Audit & SXO</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Question Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. What is the impact of schema markup on voice search indexing?"
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Question details *</label>
                <textarea
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your query in detail. Include links or code snippets if helpful..."
                  rows={4}
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-805 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Publish to Q&amp;A Board (+10 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
