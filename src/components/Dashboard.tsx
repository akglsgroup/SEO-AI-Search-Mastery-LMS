/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UserProgress, Level } from "../types";
import { INITIAL_TRACKS } from "../data/checklist";
import { Award, Zap, CheckCircle, BarChart3, Star, Sparkles, BookOpen, Cpu, Layers, Globe, SlidersHorizontal, Trophy, Lock, Smile, ArrowRight, Share2, Check } from "lucide-react";
import { motion } from "motion/react";
import CelebrationConfetti from "./CelebrationConfetti";

interface DashboardProps {
  progress: UserProgress;
  levels: Level[];
  onChangeTrack: (trackId: string) => void;
  onSelectLevel: (levelId: number | string) => void;
  tabChanger: (tab: "curriculum" | "creator" | "quiz") => void;
  onOpenConsulting?: () => void;
}

export default function Dashboard({
  progress,
  levels,
  onChangeTrack,
  onSelectLevel,
  tabChanger,
  onOpenConsulting
}: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<"all" | "tech" | "content" | "growth">("all");
  const [viewingAward, setViewingAward] = React.useState<any | null>(null);
  const [graduateName, setGraduateName] = React.useState<string>(() => {
    try {
      const saved = localStorage.getItem("lms_graduate_name");
      return saved || "Amrish Kumar Singh";
    } catch (e) {
      return "Amrish Kumar Singh";
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("lms_graduate_name", graduateName);
    } catch (e) {}
  }, [graduateName]);

  const [sharingAwardId, setSharingAwardId] = React.useState<string | null>(null);

  const handleShareAward = async (e: React.MouseEvent, award: any, credentialId: string) => {
    e.stopPropagation();
    const shareTitle = `Search Engine Mechanics Mastery Certification`;
    const shareText = `I completed "${award.title}" on the Search Engine Mechanics platform! Verified Candidate ID: ${credentialId}. Check my achievement:`;
    
    // Dynamic URL
    const shareUrl = window.location.origin + window.location.pathname;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.warn("Could not share using Web Share API:", error);
        copyToClipboard(award.id, shareTitle, shareText, shareUrl);
      }
    } else {
      copyToClipboard(award.id, shareTitle, shareText, shareUrl);
    }
  };

  const copyToClipboard = async (awardId: string, title: string, text: string, url: string) => {
    try {
      const fullShareText = `🏆 ${title}\n\n${text}\n👉 ${url}`;
      await navigator.clipboard.writeText(fullShareText);
      setSharingAwardId(awardId);
      setTimeout(() => {
        setSharingAwardId(null);
      }, 2500);
    } catch (err) {
      console.error("Could not copy link to clipboard:", err);
    }
  };

  // --- Mastery Badge & Celebration State ---
  const [celebratedIds, setCelebratedIds] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("lms_celebrated_levels");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedBadgeFilter, setSelectedBadgeFilter] = React.useState<"all" | "unlocked" | "locked">("all");
  const [hoveredBadgeLevel, setHoveredBadgeLevel] = React.useState<Level | null>(null);

  // Identify completed levels
  const completedLevels = levels.filter(level => {
    if (!level.checklistItems || level.checklistItems.length === 0) return false;
    return level.checklistItems.every(item => progress.completedItemIds.includes(item.id));
  });

  const completedCustomCourses = (progress.customCourses || []).filter(course => {
    if (!course.checklistItems || course.checklistItems.length === 0) return false;
    return course.checklistItems.every(item => progress.completedItemIds.includes(item.id));
  });

  const allCompletedIdsArray = [
    ...completedLevels.map(l => String(l.id)),
    ...completedCustomCourses.map(c => String(c.id))
  ];

  // Dynamic popup state
  const [activeCelebrateId, setActiveCelebrateId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const uncelebrated = allCompletedIdsArray.find(id => !celebratedIds.includes(String(id)));
    if (uncelebrated) {
      setActiveCelebrateId(uncelebrated);
    } else {
      setActiveCelebrateId(null);
    }
  }, [progress.completedItemIds, celebratedIds, progress.customCourses]);

  const celebratedLevel = activeCelebrateId ? (
    levels.find(l => String(l.id) === activeCelebrateId) || 
    (progress.customCourses || []).find(c => String(c.id) === activeCelebrateId)
  ) : null;

  const handleCelebrateDismiss = (id: string | number) => {
    const updated = [...celebratedIds, String(id)];
    setCelebratedIds(updated);
    localStorage.setItem("lms_celebrated_levels", JSON.stringify(updated));
    setActiveCelebrateId(null);
  };

  const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("tech") || cat.includes("semantic") || cat.includes("markup")) {
      return {
        bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
        activeGradient: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
        pillColor: "bg-emerald-50 border border-emerald-200 text-emerald-700",
        icon: "🟢",
        textColor: "text-emerald-600",
        label: "Technical"
      };
    }
    if (cat.includes("content") || cat.includes("on-page") || cat.includes("generative") || cat.includes("vertical")) {
      return {
        bg: "bg-blue-50 text-blue-800 border-blue-200",
        activeGradient: "from-blue-500 to-cyan-600 shadow-blue-500/20",
        pillColor: "bg-blue-50 border border-blue-200 text-blue-700",
        icon: "🔵",
        textColor: "text-blue-600",
        label: "Content & AI"
      };
    }
    return {
      bg: "bg-purple-50 text-purple-800 border-purple-200",
      activeGradient: "from-purple-500 to-rose-600 shadow-purple-500/20",
      pillColor: "bg-purple-50 border border-purple-200 text-purple-700",
      icon: "🟣",
      textColor: "text-purple-600",
      label: "Authority & CRO"
    };
  };

  // Calculate general statistics
  const totalItemsCount = levels.reduce((sum, level) => sum + level.checklistItems.length, 0);
  const completedItemsCount = levels.reduce((sum, level) => {
    return sum + level.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
  }, 0);

  const overallCompletionPercentage = totalItemsCount > 0 
    ? Math.round((completedItemsCount / totalItemsCount) * 100) 
    : 0;

  // Let's calculate the specialized 2026 success formula scores!
  // SEO Score = Technical (L3), OnPage (L10), Backlinks (L17)
  const getFormulaScore = (levelIds: number[]): number => {
    const targetLevels = levels.filter(l => typeof l.id === "number" && levelIds.includes(l.id as number));
    const items = targetLevels.flatMap(l => l.checklistItems);
    if (items.length === 0) return 0;
    const completed = items.filter(it => progress.completedItemIds.includes(it.id)).length;
    return Math.round((completed / items.length) * 100);
  };

  const seoScore = getFormulaScore([3, 10, 17, 21, 22]); // Tech, OnPage, Backlinks, Local, Ecom
  const aeoScore = getFormulaScore([9, 14, 26]); // Schema, Answer Engine, Voice Search
  const geoScore = getFormulaScore([7, 13, 18, 33]); // Entity SEO, GEO, Citations, High-ROI assets
  const aioScore = getFormulaScore([8, 15, 31, 34]); // KG, AI Visibility, Monitoring, Future-Proof

  // Combined Mastery Rating (weighted)
  const overallMasteryRating = Math.round((seoScore * 0.3) + (geoScore * 0.3) + (aeoScore * 0.2) + (aioScore * 0.2));

  // Determine current ranking title based on mastery rating
  const getRankTitle = (rating: number) => {
    if (rating >= 90) return "Master Architect (Enterprise Elite)";
    if (rating >= 70) return "AI & Search Strategist (Advanced)";
    if (rating >= 40) return "Optimization Specialist (Intermediate)";
    if (rating >= 15) return "Search Foundationer (Beginner)";
    return "LMS Apprentice (Fresh Entity)";
  };

  return (
    <div className="space-y-8" id="lms-dashboard">
      {/* Hero Welcome Panel */}
      <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl relative overflow-hidden shadow-xl border border-neutral-700">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
          <Award size={280} className="text-white" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 text-xs font-mono">
            <Sparkles size={14} />
            <span>2026-2027 ENTERPRISE EDITION</span>
          </div>
          
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight">
              AI Search &amp; Checklist Engine
            </h1>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              Master Google Search, ChatGPT, Gemini, Claude, and Perplexity using our structured checklists. Complete course milestones, test your recall, or create custom audit tracks.
            </p>
          </div>

          {/* Quick Metrics Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-neutral-700/50">
            <div className="space-y-1">
              <span className="text-xs text-neutral-400 font-mono">CURRENT LEVEL</span>
              <p className="text-lg font-semibold text-white truncate">{getRankTitle(overallMasteryRating)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-400 font-mono">CHECKLIST MILESTONE</span>
              <p className="text-lg font-semibold text-emerald-400">
                {completedItemsCount} / {totalItemsCount} <span className="text-xs text-neutral-400 font-normal">items</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-400 font-mono">OVERALL MASTERY</span>
              <p className="text-lg font-semibold text-white">{overallCompletionPercentage}%</p>
            </div>
            <div className="space-y-1 col-span-1">
              <span className="text-xs text-neutral-400 font-mono">DAILY LEARNING STREAK</span>
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-lg">
                <Zap size={18} fill="currentColor" />
                <span>{progress.currentStreak} Day{progress.currentStreak !== 1 && "s"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2026 Enterprise Scoring Framework (Dynamic Formulas) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-sans font-semibold text-neutral-900 tracking-tight">
              2026 Multi-Engine Optimization Scores
            </h2>
            <p className="text-xs text-neutral-500">
              Calculated real-time based on associated checklist category progress and technical weightings.
            </p>
          </div>
          <div className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-mono border border-neutral-200">
            Weighted Score: <span className="font-bold text-neutral-900">{overallMasteryRating}/100</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* SEO Score Block */}
          <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 border border-emerald-100">
                <BarChart3 size={20} />
              </div>
              <span className="text-2xl font-mono font-bold text-emerald-600">{seoScore}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-neutral-900 text-sm">SEO Score (Organic)</h3>
              <p className="text-xs text-neutral-500 font-normal">Technical + On-page + Backlink weightings.</p>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${seoScore}%` }}></div>
            </div>
          </div>

          {/* GEO Score Block */}
          <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-700 border border-blue-100">
                <Sparkles size={20} />
              </div>
              <span className="text-2xl font-mono font-bold text-blue-600">{geoScore}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-neutral-900 text-sm">GEO Score (Generative)</h3>
              <p className="text-xs text-neutral-500">Citations + Entity maps + Research citations.</p>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${geoScore}%` }}></div>
            </div>
          </div>

          {/* AEO Score Block */}
          <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-700 border border-purple-100">
                <CheckCircle size={20} />
              </div>
              <span className="text-2xl font-mono font-bold text-purple-600">{aeoScore}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-neutral-900 text-sm">AEO Score (Answer)</h3>
              <p className="text-xs text-neutral-500">Direct query response + Speakable schemas.</p>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${aeoScore}%` }}></div>
            </div>
          </div>

          {/* AIO Score Block */}
          <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-violet-50 rounded-xl text-violet-700 border border-violet-100">
                <Star size={20} />
              </div>
              <span className="text-2xl font-mono font-bold text-violet-600">{aioScore}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-neutral-900 text-sm">AIO Score (AI Agents)</h3>
              <p className="text-xs text-neutral-500">Knowledge node reconciliation + LLM Mentions.</p>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div className="bg-violet-500 h-full transition-all duration-500" style={{ width: `${aioScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement & Mastery Badges Showcase */}
      <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="space-y-1">
            <h2 className="text-xl font-sans font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <Trophy className="text-amber-500 shrink-0 animate-bounce" size={22} />
              <span>National Mastery Badges &amp; Achievements</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Complete 15-20 checklists (100%) in a module to unlock its respective Mastery Badge. Click any unlocked badge to return to its study guide.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-xl shadow-3xs">
              🎖️ Unlocked: {completedLevels.length} / {levels.length} Standard
            </span>
            {completedCustomCourses.length > 0 && (
              <span className="text-xs font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-xl shadow-3xs animate-pulse">
                🔮 {completedCustomCourses.length} Custom Master
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Milestone Medals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Pioneer Certificate",
              requirement: "Complete 1 syllabus module",
              isAchieved: completedLevels.length >= 1,
              progress: Math.min(100, Math.round((completedLevels.length / 1) * 100)),
              icon: "🥉"
            },
            {
              title: "Specialist Badge",
              requirement: "Complete 5 syllabus modules",
              isAchieved: completedLevels.length >= 5,
              progress: Math.min(100, Math.round((completedLevels.length / 5) * 100)),
              icon: "🥈"
            },
            {
              title: "Advanced Champion",
              requirement: "Complete 15 syllabus modules",
              isAchieved: completedLevels.length >= 15,
              progress: Math.min(100, Math.round((completedLevels.length / 15) * 100)),
              icon: "🥇"
            },
            {
              title: "Ultimate Elite Guru",
              requirement: "Complete all 35 modules",
              isAchieved: completedLevels.length >= 35,
              progress: Math.min(100, Math.round((completedLevels.length / 35) * 100)),
              icon: "👑"
            }
          ].map((milestone, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border flex gap-3.5 items-center transition-all ${
                milestone.isAchieved 
                  ? "bg-white border-neutral-200 shadow-3xs hover:shadow-xs" 
                  : "bg-neutral-50/75 border-neutral-250/55 grayscale opacity-75"
              }`}
            >
              <div className="text-3xl shrink-0">{milestone.icon}</div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2.5">
                  <h4 className="font-sans font-bold text-neutral-900 text-xs truncate leading-none">{milestone.title}</h4>
                  {milestone.isAchieved ? (
                    <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1 rounded">CLAIMED</span>
                  ) : (
                    <span className="text-[8px] font-mono text-neutral-400 font-bold">{milestone.progress}%</span>
                  )}
                </div>
                <p className="text-[10px] text-neutral-500 font-medium leading-none truncate">{milestone.requirement}</p>
                <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
                  <div className={`h-full bg-neutral-800 transition-all duration-300`} style={{ width: `${milestone.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Badges Gallery Frame inside Dashboard */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-neutral-50 p-2.5 rounded-2xl border border-neutral-200/70">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-neutral-200 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedBadgeFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                  selectedBadgeFilter === "all" 
                    ? "bg-neutral-900 text-white shadow-xs" 
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                All Badges ({levels.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedBadgeFilter("unlocked")}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                  selectedBadgeFilter === "unlocked" 
                    ? "bg-neutral-900 text-white shadow-xs" 
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Unlocked ({completedLevels.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedBadgeFilter("locked")}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                  selectedBadgeFilter === "locked" 
                    ? "bg-neutral-900 text-white shadow-xs" 
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Locked ({levels.length - completedLevels.length})
              </button>
            </div>

            <div className="text-[11px] text-neutral-500 font-medium">
              💡 <span className="font-sans">Hover badges to inspect requirements, click to navigate</span>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-3 pb-2">
            {levels
              .filter(level => {
                const isComp = completedLevels.some(cl => cl.id === level.id);
                if (selectedBadgeFilter === "unlocked") return isComp;
                if (selectedBadgeFilter === "locked") return !isComp;
                return true;
              })
              .map(level => {
                const isUnlocked = completedLevels.some(cl => cl.id === level.id);
                const style = getCategoryStyle(level.category);

                return (
                  <motion.button
                    key={level.id}
                    onClick={() => onSelectLevel(level.id)}
                    onMouseEnter={() => setHoveredBadgeLevel(level)}
                    onMouseLeave={() => setHoveredBadgeLevel(null)}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center relative cursor-pointer border transition-all ${
                      isUnlocked 
                        ? `bg-gradient-to-br ${style.activeGradient} shadow-md text-white border-amber-300 ring-2 ring-amber-300/35 overflow-hidden group`
                        : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 border-dashed text-neutral-400"
                    }`}
                  >
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-white/20 -translate-x-12 translate-y-12 rotate-45 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700 ease-out"></div>
                    )}
                    <span className="font-mono font-extrabold text-xs">
                      {level.id}
                    </span>

                    {/* Small dynamic indicator icons inside badge circle */}
                    {isUnlocked ? (
                      <div className="absolute -bottom-1 -right-0.5 bg-amber-400 border border-neutral-950 text-neutral-950 font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center text-[8px] shadow-sm">
                        🏆
                      </div>
                    ) : (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white border border-neutral-200 text-neutral-400 rounded-full w-4.5 h-4.5 flex items-center justify-center text-[7px] shadow-3xs">
                        <Lock size={7} />
                      </div>
                    )}
                  </motion.button>
                );
              })}
          </div>

          {/* Active Hover Detail Inspector Panel (Solves tooltips clipping) */}
          <div className="p-4 bg-neutral-50/60 rounded-2xl border border-neutral-200/50 text-left min-h-[92px] flex flex-col justify-center transition-all">
            {hoveredBadgeLevel ? (
              <div className="space-y-1 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-extrabold text-neutral-900 text-xs">
                      Module {hoveredBadgeLevel.id}: {hoveredBadgeLevel.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wide ${getCategoryStyle(hoveredBadgeLevel.category).pillColor}`}>
                      {getCategoryStyle(hoveredBadgeLevel.category).label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-600">
                    {completedLevels.some(cl => cl.id === hoveredBadgeLevel.id) ? "🏆 UNLOCKED (100% Complete)" : "🔒 LOCKED (Under active work)"}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-medium line-clamp-2">
                  {hoveredBadgeLevel.description}
                </p>
                <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>⚓ Difficulty: <span className="font-sans font-bold text-neutral-700">{hoveredBadgeLevel.difficulty}</span></span>
                  <span>Impact: <span className="font-sans font-bold text-neutral-700 truncate max-w-sm shrink-0 inline-block align-bottom">{hoveredBadgeLevel.businessImpact}</span></span>
                </div>
              </div>
            ) : (
              <div className="text-center md:text-left flex items-center justify-center md:justify-start gap-2 text-xs text-neutral-400 font-sans font-medium">
                <Smile size={16} />
                <span>Gain true search engine trust. Highlight over any circular badge icon to inspect its metadata, title, and unlock requirements.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🏅 Digital Mastery Certifications Showcase */}
      <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="space-y-1">
            <h2 className="text-xl font-sans font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <Award className="text-emerald-600 shrink-0" size={22} />
              <span>Digital Mastery Certifications</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Personalized verified credentials to showcase your deep understanding of enterprise-level search engine mechanics.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">STUDENT NAME:</label>
            <input 
              type="text" 
              value={graduateName}
              onChange={(e) => setGraduateName(e.target.value)}
              placeholder="Your Name"
              className="bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-200 focus:border-neutral-400 px-3 py-1.5 rounded-xl text-xs font-bold font-sans text-neutral-800 focus:outline-none transition-all placeholder-neutral-400"
              title="Personalize your printed digital credentials"
            />
          </div>
        </div>

        {/* List of Awards */}
        {(!progress.awards || progress.awards.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-3 bg-neutral-50/50 border border-dashed border-neutral-200/80 rounded-2xl">
            <div className="p-3 bg-white border border-neutral-200/60 rounded-full shadow-2xs text-neutral-400">
              <Award size={32} className="opacity-60" />
            </div>
            <div className="max-w-md space-y-1">
              <p className="text-xs font-bold text-neutral-900 font-sans">No certifications unlocked yet</p>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-medium">
                Complete 100% of standard checklists or custom courses in the syllabus below to generate legally styled verified secure credentials with completion timestamps here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.awards.map((award, idx) => {
              const formattedDate = new Date(award.completedAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              const style = getCategoryStyle(award.category);
              const credentialId = `LMS-MD-${new Date(award.completedAt).getFullYear()}-${String(idx + 101).padStart(3, '0')}`;

              return (
                <div 
                  key={award.id}
                  className="bg-gradient-to-br from-neutral-50 to-white hover:to-neutral-50 border border-neutral-200 hover:border-amber-300 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-xs group relative overflow-hidden"
                >
                  {/* Watermark Crest */}
                  <div className="absolute right-2 bottom-3 text-7xl text-neutral-200/25 select-none pointer-events-none transition-transform group-hover:scale-110 duration-500 font-extrabold font-mono uppercase">🏆</div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wide border ${style.pillColor}`}>
                        {style.label}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-neutral-400">
                        {credentialId}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-sans font-bold text-neutral-900 tracking-tight group-hover:text-amber-500 transition-colors line-clamp-1">
                        Mastery Certification
                      </h4>
                      <p className="text-xs text-neutral-500 font-sans font-semibold truncate leading-none pt-0.5">
                        {award.title}
                      </p>
                    </div>

                    <div className="space-y-0.5 pt-1.5 border-t border-neutral-100">
                      <div className="text-[9px] font-mono text-neutral-400 uppercase">GRADUATE CANDIDATE:</div>
                      <div className="text-[11px] font-sans font-extrabold text-neutral-800 line-clamp-1">
                        {graduateName || "Verified Candidate"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-neutral-50">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-neutral-400 block uppercase leading-none">Completed At</span>
                      <span className="text-[10px] text-neutral-700 font-sans font-extrabold leading-none">{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleShareAward(e, award, credentialId)}
                        className={`px-2.5 py-1.5 border font-sans font-bold text-[11px] rounded-xl transition-all cursor-pointer inline-flex items-center gap-1 shadow-3xs ${
                          sharingAwardId === award.id
                            ? "bg-emerald-50 text-emerald-800 border-emerald-350"
                            : "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-150"
                        }`}
                        title="Share certification status"
                      >
                        {sharingAwardId === award.id ? (
                          <>
                            <Check size={11} className="text-emerald-600 animate-bounce" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 size={11} className="text-neutral-500" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewingAward({ ...award, credentialId, formattedDate })}
                        className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 group-hover:bg-amber-500 text-white group-hover:text-neutral-950 font-sans font-bold text-xs rounded-xl shadow-2xs hover:scale-[1.03] transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Show Diploma</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Curriculum Tracks Section */}
      <div className="space-y-6" id="dashboard-curriculum-section">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-2">
          <div className="relative pl-5 border-l-4 border-emerald-500 py-1.5 space-y-1">
            <h2 className="text-2xl font-sans font-bold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <BookOpen className="text-emerald-600 shrink-0" size={22} />
              Curriculum Categories &amp; Tracks
            </h2>
            <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed font-medium">
              Select one of the nine structured mastery paths below to browse specific checklists, lessons, and interactive quiz components.
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="w-full lg:w-auto overflow-x-auto scrollbar-none pb-1.5 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100/80 rounded-xl border border-neutral-200/80 min-w-max shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-white text-neutral-900 shadow-xs border border-neutral-200/50"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/40"
                }`}
              >
                All Paths ({INITIAL_TRACKS.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("tech")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedCategory === "tech"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50/50"
                }`}
              >
                <Cpu size={13} className={selectedCategory === "tech" ? "text-white" : "text-emerald-600"} />
                Tech &amp; Semantics
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("content")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedCategory === "content"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-neutral-500 hover:text-blue-700 hover:bg-blue-50/50"
                }`}
              >
                <Layers size={13} className={selectedCategory === "content" ? "text-white" : "text-blue-600"} />
                On-Page &amp; AI
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("growth")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedCategory === "growth"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-neutral-500 hover:text-purple-700 hover:bg-purple-50/50"
                }`}
              >
                <Globe size={13} className={selectedCategory === "growth" ? "text-white" : "text-purple-600"} />
                Authority &amp; CRO
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid Container */}
        <div className="space-y-6">
          {[
            {
              id: "tech" as const,
              name: "Technical Foundations & Semantic Web",
              description: "Build clean machine-readable infrastructures, search-spider accessible pathways, and robust JSON-LD entity schema designs.",
              icon: <Cpu size={20} className="text-emerald-600 shrink-0" />,
              accentBg: "bg-emerald-50 text-emerald-800 border-emerald-100",
              groupBorder: "border-emerald-200/60 bg-emerald-50/[0.12]",
              tracks: [INITIAL_TRACKS[0], INITIAL_TRACKS[1], INITIAL_TRACKS[2], INITIAL_TRACKS[4]]
            },
            {
              id: "content" as const,
              name: "On-Page Relevance & Generative AI Search",
              description: "Publish high-E-E-A-T articles, optimize topic maps, capture voice-read triggers, and configure content sitemaps for dynamic RAG engines.",
              icon: <Layers size={20} className="text-blue-600 shrink-0" />,
              accentBg: "bg-blue-50 text-blue-800 border-blue-100",
              groupBorder: "border-blue-200/60 bg-blue-50/[0.12]",
              tracks: [INITIAL_TRACKS[3], INITIAL_TRACKS[5], INITIAL_TRACKS[6], INITIAL_TRACKS[7]]
            },
            {
              id: "growth" as const,
              name: "External Authority & Performance Optimization",
              description: "Improve external brand reference metrics, optimize Core Web Vitals, deploy dynamic CRO checklists, and track multi-LLM citation values.",
              icon: <Globe size={20} className="text-purple-600 shrink-0" />,
              accentBg: "bg-purple-50 text-purple-800 border-purple-100",
              groupBorder: "border-purple-200/60 bg-purple-50/[0.12]",
              tracks: [INITIAL_TRACKS[8]]
            }
          ]
            .filter(group => selectedCategory === "all" || group.id === selectedCategory)
            .map(group => {
              // Calculate category-wide items counts and progress
              const groupLevels = levels.filter(l => typeof l.id === "number" && group.tracks.some(t => t?.levelIds.includes(l.id as number)));
              const totalGroupItems = groupLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
              const completedGroupItems = groupLevels.reduce((sum, l) => {
                return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
              }, 0);
              const groupPercent = totalGroupItems > 0 ? Math.round((completedGroupItems / totalGroupItems) * 100) : 0;

              return (
                <div 
                  key={group.id} 
                  className={`p-6 rounded-2xl border transition-all ${group.groupBorder} space-y-5`}
                >
                  {/* Category Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-200/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${group.accentBg}`}>
                          {group.id === "tech" ? "Technical" : group.id === "content" ? "Content & AI" : "Authority & CRO"}
                        </span>
                        <h3 className="text-lg font-sans font-bold text-neutral-800 tracking-tight flex items-center gap-2">
                          {group.icon}
                          {group.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-4xl">
                        {group.description}
                      </p>
                    </div>

                    {/* Integrated Category Progress Ring/Pill */}
                    <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-neutral-200/80 rounded-xl shadow-2xs self-start sm:self-auto">
                      <div className="w-14 bg-neutral-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            group.id === "tech" ? "bg-emerald-500" : group.id === "content" ? "bg-blue-500" : "bg-purple-500"
                          }`}
                          style={{ width: `${groupPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-neutral-800 shrink-0">
                        {groupPercent}% Done
                      </span>
                    </div>
                  </div>

                  {/* Tracks under Category Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.tracks.map((track) => {
                      if (!track) return null;
                      
                      const trackLevels = levels.filter(l => typeof l.id === "number" && track.levelIds.includes(l.id as number));
                      const totalTrackItems = trackLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
                      const completedTrackItems = trackLevels.reduce((sum, l) => {
                        return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
                      }, 0);
                      
                      const trackPercent = totalTrackItems > 0 ? Math.round((completedTrackItems / totalTrackItems) * 100) : 0;

                      return (
                        <motion.div
                          key={track.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer bg-white border-neutral-200 hover:shadow-md hover:border-neutral-300 relative overflow-hidden flex flex-col justify-between h-[200px] group`}
                          onClick={() => {
                            onChangeTrack(track.id);
                            tabChanger("curriculum");
                          }}
                        >
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded border border-neutral-200">
                                {trackLevels.length} MODULES
                              </span>
                              <span className={`text-xs font-mono font-bold ${track.textColorClass || "text-neutral-800"} px-1.5 py-0.5 rounded`}>
                                {trackPercent}% Done
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="font-sans font-bold text-neutral-900 tracking-tight text-sm group-hover:text-neutral-800 transition-colors line-clamp-1">
                                {track.title}
                              </h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-normal line-clamp-2">
                                {track.description}
                              </p>
                            </div>
                          </div>

                          {/* Track Progress Indicator */}
                          <div className="space-y-2 pt-3 border-t border-neutral-100">
                            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-neutral-800 h-full transition-all duration-300" 
                                style={{ width: `${trackPercent}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                              <span>{completedTrackItems} / {totalTrackItems} VERIFIED</span>
                              <span className="text-neutral-800 font-bold flex items-center gap-1 group-hover:underline">
                                Open Path <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>      {/* Consulting & Corporate Training Program Banner */}
      <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl border border-neutral-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20">
              Enterprise Partnering
            </span>
          </div>
          <h3 className="font-sans font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-400 animate-pulse" />
            Corporate Training &amp; Conversational Search Audits
          </h3>
          <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
            Need customized team workshops, AEO (Answer Engine Optimization) compliance audits, or bespoke schema engineering for your corporate domains? Book consultant training hours to direct your digital teams.
          </p>
        </div>
        <button
          onClick={onOpenConsulting}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans font-bold rounded-xl text-xs transition-all shadow-md shrink-0 border border-emerald-400/20 hover:scale-[1.02] cursor-pointer"
        >
          Book Consultation
        </button>
      </div>

      {/* Extra Interactive Tools Promo Card */}
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
        <div className="space-y-1">
          <h3 className="font-sans font-bold text-neutral-900 text-md sm:text-lg flex items-center gap-2">
            <BookOpen size={18} className="text-neutral-700" />
            LMS Course Creation Software Active
          </h3>
          <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
            Need custom diagnostic checklists for your specific enterprise client or audit scenarios? Launch our modular course builder tool to write your own checklist levels and custom study queries.
          </p>
        </div>
        <button
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-semibold transition-all shadow-sm shrink-0 hover:scale-[1.02] cursor-pointer"
          onClick={() => tabChanger("creator")}
        >
          Build Custom Course
        </button>
      </div>

      {/* 🏆 Full-screen Celebratory Mastery Award Overlay */}
      <CelebrationConfetti
        activeCelebrateId={activeCelebrateId}
        celebratedLevel={celebratedLevel}
        onDismiss={handleCelebrateDismiss}
      />

      {/* 📜 Printable Interactive Digital Mastery Certificate Modal Overlay */}
      {viewingAward && (
        <div className="fixed inset-0 z-[100] bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="diploma-modal">
          <div className="max-w-2xl w-full bg-stone-50 rounded-3xl p-1 shadow-2xl relative border border-stone-200">
            {/* Modal Actions - float top right */}
            <div className="absolute -top-12 right-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={(e) => handleShareAward(e, viewingAward, viewingAward.credentialId)}
                className={`px-3 py-1.5 border hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                  sharingAwardId === viewingAward.id
                    ? "bg-emerald-600 border-emerald-500 hover:bg-emerald-700"
                    : "bg-neutral-900 border-neutral-750"
                }`}
                title="Share this dynamic credential"
              >
                {sharingAwardId === viewingAward.id ? (
                  <>
                    <Check size={12} className="text-white animate-bounce" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={12} />
                    <span>Share Status</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  try {
                    window.print();
                  } catch (e) {}
                }}
                className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-750 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <span>🖨️ Print Diploma</span>
              </button>
              <button
                type="button"
                onClick={() => setViewingAward(null)}
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer border border-neutral-700 transition-all"
                title="Dismiss Certificate"
              >
                ✕
              </button>
            </div>

            {/* Classical Certificate Theme Border */}
            <div className="border-4 border-double border-amber-600/70 rounded-2xl p-6 sm:p-10 text-center space-y-6 relative overflow-hidden bg-white shadow-inner">
              {/* Background watermark crest motif */}
              <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>
              
              <div className="space-y-4">
                {/* Gold Seal / Crest */}
                <div className="inline-flex relative">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 text-3xl font-serif font-extrabold shadow-sm">
                    ★
                  </div>
                  <div className="absolute inset-0 border border-dashed border-amber-600/40 rounded-full animate-spin [animation-duration:15s]"></div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-amber-600 font-extrabold uppercase">
                    OFFICIAL BOARD CERTIFICATION CREDENTIAL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 tracking-tight leading-none mt-1">
                    Certificate of Mastery
                  </h3>
                  <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2.5"></div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[11px] font-mono text-neutral-500 italic uppercase">
                  THIS DOCUMENT SECURELY CONFIRMS THAT
                </span>
                
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-700 italic tracking-tight line-clamp-1 py-1">
                    {graduateName || "Verified Graduate Candidate"}
                  </h4>
                  <p className="text-xs text-neutral-400 font-semibold font-mono">
                    Candidate Code: {(viewingAward as any).credentialId}
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <p className="text-[12px] sm:text-xs text-neutral-600 leading-relaxed font-sans font-medium">
                    has successfully unlocked and completed 100% of the rigorous, specialized checklists, diagnostic quizzes, and required curriculum components comprising:
                  </p>
                  
                  <p className="text-sm sm:text-base font-sans font-extrabold text-neutral-900 bg-neutral-50 py-2.5 px-4 rounded-xl border border-neutral-150 inline-block">
                    {(viewingAward as any).title}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 sm:pt-8 border-t border-neutral-100 max-w-lg mx-auto">
                <div className="space-y-1 text-center">
                  <div className="text-xs italic font-serif text-neutral-800 line-clamp-1">Amrish Kumar Singh</div>
                  <div className="w-full h-[1px] bg-neutral-200"></div>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Enterprise Lead Auditor</span>
                </div>

                <div className="space-y-1 text-center">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-neutral-800 leading-none py-1 truncate">
                    {(viewingAward as any).formattedDate}
                  </div>
                  <div className="w-full h-[1px] bg-neutral-200"></div>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Verification Timestamp</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-4">
                <p className="text-[9px] font-mono text-neutral-400 uppercase">
                  Verified Security Hash Seal:
                </p>
                <div className="bg-neutral-50 border border-neutral-150 rounded-lg p-2 max-w-sm mx-auto">
                  <p className="text-[8px] font-mono text-neutral-400 select-all truncate">
                    LMS-SEC-XF92-{(viewingAward as any).id.toUpperCase()}-{new Date((viewingAward as any).completedAt).getTime()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
