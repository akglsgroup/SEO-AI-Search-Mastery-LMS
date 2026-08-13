import React, { useState, useMemo } from "react";
import { 
  Search, BookOpen, Brain, Sparkles, Trophy, CheckCircle, Star, 
  HelpCircle, ChevronRight, Filter, Award, Zap, RefreshCw, Bookmark,
  Layers, ArrowUpRight, Cpu, Target, Eye, BarChart2, ShieldCheck, Check, Crosshair
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TermsGlossaryProps {
  onAwardPoints?: (points: number, reason: string) => void;
  userPoints?: number;
}

export interface TermItem {
  id: string;
  term: string;
  category: string;
  subcategory?: string;
  level: "Basic" | "Advanced" | "AI/Agentic" | "Tool";
  definition: string;
  example: string;
  tools?: string[];
  kpiImpact?: string;
}

export interface DomainCategory {
  id: number;
  title: string;
  icon: string;
  description: string;
  basicTerms: string[];
  advancedTerms: string[];
  tools?: string[];
  specialSection?: {
    title: string;
    items: string[];
  }[];
}

// Full 36 Master Domains Taxonomy Data
export const TAXONOMY_DOMAINS: DomainCategory[] = [
  {
    id: 1,
    title: "1. Digital Marketing Fundamentals",
    icon: "🎯",
    description: "Core frameworks, marketing mixes, customer journey stages, and strategic alignment.",
    basicTerms: [
      "Digital Marketing", "Traditional vs Digital Marketing", "B2B Marketing", "B2C Marketing", "D2C Marketing", "B2B2C Marketing", 
      "Customer Journey", "Marketing Funnel", "Awareness", "Consideration", "Conversion", "Retention", "Advocacy", 
      "Marketing Mix (4Ps / 7Ps)", "USP (Unique Selling Proposition)", "UVP (Unique Value Proposition)", 
      "Buyer Persona", "ICP (Ideal Customer Profile)", "Customer Segmentation", "Target Audience", "Marketing Objectives", "SMART Goals", "Marketing Strategy", "Campaign Planning"
    ],
    advancedTerms: [
      "Full-Funnel Marketing", "Growth Marketing", "Performance Marketing", "Demand Generation", "Revenue Marketing", 
      "Lifecycle Marketing", "Account-Based Marketing (ABM)", "Product-Led Growth (PLG)", "Community-Led Growth", "Omnichannel Marketing", "Integrated Marketing", "Customer-Centric Marketing", "Zero-Party Data", "First-Party Data", "Second-Party Data", "Third-Party Data"
    ]
  },
  {
    id: 2,
    title: "2. Market Research & Competitive Intelligence",
    icon: "🔍",
    description: "Market sizing, competitive benchmarking, sentiment analysis, and search intent signals.",
    basicTerms: ["Market Research", "Competitor Research", "Audience Research", "Keyword Research", "Customer Research", "Industry Research", "Trend Research"],
    advancedTerms: ["TAM (Total Addressable Market)", "SAM (Serviceable Addressable Market)", "SOM (Serviceable Obtainable Market)", "Competitive Gap Analysis", "SWOT Analysis", "PESTLE Framework", "Competitor Benchmarking", "Share of Voice (SOV)", "Market Share Analysis", "Customer Intent Analysis", "Search Demand Analysis", "Audience Intelligence", "Behavioral Analysis", "Sentiment Analysis"],
    tools: ["Google Trends", "Google Keyword Planner", "Similarweb", "Semrush", "Ahrefs", "SE Ranking", "SparkToro", "Statista", "Exploding Topics", "AnswerThePublic"]
  },
  {
    id: 3,
    title: "3. SEO — Search Engine Optimization",
    icon: "🚀",
    description: "Comprehensive SEO architecture: On-Page, Technical, Keyword Architecture, and Programmatic SEO.",
    basicTerms: ["SEO", "Search Engine", "SERP", "Organic Search", "Keywords", "Search Intent", "Keyword Difficulty", "Search Volume", "CPC", "CTR", "Ranking", "Traffic", "Impressions", "Clicks", "Organic Conversion"],
    advancedTerms: [
      "Programmatic SEO", "Enterprise SEO", "International SEO", "Local SEO", "E-commerce SEO", "News SEO", "Image SEO", "Video SEO", "Voice SEO", "App SEO", "Marketplace SEO", "SaaS SEO", "Parasite SEO", "Digital PR", "Content Pruning", "SEO Forecasting", "SEO Automation"
    ],
    specialSection: [
      {
        title: "Keyword Architecture",
        items: ["Seed Keywords", "Primary Keywords", "Secondary Keywords", "Long-Tail Keywords", "Short-Tail Keywords", "LSI / Related Terms", "Semantic Keywords", "Question Keywords", "Commercial Keywords", "Transactional Keywords", "Informational Keywords", "Navigational Keywords", "Local Keywords", "Zero-Volume Keywords", "Entity-Based Keywords"]
      },
      {
        title: "On-Page SEO & Topical Authority",
        items: ["Title Tag", "Meta Description", "H1–H6 Headers", "URL Optimization", "Internal Linking", "Anchor Text", "Image SEO & Alt Text", "Keyword Placement", "Content Structure", "Semantic SEO", "Entity SEO", "Topical Relevance", "Topical Authority"]
      },
      {
        title: "Technical SEO Infrastructure",
        items: ["Crawling", "Indexing", "Rendering", "Robots.txt", "XML Sitemap", "Canonical Tags", "Hreflang", "Redirects (301, 302, 404, 410, Soft 404)", "Pagination", "Faceted Navigation", "JavaScript SEO", "Log File Analysis", "Crawl Budget", "Crawl Depth", "Orphan Pages", "Duplicate Content", "Core Web Vitals", "Page Experience"]
      }
    ]
  },
  {
    id: 4,
    title: "4. GEO / AI Search / AEO (Next-Gen Search)",
    icon: "🤖",
    description: "Generative Engine Optimization, Answer Engine Optimization, LLM Citations & Vector Search.",
    basicTerms: ["GEO — Generative Engine Optimization", "AEO — Answer Engine Optimization", "AI SEO", "Generative Search Optimization", "AI Search Optimization", "LLM Optimization (LLMO)", "Generative Engine Visibility", "AI Search Visibility", "AI Citation Optimization", "AI Brand Visibility"],
    advancedTerms: ["Entity Recognition", "Knowledge Graph Integration", "Entity Authority", "Semantic Retrieval", "Retrieval-Augmented Generation (RAG)", "Vector Search", "Embeddings", "Query Expansion", "Query Fan-Out", "Search Grounding", "Citation Probability", "Brand Mention Optimization", "Source Authority", "AI Referral Traffic", "AI Visibility Tracking"],
    tools: ["Google AI Overviews", "Google AI Mode", "ChatGPT Search", "Microsoft Copilot", "Perplexity AI", "Gemini AI", "Claude", "Grok"]
  },
  {
    id: 5,
    title: "5. Content Marketing & E-E-A-T",
    icon: "📝",
    description: "Topic clusters, content velocity, E-E-A-T, information gain, and content repurposing.",
    basicTerms: ["Content Strategy", "Blog Writing", "Articles", "Website Content", "Landing Page Content", "Social Media Content", "Infographics", "E-books", "Case Studies", "Whitepapers"],
    advancedTerms: ["Content Funnel", "Pillar Content", "Cluster Content", "Topic Clusters", "Content Hub", "Content Calendar", "Content Distribution", "Content Repurposing", "Content Syndication", "Content Refresh", "Content Pruning", "Editorial Strategy", "Thought Leadership", "Content Experience", "E-E-A-T", "Information Gain", "Semantic Coverage", "Content Depth", "Content Velocity", "Content Decay", "Topic Authority"]
  },
  {
    id: 6,
    title: "6. Copywriting & Conversion Copywriting",
    icon: "✍️",
    description: "Psychological triggers, persuasion frameworks, headlines, hooks, and offer architecture.",
    basicTerms: ["Copywriting", "Ad Copy", "Website Copy", "Landing Page Copy", "Sales Copy", "Email Copy", "Social Copy", "Headlines", "Hooks", "CTAs", "Value Proposition", "Storytelling", "Persuasive Writing", "Psychological Triggers", "FOMO", "Social Proof", "Scarcity", "Urgency"],
    advancedTerms: ["Conversion Copywriting", "Behavioral Psychology", "Neuromarketing", "Direct Response Copywriting", "Customer Awareness Levels", "Message-Market Fit", "Offer Architecture", "AIDA Framework", "PAS Framework", "FAB Framework", "BAB Framework", "Before-After-Bridge"]
  },
  {
    id: 7,
    title: "7. Google Ads / PPC",
    icon: "💸",
    description: "Search ads, Performance Max, Smart Bidding, conversion value tracking, and script automation.",
    basicTerms: ["Google Ads", "PPC", "Search Ads", "Display Ads", "Video Ads", "Shopping Ads", "App Campaigns", "Performance Max", "Demand Gen", "Campaign", "Ad Group", "Match Types", "Negative Keywords", "Search Terms", "Extensions / Assets"],
    advancedTerms: ["Manual CPC", "Maximize Clicks", "Maximize Conversions", "Target CPA", "Target ROAS", "Smart Bidding", "Conversion Tracking", "Enhanced Conversions", "Offline Conversion Tracking", "Value-Based Bidding", "Customer Match", "First-Party Audiences", "Remarketing (RLSA)", "Feed Optimization", "Google Ads Scripts", "Automated Rules"]
  },
  {
    id: 8,
    title: "8. Meta Ads (Facebook & Instagram)",
    icon: "📱",
    description: "Meta Business Manager, Advantage+, Custom & Lookalike Audiences, Conversions API, and Lead Ads.",
    basicTerms: ["Meta Ads Manager", "Meta Business Suite", "Awareness Campaigns", "Traffic Campaigns", "Engagement Campaigns", "Lead Campaigns", "App Campaigns", "Sales Campaigns"],
    advancedTerms: ["Custom Audiences", "Lookalike Audiences (LAL)", "Advantage+ Audience", "Advantage+ Shopping", "Advantage+ Creative", "Website Retargeting", "Lead Ads & Instant Forms", "Conversion API (CAPI)", "Meta Pixel", "Events Manager", "Offline Conversions", "CRM Webhooks Integration", "Lead Routing & Scoring"]
  },
  {
    id: 9,
    title: "9. Social Media Marketing",
    icon: "🌐",
    description: "Organic growth, community building, social listening, employee advocacy, and dark social.",
    basicTerms: ["Social Strategy", "Organic Growth", "Community Management", "Social Listening", "Social Analytics", "Content Planning", "Hashtag Strategy", "Influencer Marketing", "UGC (User Generated Content)", "Personal Branding"],
    advancedTerms: ["Social Commerce", "Social SEO", "Employee Advocacy", "Dark Social", "Community-Led Growth", "Creator Partnerships", "Influencer Attribution"]
  },
  {
    id: 10,
    title: "10. YouTube Marketing",
    icon: "🎬",
    description: "Channel authority, retention curves, thumbnail A/B testing, Shorts, and YouTube SEO.",
    basicTerms: ["YouTube SEO", "Channel Optimization", "Video SEO", "Titles & Thumbnails", "CTR", "Watch Time", "Audience Retention", "Shorts", "Long-Form Video", "YouTube Analytics"],
    advancedTerms: ["Thumbnail A/B Testing", "Retention Optimization", "Content Clusters", "Suggested Video Optimization", "Browse Features Optimization", "YouTube Funnel", "Creator Monetization", "Video Repurposing"]
  },
  {
    id: 11,
    title: "11. Email Marketing & Deliverability",
    icon: "✉️",
    description: "Lifecycle automation, drip flows, deliverability infrastructure (SPF, DKIM, DMARC), and Klaviyo/HubSpot.",
    basicTerms: ["Email Campaigns", "Newsletter", "Promotional Emails", "Transactional Emails", "Email Lists", "Segmentation", "Personalization", "Open Rate", "CTR", "Conversion Rate"],
    advancedTerms: ["Welcome Series", "Drip Campaign", "Lead Nurturing", "Abandoned Cart Flow", "Re-engagement Flow", "Behavioral Automation", "Lifecycle Marketing", "Lead Scoring", "Dynamic Content", "Predictive Segmentation", "Deliverability", "Domain Reputation", "SPF", "DKIM", "DMARC", "BIMI"],
    tools: ["Mailchimp", "HubSpot", "Klaviyo", "Brevo", "ActiveCampaign", "Salesforce Marketing Cloud"]
  },
  {
    id: 12,
    title: "12. WhatsApp Marketing",
    icon: "💬",
    description: "WhatsApp Business API, conversational commerce, broadcast campaigns, and automated qualification.",
    basicTerms: ["WhatsApp Business", "WhatsApp Business API", "WhatsApp Cloud API", "Click-to-WhatsApp Ads", "Broadcast Catalogs", "Automated Replies", "Chatbots"],
    advancedTerms: ["WhatsApp Automation", "API Webhooks", "Conversational Commerce", "WhatsApp Lead Routing", "WhatsApp CRM Sync", "AI Chatbots", "Automated Follow-Up Sequences"]
  },
  {
    id: 13,
    title: "13. CRM & Lead Management",
    icon: "💼",
    description: "Lead scoring, pipelines, Revenue Operations (RevOps), Customer 360, and CDP integration.",
    basicTerms: ["CRM", "Lead Capture", "Lead Management", "Lead Qualification", "Lead Scoring", "Lead Nurturing", "Sales Pipeline", "Opportunity Management", "Contact Management"],
    advancedTerms: ["Marketing Automation Sync", "Sales Automation", "Revenue Operations (RevOps)", "Lead Attribution", "Predictive Lead Scoring", "Customer Data Platform (CDP)", "Customer 360", "Revenue Attribution"],
    tools: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Freshsales", "Microsoft Dynamics"]
  },
  {
    id: 14,
    title: "14. Marketing Automation",
    icon: "⚡",
    description: "Workflow triggers, condition branching, webhook payloads, n8n, Make, and Zapier orchestration.",
    basicTerms: ["Workflow Automation", "Trigger", "Action", "Condition", "Segmentation", "Lead Routing", "Notifications", "Follow-Up Drips"],
    advancedTerms: ["Multi-Step Automation", "Behavioral Automation", "Event-Based Automation", "API Automation", "Webhooks", "CRM Automation", "AI Automation Workflows", "Autonomous Marketing Agents"],
    tools: ["Zapier", "Make", "n8n", "HubSpot Workflows", "ActiveCampaign"]
  },
  {
    id: 15,
    title: "15. Analytics & Measurement",
    icon: "📊",
    description: "GA4 event models, funnel dropoff, cohort analysis, LTV, CAC, and multi-touch attribution.",
    basicTerms: ["Google Analytics (GA4)", "Google Search Console", "Traffic", "Users", "Sessions", "Engagement Rate", "Conversions", "Events", "Goals", "Revenue"],
    advancedTerms: ["Funnel Analysis", "Cohort Analysis", "Retention Analysis", "Attribution Modeling", "Customer Lifetime Value (LTV)", "CAC (Customer Acquisition Cost)", "ROAS", "ROI", "Assisted Conversions", "Multi-Touch Attribution"],
    tools: ["GA4", "Looker Studio", "Microsoft Clarity", "Hotjar", "Mixpanel", "Amplitude", "Matomo"]
  },
  {
    id: 16,
    title: "16. CRO — Conversion Rate Optimization",
    icon: "📈",
    description: "A/B testing, multivariate experiments, heatmaps, Bayesian significance, and checkout optimization.",
    basicTerms: ["CRO", "Landing Page Optimization", "CTA Optimization", "Form Optimization", "UX Optimization", "Checkout Optimization", "A/B Testing", "Heatmaps", "Session Recording"],
    advancedTerms: ["Experimentation", "Statistical Significance", "Bayesian Testing", "Personalization", "Dynamic Landing Pages", "Behavioral Targeting", "Experiment Design", "Incrementality Testing"]
  },
  {
    id: 17,
    title: "17. UX/UI & Website Optimization",
    icon: "🎨",
    description: "User flow mapping, information architecture, page performance, and behavioral design.",
    basicTerms: ["UX", "UI", "Information Architecture", "Navigation", "Mobile UX", "Responsive Design", "Accessibility (WCAG)", "Website Speed", "User Flow", "Customer Journey Mapping"],
    advancedTerms: ["UX Research", "Usability Testing", "Behavioral Design", "Design Systems", "Experience Personalization"]
  },
  {
    id: 18,
    title: "18. E-commerce Marketing",
    icon: "🛍️",
    description: "Google Merchant Center, product feeds, catalog ads, subscription marketing, and marketplace SEO.",
    basicTerms: ["E-commerce SEO", "Google Shopping", "Product Feed", "Merchant Center", "Product Listing", "Marketplace Marketing", "Abandoned Cart", "Upselling", "Cross-Selling"],
    advancedTerms: ["Dynamic Remarketing", "Product Feed Automation", "Catalog Ads", "Repeat Purchase Optimization", "Subscription Marketing", "Marketplace SEO", "Social Commerce"]
  },
  {
    id: 19,
    title: "19. Local SEO & Local Marketing",
    icon: "📍",
    description: "Google Business Profile, local citations, NAP consistency, local entity optimization, and review velocity.",
    basicTerms: ["Google Business Profile", "Local Citations", "NAP (Name Address Phone)", "Reviews", "Local Keywords", "Local Landing Pages", "Maps SEO"],
    advancedTerms: ["Local Entity Optimization", "Local Pack Optimization", "Multi-Location SEO", "Local Content Strategy", "Review Generation Automation", "Geo-Targeting", "Geo-Fencing"]
  },
  {
    id: 20,
    title: "20. App Marketing / ASO",
    icon: "📲",
    description: "App Store Optimization, app install campaigns, deep linking, and mobile attribution.",
    basicTerms: ["ASO (App Store Optimization)", "App Title", "App Description", "Keywords", "Screenshots", "Ratings & Reviews", "App Indexing"],
    advancedTerms: ["App Install Campaigns", "Deep Linking", "App Retargeting", "Mobile Attribution", "App Event Tracking", "Firebase Analytics", "App Store Conversion Optimization"]
  },
  {
    id: 21,
    title: "21. Affiliate Marketing",
    icon: "🤝",
    description: "Affiliate networks, CPA/CPL models, referral tracking, coupon partnerships, and fraud detection.",
    basicTerms: ["Affiliate Marketing", "Affiliate Network", "Publisher", "Advertiser", "Commission", "CPA", "CPL", "CPS", "Referral Marketing"],
    advancedTerms: ["Affiliate Attribution", "Partner Marketing", "Influencer Affiliates", "Coupon Affiliates", "Performance Partnerships", "Affiliate Fraud Detection"]
  },
  {
    id: 22,
    title: "22. Influencer & Creator Marketing",
    icon: "🌟",
    description: "Nano to macro creators, UGC, creator whitelisting, partnership ads, and performance analytics.",
    basicTerms: ["Influencer Marketing", "Nano Influencers", "Micro Influencers", "Macro Influencers", "Creator Marketing", "UGC", "Brand Ambassadors", "Sponsored Content"],
    advancedTerms: ["Creator Whitelisting", "Partnership Ads", "Influencer Attribution", "Creator Performance Analytics", "Affiliate Creator Programs"]
  },
  {
    id: 23,
    title: "23. Online Reputation Management (ORM)",
    icon: "🛡️",
    description: "Brand monitoring, sentiment analysis, Knowledge Panel protection, and crisis management.",
    basicTerms: ["ORM", "Brand Monitoring", "Review Management", "Reputation Monitoring", "Social Listening", "Sentiment Analysis", "Crisis Management"],
    advancedTerms: ["Brand SERP Optimization", "Entity Reputation", "Knowledge Panel Management", "Review Automation", "AI Reputation Monitoring"]
  },
  {
    id: 24,
    title: "24. Digital PR & Link Building",
    icon: "🔗",
    description: "Backlink acquisition, HARO outreach, data journalism, brand mentions, and linkable assets.",
    basicTerms: ["Backlinks", "Link Building", "Guest Posting", "Outreach", "Broken Link Building", "Resource Link Building", "Digital PR", "Brand Mentions"],
    advancedTerms: ["Digital PR Campaigns", "Newsjacking", "Expert Commentary", "Data Journalism", "Linkable Assets", "Entity-Based Authority", "Brand Authority"]
  },
  {
    id: 25,
    title: "25. Marketing Technology — MarTech",
    icon: "⚙️",
    description: "MarTech stack architecture, APIs, webhooks, Reverse ETL, data warehouses, and identity resolution.",
    basicTerms: ["CRM", "CDP", "CMS", "DMP", "Marketing Automation", "Analytics Platforms", "Advertising Platforms"],
    advancedTerms: ["MarTech Stack Architecture", "API Integrations", "Webhooks", "Data Warehouse (BigQuery)", "Data Lake", "Reverse ETL", "Customer Data Infrastructure", "Identity Resolution", "Consent Management"]
  },
  {
    id: 26,
    title: "26. Tracking & Tag Management",
    icon: "🏷️",
    description: "Google Tag Manager, server-side tracking, Consent Mode v2, Data Layer, and First-Party cookies.",
    basicTerms: ["Google Tag Manager (GTM)", "Meta Pixel", "Google Ads Conversion Tracking", "GA4 Events", "UTM Parameters", "Campaign Tracking"],
    advancedTerms: ["Server-Side Tracking (sGTM)", "Conversion API (CAPI)", "Enhanced Conversions", "Offline Conversions", "First-Party Tracking", "Event Architecture", "Data Layer", "Consent Mode v2", "Cookie Consent"]
  },
  {
    id: 27,
    title: "27. Attribution & Marketing Analytics",
    icon: "⚖️",
    description: "First-click, last-click, position-based, data-driven attribution, and Media Mix Modeling (MMM).",
    basicTerms: ["Last-Click Attribution", "First-Click Attribution", "Linear Attribution", "Position-Based Attribution", "Time-Decay Attribution", "Data-Driven Attribution"],
    advancedTerms: ["Multi-Touch Attribution (MTA)", "Media Mix Modeling (MMM)", "Incrementality Testing", "Lift Testing", "Causal Inference", "Customer Journey Attribution", "Revenue Attribution"]
  },
  {
    id: 28,
    title: "28. Growth Marketing",
    icon: "📈",
    description: "AARRR funnel, viral loops, growth engineering, Product-Led Growth (PLG), and retention modeling.",
    basicTerms: ["Growth Hacking", "Acquisition", "Activation", "Retention", "Revenue", "Referral", "AARRR Framework", "Growth Loops"],
    advancedTerms: ["Experimentation Velocity", "Growth Engineering", "PLG (Product-Led Growth)", "Community-Led Growth", "Network Effects", "Referral Engines", "Viral Coefficient", "Retention Modeling"]
  },
  {
    id: 29,
    title: "29. AI Marketing",
    icon: "🧠",
    description: "Generative AI, prompt engineering, RAG, AI image/video generation, and predictive analytics.",
    basicTerms: ["AI Content Generation", "AI Copywriting", "AI Image Generation", "AI Video Generation", "AI Research", "AI Chatbots"],
    advancedTerms: ["Generative AI", "LLM (Large Language Model)", "Prompt Engineering", "AI Agents", "AI Automation", "RAG (Retrieval-Augmented Generation)", "AI Search", "Predictive Analytics", "Predictive Lead Scoring", "AI Personalization", "AI Content Optimization"],
    tools: ["ChatGPT", "Gemini", "Claude", "Perplexity", "Midjourney", "Canva AI", "Runway", "ElevenLabs", "NotebookLM", "Cursor", "n8n"]
  },
  {
    id: 30,
    title: "30. Advanced AI Agent Marketing",
    icon: "🤖",
    description: "Agentic AI, autonomous multi-agent systems, tool calling, memory banks, and human-in-the-loop workflows.",
    basicTerms: ["AI Marketing Agents", "Autonomous Agents", "Agentic AI", "Multi-Agent Systems", "SEO Agent", "Content Agent", "PPC Agent", "Analytics Agent"],
    advancedTerms: ["Agent Workflows", "Tool Calling / Function Calling", "API Agents", "Agent Memory & Vector Store", "RAG Agents", "Human-in-the-Loop (HITL)", "AI Decision Systems", "Autonomous Campaign Optimization"]
  },
  {
    id: 31,
    title: "31. Marketing Data & Business Intelligence",
    icon: "🔢",
    description: "BigQuery, SQL data modeling, ETL/ELT pipelines, Looker dashboards, and predictive forecasting.",
    basicTerms: ["Data Analysis", "Data Visualization", "Dashboards", "KPI Reporting", "SQL Basics", "Excel / Google Sheets"],
    advancedTerms: ["BigQuery", "Data Warehouse", "Data Modeling", "ETL / ELT", "Data Pipelines", "Predictive Analytics", "Forecasting", "Customer Segmentation Models", "Marketing Intelligence"]
  },
  {
    id: 32,
    title: "32. Privacy, Compliance & Data Governance",
    icon: "🔒",
    description: "GDPR, CCPA, Privacy Sandbox, Consent Mode v2, and zero/first-party data governance.",
    basicTerms: ["GDPR", "CCPA", "Consent", "Cookie Policy", "Privacy Policy", "Data Protection", "First-Party Data"],
    advancedTerms: ["Consent Mode v2", "Server-Side Tracking", "Privacy Sandbox", "Data Governance", "Identity Resolution", "Data Minimization", "Consent Management Platform (CMP)"]
  },
  {
    id: 33,
    title: "33. Advanced Performance Marketing",
    icon: "💰",
    description: "Contribution margin, value-based bidding, marginal ROAS, MER, and portfolio optimization.",
    basicTerms: ["CAC", "CPL", "CPA", "CPS", "ROAS", "ROI", "LTV", "MER (Marketing Efficiency Ratio)", "AOV", "Conversion Rate"],
    advancedTerms: ["Profit-Based Optimization", "Value-Based Bidding", "Customer-Lifetime Optimization", "Incrementality Testing", "Media Mix Modeling", "Budget Allocation", "Portfolio Optimization", "Marginal ROAS", "Financial Forecasting"]
  },
  {
    id: 34,
    title: "34. Emerging Digital Marketing Areas (2026+ Radar)",
    icon: "📡",
    description: "GEO, AEO, LLMO, Agentic Marketing, Social Search, Retail Media, and Connected TV (CTV).",
    basicTerms: ["AI Search", "GEO", "AEO", "LLMO", "AI Brand Visibility", "Agentic Marketing", "Social Search Optimization", "Voice Search", "Video Search"],
    advancedTerms: ["Zero-Click Search", "Answer Engines", "Conversational Commerce", "AI Commerce", "Retail Media Networks", "Connected TV (CTV) Advertising", "Digital Out-of-Home (DOOH)", "Synthetic Audiences", "Generative Creative Optimization"]
  },
  {
    id: 35,
    title: "35. Complete Digital Marketing Tool Stack",
    icon: "🛠️",
    description: "Industry standard tool stack mapped across SEO, Analytics, Ads, CRM, Automation, and AI.",
    basicTerms: ["Google Search Console", "Google Keyword Planner", "Semrush", "Ahrefs", "GA4", "Looker Studio", "Google Ads", "Meta Ads", "HubSpot", "Zapier", "ChatGPT", "Canva"],
    advancedTerms: ["Screaming Frog", "Sitebulb", "Surfer SEO", "Frase", "Microsoft Clarity", "Hotjar", "Mixpanel", "Amplitude", "Salesforce", "Zoho", "n8n", "Make", "BigQuery", "Midjourney", "Runway", "ElevenLabs", "NotebookLM", "GTM Server-Side"]
  },
  {
    id: 36,
    title: "36. Skill-Level Roadmap & Full-Stack Profile",
    icon: "🗺️",
    description: "From L1 Beginner to L5 AI/Agentic Marketer across 15 master domains.",
    basicTerms: ["L1 — Beginner (SEO, Social, Content, Email, Google Ads)", "L2 — Intermediate (Technical SEO, Meta Ads, Analytics, CRM, CRO)", "L3 — Advanced (Performance, Attribution, Automation, Growth)"],
    advancedTerms: ["L4 — Expert (Enterprise SEO, MarTech, CDP, Advanced Analytics, GEO/AEO)", "L5 — AI/Agentic (AI Agents, RAG, LLMO, AI Search, Autonomous Marketing, Predictive)"]
  }
];

// Sample Glossary Details Dictionary for modal descriptions & practice tests
export const DETAILED_TERMS_DB: TermItem[] = [
  {
    id: "geo",
    term: "GEO (Generative Engine Optimization)",
    category: "GEO / AI Search / AEO",
    level: "AI/Agentic",
    definition: "The practice of optimizing website content, brand entities, and digital footprint so generative AI engines (Google AI Overviews, ChatGPT Search, Perplexity, Gemini) cite and recommend your brand in AI-generated answers.",
    example: "Structuring content with clear entity relationships, statistical facts, and direct bullet answers so Perplexity and Google AI Overviews cite your article as the primary source.",
    tools: ["Perplexity", "Google AI Overviews", "ChatGPT Search", "Semrush AI Visibility"],
    kpiImpact: "+140% Increase in AI Referral Traffic & AI Citation Share"
  },
  {
    id: "aeo",
    term: "AEO (Answer Engine Optimization)",
    category: "GEO / AI Search / AEO",
    level: "Advanced",
    definition: "Optimizing content to provide direct, definitive answers for voice assistants, zero-click featured snippets, and AI conversational search platforms.",
    example: "Formatting product comparison tables with explicit schema markup and concise summary paragraphs to capture zero-click answer boxes.",
    tools: ["AnswerThePublic", "Google Search Console", "Surfer SEO"],
    kpiImpact: "Higher Zero-Click Snippet Ownership & Voice Query Dominance"
  },
  {
    id: "rag",
    term: "Retrieval-Augmented Generation (RAG)",
    category: "AI Marketing",
    level: "AI/Agentic",
    definition: "An AI architecture that combines a Large Language Model (LLM) with external database retrieval (e.g. vector search in Firestore or Pinecone) to output accurate, real-time factual responses grounded in business data.",
    example: "Connecting an AI Customer Service Bot to your live product inventory database so it answers pricing and availability questions with 100% accuracy.",
    tools: ["Firebase Vector Search", "Gemini API", "Pinecone", "LangChain"],
    kpiImpact: "Zero AI Hallucinations & 24/7 Automated Lead Qualification"
  },
  {
    id: "programmatic-seo",
    term: "Programmatic SEO (pSEO)",
    category: "SEO",
    level: "Advanced",
    definition: "The automated creation of thousands of high-quality, indexable, template-driven landing pages based on structured database inputs targeting long-tail transactional queries.",
    example: "Building 500 pages like 'Best SEO Consultant in [City Name]' or 'SaaS Competitor vs Competitor' dynamically from a database.",
    tools: ["Webflow", "Next.js", "Ahrefs", "Google Sheets API"],
    kpiImpact: "Scale organic search landing pages by 10x with zero manual drafting"
  },
  {
    id: "conversion-api",
    term: "Conversion API (CAPI)",
    category: "Meta Ads & Tracking",
    level: "Advanced",
    definition: "A server-to-server tracking pipeline that sends web events (purchases, lead submissions) directly from your web server to Meta/Google, bypassing browser ad-blockers and Safari ITP cookies.",
    example: "Posting lead form conversions from Node.js Express server straight to Meta Graph API, restoring 25% missing conversion signals.",
    tools: ["Meta Ads Manager", "Google Tag Manager Server-Side", "Express.js"],
    kpiImpact: "Restores up to 30% lost ad attribution & lowers Cost Per Lead (CPL)"
  },
  {
    id: "eeat",
    term: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)",
    category: "SEO & Content Marketing",
    level: "Basic",
    definition: "Google's Quality Rater Guidelines framework evaluating content quality based on first-hand Experience, demonstrated Expertise, website Authoritativeness, and transparent Trustworthiness.",
    example: "Adding author bio boxes with verified LinkedIn credentials and original case study photographs to demonstrate first-hand testing experience.",
    tools: ["Google Search Console", "Schema.org Author Markup"],
    kpiImpact: "Shields website rankings from core algorithm updates"
  },
  {
    id: "agentic-ai",
    term: "Agentic AI / Autonomous Marketing Agents",
    category: "Advanced AI Agent Marketing",
    level: "AI/Agentic",
    definition: "AI systems capable of autonomous decision-making, planning, and tool execution (calling search APIs, running ad campaigns, updating CRM records) without requiring constant human prompt iteration.",
    example: "An AI Agent that automatically analyzes daily keyword drop logs, generates draft content updates, and submits an indexing request via Google Search Console API.",
    tools: ["n8n", "Gemini Function Calling", "LangGraph", "Python"],
    kpiImpact: "Automates 80% of repetitive SEO, PPC, and lead scoring workflows"
  },
  {
    id: "value-based-bidding",
    term: "Value-Based Bidding (VBB)",
    category: "Google Ads / PPC",
    level: "Advanced",
    definition: "A Google Ads Smart Bidding strategy that prioritizes acquiring conversions with higher lifetime monetary value rather than equal cost per lead.",
    example: "Passing lead score values ($100 for enterprise leads vs $10 for SMB leads) into Google Ads so Smart Bidding targets high-ticket accounts.",
    tools: ["Google Ads", "HubSpot CRM", "Offline Conversion Sync"],
    kpiImpact: "+35% Return on Ad Spend (ROAS) optimization"
  }
];

// Sample Quiz Questions for the Test Module
export const TAXONOMY_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does GEO stand for in modern 2026 AI Search Marketing?",
    options: [
      "Geographic Expansion Optimization",
      "Generative Engine Optimization",
      "Google Ecosystem Optimization",
      "Global E-commerce Organization"
    ],
    correctIndex: 1,
    explanation: "GEO (Generative Engine Optimization) is the discipline of optimizing brand entities and content to get cited in AI Search Engines like ChatGPT, Perplexity, and Google AI Overviews."
  },
  {
    id: 2,
    question: "Which component is essential for Meta Ads to bypass browser ad-blockers and Safari ITP limitations?",
    options: [
      "Meta Pixel Client Tag",
      "Conversion API (CAPI)",
      "Standard UTM Parameters",
      "Robots.txt file"
    ],
    correctIndex: 1,
    explanation: "Meta Conversion API (CAPI) sends conversion events directly from server-to-server, avoiding browser-side cookie blocking."
  },
  {
    id: 3,
    question: "In Google's E-E-A-T search quality framework, what does the extra 'E' added in recent guidance represent?",
    options: [
      "Efficiency",
      "Engagement",
      "Experience (First-Hand Experience)",
      "Exclusivity"
    ],
    correctIndex: 2,
    explanation: "The extra 'E' stands for 'Experience' — proving the author has real, first-hand personal experience using the product or service."
  },
  {
    id: 4,
    question: "What is the primary function of Retrieval-Augmented Generation (RAG) in AI Marketing Agents?",
    options: [
      "To automatically create social media graphics without text",
      "To combine LLMs with external factual database vector retrieval to prevent hallucinations",
      "To send bulk cold emails without domain authentication",
      "To compress JPEG images for faster web loading"
    ],
    correctIndex: 1,
    explanation: "RAG connects AI language models with trusted database vectors so answers remain factual, current, and hallucination-free."
  },
  {
    id: 5,
    question: "Which level in the 5-tier Marketer Skill-Level Roadmap covers AI Agents, RAG, and LLMO?",
    options: [
      "L1 — Beginner",
      "L2 — Intermediate",
      "L3 — Advanced",
      "L5 — AI / Agentic Expert"
    ],
    correctIndex: 3,
    explanation: "Level L5 (AI/Agentic) represents the cutting edge of modern digital marketing, spanning autonomous agents, RAG, LLMO, and predictive systems."
  }
];

export default function TermsGlossary({ onAwardPoints, userPoints = 0 }: TermsGlossaryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTabMode, setActiveTabMode] = useState<"domains" | "roadmap" | "test">("domains");
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null);
  const [levelFilter, setLevelFilter] = useState<"All" | "Basic" | "Advanced" | "AI/Agentic">("All");
  
  // Selected Term Detail Modal
  const [activeModalTerm, setActiveModalTerm] = useState<TermItem | null>(null);
  
  // Mastered & Bookmarked terms state
  const [masteredTerms, setMasteredTerms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("lms_mastered_terms");
      return saved ? JSON.parse(saved) : ["geo", "rag", "eeat"];
    } catch {
      return ["geo", "rag", "eeat"];
    }
  });

  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("lms_bookmarked_terms");
      return saved ? JSON.parse(saved) : ["aeo", "agentic-ai"];
    } catch {
      return ["aeo", "agentic-ai"];
    }
  });

  // Test State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const toggleMastered = (termId: string) => {
    setMasteredTerms(prev => {
      const isMastered = prev.includes(termId);
      let updated: string[];
      if (isMastered) {
        updated = prev.filter(id => id !== termId);
      } else {
        updated = [...prev, termId];
        if (onAwardPoints) {
          onAwardPoints(15, "Mastered Digital Marketing Terminology node");
        }
      }
      try {
        localStorage.setItem("lms_mastered_terms", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleBookmark = (termId: string) => {
    setBookmarkedTerms(prev => {
      const isBookmarked = prev.includes(termId);
      const updated = isBookmarked ? prev.filter(id => id !== termId) : [...prev, termId];
      try {
        localStorage.setItem("lms_bookmarked_terms", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Filtered Domains calculation
  const filteredDomains = useMemo(() => {
    return TAXONOMY_DOMAINS.filter(domain => {
      if (selectedDomainId !== null && domain.id !== selectedDomainId) return false;

      if (!searchTerm) return true;

      const query = searchTerm.toLowerCase();
      const matchesTitle = domain.title.toLowerCase().includes(query);
      const matchesDesc = domain.description.toLowerCase().includes(query);
      const matchesBasic = domain.basicTerms.some(t => t.toLowerCase().includes(query));
      const matchesAdv = domain.advancedTerms.some(t => t.toLowerCase().includes(query));
      const matchesTools = domain.tools?.some(t => t.toLowerCase().includes(query));

      return matchesTitle || matchesDesc || matchesBasic || matchesAdv || matchesTools;
    });
  }, [selectedDomainId, searchTerm]);

  // Quiz submission logic
  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const q = TAXONOMY_QUIZ_QUESTIONS[currentQuizIndex];
    if (selectedOption === q.correctIndex) {
      setQuizScore(prev => prev + 1);
      if (onAwardPoints) {
        onAwardPoints(20, "Correct Taxonomy Mastery Test answer");
      }
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < TAXONOMY_QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="taxonomy-glossary-wrapper">
      {/* Hero Section */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-black uppercase rounded-full tracking-wider">
                MASTER TAXONOMY 2026+
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-black uppercase rounded-full tracking-wider">
                36 DOMAINS &amp; 500+ TERMS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white">
              Digital Marketing Terms &amp; Skill Taxonomy
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
              A comprehensive learning encyclopedia and test matrix covering every stage from <strong>Basic Fundamentals</strong> to <strong>Enterprise Technical SEO</strong>, <strong>GEO / AEO</strong>, and <strong>Autonomous AI Agent Marketing</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="p-3 bg-neutral-800/80 border border-neutral-700/80 rounded-2xl text-center min-w-[130px]">
              <span className="text-[9px] font-mono text-neutral-400 block uppercase font-bold">TERMS MASTERED</span>
              <span className="text-lg font-mono font-extrabold text-emerald-400">{masteredTerms.length} / 500+</span>
            </div>
            <div className="p-3 bg-neutral-800/80 border border-neutral-700/80 rounded-2xl text-center min-w-[130px]">
              <span className="text-[9px] font-mono text-neutral-400 block uppercase font-bold">REVISION BOOKMARKS</span>
              <span className="text-lg font-mono font-extrabold text-amber-400">{bookmarkedTerms.length} Saved</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/80">
          <button
            onClick={() => setActiveTabMode("domains")}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTabMode === "domains"
                ? "bg-white text-neutral-950 shadow-md font-extrabold"
                : "bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/50"
            }`}
          >
            <BookOpen size={14} className={activeTabMode === "domains" ? "text-neutral-950" : "text-neutral-400"} />
            <span>36 Master Taxonomy Domains</span>
          </button>

          <button
            onClick={() => setActiveTabMode("roadmap")}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTabMode === "roadmap"
                ? "bg-white text-neutral-950 shadow-md font-extrabold"
                : "bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/50"
            }`}
          >
            <Layers size={14} className={activeTabMode === "roadmap" ? "text-neutral-950" : "text-neutral-400"} />
            <span>Skill Roadmap (L1 → L5)</span>
          </button>

          <button
            onClick={() => setActiveTabMode("test")}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTabMode === "test"
                ? "bg-emerald-400 text-neutral-950 shadow-md font-black"
                : "bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80"
            }`}
          >
            <Trophy size={14} className={activeTabMode === "test" ? "text-neutral-950" : "text-emerald-400"} />
            <span>Take Skill Mastery Test (+20 XP)</span>
          </button>
        </div>
      </div>

      {/* --- MODE 1: DOMAINS & GLOSSARY ENCYCLOPEDIA --- */}
      {activeTabMode === "domains" && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-3xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 500+ terms (e.g. GEO, RAG, Programmatic SEO, Conversion API, E-E-A-T)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-sans bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white text-neutral-900 font-medium placeholder-neutral-400 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Dropdown Quick Select */}
              <select
                value={selectedDomainId === null ? "" : selectedDomainId}
                onChange={(e) => setSelectedDomainId(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full sm:w-auto px-3.5 py-2.5 text-xs font-sans bg-white border border-neutral-200 rounded-xl text-neutral-800 font-bold focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="">All 36 Master Domains</option>
                {TAXONOMY_DOMAINS.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>

            {/* Quick Filter Tag Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mr-1">Quick Domain Jump:</span>
              {[
                { label: "SEO & AI (GEO/AEO)", id: 3 },
                { label: "AI & Agents", id: 30 },
                { label: "Google & Meta Ads", id: 7 },
                { label: "Content & Copy", id: 5 },
                { label: "CRM & Automation", id: 13 },
                { label: "Analytics & CRO", id: 15 },
                { label: "Tool Stack", id: 35 }
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedDomainId(chip.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-sans font-bold transition-all cursor-pointer ${
                    selectedDomainId === chip.id
                      ? "bg-neutral-900 text-white font-extrabold shadow-2xs"
                      : "bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700"
                  }`}
                >
                  {chip.label}
                </button>
              ))}

              {selectedDomainId !== null && (
                <button
                  onClick={() => setSelectedDomainId(null)}
                  className="px-2.5 py-1 text-[10.5px] font-mono text-red-600 hover:underline font-bold ml-auto cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Interactive Deep Dive Terms (Spotlight Featured Terms Card Grid) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500 animate-pulse" />
                <span>Featured Deep-Dive Terminology Cards (Click for Full Modal &amp; XP)</span>
              </h3>
              <span className="text-xs font-mono text-neutral-400">{DETAILED_TERMS_DB.length} Deep Breakdown Cards</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DETAILED_TERMS_DB.map((termItem) => {
                const isMastered = masteredTerms.includes(termItem.id);
                const isBookmarked = bookmarkedTerms.includes(termItem.id);

                return (
                  <div
                    key={termItem.id}
                    className={`p-4 bg-white border rounded-2xl space-y-3 transition-all duration-200 hover:shadow-md cursor-pointer relative flex flex-col justify-between ${
                      isMastered ? "border-emerald-300/80 bg-emerald-50/20" : "border-neutral-200 hover:border-neutral-300"
                    }`}
                    onClick={() => setActiveModalTerm(termItem)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-black uppercase ${
                          termItem.level === "AI/Agentic"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : termItem.level === "Advanced"
                            ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}>
                          {termItem.level}
                        </span>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleBookmark(termItem.id)}
                            className={`p-1 rounded-md transition-all ${
                              isBookmarked ? "text-amber-500 bg-amber-50" : "text-neutral-300 hover:text-neutral-600"
                            }`}
                            title="Bookmark term"
                          >
                            <Bookmark size={14} className={isBookmarked ? "fill-amber-500" : ""} />
                          </button>

                          <button
                            onClick={() => toggleMastered(termItem.id)}
                            className={`p-1 rounded-md transition-all ${
                              isMastered ? "text-emerald-600 bg-emerald-100" : "text-neutral-300 hover:text-neutral-600"
                            }`}
                            title="Mark as Mastered (+15 XP)"
                          >
                            <CheckCircle size={14} className={isMastered ? "fill-emerald-600 text-white" : ""} />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-sans font-bold text-neutral-900 leading-snug line-clamp-2">
                        {termItem.term}
                      </h4>

                      <p className="text-[11px] text-neutral-500 leading-normal line-clamp-3">
                        {termItem.definition}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono font-bold text-neutral-400">
                      <span>{termItem.category}</span>
                      <span className="text-neutral-900 flex items-center gap-0.5">Details <ChevronRight size={12} /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Master 36 Domain Accordions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-extrabold text-neutral-900 tracking-tight">
                Complete Master Domains Category List ({filteredDomains.length} Domains)
              </h3>
              <span className="text-xs font-mono font-bold text-neutral-400">Basic → Advanced → AI Agentic</span>
            </div>

            {filteredDomains.length === 0 ? (
              <div className="p-8 text-center bg-white border border-neutral-200 rounded-2xl text-neutral-500 text-xs space-y-2">
                <p className="font-bold text-neutral-800">No matching marketing terms or domains found.</p>
                <p>Try searching for broader terms like "SEO", "Ads", "AI", or "Analytics".</p>
              </div>
            ) : (
              filteredDomains.map((domain) => (
                <div
                  key={domain.id}
                  className="p-5 md:p-6 bg-white border border-neutral-200/90 rounded-2xl space-y-4 shadow-3xs transition-all hover:border-neutral-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{domain.icon}</span>
                        <h4 className="text-base font-sans font-bold text-neutral-900 tracking-tight">
                          {domain.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Basic Terms Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-block">
                      Basic Fundamentals ({domain.basicTerms.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.basicTerms.map((term, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-lg text-xs font-sans text-neutral-800 font-medium transition-all"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Terms Grid */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-block">
                      Advanced &amp; Enterprise ({domain.advancedTerms.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.advancedTerms.map((term, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-150 rounded-lg text-xs font-sans text-neutral-900 font-semibold transition-all"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Special Sections (e.g. On-Page, Keyword Architecture, Technical SEO) */}
                  {domain.specialSection && (
                    <div className="space-y-3 pt-2 border-t border-neutral-100">
                      {domain.specialSection.map((sec, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <span className="text-[10px] font-mono font-extrabold text-neutral-400 uppercase tracking-wider block">
                            ↳ {sec.title}:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {sec.items.map((item, itemIdx) => (
                              <span
                                key={itemIdx}
                                className="px-2 py-0.5 bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-md text-[11px] font-sans font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tool Stack Associated */}
                  {domain.tools && domain.tools.length > 0 && (
                    <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 flex-wrap text-xs">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Tools &amp; Platforms:</span>
                      {domain.tools.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-neutral-900 text-white font-mono text-[10px] font-bold rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- MODE 2: RECOMMENDED SKILL-LEVEL ROADMAP (L1 → L5) --- */}
      {activeTabMode === "roadmap" && (
        <div className="p-6 md:p-8 bg-white border border-neutral-200 rounded-3xl space-y-6 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-xl font-sans font-black text-neutral-900 tracking-tight flex items-center gap-2">
              <Layers className="text-emerald-600" size={20} />
              <span>Full-Stack Digital Marketer &amp; AI Specialist Roadmap</span>
            </h2>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-2xl">
              A structured 5-level progression mapping out your growth from entry-level digital marketing concepts to advanced agentic AI architectures and LLM search optimization.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                level: "L1 — Beginner Marketer",
                badge: "LEVEL 1",
                color: "emerald",
                summary: "Digital Marketing Basics, SEO Foundations, Organic Social, Content Writing, Email & Basic Google Search Ads.",
                skills: ["Marketing Funnel & 4Ps", "Keyword Research Basics", "Blog & On-Page SEO", "Basic Social Strategy", "Email Newsletters", "Google Ads Search Setup"]
              },
              {
                level: "L2 — Intermediate Performance Marketer",
                badge: "LEVEL 2",
                color: "teal",
                summary: "Technical SEO Auditing, Meta Ads Advantage+, Google Analytics GA4, CRM Setup, CRO & Automated Email Flows.",
                skills: ["Technical SEO & Core Web Vitals", "Meta Business Manager & CAPI", "GA4 Event Tracking & Funnels", "HubSpot / Salesforce CRM", "CRO A/B Testing", "Lifecycle Email Drips"]
              },
              {
                level: "L3 — Advanced Performance & Growth Lead",
                badge: "LEVEL 3",
                color: "indigo",
                summary: "Multi-Touch Attribution, Workflow Automation, Performance Max Optimization, Data Analytics & Growth Loops.",
                skills: ["Multi-Touch Attribution (MTA)", "n8n / Make Workflow Automation", "Programmatic SEO", "Looker Studio Dashboards", "AARRR Growth Funnel Engine", "Value-Based Bidding"]
              },
              {
                level: "L4 — Expert & Enterprise Director",
                badge: "LEVEL 4",
                color: "amber",
                summary: "Enterprise SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), CDP Architecture & Server-Side GTM.",
                skills: ["GEO & AI Search Citation Share", "Answer Engine Optimization (AEO)", "Server-Side GTM & Consent Mode", "Customer Data Platforms (CDP)", "BigQuery SQL Data Warehousing", "Media Mix Modeling (MMM)"]
              },
              {
                level: "L5 — AI & Agentic Marketing Architect (2026+)",
                badge: "LEVEL 5 (MASTER)",
                color: "purple",
                summary: "Autonomous AI Marketing Agents, RAG Architecture, LLM Optimization, Predictive Analytics & Autonomous Campaigns.",
                skills: ["Autonomous AI Marketing Agents", "RAG & Vector Database Search", "LLM Fine-Tuning & Search Grounding", "AI Decision Systems", "Autonomous PPC Campaign Manager", "Predictive Lead Scoring Engine"]
              }
            ].map((lvl, idx) => (
              <div key={idx} className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/80 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-mono font-black text-xs">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-sans font-extrabold text-neutral-900">{lvl.level}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 bg-neutral-900 text-white text-[9.5px] font-mono font-black uppercase rounded tracking-wider self-start sm:self-auto">
                    {lvl.badge}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {lvl.summary}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Key Competencies Required:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lvl.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 bg-white border border-neutral-250 text-neutral-800 rounded-lg text-xs font-sans font-semibold flex items-center gap-1 shadow-3xs">
                        <Check size={12} className="text-emerald-600 font-bold" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODE 3: INTERACTIVE SKILL MASTERY TEST / QUIZ --- */}
      {activeTabMode === "test" && (
        <div className="p-6 md:p-8 bg-white border border-neutral-200 rounded-3xl space-y-6 shadow-xs max-w-2xl mx-auto" id="taxonomy-test-container">
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest block">
                    TAXONOMY MASTERY TEST
                  </span>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-900">
                    Question {currentQuizIndex + 1} of {TAXONOMY_QUIZ_QUESTIONS.length}
                  </h3>
                </div>
                <div className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono font-bold rounded-xl">
                  Score: {quizScore} / {TAXONOMY_QUIZ_QUESTIONS.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-neutral-900 h-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / TAXONOMY_QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Text */}
              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
                <p className="text-sm font-sans font-bold text-neutral-900 leading-relaxed">
                  {TAXONOMY_QUIZ_QUESTIONS[currentQuizIndex].question}
                </p>

                <div className="space-y-2">
                  {TAXONOMY_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === TAXONOMY_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;

                    let btnStyle = "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-100";
                    if (isAnswerSubmitted) {
                      if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                      else if (isSelected) btnStyle = "bg-red-50 border-red-300 text-red-900";
                      else btnStyle = "bg-white border-neutral-150 opacity-50";
                    } else if (isSelected) {
                      btnStyle = "bg-neutral-900 border-neutral-900 text-white font-bold";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && isCorrect && <CheckCircle size={16} className="text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation after submission */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-1 text-xs text-indigo-950 font-sans">
                  <span className="font-extrabold uppercase font-mono text-[9.5px] text-indigo-700 block">Explanation:</span>
                  <p className="leading-relaxed">{TAXONOMY_QUIZ_QUESTIONS[currentQuizIndex].explanation}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleAnswerSubmit}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{currentQuizIndex + 1 < TAXONOMY_QUIZ_QUESTIONS.length ? "Next Question" : "View Results"}</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-md animate-bounce">
                🏆
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-sans font-black text-neutral-900">Taxonomy Test Completed!</h3>
                <p className="text-xs text-neutral-500 font-sans font-medium">
                  You scored <strong className="text-neutral-900">{quizScore} / {TAXONOMY_QUIZ_QUESTIONS.length}</strong> on the Digital Marketing Taxonomy Knowledge Check!
                </p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs font-mono font-bold text-neutral-700 inline-block">
                Total XP Earned: +{quizScore * 20} XP
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-bold rounded-xl transition-all shadow-3xs cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw size={13} />
                  <span>Retake Test</span>
                </button>

                <button
                  onClick={() => setActiveTabMode("domains")}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Return to Glossary
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TERM DETAILS MODAL --- */}
      <AnimatePresence>
        {activeModalTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setActiveModalTerm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative space-y-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[9.5px] font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {activeModalTerm.category}
                  </span>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-900 pt-1">
                    {activeModalTerm.term}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalTerm(null)}
                  className="text-neutral-400 hover:text-neutral-700 font-bold text-base p-1"
                >
                  ✕
                </button>
              </div>

              {/* Definition */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Plain-English Definition:</span>
                <p className="text-xs text-neutral-800 leading-relaxed font-sans font-medium bg-neutral-50 p-3.5 rounded-2xl border border-neutral-150">
                  {activeModalTerm.definition}
                </p>
              </div>

              {/* Real World Example */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Real-World Marketing Execution:</span>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80">
                  💡 {activeModalTerm.example}
                </p>
              </div>

              {/* KPI Impact */}
              {activeModalTerm.kpiImpact && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900 font-bold font-sans">
                  <Trophy size={16} className="text-emerald-600 shrink-0" />
                  <span>Expected Growth Outcome: {activeModalTerm.kpiImpact}</span>
                </div>
              )}

              {/* Associated Tools */}
              {activeModalTerm.tools && activeModalTerm.tools.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Associated Tool Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalTerm.tools.map((tool, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-neutral-900 text-white font-mono text-[10.5px] font-bold rounded-lg">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleMastered(activeModalTerm.id);
                  }}
                  className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    masteredTerms.includes(activeModalTerm.id)
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-md"
                  }`}
                >
                  <CheckCircle size={14} />
                  <span>{masteredTerms.includes(activeModalTerm.id) ? "Mastered Term ✓" : "Mark as Mastered (+15 XP)"}</span>
                </button>

                <button
                  onClick={() => setActiveModalTerm(null)}
                  className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-2xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
