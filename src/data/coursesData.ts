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

export interface SyllabusTier {
  id: string;
  tierNumber: number;
  title: string;
  shortTitle: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  targetAudience: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  colorTheme: string;
  trackIds: string[];
}

export interface RoadmapStep {
  stepNumber: number;
  tierId: string;
  title: string;
  subtitle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedMinutes: number;
  trackId: string;
  trackName: string;
  levelIds: number[];
  keyOutcomes: string[];
  milestoneBadge: string;
}

export const SYLLABUS_TIERS: SyllabusTier[] = [
  {
    id: "tier-1-foundations",
    tierNumber: 1,
    title: "Tier 1: Foundations & Brand Baseline",
    shortTitle: "1. Foundations",
    badge: "Beginner",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    description: "Build fundamental understanding of search engine crawling, indexation, entity branding, local Google Business Profile setup, and CMS optimization.",
    targetAudience: "Beginners, small business owners, and content marketers entering organic search.",
    difficulty: "Beginner",
    colorTheme: "emerald",
    trackIds: ["seo-course", "fundamentals", "gbp", "wordpress"]
  },
  {
    id: "tier-2-content-semantics",
    tierNumber: 2,
    title: "Tier 2: Content, Silos & Semantic Architecture",
    shortTitle: "2. Content & Silos",
    badge: "Intermediate",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    description: "Construct authoritative topic clusters, structured schema markup (JSON-LD), internal link silos, and high-converting on-page content structures.",
    targetAudience: "Content strategists, copywriters, and SEO practitioners scaling organic traffic.",
    difficulty: "Intermediate",
    colorTheme: "blue",
    trackIds: ["content-strategy", "entity-graphs", "semantic-markup", "niche-verticals"]
  },
  {
    id: "tier-3-technical-gsc",
    tierNumber: 3,
    title: "Tier 3: Technical SEO & Search Console Engineering",
    shortTitle: "3. Technical & GSC",
    badge: "Advanced",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    description: "Audit crawl budgets, resolve server-side errors, optimize Core Web Vitals (INP, LCP, CLS), and master the 20-part Google Search Console diagnostic protocol.",
    targetAudience: "Technical SEOs, web developers, and engineers managing large-scale websites.",
    difficulty: "Advanced",
    colorTheme: "amber",
    trackIds: ["tech-eng", "gsc-complete"]
  },
  {
    id: "tier-4-analytics-cro",
    tierNumber: 4,
    title: "Tier 4: Analytics, Attribution & Conversion Optimization",
    shortTitle: "4. Analytics & CRO",
    badge: "Advanced",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-800",
    description: "Deploy enterprise GA4 measurement pipelines, evaluate organic search ROI, manage digital PR campaigns, and conduct A/B testing on high-intent landing pages.",
    targetAudience: "Growth marketers, analytics specialists, and marketing directors.",
    difficulty: "Advanced",
    colorTheme: "orange",
    trackIds: ["ga4", "authority-conversion"]
  },
  {
    id: "tier-5-ai-geo-sxo",
    tierNumber: 5,
    title: "Tier 5: Next-Gen AI Search, GEO & SXO Mastery",
    shortTitle: "5. AI, GEO & SXO",
    badge: "Expert",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    description: "Optimize for Generative AI engines (ChatGPT, Gemini, Perplexity), secure featured answers (AEO), and master Search Everywhere Optimization (SXO).",
    targetAudience: "Senior SEO consultants, AI strategists, and agency leaders building future-proof search operations.",
    difficulty: "Expert",
    colorTheme: "purple",
    trackIds: ["geo", "aeo", "sxo"]
  }
];

export const LEARNING_ROADMAP_STEPS: RoadmapStep[] = [
  {
    stepNumber: 1,
    tierId: "tier-1-foundations",
    title: "SEO Foundations & Search Mechanics",
    subtitle: "How crawlers, indexing pipelines, and ranking algorithms function",
    difficulty: "Beginner",
    estimatedMinutes: 60,
    trackId: "seo-course",
    trackName: "Complete SEO Course",
    levelIds: [1001, 1002],
    keyOutcomes: [
      "Understand crawling, rendering, indexing, and ranking stages",
      "Identify 4 search intents: Informational, Navigational, Commercial, Transactional",
      "Discover high-converting long-tail keyword opportunities"
    ],
    milestoneBadge: "🌱 Search Initiate"
  },
  {
    stepNumber: 2,
    tierId: "tier-1-foundations",
    title: "Brand Baseline & Security Protocols",
    subtitle: "HTTPS, NAP parity, legal trust disclosures, and Web Vitals",
    difficulty: "Beginner",
    estimatedMinutes: 75,
    trackId: "fundamentals",
    trackName: "Core Fundamentals & Brand Baseline",
    levelIds: [1, 2],
    keyOutcomes: [
      "Verify SSL/TLS, security headers, and domain trust footprint",
      "Enforce exact NAP (Name, Address, Phone) consistency across the web",
      "Optimize baseline TTFB and Core Web Vitals speed scores"
    ],
    milestoneBadge: "🛡️ Brand Guardian"
  },
  {
    stepNumber: 3,
    tierId: "tier-1-foundations",
    title: "Local SEO & Google Business Profile (GBP)",
    subtitle: "Dominate Google Maps, local 3-pack, and local review profiles",
    difficulty: "Beginner",
    estimatedMinutes: 90,
    trackId: "gbp",
    trackName: "Google Business Profile Optimization",
    levelIds: [401, 402, 403, 404, 405],
    keyOutcomes: [
      "Claim and verify Google Business Profile with optimal primary categories",
      "Structure high-converting local service menus and product catalogs",
      "Establish automated review generation systems with keyword-rich reviews"
    ],
    milestoneBadge: "📍 Local Champion"
  },
  {
    stepNumber: 4,
    tierId: "tier-1-foundations",
    title: "WordPress SEO & Speed Protocol",
    subtitle: "Full 20-part WordPress optimization for caching, speed, and schema",
    difficulty: "Beginner",
    estimatedMinutes: 120,
    trackId: "wordpress",
    trackName: "WordPress Optimization Checklist",
    levelIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
    keyOutcomes: [
      "Configure modern permalink architecture and database caching",
      "Implement image compression (WebP/AVIF) and script minification",
      "Deploy essential SEO plugins and robots/sitemap integrations"
    ],
    milestoneBadge: "⚙️ WordPress Craftsman"
  },
  {
    stepNumber: 5,
    tierId: "tier-2-content-semantics",
    title: "On-Page Strategy & E-E-A-T Content",
    subtitle: "Topic clusters, semantic keyword optimization, and author credibility",
    difficulty: "Intermediate",
    estimatedMinutes: 120,
    trackId: "content-strategy",
    trackName: "Content Strategy & On-Page Mastery",
    levelIds: [5, 10, 11, 12, 27, 33],
    keyOutcomes: [
      "Write high-ranking pillar articles with semantic topic clusters",
      "Incorporate original research, expert quotes, and E-E-A-T trust signals",
      "Optimize heading hierarchy, internal links, and conversational FAQs"
    ],
    milestoneBadge: "✍️ Content Strategist"
  },
  {
    stepNumber: 6,
    tierId: "tier-2-content-semantics",
    title: "Information Architecture & Entity Graphs",
    subtitle: "Hub-and-spoke models, silo structures, and knowledge graphs",
    difficulty: "Intermediate",
    estimatedMinutes: 90,
    trackId: "entity-graphs",
    trackName: "IA, Silos & Entity Graphs",
    levelIds: [4, 7, 8, 16],
    keyOutcomes: [
      "Design flat site hierarchy with less than 3 clicks to money pages",
      "Connect brand entities to Wikidata, Wikipedia, and Google Knowledge Graph",
      "Implement strict thematic silos to prevent internal link dilution"
    ],
    milestoneBadge: "🕸️ Entity Architect"
  },
  {
    stepNumber: 7,
    tierId: "tier-2-content-semantics",
    title: "Structured Data & Semantic Schema",
    subtitle: "JSON-LD markup for Articles, Products, Organizations, and FAQs",
    difficulty: "Intermediate",
    estimatedMinutes: 80,
    trackId: "semantic-markup",
    trackName: "Structured Data & Semantic Markup",
    levelIds: [6, 9, 32],
    keyOutcomes: [
      "Author error-free JSON-LD schema for rich search results",
      "Implement nested schema connecting author, publisher, and main entity",
      "Validate rich snippets with Google Rich Results Test"
    ],
    milestoneBadge: "🏷️ Schema Engineer"
  },
  {
    stepNumber: 8,
    tierId: "tier-2-content-semantics",
    title: "E-Commerce & Vertical Search Mastery",
    subtitle: "Product catalogs, facet filtering, reviews, and video optimization",
    difficulty: "Intermediate",
    estimatedMinutes: 90,
    trackId: "niche-verticals",
    trackName: "Local, E-commerce & Media Verticals",
    levelIds: [21, 22, 24, 25],
    keyOutcomes: [
      "Manage faceted navigation and canonicalize duplicate product variations",
      "Optimize product schema with real-time pricing and stock availability",
      "Rank images and video thumbnails in Google Visual Search"
    ],
    milestoneBadge: "🏬 Vertical Specialist"
  },
  {
    stepNumber: 9,
    tierId: "tier-3-technical-gsc",
    title: "Technical SEO & Crawl Diagnostics",
    subtitle: "Crawl budget management, server logs, robots.txt, and render pipelines",
    difficulty: "Advanced",
    estimatedMinutes: 120,
    trackId: "tech-eng",
    trackName: "Technical SEO Engineering",
    levelIds: [3, 23, 35],
    keyOutcomes: [
      "Perform server access log analysis to trace bot crawling efficiency",
      "Resolve complex redirect chains, orphan pages, and soft 404 errors",
      "Implement international Hreflang annotations across multi-region domains"
    ],
    milestoneBadge: "🔧 Tech Specialist"
  },
  {
    stepNumber: 10,
    tierId: "tier-3-technical-gsc",
    title: "Google Search Console Complete Protocol",
    subtitle: "20-part inspection covering Index Coverage, Core Web Vitals, and Removals",
    difficulty: "Advanced",
    estimatedMinutes: 150,
    trackId: "gsc-complete",
    trackName: "Google Search Console Complete Checklist",
    levelIds: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220],
    keyOutcomes: [
      "Audit 100% indexing parity across all money URLs",
      "Diagnose INP, LCP, and CLS field regressions in Search Console",
      "Identify manual actions, security vulnerabilities, and index drops"
    ],
    milestoneBadge: "🔍 GSC Master"
  },
  {
    stepNumber: 11,
    tierId: "tier-4-analytics-cro",
    title: "Google Analytics 4 (GA4) Mastery",
    subtitle: "Custom exploration reports, conversion funnels, and organic ROI modeling",
    difficulty: "Advanced",
    estimatedMinutes: 140,
    trackId: "ga4",
    trackName: "Google Analytics 4 Complete Guide",
    levelIds: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515],
    keyOutcomes: [
      "Configure custom dimensions, event triggers, and conversion tracking",
      "Build Looker Studio dashboards combining Search Console and GA4 data",
      "Calculate true organic search revenue attribution and customer lifetime value"
    ],
    milestoneBadge: "📊 Analytics Authority"
  },
  {
    stepNumber: 12,
    tierId: "tier-4-analytics-cro",
    title: "Authority, PR & Conversion Optimization (CRO)",
    subtitle: "Digital PR, link acquisition, UX testing, and conversion rate engineering",
    difficulty: "Advanced",
    estimatedMinutes: 120,
    trackId: "authority-conversion",
    trackName: "Authority, PR & Conversion Optimization",
    levelIds: [17, 18, 19, 20, 28, 29, 30],
    keyOutcomes: [
      "Launch data-driven digital PR campaigns to win tier-1 editorial backlinks",
      "Run heat-map and click-stream audits to remove conversion friction",
      "Execute A/B tests on landing page copy, forms, and CTA buttons"
    ],
    milestoneBadge: "🚀 Growth & CRO Leader"
  },
  {
    stepNumber: 13,
    tierId: "tier-5-ai-geo-sxo",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "Formatting for RAG engines, ChatGPT search, Gemini, Claude, and Perplexity",
    difficulty: "Expert",
    estimatedMinutes: 100,
    trackId: "geo",
    trackName: "Generative Engine Optimization (GEO)",
    levelIds: [13, 15, 31, 34],
    keyOutcomes: [
      "Structure modular block content designed for LLM citation algorithms",
      "Audit brand sentiment and mention frequency across AI search engines",
      "Implement robots.txt strategies balancing AI search bot access and scraping"
    ],
    milestoneBadge: "🤖 GEO Innovator"
  },
  {
    stepNumber: 14,
    tierId: "tier-5-ai-geo-sxo",
    title: "Answer Engine Optimization (AEO)",
    subtitle: "Direct answer snippets, Google AI Overviews, and voice search",
    difficulty: "Expert",
    estimatedMinutes: 80,
    trackId: "aeo",
    trackName: "AEO & Answer Optimization",
    levelIds: [14, 26],
    keyOutcomes: [
      "Capture Position Zero featured snippets and Google AI Overview summaries",
      "Format concise, factual 40-60 word answer paragraphs",
      "Optimize tables, ordered lists, and direct definitions for voice answers"
    ],
    milestoneBadge: "💬 Answer Engine Maestro"
  },
  {
    stepNumber: 15,
    tierId: "tier-5-ai-geo-sxo",
    title: "Search Everywhere Optimization (SXO) & Capstone",
    subtitle: "Multi-platform search (YouTube, TikTok, Reddit) + full client audit capstone",
    difficulty: "Expert",
    estimatedMinutes: 150,
    trackId: "sxo",
    trackName: "Search Everywhere Optimization (SXO)",
    levelIds: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 1025, 1026],
    keyOutcomes: [
      "Optimize brand presence across Reddit, YouTube, TikTok, and social search",
      "Produce a complete, audit-grade 90-day organic growth roadmap",
      "Deliver executive reporting decks connecting technical SEO to enterprise revenue"
    ],
    milestoneBadge: "👑 Search Master"
  }
];

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
