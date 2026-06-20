/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UserProgress, Level, CustomCourse, ChecklistItem, MasteryAward } from "./types";
import { INITIAL_TRACKS, MASTER_LEVELS } from "./data/checklist";
import Dashboard from "./components/Dashboard";
import CourseCurriculum from "./components/CourseCurriculum";
import ModuleDetails from "./components/ModuleDetails";
import CourseCreator from "./components/CourseCreator";
import QuizModule from "./components/QuizModule";
import CRMConsole, { LeadFormModal } from "./components/CRMConsole";
import CelebrationConfetti from "./components/CelebrationConfetti";
import { 
  BookOpen, Award, LayoutDashboard, Layers, Sparkles, 
  Settings, Flame, CheckCircle, RefreshCw, Star, ArrowRight,
  AlertTriangle, Linkedin, Shield
} from "lucide-react";

export default function App() {
  // --- STATE LAYER WITH PERSISTED MEMORY DEFAULTS ---
  const [activeTab, setActiveTab ] = useState<"dashboard" | "curriculum" | "quiz" | "creator" | "details" | "crm">("dashboard");
  const [selectedTrackId, setSelectedTrackId] = useState<string>("all");
  const [selectedLevelId, setSelectedLevelId] = useState<number | string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);


  // Completed item IDs tracker
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("lms_completed_items");
    return saved ? JSON.parse(saved) : [];
  });

  // Quiz score targets dictionary (levelId/customCourseId -> highscore percent)
  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("lms_quiz_scores");
    return saved ? JSON.parse(saved) : {};
  });

  // Custom courses created on creator tab
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>(() => {
    const saved = localStorage.getItem("lms_custom_courses");
    return saved ? JSON.parse(saved) : [];
  });

  // Digital Mastery Certification Awards
  const [awards, setAwards] = useState<MasteryAward[]>(() => {
    const saved = localStorage.getItem("lms_user_awards");
    return saved ? JSON.parse(saved) : [];
  });

  // Track if we are currently editing an existing custom course
  const [editingCourse, setEditingCourse] = useState<CustomCourse | null>(null);

  // Custom confirmation modal state for safe, inside-frame callbacks
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Store standard levels in state to allow dynamic appending of checklist items!
  const [allLevels, setAllLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem("lms_modified_levels");
    if (saved) {
      try {
        const parsed: Level[] = JSON.parse(saved);
        // Reconcile saved levels with fresh MASTER_LEVELS to prevent stale cache
        return MASTER_LEVELS.map(masterLevel => {
          const savedLevel = parsed.find(l => l.id === masterLevel.id);
          if (savedLevel) {
            // Pick up any custom-added items from the saved level
            const savedCustomItems = savedLevel.checklistItems.filter(item => item.isCustom);
            return {
              ...masterLevel,
              checklistItems: [...masterLevel.checklistItems, ...savedCustomItems]
            };
          }
          return masterLevel;
        });
      } catch (e) {
        return MASTER_LEVELS;
      }
    }
    return MASTER_LEVELS;
  });

  // Daily engagement streak counters
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem("lms_streak_count");
    return saved ? Number(saved) : 1;
  });
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(() => {
    return localStorage.getItem("lms_last_active_date");
  });

  // --- EFFECT WRITERS TO SECURE BROWSER PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem("lms_completed_items", JSON.stringify(completedItemIds));
  }, [completedItemIds]);

  useEffect(() => {
    localStorage.setItem("lms_quiz_scores", JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem("lms_custom_courses", JSON.stringify(customCourses));
  }, [customCourses]);

  useEffect(() => {
    localStorage.setItem("lms_modified_levels", JSON.stringify(allLevels));
  }, [allLevels]);

  useEffect(() => {
    localStorage.setItem("lms_streak_count", String(streakCount));
  }, [streakCount]);

  useEffect(() => {
    if (lastActiveDate) {
      localStorage.setItem("lms_last_active_date", lastActiveDate);
    }
  }, [lastActiveDate]);

  useEffect(() => {
    localStorage.setItem("lms_user_awards", JSON.stringify(awards));
  }, [awards]);

  // --- Celebration State ---
  const [celebratedIds, setCelebratedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("lms_celebrated_levels");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeCelebrateId, setActiveCelebrateId] = useState<string | null>(null);

  // Keep digital certificates updated when any course or modules are checked 100% complete
  useEffect(() => {
    const newAwards: MasteryAward[] = [];
    let updated = false;

    // Check standard levels
    allLevels.forEach(level => {
      if (level.checklistItems && level.checklistItems.length > 0) {
        const isCompleted = level.checklistItems.every(item => completedItemIds.includes(item.id));
        const awardId = `level-${level.id}`;
        const hasAward = awards.some(a => a.id === awardId);
        
        if (isCompleted && !hasAward) {
          newAwards.push({
            id: awardId,
            title: `Module ${level.id}: ${level.title}`,
            category: level.category,
            completedAt: new Date().toISOString()
          });
          updated = true;
        }
      }
    });

    // Check custom courses
    customCourses.forEach(course => {
      if (course.checklistItems && course.checklistItems.length > 0) {
        const isCompleted = course.checklistItems.every(item => completedItemIds.includes(item.id));
        const awardId = `custom-${course.id}`;
        const hasAward = awards.some(a => a.id === awardId);

        if (isCompleted && !hasAward) {
          newAwards.push({
            id: awardId,
            title: `Custom Course: ${course.title}`,
            category: course.category,
            completedAt: new Date().toISOString()
          });
          updated = true;
        }
      }
    });

    if (updated && newAwards.length > 0) {
      setAwards(prev => {
        const filteredNew = newAwards.filter(newA => !prev.some(p => p.id === newA.id));
        if (filteredNew.length > 0) {
          return [...prev, ...filteredNew];
        }
        return prev;
      });
    }
  }, [completedItemIds, allLevels, customCourses, awards]);

  // Identify completed levels for celebration
  const completedLevels = allLevels.filter(level => {
    if (!level.checklistItems || level.checklistItems.length === 0) return false;
    return level.checklistItems.every(item => completedItemIds.includes(item.id));
  });

  const completedCustomCourses = (customCourses || []).filter(course => {
    if (!course.checklistItems || course.checklistItems.length === 0) return false;
    return course.checklistItems.every(item => completedItemIds.includes(item.id));
  });

  const allCompletedIdsArray = [
    ...completedLevels.map(l => String(l.id)),
    ...completedCustomCourses.map(c => String(c.id))
  ];

  useEffect(() => {
    const uncelebrated = allCompletedIdsArray.find(id => !celebratedIds.includes(String(id)));
    if (uncelebrated) {
      setActiveCelebrateId(uncelebrated);
    } else {
      setActiveCelebrateId(null);
    }
  }, [completedItemIds, celebratedIds, customCourses]);

  const celebratedLevel = activeCelebrateId ? (
    allLevels.find(l => String(l.id) === activeCelebrateId) || 
    (customCourses || []).find(c => String(c.id) === activeCelebrateId)
  ) : null;

  const handleCelebrateDismiss = (id: string | number) => {
    const updated = [...celebratedIds, String(id)];
    setCelebratedIds(updated);
    localStorage.setItem("lms_celebrated_levels", JSON.stringify(updated));
    setActiveCelebrateId(null);
  };

  // --- AUTO-SCROLL TO TOP ON VIEW/TAB TRANSITIONS ---
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const wrapper = document.getElementById("app-wrapper");
      if (wrapper) {
        wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [activeTab, selectedLevelId]);

  // --- TRIGGER ON STARTUP TO UPDATE ACTIVITY STREAKS ---
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastActiveDate !== today) {
      if (lastActiveDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastActiveDate === yesterdayStr) {
          // Increment streak on back-to-back logins
          setStreakCount(prev => prev + 1);
        } else {
          // Reset streak on missing day
          setStreakCount(1);
        }
      } else {
        setStreakCount(1);
      }
      setLastActiveDate(today);
    }
  }, []);

  // --- ACTION CONTROLLERS AND MUTATIONS ---

  // Toggle checklist item progress
  const handleToggleItem = (itemId: string) => {
    setCompletedItemIds(prev => {
      const isCompleted = prev.includes(itemId);
      if (isCompleted) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });

    // Touch daily activity
    const today = new Date().toDateString();
    setLastActiveDate(today);
  };

  // Add custom checklist items dynamically inside any standard level or custom course
  const handleAddCustomItem = (levelId: number | string, newItemTitle: string, newItemPoints: number) => {
    const customItemId = `custom-item-${Date.now()}`;
    const newItem: ChecklistItem = {
      id: customItemId,
      title: newItemTitle,
      completed: false,
      points: newItemPoints,
      levelId,
      isCustom: true
    };

    // Determine standard levels vs custom course editing
    if (typeof levelId === "string") {
      setCustomCourses(prev => prev.map(course => {
        if (course.id === levelId) {
          return {
            ...course,
            checklistItems: [...course.checklistItems, newItem]
          };
        }
        return course;
      }));
    } else {
      setAllLevels(prev => prev.map(lvl => {
        if (lvl.id === levelId) {
          return {
            ...lvl,
            checklistItems: [...lvl.checklistItems, newItem]
          };
        }
        return lvl;
      }));
    }
  };

  // Publish dynamic complete custom course module
  const handlePublishCustomCourse = (newCourse: CustomCourse) => {
    setCustomCourses(prev => [...prev, newCourse]);
  };

  // Update an existing custom course
  const handleUpdateCustomCourse = (updatedCourse: CustomCourse) => {
    setCustomCourses(prev => prev.map(course => course.id === updatedCourse.id ? updatedCourse : course));
  };

  // Delete a custom course
  const handleDeleteCustomCourse = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Custom Course",
      message: "Are you sure you want to permanently delete this custom generated course? This will also reset any completed checklist items associated with it.",
      confirmText: "Delete",
      onConfirm: () => {
        setCustomCourses(prev => prev.filter(course => course.id !== id));
        // Remove completed item IDs starting with the course ID to maintain consistency
        setCompletedItemIds(prev => prev.filter(itemId => !itemId.startsWith(`${id}-`)));
        
        // Clear selected level ID if we deleted the current level being viewed
        if (selectedLevelId === id) {
          setSelectedLevelId(null);
          setActiveTab("curriculum");
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Start editing mode for a custom course
  const handleEditCustomCourse = (course: CustomCourse) => {
    setEditingCourse(course);
    setActiveTab("creator");
  };

  // Save diagnostic quiz high percentage outputs
  const handleSaveQuizScore = (levelId: number | string, scorePercent: number) => {
    setQuizScores(prev => {
      const currentHigh = prev[String(levelId)] || 0;
      return {
        ...prev,
        [String(levelId)]: Math.max(currentHigh, scorePercent)
      };
    });
  };

  // Reset entire browser progress metrics to original defaults
  const handleResetApp = () => {
    setConfirmModal({
      isOpen: true,
      title: "Reset Application Data",
      message: "Are you sure you want to completely reset all sitemaps, streak counters, custom modules, and completed checkboxes?",
      confirmText: "Reset All",
      onConfirm: () => {
        localStorage.clear();
        setCompletedItemIds([]);
        setQuizScores({});
        setCustomCourses([]);
        setAwards([]);
        setAllLevels(MASTER_LEVELS);
        setStreakCount(1);
        setLastActiveDate(new Date().toDateString());
        setSelectedLevelId(null);
        setActiveTab("dashboard");
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Select a level to view its detailed study segment
  const handleSelectLevel = (levelId: number | string) => {
    setSelectedLevelId(levelId);
    setActiveTab("details");
  };

  const handleLaunchQuizFromLevel = (levelId: number | string) => {
    setSelectedLevelId(levelId);
    setActiveTab("quiz");
  };

  // Find active level record for details pane
  const activeLevelRecord = selectedLevelId !== null
    ? (typeof selectedLevelId === "string" 
        ? customCourses.find(c => c.id === selectedLevelId)
        : allLevels.find(l => l.id === selectedLevelId))
    : null;

  // Global user statistics
  const totalCheckpoints = [
    ...allLevels.flatMap(l => l.checklistItems),
    ...customCourses.flatMap(c => c.checklistItems)
  ];
  const completedCount = totalCheckpoints.filter(item => completedItemIds.includes(item.id)).length;
  const overallPercentage = totalCheckpoints.length > 0 
    ? Math.round((completedCount / totalCheckpoints.length) * 100) 
    : 0;

  // Build package representation for views
  const userProgressInstance: UserProgress = {
    theme: "light",
    completedItemIds,
    quizScores,
    customCourses,
    selectedTrackId,
    selectedLevelId,
    currentStreak: streakCount,
    lastActivityDate: lastActiveDate,
    awards
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 font-sans flex flex-col justify-between animate-fade-in" id="app-wrapper">
      {/* Upper Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs px-4 sm:px-6 py-2.5 sm:py-3.5" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          
          {/* Top Row: Logo & Actions / Stats */}
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group" onClick={() => setActiveTab("dashboard")}>
              <div className="p-1.5 sm:p-2 border border-neutral-200 bg-neutral-900 text-white rounded-xl shadow-md transform group-hover:rotate-6 transition-all duration-300 shrink-0">
                <Layers className="size-[15px] sm:size-[18px]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-[11px] sm:text-xs md:text-sm font-sans font-extrabold tracking-tight text-neutral-900 leading-none truncate pr-1">
                  SEO &amp; AI Search Mastery LMS
                </h1>
                <p className="text-[7.5px] sm:text-[9px] text-emerald-600 font-mono mt-0.5 tracking-wider uppercase font-extrabold leading-none">
                  ENTERPRISE CHECKLIST ENGINE
                </p>
              </div>
            </div>

            {/* Actions Panel (Fully responsive alignment) */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              {/* Stats - Hidden on tiny mobile screens, beautiful on sm+ */}
              <div className="hidden md:flex items-center gap-2.5">
                <div className="text-right leading-none">
                  <span className="text-[7.5px] text-neutral-400 font-mono block tracking-widest uppercase font-bold">COMPLETION</span>
                  <span className="text-[10px] sm:text-xs font-mono font-extrabold text-neutral-800">{completedCount}/{totalCheckpoints.length} Items</span>
                </div>
                <div className="w-14 sm:w-16 bg-neutral-100 h-1.5 rounded-full overflow-hidden border border-neutral-200/60 p-[1px]">
                  <div 
                    className="bg-neutral-900 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${overallPercentage}%` }}
                  ></div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200/40 text-[9px] sm:text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded shadow-3xs leading-none">
                  {overallPercentage}%
                </div>
              </div>

              {/* Hire Consultation Button - Always elegant & accessible */}
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-neutral-900 hover:bg-neutral-805 text-white text-[10px] sm:text-xs font-sans font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles size={11} className="text-emerald-400 animate-pulse shrink-0" />
                <span>Hire Consultation</span>
              </button>

              {/* Reset App */}
              <button
                onClick={handleResetApp}
                title="Reset all diagnostics metrics"
                className="p-1.5 hover:bg-red-50 hover:text-red-650 hover:border-red-200 rounded-xl border border-neutral-200 text-neutral-400 hover:text-neutral-800 transition-all cursor-pointer shrink-0"
              >
                <RefreshCw size={12} className="sm:size-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation Tabs with clean horizontal swiping */}
          <div className="w-full overflow-x-auto scrollbar-none border-t border-neutral-100 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <nav className="flex items-center gap-1 min-w-max bg-neutral-150/40 p-1 rounded-xl border border-neutral-200/30" id="nav-tabs">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-sans font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/30 font-extrabold"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/45"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-sans font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeTab === "curriculum" || activeTab === "details"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/30 font-extrabold"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/45"
                }`}
              >
                Curriculum Syllabus
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-sans font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeTab === "quiz"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/30 font-extrabold"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/45"
                }`}
              >
                Diagnostics Quizzes
              </button>
              <button
                onClick={() => setActiveTab("creator")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-sans font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeTab === "creator"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/30 font-extrabold"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/45"
                }`}
              >
                Custom Course Builder
              </button>
              {activeTab === "crm" && (
                <button
                  onClick={() => setActiveTab("crm")}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-sans font-bold transition-all duration-150 whitespace-nowrap bg-neutral-900 text-white shadow-sm font-extrabold cursor-pointer border border-neutral-800"
                >
                  Leads CRM Console 🛡️
                </button>
              )}
            </nav>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8" id="main-content">
        <div className="fade-in">
          {activeTab === "dashboard" && (
            <Dashboard
              progress={userProgressInstance}
              levels={allLevels}
              onChangeTrack={setSelectedTrackId}
              onSelectLevel={handleSelectLevel}
              tabChanger={(tab) => setActiveTab(tab)}
              onOpenConsulting={() => setIsLeadModalOpen(true)}
              onToggleItem={handleToggleItem}
            />
          )}

          {activeTab === "curriculum" && (
            <CourseCurriculum
              levels={allLevels}
              progress={userProgressInstance}
              onSelectLevel={handleSelectLevel}
              selectedTrackId={selectedTrackId}
              onSelectTrackId={setSelectedTrackId}
              onDeleteCustomCourse={handleDeleteCustomCourse}
              onEditCustomCourse={handleEditCustomCourse}
              onOpenConsulting={() => setIsLeadModalOpen(true)}
            />
          )}

          {activeTab === "details" && activeLevelRecord && (
            <ModuleDetails
              level={activeLevelRecord}
              completedItemIds={completedItemIds}
              onToggleItem={handleToggleItem}
              onAddCustomItem={handleAddCustomItem}
              onBack={() => setActiveTab("curriculum")}
              onLaunchQuiz={handleLaunchQuizFromLevel}
            />
          )}

          {activeTab === "creator" && (
            <CourseCreator
              onPublish={handlePublishCustomCourse}
              onUpdate={handleUpdateCustomCourse}
              editingCourse={editingCourse}
              onCancelEdit={() => {
                setEditingCourse(null);
                setActiveTab("curriculum");
              }}
              tabSwitcher={(tab) => {
                setEditingCourse(null);
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === "quiz" && (
            <QuizModule
              levels={allLevels}
              customCourses={customCourses}
              selectedLevelId={selectedLevelId}
              onSaveQuizScore={handleSaveQuizScore}
              onNavigateToLevel={handleSelectLevel}
            />
          )}

          {activeTab === "crm" && (
            <CRMConsole onClose={() => setActiveTab("dashboard")} />
          )}
        </div>
      </main>

      {/* Footer block */}
      <footer className="bg-white border-t border-neutral-200/60 px-6 py-8 text-neutral-500 text-xs font-sans leading-relaxed shadow-3xs" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="font-extrabold text-neutral-800 flex items-center justify-center md:justify-start gap-1.5 text-[13px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SEO, GEO, AEO &amp; AIO Master Enterprise LMS
            </p>
            <p className="text-[11px] text-neutral-400 font-medium">
              &copy; 2026 Enterprise Learning Engine. All rights reserved.
            </p>
            <div className="pt-1 flex flex-wrap gap-2 justify-center md:justify-start text-[11px]">
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all cursor-pointer"
              >
                ✦ Request Corporate Team Training &amp; Audits
              </button>
              <span className="text-neutral-300">|</span>
              <button
                type="button"
                onClick={() => setActiveTab("crm")}
                className="text-neutral-500 hover:text-neutral-800 font-bold hover:underline transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                <Shield size={11} className="text-neutral-400" />
                <span>Admin CRM Console</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center md:text-right">
            <div className="bg-neutral-50 border border-neutral-150 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 tracking-wider">Developer:</span>
              <span className="text-[11px] font-bold text-neutral-800">Amrish Kumar Singh</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/amrishkumarsingh/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a66c2]/10 hover:bg-[#0a66c2]/15 text-[#0a66c2] border border-[#0a66c2]/20 rounded-xl text-xs font-bold transition-all shadow-3xs hover:scale-[1.02]"
                title="Connect on LinkedIn"
              >
                <Linkedin size={13} className="fill-current" />
                <span>LinkedIn Profile</span>
              </a>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <a 
                href="mailto:amrish.singh01@gmail.com" 
                className="text-neutral-500 hover:text-neutral-800 underline underline-offset-4 decoration-neutral-200 transition-all font-semibold"
              >
                amrish.singh01@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Confirmation Modal Portal overlay */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="confirm-modal">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-scale-up">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-100 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-sans font-extrabold text-neutral-900 text-base leading-snug">
                  {confirmModal.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {confirmModal.message}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-sm cursor-pointer"
              >
                {confirmModal.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🏆 Full-screen Celebratory Mastery Award Overlay */}
      <CelebrationConfetti
        activeCelebrateId={activeCelebrateId}
        celebratedLevel={celebratedLevel}
        onDismiss={handleCelebrateDismiss}
      />

      {/* Corporate Lead Capture / Consulting Form Overlay */}
      <LeadFormModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
      />
    </div>
  );
}
