/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { QuizQuestion, Level, CustomCourse } from "../types";
import { LEVEL_QUIZZES } from "../data/checklist";
import { Award, Check, X, HelpCircle, ArrowRight, RotateCcw, AlertCircle, BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";

interface QuizModuleProps {
  levels: Level[];
  customCourses: CustomCourse[];
  selectedLevelId: number | string | null;
  onSaveQuizScore: (levelId: number | string, scorePercent: number) => void;
  onNavigateToLevel: (levelId: number | string) => void;
}

export default function QuizModule({
  levels,
  customCourses,
  selectedLevelId,
  onSaveQuizScore,
  onNavigateToLevel
}: QuizModuleProps) {
  // Aggregate all possible quizzes
  const getQuizzesForLevel = (id: number | string): QuizQuestion[] => {
    // Check if it's a custom course first
    if (typeof id === "string") {
      const cc = customCourses.find(c => c.id === id);
      return cc ? cc.quizQuestions : [];
    }
    // Check from standard database
    return LEVEL_QUIZZES[Number(id)] || [];
  };

  // State
  const [activeLevelId, setActiveLevelId] = useState<number | string>(selectedLevelId || 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Quizzes list for active select option
  const activeQuizzes = getQuizzesForLevel(activeLevelId);
  const currentQuestion = activeQuizzes[currentQuestionIndex];

  // Handlers
  const handleAnswerSubmit = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOptionIndex(optionIndex);
    setHasAnswered(true);

    if (optionIndex === currentQuestion.correctAnswerIndex) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuizzes.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    } else {
      // Calculate final score percentage
      const finalPercentage = Math.round((correctAnswersCount / activeQuizzes.length) * 100);
      onSaveQuizScore(activeLevelId, finalPercentage);
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // Check if value can be parsed into a standard level number
    const parsed = Number(val);
    const resolvedId = isNaN(parsed) || val === "" ? val : parsed;
    setActiveLevelId(resolvedId);
    
    // Reset states
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
  };

  // Combined level choices list (standard + custom)
  const availableLevels = [
    ...levels.map(l => ({ id: l.id, title: `Level ${l.id}: ${l.title}` })),
    ...customCourses.map(c => ({ id: c.id, title: `Custom: ${c.title}` }))
  ];

  return (
    <div className="space-y-6" id="lms-quiz-engine">
      {/* Quiz Controller / Select header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 p-5 rounded-3xl shadow-xs">
        <div className="space-y-1">
          <h2 className="text-xl font-sans font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <HelpCircle size={20} className="text-neutral-700" />
            Diagnostics Diagnostics Quiz Player
          </h2>
          <p className="text-xs text-neutral-500">Pick a course segment or level to run an immediate recall test.</p>
        </div>

        {/* Level selection option drop box */}
        <div className="space-y-1">
          <label className="text-[10px] text-neutral-400 font-mono block">SELECT ACTIVE SYLLABUS</label>
          <select
            value={activeLevelId}
            onChange={handleLevelChange}
            className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-800"
          >
            {availableLevels.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Quiz playing panel */}
      {activeQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Player Card */}
          <div className="lg:col-span-2 space-y-6">
            {!isQuizFinished ? (
              <div className="bg-white border border-neutral-200 p-6 rounded-3xl shadow-xs space-y-6">
                {/* Tracker Step bar */}
                <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Question {currentQuestionIndex + 1} of {activeQuizzes.length}
                  </span>
                  <div className="flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold text-neutral-600">
                    <span>Correct Answer choice secures points</span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-sans font-bold text-neutral-905 leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Option selection Buttons */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    const isCorrect = idx === currentQuestion.correctAnswerIndex;
                    
                    let btnClass = "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800";
                    let iconNode = <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-mono font-bold text-neutral-400">{String.fromCharCode(65 + idx)}</span>;

                    if (hasAnswered) {
                      if (isCorrect) {
                        // All answered states display correct choices as green
                        btnClass = "bg-emerald-50 border-emerald-300 text-emerald-900";
                        iconNode = <div className="p-0.5 bg-emerald-500 text-white rounded-full shrink-0"><Check size={14} strokeWidth={3} /></div>;
                      } else if (isSelected) {
                        // User chose wrong option gets highlighted as red
                        btnClass = "bg-red-50 border-red-300 text-red-900";
                        iconNode = <div className="p-0.5 bg-red-500 text-white rounded-full shrink-0"><X size={14} strokeWidth={3} /></div>;
                      } else {
                        // Unselected wrong buttons are soft
                        btnClass = "bg-white opacity-60 border-neutral-200 text-neutral-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleAnswerSubmit(idx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-sans font-semibold transition-all flex items-center gap-3.5 leading-snug cursor-pointer ${btnClass}`}
                      >
                        {iconNode}
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer explanation panel */}
                {hasAnswered && (
                  <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2 animate-fade-in">
                    <p className="text-xs font-mono font-bold text-neutral-700 uppercase flex items-center gap-1.5">
                      <BookOpen size={14} />
                      Solution Insights &amp; Advices
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                {/* Footer Next Controls */}
                {hasAnswered && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-[1.01]"
                    >
                      <span>{currentQuestionIndex + 1 < activeQuizzes.length ? "Proceed Next Question" : "View Final Score"}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Quiz Score overview summary
              <div className="bg-white border border-neutral-200 p-8 rounded-3xl shadow-xs text-center space-y-6">
                <div className="p-4 bg-amber-50 text-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-amber-200">
                  <Award size={36} fill="currentColor" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-neutral-900 text-xl md:text-2xl tracking-tight">Level Diagnostics Cleared!</h3>
                  <p className="text-sm text-neutral-500">
                    You scored <span className="font-bold text-neutral-900 text-base">{correctAnswersCount}/{activeQuizzes.length}</span> correct answers.
                  </p>
                </div>

                {/* Score percent tag */}
                <div className="inline-block p-4 px-8 bg-neutral-900 text-white rounded-2xl">
                  <p className="text-xs text-neutral-400 font-mono">SCORED ACCURACY</p>
                  <p className="text-3xl font-sans font-semibold text-emerald-400">
                    {Math.round((correctAnswersCount / activeQuizzes.length) * 100)}%
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-normal max-w-md mx-auto font-normal">
                  *Your high scoring logs are updated. Keep studying standard syllabus tracks to acquire ultimate multi-engine ranking wisdom.
                </p>

                <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-100">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Replay Match</span>
                  </button>

                  <button
                    onClick={() => onNavigateToLevel(activeLevelId)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Back to Checklist Study</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side Guidance / Fact Board */}
          <div className="space-y-6">
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-neutral-800">
                <Star size={18} className="text-neutral-600" />
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider">Quiz Guidances</h4>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-500 font-normal leading-relaxed list-disc list-inside">
                <li>Verify your practical knowledge with instant-correction tests.</li>
                <li>Each test has detailed advice to explain the theoretical concepts.</li>
                <li>Your highest scores are recorded directly in the general progress tracking ledger.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-neutral-50 border border-neutral-200 rounded-3xl space-y-2">
          <AlertCircle size={32} className="mx-auto text-neutral-400" />
          <p className="font-sans font-semibold text-neutral-700 text-sm">No quizzes configured</p>
          <p className="text-xs text-neutral-400">There are no diagnostic multiple-choice templates mapped within this custom level.</p>
        </div>
      )}
    </div>
  );
}
