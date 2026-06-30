import { Level, Track } from "../types";
import { SEO_COURSE_LEVELS, SEO_COURSE_TRACK } from "./seoCourseData";
import { INITIAL_TRACKS, MASTER_LEVELS } from "./checklist";

export interface LMSCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "All Levels";
  estimatedHours: number;
  colorTheme: "slate" | "emerald" | "blue" | "purple" | "cyan" | "orange" | "violet" | "amber" | "rose" | "indigo" | "teal" | "sky";
  trackIds: string[];
  levelIds: number[];
}

export const LMS_COURSES: LMSCourse[] = [
  {
    id: "complete-seo-2026",
    title: "Complete SEO Course (2026 Edition)",
    subtitle: "Flagship 25-Module Masterclass",
    description: "The absolute gold-standard training program for search marketing. Progresses step-by-step from beginner SEO fundamentals through technical optimizations, Schema structured data, advanced SXO, GEO (Generative Engine Optimization), AEO, and AI-driven automation workflows.",
    difficulty: "All Levels",
    estimatedHours: 24,
    colorTheme: "indigo",
    trackIds: ["seo-course"],
    levelIds: SEO_COURSE_LEVELS.map(l => l.id)
  },
  {
    id: "technical-seo-schema",
    title: "Advanced Technical SEO & Schema Engineering",
    subtitle: "For Developers & Tech Marketers",
    description: "Unlock deep crawler diagnostics, advanced sitemap routing, robust index coverage checking, international SEO configurations, structured JSON-LD schemas, and advanced Google Search Console parsing pipelines.",
    difficulty: "Advanced",
    estimatedHours: 12,
    colorTheme: "emerald",
    trackIds: ["tech-eng", "semantic-markup", "gsc-complete"],
    levelIds: [3, 23, 35, 6, 9, 32, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220]
  },
  {
    id: "wordpress-local-seo",
    title: "WordPress & Local SEO Optimization Guide",
    subtitle: "Complete Storefront & Small Business Blueprint",
    description: "Solidify physical storefront visibility, configure category architectures, optimize local review profiles, claim local map pins, and implement the complete 20-part WordPress speed, security, and schema protocol.",
    difficulty: "Beginner",
    estimatedHours: 8,
    colorTheme: "sky",
    trackIds: ["wordpress", "gbp", "fundamentals"],
    levelIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 401, 402, 403, 404, 405, 1, 2]
  },
  {
    id: "analytics-search-console",
    title: "Google Analytics 4 & Search Console Mastery",
    subtitle: "Data-Driven Marketing & Reporting",
    description: "Master enterprise-grade GA4 pipelines, custom exploration reports, traffic segmentation, conversion funnels, and Search Console indices to track organic keywords, crawling logs, and calculate real organic search ROI.",
    difficulty: "Intermediate",
    estimatedHours: 10,
    colorTheme: "orange",
    trackIds: ["ga4", "gsc-complete"],
    levelIds: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220]
  }
];

// Helper to consolidate all tracks (combining initial tracks with our new SEO Course track)
export const getAllTracks = (): Track[] => {
  return [SEO_COURSE_TRACK, ...INITIAL_TRACKS];
};

// Helper to consolidate all levels (combining standard levels with our new SEO Course levels)
export const getAllLevels = (): Level[] => {
  return [...SEO_COURSE_LEVELS, ...MASTER_LEVELS];
};
