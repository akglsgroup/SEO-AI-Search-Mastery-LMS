import React, { useState } from "react";
import { Award, Gift, Send, Zap, Clock, ShieldCheck, Mail, CheckCircle, Flame, Sparkles, ArrowRight, BookOpen } from "lucide-react";

interface GamificationRewardsProps {
  userPoints: number;
  streakCount: number;
  onAwardPoints: (points: number, reason: string) => void;
  pointLogs: Array<{ id: string; points: number; reason: string; timestamp: string }>;
}

const REWARDS_STORE = [
  {
    id: "reward-1",
    title: "Pro SEO Site Audit Checklist PDF",
    cost: 150,
    category: "Study Asset",
    description: "Amrish's personal high-ticket client audit blueprint document (Excel + PDF template).",
    redeemMsg: "Your download code: DOWNLOAD-AUDIT-2026. Link: https://askamrish.com/dl/audit_v4.pdf",
    icon: "📄"
  },
  {
    id: "reward-2",
    title: "High-Ticket Client Cold Outreach Bundle",
    cost: 200,
    category: "Career Transition",
    description: "6 copy-paste email and LinkedIn templates used to secure ₹50,000+/month freelance clients.",
    redeemMsg: "Your access code: COLD-PITCH-99X. Link: https://askamrish.com/dl/outreach_templates.zip",
    icon: "✉️"
  },
  {
    id: "reward-3",
    title: "1-on-1 Consultation ₹500 Discount Coupon",
    cost: 300,
    category: "Consultation Premium",
    description: "Get ₹500 off on any paid video strategy audits (SEO Audit or Business Growth sessions).",
    redeemMsg: "Redeem on checkout form! Your single-use coupon code: AMRISH-COUPON-500",
    icon: "🎟️"
  },
  {
    id: "reward-4",
    title: "GEO Entity Schema JSON Template",
    cost: 100,
    category: "Tech SEO",
    description: "Copy-paste schema markup blocks designed to optimize knowledge graphs for ChatGPT search.",
    redeemMsg: "Your JSON code block: JSON-SCHEMA-GEO-73. Copy from: https://askamrish.com/dl/geo_schema.json",
    icon: "🧬"
  }
];

export default function GamificationRewards({ userPoints, streakCount, onAwardPoints, pointLogs }: GamificationRewardsProps) {
  // Friend Referral state
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [referralSuccess, setReferralSuccess] = useState(false);

  // Redemptions list
  const [redeemedCodes, setRedeemedCodes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("lms_redeemed_codes");
    return saved ? JSON.parse(saved) : {};
  });

  const handleReferFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName || !friendEmail) return;

    onAwardPoints(100, `Referred friend: ${friendName} (${friendEmail})`);
    setReferralSuccess(true);
    setFriendName("");
    setFriendEmail("");

    setTimeout(() => {
      setReferralSuccess(false);
    }, 4000);
  };

  const handleRedeemReward = (reward: typeof REWARDS_STORE[0]) => {
    if (userPoints < reward.cost) return;

    // Deduct points (which translates to negative award)
    onAwardPoints(-reward.cost, `Redeemed points for: ${reward.title}`);
    
    const updatedRedemptions = {
      ...redeemedCodes,
      [reward.id]: reward.redeemMsg
    };
    setRedeemedCodes(updatedRedemptions);
    localStorage.setItem("lms_redeemed_codes", JSON.stringify(updatedRedemptions));
  };

  return (
    <div className="space-y-8" id="rewards-view">
      {/* Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.07] text-neutral-950 pointer-events-none">
          <Gift size={260} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-neutral-950 rounded-full border border-white/20 text-xs font-semibold">
            <Award size={14} />
            <span>GAMIFICATION &amp; LOYALTY REWARDS</span>
          </div>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-sans font-bold tracking-tight">
              Gamification &amp; Points Portal
            </h1>
            <p className="text-neutral-900 text-sm leading-relaxed font-medium">
              Complete course modules, ask questions, or refer colleagues to stack community points. Trade points below to unlock Amrish's premium private templates.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Stats / Referral, Store, Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: point store */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-sans font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <Gift className="text-amber-500" size={20} />
              <span>Redeem Points Store</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REWARDS_STORE.map(reward => {
                const canRedeem = userPoints >= reward.cost;
                const isRedeemed = !!redeemedCodes[reward.id];

                return (
                  <div
                    key={reward.id}
                    className={`p-5 rounded-2xl border bg-white flex flex-col justify-between transition-all relative ${
                      isRedeemed 
                        ? "border-emerald-200 shadow-3xs" 
                        : "border-neutral-200/80 hover:border-neutral-400"
                    }`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-500 text-[8.5px] font-mono font-black uppercase rounded">
                          {reward.category}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-600 flex items-center gap-1">
                          <Zap size={10} fill="currentColor" />
                          <span>{reward.cost} XP Cost</span>
                        </span>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <span className="text-2xl shrink-0">{reward.icon}</span>
                        <div>
                          <h3 className="text-xs font-bold text-neutral-900 leading-snug">
                            {reward.title}
                          </h3>
                          <p className="text-[10px] text-neutral-400 leading-relaxed mt-1">
                            {reward.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 mt-4 space-y-2">
                      {isRedeemed ? (
                        <div className="p-3 bg-emerald-50/50 border border-emerald-200 text-emerald-800 rounded-xl text-[10px] leading-relaxed break-all font-mono space-y-1">
                          <p className="font-sans font-bold text-emerald-950 flex items-center gap-1">
                            <ShieldCheck size={11} /> Secured Unlock:
                          </p>
                          <p>{redeemedCodes[reward.id]}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRedeemReward(reward)}
                          disabled={!canRedeem}
                          className={`w-full py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            canRedeem
                              ? "bg-neutral-900 hover:bg-neutral-800 text-white shadow-3xs"
                              : "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed"
                          }`}
                        >
                          {canRedeem ? "Trade Points Now" : "Insufficient XP Points"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Points rules summary */}
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
              🎮 Complete Points Multipliers
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { action: "Daily streak", points: "+5 XP", icon: "🔥" },
                { action: "Ask AI search", points: "+10 XP", icon: "💬" },
                { action: "Answer Q&A", points: "+20 XP", icon: "👥" },
                { action: "Complete Module", points: "+50 XP", icon: "🏆" },
                { action: "Refer a friend", points: "+100 XP", icon: "🤝" },
              ].map((rule, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl text-center space-y-1.5">
                  <div className="text-lg">{rule.icon}</div>
                  <div className="text-[10px] font-bold text-neutral-800 truncate leading-tight">{rule.action}</div>
                  <div className="text-[10px] font-mono font-black text-amber-600">{rule.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: metrics, timeline & referral */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Points dashboard card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-3xs relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-amber-500/5 pointer-events-none">
              <Zap size={140} />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black uppercase text-neutral-400">YOUR TOTAL LEDGER</span>
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500 fill-amber-500 animate-pulse" size={24} />
                <span className="text-2xl font-mono font-black text-neutral-950">{userPoints} XP</span>
              </div>
            </div>

            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, (userPoints / 1000) * 100)}%` }}></div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 font-bold">
              <span>LEVEL PROGRESS</span>
              <span>{userPoints}/1000 XP (Tier Goal)</span>
            </div>
          </div>

          {/* Refer a Friend simulation form */}
          <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3.5 shadow-3xs">
            <div className="space-y-0.5">
              <h3 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
                🤝 Refer a Colleague
              </h3>
              <p className="text-[10px] text-neutral-400">
                Invite fellow students or marketers to study search mechanics and instantly gain +100 XP points!
              </p>
            </div>

            {referralSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-center animate-scale-up">
                <div className="h-8 w-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle size={14} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-950">Referral Code Sent!</h4>
                  <p className="text-[9px] text-emerald-600">You received +100 XP multiplier points!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReferFriend} className="space-y-2.5">
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="Friend's Name"
                    className="w-full bg-neutral-50 border border-neutral-200 outline-none rounded-lg px-3 py-1.5 text-xs text-neutral-850"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="Friend's Email Address"
                    className="w-full bg-neutral-50 border border-neutral-200 outline-none rounded-lg px-3 py-1.5 text-xs text-neutral-850"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Mail size={12} />
                  <span>Send Invite (+100 XP)</span>
                </button>
              </form>
            )}
          </div>

          {/* Points Timeline Log */}
          <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-3xs">
            <h3 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
              🕒 Points Ledger Log
            </h3>

            {pointLogs.length === 0 ? (
              <p className="text-[10px] text-neutral-400 italic">No XP actions recorded in this session.</p>
            ) : (
              <div className="space-y-2.5 max-h-[190px] overflow-y-auto scrollbar-none pr-1">
                {pointLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-50 last:border-b-0">
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-bold text-neutral-800 truncate leading-tight">{log.reason}</p>
                      <span className="text-[8.5px] text-neutral-400 font-mono">{log.timestamp}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-black shrink-0 ${
                      log.points >= 0 ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {log.points >= 0 ? `+${log.points}` : log.points} XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
