/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChecklistItem {
  id: string; // unique key (e.g. level-id-item-title-slug)
  title: string;
  description?: string;
  completed: boolean;
  points: number;
  levelId: number | string; // levels can be custom strings
  isCustom?: boolean;
}

export interface Level {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedMinutes: number;
  checklistItems: ChecklistItem[];
  details: string;
  businessImpact: string;
  bestPractice: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  colorClass: string;
  textColorClass: string;
  levelIds: number[];
}

export interface QuizQuestion {
  id: string;
  levelId: number | string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CustomCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  createdAt: string;
  checklistItems: ChecklistItem[];
  quizQuestions: QuizQuestion[];
}

export interface MasteryAward {
  id: string; // e.g. "level-1" or "custom-xyz"
  title: string;
  category: string;
  completedAt: string; // timestamp when completed
}

export interface UserProgress {
  theme: "light" | "dark";
  completedItemIds: string[]; // checklist item IDs that have been completed
  quizScores: Record<string, number>; // key: levelId or customCourseId, value: best percentage score
  customCourses: CustomCourse[];
  selectedTrackId: string; // filter ID
  selectedLevelId: number | string | null;
  currentStreak: number;
  lastActivityDate: string | null;
  awards?: MasteryAward[];
}

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  organization: string;
  website?: string;
  interest: "team-training" | "aeo-audit" | "seo-strategy" | "custom-project" | "other" | string;
  message: string;
  status: "New" | "In Discussion" | "Proposal Sent" | "Scheduled" | "Completed" | "Nurturing";
  createdAt: string;
  notes?: string;
  userProfile?: "student" | "beginner" | "professional" | "corporate";
  serviceType?: "training" | "consulting" | "services";
}

export interface LessonContentBlock {
  type: "text" | "callout" | "quiz";
  text?: string;
  calloutType?: "info" | "warning" | "success" | "tip" | string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
}

export type LessonContent = LessonContentBlock[];

export interface DynamicLesson {
  id: string;
  number: number;
  title: string;
  goal: string;
  content: LessonContent;
}

