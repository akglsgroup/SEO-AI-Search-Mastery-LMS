/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Network, 
  Layers, 
  Code, 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Info, 
  Sparkles, 
  Bot, 
  Globe, 
  Compass, 
  Sliders, 
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VisualLearningLabProps {
  onNavigateToLevel?: (levelId: number | string) => void;
  onNavigateToQuiz?: (levelId?: number | string) => void;
}

export default function VisualLearningLab({
  onNavigateToLevel,
  onNavigateToQuiz
}: VisualLearningLabProps) {
  const [activeModel, setActiveModel] = useState<"pipeline" | "silos" | "schema" | "vitals">("pipeline");
  const [pipelineMode, setPipelineMode] = useState<"rag" | "traditional">("rag");
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedSchemaEntity, setSelectedSchemaEntity] = useState<"organization" | "article" | "author" | "product">("article");
  const [siloFlowMode, setSiloFlowMode] = useState<"optimal" | "leakage">("optimal");
  const [simulatedLatency, setSimulatedLatency] = useState<number>(180);

  // Schema code samples
  const SCHEMA_CODES: Record<string, string> = {
    article: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "2026 Generative Engine Optimization (GEO) Framework",
      "description": "How to structure technical content for retrieval-augmented generation and AI search engines.",
      "image": "https://example.com/images/geo-architecture-2026.png",
      "datePublished": "2026-03-15T08:00:00+00:00",
      "dateModified": "2026-10-01T12:00:00+00:00",
      "author": {
        "@type": "Person",
        "name": "Alex Mercer",
        "jobTitle": "Principal Search Architect",
        "url": "https://example.com/authors/alex-mercer",
        "sameAs": ["https://www.wikidata.org/wiki/Q115862849", "https://linkedin.com/in/alexmercer"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Search Architecture Institute",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://example.com/articles/geo-framework-2026"
      }
    }, null, 2),
    organization: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Global Search Analytics Corp",
      "url": "https://example.com",
      "logo": "https://example.com/brand-logo.svg",
      "sameAs": [
        "https://twitter.com/globalsearch",
        "https://www.linkedin.com/company/global-search-corp",
        "https://www.wikidata.org/wiki/Q98765432"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-0199",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish"]
      }
    }, null, 2),
    author: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dr. Elena Rostova",
      "jobTitle": "Head of Technical SEO & AI Search",
      "worksFor": {
        "@type": "Organization",
        "name": "Search Engineering Lab"
      },
      "alumniOf": "Stanford University",
      "knowsAbout": [
        "Information Retrieval",
        "Generative Engine Optimization",
        "JSON-LD Schema Engineering",
        "Core Web Vitals"
      ],
      "sameAs": [
        "https://scholar.google.com/citations?user=xyz",
        "https://linkedin.com/in/elena-rostova"
      ]
    }, null, 2),
    product: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Enterprise SEO Crawler Pro",
      "image": "https://example.com/crawler-box.png",
      "description": "High-throughput serverless crawler verifying 1M+ URLs for index parity and schema compliance.",
      "brand": {
        "@type": "Brand",
        "name": "ApexTools"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/products/crawler-pro",
        "priceCurrency": "USD",
        "price": "199.00",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "142"
      }
    }, null, 2)
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SCHEMA_CODES[selectedSchemaEntity]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Pipeline step data
  const PIPELINE_STEPS = pipelineMode === "rag" ? [
    {
      step: 1,
      title: "1. Headless Bot Discovery & Token Fetch",
      engine: "Google-Extended / PerplexityBot / GPTBot",
      description: "AI bots fetch your raw markdown or rendered DOM. Bots prioritize lightweight static HTML and clean semantic markup without client-side hydration traps.",
      bottleneck: "Heavy JavaScript frameworks hiding text behind user clicks (tab accordions, client fetch on mount).",
      ruleOfThumb: "Server-side render (SSR) or pre-render all critical content into semantic HTML5 tags.",
      targetLevelId: 13
    },
    {
      step: 2,
      title: "2. Block Chunking & Entity Parsing",
      engine: "Vector Ingestion & Sentence Transformer",
      description: "Text is partitioned into 250–500 token semantic chunks. The chunking algorithm checks heading hierarchy (H1 -> H2 -> H3) and metadata tags to define boundary context.",
      bottleneck: "Vague generic headings like 'Overview' or 'More Info' that lose semantic meaning when isolated into chunk vectors.",
      ruleOfThumb: "Write self-contained headings answering questions: e.g. 'How Core Web Vitals INP Impacts E-Commerce Conversions'.",
      targetLevelId: 1001
    },
    {
      step: 3,
      title: "3. Dense Vector Embeddings & Knowledge Graph",
      engine: "768-dim / 1536-dim Embedding Space (e.g. Gemini / ada-002)",
      description: "Chunks are mapped into high-dimensional semantic vector coordinates. Your brand's entity mentions and Wikidata IDs are matched against the LLM's world model.",
      bottleneck: "Ambiguous company or product names lacking clear Organization schema or Wikipedia disambiguation.",
      ruleOfThumb: "Connect your entity to Wikidata and authoritative industry publications with JSON-LD sameAs properties.",
      targetLevelId: 4
    },
    {
      step: 4,
      title: "4. Neural Reranking & Information Gain Scoring",
      engine: "Cross-Encoder Reranker + E-E-A-T Classifier",
      description: "When a user asks a complex multi-step question, the search engine ranks chunk candidates by freshness, author consensus, primary data, and information gain.",
      bottleneck: "Regurgitated AI content with zero original statistics, unverified assertions, or missing first-hand experience.",
      ruleOfThumb: "Publish original proprietary benchmarks, case metrics, and verifiable author credentials on every piece.",
      targetLevelId: 5
    },
    {
      step: 5,
      title: "5. Generative Synthesis & AI Citation Footprint",
      engine: "Google AI Overviews / ChatGPT Search / Perplexity Answer",
      description: "The top 3–5 verified chunks are synthesized into direct paragraph answers, with clickable citation cards displayed prominently above organic results.",
      bottleneck: "Bloated prose without direct answers in the first 40–60 words of each content section.",
      ruleOfThumb: "Lead every H2 section with a concise, direct definition answering the core search intent immediately.",
      targetLevelId: 14
    }
  ] : [
    {
      step: 1,
      title: "1. Discovery & Crawl Budget Allocation",
      engine: "Googlebot Web & Smartphone Crawler",
      description: "Googlebot discovers URLs via XML sitemaps, RSS feeds, and external backlinks. Crawl rate is determined by server response times and domain authority.",
      bottleneck: "Infinite redirect loops, 504 server timeouts, or orphan pages missing from the internal navigation.",
      ruleOfThumb: "Keep server response times (TTFB) under 200ms and audit server access logs weekly.",
      targetLevelId: 3
    },
    {
      step: 2,
      title: "2. Two-Wave Rendering & JavaScript Processing",
      engine: "Headless Chromium Rendering Service (WRS)",
      description: "Wave 1 parses initial server HTML. If client-side JavaScript is detected, the URL enters a render queue until Google has compute resources to execute scripts.",
      bottleneck: "Render delays taking days or weeks for client-rendered Single Page Applications (SPAs).",
      ruleOfThumb: "Use Next.js / Astro / static SSG generation so bots receive 100% complete content on the first HTTP byte.",
      targetLevelId: 23
    },
    {
      step: 3,
      title: "3. Inverted Index Tokenization & PageRank Graph",
      engine: "Google Inverted Index (Caffeine / Alexandria)",
      description: "Text is tokenized, stop words are filtered, and words are mapped to document IDs in the inverted index. Link equity is calculated via modern PageRank damping algorithms.",
      bottleneck: "Keyword cannibalization across multiple thin duplicate URLs diluting link authority.",
      ruleOfThumb: "Consolidate near-duplicate pages with canonical tags or 301 redirects to maintain single-page authority.",
      targetLevelId: 8
    },
    {
      step: 4,
      title: "4. Query Intent Matching & Algorithmic Scoring",
      engine: "RankBrain, MUM, BERT & Helpful Content Systems",
      description: "Search algorithms analyze user query intent, location, device, and historical click patterns (NavBoost) to rank documents from billions of indexed pages.",
      bottleneck: "Missing long-tail semantic variants and poor user engagement signals (high bounce rates).",
      ruleOfThumb: "Satisfy query intent completely so users never need to pogo-stick back to the search results.",
      targetLevelId: 1002
    },
    {
      step: 5,
      title: "5. SERP Presentation & Rich Snippet Snippeting",
      engine: "Standard SERP + Rich Snippet Extraction Pipeline",
      description: "Google displays title tags, meta descriptions, site favicons, breadcrumb hierarchies, and rich snippets (star ratings, FAQs, product pricing).",
      bottleneck: "Truncated 70+ character title tags or missing JSON-LD schema disqualifying rich badges.",
      ruleOfThumb: "Keep desktop titles between 50–60 characters (max 600px width) and author complete schema.",
      targetLevelId: 6
    }
  ];

  // Web Vitals calculations
  const getVitalsStatus = (val: number) => {
    if (val <= 200) return { label: "GOOD (PASS)", color: "text-emerald-700 bg-emerald-50 border-emerald-200", message: "Your interactive latency is ultra-responsive. Google rewards this with top INP compliance." };
    if (val <= 500) return { label: "NEEDS WORK", color: "text-amber-700 bg-amber-50 border-amber-200", message: "Long JavaScript tasks are delaying UI updates. Users may feel hesitation on button clicks." };
    return { label: "POOR (FAIL)", color: "text-rose-700 bg-rose-50 border-rose-200", message: "Severe UI blocking. Main thread is locked over 500ms, triggering Search Console Core Web Vitals warnings." };
  };

  const vitalsStatus = getVitalsStatus(simulatedLatency);

  return (
    <div className="space-y-6">
      
      {/* Visual Lab Navigation Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Sparkles size={14} />
              <span>Interactive Mental Models & Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Visual Learning Lab
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              Complex search architecture is easiest to master through visual diagrams. Interact with real-world mental models below to understand crawling pipelines, topic silos, entity graphs, and 2026 Core Web Vitals.
            </p>
          </div>

          {/* Model Switcher Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-800/80 rounded-2xl border border-neutral-700/60 shrink-0 self-start lg:self-center">
            <button
              onClick={() => setActiveModel("pipeline")}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModel === "pipeline" 
                  ? "bg-white text-neutral-900 shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Cpu size={14} />
              <span>Search & AI Pipeline</span>
            </button>
            <button
              onClick={() => setActiveModel("silos")}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModel === "silos" 
                  ? "bg-white text-neutral-900 shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers size={14} />
              <span>Topic Silos Architecture</span>
            </button>
            <button
              onClick={() => setActiveModel("schema")}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModel === "schema" 
                  ? "bg-white text-neutral-900 shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Code size={14} />
              <span>Schema Entity Graph</span>
            </button>
            <button
              onClick={() => setActiveModel("vitals")}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModel === "vitals" 
                  ? "bg-white text-neutral-900 shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Zap size={14} />
              <span>Core Web Vitals Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODEL 1: SEARCH & AI RAG PIPELINE */}
      {activeModel === "pipeline" && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
                <span>Architecture Diagram</span>
                <span>·</span>
                <span>Click any stage for diagnostics</span>
              </div>
              <h3 className="text-xl font-sans font-extrabold text-neutral-900 mt-1">
                {pipelineMode === "rag" ? "Generative Engine Optimization (GEO) & RAG Pipeline" : "Traditional Googlebot Crawl, Index & Rank Pipeline"}
              </h3>
            </div>

            {/* Pipeline Mode Switch */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                onClick={() => { setPipelineMode("rag"); setSelectedPipelineStep(0); }}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  pipelineMode === "rag" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Bot size={13} className="text-purple-600" />
                <span>2026 AI / RAG Model</span>
              </button>
              <button
                onClick={() => { setPipelineMode("traditional"); setSelectedPipelineStep(0); }}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  pipelineMode === "traditional" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Globe size={13} className="text-blue-600" />
                <span>Traditional Googlebot</span>
              </button>
            </div>
          </div>

          {/* Interactive Step Timeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {PIPELINE_STEPS.map((s, idx) => {
              const isSelected = selectedPipelineStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setSelectedPipelineStep(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                    isSelected
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm scale-[1.02]"
                      : "bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                      isSelected ? "text-emerald-400" : "text-neutral-500"
                    }`}>
                      Stage 0{s.step}
                    </span>
                    <h4 className="text-xs font-sans font-extrabold leading-snug line-clamp-2">
                      {s.title.replace(/^\d+\.\s*/, "")}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? "text-neutral-300" : "text-neutral-500"}>
                      {isSelected ? "Inspecting" : "Click to view"}
                    </span>
                    <ArrowRight size={12} className={isSelected ? "text-emerald-400" : "text-neutral-400"} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          {PIPELINE_STEPS[selectedPipelineStep] && (
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold">
                    <span>Engine: {PIPELINE_STEPS[selectedPipelineStep].engine}</span>
                  </div>
                  <h4 className="text-lg font-sans font-black text-neutral-900">
                    {PIPELINE_STEPS[selectedPipelineStep].title}
                  </h4>
                </div>

                {onNavigateToLevel && (
                  <button
                    onClick={() => onNavigateToLevel(PIPELINE_STEPS[selectedPipelineStep].targetLevelId)}
                    className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <span>Practice in Module {PIPELINE_STEPS[selectedPipelineStep].targetLevelId}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {PIPELINE_STEPS[selectedPipelineStep].description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200/80">
                <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-rose-800">
                    <AlertTriangle size={14} className="text-rose-600 shrink-0" />
                    <span>Common Failure Trap / Bottleneck:</span>
                  </div>
                  <p className="text-xs text-rose-900/90 leading-relaxed">
                    {PIPELINE_STEPS[selectedPipelineStep].bottleneck}
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-800">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>2026 Golden Rule of Thumb:</span>
                  </div>
                  <p className="text-xs text-emerald-900/90 leading-relaxed">
                    {PIPELINE_STEPS[selectedPipelineStep].ruleOfThumb}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODEL 2: TOPIC SILOS & INTERNAL LINK ARCHITECTURE */}
      {activeModel === "silos" && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
                <span>Information Architecture</span>
                <span>·</span>
                <span>Hub & Spoke Topical Authority Model</span>
              </div>
              <h3 className="text-xl font-sans font-extrabold text-neutral-900 mt-1">
                Thematic Topic Silos & Link Equity Flow
              </h3>
            </div>

            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setSiloFlowMode("optimal")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  siloFlowMode === "optimal" ? "bg-white text-emerald-800 shadow-2xs font-extrabold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Strict Silos (Topical Focus)</span>
              </button>
              <button
                onClick={() => setSiloFlowMode("leakage")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  siloFlowMode === "leakage" ? "bg-white text-rose-800 shadow-2xs font-extrabold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <AlertTriangle size={13} className="text-rose-600" />
                <span>Authority Leakage (Anti-Pattern)</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual Hierarchy Tree */}
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-6">
            
            {/* Top-Level Pillar Node */}
            <div className="flex flex-col items-center">
              <div className="px-5 py-3.5 bg-neutral-900 text-white rounded-2xl border border-neutral-700 shadow-md text-center max-w-sm w-full">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Pillar Page (Top-Level Commercial Hub)
                </span>
                <span className="text-sm font-sans font-extrabold block mt-0.5">
                  /enterprise-seo-services/
                </span>
                <span className="text-[11px] text-neutral-300 font-sans block mt-1">
                  Broad High-Volume Keyword • Consolidates Authority from all spokes
                </span>
              </div>

              {/* Connecting Link Spine */}
              <div className="h-6 w-0.5 bg-neutral-400 my-1"></div>
            </div>

            {/* Cluster Spokes Layer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Silo 1: Technical SEO */}
              <div className={`p-4 rounded-2xl border transition-all ${
                siloFlowMode === "optimal" 
                  ? "bg-white border-blue-200 shadow-3xs" 
                  : "bg-white border-rose-200"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Silo Cluster A</span>
                  <span className="text-[10px] font-mono text-neutral-400">Bidirectional Links</span>
                </div>
                <h5 className="text-xs font-sans font-extrabold text-neutral-900 mt-1">
                  /enterprise-seo/technical-audit/
                </h5>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>/core-web-vitals-guide/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>/crawl-budget-optimization/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>/server-log-analysis/</span>
                  </li>
                </ul>

                {siloFlowMode === "leakage" && (
                  <div className="mt-3 p-2 bg-rose-50 text-rose-800 rounded-lg text-[10px] font-mono border border-rose-200">
                    ⚠️ Random links to E-Commerce Silo dilute topical authority score.
                  </div>
                )}
              </div>

              {/* Silo 2: Semantic Schema */}
              <div className={`p-4 rounded-2xl border transition-all ${
                siloFlowMode === "optimal" 
                  ? "bg-white border-purple-200 shadow-3xs" 
                  : "bg-white border-rose-200"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">Silo Cluster B</span>
                  <span className="text-[10px] font-mono text-neutral-400">Bidirectional Links</span>
                </div>
                <h5 className="text-xs font-sans font-extrabold text-neutral-900 mt-1">
                  /enterprise-seo/schema-markup/
                </h5>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                    <span>/json-ld-organization/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                    <span>/entity-wikidata-graph/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                    <span>/rich-results-validation/</span>
                  </li>
                </ul>

                {siloFlowMode === "leakage" && (
                  <div className="mt-3 p-2 bg-rose-50 text-rose-800 rounded-lg text-[10px] font-mono border border-rose-200">
                    ⚠️ Missing links back to main Pillar causes orphan cluster ranking drop.
                  </div>
                )}
              </div>

              {/* Silo 3: AI & GEO */}
              <div className={`p-4 rounded-2xl border transition-all ${
                siloFlowMode === "optimal" 
                  ? "bg-white border-emerald-200 shadow-3xs" 
                  : "bg-white border-rose-200"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Silo Cluster C</span>
                  <span className="text-[10px] font-mono text-neutral-400">Bidirectional Links</span>
                </div>
                <h5 className="text-xs font-sans font-extrabold text-neutral-900 mt-1">
                  /enterprise-seo/geo-ai-search/
                </h5>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>/rag-content-formatting/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>/ai-overviews-ingestion/</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>/zero-click-aeo-answers/</span>
                  </li>
                </ul>

                {siloFlowMode === "leakage" && (
                  <div className="mt-3 p-2 bg-rose-50 text-rose-800 rounded-lg text-[10px] font-mono border border-rose-200">
                    ⚠️ Competing pages target identical intent keywords (cannibalization).
                  </div>
                )}
              </div>

            </div>

            {/* Explanatory Takeaway */}
            <div className="p-4 bg-white rounded-xl border border-neutral-200 flex items-start gap-3">
              <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-700 leading-relaxed font-sans">
                <span className="font-bold text-neutral-900">Why strict silos dominate Google & AI Search: </span>
                Articles within a cluster must link to each other and up to their parent pillar page using exact semantic anchor text. Never cross-link horizontally between unrelated silos unless contextually essential; doing so dilutes topical entity boundaries.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODEL 3: SCHEMA.ORG ENTITY GRAPH EXPLORER */}
      {activeModel === "schema" && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
                <span>Structured Data</span>
                <span>·</span>
                <span>JSON-LD Machine-Readable Markup</span>
              </div>
              <h3 className="text-xl font-sans font-extrabold text-neutral-900 mt-1">
                Schema Entity Relationship Graph & Code Generator
              </h3>
            </div>

            {/* Entity Selector */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-100 rounded-xl shrink-0">
              <button
                onClick={() => setSelectedSchemaEntity("article")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSchemaEntity === "article" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Article + Author
              </button>
              <button
                onClick={() => setSelectedSchemaEntity("organization")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSchemaEntity === "organization" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Organization
              </button>
              <button
                onClick={() => setSelectedSchemaEntity("author")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSchemaEntity === "author" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Person (E-E-A-T)
              </button>
              <button
                onClick={() => setSelectedSchemaEntity("product")}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSchemaEntity === "product" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Product + Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Node Diagram */}
            <div className="lg:col-span-5 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Knowledge Graph Interconnection
                </span>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  Search engines parse schema as linked data (RDF). By nesting entities, you explicitly tell Google that the author is an verified expert tied to a verified organization and Wikidata entity.
                </p>
              </div>

              {/* Node Relationships */}
              <div className="space-y-3 py-2">
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-3xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-sans font-bold text-neutral-900">WebSite Entity</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">@id: /#website</span>
                </div>

                <div className="flex justify-center -my-1 text-neutral-300">↓</div>

                <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-3xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <span className="text-xs font-sans font-bold text-neutral-900">Organization (Publisher)</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-600">sameAs: Wikidata</span>
                </div>

                <div className="flex justify-center -my-1 text-neutral-300">↓</div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-3xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-sans font-bold text-neutral-900">Person (Author / Expert)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600">E-E-A-T Verified</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 font-sans">
                💡 <span className="font-bold">Rich Snippet Benefit:</span> Eligible for Google Star Ratings, Author Knowledge Cards, and Top Stories carousel carousel.
              </div>
            </div>

            {/* Code Output Panel */}
            <div className="lg:col-span-7 bg-neutral-900 rounded-2xl p-5 border border-neutral-800 text-neutral-200 flex flex-col justify-between gap-4 font-mono">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400">application/ld+json</span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? "Copied JSON-LD" : "Copy Code"}</span>
                </button>
              </div>

              <pre className="text-xs text-emerald-400/90 overflow-x-auto p-2 bg-neutral-950/60 rounded-xl leading-relaxed max-h-72">
                {SCHEMA_CODES[selectedSchemaEntity]}
              </pre>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                <span>Validated against Schema.org 2026</span>
                <span className="text-neutral-500">Google Rich Results Compliant</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODEL 4: CORE WEB VITALS 2026 TELEMETRY GAUGE */}
      {activeModel === "vitals" && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
                <span>Performance Engineering</span>
                <span>·</span>
                <span>Real User Experience Telemetry (CrUX)</span>
              </div>
              <h3 className="text-xl font-sans font-extrabold text-neutral-900 mt-1">
                Core Web Vitals Thresholds & INP Simulator
              </h3>
            </div>
            
            <div className="text-xs font-mono text-neutral-500 shrink-0">
              Target: 75th percentile of page loads
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Metric 1: INP */}
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase">Interaction to Next Paint</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-neutral-200 text-neutral-800 rounded-full">
                  Primary 2026 Metric
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-3xl font-sans font-black text-neutral-900 block">
                  {simulatedLatency} ms
                </span>
                <span className="text-xs text-neutral-600 font-sans block">
                  Good: &lt;200ms • Poor: &gt;500ms
                </span>
              </div>
              <div className={`p-2.5 rounded-xl border text-xs font-sans font-bold ${vitalsStatus.color}`}>
                Status: {vitalsStatus.label}
              </div>
            </div>

            {/* Metric 2: LCP */}
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase">Largest Contentful Paint</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  Loading
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-3xl font-sans font-black text-emerald-600 block">
                  1.6 s
                </span>
                <span className="text-xs text-neutral-600 font-sans block">
                  Good: &lt;2.5s • Poor: &gt;4.0s
                </span>
              </div>
              <div className="p-2.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 text-xs font-sans font-bold">
                Status: PASS (Optimal Hero Preload)
              </div>
            </div>

            {/* Metric 3: CLS */}
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase">Cumulative Layout Shift</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  Visual Stability
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-3xl font-sans font-black text-emerald-600 block">
                  0.02
                </span>
                <span className="text-xs text-neutral-600 font-sans block">
                  Good: &lt;0.1 • Poor: &gt;0.25
                </span>
              </div>
              <div className="p-2.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 text-xs font-sans font-bold">
                Status: PASS (Explicit Dimensions Set)
              </div>
            </div>

          </div>

          {/* Interactive Latency Simulator Slider */}
          <div className="p-6 bg-neutral-900 text-white rounded-2xl border border-neutral-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-sans font-bold text-white">
                  Simulate Interaction Latency (Click to Paint)
                </h4>
                <p className="text-xs text-neutral-400">
                  Drag the slider to test how JavaScript main-thread delays impact Google Search Console status.
                </p>
              </div>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {simulatedLatency} ms
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="900"
              step="10"
              value={simulatedLatency}
              onChange={(e) => setSimulatedLatency(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
              <div className="text-xs font-mono font-bold text-neutral-300">
                {vitalsStatus.message}
              </div>
              <div className="text-[11px] text-neutral-400">
                <span className="text-white font-bold">Fix Protocol: </span>
                Yield to main thread with <code className="text-emerald-300">scheduler.yield()</code> or <code className="text-emerald-300">requestIdleCallback()</code>. Avoid synchronous DOM read/write loops during pointer events.
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
