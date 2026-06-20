/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Level, CustomCourse, ChecklistItem } from "../types";
import { 
  ArrowLeft, CheckSquare, Square, Award, AlertTriangle, Lightbulb, 
  Sparkles, PlusCircle, CheckCircle, HelpCircle, BookOpen, Clock, Tag,
  ChevronDown, ChevronUp, Layers
} from "lucide-react";

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
        category: "Multi-Format Snippet Layout Architecture",
        steps: [
          "Format content specifically for high-frequency snippet types: Paragraph answers, sequential numbered Lists, concise tables, and comparison grids.",
          "Designate simple, clean HTML elements to display statistics summaries, benchmarking figures, and definitive timelines.",
          "Test snippet templates inside Google's Rich Results Testing Console, verifying that Googlebot extracts details error-free."
        ],
        tools: ["Google Rich Results Testing Suite", "W3C Markup Validator", "Screaming Frog SEO Spider"],
        engines: ["Google Direct Desktop Rankers", "Apple Siri Web Scraper"]
      };
    }
    if (titleLower.includes("list optimization (basic)")) {
      return {
        category: "Semantic HTML List Structures",
        steps: [
          "Implement native, clean ordered lists (`<ol>`) for sequential workflows/processes and unordered lists (`<ul>`) for collections of items.",
          "Ensure list elements are constructed exclusively using standard semantic list-item tags (`<li>`), avoiding nested div elements that block extractor algorithms.",
          "Verify CSS layout rules do not reset list margins or block list-style-type bullets across mobile screen displays."
        ],
        tools: ["W3C Source Code Auditor", "Chrome DevTools Elements Panel", "Screaming Frog Structural Checker"],
        engines: ["Googlebot Crawler Core", "Bing Desktop Spider", "Apple Siri Bot"]
      };
    }
    if (titleLower.includes("list optimization (advanced)")) {
      return {
        category: "High-Engagement List Engineering",
        steps: [
          "Structure structured lists like Top 10 lists, Best Practices directories, step-by-step checklists, or priority-based matrices.",
          "Prepend list entries with strong, concise bold titles or active verbs for instant visual scanning.",
          "Insert a table of contents containing jump links mapping directly to each individual list subsection."
        ],
        tools: ["Surfer SEO Optimizer", "MarketMuse Topic Tracker", "SERP Simulator Tool"],
        engines: ["Google Featured Snippets (Lists)", "Alexa Speaker Auditory Feeds"]
      };
    }
    if (titleLower.includes("table optimization (basic)")) {
      return {
        category: "Standard Native Table Layouts",
        steps: [
          "Deploy raw datasets using correct, native HTML tags: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements.",
          "Integrate distinct header cell markup (`<th>`) explicitly declaring columns and rows scope parameters for simplified reading.",
          "Apply mobile overflow containers to table grids to prevent content clipping or scrolling issues on small screen sizes."
        ],
        tools: ["W3C Accessibility Validator", "Chrome DevTools Elements Console", "Lighthouse Quality Inspector"],
        engines: ["Google Knowledge Direct Answers", "Bing Table Extraction Spiders"]
      };
    }
    if (titleLower.includes("table optimization (advanced)")) {
      return {
        category: "Rich Comparison Tables",
        steps: [
          "Build comparative grids detailing product parameters, competitor pricing schedules, features, and direct pros-vs-cons.",
          "Incorporate official, verifiable benchmark figures, statistic points, and verified product performance metrics.",
          "Verify table code layouts align perfectly with standard schema attributes for structured datasets."
        ],
        tools: ["Schema JSON Generator", "Ahrefs Competitor Explorer", "Google Rich Results Tester"],
        engines: ["Google Shopping Core", "Generative Web Comparison Panels"]
      };
    }
    if (titleLower.includes("process optimization (basic)")) {
      return {
        category: "Step-by-Step Process Workflows",
        steps: [
          "Convert convoluted technical processes into highly simplified numbered guides with a single user action mapped per step.",
          "Formulate logical, linear step headers such as 'Step 1: Install', 'Step 2: Initialize' for direct cognitive processing.",
          "Check that process guides use proper, clean numbering styles that match the core page layout."
        ],
        tools: ["Yoast Content Analyzer", "Hemingway Editor", "Screaming Frog Linter"],
        engines: ["Google Featured Snippets (Numbered Steps)", "Siri Voice Engines"]
      };
    }
    if (titleLower.includes("process optimization (advanced)")) {
      return {
        category: "Enriched Technical Process Flowcharts",
        steps: [
          "Enrich the numbered guide with estimated time requirements, prerequisites, common developer mistakes, and troubleshooting steps.",
          "Incorporate a dedicated troubleshooting subheader detailing resolution pathways for common workflow sticking points.",
          "Assign distinctive HTML anchor IDs (such as selector ids) to each process step, making them targetable for Fraggle indexes."
        ],
        tools: ["Chrome XPath Tracker", "Google Rich Results Tester", "Screaming Frog Linter"],
        engines: ["Google Search Knowledge Panels", "ChatGPT Conversational Assistant"]
      };
    }
    if (titleLower.includes("faq optimization (basic)")) {
      return {
        category: "Landing Page FAQ Architecture",
        steps: [
          "Embed a clean, visually distinct FAQ section on key informational and commercial layout routes.",
          "Deploy custom structured JSON-LD FAQ metadata schemas detailing the precise strings of valid questions and answers.",
          "Leverage clickable CSS accordions, keeping answer text fully crawlable and readable in raw DOM sources."
        ],
        tools: ["Google Rich Results Testing Tool", "Schema.org Validator", "JSON-LD Builder"],
        engines: ["Google FAQ Wealth Snippets", "Bing Rich Search Results"]
      };
    }
    if (titleLower.includes("faq optimization (advanced)")) {
      return {
        category: "AI Search FAQ Targeting",
        steps: [
          "Compile deep FAQ subsets covering Entity FAQs, Service FAQs, Product specific queries, and local AI search terms.",
          "Incorporate primary entity keywords, local geographic markers, and competitive brand references inside FAQ sentences.",
          "Ensure schema declarations validate with zero warnings, resolving missing optional parameters."
        ],
        tools: ["InLinks Entity Map Explorer", "Google Search Console FAQ Logs", "Wikidata Query Suite"],
        engines: ["Google Search Generative Experience AI Overviews", "Perplexity AI Answers"]
      };
    }
    if (titleLower.includes("voice search optimization (basic)")) {
      return {
        category: "Conversational Phrasing Style",
        steps: [
          "Draft descriptive content using natural spoken patterns, mimicking exactly how real users vocally query mobile assistants.",
          "Optimize for long-tail query clusters and full-sentence conversational triggers rather than disjointed system terms.",
          "Review verbal readability scores, ensuring answers say easily without awkward technical punctuation."
        ],
        tools: ["Flesch-Kincaid Reading Easy Tools", "Hemingway Readability Processor", "Google Assistant SDK Mockup Console"],
        engines: ["Siri Voice Search Core", "Google Assistant Voice Search", "Amazon Alexa Services"]
      };
    }
    if (titleLower.includes("voice search optimization (advanced)")) {
      return {
        category: "Voice Intent Mapping & Mobile Geo",
        steps: [
          "Implement speakable schema parameters declaring accurate CSS selector paths to help voice systems locate summary paragraphs.",
          "Configure voice mapping for hyper-local intent triggers and common near-me mobile search parameters.",
          "Create a clear list of natural conversational follow-ups, validating answers directly address localized vocal search parameters."
        ],
        tools: ["Google Assistant SDK Tester", "Screaming Frog Mobile Page Analyzer", "Yoast Enterprise Search Suite"],
        engines: ["Apple Siri Virtual Assistant", "Alexa Smart Speaker Indexers", "Google Location Assistant"]
      };
    }
    if (titleLower.includes("ai overview optimization (basic)")) {
      return {
        category: "AI Overview Structured Summaries",
        steps: [
          "Formulate short, highly objective answers and factual summary modules that AI crawlers can cleanly extract.",
          "Support simple sentence styles, minimizing complex nested clauses and parenthetical statements.",
          "Ensure AI-focused text boxes load natively on basic server templates without requiring delayed client-side script processing."
        ],
        tools: ["Lighthouse Performance Inspector", "Google Mobile-First Testing Console", "Screaming Frog SEO Spider"],
        engines: ["Google Search Generative Experience AI Overviews", "Bing AI Summary Snippets"]
      };
    }
    if (titleLower.includes("ai overview optimization (advanced)")) {
      return {
        category: "Citation Blocks & Authoritative Evidence",
        steps: [
          "Embed citation hooks consisting of original system statistics, proprietary database outputs, or peer-reviewed expert quotes.",
          "Verify the presence of source attribution anchors connecting raw concepts back to trusted global publications.",
          "Audit outbound bibliography blocks to ensure evidence references link directly to highly reputable scholarly outputs."
        ],
        tools: ["Semrush Content Platform", "MarketMuse Topical Coverage Simulator", "Ahrefs Link Quality Audit"],
        engines: ["Google Gemini Citation Crawlers", "Perplexity Citation Search Agents"]
      };
    }
    if (titleLower.includes("chatgpt / gemini / claude optimization (basic)")) {
      return {
        category: "Chatbot Recognition & Training",
        steps: [
          "Write self-contained, context-rich explanatory blocks that stand alone clearly when isolated from adjacent content by crawler parser utilities.",
          "Integrate direct conversational answers specifying precise brand identifiers to support machine categorization.",
          "Minimize excessive design rails or decorative floating elements that can muddy parsed text flows."
        ],
        tools: ["ChatGPT Playground Sandbox", "Gemini Developer Workspace", "Surfer Semantic Auditor"],
        engines: ["ChatGPT Discovery Spiders", "Gemini Bot Crawlers", "Claude Core Engine"]
      };
    }
    if (titleLower.includes("chatgpt / gemini / claude optimization (advanced)")) {
      return {
        category: "LLM Citation Link Ingestion",
        steps: [
          "Optimize semantic text chunk lengths to fall within typical vector embedding window limits to support advanced RAG index matching.",
          "Incorporate highly citation-worthy stats, custom graphs, expert commentary blocks, and unique frameworks.",
          "Confirm layout structure does not trigger rendering faults, formatting tables cleanly with proper cell padding."
        ],
        tools: ["Perplexity Sandbox Tool", "ChatGPT Search Simulator", "Screaming Frog Crawler Logs"],
        engines: ["Perplexity Answers Node", "Gemini Advanced Assistant", "ChatGPT Search Engine", "Claude Enterprise Agent"]
      };
    }
    if (titleLower.includes("comparison optimization (basic)")) {
      return {
        category: "Comparative Alternatives Framework",
        steps: [
          "Structure comprehensive X vs Y product guides, alternative software sheets, and clear pros and cons directories.",
          "Incorporate logical comparison parameters highlighting primary functional and operational differences.",
          "Ensure tone remains objective, avoiding purely critical or overly promotional language."
        ],
        tools: ["Ahrefs Competitive Content Tracker", "Semrush Keyword Magic", "Yoast Readability Tester"],
        engines: ["Google Comparative Panels", "ChatGPT Alternate Search Recommendations"]
      };
    }
    if (titleLower.includes("comparison optimization (advanced)")) {
      return {
        category: "Decision Framework Matrix Architecture",
        steps: [
          "Deploy comparative visual matrices comparing product price tiers, features, and targeted developer cases.",
          "Verify the grid uses completely flat HTML tables, preventing Javascript rendering bugs from hiding rows.",
          "Incorporate expert buyer decision pathways, product selection tools, and interactive purchase calculators."
        ],
        tools: ["Google Rich Results Tester", "Screaming Frog Validator", "Yoast Enterprise Simulator"],
        engines: ["Google Shopping Graph", "Co-Pilot Buying Recommendations", "Gemini Research Assistant"]
      };
    }
    if (titleLower.includes("trust & authority signals (basic)")) {
      return {
        category: "Standard Trust Attributes",
        steps: [
          "Display prominent, verified author bylines pointing directly to individual author profile URLs.",
          "Include a clear 'Last Updated' date timestamp block, confirming page freshness to crawlers.",
          "Integrate a structured citation bibliography linking to authoritative research sources."
        ],
        tools: ["W3C SEO Compliance Linter", "Google Search Console URL Inspector", "Lighthouse SEO Tool"],
        engines: ["Google E-E-A-T Quality Systems", "Bing Trust Evaluators"]
      };
    }
    if (titleLower.includes("trust & authority signals (advanced)")) {
      return {
        category: "Deep Academic & Experience Backing",
        steps: [
          "Feature visible 'Expert Resident Reviewed By' credentials badges mapping to expert background pages.",
          "Incorporate concrete proof-of-experience markers including real screenshots, system diagnostics, or sample outputs.",
          "Ensure primary outbound links point specifically to recognized state, academic, or scientific domains."
        ],
        tools: ["Ahrefs Link Tracker", "Wikidata Query Service", "Google Schema Playground"],
        engines: ["Google YMYL Algorithmic Frameworks", "Search Quality Evaluator Guidelines", "Academic Citation Indexes"]
      };
    }
    if (titleLower.includes("multimedia answer optimization (basic)")) {
      return {
        category: "Contextual Visual Assets",
        steps: [
          "Position relevant graphics, labeled screenshots, or diagrams in direct proximity to target text definition boxes.",
          "Add accurate HTML `alt` alternative descriptions containing key terms to explain photographic contents to crawlers.",
          "Incorporate explicit horizontal and vertical layout dimensions to prevent sudden content jumps during loading."
        ],
        tools: ["Lighthouse Performance Diagnostics", "Chrome DevTools Elements Console", "Google Image Inspector"],
        engines: ["Google Image Search", "ChatGPT Visual Recognizer", "Gemini Multimodal Core"]
      };
    }
    if (titleLower.includes("multimedia answer optimization (advanced)")) {
      return {
        category: "Dynamic Interactive Media",
        steps: [
          "Embed brief video summaries accompanied by structured schema schemas mapping out precise video chapters.",
          "Deploy complete interactive text transcripts next to video elements to allow search and index crawls.",
          "Incorporate interactive sample widgets or live code sandbox examples."
        ],
        tools: ["Google Video Schema Generator", "Rich Results Tester", "YouTube Chapters Dashboard"],
        engines: ["Google Video Rich Snippets", "YouTube Crawl Indexers", "Multimodal Chatbots"]
      };
    }
    if (titleLower.includes("answer completeness optimization (basic)")) {
      return {
        category: "Primary Intent Alignment",
        steps: [
          "Complete an editorial review checking that the primary search question is answered comprehensively on the URL.",
          "Remove content gaps that could prompt users to immediately navigate back to search engine logs.",
          "Organize page copy so both physical readers and automated index bots locate answers quickly."
        ],
        tools: ["Yoast SEO Content Checker", "MarketMuse Coverage Tracker", "Lighthouse SEO Tool"],
        engines: ["Google Mobile Search Quality Indexes", "Bing Core Ranker PageRank"]
      };
    }
    if (titleLower.includes("answer completeness optimization (advanced)")) {
      return {
        category: "Conversational Anchor Content Clusters",
        steps: [
          "Address potential follow-up questions, related queries, rare edge cases, alternative approaches, and hand-on examples.",
          "Integrate distinct exception cases, clarifying who benefit from particular choices.",
          "Build organized thematic linking structures between main content maps and deep-dive technical essays."
        ],
        tools: ["InLinks Entity Map Explorer", "Semrush Keyword Magic", "Screaming Frog Link Tracker"],
        engines: ["Google Topical Authority Evaluators", "Perplexity Copilot Mapping Agent"]
      };
    }
    if (titleLower.includes("featured snippet audit (basic)")) {
      return {
        category: "Snippet Structure Verification",
        steps: [
          "Confirm that paragraph summaries contain exact target length boundaries of 40-60 terms directly under section titles.",
          "Format list components cleanly using semantic markup, avoiding custom wrappers that break machine parsing.",
          "Remove complex javascript execution layers from responsive table metrics, ensuring details crawl on basic layouts."
        ],
        tools: ["Flesch Reading Ease Tracker", "Screaming Frog SEO Linter", "Chrome DevTools Elements Panel"],
        engines: ["Google Featured Snippets Indexer", "Bing Quick Answer Spider"]
      };
    }
    if (titleLower.includes("featured snippet audit (advanced)")) {
      return {
        category: "Automated Snippet Quality Assurance",
        steps: [
          "Incorporate clean automated code rules comparing rendering layouts against target limits to watch for clipping.",
          "Monitor crawling and parsing messages reported on live paths inside Search Console dashboards.",
          "Monitor positional analytical trackers to log featured snippet captures on core keyword lists."
        ],
        tools: ["Ahrefs Rank Tracker", "Google Search Console Performance Tab", "Screaming Frog Linter"],
        engines: ["Google Featured Snippets Core", "Generative Web Answers"]
      };
    }
    if (titleLower.includes("entity-based aeo")) {
      return {
        category: "Linked Knowledge Graph Alignment",
        steps: [
          "Incorporate exact Schema `sameAs` target URIs linking brand elements directly to established Wikidata and Wikipedia profiles.",
          "Map co-founders, specialized software, and physical locations to existing nodes inside open global data bases.",
          "Enforce strict brand orthography, using identical spelling and reference definitions across all global boards."
        ],
        tools: ["Wikidata Query Validator", "Schema JSON-LD Creator", "Google Knowledge Graph Search API"],
        engines: ["Google Knowledge Graph API", "Perplexity Citation Search", "ChatGPT Entity Graph"]
      };
    }
    if (titleLower.includes("advanced ai optimization")) {
      return {
        category: "Modern AI (2026+) Engine Provisioning",
        steps: [
          "Deploy standard declarative llms.txt and llms-full.txt catalogs at the root path of the server domain.",
          "Embed specific HTML anchor parameters (such as selector ids) to help RAG indexers extract context blocks cleanly.",
          "Integrate schema attributes signaling clear semantic boundaries so generative crawlers extract references smoothly."
        ],
        tools: ["LLM txt Validator", "Screaming Frog Custom Selector Extractor", "Rich Results Tester"],
        engines: ["Retrieval-Augmented Generation (RAG) Engines", "Perplexity Search Agents", "Agentic Crawlers"]
      };
    }
    if (titleLower.includes("primary keyword in meta title")) {
      return {
        category: "Primary Keyword Targeting",
        steps: [
          "Identify the primary search query and target theme using keyword volume explorer tools.",
          "Ensure the chosen primary keyword is front-loaded near the start of the `<title>` tag (<60 characters).",
          "Test live HTML rendering across mobile viewports to verify that the meta title does not experience truncation."
        ],
        tools: ["Google Keyword Planner", "Ahrefs Explorer", "SERP Simulator Tool"],
        engines: ["Google Search", "Bing Search", "Apple Siri Search"]
      };
    }
    if (titleLower.includes("primary keyword in h1 header") || titleLower.includes("primary keyword in h1")) {
      return {
        category: "On-Page Header Alignment",
        steps: [
          "Scan the DOM block elements to confirm exactly one <h1> tag exists per page URL.",
          "Incorporate the primary target keyword naturally near the beginning of the H1 layout string.",
          "Ensure H1 styling classes distinguish it visual-wise as the most prominent headline above the fold."
        ],
        tools: ["W3C Markup Validation Service", "Screaming Frog Linter", "Lighthouse SEO Tool"],
        engines: ["Googlebot Mobile Indexer", "Bing Desktop Crawler", "RAG Engine Document Segmenters"]
      };
    }
    if (titleLower.includes("keyword in url") || titleLower.includes("target keyword integrated in url")) {
      return {
        category: "Clean Slug Engineering",
        steps: [
          "Formulate human-readable, lowercased URL paths using hyphens to separate words (no underscores or special codes).",
          "Include the primary target keyword directly inside the URL slug block.",
          "Configure server redirection (301) to maps legacy query parameter parameters straight to the clean link."
        ],
        tools: ["GSC URL Inspection Tool", "Screaming Frog Link Tracker", "Server Redirect Diagnostics"],
        engines: ["Googlebot Primary Crawler", "Bing Automated Crawlers"]
      };
    }
    if (titleLower.includes("keyword in meta description") || titleLower.includes("meta description tag")) {
      return {
        category: "CTR Search Optimization",
        steps: [
          "Write a compelling, benefit-driven meta description between 120 and 155 characters housing the primary keyword.",
          "Inject clear consumer advantages and subtle click call-to-actions to raise SERP traffic thresholds.",
          "Inspect meta outputs on physical devices to ensure no word clipping occurs in description previews."
        ],
        tools: ["SERP Snippet Tracker", "Yoast Preview Emulator", "Google Search Snippet View"],
        engines: ["Google Mobile Search Hubs", "Conversational Citation Blocks"]
      };
    }
    if (titleLower.includes("nlp & lsi semantic keywords") || titleLower.includes("nlp keywords") || titleLower.includes("semantic keywords")) {
      return {
        category: "NLP Content Expansion",
        steps: [
          "Utilize semantic processing suites to map context-related LSI concepts and associated vocabulary.",
          "Incorporate mapped secondary keywords naturally within support paragraphs to satisfy natural language parsers.",
          "Monitor word counts and concept frequencies to prevent unnatural keyword stuffing flags."
        ],
        tools: ["Clearscope NLP Sandbox", "Surfer Semantic Optimizer", "MarketMuse Concept Matrix"],
        engines: ["Google BERT / MUM System", "Claude Semantic Parser", "ChatGPT Search Indexer"]
      };
    }
    if (titleLower.includes("entity keyword graph integration") || titleLower.includes("entity keywords")) {
      return {
        category: "Graph Entity Association",
        steps: [
          "Identify exact real-world entities, certified organization brands, and Wikipedia classifications in your subject space.",
          "Mention these entities clearly near first-fold sentences to help bots build structured relational graphs.",
          "Add outbound links referencing official authority channels (such as Wikidata profiles) to confirm entity links."
        ],
        tools: ["Wikidata Query Editor", "Google Natural Language API Explorer", "InLinks Entity Mapper"],
        engines: ["Google Knowledge Graph API", "Perplexity Citation System", "Structured Vector Retrieval Engines"]
      };
    }
    if (titleLower.includes("topic clusters & related searches") || titleLower.includes("related searches") || titleLower.includes("topic clusters & pillar page")) {
      return {
        category: "Clustered Schema Architecture",
        steps: [
          "Extract semantic suggestions from Google's 'Related Searches' and high-impression console queries.",
          "Flesh out independent, granular child pages that cover specialized queries, linking back to top-level index files.",
          "Analyze internal link density maps to eliminate orphaned pages and redirect unreferenced resources."
        ],
        tools: ["Ahrefs Keyword Explorer", "Screaming Frog Visual Link Graph", "AnswerThePublic"],
        engines: ["Google Core Ranking Hubs", "Bing PageRank Indexers"]
      };
    }
    if (titleLower.includes("people also ask") || titleLower.includes("paa conversational")) {
      return {
        category: "Conversational Snippets Tuning",
        steps: [
          "Scrape real interactive query templates directly from Google's Search 'People Also Ask' panels.",
          "Create localized FAQ blocks that address questions directly beneath semantic H3 headers.",
          "Apply clean FAQ structures within page templates to gain conversational snippet advantages."
        ],
        tools: ["PAA Scraper Extension", "Google Rich Results Tester", "AnswerThePublic Matrix"],
        engines: ["AEO Smart Snippets", "Apple Siri Search Voice", "Google Assistant Voice Helper"]
      };
    }
    if (titleLower.includes("xml sitemap")) {
      return {
        category: "XML Sitemap Validation",
        steps: [
          "Audit the absolute `sitemap.xml` file to verify it only indexes active 200 OK canonical pages.",
          "Register sitemap path configurations securely in Google and Bing Webmaster directories.",
          "Verify the index file uses valid compression and follows standard nested `<loc>` node schemas."
        ],
        tools: ["XML Sitemap Validator Toolbar", "Google Search Console Sitemaps Panel", "Screaming Frog XML Report"],
        engines: ["Googlebot Primary Crawler", "Bingbot indexing systems", "DuckDuckGo Crawl Module"]
      };
    }
    if (titleLower.includes("dynamic sitemap")) {
      return {
        category: "Dynamic Indexing Automation",
        steps: [
          "Implement automatic server trigger events that inject new resource paths into sitemaps on publishing.",
          "Scrub deleted, raw redirected, or draft pages automatically from the active index to protect crawl limits.",
          "Review background sitemap compilation times to prevent server-side query blocks."
        ],
        tools: ["Sitemap Hook Diagnostics", "cURL Endpoint Ping Tools", "Node Cron Tester"],
        engines: ["Google Incremental Crawlers", "Bing Real-time Indexers"]
      };
    }
    if (titleLower.includes("image-specific sitemap") || titleLower.includes("image sitemap")) {
      return {
        category: "Visual Sitemap Metadata",
        steps: [
          "List important graphical media files under `<image:image>` nested rules containing true description attributes.",
          "Audit asset URLs to confirm graphic locations are served via HTTPS secure protocols.",
          "Formulate custom alternate caption paths to maximize visual lookup indexing rates."
        ],
        tools: ["Screaming Frog Image Spider", "W3C Visual Schema Linter", "Google Visual Finder Testing"],
        engines: ["Google Images Indexer", "Bing Visual Searches"]
      };
    }
    if (titleLower.includes("video sitemapping") || titleLower.includes("video sitemap")) {
      return {
        category: "Rich Video Indexing",
        steps: [
          "Formulate customized video XML parameters pointing to valid thumbnail files, running lengths, and direct players.",
          "Embed matching structured video metadata into pages to stand out in Google Video search tabs.",
          "Review server content ranges to confirm video streams are safely deliverable with zero delays."
        ],
        tools: ["GSC Video Indexing Report", "W3C Video Validation Tool", "Rich Results Validator"],
        engines: ["Google Video SERPs", "YouTube Crawler APIs"]
      };
    }
    if (titleLower.includes("news sitemap")) {
      return {
        category: "Google News Feed Delivery",
        steps: [
          "Structure standard news schemas compiling target editorial articles written strictly within 48 hours.",
          "Declare required publication titles, language specifications, release times, and headings in XML.",
          "Verify configuration settings match parameters set in your Google Publisher Center account."
        ],
        tools: ["Google Publisher Center Console", "News Sitemap Syntax Checker", "Sitemap Crawler Diagnostics"],
        engines: ["Google News Algorithm", "Google Discover Feed Indexers"]
      };
    }
    if (titleLower.includes("html sitemap")) {
      return {
        category: "Human UX Clean Index",
        steps: [
          "Develop a user sitemap on a dedicated root destination, neatly categorize major links.",
          "Keep total redirect counts under 100 on sitemap sheets to avoid crawling bottlenecks.",
          "Inject descriptive, human anchor content string fields reflecting direct landing targets."
        ],
        tools: ["Chrome Accessibility Elements Checker", "Screaming Frog Custom Crawl", "W3C HTML Validator"],
        engines: ["Googlebot Crawling Agent", "Bingbot User Experience Metrics"]
      };
    }
    if (titleLower.includes("robots.txt ai-bot") || titleLower.includes("robots.txt rule")) {
      return {
        category: "Generative AI Scraper Strategy",
        steps: [
          "Incorporate exact robots rules to keep user records or billing routes safe from AI scrapers.",
          "Isolate conversational citation agents (PerplexityBot, Gemini-User) to allow traffic flows.",
          "Disallow trainers like GPTBot and ClaudeBot to protect original material."
        ],
        tools: ["Google Search Console Robots.txt Tester", "ClaudeBot Block Sandbox", "Screaming Frog Exclusion Scanner"],
        engines: ["OAI-SearchBot", "Claude-User", "PerplexityBot", "ClaudeBot", "GPTBot"]
      };
    }
    if (titleLower.includes("index now") || titleLower.includes("indexnow")) {
      return {
        category: "Direct Bing Instant Ping",
        steps: [
          "Generate a distinct validation text file and post it in the root folder structure.",
          "Automate direct endpoint pings containing updated path params to notify Bing of site changes in seconds.",
          "Verify status responses in Bing Webmaster directories to ensure proper URL ingestion."
        ],
        tools: ["IndexNow Curl Terminal Tester", "Bing Webmaster IndexNow Dashboard", "Server Log Monitor"],
        engines: ["Bingbot Instant Indexer", "Yandex Engine Crawlers", "Seznam Search Spiders"]
      };
    }
    if (titleLower.includes("index coverage audit") || titleLower.includes("coverage audit")) {
      return {
        category: "Index Coverage Health",
        steps: [
          "Verify the console coverage dashboards to isolate urls marked under 'Excluded' or warning status.",
          "Clean up any unintended 'noindex' code instructions contained inside layouts or head files.",
          "Test live links using inspection methods to make sure Google indexes target canonical assets."
        ],
        tools: ["Google Search Console Coverage Panel", "Screaming Frog SEO Spider", "Ahrefs Site Audit Dashboard"],
        engines: ["Google Core Search", "Bing Crawler Optimization Services"]
      };
    }
    if (titleLower.includes("crawl error resolution") || titleLower.includes("crawl error")) {
      return {
        category: "Crawl Block Sanitization",
        steps: [
          "Execute global site reviews to catch broken links, dynamic redirect loops, and server-side lag.",
          "Refactor redirect strings, sending visitors cleanly to end resources without duplicate hops.",
          "Check database response speeds to eliminate intermittent 500 errors on web nodes."
        ],
        tools: ["Screaming Frog SEO Spider", "Node Server Request Tracker", "GSC Settings Panel"],
        engines: ["Googlebot Crawling Subsystem", "Bingbot Crawler Engine"]
      };
    }
    if (titleLower.includes("canonical tags implementation") || titleLower.includes("canonical tag")) {
      return {
        category: "Canonical Consolidate Audit",
        steps: [
          "Determine that a self-referencing, absolute canonical link points to the exact canonical source on each page.",
          "Verify tracking query strings rollup context back to parent index URLs.",
          "Audit the sitemap records to ensure canonical targets are cleanly declared with no chains."
        ],
        tools: ["Canonical Header Checker", "Screaming Frog Diagnostics", "Lighthouse SEO Tab"],
        engines: ["Google Normalizer Systems", "Bing Search Indexer Normalization"]
      };
    }
    if (titleLower.includes("single h1 tag") || titleLower.includes("single h1")) {
      return {
        category: "Semantic Header Validation",
        steps: [
          "Examine page structures to keep exactly one key <h1> title layout per view.",
          "Convert extra logo styles or sidebar captions from H1 blocks back to semantic divisions.",
          "Verify that the main <h1> visually headlines key target content elements above the fold."
        ],
        tools: ["Screaming Frog HTML Parse Report", "W3C Markup Validator", "Chrome Elements Panel"],
        engines: ["Googlebot Mobile Indexing Unit", "RAG Document Parsing Services"]
      };
    }
    if (titleLower.includes("proper nested h2-h6 heading flow") || titleLower.includes("nested h")) {
      return {
        category: "Document Heading Structure",
        steps: [
          "Arrange secondary heading elements sequentially (H1 to H2 to H3 to H4) to help reader scanning.",
          "Separately define visual CSS styling classes from semantic HTML header tags.",
          "Ensure logical section titles map your primary topic outlines."
        ],
        tools: ["Ahrefs On-Page Extension", "Chrome Axe Auditor", "Screaming Frog Heading Report"],
        engines: ["Google Document Parsing Model", "Apple Safari WebKit Engine"]
      };
    }
    if (titleLower.includes("short paragraphs") || titleLower.includes("readable paragraph")) {
      return {
        category: "UX Readability Tuning",
        steps: [
          "Inspect content assets, dividing text walls into concise paragraphs containing max 3 sentences.",
          "Provide adequate padding parameters to avoid user reader fatigue on smaller screens.",
          "Formulate mobile-friendly text configurations to ensure a fast, fluid visual scan experience."
        ],
        tools: ["Flesch Reading Ease Tester", "WebAIM Typography Analyzer", "Mobile Simulator Workspace"],
        engines: ["Google Core User Experience System", "Safari Mobile Layout Engine"]
      };
    }
    if (titleLower.includes("semantic bullet lists and tables") || titleLower.includes("bullet list") || titleLower.includes("tables")) {
      return {
        category: "Structured Data Layout",
        steps: [
          "Replace image comparison grids with readable, clean semantic HTML `<table>` elements.",
          "Group related key elements using structured bullet containers (`<ul>`, `<ol>`) instead of plain spacing.",
          "Add readable descriptive headers to tables to facilitate automatic search indexing."
        ],
        tools: ["W3C Semantic Document Auditor", "Google Rich Results Table Tester", "Chrome Accessibility Inspector"],
        engines: ["Google Rich Snippets Core", "Bing List and Graph Indexers"]
      };
    }
    if (titleLower.includes("topic clusters & pillar page network") || titleLower.includes("pillar page")) {
      return {
        category: "Clustered Authority Network",
        steps: [
          "Produce complete topic pillars addressing master themes conceptually in one single place.",
          "Formulate related secondary cluster entries linking back to absolute primary hubs.",
          "Eliminate orphan topics to ensure smooth, natural site crawler exploration paths."
        ],
        tools: ["Inlinks Topical Authority Architect", "Ahrefs Internals Report", "Screaming Frog Link Graph"],
        engines: ["Google PageRank Algorithms", "Bing Semantic Web Categorizers"]
      };
    }
    if (titleLower.includes("content hub semantic coverage") || titleLower.includes("semantic coverage")) {
      return {
        category: "Comprehensive Semantic Coverage",
        steps: [
          "Run competitive reports to identify missing definitions or topics in your industry.",
          "Build dedicated reference databases and FAQ files grouped within natural folders.",
          "Maintain absolute content integrity to make categorization easy for search algorithms."
        ],
        tools: ["MarketMuse Topic Model Toolkit", "Surfer Content Auditor", "Semrush Keyword Magic"],
        engines: ["Google Topical Semantic Classifiers", "Bing Search Semantic Deep Graph"]
      };
    }
    if (titleLower.includes("structural content entity mapping") || titleLower.includes("entity mapping")) {
      return {
        category: "Concept Entity Alignment",
        steps: [
          "Define critical concept nouns, registered industry brands, and certified identities across page nodes.",
          "Incorporate precise definition blocks for entities early to help crawlers build relational logs.",
          "Link to trusted global database points to anchor corporate semantic relationships."
        ],
        tools: ["Google Cloud NLP API", "InLinks Entity Map Explorer", "Wikidata Search Engine"],
        engines: ["Google Search Knowledge Engines", "RAG Vector Similarity Libraries"]
      };
    }
    if (titleLower.includes("aeo/geo direct answer-snippet") || titleLower.includes("answer-snippet") || titleLower.includes("aeo/geo")) {
      return {
        category: "AEO Citation Optimizer",
        steps: [
          "Formulate a direct, 45-word bold summary right after section headings (BLUF) to invite instant bot citations.",
          "Supply direct technical figures and objective data blocks instead of vague, general filler text.",
          "Verify summaries render safely on static HTML responses without relying on JavaScript actions."
        ],
        tools: ["Perplexity Developer Console", "ChatGPT Search Sandbox", "Google Rich Results Testing Portal"],
        engines: ["Perplexity Citation AI", "ChatGPT Search Index", "Claude Cognitive Core", "Google Featured Snippets"]
      };
    }
    if (titleLower.includes("real experience indicators") || titleLower.includes("experience check") || titleLower.includes("originality")) {
      return {
        category: "E-E-A-T Experience Proof",
        steps: [
          "Integrate customized first-hand descriptions ('we tested', 'I resolved') validating true field experiences.",
          "Avoid generic stock imagery; publish original system metrics, real blueprints, and step-by-step images.",
          "Provide references to verified operations, certified consumer reviews, or live project audits."
        ],
        tools: ["Reverse Image Lookup Tools", "Copyscape Originality Sandbox", "Chrome DevTools Elements Console"],
        engines: ["Google Search Quality Evaluators", "Manual Trust Rater Appraisers"]
      };
    }
    if (titleLower.includes("expertise badges & author profiles") || titleLower.includes("author profile") || titleLower.includes("bylines")) {
      return {
        category: "E-E-A-T Author Identity",
        steps: [
          "Code distinct writer highlight modules that map to biographical pages containing professional backgrounds.",
          "Add direct references to author social networks and third-party publications.",
          "Declare Person structured schema metadata specifying credentials inside site templates."
        ],
        tools: ["Schema JSON Generator", "LinkedIn Verified Profiles", "Wikidata Person Registry"],
        engines: ["Google Author Entity Systems", "Topic Authority Evaluators"]
      };
    }
    if (titleLower.includes("verifiable expert credentials") || titleLower.includes("expert credentials")) {
      return {
        category: "E-E-A-T Authority Auditing",
        steps: [
          "Display certified registration IDs, academic milestones, and certifications next to writer profiles.",
          "Interlink credentials to official licensing registry dashboards.",
          "Establish peer-review checklists, displaying credentials for reviewers alongside original writers."
        ],
        tools: ["Professional License Registries", "Ahrefs Link Quality Audit", "HTML Source Linter"],
        engines: ["YMYL Quality Algorithmic Checks", "Google Search Evaluation Rater Guidelines"]
      };
    }
    if (titleLower.includes("industry citations & backlink") || titleLower.includes("citations & backlink")) {
      return {
        category: "Trust Citation Authority",
        steps: [
          "Quote reputable scientific sources or official government guidelines inside reference blocks.",
          "Ensure secondary outbound hyperlinks open in separate slots securely to minimize immediate bounce-rates.",
          "Utilize explicit, clear descriptive nouns as anchor text instead of 'click here' or 'link'."
        ],
        tools: ["Ahrefs Link Explorer", "Screaming Frog Outbound Links Report", "Moz Site Audit Toolkit"],
        engines: ["Google PageRank Algorithms", "Scholarly Semantic Citation Indexers"]
      };
    }
    if (titleLower.includes("trust essentials") || titleLower.includes("nap") || titleLower.includes("contact information") || titleLower.includes("support info")) {
      return {
        category: "Institutional Identity Verification",
        steps: [
          "Declare clear, uniform Name, Address, and Phone (NAP) details on contact URLs and global footers.",
          "Enable click-to-call mobile bindings (`<a href=\"tel:...\">`) to streamline immediate user outreach.",
          "Correlate local contact pages with external maps registration profiles to avoid search authority conflicts."
        ],
        tools: ["Google Places API Dashboard", "Structured Data Markup Validator", "Screaming Frog Header/Footer Scanner"],
        engines: ["Google Local Maps Algorithms", "Bing Places Registry Directories"]
      };
    }
    if (titleLower.includes("privacy policy & terms") || titleLower.includes("privacy policy") || titleLower.includes("terms page") || titleLower.includes("refund")) {
      return {
        category: "Commercial Integrity Checks",
        steps: [
          "Draft detailed Privacy policies and Terms of Service conforming directly with dynamic GDPR and CCPA statutes.",
          "Insert visible, direct navigational routes to primary legal agreements inside global footer components.",
          "Ensure rules are kept completely crawlable, allowing search spiders to index legal terms freely."
        ],
        tools: ["GDPR Compliance Audits", "Sitemap Verification Logs", "W3C Markup Toolset"],
        engines: ["Google Trust Quality Indicators", "Bing Consumer Security Systems"]
      };
    }
    if (titleLower.includes("organization schema") || titleLower.includes("localbusiness schema")) {
      return {
        category: "Structured Base Entity Profile",
        steps: [
          "Declare comprehensive organization JSON-LD indicating official logos, verified support handles, and brand links.",
          "Correlate Wikidata or Wikipedia IDs within script files to help bots parse corporate lineage.",
          "Run validation tests to eliminate warning logs across Rich Results testing panels."
        ],
        tools: ["Google Rich Results Validator", "Schema JSON-LD Editor", "Wikidata Query Service"],
        engines: ["Google Knowledge Graph API", "Perplexity AI Reference Indexers"]
      };
    }
    if (titleLower.includes("mobile responsive") || titleLower.includes("responsive") || titleLower.includes("viewport")) {
      return {
        category: "Mobile Layout Adaptation",
        steps: [
          "Define a correct `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` layout in main html headers.",
          "Avoid absolute width specifications on containers, preferring fluid responsive patterns (`w-full max-w-lg`).",
          "Inspect touchable interactive objects (buttons, links) to verify they offer a safe margin and 44px+ click area."
        ],
        tools: ["Chrome Developer Mobile Emulator", "Lighthouse Accessibility Suite", "Google Search Console Usability Logs"],
        engines: ["Google Mobile-First Indexing Core", "Apple Safari WebKit Engine"]
      };
    }
    if (titleLower.includes("https") || titleLower.includes("ssl") || titleLower.includes("security") || descLower.includes("security") || descLower.includes("ssl")) {
      return {
        category: "Infrastructure Security & Encryption",
        steps: [
          "Acquire and deploy reliable high-grade 2048-bit RSA/ECDSA SSL certifications to encrypt data.",
          "Configure server redirects to rewrite incoming HTTP Port 80 queries directly into secure HTTPS Port 443 channels.",
          "Add critical security header records, especially HSTS (Strict-Transport-Security), to secure API queries."
        ],
        tools: ["Qualys SSL Labs", "Chrome DevTools (Security Tab)", "SecurityHeaders.com"],
        engines: ["Googlebot", "Bingbot", "Applebot"]
      };
    }
    if (titleLower.includes("speed") || titleLower.includes("performance") || titleLower.includes("lcp") || titleLower.includes("cls") || titleLower.includes("inp") || titleLower.includes("cache") || titleLower.includes("compression") || titleLower.includes("brotli") || titleLower.includes("cdn")) {
      return {
        category: "Asset Retrieval Speed Optimization",
        steps: [
          "Implement high-performance Brotli server compression to maximize packet transfer speeds over mobile lines.",
          "Configure multinetwork edge caching proxies to cache static stylesheets, scripts, and fonts close to readers.",
          "Eliminate unused styles and defer non-critical javascript execution to clear main render blockers."
        ],
        tools: ["Google PageSpeed Insights", "Lighthouse Performance Diagnostic", "Chrome Performance Panel"],
        engines: ["Google PageSpeed Services", "Mobile Search Indexers", "Apple WebKit Bot"]
      };
    }

    if (titleLower.includes("product schema validation")) {
      return {
        category: "Product Structured Markup Validation",
        steps: [
          "Formulate clear JSON-LD script tags containing '@type': 'Product' with complete nesting rules.",
          "Ensure key metrics including SKU, price currency, merchant availability codes, and aggregate rating values are declared.",
          "Execute visual snippet checks on Google's Rich Results tool to verify eligibility to render product pricing and review rating stars."
        ],
        tools: ["Google Rich Results Test", "Schema.org Validator", "Search Console Merchant Alerts"],
        engines: ["Google Shopping Graph", "B2B / B2C Search Crawlers", "Product Recommendation Chatbots"]
      };
    }
    if (titleLower.includes("course schema layouts verification")) {
      return {
        category: "Education Course Markup Validation",
        steps: [
          "Verify page has '@type': 'Course' containing course name, precise syllabus descriptors, and verified educational credentials.",
          "Configure a parent 'CourseInstance' structured array mapping exact duration, schedules, price points, and trainer names.",
          "Run verification sweeps on Google's Rich Results Test to verify listing inside dedicated carousels."
        ],
        tools: ["Google Rich Results Test", "Schema Markup Generator", "Course Carousel Previewer"],
        engines: ["Google Educational Panels", "Structured Learning Crawlers", "Academy Knowledge Graphs"]
      };
    }
    if (titleLower.includes("event schema structured testing")) {
      return {
        category: "Corporate & Local Event Markup Validation",
        steps: [
          "Incorporate '@type': 'Event' declaring the event title, start and end timestamps, and visual promotional banners.",
          "Utilize the 'location' block specifying VirtualLocation for digital webinars or Place coordinates for physical conferences.",
          "Test structural code elements in the Rich Results Testing suite to ensure instant inclusion within regional calendar tabs."
        ],
        tools: ["Google Rich Results Test", "JSON-LD Event Constructor", "Schema Playground Sandbox"],
        engines: ["Google Event Hubs", "Local Calendar Aggregators", "City Guide Search Discover"]
      };
    }
    if (titleLower.includes("speakable schema audio targeting")) {
      return {
        category: "Text-to-Speech Optimization Validation",
        steps: [
          "Add '@type': 'Speakable' declaring CSS selector paths or detailed XPath query statements to target the core summary paragraphs.",
          "Ensure marked content paragraphs are concise and highly optimized for fluid verbal readouts.",
          "Run markup codes through Google's Rich Results Tester to ensure voice-assisted citation eligibility in smart home networks."
        ],
        tools: ["Google Rich Results Test", "Chrome XPath Finder", "Text-to-Speech Screen Validators"],
        engines: ["Google Assistant Voice Engine", "Amazon Alexa Services", "Apple Siri Virtual Assistant"]
      };
    }
    if (titleLower.includes("rich results schema validation") || titleLower.includes("rich results test check") || titleLower.includes("rich results test verification")) {
      return {
        category: "Structured Markup Validation Suite Tools",
        steps: [
          "Establish automated testing hooks running your schema templates directly against the Rich Results Testing APIs during final staging audits.",
          "Resolve warnings regarding missing optional values (such as SKU or priceValidUntil) to achieve completely error-free rankings.",
          "Submit live URL slugs to Google's Search Console URL Inspection panel to trigger immediate recrawls and cache updates."
        ],
        tools: ["Google Rich Results Test", "Search Console URL Inspector", "Screaming Frog Structured Data Parser"],
        engines: ["Google Visual SERP Tabs", "Structured Entity Spiders", "Knowledge Graph Graph Indexers"]
      };
    }

    // fallback generator for any custom/dynamic checklist items that aren't matched above
    const primaryConcept = title.replace(/(Checklist|Optimization|Audit|Verify|Check|Setup)/g, "").trim();
    
    return {
      category: `${primaryConcept || "SEO Verification"} Setup`,
      steps: [
        `Analyze current site layouts to inspect if exact implementations of "${title}" meet current structural search guidelines.`,
        desc 
          ? `Incorporate required standards: "${desc.replace(/\.$/, "")}" cleanly inside your active site template files.` 
          : `Deploy explicit developer changes optimizing "${title}" within visual page and metadata headers.`,
        `Run detailed crawls utilizing visual validation tools to confirm "${title}" functions smoothly with zero index or layout conflicts.`
      ],
      tools: [
        titleLower.includes("speed") || titleLower.includes("performance") || titleLower.includes("vitals") 
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

  return (
    <div className="space-y-6" id={`level-details-${level.id}`}>
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

      {/* Hero Module Overview */}
      <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-8 h-8 flex items-center justify-center bg-neutral-900 text-white rounded-lg font-sans font-bold text-xs uppercase shadow-sm">
                {isCustomCourse ? "C" : level.id}
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-md text-[10px] font-mono font-bold uppercase">
                {difficulty}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                <Clock size={11} />
                {estimatedMinutes} Mins Study
              </span>
              <span className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                <Tag size={11} />
                {totalCount} requirements
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-sans font-bold text-neutral-900 tracking-tight leading-tight">
              {level.title}
            </h2>
          </div>

          {/* Core progress circle equivalent or percent badges */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-neutral-400 font-mono">MODULE COMPLETE</p>
              <p className="text-lg font-sans font-bold text-neutral-900">{completedCount} / {totalCount} items ({progressPercent}%)</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-neutral-100 flex items-center justify-center relative overflow-hidden shrink-0">
              <div 
                className="absolute inset-0 border-4 border-neutral-900 transition-all origin-center rotate-45"
                style={{ clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent >= 25 ? "150%" : "50%"} -50%, ${progressPercent >= 50 ? "150%" : "50%"} ${progressPercent >= 50 ? "150%" : "50%"}, ${progressPercent >= 75 ? "-50%" : "50%"} 150%, -50% 50%)` }}
              ></div>
              <span className="text-xs font-mono font-bold text-neutral-800 z-10">{progressPercent}%</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed max-w-4xl border-t border-neutral-100 pt-4 font-normal">
          {details}
        </p>
      </div>

      {/* Lesson Advisory Guidelines (Business impact & Best practices) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Impact Card */}
        <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex gap-3.5 shadow-xs">
          <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800 border border-emerald-200 shrink-0 h-fit">
            <AlertTriangle size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-neutral-900 text-sm">Search Engine Impact</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {businessImpact}
            </p>
          </div>
        </div>

        {/* Audit Best Practice Card */}
        <div className="p-5 bg-blue-50/50 border border-blue-101 rounded-2xl flex gap-3.5 shadow-xs">
          <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800 border border-blue-200 shrink-0 h-fit">
            <Lightbulb size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-neutral-900 text-sm">Implementation Best Practice</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {bestPractice}
            </p>
          </div>
        </div>
      </div>

      {/* Main interactive Checklist Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-sans font-bold text-neutral-900 text-lg">Interactive Audit Checkpoints</h3>
            <p className="text-xs text-neutral-400">Mark off items as you verify them on your target product or staging builds.</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-neutral-100 p-1 rounded-lg border border-neutral-200 self-start sm:self-auto shadow-xs">
            {["all", "todo", "completed"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode as any)}
                className={`px-3 py-1 text-xs font-sans font-semibold rounded-md transition-all uppercase ${
                  filterMode === mode
                    ? "bg-white text-neutral-905 shadow-xs"
                    : "text-neutral-550 hover:text-neutral-900"
                }`}
              >
                {mode === "todo" ? "Pending" : mode}
              </button>
            ))}
          </div>
        </div>

        {/* List of items */}
        <div className="space-y-2">
          {filteredItems.map((item, idx) => {
            const isCompleted = completedItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer hover:shadow-xs group ${
                  isCompleted 
                    ? "bg-emerald-50/20 border-emerald-200/60" 
                    : "bg-white hover:bg-neutral-50/50 border-neutral-200"
                }`}
              >
                {/* Custom Styled Check Indicator */}
                <div className={`mt-0.5 shrink-0 ${isCompleted ? "text-emerald-600 animate-scale-up" : "text-neutral-400 group-hover:text-neutral-700"}`}>
                  {isCompleted ? (
                    <CheckCircle size={18} fill="currentColor" className="text-white fill-emerald-500" />
                  ) : (
                    <Square size={18} />
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-sans font-bold text-sm leading-snug tracking-tight ${isCompleted ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
                      {item.title}
                    </p>
                    
                    {/* Expand/Collapse toggle button strictly prevents click bubbling */}
                    <button
                      onClick={(e) => toggleExpand(item.id, e)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-200 transition-all ml-2 shrink-0 flex items-center justify-center cursor-pointer"
                      title="Toggle Technical Guide"
                    >
                      {expandedItems[item.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                  
                  {item.description && (
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium border-l-2 border-neutral-200/60 pl-2">
                      {renderDescriptionWithLinks(item.description)}
                    </p>
                  )}

                  {/* Expanded Custom Help block containing the complete short guide with enhanced typography styles */}
                  {expandedItems[item.id] && (() => {
                    const guideData = getImplementationSteps(item);
                    return (
                      <div 
                        className="mt-3 p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-3 animate-slide-up text-left"
                        onClick={(e) => e.stopPropagation()} // absolute guard against marking box completed when clicked inside the guide card!
                      >
                        <div className="flex items-center justify-between border-b border-emerald-200/40 pb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <Layers size={11} className="text-emerald-600" />
                            Category: {guideData.category}
                          </span>
                        </div>

                        {/* Step by step action elements */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-mono font-bold uppercase text-emerald-700 tracking-wide">Strategic Audit Steps:</p>
                          <ul className="list-disc pl-4 space-y-1.5 text-neutral-800">
                            {guideData.steps.map((st, sidx) => (
                              <li key={sidx} className="text-xs text-neutral-700 leading-relaxed font-sans font-medium">
                                {st}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Associated testing bundles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[10px] font-mono border-t border-emerald-200/30">
                          <div className="space-y-1">
                            <span className="text-emerald-700 font-bold block uppercase tracking-wider">Verification Tools:</span>
                            <span className="text-neutral-700 font-bold">{guideData.tools.join(" • ")}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-emerald-700 font-bold block uppercase tracking-wider">Impacted Engines:</span>
                            <span className="text-neutral-700 font-bold">{guideData.engines.join(" • ")}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Score weights */}
                <div className="ml-auto shrink-0 select-none">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                    isCompleted ? "bg-emerald-100/50 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    +{item.points} Pts
                  </span>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="p-8 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl">
              <CheckSquare size={28} className="mx-auto text-neutral-300 mb-1" />
              <p className="font-sans font-semibold text-neutral-500 text-xs">No matching checkpoints found</p>
              <p className="text-[11px] text-neutral-400">All tasks of this filter are cleared or you have no custom checklists added here yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Creation Block: Append custom items to this checklist Lesson */}
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex gap-2 items-center mb-4 text-neutral-800">
          <PlusCircle size={18} className="text-neutral-700" />
          <h3 className="font-sans font-bold text-sm">Create &amp; Append Custom Checklist Objectives</h3>
        </div>
        
        <form onSubmit={handleCreateChecklistItem} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="E.g. Analyze hash tags or client-specific API logs..."
                value={newChecklistTitle}
                onChange={(e) => {
                  setNewChecklistTitle(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-800 placeholder:text-neutral-400"
              />
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-semibold transition-all shrink-0 hover:scale-[1.01] cursor-pointer"
            >
              Add Checkpoint
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 font-mono">{errorMessage}</p>
          )}

          <p className="text-[10px] text-neutral-400 leading-normal font-normal">
            *Customized checkpoints will store instantly inside browser memory, letting you build custom agency audits for client web platforms on-the-fly.
          </p>
        </form>
      </div>
    </div>
  );
}
