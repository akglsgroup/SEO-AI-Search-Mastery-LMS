/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Level, Track, CustomCourse, UserProgress } from "../types";
import { 
  getAllTracks, 
  SYLLABUS_TIERS, 
  LEARNING_ROADMAP_STEPS, 
  SyllabusTier, 
  RoadmapStep 
} from "../data/coursesData";
import { 
  Check, 
  Search, 
  BookOpen, 
  Clock, 
  Tag, 
  ChevronRight, 
  LayoutGrid, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  GraduationCap, 
  Pencil, 
  Trash2, 
  Layers, 
  Wrench, 
  Network, 
  Code, 
  Store, 
  Globe, 
  MapPin, 
  BarChart3, 
  Shield, 
  ArrowRight, 
  Compass, 
  CheckCircle2,
  Trophy,
  SlidersHorizontal,
  Flame,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";

import VisualLearningLab from "./VisualLearningLab";
import GamificationArena from "./GamificationArena";

const ALL_TRACKS = getAllTracks();

interface CourseCurriculumProps {
  levels: Level[];
  progress: UserProgress;
  onSelectLevel: (levelId: number | string) => void;
  selectedTrackId: string;
  onSelectTrackId: (trackId: string) => void;
  onDeleteCustomCourse?: (id: string) => void;
  onEditCustomCourse?: (course: CustomCourse) => void;
  onOpenConsulting?: () => void;
  userPoints?: number;
  streakCount?: number;
  onClaimDailyBonus?: (xp: number) => void;
}

// Track visual styling map
const TRACK_STYLING: Record<string, { 
  icon: React.ReactNode; 
  color: string; 
  bg: string; 
  activeBg: string; 
  textClass: string; 
  border: string; 
  accentBorder: string;
  tierNumber: number;
}> = {
  "seo-course": {
    icon: <GraduationCap className="text-indigo-600 shrink-0" size={16} />,
    color: "bg-indigo-600",
    bg: "bg-indigo-50/50",
    activeBg: "bg-indigo-600 text-white",
    textClass: "text-indigo-900 border-indigo-500/30",
    border: "border-indigo-200/70",
    accentBorder: "border-indigo-500",
    tierNumber: 1
  },
  fundamentals: {
    icon: <Layers className="text-slate-600 shrink-0" size={16} />,
    color: "bg-slate-600",
    bg: "bg-slate-50/50",
    activeBg: "bg-slate-700 text-white",
    textClass: "text-slate-900 border-slate-500/30",
    border: "border-slate-200/70",
    accentBorder: "border-slate-500",
    tierNumber: 1
  },
  gbp: {
    icon: <MapPin className="text-sky-600 shrink-0" size={16} />,
    color: "bg-sky-600",
    bg: "bg-sky-50/50",
    activeBg: "bg-sky-600 text-white",
    textClass: "text-sky-900 border-sky-500/30",
    border: "border-sky-200/70",
    accentBorder: "border-sky-500",
    tierNumber: 1
  },
  wordpress: {
    icon: <Globe className="text-blue-600 shrink-0" size={16} />,
    color: "bg-blue-600",
    bg: "bg-blue-50/50",
    activeBg: "bg-blue-600 text-white",
    textClass: "text-blue-900 border-blue-500/30",
    border: "border-blue-200/70",
    accentBorder: "border-blue-500",
    tierNumber: 3
  },
  "content-strategy": {
    icon: <BookOpen className="text-purple-600 shrink-0" size={16} />,
    color: "bg-purple-600",
    bg: "bg-purple-50/50",
    activeBg: "bg-purple-600 text-white",
    textClass: "text-purple-900 border-purple-500/30",
    border: "border-purple-200/70",
    accentBorder: "border-purple-500",
    tierNumber: 2
  },
  "entity-graphs": {
    icon: <Network className="text-blue-600 shrink-0" size={16} />,
    color: "bg-blue-600",
    bg: "bg-blue-50/50",
    activeBg: "bg-blue-600 text-white",
    textClass: "text-blue-900 border-blue-500/30",
    border: "border-blue-200/70",
    accentBorder: "border-blue-500",
    tierNumber: 2
  },
  "semantic-markup": {
    icon: <Code className="text-cyan-600 shrink-0" size={16} />,
    color: "bg-cyan-600",
    bg: "bg-cyan-50/50",
    activeBg: "bg-cyan-600 text-white",
    textClass: "text-cyan-900 border-cyan-500/30",
    border: "border-cyan-200/70",
    accentBorder: "border-cyan-500",
    tierNumber: 2
  },
  "niche-verticals": {
    icon: <Store className="text-orange-600 shrink-0" size={16} />,
    color: "bg-orange-600",
    bg: "bg-orange-50/50",
    activeBg: "bg-orange-600 text-white",
    textClass: "text-orange-900 border-orange-500/30",
    border: "border-orange-200/70",
    accentBorder: "border-orange-500",
    tierNumber: 2
  },
  "tech-eng": {
    icon: <Wrench className="text-emerald-600 shrink-0" size={16} />,
    color: "bg-emerald-600",
    bg: "bg-emerald-50/50",
    activeBg: "bg-emerald-600 text-white",
    textClass: "text-emerald-900 border-emerald-500/30",
    border: "border-emerald-200/70",
    accentBorder: "border-emerald-500",
    tierNumber: 3
  },
  "gsc-complete": {
    icon: <Search className="text-teal-600 shrink-0" size={16} />,
    color: "bg-teal-600",
    bg: "bg-teal-50/50",
    activeBg: "bg-teal-600 text-white",
    textClass: "text-teal-900 border-teal-500/30",
    border: "border-teal-200/70",
    accentBorder: "border-teal-500",
    tierNumber: 4
  },
  ga4: {
    icon: <BarChart3 className="text-orange-600 shrink-0" size={16} />,
    color: "bg-orange-600",
    bg: "bg-orange-50/50",
    activeBg: "bg-orange-600 text-white",
    textClass: "text-orange-900 border-orange-500/30",
    border: "border-orange-200/70",
    accentBorder: "border-orange-500",
    tierNumber: 5
  },
  "authority-conversion": {
    icon: <Globe className="text-rose-600 shrink-0" size={16} />,
    color: "bg-rose-600",
    bg: "bg-rose-50/50",
    activeBg: "bg-rose-600 text-white",
    textClass: "text-rose-900 border-rose-500/30",
    border: "border-rose-200/70",
    accentBorder: "border-rose-500",
    tierNumber: 5
  },
  geo: {
    icon: <Zap className="text-violet-600 shrink-0" size={16} />,
    color: "bg-violet-600",
    bg: "bg-violet-50/50",
    activeBg: "bg-violet-600 text-white",
    textClass: "text-violet-900 border-violet-500/30",
    border: "border-violet-200/70",
    accentBorder: "border-violet-500",
    tierNumber: 6
  },
  aeo: {
    icon: <MessageSquare className="text-amber-600 shrink-0" size={16} />,
    color: "bg-amber-600",
    bg: "bg-amber-50/50",
    activeBg: "bg-amber-600 text-white",
    textClass: "text-amber-900 border-amber-500/30",
    border: "border-amber-200/70",
    accentBorder: "border-amber-500",
    tierNumber: 6
  },
  sxo: {
    icon: <Network className="text-indigo-600 shrink-0" size={16} />,
    color: "bg-indigo-600",
    bg: "bg-indigo-50/50",
    activeBg: "bg-indigo-600 text-white",
    textClass: "text-indigo-900 border-indigo-500/30",
    border: "border-indigo-200/70",
    accentBorder: "border-indigo-500",
    tierNumber: 6
  }
};

export default function CourseCurriculum({
  levels,
  progress,
  onSelectLevel,
  selectedTrackId,
  onSelectTrackId,
  onDeleteCustomCourse,
  onEditCustomCourse,
  onOpenConsulting,
  userPoints = 0,
  streakCount = 1,
  onClaimDailyBonus
}: CourseCurriculumProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"modules" | "roadmap" | "visual-lab" | "gamification">("modules");
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Helper to get completion % for a level
  const getLevelProgress = (level: Level) => {
    if (level.checklistItems.length === 0) return 0;
    const completed = level.checklistItems.filter(item => 
      progress.completedItemIds.includes(item.id)
    ).length;
    return Math.round((completed / level.checklistItems.length) * 100);
  };

  // Helper to calculate progress for a specific track
  const getTrackProgressMetrics = (trackId: string) => {
    const track = ALL_TRACKS.find(t => t.id === trackId);
    if (!track) return { percent: 0, completed: 0, total: 0 };
    
    const trackLevels = levels.filter(l => track.levelIds.includes(l.id));
    const totalItems = trackLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
    const completedItems = trackLevels.reduce((sum, l) => {
      return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
    }, 0);

    return {
      percent: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      completed: completedItems,
      total: totalItems
    };
  };

  // Helper to calculate progress for a tier
  const getTierProgressMetrics = (tier: SyllabusTier) => {
    const tierLevels = levels.filter(l => {
      return tier.trackIds.some(tid => {
        const track = ALL_TRACKS.find(t => t.id === tid);
        return track && track.levelIds.includes(l.id);
      });
    });
    const totalItems = tierLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
    const completedItems = tierLevels.reduce((sum, l) => {
      return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
    }, 0);

    return {
      percent: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      completed: completedItems,
      total: totalItems,
      moduleCount: tierLevels.length
    };
  };

  // Overall statistics for all track levels
  const totalAllItems = useMemo(() => levels.reduce((sum, l) => sum + l.checklistItems.length, 0), [levels]);
  const completedAllItems = useMemo(() => {
    return levels.reduce((sum, l) => {
      return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
    }, 0);
  }, [levels, progress.completedItemIds]);
  const overallAllPercent = totalAllItems > 0 ? Math.round((completedAllItems / totalAllItems) * 100) : 0;
  const totalXP = useMemo(() => levels.reduce((sum, l) => sum + l.checklistItems.reduce((acc, it) => acc + (it.points || 10), 0), 0), [levels]);

  // Recommended next module to study
  const recommendedNextLevel = useMemo(() => {
    // Find the first level that is in-progress (< 100% and > 0%) or the first unstarted level
    const inProgress = levels.find(l => {
      const p = getLevelProgress(l);
      return p > 0 && p < 100;
    });
    if (inProgress) return inProgress;

    const unstarted = levels.find(l => getLevelProgress(l) === 0);
    return unstarted || levels[0];
  }, [levels, progress.completedItemIds]);

  // Filtered tracks based on selected tier
  const filteredTracks = useMemo(() => {
    return ALL_TRACKS.filter(track => {
      if (selectedTierFilter === "all") return true;
      const tier = SYLLABUS_TIERS.find(t => t.id === selectedTierFilter);
      return tier ? tier.trackIds.includes(track.id) : true;
    });
  }, [selectedTierFilter]);

  // Filtered levels based on search, difficulty, status, and track
  const filteredLevels = useMemo(() => {
    return levels.filter(level => {
      const matchesSearch = 
        level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        level.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        level.details.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Difficulty filter
      if (difficultyFilter !== "all" && level.difficulty?.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }

      // Status filter
      const p = getLevelProgress(level);
      if (statusFilter === "completed" && p < 100) return false;
      if (statusFilter === "in-progress" && (p === 0 || p === 100)) return false;
      if (statusFilter === "unstarted" && p > 0) return false;

      // Track filter
      if (selectedTrackId === "all") {
        // If tier filter is active
        if (selectedTierFilter !== "all") {
          const tier = SYLLABUS_TIERS.find(t => t.id === selectedTierFilter);
          if (tier) {
            const isMatch = tier.trackIds.some(tid => {
              const track = ALL_TRACKS.find(t => t.id === tid);
              return track && track.levelIds.includes(level.id);
            });
            if (!isMatch) return false;
          }
        }
        return true;
      }
      
      if (selectedTrackId === "custom") {
        return false;
      }

      const targetTrack = ALL_TRACKS.find(t => t.id === selectedTrackId);
      if (!targetTrack) return true;
      return targetTrack.levelIds.includes(level.id);
    });
  }, [levels, searchQuery, difficultyFilter, statusFilter, selectedTrackId, selectedTierFilter, progress.completedItemIds]);

  // Render a single navigation item inside sidebar
  const renderSidebarItem = (
    trackId: string, 
    title: string, 
    countText: string, 
    iconNode: React.ReactNode, 
    activeClass: string, 
    inactiveClass: string, 
    progressPercent: number
  ) => {
    const isActive = selectedTrackId === trackId;
    return (
      <button
        key={trackId}
        onClick={() => onSelectTrackId(trackId)}
        className={`w-full p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
          isActive 
            ? activeClass + " shadow-sm font-bold scale-[1.01]" 
            : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center ${isActive ? "bg-white/20" : "bg-neutral-100"}`}>
            {React.cloneElement(iconNode as React.ReactElement, { 
              size: 14,
              className: isActive ? "text-white" : "" 
            })}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[11.5px] font-sans font-extrabold leading-tight truncate">
              {title}
            </h4>
            <span className={`text-[8.5px] font-mono font-semibold ${isActive ? "text-white/80" : "text-neutral-400"}`}>
              {countText}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full flex items-center gap-1.5 mt-0.5">
          <div className={`flex-1 ${isActive ? "bg-white/20" : "bg-neutral-100"} h-1 rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${isActive ? "bg-white" : progressPercent === 100 ? "bg-emerald-500" : "bg-neutral-900"}`} 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className={`text-[8.5px] font-mono font-bold shrink-0 ${isActive ? "text-white" : "text-neutral-500"}`}>
            {progressPercent}%
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6" id="lms-syllabus">
      
      {/* Syllabus Header with KPI Stats */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
              <Compass size={13} className="text-emerald-400" />
              <span>Beginner to Master SEO Roadmap</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <span>SEO Mastery Syllabus</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Step-by-step verified curriculum ordered across 5 progression tiers: from crawling fundamentals and brand baseline to advanced technical engineering, GA4 analytics, and Generative Engine Optimization (GEO).
            </p>
          </div>

          {/* Key Metrics Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 shrink-0">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">Total Modules</span>
              <span className="text-lg font-sans font-black text-white">{levels.length}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">Total Checkpoints</span>
              <span className="text-lg font-sans font-black text-white">{totalAllItems}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">Overall Progress</span>
              <span className="text-lg font-sans font-black text-emerald-400">{overallAllPercent}%</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">Mastery Points</span>
              <span className="text-lg font-sans font-black text-amber-400">{totalXP} XP</span>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xs font-mono font-bold text-neutral-300 shrink-0">
              Curriculum Completion: {completedAllItems}/{totalAllItems} Verified
            </span>
            <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden max-w-md">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${overallAllPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-sans">
              {overallAllPercent === 100 ? "🎉 Entire Syllabus Mastered!" : "Target: Reach 100% for Full SEO Certification"}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Next Step Quick-Action Banner */}
      {recommendedNextLevel && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-50 via-purple-50/40 to-blue-50 border border-indigo-100 rounded-2xl shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5 sm:mt-0">
              <Flame size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                  Recommended Next Step
                </span>
                <span className="px-2 py-0.2 text-[9px] font-mono font-bold bg-indigo-200/70 text-indigo-900 rounded-full">
                  Level {recommendedNextLevel.id} • {recommendedNextLevel.difficulty}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-sans font-extrabold text-neutral-900 leading-tight">
                {recommendedNextLevel.title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-1">
                {recommendedNextLevel.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono font-bold text-neutral-400 block">Estimated Study</span>
              <span className="text-xs font-sans font-bold text-neutral-800">{recommendedNextLevel.estimatedMinutes} Mins</span>
            </div>
            <button
              onClick={() => onSelectLevel(recommendedNextLevel.id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-sans font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
            >
              <span>{getLevelProgress(recommendedNextLevel) > 0 ? "Resume Module" : "Start Module"}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* View Mode & Tier Filtering Bar */}
      <div className="space-y-4 p-4 bg-white border border-neutral-200/80 rounded-2xl shadow-3xs">
        
        {/* Top Controls: View Mode Toggle & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* View Mode Toggle */}
          <div className="inline-flex flex-wrap p-1 bg-neutral-100 rounded-xl border border-neutral-200/60 self-start gap-1">
            <button
              onClick={() => setViewMode("modules")}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "modules"
                  ? "bg-white text-neutral-900 shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <LayoutGrid size={13} />
              <span>Categorized Syllabus</span>
            </button>
            <button
              onClick={() => setViewMode("roadmap")}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "roadmap"
                  ? "bg-white text-neutral-900 shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Compass size={13} />
              <span>15-Step Roadmap</span>
            </button>
            <button
              onClick={() => setViewMode("visual-lab")}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "visual-lab"
                  ? "bg-white text-purple-950 shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Cpu size={13} className="text-purple-600" />
              <span>Visual Learning Lab</span>
            </button>
            <button
              onClick={() => setViewMode("gamification")}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "gamification"
                  ? "bg-white text-amber-950 shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Trophy size={13} className="text-amber-500" />
              <span>Ranks &amp; Quests</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search syllabus modules, terms, schema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl text-xs font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent placeholder:text-neutral-400 shadow-3xs transition-all"
            />
          </div>
        </div>

        {/* Tier Chips Navigation */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold shrink-0 mr-1 hidden sm:inline">
              Progression Tier:
            </span>
            
            <button
              onClick={() => {
                setSelectedTierFilter("all");
                onSelectTrackId("all");
              }}
              className={`px-3 py-1 rounded-xl text-xs font-sans font-bold transition-all shrink-0 cursor-pointer ${
                selectedTierFilter === "all"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              All Tiers ({levels.length})
            </button>

            {SYLLABUS_TIERS.map(tier => {
              const metrics = getTierProgressMetrics(tier);
              const isSelected = selectedTierFilter === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    setSelectedTierFilter(tier.id);
                    onSelectTrackId("all");
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-sans font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    tier.difficulty === "Beginner" ? "bg-emerald-500" :
                    tier.difficulty === "Intermediate" ? "bg-blue-500" :
                    tier.difficulty === "Advanced" ? "bg-amber-500" : "bg-purple-500"
                  }`} />
                  <span>{tier.shortTitle}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-neutral-300" : "text-neutral-400"}`}>
                    {metrics.percent}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Row: Difficulty & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase flex items-center gap-1">
              <SlidersHorizontal size={11} /> Filters:
            </span>
            
            {/* Difficulty select */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-sans font-semibold text-neutral-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>

            {/* Status select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-sans font-semibold text-neutral-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed (100%)</option>
              <option value="unstarted">Not Started</option>
            </select>
          </div>

          <div className="text-neutral-400 font-mono text-[11px]">
            Showing <strong className="text-neutral-800 font-bold">{filteredLevels.length}</strong> matching modules
          </div>
        </div>

      </div>

      {/* ROADMAP VIEW: Chronological Step-by-Step Pathway */}
      {viewMode === "roadmap" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Roadmap Intro Card */}
          <div className="p-5 bg-gradient-to-r from-neutral-50 via-slate-50 to-neutral-50 rounded-2xl border border-neutral-200/80">
            <div className="flex items-center gap-2 text-neutral-900 mb-1">
              <Compass size={18} className="text-indigo-600" />
              <h3 className="font-sans font-extrabold text-base">Step-by-Step Sequential Learning Roadmap</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-3xl">
              Follow this verified 15-step linear milestone progression to transition smoothly from a search beginner to an enterprise-grade SEO and GEO technical authority.
            </p>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-neutral-200 before:hidden md:before:block">
            {LEARNING_ROADMAP_STEPS.map((step, idx) => {
              const tier = SYLLABUS_TIERS.find(t => t.id === step.tierId);
              const stepLevels = levels.filter(l => step.levelIds.includes(l.id));
              const totalItems = stepLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
              const completedItems = stepLevels.reduce((sum, l) => {
                return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
              }, 0);
              const stepPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
              const isCompleted = stepPercent === 100;

              return (
                <div 
                  key={step.stepNumber} 
                  className="relative md:pl-14 space-y-2 group"
                >
                  {/* Step Milestone Bubble Marker */}
                  <div className={`hidden md:flex absolute left-3 -translate-x-1/2 top-4 w-7 h-7 rounded-full items-center justify-center font-mono font-bold text-xs border-2 shadow-2xs z-10 transition-all ${
                    isCompleted 
                      ? "bg-emerald-500 border-emerald-600 text-white" 
                      : stepPercent > 0 
                        ? "bg-neutral-900 border-neutral-900 text-white" 
                        : "bg-white border-neutral-300 text-neutral-600 group-hover:border-neutral-900"
                  }`}>
                    {isCompleted ? <Check size={13} strokeWidth={3} /> : step.stepNumber}
                  </div>

                  {/* Step Card */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isCompleted 
                      ? "bg-emerald-50/30 border-emerald-200/80 shadow-3xs" 
                      : "bg-white border-neutral-200 hover:border-neutral-300 shadow-3xs hover:shadow-sm"
                  }`}>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="space-y-1.5 flex-1">
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="md:hidden px-2 py-0.5 bg-neutral-900 text-white rounded-md text-[10px] font-mono font-bold">
                            Step {step.stepNumber}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold uppercase ${
                            step.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-800" :
                            step.difficulty === "Intermediate" ? "bg-blue-100 text-blue-800" :
                            step.difficulty === "Advanced" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                          }`}>
                            {step.difficulty}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            ⏱️ {step.estimatedMinutes} Mins
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-neutral-500">
                            • Track: <strong className="text-neutral-800 font-bold">{step.trackName}</strong>
                          </span>
                        </div>

                        <h4 className="text-base font-sans font-extrabold text-neutral-900 flex items-center gap-2">
                          <span>{step.title}</span>
                          <span className="text-xs font-mono font-normal text-neutral-400">({step.milestoneBadge})</span>
                        </h4>

                        <p className="text-xs text-neutral-500 font-sans font-medium">
                          {step.subtitle}
                        </p>

                        {/* Key Outcomes */}
                        <div className="pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                            Key Competencies Mastered:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-700 font-sans">
                            {step.keyOutcomes.map((outcome, oIdx) => (
                              <li key={oIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                                <span className="leading-tight">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Right Action & Progress */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-100 shrink-0">
                        
                        <div className="space-y-1 text-left sm:text-right">
                          <span className="text-[10px] font-mono text-neutral-400 font-semibold block">
                            Milestone Progress
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${isCompleted ? "bg-emerald-500" : "bg-neutral-900"}`}
                                style={{ width: `${stepPercent}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-800">
                              {stepPercent}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {stepLevels.length > 0 && (
                            <button
                              onClick={() => {
                                onSelectTrackId(step.trackId);
                                onSelectLevel(stepLevels[0].id);
                              }}
                              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1 cursor-pointer shadow-3xs"
                            >
                              <span>Study Step</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* CATEGORIZED MODULES VIEW: Main Structured Layout */}
      {viewMode === "modules" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Interactive Track Sidebar Column */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Mobile Swipeable View Rail */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-none snap-x">
              <button
                onClick={() => onSelectTrackId("all")}
                className={`snap-start shrink-0 px-3.5 py-1.5 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedTrackId === "all"
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
                    : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <LayoutGrid size={13} />
                <span>All ({overallAllPercent}%)</span>
              </button>

              {ALL_TRACKS.map(track => {
                const styling = TRACK_STYLING[track.id] || { icon: <BookOpen />, bg: "bg-neutral-100", activeBg: "bg-neutral-900 text-white" };
                const metrics = getTrackProgressMetrics(track.id);
                const displayTitle = track.title.split(". ")[1] || track.title;
                return (
                  <button
                    key={track.id}
                    onClick={() => onSelectTrackId(track.id)}
                    className={`snap-start shrink-0 px-3.5 py-1.5 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedTrackId === track.id
                        ? styling.activeBg + " border-transparent shadow-sm"
                        : `bg-white border-neutral-200 text-neutral-700 hover:${styling.bg}`
                    }`}
                  >
                    {React.cloneElement(styling.icon as React.ReactElement, { size: 12, className: selectedTrackId === track.id ? "text-white" : "" })}
                    <span>{displayTitle} ({metrics.percent}%)</span>
                  </button>
                );
              })}

              {progress.customCourses.length > 0 && (
                <button
                  onClick={() => onSelectTrackId("custom")}
                  className={`snap-start shrink-0 px-3.5 py-1.5 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedTrackId === "custom"
                      ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                      : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <Sparkles size={13} />
                  <span>Custom ({progress.customCourses.length})</span>
                </button>
              )}
            </div>

            {/* Desktop Sticky Vertical Menu Grouped by Tiers */}
            <div className="hidden lg:flex flex-col gap-3 p-3 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl sticky top-4 max-h-[85vh] overflow-y-auto scrollbar-thin">
              
              {/* All Tracks Button */}
              {renderSidebarItem(
                "all",
                "Full Mastery Syllabus",
                `All ${levels.length} modules`,
                <LayoutGrid size={15} />,
                "bg-neutral-900 border-neutral-900 text-white",
                "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200",
                overallAllPercent
              )}

              {/* Group Tracks under 5 Clear Progressive Tiers */}
              {SYLLABUS_TIERS.map(tier => {
                const tierTracks = ALL_TRACKS.filter(t => tier.trackIds.includes(t.id));
                if (tierTracks.length === 0) return null;
                const tierMetrics = getTierProgressMetrics(tier);

                return (
                  <div key={tier.id} className="space-y-1 pt-1 border-t border-neutral-200/60 first:border-t-0">
                    <div className="flex items-center justify-between px-2 py-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                        {tier.shortTitle}
                      </span>
                      <span className="text-[8.5px] font-mono font-bold text-neutral-500">
                        {tierMetrics.percent}%
                      </span>
                    </div>

                    <div className="space-y-1">
                      {tierTracks.map(track => {
                        const styling = TRACK_STYLING[track.id] || {
                          icon: <BookOpen size={14} />,
                          color: "bg-neutral-900",
                          activeBg: "bg-neutral-900 text-white",
                          bg: "bg-neutral-50"
                        };
                        const metrics = getTrackProgressMetrics(track.id);
                        const displayTitle = track.title.split(". ")[1] || track.title;
                        
                        return renderSidebarItem(
                          track.id,
                          displayTitle,
                          `${track.levelIds.length} modules`,
                          styling.icon,
                          styling.activeBg + " border-transparent",
                          `bg-white hover:${styling.bg} ${track.id === selectedTrackId ? "border-neutral-950" : "border-neutral-200"} text-neutral-700`,
                          metrics.percent
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Custom Courses Sidebar Button */}
              {progress.customCourses.length > 0 && 
                renderSidebarItem(
                  "custom",
                  "Custom Courses",
                  `${progress.customCourses.length} modules`,
                  <Sparkles size={15} className="text-amber-500" />,
                  "bg-amber-500 border-amber-500 text-white",
                  "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200",
                  Math.round(progress.customCourses.reduce((sum, c) => {
                    const items = c.checklistItems.length;
                    const completed = c.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
                    return sum + (items > 0 ? (completed / items) * 100 : 0);
                  }, 0) / progress.customCourses.length)
                )
              }
            </div>

            {/* Consulting Inquire Card */}
            <div className="hidden lg:block p-4 bg-emerald-50/40 border border-emerald-100 text-neutral-900 rounded-2xl shadow-3xs space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-emerald-600" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-800">
                  Corporate SEO Audits
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
                Need enterprise onsite SEO, AEO, or AI search compliance training? Work directly with search engineers.
              </p>
              <button
                type="button"
                onClick={onOpenConsulting}
                className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-[11px] rounded-xl transition-all shadow-xs text-center cursor-pointer"
              >
                Inquire Consultation
              </button>
            </div>

          </div>

          {/* Right Active Modules Column */}
          <div className="lg:col-span-9 space-y-6">

            {/* Active Tier Concept Primer Card (when a tier is filtered) */}
            {selectedTierFilter !== "all" && (() => {
              const activeTier = SYLLABUS_TIERS.find(t => t.id === selectedTierFilter);
              if (!activeTier) return null;
              const tierMetrics = getTierProgressMetrics(activeTier);
              return (
                <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-850 text-white rounded-2xl border border-neutral-800 shadow-sm space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <span>Tier 0{activeTier.tierNumber}</span>
                        <span>·</span>
                        <span>{activeTier.difficulty} Level</span>
                        <span>·</span>
                        <span>{activeTier.estimatedHours} Hours Required</span>
                      </div>
                      <h3 className="text-lg font-sans font-black text-white mt-1">
                        {activeTier.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <span className="text-xs font-mono text-neutral-300">
                        {tierMetrics.completed}/{tierMetrics.total} Checkpoints ({tierMetrics.percent}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      Core Concept &amp; Mental Model (In Plain English)
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                      {activeTier.conceptSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs text-neutral-300 border-t border-white/10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">
                        Prerequisites:
                      </span>
                      <p className="text-neutral-300 text-xs font-sans">
                        {activeTier.prerequisites}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">
                        Verified Skills Mastered:
                      </span>
                      <div className="flex flex-wrap gap-1 text-[11px] font-sans">
                        {activeTier.keySkills.map((sk, sIdx) => (
                          <span key={sIdx} className="text-neutral-300">
                            {sk}{sIdx < activeTier.keySkills.length - 1 ? " · " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Overall Syllabus Architecture Overview (when viewing all tiers) */}
            {selectedTierFilter === "all" && (
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-indigo-600" />
                    <h4 className="text-xs font-sans font-extrabold text-neutral-900 uppercase tracking-wider">
                      6-Tier Modern SEO Pedagogical Architecture
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Beginner → Master Flow
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 text-xs">
                  {SYLLABUS_TIERS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTierFilter(t.id);
                        onSelectTrackId("all");
                      }}
                      className="p-2.5 bg-white border border-neutral-200/70 hover:border-neutral-900 rounded-xl text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold text-neutral-400">
                        <span>Tier {t.tierNumber}</span>
                        <span>{t.difficulty[0]}</span>
                      </div>
                      <div className="text-[11px] font-sans font-bold text-neutral-800 group-hover:text-neutral-950 truncate mt-1">
                        {t.shortTitle.split(". ")[1] || t.shortTitle}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Custom Courses Block (if any exist) */}
            {progress.customCourses.length > 0 && (selectedTrackId === "all" || selectedTrackId === "custom") && (
              <div className="space-y-4 p-5 bg-gradient-to-r from-neutral-50 via-amber-50/20 to-neutral-50 rounded-2xl border border-neutral-200 shadow-3xs animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  <h3 className="font-sans font-bold text-neutral-900 text-sm">Your Custom Generated Courses</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {progress.customCourses.map(cc => {
                    const totalItems = cc.checklistItems.length;
                    const completedItems = cc.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
                    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
                    return (
                      <div
                        key={cc.id}
                        onClick={() => onSelectLevel(cc.id)}
                        className="p-4.5 bg-white border border-neutral-200 rounded-2xl shadow-3xs hover:shadow-sm hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[9px] font-bold tracking-wider font-mono uppercase">
                              Custom Bundle
                            </span>
                            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                              {onEditCustomCourse && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditCustomCourse(cc);
                                  }}
                                  className="p-1 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 rounded-lg transition-all"
                                  title="Edit course"
                                >
                                  <Pencil size={12} />
                                </button>
                              )}
                              {onDeleteCustomCourse && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteCustomCourse(cc.id);
                                  }}
                                  className="p-1 hover:bg-red-50 text-neutral-500 hover:text-red-600 rounded-lg transition-all"
                                  title="Delete course"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                          <h4 className="font-sans font-extrabold text-neutral-900 text-sm leading-snug group-hover:text-amber-600 transition-colors">{cc.title}</h4>
                          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{cc.description}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full" style={{ width: `${percent}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-neutral-700">{percent}%</span>
                          </div>
                          <span className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                            Study <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grouped Tracks List */}
            <div className="space-y-8">
              {filteredTracks
                .filter(t => selectedTrackId === "all" || t.id === selectedTrackId)
                .map(track => {
                  const styling = TRACK_STYLING[track.id] || { 
                    icon: <BookOpen size={16} />, 
                    color: "bg-neutral-900", 
                    bg: "bg-neutral-50", 
                    activeBg: "bg-neutral-900 text-white",
                    textClass: "text-neutral-900", 
                    border: "border-neutral-200",
                    accentBorder: "border-neutral-900",
                    tierNumber: 1
                  };
                  
                  // Filter modules belonging to this path
                  const trackLevels = filteredLevels.filter(l => track.levelIds.includes(l.id));
                  if (trackLevels.length === 0 && selectedTrackId !== track.id) return null;

                  // Group-wide statistics calculation
                  const totalGroupItems = trackLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
                  const completedGroupItems = trackLevels.reduce((sum, l) => {
                    return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
                  }, 0);
                  const groupPercent = totalGroupItems > 0 ? Math.round((completedGroupItems / totalGroupItems) * 100) : 0;

                  return (
                    <div key={track.id} className="space-y-4 animate-fade-in">
                      
                      {/* Track Header Card */}
                      <div className={`p-4 rounded-2xl border ${styling.border} ${styling.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs`}>
                        <div className="flex items-center gap-3">
                          <span className="p-2 rounded-xl bg-white shadow-3xs border border-neutral-200/60 shrink-0 flex items-center justify-center">
                            {styling.icon}
                          </span>
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-sans font-extrabold text-neutral-900 text-sm sm:text-base tracking-tight">
                                {track.title}
                              </h3>
                              <span className="px-2 py-0.2 bg-white border border-neutral-200 text-neutral-600 rounded-full text-[9px] font-mono font-bold uppercase">
                                Tier {styling.tierNumber || 1}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 leading-normal font-sans font-medium line-clamp-2">
                              {track.description}
                            </p>
                          </div>
                        </div>

                        {/* Cumulative Progress bar of Track */}
                        <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-neutral-200/60 shadow-3xs self-start sm:self-auto shrink-0">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-6 text-[9px] font-mono text-neutral-500">
                              <span className="font-bold uppercase tracking-wider">{trackLevels.length} MODULES</span>
                              <span className="font-bold text-neutral-800">{groupPercent}% DONE</span>
                            </div>
                            <div className="w-28 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${styling.color}`}
                                style={{ width: `${groupPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Grid of Syllabus Level Cards */}
                      {trackLevels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {trackLevels.map((level, index) => {
                            const completionPercent = getLevelProgress(level);
                            const pointsEarned = level.checklistItems
                              .filter(item => progress.completedItemIds.includes(item.id))
                              .reduce((sum, item) => sum + item.points, 0);
                            const totalPoints = level.checklistItems.reduce((sum, item) => sum + item.points, 0);
                            const isDone = completionPercent === 100;

                            return (
                              <motion.div
                                key={level.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.15, delay: Math.min(index * 0.015, 0.15) }}
                                className={`p-4.5 bg-white border rounded-2xl transition-all flex flex-col justify-between group cursor-default ${
                                  isDone 
                                    ? "border-emerald-200/80 shadow-3xs hover:border-emerald-300" 
                                    : "border-neutral-200 shadow-3xs hover:shadow-sm hover:border-neutral-300"
                                }`}
                              >
                                <div className="space-y-3">
                                  {/* Header Badge */}
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <span className="w-7 h-7 flex items-center justify-center bg-neutral-900 text-white rounded-xl font-sans font-extrabold text-xs shadow-3xs">
                                        {level.id}
                                      </span>
                                      <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase ${
                                        level.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-800" :
                                        level.difficulty === "Intermediate" ? "bg-blue-100 text-blue-800" :
                                        level.difficulty === "Advanced" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                                      }`}>
                                        {level.difficulty}
                                      </span>
                                    </div>
                                    {isDone ? (
                                      <span className="p-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-3xs">
                                        <Check size={12} strokeWidth={3} />
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-mono text-neutral-400 font-bold">
                                        {pointsEarned}/{totalPoints} XP
                                      </span>
                                    )}
                                  </div>

                                  {/* Title & Description */}
                                  <div className="space-y-1">
                                    <h4 className="font-sans font-extrabold text-neutral-900 tracking-tight text-sm leading-snug group-hover:text-neutral-950 transition-colors">
                                      {level.title}
                                    </h4>
                                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-sans font-normal">
                                      {level.description}
                                    </p>
                                  </div>

                                  {/* Stats Row */}
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-neutral-400 font-mono font-bold">
                                    <span className="flex items-center gap-1">
                                      <Clock size={10} />
                                      {level.estimatedMinutes} Mins
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Tag size={10} />
                                      {level.checklistItems.length} Checklist Points
                                    </span>
                                  </div>
                                </div>

                                {/* Progress Bar & Study Action */}
                                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                                  <div className="flex-1 flex items-center gap-2">
                                    <div className="flex-1 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full transition-all duration-300 ${
                                          isDone ? "bg-emerald-500" : "bg-neutral-900"
                                        }`} 
                                        style={{ width: `${completionPercent}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[9px] font-mono font-extrabold text-neutral-600">
                                      {completionPercent}%
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => onSelectLevel(level.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all shrink-0 flex items-center gap-0.5 cursor-pointer shadow-3xs ${
                                      isDone 
                                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200" 
                                        : "bg-neutral-50 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 hover:border-neutral-900"
                                    }`}
                                  >
                                    <span>{isDone ? "Review" : "Study"}</span>
                                    <ChevronRight size={11} />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-6 text-center bg-neutral-50 border border-neutral-200/60 rounded-xl">
                          <p className="text-xs text-neutral-400 font-sans">No modules in this track match your active filters.</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {filteredLevels.length === 0 && selectedTrackId !== "custom" && (
              <div className="p-12 text-center bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
                <BookOpen className="mx-auto text-neutral-400" size={32} />
                <p className="font-sans font-bold text-neutral-700 text-sm">No curriculum modules found</p>
                <p className="text-xs text-neutral-400 font-sans font-medium">Try modifying your search filter query, changing difficulty, or selecting a different track.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDifficultyFilter("all");
                    setStatusFilter("all");
                    setSelectedTierFilter("all");
                    onSelectTrackId("all");
                  }}
                  className="mt-2 px-3.5 py-1.5 bg-neutral-900 text-white rounded-xl text-xs font-sans font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {selectedTrackId === "custom" && progress.customCourses.length === 0 && (
              <div className="p-12 text-center bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
                <Sparkles className="mx-auto text-amber-400" size={32} />
                <p className="font-sans font-bold text-neutral-700 text-sm">No Custom Generated Courses</p>
                <p className="text-xs text-neutral-400 font-sans font-medium">Use the custom builder in the top navigation to generate personalized syllabus bundles.</p>
              </div>
            )}

          </div>

        </div>
      )}

      {/* VISUAL LEARNING LAB VIEW: Interactive Architectural Models */}
      {viewMode === "visual-lab" && (
        <div className="animate-fade-in">
          <VisualLearningLab 
            onNavigateToLevel={(lvlId) => {
              onSelectLevel(lvlId);
            }}
          />
        </div>
      )}

      {/* GAMIFICATION & DAILY QUESTS ARENA */}
      {viewMode === "gamification" && (
        <div className="animate-fade-in">
          <GamificationArena
            userPoints={userPoints}
            completedItemIds={progress.completedItemIds}
            allLevels={levels}
            streakCount={streakCount}
            onNavigateToLevel={(lvlId) => {
              onSelectLevel(lvlId);
            }}
            onClaimDailyBonus={onClaimDailyBonus}
          />
        </div>
      )}

    </div>
  );
}
