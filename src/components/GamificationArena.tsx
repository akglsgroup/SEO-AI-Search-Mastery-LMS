/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Flame, 
  Target, 
  Award, 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  ArrowRight, 
  Sparkles,
  Lock,
  Calendar,
  Gift,
  Check
} from "lucide-react";
import { Level } from "../types";

interface GamificationArenaProps {
  userPoints: number;
  completedItemIds: string[];
  allLevels: Level[];
  streakCount: number;
  onNavigateToLevel?: (levelId: number | string) => void;
  onNavigateToQuiz?: (levelId?: number | string) => void;
  onClaimDailyBonus?: (xp: number) => void;
}

export interface RankTier {
  rankNumber: number;
  name: string;
  beltTitle: string;
  minXP: number;
  maxXP: number;
  beltColor: string;
  beltBorder: string;
  badgeEmoji: string;
  perks: string[];
}

export const SEARCH_RANKS: RankTier[] = [
  {
    rankNumber: 1,
    name: "Search Initiate",
    beltTitle: "White Belt",
    minXP: 0,
    maxXP: 250,
    beltColor: "bg-neutral-100 text-neutral-800",
    beltBorder: "border-neutral-300",
    badgeEmoji: "🌱",
    perks: ["Access to Tier 1 Foundations", "Syllabus Checkpoint Tracking", "Daily Quests Active"]
  },
  {
    rankNumber: 2,
    name: "Index Apprentice",
    beltTitle: "Bronze Belt",
    minXP: 251,
    maxXP: 650,
    beltColor: "bg-amber-100 text-amber-900",
    beltBorder: "border-amber-300",
    badgeEmoji: "🥉",
    perks: ["Unlock Tier 2 Topic Silos", "Interactive Schema Generator", "Streak Freeze Safeguard"]
  },
  {
    rankNumber: 3,
    name: "Semantic Specialist",
    beltTitle: "Silver Belt",
    minXP: 651,
    maxXP: 1300,
    beltColor: "bg-slate-200 text-slate-800",
    beltBorder: "border-slate-400",
    badgeEmoji: "🥈",
    perks: ["Unlock Tier 3 Technical SEO", "Core Web Vitals INP Simulator", "Priority Quiz Diagnostics"]
  },
  {
    rankNumber: 4,
    name: "Technical Architect",
    beltTitle: "Gold Belt",
    minXP: 1301,
    maxXP: 2200,
    beltColor: "bg-amber-300 text-amber-950",
    beltBorder: "border-amber-500",
    badgeEmoji: "🥇",
    perks: ["Unlock Tier 4 GSC 20-Part Protocol", "Custom Course Curriculum Creator", "Executive Audit Export"]
  },
  {
    rankNumber: 5,
    name: "GEO Strategist",
    beltTitle: "Platinum Belt",
    minXP: 2201,
    maxXP: 3500,
    beltColor: "bg-purple-100 text-purple-900",
    beltBorder: "border-purple-300",
    badgeEmoji: "🔮",
    perks: ["Unlock Tier 6 Generative Engine Optimization (GEO)", "AI Overviews Ingestion Models", "Senior Consultant Badge"]
  },
  {
    rankNumber: 6,
    name: "Grandmaster of Search",
    beltTitle: "Diamond Belt",
    minXP: 3501,
    maxXP: 10000,
    beltColor: "bg-indigo-900 text-emerald-300",
    beltBorder: "border-emerald-500",
    badgeEmoji: "👑",
    perks: ["Full Master SEO Certification", "Lifelong Mastermind Directory", "All Achievement Badges Unlocked"]
  }
];

export default function GamificationArena({
  userPoints,
  completedItemIds,
  allLevels,
  streakCount,
  onNavigateToLevel,
  onNavigateToQuiz,
  onClaimDailyBonus
}: GamificationArenaProps) {
  const [claimedQuests, setClaimedQuests] = useState<Record<string, boolean>>({});

  // Determine current rank
  const currentRank = useMemo(() => {
    return SEARCH_RANKS.find(r => userPoints >= r.minXP && userPoints <= r.maxXP) || SEARCH_RANKS[SEARCH_RANKS.length - 1];
  }, [userPoints]);

  const nextRank = useMemo(() => {
    const nextIdx = SEARCH_RANKS.findIndex(r => r.rankNumber === currentRank.rankNumber) + 1;
    return nextIdx < SEARCH_RANKS.length ? SEARCH_RANKS[nextIdx] : null;
  }, [currentRank]);

  // Rank XP progression
  const rankProgressPercent = useMemo(() => {
    if (!nextRank) return 100;
    const rankSpan = nextRank.minXP - currentRank.minXP;
    const userInRank = Math.max(0, userPoints - currentRank.minXP);
    return Math.min(100, Math.round((userInRank / rankSpan) * 100));
  }, [userPoints, currentRank, nextRank]);

  const xpNeededForNext = nextRank ? Math.max(0, nextRank.minXP - userPoints) : 0;

  // Daily Quests definition
  const dailyQuests = [
    {
      id: "quest-theory",
      title: "Daily Knowledge Sprint",
      desc: "Complete or review at least 3 syllabus checkpoints today.",
      xpReward: 50,
      icon: <Target size={16} className="text-emerald-600" />,
      isCompleted: completedItemIds.length >= 3,
      targetLevelId: 1001
    },
    {
      id: "quest-schema",
      title: "Technical Schema Inspection",
      desc: "Practice structured data, robots directives, or Core Web Vitals.",
      xpReward: 75,
      icon: <Zap size={16} className="text-amber-600" />,
      isCompleted: completedItemIds.some(id => id.includes("l6-") || id.includes("l3-") || id.includes("l101-")),
      targetLevelId: 6
    },
    {
      id: "quest-geo",
      title: "AI Search & GEO Exploration",
      desc: "Study Generative Engine Optimization or Answer Engine modules.",
      xpReward: 100,
      icon: <Sparkles size={16} className="text-purple-600" />,
      isCompleted: completedItemIds.some(id => id.includes("l13-") || id.includes("l14-") || id.includes("l301-")),
      targetLevelId: 13
    }
  ];

  const handleClaimQuest = (questId: string, xpReward: number) => {
    setClaimedQuests(prev => ({ ...prev, [questId]: true }));
    if (onClaimDailyBonus) {
      onClaimDailyBonus(xpReward);
    }
  };

  // Skill Competencies
  const competencyDomains = [
    {
      id: "tech",
      name: "Technical & Web Vitals",
      desc: "Crawl budget, INP, LCP, CLS, and server log analysis.",
      levels: [3, 23, 35, 101, 102, 103, 104, 105],
      color: "bg-emerald-500"
    },
    {
      id: "content",
      name: "Semantic Content & Intent",
      desc: "Topic clusters, search intent mapping, and E-E-A-T trust signals.",
      levels: [5, 10, 11, 12, 1001, 1002],
      color: "bg-blue-500"
    },
    {
      id: "schema",
      name: "Structured Schema & Knowledge Graphs",
      desc: "JSON-LD schema, entity mapping, and Wikidata integration.",
      levels: [4, 6, 7, 8, 9, 32],
      color: "bg-purple-500"
    },
    {
      id: "gsc_ga4",
      name: "GSC Protocol & GA4 Analytics",
      desc: "Search Console 20-part inspection and conversion attribution.",
      levels: [201, 202, 203, 204, 501, 502, 503],
      color: "bg-amber-500"
    },
    {
      id: "geo_aeo",
      name: "AI Search, GEO & RAG",
      desc: "Formatting for LLMs, Google AI Overviews, and Perplexity citations.",
      levels: [13, 14, 15, 31, 34],
      color: "bg-violet-500"
    },
    {
      id: "local_ecom",
      name: "Local GBP & E-Commerce Verticals",
      desc: "Google Business Profile Map 3-pack and product schema catalogs.",
      levels: [401, 402, 403, 21, 22, 24],
      color: "bg-rose-500"
    }
  ];

  const getDomainProgress = (levelIds: number[]) => {
    const domainLevels = allLevels.filter(l => levelIds.includes(l.id));
    const totalItems = domainLevels.reduce((acc, l) => acc + l.checklistItems.length, 0);
    const completed = domainLevels.reduce((acc, l) => {
      return acc + l.checklistItems.filter(i => completedItemIds.includes(i.id)).length;
    }, 0);
    return totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;
  };

  // Milestone Badges
  const achievementBadges = [
    {
      id: "starter",
      title: "First Light",
      desc: "Completed your first 5 syllabus checkpoints",
      icon: "🌱",
      unlocked: completedItemIds.length >= 5
    },
    {
      id: "schema_eng",
      title: "Schema Engineer",
      desc: "Completed structured JSON-LD entity markup",
      icon: "🏷️",
      unlocked: completedItemIds.some(id => id.includes("l6-") || id.includes("l9-"))
    },
    {
      id: "speed_demon",
      title: "Core Web Vitals Specialist",
      desc: "Mastered TTFB, INP, and LCP latency protocols",
      icon: "⚡",
      unlocked: completedItemIds.some(id => id.includes("l3-") || id.includes("l102-"))
    },
    {
      id: "gsc_hawk",
      title: "GSC Inspector",
      desc: "Audited 100% indexing parity in Search Console",
      icon: "🔍",
      unlocked: completedItemIds.some(id => id.includes("l201-") || id.includes("l202-"))
    },
    {
      id: "geo_pioneer",
      title: "GEO Pioneer (2026)",
      desc: "Formatted content for AI Search & RAG retrieval",
      icon: "🤖",
      unlocked: completedItemIds.some(id => id.includes("l13-") || id.includes("l15-"))
    },
    {
      id: "streak_flame",
      title: "Dedicated Scholar",
      desc: "Maintained a 3+ day active study streak",
      icon: "🔥",
      unlocked: streakCount >= 3
    },
    {
      id: "point_titan",
      title: "Point Titan (1,000+ XP)",
      desc: "Accumulated over 1,000 verified mastery XP",
      icon: "💎",
      unlocked: userPoints >= 1000
    },
    {
      id: "grandmaster",
      title: "Grandmaster of Search",
      desc: "Completed the entire 6-tier curriculum",
      icon: "👑",
      unlocked: completedItemIds.length > 0 && completedItemIds.length >= allLevels.reduce((acc, l) => acc + l.checklistItems.length, 0)
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Gamification Hero Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Trophy size={14} />
              <span>Learner Rank & Mastery Progression</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span>{currentRank.badgeEmoji}</span>
              <span>{currentRank.name}</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-sans">
              <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] ${currentRank.beltColor} ${currentRank.beltBorder} border`}>
                {currentRank.beltTitle}
              </span>
              <span>·</span>
              <span>Level Rank {currentRank.rankNumber} of {SEARCH_RANKS.length}</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">{userPoints} Total XP</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed pt-1">
              Every syllabus checkpoint, schema inspection, and diagnostic quiz earns XP. Level up through 6 belt ranks to unlock senior search privileges and digital credentials.
            </p>
          </div>

          {/* XP Progress Card to Next Rank */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl shrink-0 max-w-sm w-full space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono">Next Rank Progress</span>
              <span className="text-amber-400 font-mono font-bold">{rankProgressPercent}%</span>
            </div>

            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${rankProgressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Current: {userPoints} XP</span>
              <span>{nextRank ? `${xpNeededForNext} XP to ${nextRank.name}` : "Max Rank Reached! 🎉"}</span>
            </div>
          </div>

        </div>

        {/* 7-Day Study Streak Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 flex items-center justify-center">
              <Flame size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-sans font-extrabold text-white">
                  {streakCount}-Day Study Streak
                </span>
                <span className="px-2 py-0.2 text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Streak Freeze Active
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-sans">
                Study any checkpoint today to keep your streak burning!
              </span>
            </div>
          </div>

          {/* 7-Day Week Dots */}
          <div className="flex items-center gap-2 shrink-0">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
              const isFilled = idx < Math.min(streakCount, 7);
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isFilled 
                      ? "bg-amber-500 text-neutral-950 font-extrabold shadow-xs" 
                      : "bg-white/5 text-neutral-500 border border-white/10"
                  }`}>
                    {day}
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500">
                    {isFilled ? "✓" : "·"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2-COLUMN GRID: DAILY QUESTS & SKILL COMPETENCIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Daily Quests (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <div className="text-xs text-neutral-500 font-sans">Daily Sprints</div>
              <h3 className="text-lg font-sans font-extrabold text-neutral-900">
                Active Quests
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Resets Daily
            </span>
          </div>

          <div className="space-y-3">
            {dailyQuests.map(q => {
              const isClaimed = claimedQuests[q.id];
              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    isClaimed
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                      : q.isCompleted
                      ? "bg-amber-50/50 border-amber-200 text-neutral-900"
                      : "bg-neutral-50/70 border-neutral-200 text-neutral-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-white rounded-xl border border-neutral-200 shadow-3xs shrink-0 mt-0.5">
                        {q.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-sans font-bold text-neutral-900">
                          {q.title}
                        </h4>
                        <p className="text-[11px] text-neutral-600 leading-tight mt-0.5 font-sans">
                          {q.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-700 shrink-0">
                      +{q.xpReward} XP
                    </span>
                  </div>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono">
                      {isClaimed ? "Reward Claimed! 🎉" : q.isCompleted ? "Objective Completed!" : "In Progress"}
                    </span>

                    {isClaimed ? (
                      <span className="text-[11px] font-sans font-bold text-emerald-700 flex items-center gap-1">
                        <Check size={13} />
                        <span>Claimed</span>
                      </span>
                    ) : q.isCompleted ? (
                      <button
                        onClick={() => handleClaimQuest(q.id, q.xpReward)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 rounded-lg text-xs font-sans font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1"
                      >
                        <Gift size={12} />
                        <span>Claim +{q.xpReward} XP</span>
                      </button>
                    ) : onNavigateToLevel ? (
                      <button
                        onClick={() => onNavigateToLevel(q.targetLevelId)}
                        className="text-[11px] font-sans font-bold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start Quest</span>
                        <ArrowRight size={11} />
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Skill Competency Radar (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <div className="text-xs text-neutral-500 font-sans">Verified Skill Tree</div>
              <h3 className="text-lg font-sans font-extrabold text-neutral-900">
                Search Competency Matrix
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              6 Core Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {competencyDomains.map(d => {
              const pct = getDomainProgress(d.levels);
              const tierBadge = pct >= 90 ? "Master" : pct >= 60 ? "Specialist" : pct >= 25 ? "Proficient" : "Novice";
              const badgeStyle = pct >= 90 
                ? "bg-purple-100 text-purple-900 border-purple-200" 
                : pct >= 60 
                ? "bg-emerald-100 text-emerald-900 border-emerald-200" 
                : pct >= 25 
                ? "bg-blue-100 text-blue-900 border-blue-200" 
                : "bg-neutral-100 text-neutral-700 border-neutral-200";

              return (
                <div key={d.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-sans font-extrabold text-neutral-900">
                        {d.name}
                      </h4>
                      <p className="text-[10px] text-neutral-500 leading-tight mt-0.5 line-clamp-1">
                        {d.desc}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border shrink-0 ${badgeStyle}`}>
                      {tierBadge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600">
                      <span>Proficiency</span>
                      <span className="font-bold text-neutral-900">{pct}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${d.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ACHIEVEMENT TROPHY CABINET */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
              <span>Mastery Credentials</span>
              <span>·</span>
              <span>{achievementBadges.filter(b => b.unlocked).length} of {achievementBadges.length} Unlocked</span>
            </div>
            <h3 className="text-xl font-sans font-extrabold text-neutral-900 mt-1">
              Achievement Showcase
            </h3>
          </div>
          <span className="text-xs font-sans text-neutral-500">
            Unlocks formal completion badges for your professional CV & LinkedIn
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievementBadges.map(b => (
            <div 
              key={b.id}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                b.unlocked
                  ? "bg-neutral-50 border-neutral-300 shadow-3xs"
                  : "bg-neutral-50/40 border-neutral-200/60 opacity-60"
              }`}
            >
              <div className="space-y-1.5 flex flex-col items-center">
                <span className="text-2xl filter drop-shadow-xs">{b.icon}</span>
                <h4 className="text-xs font-sans font-extrabold text-neutral-900">
                  {b.title}
                </h4>
                <p className="text-[10px] text-neutral-500 leading-tight">
                  {b.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 w-full">
                {b.unlocked ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-700 flex items-center justify-center gap-1">
                    <CheckCircle2 size={11} />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
                    <Lock size={10} />
                    <span>Locked</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
