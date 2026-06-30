/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DynamicLesson, LessonContent } from "../types";
import { 
  CheckCircle, ChevronRight, HelpCircle, Check, X, ArrowLeft, ChevronLeft 
} from "lucide-react";

interface LessonPlayerProps {
  moduleLessons: DynamicLesson[];
  activeLessonIdx: number;
  handleSelectLesson: (idx: number) => void;
  completedLessons: string[];
  toggleLessonCompleted: (lessonId: string) => void;
  quickQuizAnswers: Record<string, number>;
  handleSelectQuickQuizAnswer: (lessonId: string, optIdx: number) => void;
  quickQuizChecked: Record<string, boolean>;
  handleCheckQuickQuiz: (lessonId: string) => void;
  renderLessonContent: (text: string) => React.ReactNode;
  renderDescriptionWithLinks: (text: string) => React.ReactNode;
}

export function LessonPlayer({
  moduleLessons,
  activeLessonIdx,
  handleSelectLesson,
  completedLessons,
  toggleLessonCompleted,
  quickQuizAnswers,
  handleSelectQuickQuizAnswer,
  quickQuizChecked,
  handleCheckQuickQuiz,
  renderLessonContent,
  renderDescriptionWithLinks
}: LessonPlayerProps) {
  const activeLesson = moduleLessons[activeLessonIdx];
  if (!activeLesson) {
    return (
      <div className="p-8 text-center bg-neutral-50 border border-neutral-200 rounded-3xl">
        <p className="text-sm font-sans font-semibold text-neutral-500">No lessons available for this module.</p>
      </div>
    );
  }
  
  const isCurrentLessonCompleted = completedLessons.includes(activeLesson.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="lms-lesson-player-container">
      {/* Left Lessons Sidebar */}
      <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-3xl p-4 space-y-3 h-[580px] flex flex-col" id="lessons-sidebar-panel">
        <div className="border-b border-neutral-100 pb-2 text-left">
          <h3 className="font-sans font-extrabold text-neutral-900 text-xs uppercase tracking-wider">Lessons Map</h3>
          <p className="text-[10px] text-neutral-400">Complete each lesson to optimize and clear verification checkpoints.</p>
        </div>

        <div className="overflow-y-auto space-y-1.5 pr-1 flex-1 scrollbar-thin" id="lessons-list-scroll">
          {moduleLessons.map((lesson, idx) => {
            const isSelected = activeLessonIdx === idx;
            const isComp = completedLessons.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                id={`lessons-map-btn-${lesson.id}`}
                onClick={() => handleSelectLesson(idx)}
                className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-200/60 text-indigo-950 font-semibold"
                    : "bg-white hover:bg-neutral-50/70 border-neutral-200/50 text-neutral-700"
                }`}
              >
                <div className="shrink-0">
                  {isComp ? (
                    <CheckCircle size={15} className="text-emerald-500 fill-emerald-50" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-neutral-300" />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[10px] font-mono font-semibold text-neutral-400 leading-none">
                    LESSON {lesson.number}
                  </p>
                  <p className="text-xs font-sans font-bold truncate mt-0.5">
                    {lesson.title}
                  </p>
                </div>
                <ChevronRight size={12} className={`shrink-0 ${isSelected ? "text-indigo-400" : "text-neutral-300"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Active Lesson Reader */}
      <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-6 space-y-6 flex flex-col justify-between min-h-[580px] shadow-xs" id="active-lesson-reader">
        {/* Lesson Heading */}
        <div className="space-y-1 pb-4 border-b border-neutral-100 text-left">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md text-[9px] font-mono font-bold uppercase">
              Lesson {activeLesson.number} of {moduleLessons.length}
            </span>
            {isCurrentLessonCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-sans font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                <Check size={11} strokeWidth={3} /> Completed
              </span>
            )}
          </div>
          <h3 className="text-xl font-sans font-extrabold text-neutral-900 tracking-tight mt-1.5">
            {activeLesson.title}
          </h3>
        </div>

        {/* Goal callout */}
        <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-xl flex items-start gap-2.5 text-left" id="lesson-goal-box">
          <span className="text-base text-amber-600 select-none">🎯</span>
          <div className="space-y-0.5">
            <span className="font-extrabold uppercase text-[9px] text-amber-700 block tracking-wide">Lesson Goal:</span>
            <p className="text-xs text-neutral-700 leading-normal font-sans font-medium">
              {activeLesson.goal}
            </p>
          </div>
        </div>

        {/* Dynamic Lesson Content Block Loop */}
        <div className="space-y-4 flex-1 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin text-left" id="lesson-blocks-scroller">
          {activeLesson.content.map((block, bIdx) => {
            if (block.type === "text") {
              return (
                <div key={bIdx} className="prose prose-sm font-sans" id={`block-text-${bIdx}`}>
                  {renderLessonContent(block.text || "")}
                </div>
              );
            }
            if (block.type === "callout") {
              const callType = block.calloutType || "info";
              let callBg = "bg-indigo-50/55 border-indigo-500";
              if (callType === "warning") callBg = "bg-amber-50/55 border-amber-500";
              if (callType === "success") callBg = "bg-emerald-50/55 border-emerald-500";
              if (callType === "tip") callBg = "bg-teal-50/55 border-teal-500";

              return (
                <div key={bIdx} id={`block-callout-${bIdx}`} className={`my-4 p-4 ${callBg} border-l-4 rounded-r-xl text-neutral-800 italic text-xs leading-relaxed font-sans font-medium animate-fade-in`}>
                  {renderDescriptionWithLinks(block.text || "")}
                </div>
              );
            }
            if (block.type === "quiz" && block.quiz) {
              const quiz = block.quiz;
              const userSelection = quickQuizAnswers[activeLesson.id];
              const isChecked = quickQuizChecked[activeLesson.id];

              return (
                <div key={bIdx} id={`block-quiz-${bIdx}`} className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4 text-left animate-fade-in mt-6">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-indigo-500" />
                    <h4 className="font-sans font-bold text-xs text-neutral-800 uppercase tracking-wider">Quick Concept Check</h4>
                  </div>
                  <p className="text-xs font-sans font-semibold text-neutral-900">
                    {quiz.question}
                  </p>

                  <div className="space-y-2">
                    {quiz.options.map((option, oIdx) => {
                      const isSelected = userSelection === oIdx;
                      const isCorrect = quiz.correctAnswerIndex === oIdx;

                      let btnStyles = "bg-white hover:bg-neutral-50/80 border-neutral-200 text-neutral-800";
                      if (isSelected) {
                        btnStyles = "bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-2 ring-indigo-500/20";
                      }
                      if (isChecked) {
                        if (isCorrect) {
                          btnStyles = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/10";
                        } else if (isSelected) {
                          btnStyles = "bg-rose-50 border-rose-500 text-rose-950 font-semibold ring-2 ring-rose-500/10";
                        } else {
                          btnStyles = "bg-white border-neutral-200 text-neutral-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          id={`quick-quiz-${activeLesson.id}-opt-${oIdx}`}
                          onClick={() => handleSelectQuickQuizAnswer(activeLesson.id, oIdx)}
                          disabled={isChecked}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyles}`}
                        >
                          <span className="flex-1 pr-2">{option}</span>
                          <div className="shrink-0">
                            {isChecked && isCorrect && <CheckCircle size={16} className="text-emerald-500" />}
                            {isChecked && isSelected && !isCorrect && <X size={16} className="text-rose-500" />}
                            {!isChecked && (
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-indigo-500" : "border-neutral-300"}`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quiz actions */}
                  <div className="flex items-center justify-between pt-2">
                    {!isChecked ? (
                      <button
                        id={`verify-quick-quiz-${activeLesson.id}`}
                        onClick={() => handleCheckQuickQuiz(activeLesson.id)}
                        disabled={userSelection === undefined}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Verify Answer
                      </button>
                    ) : (
                      <div className="p-3.5 bg-neutral-100 border border-neutral-200 rounded-xl space-y-1 w-full animate-slide-up text-left">
                        <p className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wide">Explanation:</p>
                        <p className="text-xs font-sans font-medium text-neutral-700 leading-relaxed">
                          {quiz.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Actions / Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 flex-wrap gap-3">
          <button
            id={`toggle-lesson-comp-${activeLesson.id}`}
            onClick={() => toggleLessonCompleted(activeLesson.id)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isCurrentLessonCompleted
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isCurrentLessonCompleted ? (
              <>
                <CheckCircle size={14} />
                <span>Completed! Toggle Undo</span>
              </>
            ) : (
              <>
                <Check size={14} strokeWidth={3} />
                <span>Mark Lesson as Completed</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              id="prev-lesson-btn"
              onClick={() => handleSelectLesson(Math.max(0, activeLessonIdx - 1))}
              disabled={activeLessonIdx === 0}
              className="p-2 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 rounded-lg border border-neutral-200 transition-all cursor-pointer"
              title="Previous Lesson"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              id="next-lesson-btn"
              onClick={() => handleSelectLesson(Math.min(moduleLessons.length - 1, activeLessonIdx + 1))}
              disabled={activeLessonIdx === moduleLessons.length - 1}
              className="p-2 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 rounded-lg border border-neutral-200 transition-all cursor-pointer"
              title="Next Lesson"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
