/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Network, Layers, Cpu, Globe, ArrowRight, CheckCircle2, 
  Sparkles, Zap, Shield, Eye, Database, Code2, BarChart2,
  Share2, Compass, AlertCircle, Info, RefreshCw
} from "lucide-react";

export default function VisualSearchDiagrams() {
  const [activeDiagram, setActiveDiagram] = useState<"pipeline" | "silo" | "geo" | "cwv">("pipeline");
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="space-y-6 animate-fade-in" id="visual-search-diagrams">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500 text-neutral-950 text-[10px] font-mono font-black uppercase rounded tracking-wider">
                INTERACTIVE ARCHITECTURE
              </span>
              <span className="text-xs text-neutral-400 font-mono">Visual Schematics &amp; Blueprints</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-white">
              Search Engine Systems &amp; AI Retrieval Visualizer
            </h2>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Explore concrete architectural mental models of modern search engine pipelines, semantic silo link graphs, Core Web Vitals thresholds, and Generative Engine Optimization (GEO).
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block w-full md:w-auto">
              DIAGRAM SELECTION:
            </span>
          </div>
        </div>

        {/* Diagram Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-6 border-t border-neutral-800">
          {[
            { id: "pipeline", label: "Search Engine Pipeline", subtitle: "Crawl → Render → Index → Rank", icon: <Globe size={15} /> },
            { id: "silo", label: "Semantic Silo Craft", subtitle: "Hub & Spoke Internal Link Silo", icon: <Network size={15} /> },
            { id: "geo", label: "GEO & LLM RAG Flow", subtitle: "Generative Answer Retrieval", icon: <Sparkles size={15} /> },
            { id: "cwv", label: "Core Web Vitals 2026", subtitle: "LCP, INP, CLS & TTFB Gauges", icon: <Zap size={15} /> },
          ].map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setActiveDiagram(d.id as any);
                setActiveStep(0);
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeDiagram === d.id
                  ? "bg-white text-neutral-950 border-white shadow-md font-bold"
                  : "bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={activeDiagram === d.id ? "text-emerald-600" : "text-neutral-400"}>
                  {d.icon}
                </span>
                <span className="text-xs font-sans font-black truncate">{d.label}</span>
              </div>
              <p className={`text-[10px] font-mono leading-tight truncate ${
                activeDiagram === d.id ? "text-neutral-600" : "text-neutral-400"
              }`}>
                {d.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* DIAGRAM 1: SEARCH PIPELINE */}
      {activeDiagram === "pipeline" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              ARCHITECTURE SCHEMATIC 01
            </span>
            <h3 className="text-lg sm:text-xl font-sans font-black text-neutral-900 dark:text-white tracking-tight">
              5-Stage Search Engine Retrieval &amp; Generation Pipeline
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
              Click each stage to explore how Googlebot &amp; modern search indexers discover, process, and score documents.
            </p>
          </div>

          {/* Interactive Pipeline Steps Horizontal Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: 1, title: "1. Crawling", desc: "Spider bot discovery via sitemaps & links", icon: "🕷️", tag: "Discovery" },
              { num: 2, title: "2. Rendering", desc: "Headless Chrome JS execution & DOM build", icon: "⚡", tag: "WRS Render" },
              { num: 3, title: "3. Indexing", desc: "Inverted index & entity knowledge mapping", icon: "📚", tag: "Document Store" },
              { num: 4, title: "4. Algorithmic Ranking", desc: "E-E-A-T, Twiddlers & Vector scoring", icon: "🏆", tag: "Scoring" },
              { num: 5, title: "5. LLM Synthesis", desc: "AI Overview synthesis & cited quotes", icon: "🤖", tag: "GEO Answer" },
            ].map((step, idx) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  activeStep === idx
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-md scale-[1.02]"
                    : "bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <span className={`text-[8.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    activeStep === idx 
                      ? "bg-emerald-500 text-neutral-950" 
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                  }`}>
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-xs font-sans font-black tracking-tight">{step.title}</h4>
                <p className={`text-[10px] mt-1 font-sans leading-tight ${
                  activeStep === idx ? "text-neutral-300 dark:text-neutral-700" : "text-neutral-500 dark:text-neutral-400"
                }`}>
                  {step.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Selected Step Deep Dive */}
          <div className="p-6 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/80 rounded-2xl space-y-4">
            {activeStep === 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🕷️</span>
                  <h4 className="font-sans font-black text-sm text-neutral-900 dark:text-white">
                    Stage 1: Crawl Budget Management &amp; Spider Bot Discovery
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Googlebot and PerplexityBot fetch URLs discovered through XML sitemaps, internal hyperlinks, and server redirects. Websites must avoid crawl traps (faceted navigation without canonicals, infinite calendar parameters) and provide fast server responses (HTTP 200, low TTFB).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Key Directives</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">Robots.txt, Sitemap.xml, HTTP 301, 404, 410</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Audit Tools</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">Server Log Files, GSC Crawl Stats, Screaming Frog</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Critical Failure Mode</span>
                    <p className="text-xs font-sans font-semibold text-red-600 dark:text-red-400">Accidental Noindex or Disallow in robots.txt</p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <h4 className="font-sans font-black text-sm text-neutral-900 dark:text-white">
                    Stage 2: Web Rendering Service (WRS) &amp; JavaScript Execution
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Unlike traditional HTML-only scrapers, modern Googlebot queues pages in the Web Rendering Service (WRS). Headless Chromium downloads CSS, renders JavaScript client frameworks (React, Vue, Next.js), and computes final DOM layout before indexing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Recommended Stack</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">SSR, SSG, Static HTML Hydration</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Audit Protocol</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">GSC URL Inspection &gt; View Tested Page DOM</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Critical Failure Mode</span>
                    <p className="text-xs font-sans font-semibold text-amber-600 dark:text-amber-400">Blank content due to blocked JS bundles or API calls</p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <h4 className="font-sans font-black text-sm text-neutral-900 dark:text-white">
                    Stage 3: The Inverted Index &amp; Entity Knowledge Base
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Words, semantic concepts, and structured JSON-LD data are parsed into the inverted index. Search engines resolve ambiguous queries by matching entities against the Google Knowledge Graph and vector similarity indexes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Data Layer</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">Schema.org JSON-LD, Wikidata IDs, Entity Graph</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Semantic Signals</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">sameAs links, Article Author, Organization</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Critical Failure Mode</span>
                    <p className="text-xs font-sans font-semibold text-red-600 dark:text-red-400">Cannibalized URLs or missing schema validation</p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <h4 className="font-sans font-black text-sm text-neutral-900 dark:text-white">
                    Stage 4: Algorithmic Scoring &amp; E-E-A-T Re-Ranking
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Hundreds of algorithmic signals score candidate documents: PageRank link authority, topical relevance, query intent matching, user satisfaction engagement, and Core Web Vitals performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Ranking Factors</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">E-E-A-T, Backlink Authority, Topic Depth</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">UX Guardrails</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">INP (&lt;200ms), LCP (&lt;2.5s), HTTPS Security</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Winning Strategy</span>
                    <p className="text-xs font-sans font-semibold text-emerald-600 dark:text-emerald-400">Comprehensive topical authority + genuine first-hand proof</p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <h4 className="font-sans font-black text-sm text-neutral-900 dark:text-white">
                    Stage 5: Generative Engine Optimization (GEO) &amp; LLM Citations
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Search Overviews in Google, ChatGPT Search, and Perplexity ingest top-ranking candidate documents into their retrieval augmented generation (RAG) context window, synthesizing direct answers and attributing citations with brand links.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Citation Triggers</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">Direct statistical answers, concise definitions, comparison tables</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Format Optimization</span>
                    <p className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200">Bullet points, high semantic density, named entity anchors</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block mb-1">Conversion Target</span>
                    <p className="text-xs font-sans font-semibold text-purple-600 dark:text-purple-400">Footnote citation cards &amp; source recommendation links</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DIAGRAM 2: SILO ARCHITECTURE */}
      {activeDiagram === "silo" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              ARCHITECTURE SCHEMATIC 02
            </span>
            <h3 className="text-lg sm:text-xl font-sans font-black text-neutral-900 dark:text-white tracking-tight">
              Semantic Topic Cluster &amp; Hub-Spoke Silo Architecture
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
              Strict internal linking prevents authority dissipation and builds airtight topical relevance.
            </p>
          </div>

          {/* Visual Silo Tree Structure */}
          <div className="p-6 bg-neutral-50 dark:bg-neutral-850 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
            
            {/* Top Level: Pillar Hub */}
            <div className="max-w-md mx-auto p-4 bg-emerald-600 text-white rounded-2xl text-center shadow-md space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest bg-emerald-700 px-2 py-0.5 rounded font-bold">
                TIER 1 • MASTER PILLAR PAGE
              </span>
              <h4 className="text-sm font-sans font-black">"Complete Guide to Technical SEO"</h4>
              <p className="text-[10px] text-emerald-100 font-mono">Targets broad high-volume keyword • Passes PageRank downwards</p>
            </div>

            {/* Connecting Vertical Link */}
            <div className="w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700 mx-auto"></div>

            {/* Middle Level: Thematic Sub-Clusters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Crawl Budget & Server Logs", role: "Sub-Topic Silo A", link: "↔ Links up to Pillar & laterally inside Silo A only" },
                { title: "Core Web Vitals & Speed", role: "Sub-Topic Silo B", link: "↔ Links up to Pillar & laterally inside Silo B only" },
                { title: "Schema & JSON-LD Markup", role: "Sub-Topic Silo C", link: "↔ Links up to Pillar & laterally inside Silo C only" },
              ].map(sub => (
                <div key={sub.title} className="p-4 bg-white dark:bg-neutral-900 border-2 border-blue-400/40 dark:border-blue-500/40 rounded-2xl text-center shadow-3xs space-y-1">
                  <span className="text-[8.5px] font-mono uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-black">
                    {sub.role}
                  </span>
                  <h5 className="text-xs font-sans font-black text-neutral-900 dark:text-white">{sub.title}</h5>
                  <p className="text-[9.5px] text-neutral-500 dark:text-neutral-400 font-mono leading-tight">{sub.link}</p>
                </div>
              ))}
            </div>

            {/* Connecting Vertical Links */}
            <div className="grid grid-cols-3 gap-3">
              <div className="w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700 mx-auto"></div>
              <div className="w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700 mx-auto"></div>
              <div className="w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700 mx-auto"></div>
            </div>

            {/* Bottom Level: Deep Supporting Content */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center text-[10px] font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                • 404 vs 410 Header Protocols<br/>• Robots.txt Disallow Syntax<br/>• Canonical URL Edge Cases
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center text-[10px] font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                • INP JavaScript Optimization<br/>• LCP Image Preload Headers<br/>• Layout Shift CSS Containment
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center text-[10px] font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                • Organization Schema sameAs<br/>• Product Offer Schema<br/>• FAQPage Rich Snippet Rules
              </div>
            </div>

          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 dark:text-emerald-200 font-sans">
              <b>Golden Silo Rule:</b> Pages within Silo A should never link directly into Silo B without passing through the master Pillar page or a contextual breadcrumb. This prevents semantic bleed and keeps Google's topical vectors crystal clear.
            </p>
          </div>
        </div>
      )}

      {/* DIAGRAM 3: GEO & RAG FLOW */}
      {activeDiagram === "geo" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              ARCHITECTURE SCHEMATIC 03
            </span>
            <h3 className="text-lg sm:text-xl font-sans font-black text-neutral-900 dark:text-white tracking-tight">
              Generative Engine Optimization (GEO) &amp; LLM Retrieval Flow
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
              How Perplexity, Gemini, and ChatGPT Search extract content, synthesize responses, and attribute citations.
            </p>
          </div>

          {/* Sequential GEO Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Dense Vector Search",
                desc: "User query is converted into high-dimensional vector embeddings, matching top passage chunks across web indices.",
                icon: "🔍",
                tag: "Embedding Match"
              },
              {
                step: "02",
                title: "Context Window Injection",
                desc: "Top 5-10 passage chunks are injected into the LLM system prompt context window as grounded facts.",
                icon: "📥",
                tag: "RAG Injection"
              },
              {
                step: "03",
                title: "Answer Synthesis",
                desc: "LLM extracts direct facts, statistical proofs, and definitions, drafting the natural language answer.",
                icon: "🧠",
                tag: "Model Inference"
              },
              {
                step: "04",
                title: "Citation Attribution",
                desc: "Footnote link cards are generated for highest-scoring domain authorities with clear anchor text.",
                icon: "🔗",
                tag: "Brand Clickthrough"
              },
            ].map(col => (
              <div key={col.step} className="p-5 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/80 rounded-2xl flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400">{col.step}</span>
                    <span className="text-xl">{col.icon}</span>
                  </div>
                  <h4 className="text-xs font-sans font-black text-neutral-900 dark:text-white">{col.title}</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">{col.desc}</p>
                </div>
                <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-700 inline-block w-fit">
                  {col.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-50 via-indigo-50/40 to-purple-50 dark:from-purple-950/30 dark:via-neutral-900 dark:to-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-2xl space-y-2">
            <h4 className="text-xs font-sans font-black text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles size={14} className="text-purple-600" />
              <span>3 Core Levers to Win GEO Citations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-700 dark:text-neutral-300 font-sans pt-1">
              <div>
                <b>1. Statistical Proofs:</b> LLMs cite sources that offer definitive percentages, measurements, and numerical benchmarks.
              </div>
              <div>
                <b>2. Comparison Tables:</b> Clean Markdown tables comparing entities (Features, Pricing, Pros/Cons) get quoted verbatim.
              </div>
              <div>
                <b>3. Entity Quotability:</b> Open every section with an unambiguous 2-sentence definition answering the target query.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 4: CORE WEB VITALS GAUGES */}
      {activeDiagram === "cwv" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              ARCHITECTURE SCHEMATIC 04
            </span>
            <h3 className="text-lg sm:text-xl font-sans font-black text-neutral-900 dark:text-white tracking-tight">
              Core Web Vitals (CWV) 2026 Diagnostic Standards
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
              Official 75th percentile thresholds enforced across Chrome User Experience (CrUX) reports.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                metric: "LCP",
                name: "Largest Contentful Paint",
                target: "≤ 2.5s",
                status: "Good",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
                description: "Measures perceived loading speed. Marks when main hero image or text block finishes rendering.",
                tactics: "Preload hero WebP, compress server TTFB, remove render-blocking CSS."
              },
              {
                metric: "INP",
                name: "Interaction to Next Paint",
                target: "≤ 200ms",
                status: "Good",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
                description: "Measures overall UI responsiveness to user clicks, taps, and keypresses across entire page lifecycle.",
                tactics: "Break up long JavaScript tasks (>50ms), yield main thread with requestAnimationFrame."
              },
              {
                metric: "CLS",
                name: "Cumulative Layout Shift",
                target: "≤ 0.1",
                status: "Good",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
                description: "Measures visual layout stability. Prevents sudden content jumps as images and ads load asynchronously.",
                tactics: "Explicit width/height on images & iframes, reserve space for dynamic ads."
              },
              {
                metric: "TTFB",
                name: "Time to First Byte",
                target: "≤ 800ms",
                status: "Target",
                color: "text-sky-600 dark:text-sky-400",
                bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800",
                description: "Measures initial server and network response latency before any browser byte processing.",
                tactics: "Deploy Cloudflare edge caching, CDN DNS routing, Redis query cache."
              },
            ].map(item => (
              <div key={item.metric} className={`p-5 rounded-2xl border ${item.bg} flex flex-col justify-between space-y-3`}>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-black text-neutral-900 dark:text-white">{item.metric}</span>
                    <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white dark:bg-neutral-900 shadow-3xs ${item.color}`}>
                      {item.target}
                    </span>
                  </div>
                  <h4 className="text-xs font-sans font-bold text-neutral-800 dark:text-neutral-200">{item.name}</h4>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                  <span className="text-[9.5px] font-mono font-bold uppercase text-neutral-400 block mb-0.5">Optimization:</span>
                  <p className="text-[10.5px] font-sans font-medium text-neutral-700 dark:text-neutral-300">{item.tactics}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
