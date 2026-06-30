/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Level, CustomCourse, ChecklistItem, LessonContent, LessonContentBlock, DynamicLesson } from "../types";
import { 
  ArrowLeft, CheckSquare, Square, Award, AlertTriangle, Lightbulb, 
  Sparkles, PlusCircle, CheckCircle, HelpCircle, BookOpen, Clock, Tag,
  ChevronDown, ChevronUp, Layers, Trophy, GraduationCap, Check, X,
  ChevronRight, Send, FileText, ListTodo
} from "lucide-react";
import {
  SEO_FUNDAMENTALS_LESSONS,
  SEO_FUNDAMENTALS_ASSESSMENT,
  SEO_FUNDAMENTALS_PRACTICALS,
  SEO_FUNDAMENTALS_MINI_PROJECT
} from "../data/seoLessons";
import { LessonPlayer } from "./LessonPlayer";
import { ModuleAssessment } from "./ModuleAssessment";
import { AuditChecklist } from "./AuditChecklist";

interface ModuleDetailsProps {
  level: Level | CustomCourse;
  completedItemIds: string[];
  onToggleItem: (itemId: string) => void;
  onBack: () => void;
  onAddCustomItem: (levelId: number | string, newItemTitle: string, newItemPoints: number) => void;
  onLaunchQuiz: (levelId: number | string) => void;
}

const renderDescriptionWithLinks = (text: string) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      let cleanUrl = part;
      let trailingPunctuation = "";
      const trailingMatch = part.match(/([),.;:]+)$/);
      if (trailingMatch) {
         cleanUrl = part.slice(0, -trailingMatch[1].length);
         trailingPunctuation = trailingMatch[1];
      }
      return (
        <React.Fragment key={index}>
          <a 
            href={cleanUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            referrerPolicy="no-referrer"
            className="text-emerald-700 hover:text-emerald-950 font-bold underline transition-colors inline-inline-flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {cleanUrl}
            <span className="text-[10px] no-underline">↗</span>
          </a>
          {trailingPunctuation}
        </React.Fragment>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const parseToLessonContent = (contentStr: string, quiz?: any): LessonContent => {
  const blocks: LessonContent = [];
  const lines = contentStr.split("\n");
  let currentTextBlockLines: string[] = [];

  const flushTextBlock = () => {
    if (currentTextBlockLines.length > 0) {
      const text = currentTextBlockLines.join("\n").trim();
      if (text) {
        blocks.push({
          type: "text",
          text: text
        });
      }
      currentTextBlockLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("> ")) {
      flushTextBlock();
      let calloutText = trimmed.replace(/^>\s*/, "");
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("> ")) {
        i++;
         calloutText += "\n" + lines[i].trim().replace(/^>\s*/, "");
      }
      blocks.push({
        type: "callout",
        calloutType: "info",
        text: calloutText
      });
    } else {
      currentTextBlockLines.push(line);
    }
  }

  flushTextBlock();

  if (quiz) {
    blocks.push({
      type: "quiz",
      quiz: {
        question: quiz.question,
        options: quiz.options,
        correctAnswerIndex: quiz.correctAnswerIndex,
        explanation: quiz.explanation
      }
    });
  }

  return blocks;
};

const getLessonsForModule = (lvl: Level | CustomCourse): DynamicLesson[] => {
  if (lvl.id === 1001) {
    return SEO_FUNDAMENTALS_LESSONS.map((lesson) => {
      return {
        id: lesson.id,
        number: lesson.number,
        title: lesson.title,
        goal: lesson.goal,
        content: parseToLessonContent(lesson.content, lesson.interactiveQuiz)
      };
    });
  }

  return lvl.checklistItems.map((item, idx) => {
    const lessonTitle = item.title;
    const lessonGoal = item.description || `Master and verify compliance for the checkpoint: ${item.title}.`;
    
    const content: LessonContent = [
      {
        type: "text",
        text: `### Understanding ${item.title}\n\nIn this lesson, we focus on auditing and verifying **${item.title}** to enhance organic keyword visibility and crawl efficiency.\n\nOptimizing this factor supports better indexing speed and ensures human-friendly structured presentation.`
      },
      {
        type: "callout",
        calloutType: "tip",
        text: `**Strategic Best Practice:** When evaluating **${item.title}**, always verify its production or staging behavior using real crawl tests and Google's recommended guidelines.`
      },
      {
        type: "quiz",
        quiz: {
          question: `What is the primary objective of verifying and auditing '${item.title}'?`,
          options: [
            "To align with search quality standards and improve user experience.",
            "To increase page layout latency.",
            "To hide the content from crawlers."
          ],
          correctAnswerIndex: 0,
          explanation: `Auditing and satisfying the requirements of '${item.title}' ensures proper search indexation and crawl safety.`
        }
      }
    ];

    return {
      id: item.id,
      number: idx + 1,
      title: lessonTitle,
      goal: lessonGoal,
      content: content
    };
  });
};

export default function ModuleDetails({
  level,
  completedItemIds,
  onToggleItem,
  onBack,
  onAddCustomItem,
  onLaunchQuiz
}: ModuleDetailsProps) {
  const [filterMode, setFilterMode] = useState<"all" | "todo" | "completed">("all");
  const [newChecklistTitle, setNewChecklistTitle] = useState("");
  const [newChecklistPoints] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Check if this is the Module 1: SEO Fundamentals level
  const isSeoFundamentals = level.id === 1001;

  const moduleLessons = getLessonsForModule(level);

  // Tab State
  const [activeSubTab, setActiveSubTab] = useState<"lessons" | "assessment" | "checklist">("lessons");

  // Lessons state
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quickQuizAnswers, setQuickQuizAnswers] = useState<Record<string, number>>({});
  const [quickQuizChecked, setQuickQuizChecked] = useState<Record<string, boolean>>({});

  // Cap activeLessonIdx when level changes
  useEffect(() => {
    if (activeLessonIdx >= moduleLessons.length) {
      setActiveLessonIdx(0);
    }
  }, [level.id, moduleLessons.length]);

  // Assessment state
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState<boolean>(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  // Practical activities state
  const [practicalSubmissions, setPracticalSubmissions] = useState<Record<string, string>>({});
  const [practicalSaved, setPracticalSaved] = useState<Record<string, boolean>>({});

  // Mini-project state
  const [projectSubmission, setProjectSubmission] = useState<string>("");
  const [projectSubmitted, setProjectSubmitted] = useState<boolean>(false);

  // Load state from localStorage on mount or when level changes
  useEffect(() => {
    // Completed Lessons
    const savedCompleted = localStorage.getItem(`lms_completed_lessons_${level.id}`);
    if (savedCompleted) {
      try { setCompletedLessons(JSON.parse(savedCompleted)); } catch (e) {}
    } else {
      setCompletedLessons([]);
    }

    // Active Lesson
    const savedActiveIdx = localStorage.getItem(`lms_active_lesson_idx_${level.id}`);
    if (savedActiveIdx) {
      setActiveLessonIdx(Number(savedActiveIdx));
    } else {
      setActiveLessonIdx(0);
    }

    // Quick quizzes
    const savedQuizAnswers = localStorage.getItem(`lms_quick_quiz_answers_${level.id}`);
    if (savedQuizAnswers) {
      try { setQuickQuizAnswers(JSON.parse(savedQuizAnswers)); } catch (e) {}
    } else {
      setQuickQuizAnswers({});
    }
    const savedQuizChecked = localStorage.getItem(`lms_quick_quiz_checked_${level.id}`);
    if (savedQuizChecked) {
      try { setQuickQuizChecked(JSON.parse(savedQuizChecked)); } catch (e) {}
    } else {
      setQuickQuizChecked({});
    }

    if (isSeoFundamentals) {
      // Final Assessment
      const savedAssessmentAnswers = localStorage.getItem("lms_assessment_answers_1001");
      if (savedAssessmentAnswers) {
        try { setAssessmentAnswers(JSON.parse(savedAssessmentAnswers)); } catch (e) {}
      } else {
        setAssessmentAnswers({});
      }
      const savedAssessmentSubmitted = localStorage.getItem("lms_assessment_submitted_1001");
      setAssessmentSubmitted(savedAssessmentSubmitted === "true");
      
      const savedAssessmentScore = localStorage.getItem("lms_assessment_score_1001");
      if (savedAssessmentScore) {
        setAssessmentScore(Number(savedAssessmentScore));
      } else {
        setAssessmentScore(null);
      }

      // Practicals
      const savedPracticals = localStorage.getItem("lms_practicals_submissions_1001");
      if (savedPracticals) {
        try { setPracticalSubmissions(JSON.parse(savedPracticals)); } catch (e) {}
      } else {
        setPracticalSubmissions({});
      }
      const savedPracticalsSaved = localStorage.getItem("lms_practicals_saved_1001");
      if (savedPracticalsSaved) {
        try { setPracticalSaved(JSON.parse(savedPracticalsSaved)); } catch (e) {}
      } else {
        setPracticalSaved({});
      }

      // Mini-Project
      const savedProjectSub = localStorage.getItem("lms_project_submission_1001");
      if (savedProjectSub) {
        setProjectSubmission(savedProjectSub);
      } else {
        setProjectSubmission("");
      }
      const savedProjectSubbed = localStorage.getItem("lms_project_submitted_1001");
      setProjectSubmitted(savedProjectSubbed === "true");
    }
  }, [level.id, isSeoFundamentals]);

  // Handle lesson navigation & saving
  const handleSelectLesson = (idx: number) => {
    setActiveLessonIdx(idx);
    localStorage.setItem(`lms_active_lesson_idx_${level.id}`, String(idx));
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons(prev => {
      const next = prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem(`lms_completed_lessons_${level.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleSelectQuickQuizAnswer = (lessonId: string, optIdx: number) => {
    if (quickQuizChecked[lessonId]) return; // locked once checked
    setQuickQuizAnswers(prev => {
      const next = { ...prev, [lessonId]: optIdx };
      localStorage.setItem(`lms_quick_quiz_answers_${level.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleCheckQuickQuiz = (lessonId: string) => {
    if (quickQuizAnswers[lessonId] === undefined) return;
    setQuickQuizChecked(prev => {
      const next = { ...prev, [lessonId]: true };
      localStorage.setItem(`lms_quick_quiz_checked_${level.id}`, JSON.stringify(next));
      return next;
    });
  };

  // Submit final assessment
  const handleSubmitAssessment = () => {
    let correct = 0;
    SEO_FUNDAMENTALS_ASSESSMENT.forEach(q => {
      if (assessmentAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    setAssessmentScore(correct);
    setAssessmentSubmitted(true);
    localStorage.setItem("lms_assessment_submitted_1001", "true");
    localStorage.setItem("lms_assessment_score_1001", String(correct));
  };

  const handleRetakeAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentSubmitted(false);
    setAssessmentScore(null);
    localStorage.removeItem("lms_assessment_answers_1001");
    localStorage.removeItem("lms_assessment_submitted_1001");
    localStorage.removeItem("lms_assessment_score_1001");
  };

  // Save practical work
  const handleSavePractical = (id: string, text: string) => {
    const nextSubmissions = { ...practicalSubmissions, [id]: text };
    setPracticalSubmissions(nextSubmissions);
    localStorage.setItem("lms_practicals_submissions_1001", JSON.stringify(nextSubmissions));

    const nextSaved = { ...practicalSaved, [id]: true };
    setPracticalSaved(nextSaved);
    localStorage.setItem("lms_practicals_saved_1001", JSON.stringify(nextSaved));
  };

  // Submit mini project
  const handleSubmitProject = () => {
    if (!projectSubmission.trim()) return;
    setProjectSubmitted(true);
    localStorage.setItem("lms_project_submitted_1001", "true");
    localStorage.setItem("lms_project_submission_1001", projectSubmission);
  };

  const handleResetProject = () => {
    setProjectSubmitted(false);
    localStorage.removeItem("lms_project_submitted_1001");
  };

  const toggleExpand = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents marking the checkbox as completed when toggled!
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getImplementationSteps = (item: ChecklistItem) => {
    const title = item.title;
    const desc = item.description || "";
    const titleLower = title.toLowerCase();
    const descLower = desc.toLowerCase();

    // Custom Level 14: AEO & Answer Optimization Mapping
    if (titleLower.includes("definition optimization (basic)")) {
      return {
        category: "Featured Snippet Definition Optimization",
        steps: [
          "Format an exact, concise, and objective standard definition box of 40-60 words directly beneath your main query headline component.",
          "Ensure that the paragraph begins immediately with a direct answer or definition statement, strictly omitting promotional pronouns or unnecessary throat-clearing phrasing.",
          "Verify the resulting paragraph block structures pre-render on static HTML servers so that crawlers can target and pull definitions cleanly."
        ],
        tools: ["Chrome Developer Console", "Google SERP Simulator", "Screaming Frog custom tag extractor"],
        engines: ["Google Featured Snippets Indexer", "Bing Instant Reply Hubs"]
      };
    }
    if (titleLower.includes("definition optimization (advanced)")) {
      return {
        category: "Multi-Tiered Explanation Optimization",
        steps: [
          "Author multiple targeted definition variations covering basic-friendly definitions, expert level explanations, and industry standard glossaries.",
          "Design a dedicated in-page glossary module marked up with HTML `<dfn>` tags to explicitly anchor core vocabulary terms.",
          "Embed deep JSON-LD metadata schema linking terms directly to global entities via official Wikidata and Wikipedia URI reference pointers."
        ],
        tools: ["InLinks Schema Entity Map Tool", "Wikidata Query Service", "JSON-LD Playground"],
        engines: ["Semantic Web Crawlers", "ChatGPT Advanced Model Indexers", "Gemini Deep Research Agent"]
      };
    }
    if (titleLower.includes("question optimization (basic)")) {
      return {
        category: "Conversational Query Headers",
        steps: [
          "Structure key section headings using clean, descriptive H2/H3 elements starting directly with query roots like 'What Is', 'Why', 'How', 'When', 'Where', 'Who'.",
          "Ensure that header strings precisely match high-volume organic key phrases without trailing punctuation.",
          "Verify structural flow inside your document's semantic hierarchy, checking that heading tags nest consecutively from H1 to H3."
        ],
        tools: ["Google Keyword Planner", "Semrush Keyword Magic Tool", "Screaming Frog Linter"],
        engines: ["Google Mobile Search Indexer", "Bing Web Crawler"]
      };
    }
    if (titleLower.includes("question optimization (advanced)")) {
      return {
        category: "Conversational Intent Coverage",
        steps: [
          "Audit real-time regional People Also Ask (PAA) boxes, related search parameters, voice search inputs, and typical AI prompt questions.",
          "Draft dedicated support paragraph elements directly handling secondary conversational follow-up questions, customer objections, and voice search phrases.",
          "Map the content layout format logically to address sequential exploration pathways of modern chatbot query sessions."
        ],
        tools: ["AlsoAsked.com", "AnswerThePublic Engine", "ChatGPT Search Pro Simulator"],
        engines: ["ChatGPT Desktop Search", "Perplexity Copilot Mapping", "Gemini Conversational Core"]
      };
    }
    if (titleLower.includes("snippet optimization (basic)")) {
      return {
        category: "Immediate Snippet Targeting",
        steps: [
          "Deliver the primary direct answer immediately underneath the H2/H3 question header with zero middle visual items or paragraph blocks.",
          "Review the first paragraph block to prune unnecessary brand adjective filler words and generic throat-clearing phrases.",
          "Test readability score milestones on the raw text blocks, ensuring they align perfectly with average conversational levels."
        ],
        tools: ["Hemingway readability processor", "Yoast SEO Content Checker", "Lighthouse SEO Audit"],
        engines: ["Google Featured Snippets Core", "Bing Instant Answers Engine"]
      };
    }
    if (titleLower.includes("snippet optimization (advanced)")) {
      return {
        category: "Dynamic Snippet Styling",
        steps: [
          "Integrate clean tabbed views or flexible toggles that present bulleted vs table structures dynamically.",
          "Incorporate microdata class tags highlighting step-by-step instructions or ingredient tables.",
          "Check structural outlines to prevent hidden text violations or search classification penalties."
        ],
        tools: ["Google Rich Results Testing Suite", "W3C Document Parser", "Screaming Frog XML Auditor"],
        engines: ["Google Rich Snippets Subsystem", "Perplexity Instant UI cards"]
      };
    }
    if (titleLower.includes("table optimization (basic)")) {
      return {
        category: "Structured Table Layouts",
        steps: [
          "Convert raw image checklists or graphical compare lists into native, search-crawling HTML `<table>` blocks.",
          "Incorporate brief column title strings so that query compilers understand context indexes easily.",
          "Verify table layouts adjust responsibly down to phone screens without side cutoffs."
        ],
        tools: ["Lighthouse CSS Inspector", "W3C Mobile-Friendly Test Bench", "Semrush Content Grader"],
        engines: ["Google Table Rich Snippets", "Bing Instant Answer Panelists"]
      };
    }
    if (titleLower.includes("table optimization (advanced)")) {
      return {
        category: "Dynamic Interactive Tables",
        steps: [
          "Build multi-column spreadsheet nodes containing full search-filtering capabilities for custom fields.",
          "Add structured schema attributes like `tableHeader` or schema metadata describing tabular statistics.",
          "Apply static markup fallback tags so crawlers receive direct raw values regardless of JS runtimes."
        ],
        tools: ["JSON-LD Schema Creator", "Google Structured Data Linter", "Chrome Page Source Inspector"],
        engines: ["Gemini Semantic Table Reader", "ChatGPT Advanced Document Ingestion"]
      };
    }
    if (titleLower.includes("list optimization (basic)")) {
      return {
        category: "Clean Bulleted Structures",
        steps: [
          "Construct descriptive instruction points using clean list structures (`<ul>`, `<ol>`) rather than plain line break spacing.",
          "Verify that the introduction sentence preceding lists states clear step-by-step instructions.",
          "Keep total bullet elements under 8 items to fit comfortably into mobile visual widgets."
        ],
        tools: ["Semrush Content Quality Panel", "Yoast Readability Bench", "W3C HTML Linter"],
        engines: ["Google Bullet List Snippets", "DuckDuckGo Direct Guides"]
      };
    }
    if (titleLower.includes("list optimization (advanced)")) {
      return {
        category: "Nested Process Mapping",
        steps: [
          "Structure complex procedures using cascading ordered lists alongside deep H3 micro-headers.",
          "Embed specific image media nodes alongside each process checkpoint, using descriptive ALT strings.",
          "Apply exact item list JSON-LD schema referencing the direct sequential steps to search indexes."
        ],
        tools: ["Google Rich Results Tester", "InLinks Schema Builder", "Schema.org Validator"],
        engines: ["Google HowTo Rich Results", "Siri Step Guides", "Gemini Process Ingestion"]
      };
    }
    if (titleLower.includes("conversational tone (basic)")) {
      return {
        category: "Authentic Copywriting",
        steps: [
          "Author informational sections matching real queries, writing with clear, simple vocabulary.",
          "Prune corporate throat-clearing fluff and empty buzzwords to make sentences direct.",
          "Test paragraph lengths to ensure quick, mobile-friendly visual scanning."
        ],
        tools: ["Flesch-Kincaid Grade level analyzer", "Grammarly Editor", "Hemingway App"],
        engines: ["Google Helpful Content Quality System", "Safari Reader Mode Core"]
      };
    }
    if (titleLower.includes("conversational tone (advanced)")) {
      return {
        category: "Semantic Sentiment Alignment",
        steps: [
          "Align copywriting to model-preferred linguistic schemas, answering searcher intents inside the first 200 words.",
          "Structure standard conversational dialogue frameworks (Q&A blocks) designed to optimize voice search.",
          "Incorporate real customer testimonial quotes and peer-verified statements to satisfy trust requirements."
        ],
        tools: ["Clearscope SEO Optimizer", "SurferSEO Content Analyzer", "MarketMuse Semantic Map"],
        engines: ["Google E-E-A-T Quality Assessors", "Gemini Semantic Search Indexer"]
      };
    }

    // Default checklist fallback category logic
    return {
      category: titleLower.includes("keyword") 
        ? "On-Page Keyword Strategy" 
        : titleLower.includes("meta") || titleLower.includes("title") 
        ? "Metadata Optimization" 
        : titleLower.includes("alt") || titleLower.includes("image") 
        ? "Image Schema Audit" 
        : titleLower.includes("link") 
        ? "Internal Link Architecture" 
        : titleLower.includes("sitemap") 
        ? "XML Indexing Configuration" 
        : titleLower.includes("speed") || titleLower.includes("core web") || titleLower.includes("lcp") 
        ? "Core Web Vitals Engineering" 
        : titleLower.includes("schema") || titleLower.includes("structured") || titleLower.includes("json-ld") 
        ? "Structured Markup Engineering" 
        : titleLower.includes("robots") 
        ? "Exclusion Directives Audit" 
        : titleLower.includes("canonical") 
        ? "Canonicalization Controls" 
        : "Standard Search Audit compliance",
      steps: [
        `Locate all occurrences of this parameter across page templates or CMS routes.`,
        `Verify behavior meets current production standards and mobile UX viewport rules.`,
        `Run verification scripts to confirm there are no blockages preventing engine crawlers from reading values.`
      ],
      tools: [
        titleLower.includes("speed") || titleLower.includes("core web") 
          ? "Google PageSpeed Insights" 
          : titleLower.includes("schema") || titleLower.includes("markup") 
          ? "Google Rich Results Tester" 
          : "Screaming Frog SEO Spider",
        "Chrome Developer Performance Console",
        "Ahrefs Site Diagnostics"
      ],
      engines: [
        "Google Core Search Algorithm",
        "Bing Desktop & Mobile Indexers",
        titleLower.includes("ai") || titleLower.includes("conversational") || titleLower.includes("prompt")
          ? "Perplexity Citation Search"
          : "Generative Search Engine Indexes"
      ]
    };
  };

  const isCustomCourse = typeof level.id === "string";

  // Safeguard fields that are custom vs standard
  const businessImpact = "businessImpact" in level ? level.businessImpact : "Directly customizes search indexing configurations.";
  const bestPractice = "bestPractice" in level ? level.bestPractice : "Review items methodically against your target staging and live environment properties.";
  const details = "details" in level ? level.details : "This custom-created checklist module lets you evaluate particular specialized audit structures or clients.";
  const difficulty = "difficulty" in level ? level.difficulty : "Intermediate";
  const estimatedMinutes = "estimatedMinutes" in level ? level.estimatedMinutes : 20;

  // Filter items
  const filteredItems = level.checklistItems.filter(item => {
    const isCompleted = completedItemIds.includes(item.id);
    if (filterMode === "todo") return !isCompleted;
    if (filterMode === "completed") return isCompleted;
    return true;
  });

  const completedCount = level.checklistItems.filter(item => completedItemIds.includes(item.id)).length;
  const totalCount = level.checklistItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistTitle.trim()) {
      setErrorMessage("Enter a valid checkpoint description.");
      return;
    }
    onAddCustomItem(level.id, newChecklistTitle.trim(), newChecklistPoints);
    setNewChecklistTitle("");
    setErrorMessage("");
  };

  const renderLessonContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;
      
      // Headers
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-base font-sans font-extrabold text-neutral-900 mt-5 mb-2.5 tracking-tight flex items-center gap-1.5 border-b border-neutral-100 pb-1">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={idx} className="text-sm font-sans font-bold text-neutral-800 mt-4 mb-2 tracking-tight">
            {trimmed.replace("#### ", "")}
          </h4>
        );
      }
      
      // Horizontal rule
      if (trimmed === "---") {
        return <hr key={idx} className="my-6 border-neutral-200" />;
      }
      
      // Blockquote or important note
      if (trimmed.startsWith("> ")) {
        return (
          <div key={idx} className="my-4 p-4 bg-indigo-50/55 border-l-4 border-indigo-500 rounded-r-xl text-neutral-800 italic text-xs leading-relaxed font-sans font-medium animate-fade-in">
            {trimmed.replace("> ", "").replace(/\*\*/g, "")}
          </div>
        );
      }
      
      // Bullets
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        let content = trimmed.substring(2);
        // check for bold markers
        content = content.replace(/\*\*/g, "");
        return (
          <li key={idx} className="ml-5 text-xs text-neutral-700 font-sans font-medium leading-relaxed list-disc my-1.5">
            {content}
          </li>
        );
      }
      if (trimmed.startsWith("✔ ")) {
        return (
          <div key={idx} className="flex items-center gap-2 text-xs font-sans font-semibold text-emerald-700 my-1 pl-1">
            <span className="text-emerald-500 font-bold">✔</span>
            <span>{trimmed.replace("✔ ", "")}</span>
          </div>
        );
      }
      if (trimmed.startsWith("❌ ")) {
        return (
          <div key={idx} className="flex items-center gap-2 text-xs font-sans font-semibold text-rose-700 my-1 pl-1">
            <span className="text-rose-500 font-bold">❌</span>
            <span>{trimmed.replace("❌ ", "")}</span>
          </div>
        );
      }
      
      // General paragraph with bold replacements
      const parts = trimmed.split(/\*\*([^*]+)\*\*/g);
      if (parts.length > 1) {
        return (
          <p key={idx} className="text-xs text-neutral-700 leading-relaxed font-sans font-medium my-2">
            {parts.map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="font-extrabold text-neutral-950">{part}</strong> : part)}
          </p>
        );
      }
      
      return (
        <p key={idx} className="text-xs text-neutral-700 leading-relaxed font-sans font-medium my-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 animate-fade-in" id={`level-details-${level.id}`}>
      {/* Back navigation & Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-lg border border-neutral-200"
        >
          <ArrowLeft size={14} />
          <span>Back to Syllabus</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Quiz Shortcut */}
          <button
            onClick={() => onLaunchQuiz(level.id)}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-sans font-semibold transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
          >
            <HelpCircle size={14} />
            <span>Launch Diagnostics Quiz</span>
          </button>
        </div>
      </div>

      {/* --- HIGH IMPACT LMS COURSE WORKSPACE --- */}
      <div className="space-y-6" id="lms-course-workspace">
        {/* LMS Hero Header */}
        <div className="p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white border border-neutral-800 rounded-3xl shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-indigo-500 text-white rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                  LMS Active Course
                </span>
                <span className="px-2 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-md text-[10px] font-mono font-bold">
                  {moduleLessons.length} Lessons
                </span>
                <span className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                  <Clock size={11} className="text-neutral-400" />
                  {estimatedMinutes} Mins Study
                </span>
                <span className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                  <Tag size={11} className="text-neutral-400" />
                  {totalCount} Requirements
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-sans font-extrabold tracking-tight leading-tight text-white flex items-center gap-2">
                <GraduationCap className="text-indigo-400" size={24} />
                {level.title}
              </h2>
              <p className="text-xs text-neutral-400 max-w-2xl font-sans">
                {level.description}
              </p>
            </div>

            {/* Progress Panel */}
            <div className="flex items-center gap-3 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 self-start md:self-auto">
              <div className="text-right">
                <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">MODULE COMPLETED</p>
                <p className="text-base font-sans font-bold text-white">
                  {completedLessons.length} / {moduleLessons.length} Lessons ({moduleLessons.length > 0 ? Math.round((completedLessons.length / moduleLessons.length) * 100) : 0}%)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-neutral-800 flex items-center justify-center relative overflow-hidden shrink-0">
                <div 
                  className="absolute inset-0 bg-indigo-600 transition-all origin-center"
                  style={{ height: `${moduleLessons.length > 0 ? (completedLessons.length / moduleLessons.length) * 105 : 0}%`, bottom: 0, position: 'absolute' }}
                ></div>
                <span className="text-xs font-mono font-bold text-white z-10">{moduleLessons.length > 0 ? Math.round((completedLessons.length / moduleLessons.length) * 100) : 0}%</span>
              </div>
            </div>
          </div>

          {/* LMS Navigation Sub-Tabs */}
          <div className="flex border-t border-neutral-800 pt-4 flex-wrap gap-2" id="lms-sub-tabs-bar">
            <button
              id="tab-btn-lessons"
              onClick={() => setActiveSubTab("lessons")}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === "lessons"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
              }`}
            >
              <BookOpen size={14} />
              <span>📚 {moduleLessons.length} Bite-Sized Lessons</span>
            </button>

            {isSeoFundamentals && (
              <button
                id="tab-btn-assessment"
                onClick={() => setActiveSubTab("assessment")}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeSubTab === "assessment"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                }`}
              >
                <Trophy size={14} />
                <span>🏆 Final Assessment &amp; Projects</span>
                {assessmentSubmitted && (
                  <span className="px-1.5 py-0.2 bg-emerald-50/50 text-emerald-300 text-[9px] rounded font-mono font-bold">Passed</span>
                )}
              </button>
            )}

            <button
              id="tab-btn-checklist"
              onClick={() => setActiveSubTab("checklist")}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === "checklist"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
              }`}
            >
              <ListTodo size={14} />
              <span>✅ Audit Verification Checklist ({totalCount})</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT: BITE-SIZED LESSON PLAYER */}
        {activeSubTab === "lessons" && (
          <LessonPlayer
            moduleLessons={moduleLessons}
            activeLessonIdx={activeLessonIdx}
            handleSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
            toggleLessonCompleted={toggleLessonCompleted}
            quickQuizAnswers={quickQuizAnswers}
            handleSelectQuickQuizAnswer={handleSelectQuickQuizAnswer}
            quickQuizChecked={quickQuizChecked}
            handleCheckQuickQuiz={handleCheckQuickQuiz}
            renderLessonContent={renderLessonContent}
            renderDescriptionWithLinks={renderDescriptionWithLinks}
          />
        )}

        {/* TAB CONTENT: COMPREHENSIVE ASSESSMENT & PROJECTS */}
        {activeSubTab === "assessment" && isSeoFundamentals && (
          <ModuleAssessment
            assessmentSubmitted={assessmentSubmitted}
            assessmentScore={assessmentScore}
            assessmentAnswers={assessmentAnswers}
            setAssessmentAnswers={setAssessmentAnswers}
            handleSubmitAssessment={handleSubmitAssessment}
            handleRetakeAssessment={handleRetakeAssessment}
            practicalSubmissions={practicalSubmissions}
            setPracticalSubmissions={setPracticalSubmissions}
            practicalSaved={practicalSaved}
            setPracticalSaved={setPracticalSaved}
            handleSavePractical={handleSavePractical}
            projectSubmission={projectSubmission}
            setProjectSubmission={setProjectSubmission}
            projectSubmitted={projectSubmitted}
            handleSubmitProject={handleSubmitProject}
            handleResetProject={handleResetProject}
          />
        )}

        {/* TAB CONTENT: INTERACTIVE AUDIT CHECKLIST */}
        {activeSubTab === "checklist" && (
          <AuditChecklist
            businessImpact={businessImpact}
            bestPractice={bestPractice}
            filteredItems={filteredItems}
            completedItemIds={completedItemIds}
            onToggleItem={onToggleItem}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            getImplementationSteps={getImplementationSteps}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            handleCreateChecklistItem={handleCreateChecklistItem}
            newChecklistTitle={newChecklistTitle}
            setNewChecklistTitle={setNewChecklistTitle}
            errorMessage={errorMessage}
            renderDescriptionWithLinks={renderDescriptionWithLinks}
          />
        )}
      </div>
    </div>
  );
}
