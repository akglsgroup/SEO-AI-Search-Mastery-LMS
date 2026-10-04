/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile, Level, CustomCourse, MasteryAward } from "../types";
import { 
  SYLLABUS_TIERS, 
  getAllTracks,
  SyllabusTier
} from "../data/coursesData";
import { 
  User, CheckCircle2, Trophy, Flame, Sparkles, BookOpen, 
  ArrowRight, Shield, Zap, Target, Award, CheckCircle, 
  Clock, BarChart3, ChevronRight, Layers, Lock, PlayCircle,
  HelpCircle, RefreshCw, Star, Compass, Download, ExternalLink
} from "lucide-react";

interface StudentDashboardProps {
  user: UserProfile;
  completedItemIds: string[];
  allLevels: Level[];
  quizScores: Record<string, number>;
  streakCount: number;
  userPoints: number;
  customCourses: CustomCourse[];
  awards: MasteryAward[];
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  onNavigateToCurriculum: () => void;
  onNavigateToTrack: (trackId: string) => void;
  onNavigateToLevel: (levelId: number | string) => void;
  onNavigateToQuiz: (levelId?: number | string) => void;
  onNavigateToCreator: () => void;
}

export default function StudentDashboard({
  user,
  completedItemIds,
  allLevels,
  quizScores,
  streakCount,
  userPoints,
  customCourses,
  awards,
  onOpenLogin,
  onOpenProfile,
  onNavigateToCurriculum,
  onNavigateToTrack,
  onNavigateToLevel,
  onNavigateToQuiz,
  onNavigateToCreator
}: StudentDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"syllabus" | "tracks" | "quizzes" | "awards">("syllabus");
  const [viewingAward, setViewingAward] = useState<{ title: string; category: string; date: string } | null>(null);

  const tracks = getAllTracks();

  // Calculate total syllabus stats
  const allItems = allLevels.flatMap(l => l.checklistItems);
  const totalItemCount = allItems.length;
  const completedCount = completedItemIds.filter(id => allItems.some(i => i.id === id)).length;
  const overallPercentage = totalItemCount > 0 ? Math.round((completedCount / totalItemCount) * 100) : 0;

  // Calculate Quiz stats
  const quizAttemptIds = Object.keys(quizScores);
  const totalQuizzesAttempted = quizAttemptIds.length;
  const averageQuizScore = totalQuizzesAttempted > 0
    ? Math.round(Object.values(quizScores).reduce((a, b) => a + b, 0) / totalQuizzesAttempted)
    : 0;

  // Find Next Recommended Learning Step
  const nextIncompleteLevel = allLevels.find(level => {
    return level.checklistItems.some(item => !completedItemIds.includes(item.id));
  }) || allLevels[0];

  const nextIncompleteItem = nextIncompleteLevel?.checklistItems.find(
    item => !completedItemIds.includes(item.id)
  ) || nextIncompleteLevel?.checklistItems[0];

  // Helper to calculate tier completion
  const getTierStats = (tier: SyllabusTier) => {
    const tierLevels = allLevels.filter(lvl => {
      // Find track for this level
      const matchingTrack = tracks.find(t => t.levelIds.includes(lvl.id));
      return matchingTrack && tier.trackIds.includes(matchingTrack.id);
    });
    const tierItems = tierLevels.flatMap(l => l.checklistItems);
    const tierCompleted = tierItems.filter(item => completedItemIds.includes(item.id)).length;
    const tierTotal = tierItems.length;
    const tierPercent = tierTotal > 0 ? Math.round((tierCompleted / tierTotal) * 100) : 0;
    
    return {
      totalItems: tierTotal,
      completedItems: tierCompleted,
      percentage: tierPercent,
      isMastered: tierTotal > 0 && tierCompleted === tierTotal,
      isInProgress: tierCompleted > 0 && tierCompleted < tierTotal,
      isNotStarted: tierCompleted === 0
    };
  };

  // Helper to calculate track completion
  const getTrackStats = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return { total: 0, completed: 0, percent: 0 };
    const trackLevels = allLevels.filter(lvl => track.levelIds.includes(lvl.id));
    const trackItems = trackLevels.flatMap(l => l.checklistItems);
    const completed = trackItems.filter(item => completedItemIds.includes(item.id)).length;
    const total = trackItems.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  };

  return (
    <div className="space-y-8 animate-fade-in" id="student-dashboard">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* User Info / Guest Prompt */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              {user.isLoggedIn ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-neutral-900 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 text-amber-400 border border-neutral-800 flex items-center justify-center font-extrabold text-2xl shadow-md">
                  👤
                </div>
              )}
              {user.isLoggedIn && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold" title="Authenticated & Synced">
                  ✓
                </span>
              )}
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-sans font-black text-neutral-900 tracking-tight leading-none truncate">
                  {user.isLoggedIn ? user.name : "Apprentice SEO Scholar"}
                </h1>
                
                {user.isLoggedIn ? (
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-extrabold uppercase tracking-wider ${
                    user.isAdmin ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}>
                    {user.isAdmin ? "Global Administrator" : user.role || "Verified Student"}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Local Guest Mode
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                {user.isLoggedIn ? (
                  <span className="flex items-center gap-2 flex-wrap">
                    <span>{user.email}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Cloud Synced to Firestore
                    </span>
                  </span>
                ) : (
                  "Sign in with your Google account or email to permanently sync syllabus progress, retain certifications, and unlock customized team tracks."
                )}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            {user.isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-250 text-neutral-800 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <User size={13} className="text-neutral-600" />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateToCurriculum}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-extrabold transition-all shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
                >
                  <span>Resume Syllabus</span>
                  <ArrowRight size={13} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-extrabold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <div className="w-4 h-4 rounded bg-white text-neutral-950 flex items-center justify-center font-black text-[9px]">G</div>
                <span>Connect Account to Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-neutral-100">
          
          {/* Overall Syllabus Progress */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Syllabus Progress
              </span>
              <BarChart3 size={13} className="text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-black text-neutral-900">
                {overallPercentage}%
              </span>
              <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                {completedCount}/{totalItemCount} Items
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Active Learning Streak */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Study Streak
              </span>
              <Flame size={14} className="text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-black text-neutral-900">
                {streakCount} {streakCount === 1 ? "Day" : "Days"}
              </span>
              <span className="text-[11px] font-sans font-bold text-amber-600">
                Active 🔥
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-2">
              Daily practice boosts retention by 3.4x
            </p>
          </div>

          {/* Quiz Diagnostics Mastery */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Diagnostic Mastery
              </span>
              <Trophy size={13} className="text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-black text-neutral-900">
                {averageQuizScore > 0 ? `${averageQuizScore}%` : "—"}
              </span>
              <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                {totalQuizzesAttempted} Quizzes
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-2">
              {totalQuizzesAttempted > 0 ? "Benchmark performance" : "Take diagnostic quizzes"}
            </p>
          </div>

          {/* XP & Rewards */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Mastery XP
              </span>
              <Zap size={13} className="text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-black text-neutral-900">
                {userPoints}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-600">
                Points
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-2">
              Earned via audits &amp; taxonomy tests
            </p>
          </div>

        </div>
      </div>

      {/* 3. Next Recommended Checkpoint Banner */}
      {nextIncompleteLevel && nextIncompleteItem && (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500 text-neutral-950 font-mono font-black text-[9px] uppercase rounded">
                RECOMMENDED NEXT STEP
              </span>
              <span className="text-neutral-400 text-xs font-mono font-semibold">
                Level {nextIncompleteLevel.id} • {nextIncompleteLevel.category}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-sans font-black text-white tracking-tight truncate">
              {nextIncompleteLevel.title}: {nextIncompleteItem.title}
            </h2>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-1 max-w-2xl">
              {nextIncompleteLevel.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigateToLevel(nextIncompleteLevel.id)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 rounded-xl text-xs font-sans font-black transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              <PlayCircle size={14} />
              <span>Resume Study</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToQuiz(nextIncompleteLevel.id)}
              className="px-3.5 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trophy size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: "syllabus", label: "Syllabus Tiers (1 to 5)", icon: <Layers size={14} /> },
          { id: "tracks", label: "All 9 Tracks Matrix", icon: <Compass size={14} /> },
          { id: "quizzes", label: "Diagnostics & Quizzes", icon: <Trophy size={14} /> },
          { id: "awards", label: "Certifications & Credentials", icon: <Award size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === tab.id
                ? "bg-neutral-900 text-white shadow-xs"
                : "bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 5. Sub-Tab Content */}

      {/* TAB A: SYLLABUS TIERS (Beginner to Advanced) */}
      {activeSubTab === "syllabus" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-sans font-black text-neutral-900 tracking-tight">
                5-Tier Progressive Syllabus Roadmap
              </h2>
              <p className="text-xs text-neutral-500 font-sans">
                Ordered sequentially from beginner foundational mechanics up to advanced AI retrieval engineering.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateToCurriculum}
              className="text-xs font-bold text-neutral-900 hover:text-emerald-700 flex items-center gap-1 underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              <span>Open Interactive Curriculum View</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-4">
            {SYLLABUS_TIERS.map(tier => {
              const stats = getTierStats(tier);
              return (
                <div 
                  key={tier.id}
                  className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 shadow-3xs hover:border-neutral-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase ${tier.badgeBg} ${tier.badgeText}`}>
                          {tier.badge}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-400">
                          {tier.trackIds.length} Mastery Tracks
                        </span>
                      </div>
                      <h3 className="text-base font-sans font-black text-neutral-900 tracking-tight">
                        {tier.title}
                      </h3>
                      <p className="text-xs text-neutral-500 font-sans max-w-2xl">
                        {tier.description}
                      </p>
                    </div>

                    {/* Tier Status Badge & Progress */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      {stats.isMastered ? (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-mono font-black flex items-center gap-1">
                          <CheckCircle size={13} />
                          <span>Tier Mastered</span>
                        </span>
                      ) : stats.isInProgress ? (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-mono font-bold flex items-center gap-1">
                          <Zap size={13} className="text-amber-600" />
                          <span>In Progress ({stats.percentage}%)</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-mono font-medium">
                          Not Started
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                        {stats.completedItems} / {stats.totalItems} checkpoints
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-150 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        stats.isMastered ? "bg-emerald-500" : stats.isInProgress ? "bg-amber-500" : "bg-neutral-300"
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>

                  {/* Tracks Included Chips */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-neutral-100 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Tracks:</span>
                      {tier.trackIds.map(tid => {
                        const trk = tracks.find(t => t.id === tid);
                        const trkStats = getTrackStats(tid);
                        return (
                          <button
                            key={tid}
                            type="button"
                            onClick={() => onNavigateToTrack(tid)}
                            className="px-2 py-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-lg text-[10px] font-sans font-bold text-neutral-700 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>{trk?.title || tid}</span>
                            <span className={`text-[9px] font-mono ${trkStats.percent === 100 ? "text-emerald-600" : "text-neutral-400"}`}>
                              {trkStats.percent}%
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigateToTrack(tier.trackIds[0])}
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[11px] font-sans font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Study Tier</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB B: ALL 9 TRACKS MATRIX */}
      {activeSubTab === "tracks" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-sans font-black text-neutral-900 tracking-tight">
                9 Mastery Tracks Competency Matrix
              </h2>
              <p className="text-xs text-neutral-500 font-sans">
                Review progress across specialized domains from Silocraft and Technical SEO to GA4 and Generative Search.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map(track => {
              const stats = getTrackStats(track.id);
              const trackLevels = allLevels.filter(lvl => track.levelIds.includes(lvl.id));
              return (
                <div 
                  key={track.id}
                  className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-neutral-300 transition-all space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase ${track.colorClass} ${track.textColorClass}`}>
                        Track {track.id}
                      </span>
                      <span className="text-[11px] font-mono font-black text-neutral-800">
                        {stats.percent}%
                      </span>
                    </div>

                    <h3 className="text-sm font-sans font-black text-neutral-900 leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-sans leading-relaxed line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-neutral-100">
                    <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-neutral-900 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.percent}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 font-mono">
                        {stats.completed}/{stats.total} Checkpoints
                      </span>
                      <button
                        type="button"
                        onClick={() => onNavigateToTrack(track.id)}
                        className="font-bold text-neutral-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Levels</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB C: DIAGNOSTICS & QUIZZES */}
      {activeSubTab === "quizzes" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-sans font-black text-neutral-900 tracking-tight">
                Level Diagnostics &amp; Examination Records
              </h2>
              <p className="text-xs text-neutral-500 font-sans">
                Validate your theoretical knowledge with scenario-based multiple-choice audits.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToQuiz()}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Trophy size={13} className="text-amber-400" />
              <span>Launch Quiz Center</span>
            </button>
          </div>

          <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-3xs">
            <div className="p-4 bg-neutral-50/70 border-b border-neutral-200/80 grid grid-cols-12 text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
              <span className="col-span-6 sm:col-span-5">Level &amp; Topic</span>
              <span className="col-span-3 sm:col-span-3 text-center">Score</span>
              <span className="col-span-3 sm:col-span-2 text-center">Status</span>
              <span className="hidden sm:inline sm:col-span-2 text-right">Action</span>
            </div>

            <div className="divide-y divide-neutral-100">
              {allLevels.slice(0, 10).map(level => {
                const score = quizScores[level.id];
                const hasScore = typeof score === "number";
                const isPassed = hasScore && score >= 80;

                return (
                  <div key={level.id} className="p-4 grid grid-cols-12 items-center text-xs hover:bg-neutral-50/40 transition-colors">
                    <div className="col-span-6 sm:col-span-5 space-y-0.5 pr-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 block">
                        Level {level.id} • {level.category}
                      </span>
                      <h4 className="font-sans font-bold text-neutral-900 truncate">
                        {level.title}
                      </h4>
                    </div>

                    <div className="col-span-3 sm:col-span-3 text-center font-mono font-bold">
                      {hasScore ? (
                        <span className={score >= 80 ? "text-emerald-700" : "text-amber-600"}>
                          {score}%
                        </span>
                      ) : (
                        <span className="text-neutral-400">Unattempted</span>
                      )}
                    </div>

                    <div className="col-span-3 sm:col-span-2 text-center">
                      {isPassed ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black uppercase rounded">
                          PASSED
                        </span>
                      ) : hasScore ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase rounded">
                          RETAKE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400">
                          PENDING
                        </span>
                      )}
                    </div>

                    <div className="hidden sm:flex sm:col-span-2 justify-end">
                      <button
                        type="button"
                        onClick={() => onNavigateToQuiz(level.id)}
                        className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-250 text-neutral-800 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer"
                      >
                        {hasScore ? "Retake" : "Test Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB D: CERTIFICATIONS & CREDENTIALS */}
      {activeSubTab === "awards" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-sans font-black text-neutral-900 tracking-tight">
                Digital Mastery Credentials &amp; Honors
              </h2>
              <p className="text-xs text-neutral-500 font-sans">
                Earn milestone credentials as you master each progressive tier of the SEO &amp; AI Search Framework.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SYLLABUS_TIERS.map(tier => {
              const stats = getTierStats(tier);
              const isEarned = stats.isMastered;
              return (
                <div 
                  key={tier.id}
                  className={`rounded-2xl p-6 border text-center flex flex-col justify-between space-y-4 transition-all ${
                    isEarned 
                      ? "bg-gradient-to-b from-amber-50/50 to-white border-amber-200 shadow-sm ring-1 ring-amber-400/30"
                      : "bg-white border-neutral-200/80 opacity-70"
                  }`}
                >
                  <div className="space-y-3">
                    <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-3xs ${
                      isEarned ? "bg-amber-400 text-neutral-950" : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                    }`}>
                      {isEarned ? "🏆" : "🔒"}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
                        {tier.badge} Credential
                      </span>
                      <h4 className="font-sans font-extrabold text-neutral-900 text-sm">
                        {tier.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                        Awarded upon 100% completion of all {stats.totalItems} checkpoints in {tier.shortTitle}.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-150 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-500">Progress</span>
                      <span className="font-bold text-neutral-800">{stats.percentage}%</span>
                    </div>

                    {isEarned ? (
                      <button
                        type="button"
                        onClick={() => setViewingAward({
                          title: tier.title,
                          category: tier.badge,
                          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        })}
                        className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Award size={13} className="text-amber-400" />
                        <span>View Certificate</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigateToTrack(tier.trackIds[0])}
                        className="w-full py-2 bg-neutral-100 hover:bg-neutral-150 text-neutral-700 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer"
                      >
                        Unlock Credential
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Custom Courses Created (if any) */}
      {customCourses.length > 0 && (
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-3xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              <h3 className="font-sans font-bold text-neutral-900 text-sm">
                Your Custom Created Courses ({customCourses.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={onNavigateToCreator}
              className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Manage in Builder</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customCourses.map(cc => {
              const total = cc.checklistItems.length;
              const completed = cc.checklistItems.filter(item => completedItemIds.includes(item.id)).length;
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={cc.id} className="p-3.5 bg-neutral-50/70 border border-neutral-200/70 rounded-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-sans font-bold text-xs text-neutral-900 truncate">{cc.title}</h4>
                    <p className="text-[10px] text-neutral-500 font-mono">{completed}/{total} completed ({percent}%)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToLevel(cc.id)}
                    className="px-3 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg text-xs font-sans font-bold text-neutral-800 transition-all cursor-pointer shrink-0"
                  >
                    Study
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Certificate Credential Modal */}
      {viewingAward && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="certificate-modal">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-xl w-full p-8 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-500"></div>

            <button 
              type="button"
              onClick={() => setViewingAward(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-amber-400 text-neutral-950 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-md">
              🏆
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-black uppercase text-amber-800 tracking-widest bg-amber-100 px-2.5 py-0.5 rounded">
                OFFICIAL DIGITAL CERTIFICATE
              </span>
              <h3 className="text-xl font-sans font-black text-neutral-900 tracking-tight pt-2">
                Certificate of Mastery
              </h3>
              <p className="text-xs text-neutral-500 font-sans">
                This certifies that
              </p>
              <h2 className="text-xl font-sans font-extrabold text-neutral-900 py-1 border-b border-neutral-200 inline-block px-4">
                {user.isLoggedIn ? user.name : "Verified Apprentice"}
              </h2>
              <p className="text-xs text-neutral-600 font-sans pt-1">
                has successfully achieved full competency and rigorous completion of
              </p>
              <h3 className="text-base font-sans font-black text-emerald-800">
                {viewingAward.title}
              </h3>
              <p className="text-[11px] font-mono text-neutral-400 pt-1">
                Issued on {viewingAward.date} • Enterprise Framework ID: AskAmrish-2026
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setViewingAward(null)}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-md cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
