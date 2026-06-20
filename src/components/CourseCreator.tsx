/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CustomCourse, ChecklistItem, QuizQuestion } from "../types";
import { Plus, Trash2, Check, Sparkles, BookOpen, Layers, Award, FileText, CheckSquare } from "lucide-react";
import { motion } from "motion/react";

interface CourseCreatorProps {
  onPublish: (newCourse: CustomCourse) => void;
  onUpdate?: (updatedCourse: CustomCourse) => void;
  editingCourse?: CustomCourse | null;
  onCancelEdit?: () => void;
  tabSwitcher: (tab: "curriculum") => void;
}

export default function CourseCreator({ 
  onPublish, 
  onUpdate,
  editingCourse, 
  onCancelEdit,
  tabSwitcher 
}: CourseCreatorProps) {
  // Form States
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");
  const [category, setCategory] = useState("custom");

  // Draft List Items
  const [draftItems, setDraftItems] = useState<{ title: string; points: number }[]>([
    { title: "Evaluate staging server headers for correct cache controls", points: 10 },
    { title: "Execute initial citation gap tests on local directories", points: 10 }
  ]);
  const [nestedTitle, setNestedTitle] = useState("");

  // Draft Quiz Questions
  const [draftQuizzes, setDraftQuizzes] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[]>([
    {
      question: "Which check ensures search bots crawl your newly updated pages?",
      options: ["Clearing browser cookie memory", "Publishing XML sitemaps and indexing requests", "Adding random video embeds"],
      correctIndex: 1,
      explanation: "XML sitemaps advertise page updates directly to search spiders, accelerating crawling speeds."
    }
  ]);

  // Draft Quiz Inputs
  const [quizQuestionText, setQuizQuestionText] = useState("");
  const [quizOpt1, setQuizOpt1] = useState("");
  const [quizOpt2, setQuizOpt2] = useState("");
  const [quizOpt3, setQuizOpt3] = useState("");
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);
  const [quizExplanation, setQuizExplanation] = useState("");

  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Sync draft states when entering edit mode or when editingCourse updates
  React.useEffect(() => {
    if (editingCourse) {
      setCourseTitle(editingCourse.title);
      setDescription(editingCourse.description);
      setDifficulty(editingCourse.difficulty);
      setCategory(editingCourse.category || "custom");
      setDraftItems(editingCourse.checklistItems.map(item => ({ title: item.title, points: item.points })));
      setDraftQuizzes(editingCourse.quizQuestions.map(q => ({
        question: q.question,
        options: q.options,
        correctIndex: q.correctAnswerIndex,
        explanation: q.explanation
      })));
    } else {
      setCourseTitle("");
      setDescription("");
      setDifficulty("Intermediate");
      setCategory("custom");
      setDraftItems([
        { title: "Evaluate staging server headers for correct cache controls", points: 10 },
        { title: "Execute initial citation gap tests on local directories", points: 10 }
      ]);
      setDraftQuizzes([
        {
          question: "Which check ensures search bots crawl your newly updated pages?",
          options: ["Clearing browser cookie memory", "Publishing XML sitemaps and indexing requests", "Adding random video embeds"],
          correctIndex: 1,
          explanation: "XML sitemaps advertise page updates directly to search spiders, accelerating crawling speeds."
        }
      ]);
    }
  }, [editingCourse]);

  // Handlers
  const addDraftItem = () => {
    if (!nestedTitle.trim()) return;
    setDraftItems([...draftItems, { title: nestedTitle.trim(), points: 10 }]);
    setNestedTitle("");
  };

  const removeDraftItem = (index: number) => {
    setDraftItems(draftItems.filter((_, i) => i !== index));
  };

  const addDraftQuiz = () => {
    if (!quizQuestionText.trim() || !quizOpt1.trim() || !quizOpt2.trim() || !quizOpt3.trim()) {
      alert("Please supply the question and all three option buttons.");
      return;
    }
    setDraftQuizzes([
      ...draftQuizzes,
      {
        question: quizQuestionText.trim(),
        options: [quizOpt1.trim(), quizOpt2.trim(), quizOpt3.trim()],
        correctIndex: quizCorrectIndex,
        explanation: quizExplanation.trim() || "Correct answer choice."
      }
    ]);
    // Clear quiz forms
    setQuizQuestionText("");
    setQuizOpt1("");
    setQuizOpt2("");
    setQuizOpt3("");
    setQuizExplanation("");
    setQuizCorrectIndex(0);
  };

  const removeDraftQuiz = (index: number) => {
    setDraftQuizzes(draftQuizzes.filter((_, i) => i !== index));
  };

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim() || !description.trim()) {
      setFeedbackMsg("Course Title and Lesson summary are required.");
      return;
    }
    if (draftItems.length === 0) {
      setFeedbackMsg("Please add at least one checklist item verification objective.");
      return;
    }

    const uniqueId = editingCourse ? editingCourse.id : `custom-course-${Date.now()}`;

    // Map draft checklist items
    const checklistItems: ChecklistItem[] = draftItems.map((item, index) => {
      let isCompleted = false;
      if (editingCourse) {
        // If editing, try to preserve completed status for items with same title
        const matchingItem = editingCourse.checklistItems.find(orig => orig.title === item.title);
        if (matchingItem) {
          isCompleted = matchingItem.completed;
        }
      }
      return {
        id: `${uniqueId}-item-${index}`,
        title: item.title,
        completed: isCompleted,
        points: item.points,
        levelId: uniqueId,
        isCustom: true
      };
    });

    // Map quiz questions
    const quizQuestions: QuizQuestion[] = draftQuizzes.map((quiz, index) => ({
      id: `${uniqueId}-quiz-${index}`,
      levelId: uniqueId,
      question: quiz.question,
      options: quiz.options,
      correctAnswerIndex: quiz.correctIndex,
      explanation: quiz.explanation
    }));

    const finalCourse: CustomCourse = {
      id: uniqueId,
      title: courseTitle.trim(),
      description: description.trim(),
      category,
      difficulty,
      createdAt: editingCourse ? editingCourse.createdAt : new Date().toLocaleDateString(),
      checklistItems,
      quizQuestions
    };

    if (editingCourse && onUpdate) {
      onUpdate(finalCourse);
      setFeedbackMsg("Success! Custom Course updated inside browser database.");
    } else {
      onPublish(finalCourse);
      setFeedbackMsg("Success! Custom Course added inside browser database.");
    }
    
    // Clear states after small timeout and switch
    setTimeout(() => {
      setCourseTitle("");
      setDescription("");
      setDraftItems([]);
      setDraftQuizzes([]);
      setFeedbackMsg("");
      tabSwitcher("curriculum");
    }, 1500);
  };

  return (
    <div className="space-y-8" id="lms-course-builder">
      {/* Introduction Header */}
      <div>
        <h2 className="text-2xl font-sans font-bold text-neutral-900 tracking-tight">
          {editingCourse ? "Edit Custom Course" : "LMS Custom Course Builder"}
        </h2>
        <p className="text-sm text-neutral-500">
          {editingCourse 
            ? `Modify settings, checklist objectives, and test questions for "${editingCourse.title}".`
            : "Create client audit templates, assign criteria, and draft multiple-choice diagnostics modules instantly."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Creation Form Inputs */}
        <form onSubmit={handlePublishCourse} className="space-y-6 lg:col-span-2 bg-white border border-neutral-200 p-6 rounded-3xl shadow-xs">
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-neutral-900 text-base flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Layers size={18} className="text-neutral-500" />
              1. Basic Parameters
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-neutral-700">Course / Module Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="E.g. Enterprise SEO Audit - Core Stack Upgrade"
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent placeholder:text-neutral-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-neutral-700">Lesson Description &amp; Objectives</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the student will evaluate in this module, including high-level SEO, AEO, and GEO parameters."
                rows={3}
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent placeholder:text-neutral-400"
              />
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-neutral-700">Target Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-neutral-700">Category Tag</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                >
                  <option value="custom">General Custom Custom</option>
                  <option value="tech-foundations">Brand &amp; Tech Base</option>
                  <option value="architecture-semantic">IA &amp; Semantic SEO</option>
                  <option value="ai-search-nextgen">GEO, AEO &amp; AIO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Checklist Maker Sub-form */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h3 className="font-sans font-bold text-neutral-900 text-base flex items-center gap-2">
              <CheckSquare size={18} className="text-neutral-500" />
              2. Checklist Specifications
            </h3>

            {/* List draft items */}
            <div className="space-y-2">
              {draftItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-neutral-900 text-white rounded-md text-[10px] font-bold font-mono">
                      {index + 1}
                    </span>
                    <span className="text-xs text-neutral-800 truncate max-w-md font-sans font-bold">{item.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDraftItem(index)}
                    className="text-neutral-400 hover:text-red-500 transition-all ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Inputs for child checklist items */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add checklist audit requirement..."
                value={nestedTitle}
                onChange={(e) => setNestedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDraftItem();
                  }
                }}
                className="flex-1 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-800 placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={addDraftItem}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl border border-neutral-200 font-sans font-semibold transition-all"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Interactive Quiz Maker sub-form */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h3 className="font-sans font-bold text-neutral-900 text-base flex items-center gap-2">
              <Award size={18} className="text-neutral-500" />
              3. Interactive Diagnostics Quizzes (Optional)
            </h3>

            {/* List current draft quizzes */}
            {draftQuizzes.length > 0 && (
              <div className="space-y-2">
                {draftQuizzes.map((quiz, index) => (
                  <div key={index} className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-sans font-bold text-neutral-800">Q: {quiz.question}</p>
                      <p className="text-[10px] text-neutral-500 font-normal">Choices: {quiz.options.join(" | ")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDraftQuiz(index)}
                      className="text-neutral-400 hover:text-red-500 ml-2"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Inputs for quiz creation */}
            <div className="space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Question text..."
                  value={quizQuestionText}
                  onChange={(e) => setQuizQuestionText(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Choice A..."
                  value={quizOpt1}
                  onChange={(e) => setQuizOpt1(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Choice B..."
                  value={quizOpt2}
                  onChange={(e) => setQuizOpt2(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Choice C (Distractor)..."
                  value={quizOpt3}
                  onChange={(e) => setQuizOpt3(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans font-bold text-neutral-600 uppercase">Correct Answer key</label>
                  <select
                    value={quizCorrectIndex}
                    onChange={(e) => setQuizCorrectIndex(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-sans font-bold text-neutral-600 uppercase">Interactive Advice / Solution Text</label>
                  <input
                    type="text"
                    placeholder="Explanation for students..."
                    value={quizExplanation}
                    onChange={(e) => setQuizExplanation(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addDraftQuiz}
                className="w-full py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg text-[11px] font-bold font-sans transition-all"
              >
                + Append Quiz Question Definition
              </button>
            </div>
          </div>

          {/* Form Action submission */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
            {feedbackMsg ? (
              <p className={`text-xs font-mono font-bold ${feedbackMsg.includes("Success") ? "text-emerald-600" : "text-amber-600"}`}>
                {feedbackMsg}
              </p>
            ) : (
              <div>
                {editingCourse && onCancelEdit && (
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-sans font-semibold transition-all"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-md cursor-pointer hover:scale-[1.01]"
            >
              {editingCourse ? "Save Course Changes" : "Publish Custom Course Module"}
            </button>
          </div>
        </form>

        {/* Informative Preview Sandbox (The Side Guide) */}
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl shadow-md border border-neutral-700">
            <h3 className="font-sans font-bold text-base flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-amber-400" />
              LMS Blueprints
            </h3>
            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-normal">
              <p>
                By publishing, this software converts your structured forms into a fully integrated LMS study level.
              </p>
              <div className="space-y-1 border-t border-neutral-700 pt-3">
                <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Stores in secure browser localDB</p>
                <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Integrated inside progress tracking meters</p>
                <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Fully compatible with interactive quizzes</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
            <div className="flex gap-2 items-center text-neutral-800">
              <FileText size={18} className="text-neutral-600" />
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider">Live Course Preview</h4>
            </div>

            <div className="space-y-2 border-t border-neutral-200 pt-3">
              <p className="text-[10px] text-neutral-400 font-mono">DRAFT MODULE CONFIG</p>
              <p className="text-sm font-sans font-bold text-neutral-900">{courseTitle || "My Conceptual SEO Guide"}</p>
              <p className="text-xs text-neutral-600 line-clamp-3">{description || "Study outline goes here."}</p>
              <div className="flex gap-3 text-[10px] text-neutral-400 font-mono">
                <span>Items: {draftItems.length}</span>
                <span>Quizzes: {draftQuizzes.length}</span>
                <span>{difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
