/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Level, Track, CustomCourse, UserProgress } from "../types";
import { INITIAL_TRACKS } from "../data/checklist";
import { 
  Check, 
  Search, 
  BookOpen, 
  Clock, 
  Tag, 
  ChevronRight, 
  LayoutGrid, 
  Sparkles, 
  Cpu, 
  Database, 
  Zap, 
  MessageSquare, 
  Bot,
  GraduationCap,
  Pencil,
  Trash2,
  Layers,
  Wrench,
  Network,
  Code,
  Store,
  Globe
} from "lucide-react";
import { motion } from "motion/react";

interface CourseCurriculumProps {
  levels: Level[];
  progress: UserProgress;
  onSelectLevel: (levelId: number | string) => void;
  selectedTrackId: string;
  onSelectTrackId: (trackId: string) => void;
  onDeleteCustomCourse?: (id: string) => void;
  onEditCustomCourse?: (course: CustomCourse) => void;
  onOpenConsulting?: () => void;
}

// Track metadata for nine distinct paths with warm and cute matching styling
const PATH_DETAILS: Record<string, { icon: React.ReactNode; color: string; bg: string; activeBg: string; textClass: string; border: string; accentBorder: string }> = {
  fundamentals: {
    icon: <Layers className="text-slate-500 shrink-0" size={16} />,
    color: "bg-slate-500",
    bg: "bg-slate-50/45",
    activeBg: "bg-slate-600 text-white",
    textClass: "text-slate-900 border-slate-500/30",
    border: "border-slate-200/60",
    accentBorder: "border-slate-500"
  },
  "tech-eng": {
    icon: <Wrench className="text-emerald-500 shrink-0" size={16} />,
    color: "bg-emerald-500",
    bg: "bg-emerald-50/45",
    activeBg: "bg-emerald-500 text-white",
    textClass: "text-emerald-900 border-emerald-500/30",
    border: "border-emerald-200/60",
    accentBorder: "border-emerald-500"
  },
  "entity-graphs": {
    icon: <Network className="text-blue-500 shrink-0" size={16} />,
    color: "bg-blue-500",
    bg: "bg-blue-50/45",
    activeBg: "bg-blue-500 text-white",
    textClass: "text-blue-900 border-blue-500/30",
    border: "border-blue-200/60",
    accentBorder: "border-blue-500"
  },
  "content-strategy": {
    icon: <BookOpen className="text-purple-500 shrink-0" size={16} />,
    color: "bg-purple-500",
    bg: "bg-purple-50/45",
    activeBg: "bg-purple-500 text-white",
    textClass: "text-purple-900 border-purple-500/30",
    border: "border-purple-200/60",
    accentBorder: "border-purple-500"
  },
  "semantic-markup": {
    icon: <Code className="text-cyan-500 shrink-0" size={16} />,
    color: "bg-cyan-500",
    bg: "bg-cyan-50/45",
    activeBg: "bg-cyan-500 text-white",
    textClass: "text-cyan-900 border-cyan-500/30",
    border: "border-cyan-200/60",
    accentBorder: "border-cyan-500"
  },
  "niche-verticals": {
    icon: <Store className="text-orange-500 shrink-0" size={16} />,
    color: "bg-orange-500",
    bg: "bg-orange-50/45",
    activeBg: "bg-orange-500 text-white",
    textClass: "text-orange-900 border-orange-500/30",
    border: "border-orange-200/60",
    accentBorder: "border-orange-500"
  },
  geo: {
    icon: <Zap className="text-violet-500 shrink-0" size={16} />,
    color: "bg-violet-500",
    bg: "bg-violet-50/45",
    activeBg: "bg-violet-500 text-white",
    textClass: "text-violet-900 border-violet-500/30",
    border: "border-violet-200/60",
    accentBorder: "border-violet-500"
  },
  aeo: {
    icon: <MessageSquare className="text-amber-500 shrink-0" size={16} />,
    color: "bg-amber-500",
    bg: "bg-amber-50/45",
    activeBg: "bg-amber-500 text-white",
    textClass: "text-amber-900 border-amber-500/30",
    border: "border-amber-200/60",
    accentBorder: "border-amber-500"
  },
  "authority-conversion": {
    icon: <Globe className="text-rose-500 shrink-0" size={16} />,
    color: "bg-rose-500",
    bg: "bg-rose-50/45",
    activeBg: "bg-rose-500 text-white",
    textClass: "text-rose-900 border-rose-500/30",
    border: "border-rose-200/60",
    accentBorder: "border-rose-500"
  },
  wordpress: {
    icon: <Globe className="text-blue-600 shrink-0" size={16} />,
    color: "bg-blue-600",
    bg: "bg-blue-50/45",
    activeBg: "bg-blue-600 text-white",
    textClass: "text-blue-900 border-blue-500/30",
    border: "border-blue-200/60",
    accentBorder: "border-blue-500"
  },
  "gsc-complete": {
    icon: <Search className="text-teal-600 shrink-0" size={16} />,
    color: "bg-teal-600",
    bg: "bg-teal-50/45",
    activeBg: "bg-teal-600 text-white",
    textClass: "text-teal-900 border-teal-500/30",
    border: "border-teal-200/60",
    accentBorder: "border-teal-500"
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
  onOpenConsulting
}: CourseCurriculumProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Keep search filter functioning globally
  const filteredLevels = levels.filter(level => {
    const matchesSearch = 
      level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      level.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      level.details.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTrackId === "all") {
      return matchesSearch;
    }
    
    if (selectedTrackId === "custom") {
      return false; // Handled separately in custom rendering block
    }

    const targetTrack = INITIAL_TRACKS.find(t => t.id === selectedTrackId);
    if (!targetTrack) return matchesSearch;
    return targetTrack.levelIds.includes(level.id) && matchesSearch;
  });

  const getLevelProgress = (level: Level) => {
    if (level.checklistItems.length === 0) return 0;
    const completed = level.checklistItems.filter(item => 
      progress.completedItemIds.includes(item.id)
    ).length;
    return Math.round((completed / level.checklistItems.length) * 100);
  };

  // Helper to calculate progress for a specific track
  const getTrackProgressMetrics = (trackId: string) => {
    const track = INITIAL_TRACKS.find(t => t.id === trackId);
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

  // Overall statistics for all track levels
  const totalAllItems = levels.reduce((sum, l) => sum + l.checklistItems.length, 0);
  const completedAllItems = levels.reduce((sum, l) => {
    return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
  }, 0);
  const overallAllPercent = totalAllItems > 0 ? Math.round((completedAllItems / totalAllItems) * 100) : 0;

  // Render a single navigation item inside sidebar
  const renderSidebarItem = (trackId: string, title: string, countText: string, iconNode: React.ReactNode, activeClass: string, inactiveClass: string, progressPercent: number) => {
    const isActive = selectedTrackId === trackId;
    return (
      <button
        key={trackId}
        onClick={() => onSelectTrackId(trackId)}
        className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-2 cursor-pointer ${
          isActive 
            ? activeClass + " shadow-sm font-bold scale-[1.01]" 
            : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center ${isActive ? "bg-white/25" : "bg-neutral-100"}`}>
            {React.cloneElement(iconNode as React.ReactElement, { 
              size: 15,
              className: isActive ? "text-white" : "" 
            })}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[12px] font-sans font-extrabold leading-tight truncate">
              {title}
            </h4>
            <span className={`text-[9px] font-mono font-semibold ${isActive ? "text-white/80" : "text-neutral-400"}`}>
              {countText}
            </span>
          </div>
        </div>

        {/* Core track progress visual indicator */}
        <div className="w-full flex items-center gap-1.5 mt-0.5">
          <div className={`flex-1 ${isActive ? "bg-white/20" : "bg-neutral-100"} h-1.5 rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${isActive ? "bg-white" : "bg-neutral-900"}`} 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className={`text-[9px] font-mono font-bold shrink-0 ${isActive ? "text-white" : "text-neutral-500"}`}>
            {progressPercent}%
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6" id="lms-syllabus">
      {/* Visual Cute Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gradient-to-br from-neutral-50 to-neutral-100/30 rounded-2xl border border-neutral-200/60 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-2xl font-sans font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
            <span className="p-2 bg-neutral-900 text-white rounded-xl shadow-xs"><GraduationCap size={20} /></span>
            <span>Mastery Syllabus</span>
          </h2>
          <p className="text-xs text-neutral-500 font-sans font-medium">
            Acquire and track specific optimization check items across all nine foundational digital learning tracks.
          </p>
        </div>

        {/* Dynamic Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search core syllabus modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent placeholder:text-neutral-400 shadow-3xs"
          />
        </div>
      </div>

      {/* Main Structural Frame Layout - Sidemenu Navigation System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Sidebar Column */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Mobile Swipeable View Rail */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-none snap-x">
            <button
              onClick={() => onSelectTrackId("all")}
              className={`snap-start shrink-0 px-4 py-2 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                selectedTrackId === "all"
                  ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
                  : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <LayoutGrid size={13} />
              <span>All ({overallAllPercent}%)</span>
            </button>

            {INITIAL_TRACKS.map(track => {
              const details = PATH_DETAILS[track.id] || { icon: <BookOpen />, bg: "bg-neutral-100", activeBg: "bg-neutral-900 text-white" };
              const metrics = getTrackProgressMetrics(track.id);
              const displayTitle = track.title.split(". ")[1] || track.title;
              return (
                <button
                  key={track.id}
                  onClick={() => onSelectTrackId(track.id)}
                  className={`snap-start shrink-0 px-4 py-2 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    selectedTrackId === track.id
                      ? details.activeBg + " border-transparent shadow-sm"
                      : `bg-white border-neutral-200 text-neutral-700 hover:${details.bg}`
                  }`}
                >
                  {React.cloneElement(details.icon as React.ReactElement, { size: 12, className: selectedTrackId === track.id ? "text-white" : "" })}
                  <span>{displayTitle} ({metrics.percent}%)</span>
                </button>
              );
            })}

            {progress.customCourses.length > 0 && (
              <button
                onClick={() => onSelectTrackId("custom")}
                className={`snap-start shrink-0 px-4 py-2 rounded-xl border text-[11px] font-sans font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
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

          {/* Desktop Sticky Vertical Menu */}
          <div className="hidden lg:flex flex-col gap-2 p-3 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl sticky top-4">
            <span className="px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
              Select Practice Path
            </span>

            {/* Sidebar All Button */}
            {renderSidebarItem(
              "all",
              "1. Full Course Overview",
              "Complete 35 levels",
              <LayoutGrid size={15} />,
              "bg-neutral-900 border-neutral-900 text-white",
              "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200",
              overallAllPercent
            )}

            {/* Render 6 Distinct Path Sidebar Buttons */}
            {INITIAL_TRACKS.map(track => {
              const details = PATH_DETAILS[track.id];
              const metrics = getTrackProgressMetrics(track.id);
              const displayTitle = track.title.split(". ")[1] || track.title;
              return renderSidebarItem(
                track.id,
                displayTitle,
                `${track.levelIds.length} syllabus modules`,
                details.icon,
                details.activeBg + " border-transparent",
                `bg-white hover:${details.bg} ${track.id === selectedTrackId ? "border-neutral-950" : "border-neutral-200"} text-neutral-700`,
                metrics.percent
              );
            })}

            {/* Extra Custom Syllabus Tab */}
            {progress.customCourses.length > 0 && 
              renderSidebarItem(
                "custom",
                "Custom User Courses",
                `${progress.customCourses.length} generated modules`,
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

          {/* Sidebar Consulting card */}
          <div className="hidden lg:block p-4.5 bg-emerald-50/40 border border-emerald-100 text-neutral-900 rounded-2xl shadow-3xs space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-800">Enterprise Auditing</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
              Need premium custom onsite SEO/AEO training or corporate compliance audits? Work directly with Amrish.
            </p>
            <button
              type="button"
              onClick={onOpenConsulting}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 text-white font-sans font-bold text-[11px] rounded-xl transition-all shadow-xs text-center cursor-pointer focus:outline-hidden"
            >
              Inquire Services
            </button>
          </div>
        </div>

        {/* Right Active Modules Column */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Custom Courses Sections (Shown if any exist & matched) */}
          {progress.customCourses.length > 0 && (selectedTrackId === "all" || selectedTrackId === "custom") && (
            <div className="space-y-4 p-5 bg-gradient-to-r from-neutral-50 via-amber-50/15 to-neutral-50 rounded-2xl border border-neutral-200 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <h3 className="font-sans font-bold text-neutral-900 text-md">Your Custom Generated Courses</h3>
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
                      className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-3xs hover:shadow-sm hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md text-[9px] font-bold tracking-wider font-mono uppercase">
                            Custom Bundle
                          </span>
                          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            {onEditCustomCourse && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditCustomCourse(cc);
                                }}
                                className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 rounded-lg border border-transparent hover:border-neutral-200 transition-all"
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
                                className="p-1.5 hover:bg-red-50 text-neutral-500 hover:text-red-600 rounded-lg border border-transparent hover:border-red-100 transition-all"
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
                      <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-neutral-700">{percent}%</span>
                        </div>
                        <span className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                          Open <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grouped Mastery Paths Content List */}
          <div className="space-y-10">
            {INITIAL_TRACKS
              .filter(t => selectedTrackId === "all" || t.id === selectedTrackId)
              .map(track => {
                const path = PATH_DETAILS[track.id] || { 
                  icon: <BookOpen size={16} />, 
                  color: "bg-neutral-950", 
                  bg: "bg-neutral-50", 
                  textClass: "text-neutral-900", 
                  border: "border-neutral-200" 
                };
                
                // Filter modules belonging to this path
                const trackLevels = levels.filter(level => {
                  const matchesSearch = 
                    level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    level.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    level.details.toLowerCase().includes(searchQuery.toLowerCase());
                  return track.levelIds.includes(level.id) && matchesSearch;
                });

                if (trackLevels.length === 0) return null;

                // Group-wide statistics calculation
                const totalGroupItems = trackLevels.reduce((sum, l) => sum + l.checklistItems.length, 0);
                const completedGroupItems = trackLevels.reduce((sum, l) => {
                  return sum + l.checklistItems.filter(item => progress.completedItemIds.includes(item.id)).length;
                }, 0);
                const groupPercent = totalGroupItems > 0 ? Math.round((completedGroupItems / totalGroupItems) * 100) : 0;

                return (
                  <div key={track.id} className="space-y-5 animate-fade-in/70">
                    
                    {/* Visual Icon-driven Header for each Path */}
                    <div className={`p-4 rounded-2xl border ${path.border} ${path.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs`}>
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 rounded-xl bg-white shadow-2xs border border-neutral-200/50 shrink-0 flex items-center justify-center">
                          {path.icon}
                        </span>
                        <div className="space-y-0.5 min-w-0">
                          <h3 className="font-sans font-extrabold text-neutral-900 text-md tracking-tight">
                            {track.title}
                          </h3>
                          <p className="text-xs text-neutral-600 max-w-3xl leading-normal font-sans font-medium">
                            {track.description}
                          </p>
                        </div>
                      </div>

                      {/* Cumulative Progress bar of Group */}
                      <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-neutral-200/60 shadow-3xs self-start sm:self-auto shrink-0">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-6 text-[9px] font-mono text-neutral-500">
                            <span className="font-bold uppercase tracking-wider">{trackLevels.length} MODULES</span>
                            <span className="font-bold text-neutral-800">{groupPercent}% DONE</span>
                          </div>
                          <div className="w-28 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${path.color}`}
                              style={{ width: `${groupPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid of standard syllabus levels inside this Mastery Path */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {trackLevels.map((level, index) => {
                        const completionPercent = getLevelProgress(level);
                        const pointsEarned = level.checklistItems
                          .filter(item => progress.completedItemIds.includes(item.id))
                          .reduce((sum, item) => sum + item.points, 0);
                        const totalPoints = level.checklistItems.reduce((sum, item) => sum + item.points, 0);

                        return (
                          <motion.div
                            key={level.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.15) }}
                            className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-3xs hover:shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between group cursor-default"
                          >
                            <div className="space-y-4">
                              {/* Top row badge and markers */}
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="w-8 h-8 flex items-center justify-center bg-neutral-900 text-white rounded-xl font-sans font-extrabold text-xs shadow-2xs">
                                    {level.id}
                                  </span>
                                  <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-full uppercase">
                                    {level.difficulty}
                                  </span>
                                </div>
                                {completionPercent === 100 && (
                                  <span className="p-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-3xs">
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                )}
                              </div>

                              {/* Info block */}
                              <div className="space-y-1">
                                <h4 className="font-sans font-extrabold text-neutral-900 tracking-tight text-sm leading-snug group-hover:text-neutral-950 transition-colors">
                                  {level.title}
                                </h4>
                                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-sans font-normal">
                                  {level.description}
                                </p>
                              </div>

                              {/* Mini detail stats */}
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-neutral-400 font-mono font-bold">
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {level.estimatedMinutes} Mins
                                </span>
                                <span className="flex items-center gap-1">
                                  <Tag size={10} />
                                  {level.checklistItems.length} Checklist Items
                                </span>
                                <span>{pointsEarned}/{totalPoints} Pts</span>
                              </div>
                            </div>

                            {/* Progress and actions block */}
                            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-4">
                              <div className="flex-1 flex items-center gap-2">
                                <div className="flex-1 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-300 ${
                                      completionPercent === 100 ? "bg-emerald-500" : "bg-neutral-900"
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
                                className="px-3 py-1.5 bg-neutral-50 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 hover:border-neutral-900 rounded-xl text-xs font-sans font-bold transition-all shrink-0 flex items-center gap-0.5 cursor-pointer shadow-3xs"
                              >
                                Study <ChevronRight size={11} />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {filteredLevels.length === 0 && selectedTrackId !== "custom" && (
            <div className="p-12 text-center bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <BookOpen className="mx-auto text-neutral-400" size={32} />
              <p className="font-sans font-bold text-neutral-700 text-sm">No curriculum modules found</p>
              <p className="text-xs text-neutral-400 font-sans font-medium">Try modifying your search filter query or select a different track.</p>
            </div>
          )}

          {selectedTrackId === "custom" && progress.customCourses.length === 0 && (
            <div className="p-12 text-center bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <Sparkles className="mx-auto text-amber-400" size={32} />
              <p className="font-sans font-bold text-neutral-700 text-sm">No Custom Generated Courses</p>
              <p className="text-xs text-neutral-400 font-sans font-medium">Use the custom builder above to generate personalized syllabus bundles.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

