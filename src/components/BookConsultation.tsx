import React, { useState } from "react";
import { Sparkles, CheckCircle, Calendar, Shield, CreditCard, ChevronRight, Award, Zap, PhoneCall, HelpCircle } from "lucide-react";

interface BookConsultationProps {
  onAwardPoints: (points: number, reason: string) => void;
  onAddLeadSimulated: (lead: any) => void;
  userPoints: number;
}

const PLANS = [
  {
    id: "free",
    title: "Free WhatsApp Advice",
    price: "₹0",
    period: "forever",
    duration: "10-Min Chat",
    description: "Get quick structural answers on WhatsApp directly from Amrish.",
    features: [
      "Ask 1 primary career or SEO question",
      "Response within 2-4 business hours",
      "Direct link to study checklist",
    ],
    cta: "Chat on WhatsApp",
    popular: false,
    color: "emerald",
    xpReward: 30,
  },
  {
    id: "career",
    title: "Career Session",
    price: "₹299",
    period: "one-time",
    duration: "30-Min Video",
    description: "Ideal for career switchers, digital marketing students, and job seekers.",
    features: [
      "1-on-1 resume & LinkedIn audit",
      "Personalized learning syllabus",
      "Top interview question preparation",
      "Custom transition roadmap",
    ],
    cta: "Book Career Call",
    popular: false,
    color: "blue",
    xpReward: 100,
  },
  {
    id: "seo",
    title: "SEO Mechanics Audit",
    price: "₹999",
    period: "one-time",
    duration: "45-Min Video",
    description: "Complete technical, generative search, and entity ranking audit for your website.",
    features: [
      "Crawl speed & JS rendering review",
      "Schema & Entity mapping diagnosis",
      "AEO / Google snippet optimization",
      "30-day organic growth roadmap",
    ],
    cta: "Book Site Audit",
    popular: true,
    color: "amber",
    xpReward: 250,
  },
  {
    id: "business",
    title: "Business Growth",
    price: "₹1,999",
    period: "one-time",
    duration: "60-Min Video",
    description: "For founders, startup leaders, and marketing agency owners looking to scale.",
    features: [
      "Custom organic lead funnel design",
      "High-ROI asset strategy blueprint",
      "Competitor search landscape report",
      "SXO / CRO landing page feedback",
    ],
    cta: "Book Strategy Call",
    popular: false,
    color: "purple",
    xpReward: 400,
  },
  {
    id: "mentor",
    title: "Monthly Mentor",
    price: "₹4,999",
    period: "per month",
    duration: "Continuous Access",
    description: "Elite cohort program. Continuous access to Amrish for ongoing business/career acceleration.",
    features: [
      "Weekly 45-min video call",
      "Direct Private Slack/WhatsApp support",
      "Live mock interviews & resume pitches",
      "Custom agency/freelancer funnel review",
      "Redeem points for premium templates",
    ],
    cta: "Apply for Cohort",
    popular: false,
    color: "neutral",
    xpReward: 1000,
  }
];

export default function BookConsultation({ onAwardPoints, onAddLeadSimulated, userPoints }: BookConsultationProps) {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [bookingNote, setBookingNote] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [coordinationMethod, setCoordinationMethod] = useState("WhatsApp");

  const handlePlanClick = (plan: any) => {
    if (plan.id === "free") {
      // Free plan opens whatsapp immediately!
      const waUrl = `https://wa.me/918318114492?text=${encodeURIComponent("Hi Amrish, I want to book a Free 10-Min WhatsApp discovery call from AskAmrish.com.")}`;
      window.open(waUrl, "_blank");
      onAwardPoints(plan.xpReward, "Unlocked Free WhatsApp Consulting Session");
      return;
    }
    setSelectedPlan(plan);
    setBookingConfirmed(false);
    setDiscountApplied(false);
  };

  const handleApplyDiscount = () => {
    if (userPoints >= 300) {
      setDiscountApplied(true);
      onAwardPoints(-300, "Redeemed 300 XP for 1-on-1 Consultation Discount");
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone) return;

    const actualPrice = discountApplied ? Math.max(0, parseInt(selectedPlan.price.replace(/[^\d]/g, "")) - 500) : selectedPlan.price;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: bookingName,
      email: bookingEmail,
      organization: bookingUrl || "Consultation Booking Portal",
      interest: selectedPlan.title,
      message: `[CONSULTATION BOOKING] Tier: ${selectedPlan.title} (${selectedPlan.duration})\n\nPreferred Date/Time: ${bookingDate || "Anytime"} at ${bookingTime || "Anytime"}\n\nPrice Paid/Simulated: ${actualPrice}\nUser notes: ${bookingNote}`,
      status: "Scheduled" as const,
      createdAt: new Date().toISOString()
    };

    onAddLeadSimulated(newLead);
    setBookingConfirmed(true);
    
    // Automatically trigger WhatsApp thread for coordination!
    const waMsg = `Hi Amrish, I just scheduled a ${selectedPlan.title} (${selectedPlan.duration}) on AskAmrish.com.\n\nDetails:\n- Name: ${bookingName}\n- Email: ${bookingEmail}\n- Phone: ${bookingPhone}\n- Date/Time: ${bookingDate} at ${bookingTime}\n- Coordination: ${coordinationMethod}\n- Price: ${actualPrice}`;
    const waUrl = `https://wa.me/918318114492?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, "_blank");

    // Award the user hefty gamification XP!
    onAwardPoints(selectedPlan.xpReward, `Successfully booked ${selectedPlan.title}`);

    setTimeout(() => {
      setSelectedPlan(null);
      setBookingConfirmed(false);
      setBookingName("");
      setBookingEmail("");
      setBookingPhone("");
      setBookingUrl("");
      setBookingNote("");
      setBookingDate("");
      setBookingTime("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
    }, 2500);
  };

  return (
    <div className="space-y-8" id="consultation-view">
      {/* Banner */}
      <div className="p-6 md:p-8 bg-amber-500 text-neutral-950 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.06] text-neutral-950 pointer-events-none">
          <Calendar size={260} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-neutral-950 rounded-full border border-white/20 text-xs font-semibold">
            <PhoneCall size={14} />
            <span>1-ON-1 HIGH CONVERSION COACHING</span>
          </div>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-sans font-bold tracking-tight">
              Personalized Consulting &amp; Mentorship
            </h1>
            <p className="text-neutral-900 text-sm leading-relaxed font-medium">
              Choose an optimization tier designed to accelerate your career, build authority, audit website mechanics, or scale digital pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`p-6 rounded-3xl border bg-white flex flex-col justify-between transition-all relative ${
              plan.popular
                ? "border-amber-500 shadow-md ring-2 ring-amber-500/10 scale-[1.02]"
                : "border-neutral-200/80 shadow-3xs hover:border-neutral-400"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-amber-500 text-neutral-950 text-[8.5px] font-mono font-black uppercase tracking-widest px-3.5 py-1.5 rounded-bl-2xl">
                MOST POPULAR
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  plan.color === "emerald" ? "text-emerald-600" :
                  plan.color === "blue" ? "text-blue-600" :
                  plan.color === "amber" ? "text-amber-600" :
                  plan.color === "purple" ? "text-purple-600" :
                  "text-neutral-500"
                }`}>
                  {plan.duration}
                </span>
                <h3 className="text-base font-sans font-bold text-neutral-900 tracking-tight leading-snug">
                  {plan.title}
                </h3>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-extrabold text-neutral-950">{plan.price}</span>
                <span className="text-neutral-400 text-xs">/ {plan.period}</span>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed min-h-[50px]">
                {plan.description}
              </p>

              <div className="w-full h-px bg-neutral-100"></div>

              <ul className="space-y-2.5">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[10.5px] text-neutral-600 leading-tight">
                    <CheckCircle size={12} className="text-neutral-900 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-2.5 text-center text-xs font-bold rounded-xl transition-all shadow-3xs cursor-pointer flex items-center justify-center gap-1 hover:scale-[1.01] ${
                  plan.popular
                    ? "bg-amber-500 hover:bg-amber-600 text-neutral-950"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white"
                }`}
              >
                <span>{plan.cta}</span>
                <ChevronRight size={13} />
              </button>
              <div className="text-center">
                <span className="text-[8.5px] font-mono font-bold text-neutral-400">
                  🎁 Earns +{plan.xpReward} XP Points
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Credentials stamp */}
      <div className="p-4 bg-neutral-50 border border-neutral-150 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neutral-200 text-neutral-700 rounded-lg">
            <Shield size={16} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-800 leading-tight">
              Secure Simulated Booking &amp; CRM Sync
            </p>
            <p className="text-[10px] text-neutral-400">
              No real payments are collected. All scheduled sessions immediately register in your Leads CRM and award gamification XP.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold font-mono">
          🔒 256-BIT ENCRYPTION SIMULATOR
        </div>
      </div>

      {/* Simulated Payment & Scheduling Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl max-w-xl w-full p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-none">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-black uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                  Step 2: Confirm Scheduling &amp; Mock Payment
                </span>
                <h3 className="text-lg font-sans font-bold text-neutral-900">
                  Book: {selectedPlan.title} ({selectedPlan.duration})
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 flex items-center justify-center mx-auto animate-bounce shadow-md">
                  <CheckCircle size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-900">Consultation Booked Successfully!</h4>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Your mock appointment is booked and logged in the Lead CRM Console. Plus, you earned <span className="font-extrabold text-amber-600">+{selectedPlan.xpReward} XP Points</span>!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Left Panel: Booking details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
                    📅 Scheduling Details
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="e.g. +91 831 811 4492"
                      className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs text-neutral-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Time *</label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs text-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Panel: Coordination & Discount */}
                <div className="space-y-4 border-t md:border-t-0 md:border-l border-neutral-100 pt-4 md:pt-0 md:pl-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">
                      💬 Booking Coordination &amp; Verification
                    </h4>

                    {/* Gamification Points discount redemption option */}
                    {userPoints >= 300 && !discountApplied ? (
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                            <Zap size={11} fill="currentColor" className="text-amber-500" />
                            <span>Redeem 300 XP for Discount</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-amber-700">Save ₹500</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[10px] font-bold rounded-lg cursor-pointer transition-all"
                        >
                          Redeem 300 Points Now
                        </button>
                      </div>
                    ) : discountApplied ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle size={12} />
                          <span>300 XP Discount Applied!</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-700">-₹500</span>
                      </div>
                    ) : null}

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Coordination Channel *</label>
                      <select
                        value={coordinationMethod}
                        onChange={(e) => setCoordinationMethod(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800"
                      >
                        <option value="WhatsApp">Direct WhatsApp Chat (+91 831 811 4492)</option>
                        <option value="Phone Call">Direct Voice Call from Amrish</option>
                        <option value="Email">Email Calendar Link &amp; Details</option>
                      </select>
                    </div>

                    <div className="p-3.5 bg-neutral-50 border border-neutral-150 rounded-2xl text-[11px] text-neutral-600 leading-relaxed space-y-1.5">
                      <p className="font-extrabold text-neutral-800 flex items-center gap-1">
                        <Shield size={12} className="text-emerald-600" />
                        <span>Frictionless Booking:</span>
                      </p>
                      <p>
                        No credit cards required! Confirming your slot instantly logs the request in Amrish's CRM Console. We will coordinate payment (UPI/GPay/Transfer) directly.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-800 px-1 font-mono">
                      <span>Course Member Price:</span>
                      <span>
                        {discountApplied
                          ? `₹${Math.max(0, parseInt(selectedPlan.price.replace(/[^\d]/g, "")) - 500)}`
                          : selectedPlan.price}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-neutral-900 hover:bg-neutral-805 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall size={14} className="text-emerald-400" />
                      <span>Confirm &amp; WhatsApp Amrish (+XP)</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
