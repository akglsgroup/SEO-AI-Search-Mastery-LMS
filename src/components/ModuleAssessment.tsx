/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Trophy, Check, X, FileText, Send, Sparkles, CheckCircle 
} from "lucide-react";
import {
  SEO_FUNDAMENTALS_ASSESSMENT,
  SEO_FUNDAMENTALS_PRACTICALS,
  SEO_FUNDAMENTALS_MINI_PROJECT
} from "../data/seoLessons";

interface ModuleAssessmentProps {
  assessmentSubmitted: boolean;
  assessmentScore: number | null;
  assessmentAnswers: Record<string, number>;
  setAssessmentAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  handleSubmitAssessment: () => void;
  handleRetakeAssessment: () => void;
  practicalSubmissions: Record<string, string>;
  setPracticalSubmissions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  practicalSaved: Record<string, boolean>;
  setPracticalSaved: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  handleSavePractical: (id: string, text: string) => void;
  projectSubmission: string;
  setProjectSubmission: (text: string) => void;
  projectSubmitted: boolean;
  handleSubmitProject: () => void;
  handleResetProject: () => void;
}

export function ModuleAssessment({
  assessmentSubmitted,
  assessmentScore,
  assessmentAnswers,
  setAssessmentAnswers,
  handleSubmitAssessment,
  handleRetakeAssessment,
  practicalSubmissions,
  setPracticalSubmissions,
  practicalSaved,
  setPracticalSaved,
  handleSavePractical,
  projectSubmission,
  setProjectSubmission,
  projectSubmitted,
  handleSubmitProject,
  handleResetProject
}: ModuleAssessmentProps) {
  return (
    <div className="space-y-8 animate-fade-in text-left" id="module-assessment-container">
      {/* 20 Question Final Exam */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-6" id="final-academic-exam">
        <div className="border-b border-neutral-100 pb-4 space-y-1 text-left">
          <span className="px-2 py-0.5 bg-neutral-900 text-white rounded-md text-[9px] font-mono font-bold uppercase tracking-wider">
            MODULE ACADEMIC EXAM
          </span>
          <h3 className="text-lg font-sans font-extrabold text-neutral-950 tracking-tight mt-1.5 flex items-center gap-2">
            <Trophy className="text-amber-500" size={18} />
            Official Fundamentals Assessment (20 MCQs)
          </h3>
          <p className="text-xs text-neutral-500 font-sans">
            Answer all 20 questions carefully to verify your understanding. Score at least 80% (16/20) to qualify for the gold certificate status.
          </p>
        </div>

        {assessmentSubmitted ? (
          /* EXAM RESULTS PAGE */
          <div className="space-y-6" id="exam-results-view">
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-xs text-left">
              <div className="flex items-center gap-4">
                {/* Giant Score Circle */}
                <div className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center font-sans font-extrabold shrink-0 ${
                  (assessmentScore ?? 0) >= 16
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : (assessmentScore ?? 0) >= 12
                      ? "border-amber-400 bg-amber-50 text-amber-800"
                      : "border-rose-500 bg-rose-50 text-rose-800"
                }`}>
                  <span className="text-base leading-none">{assessmentScore}</span>
                  <span className="text-[9px] leading-none text-neutral-400">/ 20</span>
                </div>

                <div className="space-y-1 text-left">
                  <p className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">YOUR CLASSIFICATION</p>
                  <h4 className="text-base font-sans font-extrabold text-neutral-900 leading-none">
                    {(assessmentScore ?? 0) >= 18
                      ? "👑 SEO Archmage (Perfect Score!)"
                      : (assessmentScore ?? 0) >= 16
                        ? "🥇 Certified SEO Specialist"
                        : (assessmentScore ?? 0) >= 12
                          ? "🥈 SEO Competent Practitioner"
                          : "📚 SEO Student (Needs Review)"
                    }
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    {(assessmentScore ?? 0) >= 16
                      ? "Outstanding achievement! You possess a robust foundation in crawl paths, ranking algorithms, and search intents."
                      : "Review lessons where you missed questions to secure a better understanding of advanced technical algorithms."
                    }
                  </p>
                </div>
              </div>

              <button
                id="retake-exam-btn"
                onClick={handleRetakeAssessment}
                className="px-4 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-sans font-bold rounded-xl text-xs transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              >
                Retake Assessment
              </button>
            </div>

            {/* Detailed Review Section */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">Detailed Exam Review</h4>
              
              <div className="space-y-3">
                {SEO_FUNDAMENTALS_ASSESSMENT.map((q, idx) => {
                  const userAns = assessmentAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswerIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-neutral-200/60 bg-white space-y-2.5">
                      <p className="text-xs font-sans font-extrabold text-neutral-900">
                        Question {idx + 1}: {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                        {q.options.map((opt, oIdx) => {
                          const wasChosen = userAns === oIdx;
                          const isCorrectOption = q.correctAnswerIndex === oIdx;
                          
                          let style = "border-neutral-200 bg-neutral-50/30 text-neutral-600";
                          if (wasChosen) {
                            style = isCorrectOption
                              ? "border-emerald-300 bg-emerald-50 text-emerald-950 font-bold"
                              : "border-rose-300 bg-rose-50 text-rose-950 font-bold";
                          } else if (isCorrectOption) {
                            style = "border-emerald-200 bg-emerald-50/20 text-emerald-900";
                          }

                          return (
                            <div key={oIdx} className={`p-2 rounded-lg border flex items-center gap-2 ${style}`}>
                              <span className="w-4 h-4 text-[9px] font-mono font-bold flex items-center justify-center bg-white border rounded-md">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                              {wasChosen && (
                                isCorrectOption ? (
                                  <Check size={11} className="text-emerald-600 ml-auto" />
                                ) : (
                                  <X size={11} className="text-rose-600 ml-auto" />
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 leading-relaxed font-sans border-l-2 border-neutral-300 text-left">
                        <span className="font-bold text-[9px] font-mono uppercase text-neutral-400 block mb-0.5">EXPLANATION</span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* EXAM INTERACTIVE VIEW */
          <div className="space-y-6 text-left" id="exam-questions-list">
            <div className="space-y-4">
              {SEO_FUNDAMENTALS_ASSESSMENT.map((q, qIdx) => {
                const chosen = assessmentAnswers[q.id];

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
                    <p className="text-xs font-sans font-extrabold text-neutral-950">
                      Question {qIdx + 1}: {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = chosen === oIdx;
                        return (
                          <button
                            key={oIdx}
                            id={`exam-q-${q.id}-opt-${oIdx}`}
                            onClick={() => setAssessmentAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`text-left p-2.5 rounded-xl border text-xs font-sans transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-bold"
                                : "bg-white hover:bg-neutral-50/50 border-neutral-200 text-neutral-700"
                            }`}
                          >
                            <span className="w-5 h-5 flex items-center justify-center bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-bold rounded-lg uppercase">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-sans font-medium">
                Progress: <span className="text-neutral-900 font-extrabold">{Object.keys(assessmentAnswers).length}</span> of 20 answered
              </p>

              <button
                id="submit-exam-btn"
                onClick={handleSubmitAssessment}
                disabled={Object.keys(assessmentAnswers).length < 20}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-300 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-sm shrink-0 disabled:opacity-50 cursor-pointer"
              >
                Submit Final Exam
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5 Practical Activities */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-6 text-left" id="practical-lab-activities">
        <div className="border-b border-neutral-100 pb-4 space-y-1">
          <span className="px-2 py-0.5 bg-neutral-900 text-white rounded-md text-[9px] font-mono font-bold uppercase tracking-wider">
            PRACTICAL TASKS
          </span>
          <h3 className="text-lg font-sans font-extrabold text-neutral-950 tracking-tight mt-1.5 flex items-center gap-2">
            <FileText className="text-indigo-500" size={18} />
            Interactive Lab Activities (5 Tasks)
          </h3>
          <p className="text-xs text-neutral-500 font-sans">
            Log your physical actions, observations, and conclusions inside these tasks to save them to your local portfolio records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEO_FUNDAMENTALS_PRACTICALS.map((prac) => {
            const savedText = practicalSubmissions[prac.id] || "";
            const isSaved = practicalSaved[prac.id];

            return (
              <div key={prac.id} className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 border border-indigo-200 text-[8px] font-mono font-bold uppercase tracking-wider rounded">
                      LAB WORK
                    </span>
                    {isSaved && (
                      <span className="text-[10px] text-emerald-600 font-sans font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        <CheckCircle size={11} className="text-emerald-500" /> Saved
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-sans font-extrabold text-neutral-900">
                    {prac.title}
                  </h4>
                  
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {prac.description}
                  </p>

                  <div className="space-y-1 pl-3 border-l-2 border-indigo-200">
                    <p className="text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-wide">Methodology Steps:</p>
                    <ul className="space-y-1 list-decimal pl-3 text-[10px] text-neutral-600 text-left">
                      {prac.steps.map((step, sIdx) => <li key={sIdx}>{step}</li>)}
                    </ul>
                  </div>

                  <div className="bg-amber-50/40 p-2 border border-amber-100 rounded-lg text-[10px]">
                    <strong className="text-amber-800">Deliverable: </strong>
                    <span className="text-neutral-700">{prac.deliverable}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200/50 mt-4">
                  <textarea
                    id={`practical-text-area-${prac.id}`}
                    placeholder="Type your notes or results here..."
                    value={savedText}
                    onChange={(e) => {
                      setPracticalSubmissions(prev => ({ ...prev, [prac.id]: e.target.value }));
                      setPracticalSaved(prev => ({ ...prev, [prac.id]: false }));
                    }}
                    className="w-full h-20 p-2.5 bg-white border border-neutral-200 rounded-xl text-[11px] font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-neutral-400"
                  />
                  <button
                    id={`practical-save-btn-${prac.id}`}
                    onClick={() => handleSavePractical(prac.id, savedText)}
                    className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Send size={10} />
                    <span>Save Deliverable Log</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capstone Mini Project */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-6 text-left" id="capstone-mini-project-section">
        <div className="border-b border-neutral-100 pb-4 space-y-1">
          <span className="px-2 py-0.5 bg-neutral-900 text-white rounded-md text-[9px] font-mono font-bold uppercase tracking-wider">
            MODULE CAPSTONE PROJECT
          </span>
          <h3 className="text-lg font-sans font-extrabold text-neutral-950 tracking-tight mt-1.5 flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={18} />
            Capstone: {SEO_FUNDAMENTALS_MINI_PROJECT.title}
          </h3>
          <p className="text-xs text-neutral-500 font-sans">
            Complete this comprehensive hands-on project to finalize your Module 1 syllabus requirements.
          </p>
        </div>

        <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4 text-left">
          <div className="space-y-1 text-left">
            <p className="text-xs font-sans font-bold text-neutral-800">
              Project Prompt: {SEO_FUNDAMENTALS_MINI_PROJECT.description}
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {SEO_FUNDAMENTALS_MINI_PROJECT.prompt}
            </p>
          </div>

          <div className="space-y-2 bg-white p-4 rounded-xl border border-neutral-200 text-left">
            <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">Submission Guidelines &amp; Scope:</p>
            <ul className="list-disc pl-4 space-y-2 text-xs text-neutral-700 font-medium">
              {SEO_FUNDAMENTALS_MINI_PROJECT.guidelines.map((gl, glIdx) => (
                <li key={glIdx}>{gl}</li>
              ))}
            </ul>
          </div>

          {projectSubmitted ? (
            <div className="space-y-4 bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100 text-left" id="project-submitted-view">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="text-emerald-500" size={20} />
                <div>
                  <h4 className="text-xs font-sans font-extrabold text-neutral-900 leading-none">Capstone Report Logged successfully!</h4>
                  <p className="text-[10px] text-emerald-700 font-medium">Your SEO audit report has been submitted to your local dashboard workspace.</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-emerald-100 rounded-xl text-xs font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {projectSubmission}
              </div>
              <button
                id="revise-project-btn"
                onClick={handleResetProject}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-sans font-bold cursor-pointer"
              >
                Revise Submission
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-2 text-left" id="project-form-view">
              <textarea
                id="capstone-textarea"
                placeholder="Paste your completed site audit report here..."
                value={projectSubmission}
                onChange={(e) => setProjectSubmission(e.target.value)}
                className="w-full h-44 p-3 bg-white border border-neutral-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-neutral-400"
              />
              <button
                id="submit-project-btn"
                onClick={handleSubmitProject}
                disabled={!projectSubmission.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-300 text-white text-xs font-sans font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send size={13} />
                <span>Submit Capstone Project</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
