/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level, Track, QuizQuestion, ChecklistItem } from "../types";

export const INITIAL_TRACKS: Track[] = [
  {
    id: "fundamentals",
    title: "1. Core Fundamentals & Brand Baseline",
    description: "Establish official corporate presence models, verify baseline security/protocols, and optimize initial Web Vitals site speed metrics.",
    colorClass: "bg-slate-50 border-slate-200 text-slate-800",
    textColorClass: "text-slate-700",
    levelIds: [1, 2]
  },
  {
    id: "tech-eng",
    title: "2. Technical SEO Engineering",
    description: "Deep crawl budget diagnostics, advanced sitemap routing, robust index coverage checking, international SEO, and schema validation pipelines.",
    colorClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
    textColorClass: "text-emerald-700",
    levelIds: [3, 23, 35]
  },
  {
    id: "entity-graphs",
    title: "3. IA, Silos & Entity Graphs",
    description: "Design parent-child directory structures, formulate rigid topic silos, align Wikipedia/Wikidata entity profiles, and balance internal link authority.",
    colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    textColorClass: "text-blue-700",
    levelIds: [4, 7, 8, 16]
  },
  {
    id: "content-strategy",
    title: "4. Content Strategy & On-Page Mastery",
    description: "Model long-tail intent clusters, optimize on-page headings, construct high-ROI content resources, deploy programmatic layouts, and engineer E-E-A-T trust signals.",
    colorClass: "bg-purple-50 border-purple-200 text-purple-800",
    textColorClass: "text-purple-700",
    levelIds: [5, 10, 11, 12, 27, 33]
  },
  {
    id: "semantic-markup",
    title: "5. Structured Data & Semantic Markup",
    description: "Configure advanced machine-readable JSON-LD schemas, map vocabulary concept indexes, and execute gap audits for conceptual matching.",
    colorClass: "bg-cyan-50 border-cyan-200 text-cyan-800",
    textColorClass: "text-cyan-700",
    levelIds: [6, 9, 32]
  },
  {
    id: "niche-verticals",
    title: "6. Local, E-commerce & Media Verticals",
    description: "Optimize localized physical business maps, model e-commerce product offers/ratings catalogs, and unlock rich-carousel image & video indexes.",
    colorClass: "bg-orange-50 border-orange-200 text-orange-800",
    textColorClass: "text-orange-700",
    levelIds: [21, 22, 24, 25]
  },
  {
    id: "geo",
    title: "7. Generative Engine Optimization (GEO)",
    description: "Format block-level content for retrieval-augmented generation (RAG) indices, maximize LLM references, and audit visibility inside ChatGPT, Gemini, and Claude.",
    colorClass: "bg-violet-50 border-violet-200 text-violet-800",
    textColorClass: "text-violet-700",
    levelIds: [13, 15, 31, 34]
  },
  {
    id: "aeo",
    title: "8. AEO & Answer Optimization",
    description: "Structure crisp, direct Q&A modules to secure Google featured snippets and capture spoken target answers via smart-speaker channels.",
    colorClass: "bg-amber-50 border-amber-200 text-amber-800",
    textColorClass: "text-amber-700",
    levelIds: [14, 26]
  },
  {
    id: "authority-conversion",
    title: "9. Authority, PR & Conversion Optimization",
    description: "Formulate digital PR and outreach campaigns, monitor server access logs, construct intuitive UX navigations, and run high-converting A/B audits.",
    colorClass: "bg-rose-50 border-rose-200 text-rose-800",
    textColorClass: "text-rose-700",
    levelIds: [17, 18, 19, 20, 28, 29, 30]
  },
  {
    id: "wordpress",
    title: "10. WordPress Optimization Checklist",
    description: "The complete, definitive 20-part WordPress speed, security, Core Web Vitals, schema, and GEO/AI search optimization protocol.",
    colorClass: "bg-amber-50 border-amber-200 text-amber-800",
    textColorClass: "text-amber-700",
    levelIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
  },
  {
    id: "gsc-complete",
    title: "11. Google Search Console Complete Checklist (2026-2027)",
    description: "The complete, definitive 20-part Google Search Console workflow to ensure 100% indexing parity, search visibility tracking, and advanced GEO/AEO optimization.",
    colorClass: "bg-teal-50 border-teal-200 text-teal-800",
    textColorClass: "text-teal-700",
    levelIds: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220]
  },
  {
    id: "sxo",
    title: "12. Search Everywhere Optimization (SXO) Mastery",
    description: "Optimize brand discoverability and visibility across traditional search, AI engines, chat interfaces, specialized catalogs, and social databases.",
    colorClass: "bg-indigo-50 border-indigo-200 text-indigo-800",
    textColorClass: "text-indigo-700",
    levelIds: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316]
  },
  {
    id: "gbp",
    title: "13. Google Business Profile Optimization Checklist",
    description: "Fully maximize storefront visibility, configure category & service architecture, optimize engagement media, and increase local trust conversions.",
    colorClass: "bg-sky-50 border-sky-200 text-sky-800",
    textColorClass: "text-sky-700",
    levelIds: [401, 402, 403, 404, 405]
  }
];

// Reutilize helper to generate default checkboxes for standard lists
const createItems = (levelId: number, items: { title: string; desc?: string; pts?: number }[]): ChecklistItem[] => {
  return items.map((it, idx) => ({
    id: `l${levelId}-item-${idx}`,
    title: it.title,
    description: it.desc || "Standard verification checkpoint.",
    completed: false,
    points: it.pts || 10,
    levelId
  }));
};

export const MASTER_LEVELS: Level[] = [
  {
    id: 1,
    title: "Business & Brand Foundation",
    category: "tech-foundations",
    description: "Setup official entity attributes, company registration parameters, legal frameworks, and NAP configurations to build core business authenticity.",
    difficulty: "Beginner",
    estimatedMinutes: 45,
    businessImpact: "Establishes entity status with Google Knowledge Graph and verify credibility with manual quality raters.",
    bestPractice: "Ensure exact string match for Name, Address, and Phone (NAP) across all public channels, from legal registrations to footer links.",
    details: "Your brand is a node in Google's and LLM's Knowledge Graph. Validating legal status, social links, and physical properties sets a baseline trust score.",
    checklistItems: createItems(1, [
      { title: "HTTPS Protocol Enforced", desc: "Enforce port 443 with complete modern SSL/TLS certificate setups across all directory subdomains for security compliance." },
      { title: "HSTS Activation", desc: "Inject Strict-Transport-Security header rules to protect users and bots from downgraded HTTP access." },
      { title: "Security Headers Configured", desc: "Configure X-Content-Type-Options, X-Frame-Options, and Referrer-Policy to block clickjacking and mime sniffing." },
      { title: "CSP Headers Implemented", desc: "Deploy Content-Security-Policy headers to eliminate external script injection opportunities." },
      { title: "Mixed Content Audit", desc: "Scan and fix resources loading via insecure HTTP inside secure HTTPS pages to prevent warnings." },
      { title: "Malware & Security Actions Monitoring", desc: "Review Google Search Console Security Actions tab weekly to ensure the domain remains free of malicious flags." },
      { title: "Mobile Responsive Scale Check", desc: "Verify container and font scalability across iOS & Android devices." },
      { title: "Organization Schema Added", desc: "Define official Name, LegalName, Logo, and SameAs properties to establish core entity attributes." },
      { title: "Founder & Team Profiles Implemented", desc: "Provide high EEAT signals with links to authoritative career profiles." },
      { title: "Official NAP in Footer & Contact Page", desc: "Explicitly list Name, Address, and Business Phone Number with exact matching format matching Google Business Profile." },
      { title: "Brand Name & Entity String Parity", desc: "Audit and enforce identical brand name spelling, capitalization, and spacing across code, text, metadata, and external networks." },
      { title: "Crawlable Brand UVP above the fold", desc: "Place a text-based Unique Value Proposition (UVP) in a prominent <h1> tag above the fold instead of flattening it in a banner graphic." },
      { title: "Mission & Vision statements in HTML", desc: "Publish operational mission and vision blocks as crawlable indexable HTML elements rather than images to enrich entity graph depth." },
      { title: "Legal Corporate Registration Number", desc: "Display official EIN, EIN/GST/VAT numbers, or registration metrics on legal policy or contact sheets to confirm commercial authenticity." },
      { title: "Refund/Return and Terms Page check", desc: "Ensure dedicated terms pages, return policies, and privacy disclaimers exist with clear parameters to satisfy Google manual Rater standards." },
      { title: "GDPR/CCPA-Compliant Cookie System", desc: "Deploy an active consent banner blocking non-essential trackers until explicit confirmation is recorded." }
    ])
  },
  {
    id: 2,
    title: "Domain & Hosting Optimization",
    category: "tech-foundations",
    description: "Configure modern network structures, including CDNs, HTTP/3, and Brotli compression, to ensure ultra-fast content delivery.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Faster loading speeds reduce bounce rates and improve Crawl Budget efficiencies significantly.",
    bestPractice: "Apply Edge Caching for static assets and employ Cloudflare or AWS CloudFront to render files closest to users.",
    details: "Host choice, CDN integration, and protocol standards define key crawling speed. Google rates speed on field data via Core Web Vitals.",
    checklistItems: createItems(2, [
      { title: "LCP (Largest Contentful Paint) Under 2.5s", desc: "Aim for under 2.5 seconds. Improve via CDN caching, image compression, premium hosting, and preloading hero images." },
      { title: "CLS (Cumulative Layout Shift) Under 0.1", desc: "Aim for under 0.1. Fix by sizing media with width/height attributes, swap-preloading fonts, and reserving banner boxes." },
      { title: "INP (Interaction to Next Paint) Under 200ms", desc: "Aim for under 200 milliseconds. Fix by shrinking JavaScript load weights, delaying third-party scripts, and optimization." },
      { title: "FCP (First Contentful Paint) Under 1.8s", desc: "Aim for under 1.8 seconds. Improve via critical CSS extraction and reducing render-blocking assets." },
      { title: "TTFB (Time to First Byte) Under 800ms", desc: "Aim for under 800ms (preferably under 200ms). Leverage CDN edge caching and clean, optimized data queries." },
      { title: "Critical CSS Extraction Setup", desc: "Load above-the-fold inline CSS first. Prevents render delays for initial paint scores." },
      { title: "Minification & Script Bundling", desc: "Compress and bundle CSS, JavaScript, and HTML elements to reduce overall transit size." },
      { title: "Code Splitting Implementation", desc: "Implement bundle splitting to load only necessary JavaScript on a per-view basis." },
      { title: "Lazy Loading Asset Protocols", desc: "Apply native loading=\"lazy\" to non-above-the-fold images, videos, and embedded iframe structures." },
      { title: "WebP & AVIF Image Optimization", desc: "Convert directory graphics to WebP or AVIF formats. Compress files without quality loss." },
      { title: "Resource Hints Integration", desc: "Inject preconnect, dns-prefetch, and preload tags to resolve external CDN domains earlier." },
      { title: "Priority Hints Activation", desc: "Set fetchpriority=\"high\" directly on hero images or main catalog assets." },
      { title: "Speculation Rules API Config", desc: "Set up Speculation Rules to prefetch and prerender links predicts near-instant local navigation steps." },
      { title: "Edge Rendering Deployment", desc: "Leverage edge computing server routing (e.g. Workers, Vercel Edge) to decrease latency." },
      { title: "CDN Optimization Setup", desc: "Secure multi-tier CDN configurations, automatic image caching proxy layers, and assets caching." },
      { title: "Render Blocking Assets Resolution", desc: "Remove unused styling/script elements or include async or defer tags." },
      { title: "HTTP/3 Protocol Multiplexing", desc: "Enforce modern HTTP/3 protocols to allow multiplexed streams on unstable mobile lines." },
      { title: "Brotli Compression Active", desc: "Ensure Brotli compression is configured on server outputs, offering better compression than GZIP." },
      { title: "Domain History & Wayback Sanitation", desc: "Audit historical footprints on Wayback Machine and WHOIS to eliminate domain history baggage (past spam penalties, malicious redirects)." },
      { title: "Domain Lock & Renewal Expansion", desc: "Secure domain locks with registry lock options and extend registrations for 3-5+ years forward to signal institutional stability." },
      { title: "Real-Time APM Error Monitors", desc: "Integrate Real-Time Application Performance Monitoring (APM) like New Relic or Datadog to instantly report origin server failures (5xx warnings)." }
    ])
  },
  {
    id: 3,
    title: "Technical SEO (Crawl & Render)",
    category: "tech-foundations",
    description: "Deep audit of crawler patterns. Fix indexing bugs, eliminate soft 404s, solve redirect loops, and optimize JS rendering.",
    difficulty: "Advanced",
    estimatedMinutes: 90,
    businessImpact: "Ensures Googlebot and Bingbot index all money pages without wasting resources on duplicate paths.",
    bestPractice: "Utilize GSC Index Coverage reports weekly. Run server log analysis to identify bloated script downloads.",
    details: "Crawl budget is optimized by restricting access via robots.txt, serving valid canonical tags, and eliminating redirect chains.",
    checklistItems: createItems(3, [
      { title: "XML Sitemap Submitted & Configured", desc: "Submit up-to-date page, images, video, and news maps in GSC & Bing Webmaster. Keep under 50k URLs/50MB. Ensure last read date is normal and no 4xx exists." },
      { title: "Dynamic Sitemap Implementation", desc: "Establish dynamic XML sitemaps that automatically rebuild whenever nodes are published, updated, or removed." },
      { title: "Image-Specific Sitemap Setup", desc: "List images with <image:loc> tags alongside descriptive captions and titles to capture visual search indexes." },
      { title: "Video Sitemapping Protocols", desc: "If hosting videos, document play attributes using <video:video> (title, description, raw thumbnail file) so Google can index video content." },
      { title: "News Sitemap Configuration", desc: "For publishers, maintain recent articles (last 48 hours) in a news sitemap with <news:publication> tags." },
      { title: "HTML Sitemap Deployment", desc: "Provide a human-readable list or footer links (≤100 links/page) accessible via site menu to improve crawl depth." },
      { title: "Robots.txt AI-Bot Strategy", desc: "Allow search/citations bots (OAI-SearchBot, Claude-User, Claude-SearchBot, PerplexityBot) while optionally blocking pure training bots (GPTBot, ClaudeBot)." },
      { title: "Index Now (URL Ping) Protocol", desc: "Host your IndexNow API key file at root and instantly ping Bing of content updates via: curl 'https://www.bing.com/indexnow?url=URL&key=KEY'." },
      { title: "Index Coverage Audit", desc: "Use GSC Coverage panel to find and fix pages blocked by noindex, soft 404s, or 'crawled - currently not indexed'." },
      { title: "Crawl Error Resolution", desc: "Monitor raw HTTP responses weekly to eliminate orphan redirects, dead 4xx pages, or database connection errors." },
      { title: "Canonical Tags Implementation", desc: "Deploy absolute canonical links on all items to consolidate tracking query parameter duplicate pages (e.g. HTTP vs HTTPS, www vs non-www)." },
      { title: "Log File analysis audits", desc: "Analyze raw access trace logs using Screaming Frog Log File Analyzer or ELK stack to trace Googlebot and major AI crawler activity." },
      { title: "Crawl Budget Tuning", desc: "Remove infinite calendar loops, parameter traps, and session IDs from crawl paths to conserve valuable bot queries." },
      { title: "Duplicate Content Resolution", desc: "Delete or redirect boilerplates; ensure unique, high-value (>500 words) copies are served across all URLs." },
      { title: "Orphan Page Link Interfacing", desc: "Identify pages without inbound internal links. Fix by placing contextual links or embedding in sitemaps/menus." },
      { title: "Soft 404 Status Eradication", desc: "Configure server to output standard 404 Not Found headers on invalid query paths instead of false 200 OK headers." },
      { title: "Entity Hub Pages Index Checks", desc: "Assertively verify that about pages, leadership matrices, FAQs, and glossaries are fully indexed to feed knowledge graphs." }
    ])
  },
  {
    id: 4,
    title: "Information Architecture Engineering",
    category: "architecture-semantic",
    description: "Engineered topical flow mapping. Build semantic content silos and parent-to-child hierarchies aligned to actual user paths.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Boosts internal page authority and ensures perfect semantic relevance distribution across hubs.",
    bestPractice: "Keep site depth below 3 clicks from index home, utilizing logical folder breadcrumbs.",
    details: "Information Architecture structures physical directories and inner hyperlinking. Clear taxonomies prevent child cannibalization.",
    checklistItems: createItems(4, [
      { title: "Define Flat Hierarchical Directory Structures", desc: "Avoid deep folders; organize logically (e.g., /category/topic)." },
      { title: "Construct Silo / Spoke Topic Maps", desc: "Isolate distinct categories from leaking link equity across categories." },
      { title: "Implement Dynamic breadcrumb arrays", desc: "Use complete BreadcrumbList schema on every deep page." },
      { title: "Configure Search-Intent Category Buckets", desc: "Segment paths explicitly into informational, commercial, or local maps." }
    ])
  },
  {
    id: 5,
    title: "Keyword & Prompt-Query Research",
    category: "content-onpage",
    description: "Extract high-value intent categories. Map standard search terms alongside conversational LLM prompt queries.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Captures visitors who query natural-language long-tail prompts on AI search tools instead of basic high-volume phrases.",
    bestPractice: "Research using 'People Also Ask' triggers and LLM logs to find semantic entity combinations.",
    details: "Keyword strategies have expanded into natural language. We must target multi-turn questions and conversational modifiers.",
    checklistItems: createItems(5, [
      { title: "Model Conversational Prompt Queries (e.g. 'How do I optimize...')", desc: "Brainstorm and map multi-turn, complex contextual prompts users feed to ChatGPT, Gemini, and Claude for your niche." },
      { title: "Map NLP Keywords and Synonyms in content clusters", desc: "Enrich listing models using semantic optimization packages (e.g., Clearscope, Surfer) rather than repetitive single-term density." },
      { title: "Extract People Also Ask (PAA) Queries", desc: "Scrape PAA sections under relevant keyword nodes to build clear direct question-and-answer layouts." },
      { title: "Map Commercial & Transactional Intents", desc: "Align landing pages with commercial keywords (e.g., versus articles, comparison matrices) to capture buyers near conversion stages." },
      { title: "Identify Informational Intent Targets", desc: "Identify top-of-the-funnel keywords to fuel descriptive ultimate guides and technical glossaries." },
      { title: "Construct Semantic Latent Index (LSI) Terms list", desc: "Verify key secondary vocabulary, concepts, and technical phrases are aggregated to maximize broad semantic relevancy." },
      { title: "Analyze Search Console Intent Gaps", desc: "Examine Google Search Console's high-impression/low-click keywords to identify and fix intent mismatches." },
      { title: "Map Entity Concept Synonyms list", desc: "Identify relevant industry-standard nouns, official entities, and organization brands to strengthen semantic graph proximity." }
    ])
  },
  {
    id: 6,
    title: "Semantic SEO & Topic Modeling",
    category: "architecture-semantic",
    description: "Transition from text matching to concept relevance. Model topically complete layers using vectors and LSI concepts.",
    difficulty: "Expert",
    estimatedMinutes: 75,
    businessImpact: "Establishes bulletproof topical authority, forcing search engines to rank your pages for hundreds of related terms.",
    bestPractice: "Write extensive thematic glossaries and match vector embeddings of authoritative references.",
    details: "Semantic structures inform search processors about the context of your material. Topical completeness depends on covering subtopics thoroughly.",
    checklistItems: createItems(6, [
      { title: "Perform Semantic Topic Model gaps compared to top-runners", desc: "Identify omitted subtopics in your current writing." },
      { title: "Integrate vector-friendly entities and definitions", desc: "Structure target sections to answer semantic definitions clearly." },
      { title: "Establish semantic terminology hubs and glossary links", desc: "Consolidate rare industry terms into a clear, unified page directory." },
      { title: "Validate Entity Co-occurrence matrix", desc: "Include key secondary entity terms associated with the primary theme." }
    ])
  },
  {
    id: 7,
    title: "Entity SEO Optimization",
    category: "architecture-semantic",
    description: "Identify and define real-world entities (brands, people, products, places) and model their relationships.",
    difficulty: "Expert",
    estimatedMinutes: 80,
    businessImpact: "Helps AI and traditional engines map your business as a validated 'things not strings' element within databases.",
    bestPractice: "Use explicit 'sameAs' property bindings linking directly to Wikidata and official authoritative knowledge panel items.",
    details: "Entity relationships calculate salience scores. High salience guarantees high appearance rates in automated AI-synthesized responses.",
    checklistItems: createItems(7, [
      { title: "Knowledge Graph Integration Validation", desc: "Fulfill Wikidata criteria, aggregate peer citations, and verify consistent, complete information is rendered in Google and Bing Knowledge Panels." },
      { title: "Corporate Entity Reconciliation", desc: "Synchronize company parameters across Crunchbase, Wikipedia, Wikidata, and official registries to eliminate discrepancies in bot-read databases." },
      { title: "SameAs Schema Binding Validation", desc: "Implement sameAs properties in script tags, pointing exact target links to official Wikidata, DBpedia, and authoritative corporate profiles." },
      { title: "Brand Entity Naming Consistency Check", desc: "Ensure your corporate name, address, and legal identity are written identically across sitemaps, footers, registrations, and schema bindings." },
      { title: "Author Entity Schema Optimization", desc: "Map explicit Person nodes for authors, embedding links to their external publications, certifications, and academic or professional bios." },
      { title: "Organization Entity Graph Mapping", desc: "Configure JSON-LD schemas to represent corporate hierarchies, clarifying relationship nodes between parent groups, local sub-offices, and brand sub-divisions." },
      { title: "Service Entity Structural Schema Mapping", desc: "Declare specific offerings as service objects defined by exact market entities (e.g., pointing to Wikipedia concepts of AI Optimization) rather than generic text lists." },
      { title: "Register Business Entity IDs", desc: "Claim verified corporate identity keys with search engines to enable direct knowledge graph node association." }
    ])
  },
  {
    id: 8,
    title: "Knowledge Graph Integration",
    category: "architecture-semantic",
    description: "Reconcile business attributes to secure placement in Google's Knowledge Graph and model LLM associations.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Produces reliable sidebar panels in Google search and builds immediate brand trust during ChatGPT searches.",
    bestPractice: "Establish multiple high-authority trust signals using G2, Crunchbase, Wikidata, and reliable media announcements.",
    details: "A Knowledge Graph presence makes your brand a verified source. AI engines utilize graph paths to extract trusted recommendations.",
    checklistItems: createItems(8, [
      { title: "Fulfill Wikidata criteria & draft initial drafts", desc: "Collect peer citation reviews, founder details, and registration parameters." },
      { title: "Validate corporate data representation using JSON-LD sandboxes", desc: "Eliminate nesting errors before deploying custom schema rules live." },
      { title: "Match founder properties with social entity graphs", desc: "Link corporate records securely with individual team-member databases." },
      { title: "Build external trusted signals (Crunchbase, ProductHunt)", desc: "Maintain absolute synchronization of brand facts across high-tier external indexes." }
    ])
  },
  {
    id: 9,
    title: "Structured Data & Advanced Schema",
    category: "tech-foundations",
    description: "Implement high-fidelity JSON-LD schemas. Deploy advanced configurations including Course, Event, Software, and Speakable schemas.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Unlocks rich snippets, stars, reviews, and voice-search readouts that raise click-through rates by up to 30%.",
    bestPractice: "Inject schema programmatically via clean JSON-LD injection, keeping all details matching page content exactly.",
    details: "Advanced schema flags critical facts for AI parser systems, preventing extraction errors in search summaries.",
    checklistItems: createItems(9, [
      { title: "Organization Schema Configured", desc: "Declare brand facts (Name, legalName, SameAs social profiles, and logo) to secure knowledge graph nodes." },
      { title: "Website Schema Configured", desc: "Define site search capabilities and primary domain canonical entry rules directly in home headers." },
      { title: "WebPage Schema Added", desc: "Detail specific page categorization, creation date, and semantic relationship maps." },
      { title: "Breadcrumb Schema Embedded", desc: "Guide bot spiders through page parentage levels in search result lists using proper BreadcrumbList chains." },
      { title: "Article & BlogPosting Markup", desc: "Declare publisher details, original author EEAT credentials, and modification dates for blog formats." },
      { title: "FAQ Page Schema Setup", desc: "Format QA structures clearly to capture featured snippet retrieval sweeps, AI Overviews, and voice queries." },
      { title: "LocalBusiness Schema Deployment", desc: "Set physical store addresses, precise geometric coordinates, hours, and product offerings." },
      { title: "Person Schema Implementation", desc: "Identify individual founders, authors, and experts to establish authority profiles." },
      { title: "Product Schema & Offer Rules", desc: "Map core product availability, price points, and ratings ranges to render product stars." },
      { title: "Service Schema Definitions", desc: "Showcase concrete B2B or local business service offerings with price ranges and operational areas." },
      { title: "SoftwareApplication Schema Added", desc: "Target search cards with software details (supported operating systems, app suites, and version metrics)." },
      { title: "Review & Rating Schema Hooks", desc: "Supply third-party ratings and reviewer references directly to search snippet structures." },
      { title: "VideoObject Schema Mapping", desc: "Detail video file uploads with thumbnail URLs, play timelines, and custom-play Chapters timestamp indices." },
      { title: "Event Schema Structured", desc: "Highlight upcoming corporate webinars or physical events directly in search cards." },
      { title: "Course Schema Layouts", desc: "Format training, certification, and course titles for rich educational display carousels." },
      { title: "Speakable Schema Integration", desc: "Flag specific page text components suitable for smart speaker audio reads (text-to-speech optimization)." },
      { title: "Dataset Markup Templates", desc: "Let search indexers recognize unique statistical databases and CSV reference files." },
      { title: "JobPosting Structured Data", desc: "Connect open career opportunities directly to Google Job search hubs." },
      { title: "HowTo Schema Implementation", desc: "Format tactical, step-by-step instructions with required materials, tools, and duration specifications." },
      { title: "Rich Results Schema Validation", desc: "Ensure zero warnings or critical errors exist in the Rich Results Testing tool before going production-live." }
    ])
  },
  {
    id: 10,
    title: "On-Page SEO Optimization",
    category: "content-onpage",
    description: "Master modern content structuring, keyword-to-H1 mappings, clean meta tags, image alt configurations, and page structure rules.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Immediate ranking lift for primary search queries due to improved page readability.",
    bestPractice: "Target single H1 per page, follow neat nested heading hierarchies, and summarize images with concise description strings.",
    details: "On-page layout guides reader flow and helps search bots understand page priorities quickly.",
    checklistItems: createItems(10, [
      { title: "Primary Keyword in Meta Title", desc: "Ensure your target primary keyword is front-loaded in the <title> tag (<60 characters) and aligns cleanly with search intent." },
      { title: "Primary Keyword in H1 Header", desc: "Format your main page title in a single, clean <h1> tag that naturally features your target primary keyword." },
      { title: "Target Keyword integrated in URL", desc: "Build a short, clear slug containing your target keyword without special characters, parameters, or redundant folders." },
      { title: "Keyword in Meta Description Tag", desc: "Craft an engaging meta description (<155 characters) featuring your primary keyword to maximize click-through rates on search pages." },
      { title: "NLP & LSI Semantic Keywords Density", desc: "Incorporate secondary contextually related LSI terms naturally throughout the text using NLP tools instead of stuffing keywords." },
      { title: "Entity Keyword Graph Integration", desc: "Explicitly reference main industry entities, brands, and concept names to establish standard Knowledge Graph associations." },
      { title: "Topic Clusters & Related Searches Alignment", desc: "Cover queries from the Google Search Console 'Related Searches' block to capture organic long-tail query traffic." },
      { title: "People Also Ask (PAA) Conversational Targeting", desc: "Scrape PAA sections and answer the questions directly inside clear FAQ accordions to secure rich snippets and AEO placement." },
      { title: "Strict Single H1 Tag Enforcement", desc: "Confirm there is exactly one <h1> tag on the page to prevent semantic tag confusion for Googlebot and other AI scrapers." },
      { title: "Proper Nested H2-H6 Heading Flow", desc: "Enforce strict sequential hierarchy (H2 -> H3 -> H4) without skipping steps to keep the document structure clean." },
      { title: "Short Paragraphs for Better UX (Readable)", desc: "Restrict body copy chunks to less than 4 sentences to improve mobile UX, reading scores, and accessibility rankings." },
      { title: "Semantic Bullet Lists and Tables", desc: "Use clean HTML ordered/unordered lists and semantic tabular markup to make comparison data easily indexable by search robots." },
      { title: "Topic Clusters & Pillar Page Network", desc: "Establish deep educational hubs and pillar pages interlinked with highly targeted cluster child-articles." },
      { title: "Content Hub Semantic Coverage", desc: "Cover all relevant facets of search themes completely to maximize automated semantic categorization models." },
      { title: "Structural Content Entity Mapping", desc: "Embed core concepts with explicit entity metadata relations to feed conversational search retrieval algorithms." },
      { title: "AEO/GEO Direct Answer-Snippet Paragraphs", desc: "Incorporate direct, bold 40-60 word summaries immediately under question headings to act as optimal AI-engine citation bait." },
      { title: "Real Experience Indicators (Originality)", desc: "Support advice using practical, hands-on user case studies, high-resolution original screenshots, and custom vectors." },
      { title: "Expertise Badges & Author Profiles", desc: "Identify qualified creators or reviewers with highly detailed author bio sheets mapping to personal pages." },
      { title: "Verifiable Expert Credentials", desc: "Explicitly mention academic certifications, business background, and verified industry associations to reinforce authority." },
      { title: "Industry Citations & Backlink Anchors", desc: "Attribute trusted sources via clean outgoing authority links and secure editorial inbound citation mentions." },
      { title: "Trust Essentials: NAP & Support Info", desc: "Add valid support options, contact forms, physical offices, and phone numbers in the footer blocks." },
      { title: "Privacy Policy & Terms Compliance Check", desc: "Enforce updated legal templates meeting regulatory GDPR/CCPA standards to optimize domain trust rankings." }
    ])
  },
  {
    id: 11,
    title: "E-E-A-T Optimization Framework",
    category: "content-onpage",
    description: "Embed real human experience (E), specialist expertise (E), domain authority (A), and brand trust (T) across landing zones.",
    difficulty: "Advanced",
    estimatedMinutes: 70,
    businessImpact: "Protects your site from core Google Search algorithm updates targeting low-effort synthetic blogs.",
    bestPractice: "Feature original, hands-on user case studies, high-resolution screenshots, and verifiable author resumes.",
    details: "Quality raters follow EEAT matrices. Google uses secondary systems to approximate expertise automatically.",
    checklistItems: createItems(11, [
      { title: "Add expert author bylines mapping directly to detailed biography sheets", desc: "Add real credentials, certifications, academic background, and links to personal professional pages (Linkedin, sameAs Wikidata)." },
      { title: "Incorporate original case studies containing proprietary metrics", desc: "Document real-world client data and hands-on operational trials with a first-person problem-solution-result framework." },
      { title: "Integrate high-resolution original screenshots and visual captures", desc: "Ensure you use original screenshots, custom vector diagrams, and graphs over repetitive, generic stock imagery." },
      { title: "Implement Fact Checked & Peer Review loops", desc: "Establish transparent factual accuracy badges indicating review dates and facts parsed by a certified second-party expert." },
      { title: "Publish transparent Editorial Policy & Standard document", desc: "Define explicit editorial corrections protocols, sources of statistics, and fact-checking standards in an accessible text resource." },
      { title: "Build robust institutional corporate About Page", desc: "Create an active team showcase tracing corporate milestones, leadership backgrounds, parent partnerships, and operational credentials." },
      { title: "Review trust disclaimers and privacy protocols (YMYL)", desc: "Maintain visible, easily navigable links to privacy policies, comprehensive legal disclaimers, and transparent refund patterns." },
      { title: "Audit scholarly outward citation links", desc: "Provide high contextual trust by attributes or citations linking to authoritative sources (.gov, .edu, and verified clinical journals)." },
      { title: "Establish regular content-freshness update workflows", desc: "Append a clear, visible 'Last Updated' timestamp near the top of educational articles to indicate active content maintenance." }
    ])
  },
  {
    id: 12,
    title: "Enterprise Content Strategy",
    category: "content-onpage",
    description: "Construct integrated content models. Map out high-yielding Top-of-Funnel (TOFU) to Bottom-of-Funnel (BOFU) assets.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Nurtures single visitors into qualified sales-ready leads across an efficient education pipeline.",
    bestPractice: "Use visual map tracking to connect technical glossary sheets with sales demo landing zones.",
    details: "A comprehensive strategy balances high-volume educational guides with focused commercial comparison resources.",
    checklistItems: createItems(12, [
      { title: "Audit content gap against competitor domain setups", desc: "Discover missing educational search terms using target crawling." },
      { title: "Establish distinct clusters for informational (TOFU) pages", desc: "Write exhaustive glossaries, basic walk-through guides, and general explainers." },
      { title: "Design commercial comparison (MOFU) checklists", desc: "Craft deep benchmark analysis, versus pages, and templates." },
      { title: "Build conversion-optimized transactions (BOFU) structures", desc: "Maximize purchase-intent signups via detailed benefits and interactive models." }
    ])
  },
  {
    id: 13,
    title: "GEO (Generative Engine Optimization)",
    category: "ai-search-nextgen",
    description: "Align and format asset structures for modern Large Language Models and Retrieval-Augmented Generation retrieval sweeps.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Ensures your business and services are selected as the primary recommendation in ChatGPT and Gemini replies.",
    bestPractice: "Incorporate statistics, structured summaries, direct bold answers, and factual citations near the top of sections.",
    details: "Generative Engines retrieve relevant segments of pages. Clear content structures make extraction clean for generative answering.",
    checklistItems: createItems(13, [
      { title: "Deploy llms.txt at Root", desc: "Publish a high-level summary file as /llms.txt so AI search models (like Perplexity and Gemini) can parse the site structure easily." },
      { title: "Develop llms-full.txt Context Files", desc: "Create an expanded /llms-full.txt layout containing complete site documentation text to fuel active RAG database context injections." },
      { title: "Audit AI Bot Crawler Access Rules", desc: "Configure robots.txt headers specifically defining access privileges and blocks for AI models." },
      { title: "Manage GPTBot Crawler Permissions", desc: "Declare explicit permit or omit instructions for OpenAI's GPTBot crawler scripts." },
      { title: "Establish ClaudeBot Accessibility Parameters", desc: "Ensure Anthropic's ClaudeBot can view dynamic pages to quote brand data in conversational replies." },
      { title: "Secure PerplexityBot Scrape Rights", desc: "Verify PerplexityBot reaches high-value product comparison grids to credit the domain's citations." },
      { title: "Configure Google-Extended Directives", desc: "Determine opt-in or opt-out relationships for the Google-Extended token to regulate Gemini model indexing." },
      { title: "AI Content Retrieval Optimization", desc: "Create clear, high-density summary blocks near top fold areas to facilitate easy retrieval by search spiders." },
      { title: "Formulate RAG-Friendly Site Architectures", desc: "Structure directories and link hubs using direct paths. Prevents token fragmentation in LLM search pipelines." },
      { title: "Implement AI Chunk Optimization", desc: "Draft self-contained paragraphs that maintain clear context so they can easily fit within common vector embedding limits." },
      { title: "AI Citation Optimization Hooks", desc: "Feature original statistics, research data tables, and expert quotes to encourage AI models to include citation links." },
      { title: "Perform QA Intent Structure Mapping", desc: "Format explicit user queries as H2 titles accompanied by swift, direct, fact-rich conversational answers." }
    ])
  },
  {
    id: 14,
    title: "AEO & Answer Optimization",
    category: "ai-search-nextgen",
    description: "Format visual tables, step lists, and short definitions to capture high-volume Featured Snippets and instant query boards.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Secures zero-click rankings, putting your brand answer at the absolute top of Google Search.",
    bestPractice: "Formulate answer sections as standard 40-to-60 word summaries immediately under question headers.",
    details: "Featured snippets prioritize short blocks of text. Tables and lists must use clean web standard HTML markers.",
    checklistItems: createItems(14, [
      { title: "1. Definition Optimization (Basic) - Format 40-60 Word Boxes", desc: "Format exact 40-60 word standard definition boxes immediately below questions to maximize Featured Snippet eligibility." },
      { title: "1. Definition Optimization (Advanced) - Multiple Variations", desc: "Create multiple beginner-friendly, expert-level, and industry-standard definitions with glossary schema and internal entity references." },
      { title: "2. Question Optimization (Basic) - Question Headings", desc: "Formulate primary headings (H2/H3) explicitly utilizing direct query roots (What, Why, How, When, Where, Who)." },
      { title: "2. Question Optimization (Advanced) - Cover PAA & Follow-Ups", desc: "Cover conversational, follow-up, objection, voice search, and AI prompt queries based on People Also Ask metrics." },
      { title: "3. Snippet Optimization (Basic) - Filler-Free Answers", desc: "Provide a concise, direct, filler-free answer immediately underneath each question header using simple, clear language." },
      { title: "3. Snippet Optimization (Advanced) - Multi-Snippet Audits", desc: "Conduct target formatting optimizations for Paragraph, List, Table, Definition, Comparison, Process, and Statistics Snippets." },
      { title: "4. List Optimization (Basic) - Semantic HTML Lists", desc: "Utilize correct semantic markup (ordered lists for processes and unordered lists for collections) so crawlers extract lists easily." },
      { title: "4. List Optimization (Advanced) - Specialized List Formats", desc: "Design high-traffic lists including Top 10, Best Practices, step-by-step guides, priority-based, and comparison checklists." },
      { title: "5. Table Optimization (Basic) - Simple Native Tables", desc: "Use simple native HTML table tags with standard header structures to facilitate seamless tabular data indexing." },
      { title: "5. Table Optimization (Advanced) - Structured Comparison Matrixes", desc: "Implement structured Comparison, Feature, Pricing, Statistics, and Pros vs Cons tables comparing against direct competitors." },
      { title: "6. Process Optimization (Basic) - Numbered Process Workflows", desc: "Structure complex workflows using simple numbered steps in logical progression with one core action per step." },
      { title: "6. Process Optimization (Advanced) - Add Metadata & Prerequisites", desc: "Enrich numbered steps with estimated execution times, prerequisites, common mistakes, expected results, and troubleshooting tips." },
      { title: "7. FAQ Optimization (Basic) - Page FAQ Cards", desc: "Embed FAQ Sections on every key commercial and informational landing page backed by complete correct FAQ schemas." },
      { title: "7. FAQ Optimization (Advanced) - Target Entity & AI FAQs", desc: "Incorporate specialized Entity FAQs, Service/Product FAQs, Industry-specific, and Conversational AI Search answers." },
      { title: "8. Voice Search Optimization (Basic) - Conversational Dialogue Style", desc: "Draft high-retrieval conversational phrasing, natural rhythmic sentence structures, and long-tail query answers." },
      { title: "8. Voice Search Optimization (Advanced) - Speakable markup & Voice Mapping", desc: "Implement Speakable schema tags, Voice Intent Mapping, Mobile Voice optimization, and Near Me conversational follow-ups." },
      { title: "9. AI Overview Optimization (Basic) - Structured Summaries", desc: "Structure direct, highly readable summaries that and let AI search engines pull them cleanly into AI Overview panels." },
      { title: "9. AI Overview Optimization (Advanced) - Citation Blocks & Original Data", desc: "Deploy AI Overview citation blocks, source attribution anchors, original research findings, data-driven answers, and expert quotes." },
      { title: "10. ChatGPT / Gemini / Claude Optimization (Basic) - Entity-Rich Content", desc: "Draft self-contained, fact-rich sections containing clear entity attributes so chatbots categorize your brand correctly." },
      { title: "10. ChatGPT / Gemini / Claude Optimization (Advanced) - Retrieval-Friendly Blocks", desc: "Optimize semantic text chunks, integrate citation-worthy benchmarks, and map expert quotes for LLM citation algorithms." },
      { title: "11. Comparison Optimization (Basic) - Alternatives & Vs Pages", desc: "Formulate dedicated X vs Y comparison guides, Alternative software lists, and complete pros and cons profiles." },
      { title: "11. Comparison Optimization (Advanced) - Decision Framework Matrixes", desc: "Build side-by-side matrices, expert decision frameworks, customer pricing matrixes, and cost/ROI mappings." },
      { title: "12. Trust & Authority Signals (Basic) - Core Transparency Meta", desc: "Include clearly visible author names, last updated timestamps, bibliography references, and authoritative outward citation logs." },
      { title: "12. Trust & Authority Signals (Advanced) - Industry / Academic Backing", desc: "Feature expert peer-review banners, detailed author bios, experience credentials, and outbound reference links to state/educational domains." },
      { title: "13. Multimedia Answer Optimization (Basic) - Adaptive Image Snaps", desc: "Place relevant graphics, annotated product screenshots, or visual flowcharts in close proximity to direct text answers." },
      { title: "13. Multimedia Answer Optimization (Advanced) - Interactive Media Chapters", desc: "Incorporate short video summaries with timestamps / video chapters, complete textual interactive transcript files, and walkthroughs." },
      { title: "14. Answer Completeness Optimization (Basic) - Direct Goal Solutions", desc: "Completely solve the primary search intent directly on the page without requiring the user to bounce back to search boards." },
      { title: "14. Answer Completeness Optimization (Advanced) - Deep Topic Coverage", desc: "Map potential fallback queries, related questions, edge cases, exceptions, common mistakes, and hands-on examples." },
      { title: "15. Featured Snippet Audit (Basic) - Formats & Counts Checks", desc: "Establish basic rules checking paragraph word counts (40-60 words), list semantic markers, and simple comparison structures." },
      { title: "15. Featured Snippet Audit (Advanced) - Automated Snippet Verifier", desc: "Employ automated validations comparing rendered markup text length against target snippet formats to prevent clipping." },
      { title: "16. Entity-Based AEO - Wikidata & Knowledge Graph Link", desc: "Map company Wikidata and Crunchbase records to brand SameAs tags, specifying founder and service entity definitions." },
      { title: "17. Advanced AI Optimization (2026+) - LLM Manifests & RAG Hooks", desc: "Deploy llms.txt and llms-full.txt files, insert Fraggle semantic node anchors, and configure retrieval-augmented-generation headers." }
    ])
  },
  {
    id: 15,
    title: "AIO (AI Optimization & Visibility)",
    category: "ai-search-nextgen",
    description: "Optimize brand equity parameters across massive LLMs. Verify entity definitions inside ChatGPT, Claude, and Gemini.",
    difficulty: "Expert",
    estimatedMinutes: 80,
    businessImpact: "Generates high share of brand voice across modern generative recommendations.",
    bestPractice: "Synchronize company histories and references across Crunchbase, Wikidata, GitHub, and high-level publications.",
    details: "LLMs utilize static training databases and active search retrievals. Securing consistent brand descriptions ensures clean discovery.",
    checklistItems: createItems(15, [
      { title: "Register the brand profile across Wikidata networks", desc: "Secure official linked data keys for central business parameters." },
      { title: "Deploy structured business sheets on Crunchbase", desc: "Feed institutional datasets directly to AI engine scrapers." },
      { title: "Analyze brand recommendations in modern chat prompts", desc: "Run test scenarios in Gemini and ChatGPT to verify recommend rates." },
      { title: "Deploy codebases, open-source utilities to GitHub", desc: "Feed rich source repositories directly into developer training models." }
    ])
  },
  {
    id: 16,
    title: "Internal Linking Architecture",
    category: "content-onpage",
    description: "Plan and optimize anchor text distributions, establish parent topical hubs, and automate links to high-priority pages.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Distributes link equity across pages, helping deeper content rank without endless external building.",
    bestPractice: "Maintain exact anchor text relevance, avoid generic links like 'click here', and eliminate broken internal redirects.",
    details: "Internal links form crawling networks for search spiders, distributing keyword signals and authority throughout the directory structure.",
    checklistItems: createItems(16, [
      { title: "Implement context-rich matching anchor texts", desc: "Include key industry descriptive phrases instead of plain 'read more' links." },
      { title: "Eliminate orphaned pages (pages with zero links)", desc: "Maintain cross-linking patterns so crawl spiders discover every essential URL." },
      { title: "Link parent topic hubs to specific child subtopics", desc: "Reinforce structure with strong vertical linking." },
      { title: "Verify that all internal anchors use clean direct target paths", desc: "Prevent unnecessary redirect lags by avoiding loops." }
    ])
  },
  {
    id: 17,
    title: "Off-Page SEO & Backlinks",
    category: "authority-citations",
    description: "Formulate healthy, high-authority backlink development practices. Pursue editor-vetted write-ups and avoid low-tier schemes.",
    difficulty: "Advanced",
    estimatedMinutes: 75,
    businessImpact: "Establishes domain authority, forming the foundation of high rankings for competitive terms.",
    bestPractice: "Prioritize contextually relevant links on domains with deep organic traffic over metric-inflated link farms.",
    details: "Links are search engine recommendations. Authoritative links indicate high trust, helping pages rank much faster. Off-page SEO follows 5 maturity levels: Level 1 (Basic: Directories, Guest Posts, Social, Reviews); Level 2 (Advanced: Editorial Links, Digital PR, Niche Citations, Brand Mentions); Level 3 (Authority: Research Reports, Expert Mentions, Industry Citations, Thought Leadership); Level 4 (AI Visibility: ChatGPT, Gemini, Claude, Perplexity Citations, and AI Mentions); Level 5 (Entity Authority: Knowledge Graph Signals, Wikidata node creation, and Brand Entity Consistency). Use this comprehensive checklist to audit and optimize every off-page ranking signal.",
    checklistItems: createItems(17, [
      // 1. Backlink Foundation
      { title: "Homepage Backlinks Audit", desc: "Why it Matters: Improves overall domain authority. Strategic Audit: Check homepage backlink volume, verify link quality, review anchor text diversity, and ensure links come from relevant websites." },
      { title: "Service Page Backlinks Audit", desc: "Why it Matters: Helps service pages rank faster. Strategic Audit: Check direct links to service pages, verify page relevance, and review linking page quality." },
      { title: "Blog Content Backlinks Audit", desc: "Why it Matters: Improves topical authority. Strategic Audit: Review links to informational content, check authority of linking domains, and verify contextual placement." },
      { title: "Deep Page Links Audit", desc: "Why it Matters: Strengthens overall website architecture. Strategic Audit: Analyze backlink distribution, ensure links point beyond homepage, and check that important pages receive links." },

      // 2. Link Quality Assessment
      { title: "Relevant Industry Links", desc: "Why it Matters: Relevance is a major ranking factor. Strategic Audit: Verify linking site industry relevance, review content relationship, and check contextual placement." },
      { title: "Authority Links Verification", desc: "Why it Matters: High-authority domains pass stronger signals. Strategic Audit: Check Domain Authority/Rating, review trust signals, and analyze referring domain quality." },
      { title: "Editorial Links Validation", desc: "Why it Matters: Most trusted backlink type. Strategic Audit: Confirm link is naturally earned, verify editorial placement, and review content quality." },
      { title: "Government Links (.gov)", desc: "Strategic Audit: Check government mentions, verify contextual relevance, and review authority transfer opportunities." },
      { title: "Educational Links (.edu)", desc: "Strategic Audit: Audit university references, check resource page opportunities, and review citation potential." },
      { title: "News & Media Links Audit", desc: "Strategic Audit: Check media coverage, review press mentions, and verify dofollow/nofollow status." },

      // 3. Anchor Text Optimization
      { title: "Branded Anchors (e.g. AKGLS Group, HashStudioz)", desc: "Strategic Audit: Check percentage of branded anchors and verify natural distribution to avoid penalty triggers." },
      { title: "Naked URL Anchors Integration", desc: "Strategic Audit: Review URL anchor ratio and ensure a natural backlink profile distribution." },
      { title: "Generic Anchors Verification (e.g. Click Here, Learn More)", desc: "Strategic Audit: Verify generic anchor diversity and avoid over-optimization of specific keyword phrases." },
      { title: "Partial Match Anchors Audit", desc: "Strategic Audit: Review keyword usage within anchors and check the surrounding natural content context." },
      { title: "Exact Match Anchors Restriction", desc: "Strategic Audit: Limit aggressive exact phrase optimization and monitor real-time search engine spam risk indices." },

      // 4. Guest Posting
      { title: "Relevant Guest Posts Pitching", desc: "Strategic Audit: Review target blog niche relevance, check content quality standards, and verify author bio links." },
      { title: "Contextual Links Insertion", desc: "Strategic Audit: Check link placement within body content. Avoid footer or sidebar links and ensure natural integration." },
      { title: "Authority Guest Posts Selection", desc: "Strategic Audit: Review publication domain authority, analyze actual monthly traffic potential, and check strict editorial guidelines." },
      { title: "Thought Leadership Articles Strategy", desc: "Strategic Audit: Publish expert opinions, include proprietary brand insights, and actively build primary author authority." },

      // 5. Digital PR
      { title: "Press Releases Distribution", desc: "Strategic Audit: Review newsworthy announcements, verify media distribution reach, and check syndicated pickups." },
      { title: "Brand Mentions Monitoring", desc: "Strategic Audit: Monitor online brand mentions, convert unlinked mentions to active links, and track mentions sentiment." },
      { title: "Journalist Outreach CRM", desc: "Strategic Audit: Build a database of niche-specific journalists, pitch expert commentary, and track response/outreach success rates." },
      { title: "Newsjacking Campaign Deployment", desc: "Strategic Audit: Identify trending national/industry topics, create timely expert perspective content, and earn high-tier media mentions." },

      // 6. Citation Building
      { title: "Business Directories Sync", desc: "Strategic Audit: Verify Name-Address-Phone (NAP) consistency, audit directory profiles, and check profile completeness." },
      { title: "Local Citations Mapping", desc: "Strategic Audit: Review local listings Google/Bing Maps integration, verify category accuracy, and monitor duplicates." },
      { title: "Industry/Niche Citations Audit", desc: "Strategic Audit: Identify niche directories, verify their internal authority, and maintain listing consistency." },
      { title: "SaaS Citations Management (e.g. G2, Capterra, Product Hunt)", desc: "Strategic Audit: Complete detailed profiles, systematically gather user reviews, and monitor search page visibility." },

      // 7. Entity SEO Off-Page
      { title: "Brand Entity Signals Enhancement", desc: "Strategic Audit: Audit brand mentions across the web, check naming consistency, and verify search engine entity recognition." },
      { title: "Wikidata Presence Node Setup", desc: "Strategic Audit: Verify Wikidata/Wikipedia entity node creation, review attributes, and monitor updates." },
      { title: "Knowledge Graph Signals Sync", desc: "Strategic Audit: Review entity connections, validate structured references, and check SameAs consistency in schemas." },

      // 8. AI Citation Building (NEW)
      { title: "AI Citation Building (NEW)", desc: "Strategic Audit: Build citations within AI engines like ChatGPT, Gemini, Claude, and Perplexity by targeting key terms and indexing hubs." },
      { title: "ChatGPT Citations Audit", desc: "Strategic Audit: Search relevant industry prompts in ChatGPT, check if your brand appears in suggestions, and review the cited sources." },
      { title: "Gemini Citations Optimization", desc: "Strategic Audit: Analyze presence in Gemini AI Overviews, review the cited source pages, and actively identify coverage gaps." },
      { title: "Claude Citations Audit", desc: "Strategic Audit: Check research visibility in Claude conversations and monitor source reference documentation." },
      { title: "Perplexity Citations Comparison", desc: "Strategic Audit: Search core niche keywords in Perplexity, review cited competitors, and compare citation frequency." },

      // 9. AI Mention Building
      { title: "Reddit Discussions Participation", desc: "Strategic Audit: Monitor niche discussions, participate authentically with expert commentary, and track brand references." },
      { title: "Quora Authority Answers", desc: "Strategic Audit: Answer industry-leading questions, build native profile authority, and track response visibility." },
      { title: "LinkedIn Engagement Tracking", desc: "Strategic Audit: Publish highly-insightful expert opinions, encourage peer engagement, and monitor company page shares." },
      { title: "Forum & Community Mentions Tracker", desc: "Strategic Audit: Participate in niche forums, build recognized expertise, and track discussions." },
      { title: "Industry Expert Mentions Outreach", desc: "Strategic Audit: Build relationships with niche influencers, collaborate on content, and earn contextual citations." },

      // 10. Review Management
      { title: "Google Reviews Volume Boost", desc: "Strategic Audit: Monitor GBP review volume, proactively improve organic ratings, and reply to all positive/negative reviews." },
      { title: "Third-Party Reviews Tracker", desc: "Strategic Audit: Track external platforms (Yelp, Trustpilot), encourage organic customer reviews, and address complaints." },

      // 11. Social Signals
      { title: "Social Profiles Optimization (LinkedIn, FB, X, IG, YT)", desc: "Strategic Audit: Verify completeness of corporate channels, ensure absolute branding and NAP consistency, and include primary website links." },
      { title: "Social Amplification Analysis", desc: "Strategic Audit: Measure content share rates across social media, track real engagement metrics, and identify top-performing shareable assets." },

      // 12. Competitive Backlink Analysis
      { title: "Backlink Gap Analysis", desc: "Strategic Audit: Identify close competitor links, locate missing domain opportunities, and prioritize outreach lists." },
      { title: "Mention Gap Audit", desc: "Strategic Audit: Compare brand mention volume, identify missing publications, and build a strategic coverage outreach plan." },
      { title: "Citation Gap Audit", desc: "Strategic Audit: Compare citation sources against competitors, audit directory presence, and close visibility gaps." },

      // 13. Toxic Link Management
      { title: "Spam Link Profile Audit", desc: "Strategic Audit: Identify spammy or low-quality incoming links, review anchor text abuse, and monitor unexpected link count spikes." },
      { title: "Disavow File Review", desc: "Strategic Audit: Validate truly toxic domains, prepare Google Disavow text files, and monitor organic rank recovery." },

      // 14. Authority Asset Promotion
      { title: "Promote Linkable Assets (Reports, Stats, Tools, Case Studies)", desc: "Strategic Audit: Research and launch promotion campaigns for linkable assets. Verify promotion campaigns, measure earned links, and track mentions." },

      // 15. Enterprise Off-Page SEO (2026+)
      { title: "Digital Authority & Recognition (Expert Interviews, Podcasts, Awards)", desc: "Strategic Audit: Review authority assets, check external recognition tracks (speaking, podcasts, webinar series, academic citations), and measure citation growth." }
    ])
  },
  {
    id: 18,
    title: "Citation Building & Management",
    category: "authority-citations",
    description: "Construct business listings across primary portals including Yelp, Apple Business Connect, G2, and Capterra.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Powers local search results and satisfies structured authority parameters within maps and directories.",
    bestPractice: "Maintain absolute synchronization of brand facts, address coordinates, and logos across all portals.",
    details: "Consistent listings verify business operations to aggregators, increasing baseline trust algorithms.",
    checklistItems: createItems(18, [
      { title: "Optimize Google Business Profile and Bing Places", desc: "Verify coordinates, upload real team photos, and set hours." },
      { title: "Publish validated records to G2, Crunchbase, and Yelp", desc: "Create high-authority profiles on major B2B and local reviews sites." },
      { title: "Map identical company NAP records across citations", desc: "Prevent duplicates or conflicting address data." },
      { title: "Secure claims on directories relevant to your industry", desc: "Ensure your brand is represented in niche-specific industry directories." }
    ])
  },
  {
    id: 19,
    title: "Digital PR & Brand Outreach",
    category: "authority-citations",
    description: "Launch targeted press campaigns and provide expert quotes to earn editorial links and high-authority media coverage.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Unlocks high-authority, uncopyable links that competitors cannot easily duplicate.",
    bestPractice: "Focus your pitches on original datasets and insightful industry reports, rather than generic corporate announcements.",
    details: "Digital PR connects your brand with premium publishers, boosting both authority signals and direct traffic.",
    checklistItems: createItems(19, [
      { title: "Execute campaigns providing expert insights", desc: "Monitor journalist source platforms (e.g., HARO alternatives) to secure high-tier placements." },
      { title: "Conduct proprietary data studies and surveys", desc: "Publish unique data that journalists will reference and link back to." },
      { title: "Build personalized media lists of target editors", desc: "Focus outreach on writers covering your specific niche." },
      { title: "Leverage newsjacking opportunities", desc: "Contribute expert perspectives on breaking industry developments." }
    ])
  },
  {
    id: 20,
    title: "Social SEO Optimization",
    category: "authority-citations",
    description: "Optimize social media profiles (LinkedIn, X, YouTube, Instagram) to secure brand-name real estate on main SERPs.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Protects your brand name in search and establishes multiple touchpoints for brand search visibility.",
    bestPractice: "Keep brand names, details, and core descriptions uniform to avoid search result confusion.",
    details: "Social profiles often rank page one for brand queries. Keeping them well-optimized and active builds search trust.",
    checklistItems: createItems(20, [
      { title: "Secure identical usernames on all primary platforms", desc: "Keep handles consistent across LinkedIn, YouTube, X, and Facebook." },
      { title: "Optimized profile descriptions using brand keywords", desc: "Write professional, search-friendly bios on all corporate networks." },
      { title: "Link profiles back to your primary business domain", desc: "Establish official two-way link connections between sites and profiles." },
      { title: "Implement schema markings linking to public handles", desc: "Verify sameAs targets include all active social hubs." }
    ])
  },
  {
    id: 21,
    title: "Local SEO Mastery",
    category: "tech-foundations",
    description: "Dominate local maps, optimize Google Business profiles, and match geometric search intent.",
    difficulty: "Intermediate",
    estimatedMinutes: 60,
    businessImpact: "Powers map pack appearances, driving local customer inquiries and walk-ins directly.",
    bestPractice: "Collect and reply to customer reviews, upload geotagged images, and target local long-tail keywords.",
    details: "Local algorithms rely on Relevance, Distance, and Prominence. Keeping profiles fresh signal active operations.",
    checklistItems: createItems(21, [
      { title: "Select correct primary and secondary GBP categories", desc: "Audit and select hyper-accurate business categories within your Google Business Profile dashboard to avoid penalties." },
      { title: "Dual-Mapping listing setup (Bing & Apple)", desc: "Maintain synchronized business profiles with verified credentials on Bing Places and Apple Business Connect channels." },
      { title: "Launch automated review invite workflows", desc: "Build automated post-interaction prompts to collect positive reviews and systematically reply to all customer feedback." },
      { title: "Embed localized maps directly on contact pages", desc: "Incorporate native Google Map embeds indicating exact physical geo-coordinates, with explicit click-to-directions links." },
      { title: "Geotagged image uploads and local team vectors", desc: "Enrich listings with actual, geotagged office photos and local assets rather than stock photography." },
      { title: "Hyper-Local sub-folder landing pages", desc: "Establish distinct landing pages for localized branches containing isolated team bios, customer reviews, and regional transit descriptions." }
    ])
  },
  {
    id: 22,
    title: "E-commerce SEO Configuration",
    category: "tech-foundations",
    description: "Optimize category taxomomies, inject product-review schemas, configure Google Merchant Center, and manage out-of-stock items.",
    difficulty: "Advanced",
    estimatedMinutes: 80,
    businessImpact: "Improves organic category and product search traffic, minimizing dependency on paid retargeting.",
    bestPractice: "Implement self-contained product schemas, write custom descriptions, and deploy clean faceted navigation paths.",
    details: "Ecomm SEO requires managing complex product listings, resolving duplicate dynamic URLs, and maintaining clean schema tags.",
    checklistItems: createItems(22, [
      { title: "Add core Product schema parameters to listings", desc: "Declare explicit SKU, brand, price conditions, stock availability tags, and aggregate rating metadata inside clean JSON-LD." },
      { title: "Establish static, indexable category landing pages", desc: "Develop content-rich, crawlable parent categories while blocking thin faceted filtering parameters from search indexes." },
      { title: "Formulate helpful unique product descriptions", desc: "Write original, benefit-driven product copy (~500 words) instead of copying manufacturer template sheets." },
      { title: "Manage out-of-stock items with explicit redirects", desc: "Retain indexing equity for temporary out-of-stock items, or apply automated 301 paths for permanently discontinued lines." },
      { title: "Synchronize Google Merchant Center XML Feeds", desc: "Ensure real-time pricing, stock increments, and custom discounts sync flawlessly via dynamic automated feeds." },
      { title: "Dynamic User Review Ingestion Pipelines", desc: "Create widgets that digest verified user reviews and append them directly to the page's HTML to build fresh visual and semantic signals." }
    ])
  },
  {
    id: 23,
    title: "International SEO Architecture",
    category: "tech-foundations",
    description: "Configure international hreflang tags, map directory structures, and optimize multiregion geo-targeting parameters.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Presents pages in users' preferred languages and locations, minimizing bounce rates and boosting regional conversions.",
    bestPractice: "Serve clean regional HTML header tag maps, and avoid relying purely on automatic IP-based redirects.",
    details: "International search setups signal regional relevance to bots, preventing index duplicate penalties across near-identical translations.",
    checklistItems: createItems(23, [
      { title: "Hreflang Validation & Syntax Audits", desc: "Ensure alternate language versions contain error-free, bidirectional hreflang tags rendering HTTP 200 OK targets." },
      { title: "Language Targeting Declarations", desc: "Configure HTML lang elements (e.g. lang=\"en-GB\") precise to targets so browser readers identify specific regional dialects." },
      { title: "Geo-Targeting Parametrization", desc: "Leverage Google Search Console country targeting parameters or domain geo-directories to signal regional relationships." },
      { title: "International Canonicalization Safeguards", desc: "Prevent duplicate page designations by enforcing self-referential canonical tags on each local-language page version." },
      { title: "Country Sitemap Deployment", desc: "Submit isolated sitemaps containing region-specific URLs (e.g., /de/sitemap.xml) directly to regional indexers." },
      { title: "Directory Structures Setup (ccTLDs vs Folders)", desc: "Adopt subdirectory hierarchies (e.g., domain.com/es/) for maximum consolidated domain authority over separate ccTLDs." },
      { title: "Human Translate Localization Reviews", desc: "Avoid machine translation duplicates by polishing target languages with human context to build high contextual trust." }
    ])
  },
  {
    id: 24,
    title: "Video SEO Strategy",
    category: "tech-foundations",
    description: "Implement video sitemaps, embed structured VideoObject schema, write clean transcripts, and tag custom play Chapters.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Ranks your educational and product videos on Google's Video tab and within YouTube recommended flows.",
    bestPractice: "Map out key moments within schema patterns, and upload clean, keyword-optimized transcripts.",
    details: "Bots cannot read video pixels; they rely heavily on meta descriptions, chapters, sitemaps, and transcript text.",
    checklistItems: createItems(24, [
      { title: "Embed detailed VideoObject schemas on hosts", desc: "Detail thumbnail URLs, upload timelines, descriptions, and duration properties." },
      { title: "Publish structured Video Sitemaps quarterly", desc: "Flag all video-rich assets to help Search Console index them rapidly." },
      { title: "Design custom visual chapters / Key Moments", desc: "Formulate chapter timestamps to target step-by-step query results." },
      { title: "Generate text-level interactive transcripts", desc: "Publish transcript text below videos to build solid written keyword signals." }
    ])
  },
  {
    id: 25,
    title: "Image SEO & Visual Search",
    category: "tech-foundations",
    description: "Optimize image file sizing, clear EXIF headers, write accurate captions, and format descriptive file nomenclature.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Drives visual search discovery (Google Lens) for product photos and schematic infographics.",
    bestPractice: "Convert images to web-optimized next-gen formats (WebP/AVIF) and save with descriptive, hyphenated file names.",
    details: "Visual search uses image metadata and computer vision. Supplying clear parameters ensures high-confidence labeling.",
    checklistItems: createItems(25, [
      { title: "Optimize image file sizes below 100KB", desc: "Compress files using next-gen formats (WebP, AVIF) to keep load speeds fast." },
      { title: "Write descriptive file titles (e.g. blue-mesh-running-shoe.webp)", desc: "Adopt clear, dash-separated terms instead of generic camera filenames (e.g., IMG_421.jpg)." },
      { title: "Provide clean, descriptive HTML img alt elements", desc: "Write precise descriptions of what the photo represents." },
      { title: "Embed structured ImageObject schema properties", desc: "Explicitly declare licensing rights and artist details within page markup." }
    ])
  },
  {
    id: 26,
    title: "Voice Search Optimization",
    category: "ai-search-nextgen",
    description: "Master modern audio queries, structure clear local schema arrays, and draft high-engagement natural answer lists.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Captures natural-language questions from users query Siri, Alexa, and Google Assistant.",
    bestPractice: "Craft content that sounds natural when read aloud, and design dedicated FAQ sections around primary questions.",
    details: "Voice searches tend to be longer and more conversational than typed keywords, requiring direct answers and clear sentence structure.",
    checklistItems: createItems(26, [
      { title: "Model highly conversational written text", desc: "Write sentences that flow naturally when read aloud." },
      { title: "Add direct FAQ blocks that answer long questions", desc: "Ensure questions and answers are clear and easy to understand." },
      { title: "Implement speakable metadata properties on top assets", desc: "Identify key paragraphs that are best suited for voice replies." },
      { title: "Optimize localized listings for near-me query routes", desc: "Build out local SEO citations to secure top voice-pack slots nearby." }
    ])
  },
  {
    id: 27,
    title: "Programmatic SEO Frameworks",
    category: "content-onpage",
    description: "Design templates and deploy regional, dynamic comparison hubs with high indexing efficiencies and low duplicate thin content.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Scales query capture across hundreds of product comparison or location keywords automatically.",
    bestPractice: "Maintain high quality by pairing database variables with unique elements and custom insights on templates.",
    details: "Programmatic scaling can lead to indexing issues if not managed carefully. Every autogenerated page must offer unique value.",
    checklistItems: createItems(27, [
      { title: "Design helpful database page templates", desc: "Separate layout rules from raw variable fields to keep pages structured." },
      { title: "Add custom unique copy blocks next to variables", desc: "Ensure generated pages include custom copy to prevent thin-content flags." },
      { title: "Manage internal link pathways to avoid index bloat", desc: "Keep link hubs active to prevent deep, orphaned paths." },
      { title: "Optimize render budgets to handle bulk publishing", desc: "Avoid slow javascript loads; keep pages fast-loading." }
    ])
  },
  {
    id: 28,
    title: "Conversion Rate Optimization (CRO)",
    category: "conversion-analytics",
    description: "Install mouse-tracking heatmaps, set up robust A/B tests, isolate CTA bottlenecks, and structure seamless lead workflows.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Turns organic traffic into paying customers, maximizing your return on SEO efforts.",
    bestPractice: "Place high-priority CTAs above the fold, and simplify forms to use only essential input fields.",
    details: "Traffic is vanity if it doesn't convert. CRO aligns landing layouts to match visitor expectations.",
    checklistItems: createItems(28, [
      { title: "Audit user journeys with heatmaps and recordings", desc: "Identify where visitors click, scroll, and exit." },
      { title: "A/B test primary CTA button copy and placements", desc: "Optimize buttons to increase click-through rates." },
      { title: "Streamline forms by removing unnecessary fields", desc: "Fewer fields mean less friction and more completions." },
      { title: "Match heading copy to visitor intent expectations", desc: "Ensure your primary header aligns with what the visitor searched." }
    ])
  },
  {
    id: 29,
    title: "User Experience (UX) Engineering",
    category: "conversion-analytics",
    description: "Audit accessibility standards, design intuitive navigation paths, organize white space, and maintain readability across views.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Improves organic dwell time, which signals high quality and helps improve search rankings.",
    bestPractice: "Keep line lengths comfortable (50-75 characters) and choose clean fonts with strong color contrast.",
    details: "Search engines reward pages that users enjoy. Fast-loading, accessible, and clean pages build visitor trust.",
    checklistItems: createItems(29, [
      { title: "Meet WCAG 2.1 color contrast and readability criteria", desc: "Keep text easily readable against any background." },
      { title: "Establish comfortable text sizing and layout spacing", desc: "Use ample white space to make content scannable." },
      { title: "Audit layout shift issues on responsive screens", desc: "Fix jumps in elements to keep the reading experience smooth." },
      { title: "Build intuitive, error-free navigation options", desc: "Make of it simple for visitors to find child pages instantly." }
    ])
  },
  {
    id: 30,
    title: "Advanced Analytics & Search Logs",
    category: "conversion-analytics",
    description: "Set up Google Search Console APIs, build custom GA4 user pathways, and run regular server log file checks.",
    difficulty: "Advanced",
    estimatedMinutes: 70,
    businessImpact: "Reveals exact crawl bottlenecks and identifies high-potential keyword opportunities before they drop.",
    bestPractice: "Integrate search logs with analytical models to accurately attribute user search journeys.",
    details: "Clean data paths allow you to track rankings, identify crawl blocks, and measure actual conversion impact.",
    checklistItems: createItems(30, [
      { title: "Link Search Console to Analytics profiles", desc: "Combine search query data with on-site metrics." },
      { title: "Establish clean GA4 goal tracking parameters", desc: "Set up events to measure signups, downloads, and sales." },
      { title: "Audit log responses to find search bot crawl patterns", desc: "Watch exactly how search spiders crawl database files." },
      { title: "Build intuitive search performance reporting widgets", desc: "Create simple, scannable dashboards to share key metrics." }
    ])
  },
  {
    id: 31,
    title: "AI Search Visibility Monitoring",
    category: "ai-search-nextgen",
    description: "Monitor brand references in Gemini API runs, inspect citation counts on Perplexity, and track brand visibility in ChatGPT.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Provides clear visibility into how often your brand is recommended as a top solution by AI search engines.",
    bestPractice: "Query prominent LLMs programmatically to audit brand recommendations across key market keywords.",
    details: "Monitoring brand visibility in AI responses is essential, as more users rely on chat tools for direct discovery.",
    checklistItems: createItems(31, [
      { title: "Test brand recommendations in ChatGPT query loops", desc: "Ask leading questions to see if your brand is recommended." },
      { title: "Track citation volume within Perplexity queries", desc: "Monitor which pages AI engines use to reference your content." },
      { title: "Audit Google AI Overviews for your key keywords", desc: "Discover what topics and formats trigger AI overview features." },
      { title: "Audit brand attributes in Gemini references", desc: "Ensure Google's models describe your services correctly." }
    ])
  },
  {
    id: 32,
    title: "Semantic & Intent Gap Analysis",
    category: "architecture-semantic",
    description: "Audit competitor keyword graphs, map entity structures, and find content gaps across search journeys.",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    businessImpact: "Highlights missed keyword opportunities, giving you a clear roadmap to capture extra organic traffic.",
    bestPractice: "Compare your topic clusters side-by-side with market leaders to target missing subtopics.",
    details: "Identifying topical gaps is the first step to scaling. By filling intent gaps, you build complete topical authority.",
    checklistItems: createItems(32, [
      { title: "Map out your current topic cluster coverage", desc: "Visualize which areas have complete coverage and which are light." },
      { title: "Audit competitor keywords side-by-side to find gaps", desc: "Find terms competitors rank for that your site lacks completely." },
      { title: "Identify missing user intent page variations", desc: "Add pages to cover informational or commercial intents." },
      { title: "Uncover missing entity terms in your content text", desc: "Incorporate related terms to improve topical relevancy." }
    ])
  },
  {
    id: 33,
    title: "High-ROI Content Assets",
    category: "conversion-analytics",
    description: "Create premium assets, detailed calculators, templates, search-friendly glossaries, and original reports.",
    difficulty: "Advanced",
    estimatedMinutes: 80,
    businessImpact: "Ears natural, high-quality backlinks and builds brand trust, turning readers into active customers.",
    bestPractice: "Build interactive tools (like calculators or checklists) that provide instant, personalized value to users.",
    details: "High-ROI assets are highly referenceable resources that earn natural citations from other content creators.",
    checklistItems: createItems(33, [
      { title: "Design helpful interactive tools / calculators", desc: "Build tools that address specific user problems instantly." },
      { title: "Create downloadable, ready-to-use template bundles", desc: "Provide worksheets or frameworks that users can use immediately." },
      { title: "Publish structured industry-specific glossaries", desc: "Define niche concepts to capture valuable long-tail search term traffic." },
      { title: "Write informative annual reports / research papers", desc: "Publish surveys and reports that become reference assets for links." }
    ])
  },
  {
    id: 34,
    title: "Future-Proof Search Optimization",
    category: "ai-search-nextgen",
    description: "Prepare content structures for autonomous AI search assistants, dynamic multi-modal parsing, and neural matching logic.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Maintains brand discoverability as search shifts from basic text matches to multi-agent discovery.",
    bestPractice: "Build clean, machine-readable structured APIs alongside rich multi-modal asset catalogs.",
    details: "The future of search belongs to multi-modal algorithms. Setting up machine-friendly files keeps you ahead.",
    checklistItems: createItems(34, [
      { title: "Format machine-readable raw JSON content APIs", desc: "Enable AI engines to pull structured site content directly." },
      { title: "Optimize file schemas to support multi-modal parsing", desc: "Format images, audio, and video to be read easily by visual models." },
      { title: "Verify content clarity under neural matching frameworks", desc: "Keep text written in clear natural language to rank for conceptual search queries." },
      { title: "Set up brand details to feed AI agent recommendations", desc: "Structure brand data so autonomous AI buyers can discover your products easily." }
    ])
  },
  {
    id: 35,
    title: "Schema Markup Validation",
    category: "tech-foundations",
    description: "Audit and validate advanced structured data markup. Deploy and troubleshoot Course, Event, Product, and Speakable schemas.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Unlocks rich search expansions, high-CTR visual carousels, and smart voice assistant reading eligibility.",
    bestPractice: "Always run live schema snippets and published code results through Google's official Rich Results Test prior to deployment.",
    details: "High-grade structured data supplies raw machine-readable arrays directly to modern conversational LLM bots, search engines, and voice assistants.",
    checklistItems: createItems(35, [
      { title: "Product Schema Validation", desc: "Deploy and validate Product schema containing SKU, pricing, availability, and ratings. Verify live markup using the Google Rich Results Test (https://search.google.com/test/rich-results) to guarantee rich-snippet star displays." },
      { title: "Course Schema Layouts Verification", desc: "Structure Course metadata declaring provider brand, tuition info, and course syllabus. Confirm carousel-readiness using the Google Rich Results Test (https://search.google.com/test/rich-results)." },
      { title: "Event Schema Structured Testing", desc: "Embed structured Event details specifying dates, venues (or VirtualLocation), and ticket links. Ensure zero errors via the Google Rich Results Test (https://search.google.com/test/rich-results) to map local events." },
      { title: "Speakable Schema Audio Targeting", desc: "Identify high-importance content assets using CSS selectors or XPath for Text-to-Speech voice assistants. Verify layout using the Google Rich Results Test (https://search.google.com/test/rich-results)." },
      { title: "Rich Results Schema Validation Check", desc: "Establish continuous automated and manual testing pipelines via the Google Rich Results Test tool (https://search.google.com/test/rich-results) before launching schema templates live." }
    ])
  },
  {
    id: 101,
    title: "WordPress Core",
    category: "wordpress-optimization",
    description: "Keep WordPress updated, utilize PHP 8.3+, and reduce database bloat from revisions & spam to construct a fast core baseline.",
    difficulty: "Beginner",
    estimatedMinutes: 35,
    businessImpact: "Reduces server-side CPU initialization overhead and improves load times by cleaning up unnecessary database records.",
    bestPractice: "Set up automatic email notifications for major releases and run automated database optimization cron sessions.",
    details: "Your WordPress core configuration sets the speed and capability benchmark. Running outdated software directly impairs load performance and API connection speeds.",
    checklistItems: createItems(101, [
      { title: "Latest WordPress Version", desc: "Keep WordPress updated for security and performance." },
      { title: "Latest PHP Version", desc: "Use PHP 8.3+ for faster processing and better compatibility." },
      { title: "Database Optimization", desc: "Remove unnecessary data and optimize tables." },
      { title: "Remove Post Revisions", desc: "Reduce database bloat from saved revisions." },
      { title: "Remove Spam Comments", desc: "Improve database health and site cleanliness." },
      { title: "Remove Unused Themes", desc: "Reduce security risks and resource usage." }
    ])
  },
  {
    id: 102,
    title: "Hosting & Server",
    category: "wordpress-optimization",
    description: "Configure edge servers, modern CDNs, the HTTP/3 protocol, dynamic pre-routing and Brotli compression to build responsive network engines.",
    difficulty: "Beginner",
    estimatedMinutes: 45,
    businessImpact: "Directly improves Time to First Byte (TTFB), bringing latency down for worldwide visitors.",
    bestPractice: "Serve assets via high-performance managed hosting with Cloudflare proxy edge rules.",
    details: "Host choice and server caching parameters govern initial byte response speeds. Standard shared plans fail under multi-bot crawling runs.",
    checklistItems: createItems(102, [
      { title: "Quality Hosting", desc: "Use reliable and high-performance hosting." },
      { title: "CDN Setup", desc: "Deliver content faster through global servers." },
      { title: "Edge Caching", desc: "Cache content closer to users." },
      { title: "HTTP/3 Activation", desc: "Configure modern HTTP/3 protocols to support resource transfers on unstable cellular connections." },
      { title: "Brotli Compression", desc: "Compress files for faster loading." },
      { title: "Server Monitoring", desc: "Monitor uptime and server health." }
    ])
  },
  {
    id: 103,
    title: "URL & Site Structure",
    category: "wordpress-optimization",
    description: "Configure clean, search-friendly URLs and nested directories to pass internal authority and guide index scanners.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Saves crawling resources on duplicate paths and guides bots through topical silos.",
    bestPractice: "Design consistent post permalinks such as /%category%/%postname%/ and avoid deep category nesting.",
    details: "A clear URL layout helps machines categorize content themes effortlessly. Ambiguous structure causes internal crawl traps.",
    checklistItems: createItems(103, [
      { title: "SEO-Friendly Permalinks", desc: "Use clean, readable URLs." },
      { title: "Category Structure", desc: "Organize content logically." },
      { title: "Breadcrumb Navigation", desc: "Show users and crawlers page hierarchy." },
      { title: "Internal Linking Structure", desc: "Connect related content." },
      { title: "HTML Sitemap", desc: "Improve crawlability and navigation." }
    ])
  },
  {
    id: 104,
    title: "Theme Optimization",
    category: "wordpress-optimization",
    description: "Deploy lightweight, modern themes and responsive templates to guarantee high Google speed scores on mobile breakpoints.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Increases mobile conversion rates and eliminates CLS shifts from unstyled fonts or dynamic headers.",
    bestPractice: "Favor performance-driven, block-based themes with minimal built-in sliders or layout plugins.",
    details: "Themes define your document's DOM hierarchy. Complex structural packages block browser UI threads and lag first content presentation.",
    checklistItems: createItems(104, [
      { title: "Lightweight Theme", desc: "Use performance-focused themes." },
      { title: "Mobile Responsive Design", desc: "Ensure proper mobile display." },
      { title: "Remove Unused Theme Features", desc: "Eliminate unnecessary code." },
      { title: "Theme Performance Testing", desc: "Measure theme impact on speed." }
    ])
  },
  {
    id: 105,
    title: "Plugin Optimization",
    category: "wordpress-optimization",
    description: "Eliminate low-quality or duplicative plugins to reduce script conflicts and security vulnerabilities.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Saves page load capacity and ensures reliable template execution without database locking issues.",
    bestPractice: "Axe any plugin that hasn't been updated in 6 months or has high-usage overlap profiles.",
    details: "WordPress extensibility is a common source of code bloating. Standardizing plugin list items keeps servers clean.",
    checklistItems: createItems(105, [
      { title: "Plugin Audit", desc: "Review all installed plugins." },
      { title: "Remove Inactive Plugins", desc: "Reduce security risks." },
      { title: "Remove Duplicate Plugins", desc: "Avoid overlapping functionality." },
      { title: "Performance Review", desc: "Identify slow plugins." },
      { title: "Security Review", desc: "Ensure plugins are trusted and updated." }
    ])
  },
  {
    id: 106,
    title: "Caching",
    category: "wordpress-optimization",
    description: "Deploy layered caching, opcode caching, and edge-side setups to deliver static assets fast.",
    difficulty: "Beginner",
    estimatedMinutes: 50,
    businessImpact: "Mitigates database query overhead, saving thousands of dollars in server CPU usage.",
    bestPractice: "Configure server-level page caching directly (e.g. Nginx FastCGI or LiteSpeed) over reliance on heavy PHP-level plugins.",
    details: "Caching avoids redundant resource execution by caching finished outputs. This keeps TTFB low.",
    checklistItems: createItems(106, [
      { title: "Page Cache", desc: "Store generated pages for faster delivery." },
      { title: "Browser Cache", desc: "Save files on user devices." },
      { title: "Object Cache", desc: "Speed up database queries." },
      { title: "Opcode Cache", desc: "Improve PHP execution performance." },
      { title: "Dynamic Cache", desc: "Cache frequently requested content." }
    ])
  },
  {
    id: 107,
    title: "Core Web Vitals",
    category: "wordpress-optimization",
    description: "Fine-tune page presentation and client threads to fulfill Google's rigorous LCP, CLS, and INP thresholds.",
    difficulty: "Intermediate",
    estimatedMinutes: 60,
    businessImpact: "Direct ranking impact across Google index listings and enhanced user engagement rates.",
    bestPractice: "Size image dimensions explicitly and delay script executions that don't directly feed the main viewport.",
    details: "Core Web Vitals represent user load experiences. Even lightweight sites fail if images shift elements or heavy fonts load slowly.",
    checklistItems: createItems(107, [
      { title: "LCP Optimization", desc: "Improve largest visible content loading speed." },
      { title: "CLS Optimization", desc: "Prevent layout shifting during load." },
      { title: "INP Optimization", desc: "Improve interaction responsiveness." },
      { title: "FCP Optimization", desc: "Speed up first visible content rendering." },
      { title: "TTFB Optimization", desc: "Reduce server response time." }
    ])
  },
  {
    id: 108,
    title: "Image Optimization",
    category: "wordpress-optimization",
    description: "Compress digital graphics, serve next-gen formats, and implement lazy loading to reduce transfer weights.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Drastically scales down payload weights and accelerates mobile data downloads.",
    bestPractice: "Adopt adaptive WebP/AVIF formats and enforce strict size-matching boundaries on media uploads.",
    details: "Large image assets are the main culprit for performance degradation. Compressing images speeds up rendering.",
    checklistItems: createItems(108, [
      { title: "Image Compression", desc: "Reduce image file sizes." },
      { title: "WebP Images", desc: "Use modern image format." },
      { title: "AVIF Images", desc: "Use advanced compression format." },
      { title: "Responsive Images", desc: "Serve device-specific image sizes." },
      { title: "Lazy Loading", desc: "Load images only when needed." },
      { title: "Image Alt Text", desc: "Improve accessibility and SEO." }
    ])
  },
  {
    id: 109,
    title: "CSS Optimization",
    category: "wordpress-optimization",
    description: "Minify styles, isolate critical CSS rules above the fold, and clean up bloated theme code.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Clears critical browser rendering blockages, and improves first paint milestones.",
    bestPractice: "Automate style compilation and defer non-critical CSS files to decrease page weight.",
    details: "Browser engines block visual creation until all stylesheet dependencies are fetched. Cleaning stylesheets speed up displays.",
    checklistItems: createItems(109, [
      { title: "CSS Minification", desc: "Remove unnecessary code." },
      { title: "Critical CSS", desc: "Load important styles first." },
      { title: "Remove Unused CSS", desc: "Reduce page weight." },
      { title: "CSS Compression", desc: "Optimize style delivery." }
    ])
  },
  {
    id: 110,
    title: "JavaScript Optimization",
    category: "wordpress-optimization",
    description: "Deconstruct scripts weight, delay unnecessary analytics trackers, and implement code splitting.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Improves interactive responsiveness values and trims device processing overhead.",
    bestPractice: "Decline bloated social media plugins and only load complex sliders on respective checkout zones.",
    details: "Heavy JavaScript scripts block browser UI rendering threads. Minimizing script files keeps devices running smoothly.",
    checklistItems: createItems(110, [
      { title: "JS Minification", desc: "Reduce script size." },
      { title: "Delay Non-Critical JS", desc: "Delay non-critical JS to improve initial loading speed." },
      { title: "Remove Unused JS", desc: "Reduce unnecessary execution." },
      { title: "Code Splitting", desc: "Load scripts only when required." },
      { title: "Reduce Third-Party Scripts", desc: "Minimize external dependencies." }
    ])
  },
  {
    id: 111,
    title: "SEO Plugin Optimization",
    category: "wordpress-optimization",
    description: "Configure robust meta patterns, automated XML maps, and canonical indexes to secure proper index mapping.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Ensures automated indexing layout control, preventing duplicate keyword search ranking conflicts.",
    bestPractice: "Use a clean all-in-one SEO suite with minimized administrative features enabled.",
    details: "SEO plugins configure baseline document indexing rules. Proper alignment prevents indexers from crawling duplicate listing pages.",
    checklistItems: createItems(111, [
      { title: "SEO Plugin Setup", desc: "Configure SEO plugin setup and settings properly." },
      { title: "XML Sitemap", desc: "Help search engines discover pages via XML sitemaps." },
      { title: "Robots.txt", desc: "Control crawler access using robots.txt." },
      { title: "Canonical Tags", desc: "Prevent duplicate content issues." },
      { title: "Meta Titles", desc: "Optimize page titles." },
      { title: "Meta Descriptions", desc: "Improve click-through rates." }
    ])
  },
  {
    id: 112,
    title: "Technical SEO",
    category: "wordpress-optimization",
    description: "Address broken redirects, audit index coverage alerts, and optimize crawling efficiency.",
    difficulty: "Intermediate",
    estimatedMinutes: 55,
    businessImpact: "Ensures search engine bots index valuable pages without getting lost in redirect loops.",
    bestPractice: "Run weekly crawls using auditing software to trace and repair broken internal URLs.",
    details: "Crawl efficiency drops when server resources are wasted on redirect chains, soft 404 sheets, or orphan categories.",
    checklistItems: createItems(112, [
      { title: "XML Sitemap Validation", desc: "Ensure sitemap is error-free." },
      { title: "Index Coverage Review", desc: "Check indexed pages and resolve errors." },
      { title: "Redirect Management", desc: "Manage URL changes properly." },
      { title: "404 Error Monitoring", desc: "Fix broken pages." },
      { title: "Crawl Error Monitoring", desc: "Identify crawling issues." },
      { title: "Orphan Page Audit", desc: "Find pages without internal links." }
    ])
  },
  {
    id: 113,
    title: "Schema Markup",
    category: "wordpress-optimization",
    description: "Inject clean JSON-LD schema layouts to supply search engines and chatbots with clean semantic attributes.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Unlocks rich snippets, review stars, and price indicators in traditional and conversational results.",
    bestPractice: "Fulfill Google mandatory schema fields exactly to qualify for rich query listings.",
    details: "JSON-LD schema translates website copy into direct database attributes, assisting search crawlers to verify page context.",
    checklistItems: createItems(113, [
      { title: "Organization Schema", desc: "Define business information." },
      { title: "Website Schema", desc: "Describe website entity." },
      { title: "Breadcrumb Schema", desc: "Show page hierarchy." },
      { title: "Article Schema", desc: "Enhance article visibility." },
      { title: "FAQ Schema", desc: "Improve FAQ rich results." },
      { title: "Product Schema", desc: "Enhance product listings." },
      { title: "Service Schema", desc: "Describe services." },
      { title: "Review Schema", desc: "Display ratings and reviews." },
      { title: "Person Schema", desc: "Define author profiles." }
    ])
  },
  {
    id: 114,
    title: "Security Optimization",
    category: "wordpress-optimization",
    description: "Secure WordPress directory structures, block brute force attempts, and set up multi-tier firewalls.",
    difficulty: "Beginner",
    estimatedMinutes: 45,
    businessImpact: "Protects from listing blacklists and ensures secure data transitions across payment channels.",
    bestPractice: "Change default /wp-admin/ paths and disable XML-RPC protocols to deflect bulk scanning bots.",
    details: "Securing your core files keeps your layout free from malware scripts, preventing Google search blacklist penalties.",
    checklistItems: createItems(114, [
      { title: "SSL Certificate", desc: "Secure website connections." },
      { title: "HTTPS Enforcement", desc: "Force secure URLs." },
      { title: "Security Plugin", desc: "Protect against attacks." },
      { title: "Firewall Setup", desc: "Block malicious traffic." },
      { title: "Login Protection", desc: "Secure admin access." },
      { title: "Malware Scanning", desc: "Detect security threats." },
      { title: "Backup System", desc: "Recover site if needed." }
    ])
  },
  {
    id: 115,
    title: "Database Optimization",
    category: "wordpress-optimization",
    description: "Clean up MySQL options databases, database tables, old revisions, and orphan keys.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Improves overall database query speeds, decreasing backend PHP page assembly times.",
    bestPractice: "Axe expired transient data records and keep revisions limited to under 10 saved records.",
    details: "As post counts rise, the database accumulates expired options or transient keys, slowing SQL processing times.",
    checklistItems: createItems(115, [
      { title: "Database Cleanup", desc: "Remove unnecessary records." },
      { title: "Revision Cleanup", desc: "Delete old revisions." },
      { title: "Transient Cleanup", desc: "Remove expired temporary data." },
      { title: "Table Optimization", desc: "Improve database efficiency." }
    ])
  },
  {
    id: 116,
    title: "WooCommerce Optimization",
    category: "wordpress-optimization",
    description: "Audit shopping cart processing speeds, optimize product imagery, and construct fluid checkouts.",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    businessImpact: "Improves cart retention, reduces cart abandonment, and speeds up product list loading.",
    bestPractice: "Use client-side AJAX cart updates cautiously and prevent e-commerce scripts from loading on blog pages.",
    details: "WooCommerce is database-intensive. Fine-tuning dynamic AJAX calls and catalogs ensures checkout reliability.",
    checklistItems: createItems(116, [
      { title: "Product Image Optimization", desc: "Improve product page speed." },
      { title: "Product Schema", desc: "Enhance search visibility." },
      { title: "Checkout Optimization", desc: "Improve conversion rates." },
      { title: "Cart Performance", desc: "Speed up shopping cart." },
      { title: "Payment Gateway Testing", desc: "Ensure payment gateway reliability." }
    ])
  },
  {
    id: 117,
    title: "GEO & AI Search Optimization",
    category: "wordpress-optimization",
    description: "Format block-level content, FAQ accordions, and design structures for Retrieval-Augmented Generation.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Prepares your articles and brand metrics to be recommended inside Gemini and ChatGPT searches.",
    bestPractice: "Include bulleted concept boxes and direct definitive summaries inside all core publications.",
    details: "Conversational... bots retrieve content from sites. Structuring content in clear paragraphs helps bots cite your brand.",
    checklistItems: createItems(117, [
      { title: "AI-Friendly Content Structure", desc: "Create AI-readable content." },
      { title: "FAQ Sections", desc: "Answer common questions clearly." },
      { title: "Definition Boxes", desc: "Improve answer extraction." },
      { title: "llms.txt", desc: "Deploy/publish a root directory llms.txt context map summarizing your core expertise assets." },
      { title: "AI Bot Accessibility", desc: "Allow AI search crawlers." },
      { title: "Chunk Optimization", desc: "Create self-contained content sections." },
      { title: "Citation Optimization", desc: "Increase AI citation opportunities." },
      { title: "Entity Optimization", desc: "Strengthen entity recognition." }
    ])
  },
  {
    id: 118,
    title: "Accessibility",
    category: "wordpress-optimization",
    description: "Secure keyboard navigation, high color contrasts, and ARIA layouts to qualify for WCAG standards.",
    difficulty: "Advanced",
    estimatedMinutes: 40,
    businessImpact: "Satisfies legal non-discrimination requirements and secures positive human rater evaluations.",
    bestPractice: "Incorporate automated visual validator testing directly in development workflows.",
    details: "Ensuring your website is fully accessible to assistive tools like screen readers is an important search quality metric.",
    checklistItems: createItems(118, [
      { title: "WCAG Compliance", desc: "Meet accessibility standards." },
      { title: "Keyboard Navigation", desc: "Enable non-mouse usage." },
      { title: "ARIA Labels", desc: "Improve assistive technology support." },
      { title: "Contrast Optimization", desc: "Improve readability with proper contrasts." },
      { title: "Alt Text Coverage", desc: "Describe images properly." }
    ])
  },
  {
    id: 119,
    title: "Analytics & Monitoring",
    category: "wordpress-optimization",
    description: "Deploy GA4 properties, configure Search Console tracking, and establish uptime monitors.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Enables error-free performance auditing and tracks marketing campaign returns accurately.",
    bestPractice: "Consolidate multiple analytics setups under a lightweight script manager like GTM.",
    details: "Monitoring traffic pathways and crawl health informs administrators of indexing shifts instantly.",
    checklistItems: createItems(119, [
      { title: "GA4 Setup", desc: "Track user behavior with GA4." },
      { title: "Search Console Setup", desc: "Monitor search performance with Search Console." },
      { title: "Bing Webmaster Setup", desc: "Monitor Bing visibility." },
      { title: "Uptime Monitoring", desc: "Track website availability." },
      { title: "Error Monitoring", desc: "Detect technical issues." },
      { title: "Core Web Vitals Tracking", desc: "Monitor performance metrics." }
    ])
  },
  {
    id: 120,
    title: "Advanced WordPress Optimization",
    category: "wordpress-optimization",
    description: "Implement Redis database stores, Edge server engines, headless architectures, and AI tracking workflows.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Ensures website speeds of under 500 milliseconds for massive sites with millions of monthly visits.",
    bestPractice: "Deploy headless WordPress frontends or perform caching at edge router networks.",
    details: "Advanced WordPress speeds up massive sites using non-traditional rendering pipelines.",
    checklistItems: createItems(120, [
      { title: "Redis Object Cache", desc: "Speed up database queries with Redis." },
      { title: "Edge Rendering", desc: "Deliver content closer to users via edge workers." },
      { title: "Headless WordPress", desc: "Separate frontend and backend of WordPress." },
      { title: "API Optimization", desc: "Improve REST API and custom endpoint performance." },
      { title: "AI Visibility Monitoring", desc: "Track AI search mentions." },
      { title: "Knowledge Graph Optimization", desc: "Strengthen entity authority." },
      { title: "AI Citation Tracking", desc: "Monitor AI-generated citations." },
      { title: "Search Everywhere Optimization", desc: "Optimize beyond classic Google search." }
    ])
  },
  {
    id: 201,
    title: "1. Property Setup & DNS Verification",
    category: "gsc-complete",
    description: "Establish unified Domain or URL-Prefix properties, configure multiple user levels, and complete secure DNS ownership verification.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Validates authorized crawl domains and generates comprehensive coverage diagnostics across all subdomains.",
    bestPractice: "Setup Domain Properties directly with DNS TXT verification to track both HTTP/HTTPS and www/non-www traffic globally.",
    details: "Setting up your Google Search Console profile is the foundational layer of search diagnostics. DNS TXT records are preferred over HTML file uploads.",
    checklistItems: createItems(201, [
      { title: "Domain Property Setup", desc: "Track all protocols and subdomains in one property representation." },
      { title: "URL Prefix Property", desc: "Monitor specific sub-directory structures, localized content routes, or alternative staging environments." },
      { title: "DNS Verification", desc: "Verify secure ownership by adding TXT validation strings directly into DNS providers." },
      { title: "Multiple User Access", desc: "Delegate appropriate read/write, owner, or restricted permissions to analytics teams." },
      { title: "Primary Property Selection", desc: "Enforce a single authoritative property for consistent agency metric reports." }
    ])
  },
  {
    id: 202,
    title: "2. XML Sitemap Discovery & Monitoring",
    category: "gsc-complete",
    description: "Submit index-guiding sitemaps to GSC and review processing statuses to catch discovery bottlenecks.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Accelerates discovery cycles for fresh articles or programmatic layouts by establishing structured paths for Googlebot.",
    bestPractice: "Keep sitemaps strictly dynamic, containing only canonical 200-OK pages with zero redirects or non-indexable URLs.",
    details: "Google relies on sitemaps to navigate massive sites efficiently. Use specialised sub-sitemaps for rich content types.",
    checklistItems: createItems(202, [
      { title: "XML Sitemap Submitted", desc: "Deliver dynamic index-ready path parameters directly inside the GSC sitemaps panel." },
      { title: "Sitemap Status Monitoring", desc: "Routinely inspect processing records to quickly resolve 'Fetch Failed' errors." },
      { title: "Image Sitemap", desc: "Incorporate specialized image markup tags to improve rich-graphics discovery." },
      { title: "Video Sitemap", desc: "Provide duration, thumbnail paths, and player URLs to unlock Google search video visual reels." },
      { title: "News Sitemap", desc: "Build standard news sitemaps with up-to-date timestamps to rank in Google News carousels." },
      { title: "Dynamic Sitemap Updates", desc: "Configure server-side hooks to update sitemap structures instantly when publishing updates." },
      { title: "Remove Invalid URLs", desc: "Prune redirects, draft items, 404 pages, and canonical-divergences from sitemap feeds." }
    ])
  },
  {
    id: 203,
    title: "3. Page Index Coverage Diagnostics",
    category: "gsc-complete",
    description: "Isolate crawled-not-indexed warnings, correct soft 404 flags, and monitor Googlebot exclusions.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Prunes crawl bloat, ensuring high-value pages receive maximum ranking attention.",
    bestPractice: "Resolve Crawled-Not-Indexed issues by beefing up content quality, adding unique internal links, and removing duplicates.",
    details: "The Coverage report tells you exactly what Google thinks of your site's quality. Excluded statuses must be evaluated for indexing errors.",
    checklistItems: createItems(203, [
      { title: "Pages Indexed", desc: "Verify all primary core site directories are fully represented in Google's main index." },
      { title: "Crawled Not Indexed", desc: "Audit ignored sections to locate thin pages, rendering errors, or duplicate content blocks." },
      { title: "Discovered Not Indexed", desc: "Address server response bottlenecks and optimize site structures to resolve discovery queue limits." },
      { title: "Excluded Pages Review", desc: "Analyze canonical-redirect mappings and noindex commands to ensure they match SEO intent." },
      { title: "Noindex Validation", desc: "Confirm pages tagged with 'noindex' (e.g. user panels, checkouts) are successfully blocked." },
      { title: "Canonical Validation", desc: "Confirm Google respects user-selected canonical mappings instead of choosing alternate ones." },
      { title: "Duplicate URL Review", desc: "Determine causes for duplicate URLs without user-declared canonical tags and consolidate." },
      { title: "Soft 404 Monitoring", desc: "Fix thin or empty sheets triggering soft 404 flags that exhaust spider crawl budgets." },
      { title: "Server Error Review", desc: "Address server-side 5XX error responses to keep search spider routes clear." },
      { title: "Redirect Validation", desc: "Audit redirect paths to ensure links transition smoothly without redirect loops." }
    ])
  },
  {
    id: 204,
    title: "4. GSC URL Inspection Protocol",
    category: "gsc-complete",
    description: "Inspect single URL states, compare indexed renders with live layouts, and issue indexing requests.",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    businessImpact: "Allows SEO engineers to verify immediate code changes and request rapid indexing on modified files.",
    bestPractice: "Always review the 'Rendered HTML' when diagnosing index failures to ensure text content isn't blocked by client-side JS.",
    details: "The inspect tool provides Googlebot's eye-view of standard directories, showing raw logs, javascript errors, and canonical pairings.",
    checklistItems: createItems(204, [
      { title: "URL Inspection Testing", desc: "Input central endpoints to query current index metadata from Google's live databases." },
      { title: "Live URL Testing", desc: "Verify response payloads, mobile layout adaptiveness, and rendering logs in real-time." },
      { title: "Request Indexing", desc: "Trigger prioritized queue updates for dynamic or newly created content files." },
      { title: "Rendered HTML Review", desc: "Inspect completed Document Object Model (DOM) code blocks to confirm correct textual visibility." },
      { title: "Canonical Review", desc: "Inspect canonical parameters to verify alignment between declared and google-selected canonicals." },
      { title: "Mobile Usability Check", desc: "Review user-agent responsiveness indicators within simulated mobile bots." }
    ])
  },
  {
    id: 205,
    title: "5. Performance Analytics & Insights",
    category: "gsc-complete",
    description: "Correlate clicks, impressions, positions, and CTR patterns to uncover geographic and seasonal trends.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Identifies top organic revenue drivers and surfaces high-potential layout adjustments.",
    bestPractice: "Filter query data by device types to ensure click-through ratios (CTR) aren't decaying on small-screen sizes.",
    details: "GSC's Performance report hosts incredibly rich, zero-sample organic traffic data. Compare date ranges to isolate performance decay.",
    checklistItems: createItems(205, [
      { title: "Total Clicks Analysis", desc: "Track overall click volume transitions across specific product directories." },
      { title: "Total Impressions Analysis", desc: "Diagnose overall display reach in SERPs to value market sentiment levels." },
      { title: "Average CTR Review", desc: "Monitor CTR baselines across top-tier priority tracks and maximize meta layouts." },
      { title: "Average Position Tracking", desc: "Measure average keyword position trends, isolating subtle algorithm shifts." },
      { title: "Top Queries Analysis", desc: "Isolate keyword queries that provide high commercial-intent search visits." },
      { title: "Top Pages Analysis", desc: "Find dominant landing sheets to secure they receive maximum internal linking support." },
      { title: "Country Performance Review", desc: "Analyze regional search profiles to adjust localized localized marketing strategies." },
      { title: "Device Performance Review", desc: "Contrast desktop and smartphone display CTR to identify responsive usability bugs." },
      { title: "Search Appearance Review", desc: "Audit high-value rich snippets, track FAQ clicks, and index structured review ratings." },
      { title: "Date Comparison Analysis", desc: "Benchmark 3-month performance over time to find conversion changes." }
    ])
  },
  {
    id: 206,
    title: "6. Search Queries CTR Optimization",
    category: "gsc-complete",
    description: "Identify high-impression query subsets running on weak click-rates and target semantic opportunity gaps.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Increases average CTR and boosts traffic volumes without writing new articles.",
    bestPractice: "Optimize meta tags and page titles for files that rank high but suffer from low click-through-rates.",
    details: "Find keywords ranking on page 1 with high impressions but low click-rates, and rewrite titles and description structures to captivate readers.",
    checklistItems: createItems(206, [
      { title: "High Impression Low CTR Keywords", desc: "Rewrite snippet meta-descriptions to enhance click appeal." },
      { title: "High Position Low CTR Keywords", desc: "Iterate title tag combinations to outperform organic SERP alternatives." },
      { title: "Low Position High CTR Keywords", desc: "Improve rankings for terms users already find highly engaging." },
      { title: "Question Keywords", desc: "Track query strings matching 'How', 'What', or 'Why' to target Answer Engine Optimization." },
      { title: "Long-Tail Keywords", desc: "Trace specific structural modifier queries to design focused content answers." },
      { title: "Brand Keywords", desc: "Monitor brand name search trends to evaluate broader digital marketing impact." },
      { title: "Non-Brand Keywords", desc: "Isolate transactional search modifiers to increase commercial traffic segments." },
      { title: "AI Search Queries", desc: "Track Conversational queries and new semantic questions driving index mentions." }
    ])
  },
  {
    id: 207,
    title: "7. Landing Page Decay Diagnostics",
    category: "gsc-complete",
    description: "Isolate declining layouts, secure healthy growing sheets, and map high-converting organic hubs.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Arrests organic traffic loss and maintains continuous conversion volumes across priority products.",
    bestPractice: "Setup custom spreadsheets to pull GSC API performance logs regularly for immediate decay discovery.",
    details: "Pages naturally decay as competitors publish fresher resources. Keep landing pages fresh and updated with original research.",
    checklistItems: createItems(207, [
      { title: "Top Landing Pages", desc: "Isolate and support top traffic-generating folders with strong internal link references." },
      { title: "Declining Pages", desc: "Benchmark page click decay and rewrite outdated sections with modern data." },
      { title: "Growing Pages", desc: "Fuel momentum on upward-ranking directories with fresh contextual support." },
      { title: "Zero Click Pages", desc: "Determine if zero-click pages should be updated, canonicalized, redirected, or pruned." },
      { title: "Conversion Pages", desc: "Monitor search pathways that drive customers directly to CTA and product pipelines." },
      { title: "Seasonal Pages", desc: "Plan content updates months before traffic waves hit search targets." }
    ])
  },
  {
    id: 208,
    title: "8. Web Vitals & Loading Diagnostics",
    category: "gsc-complete",
    description: "Troubleshoot INP shifts, address layout shifts, and trigger official GSC validation queues.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Ensures responsive, rapid displays to reduce visitor friction and satisfy ranking algorithms.",
    bestPractice: "Validate speed metrics using real user data in GSC, rather than sterile lab environments.",
    details: "Core Web Vitals measure real-world loading speed, responsiveness, and visual stability (LCP, INP, CLS).",
    checklistItems: createItems(208, [
      { title: "LCP Review", desc: "Isolate elements that delay Largest Contentful Paint to render primary text faster." },
      { title: "CLS Review", desc: "Verify lazy-loaded media structures have fixed container boundaries to reduce layout shifts." },
      { title: "INP Review", desc: "Optimize javascript execution times to improve responsiveness." },
      { title: "Poor URLs Review", desc: "Audit and solve systemic rendering speed issues across template groups." },
      { title: "Mobile CWV Review", desc: "Optimize cellular loading parameters to deliver smooth mobile speeds." },
      { title: "Desktop CWV Review", desc: "Optimize desktop scripts and CDN routing schedules to ensure rapid delivery." },
      { title: "Validation Requests", desc: "Confirm issue resolutions and trigger Google's field-verification cycle directly in the GSC dashboard." }
    ])
  },
  {
    id: 209,
    title: "9. Mobile Usability Auditing",
    category: "gsc-complete",
    description: "Solve structural mobile usability alerts, adapt responsive styles, and optimize viewport scaling.",
    difficulty: "Beginner",
    estimatedMinutes: 25,
    businessImpact: "Secures mobile-first index rankings and prevents usability bounce rates.",
    bestPractice: "Verify that font-sizes remain larger than 16px to pass mobile readability audits seamlessly.",
    details: "Smartphone usability is crucial. GSC alerts you to text size, tap target, and viewport scaling issues.",
    checklistItems: createItems(209, [
      { title: "Mobile-Friendly Design", desc: "Optimize overall structural templates for modern smartphone viewports." },
      { title: "Responsive Layout", desc: "Ensure horizontal scrollbars don't occur because of oversized width components." },
      { title: "Touch Element Spacing", desc: "Maintain a minimum distance between buttons and text links to avoid tap overlap errors." },
      { title: "Readable Text Size", desc: "Enforce CSS styling structures to prevent fonts from scaling down below index thresholds." },
      { title: "Mobile Rendering Check", desc: "Confirm css stylesheet assets are accessible to Googlebot-Mobile for correct render." }
    ])
  },
  {
    id: 210,
    title: "10. Rich Results & Markup Compliance",
    category: "gsc-complete",
    description: "Verify JSON-LD schemas, fix structured warning blocks, and audit rich appearance features.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Increases search listing footprint, capturing eyes and clicks on highly competitive query spaces.",
    bestPractice: "Prune structured schemas triggering 'critical errors' immediately to prevent Google from dropping rich enhancements.",
    details: "Rich Results profiles map machine-readable data. Monitor the Enhancements panel to keep items active.",
    checklistItems: createItems(210, [
      { title: "FAQ Schema Validation", desc: "Monitor FAQ diagnostic reports to keep QA snippets visible." },
      { title: "Product Schema Validation", desc: "Fine-tune price, availability, and rating tags to display product offers directly in SERPs." },
      { title: "Review Schema Validation", desc: "Ensure rating values are coded correctly to display star reviews." },
      { title: "Article Schema Validation", desc: "Review structural properties to optimize publishing metadata." },
      { title: "Breadcrumb Schema Validation", desc: "Confirm navigational breadcrumbs are correctly recognized." },
      { title: "Video Schema Validation", desc: "Check if video thumbnails and key clips are schema-validated." },
      { title: "Event Schema Validation", desc: "Monitor markup profiles for event calendars and schedule displays." },
      { title: "Course Schema Validation", desc: "Verify educational course lists map correct structure parameters." }
    ])
  },
  {
    id: 211,
    title: "11. Crawl Budget & Statistics Diagnostics",
    category: "gsc-complete",
    description: "Investigate server loads, monitor response codes, and analyze crawler user-agents.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Saves critical server resources and ensures Googlebot parses fresh sheets immediately.",
    bestPractice: "Track the Crawl Stats report for spikes in high latency to prevent Googlebot from slowing crawl rates.",
    details: "Crawl stats expose raw web-server interactions. Keep average response times under 200ms.",
    checklistItems: createItems(211, [
      { title: "Crawl Requests Review", desc: "Monitor daily total crawl request transitions to identify anomalies." },
      { title: "Response Code Analysis", desc: "Audit response statistics, keeping 4XX and 5XX codes to zero." },
      { title: "Host Status Review", desc: "Confirm network connectivity, robots.txt accessibility, and server response consistency." },
      { title: "Crawl Purpose Analysis", desc: "Verify if Googlebot is primarily indexing new content or refreshing existing records." },
      { title: "File Type Analysis", desc: "Analyze the breakdown of fetched files, minimizing useless assets." },
      { title: "Crawl Trend Analysis", desc: "Locate unusual crawler crawls to discover misconfigured files." }
    ])
  },
  {
    id: 212,
    title: "12. Internal Linking & Topic Silos",
    category: "gsc-complete",
    description: "Detect orphan pages, optimize internal linking architecture, and balance target keyphrase anchors.",
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    businessImpact: "Channels PageRank to important conversion categories organically.",
    bestPractice: "Use Google Search Console's Link report to identify important pages lacking sufficient internal links.",
    details: "Internal links form your site's knowledge system, giving Google structural indicators of relative priority.",
    checklistItems: createItems(212, [
      { title: "Internal Link Count", desc: "Audit internal link distributions across index lists to correct imbalances." },
      { title: "Important Pages Linked", desc: "Verify primary converting landing folders receive the highest internal reference density." },
      { title: "Orphan Page Detection", desc: "Isolate and resolve isolated files that aren't linked anywhere." },
      { title: "Link Equity Flow Review", desc: "Audit and optimize internal anchor text variation to prevent spam signals." }
    ])
  },
  {
    id: 213,
    title: "13. Backlink Profiles & Referrals",
    category: "gsc-complete",
    description: "Analyze top linked pages, track referring domains, and identify harmful link spikes.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Protects site authority from spam attacks and evaluates digital marketing reach.",
    bestPractice: "Audit incoming anchors within GSC to ensure inbound profiles look natural and organic.",
    details: "External backlinks represent external authority. Evaluate top linking domains to confirm traffic quality.",
    checklistItems: createItems(213, [
      { title: "Top Linked Pages", desc: "Ensure your best external links point to core canonical content folders." },
      { title: "Top Referring Domains", desc: "Review referring host names to confirm credibility." },
      { title: "Anchor Text Review", desc: "Trace high-density external anchors to prevent over-optimized keyphrases." },
      { title: "Toxic Link Review", desc: "Identify negative SEO attacks or domain-level link injections." },
      { title: "Lost Link Monitoring", desc: "Identify lost external references to recover broken authority pathways." }
    ])
  },
  {
    id: 214,
    title: "14. Security & Manual Action Protections",
    category: "gsc-complete",
    description: "Monitor manual penalties and resolve malware injection flags immediately.",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    businessImpact: "Secures permanent access to Google's index listings and maintains user trust.",
    bestPractice: "Regularly check the Security panel to catch hacked injector scripts early.",
    details: "Security or policy violations will drop your listings. Check these panels to maintain search compliance.",
    checklistItems: createItems(214, [
      { title: "Manual Action Review", desc: "Ensure the manual actions panel matches the 'No issues detected' status." },
      { title: "Security Issues Review", desc: "Scan and confirm that zero file injectors or hijackers are flagged on the domain." },
      { title: "Malware Detection", desc: "Secure frontend scripts against malicious code injections." },
      { title: "Spam Detection", desc: "Moderate user comments and open registers to block outgoing spam links." }
    ])
  },
  {
    id: 215,
    title: "15. AI Overview & Conversational Visibility",
    category: "gsc-complete",
    description: "Track brand occurrences in AI summaries, audit voice-ready formats, and optimize semantic patterns.",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    businessImpact: "Saves high-value brand traffic as standard search shifts to AI-driven summaries.",
    bestPractice: "Analyze queries displaying rich snippet integrations to build targeted content structures.",
    details: "Conversational engines synthesize page content directly. Structure answers cleanly to stay in citation pools.",
    checklistItems: createItems(215, [
      { title: "AI Overview Visibility", desc: "Identify keyphrases that trigger AI Overview blocks." },
      { title: "Featured Snippet Presence", desc: "Secure definition boxes by formatting headers with answering text." },
      { title: "FAQ Visibility", desc: "Optimize QA layouts to align with conversational search structures." },
      { title: "Conversational Query Growth", desc: "Determine traffic shifts from multi-phrase conversational queries." },
      { title: "Entity Visibility", desc: "Audit brand mentions inside key conversational answers and comparisons." }
    ])
  },
  {
    id: 216,
    title: "16. GEO & AEO Search Analytics",
    category: "gsc-complete",
    description: "Align copy with LLM retrieval, optimize definitions, and configure comparative frameworks.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Enables discovery on voice assistants and generative RAG platforms.",
    bestPractice: "Track detailed comparison keyphrases to structure transparent tables of product differences.",
    details: "AI and voice tools require direct, structured, and factual data layers to process answers.",
    checklistItems: createItems(216, [
      { title: "Question Query Performance", desc: "Audit the performance of directories answering specific informational questions." },
      { title: "How-To Query Performance", desc: "Style process checklists clearly to capture instructional searches." },
      { title: "Comparison Query Performance", desc: "Track queries with high transactional intent comparing alternative solutions." },
      { title: "Definition Query Performance", desc: "Format explicit dictionary definitions above the fold to capture rich snippets." },
      { title: "Voice Search Query Tracking", desc: "Track long-tail conversational questions to target voice assistant search." }
    ])
  },
  {
    id: 217,
    title: "17. Content Auditing & Pruning Protocols",
    category: "gsc-complete",
    description: "Audit duplicate directories, isolate thin sheets, and refresh aging information.",
    difficulty: "Advanced",
    estimatedMinutes: 40,
    businessImpact: "Raises overall directory authority, preventing index bloat and crawling friction.",
    bestPractice: "Identify zero-click pages after 180 days and either refresh, direct, or prune them.",
    details: "Thin content dilutes site quality. Prune weak content or consolidate duplicates to keep your index highly efficient.",
    checklistItems: createItems(217, [
      { title: "Thin Content Pages", desc: "Fix low-word-count sheets with deep, comprehensive research." },
      { title: "Duplicate Content Pages", desc: "Resolve content cannibalization by implementing clear canonical rules." },
      { title: "Outdated Content", desc: "Iterate old directories containing stale years or static outdated guides." },
      { title: "Low CTR Content", desc: "Analyze impressions to find content that can be upgraded." },
      { title: "High Potential Pages", desc: "Identify high-ranking pages that are close to ranking in top position slots." }
    ])
  },
  {
    id: 218,
    title: "18. Entity Mapping & Brand Graphs",
    category: "gsc-complete",
    description: "Track Knowledge Graph mentions, establish expert nodes, and map brand authority parameters.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Constructs semantic entity associations that shield domains from classic core updates.",
    bestPractice: "Utilize GSC Brand and Founder queries to evaluate overall domain authority growth.",
    details: "Modern SEO focuses on entities, not just strings. Validate your relationships across Knowledge panels.",
    checklistItems: createItems(218, [
      { title: "Brand Entity Queries", desc: "Track brand name click volumes to evaluate audience brand awareness." },
      { title: "Founder Queries", desc: "Monitor authority signals around core founder and expert profiles." },
      { title: "Product Entity Queries", desc: "Track catalog visibility across specialized product nodes." },
      { title: "Service Entity Queries", desc: "Ensure your commercial service directories are clearly mapping entity definitions." },
      { title: "Knowledge Panel Presence", desc: "Track matches with the official organization definition inside knowledge databases." }
    ])
  },
  {
    id: 219,
    title: "19. Regional & Multilingual Diagnostics",
    category: "gsc-complete",
    description: "Validate hreflang mappings, configure localization settings, and monitor localized crawler logs.",
    difficulty: "Advanced",
    estimatedMinutes: 40,
    businessImpact: "Drives clean global traffic routing, avoiding duplicate indexing across locations.",
    bestPractice: "Trace hreflang configuration errors inside GSC to confirm search bots can resolve localized folders.",
    details: "International SEO requires matching localization settings. Maintain a clean, error-free hreflang system.",
    checklistItems: createItems(219, [
      { title: "hreflang Validation", desc: "Confirm multilingual hreflang tag declarations match target URL coordinates." },
      { title: "Regional Traffic Review", desc: "Track country-level organic clicks to target localized growth." },
      { title: "Language Indexing Review", desc: "Ensure localized folders index correct translated sheets without cross-pollution." },
      { title: "Country-Specific Rankings", desc: "Assess ranking variations across local search market ecosystems." }
    ])
  },
  {
    id: 220,
    title: "20. Advanced Crawling & Budget Controls",
    category: "gsc-complete",
    description: "Address keyword cannibalization, monitor server server logs, and optimize crawling limits.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Enables enterprise level indexes to scale infinitely with optimal crawl paths.",
    bestPractice: "Avoid unnecessary index bloat by keeping search filters and parameters out of crawlable paths.",
    details: "Maximizing crawl paths is vital for massive sites. Consolidate your layouts and monitor index structures continuously.",
    checklistItems: createItems(220, [
      { title: "Keyword Cannibalization", desc: "Identify competing pages ranking for the same target keywords." },
      { title: "Index Bloat Detection", desc: "Isolate and block thin dynamic files (search returns, categories) from crawlable paths." },
      { title: "Crawl Budget Optimization", desc: "Focus Google on key directories by configuring robots.txt blocks correctly." },
      { title: "Log File Correlation", desc: "Compare server access patterns with GSC data to find crawl priority issues." },
      { title: "Search Intent Mapping", desc: "Align landing pages with search keywords to improve user engagement metrics." },
      { title: "Ranking Trend Analysis", desc: "Audit high-level organic rank movements across priority collections." },
      { title: "AI Search Trend Tracking", desc: "Track weekly growth patterns of conversational engine impressions." }
    ])
  },
  {
    id: 301,
    title: "SXO 1: Search Everywhere Fundamentals",
    category: "sxo",
    description: "Understand structural shifts from classic SEO to Search Everywhere Optimization (SXO), dynamic multi-platform journeys, and entity setups.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Aligns corporate positioning with modern user discovery channels and structures a unified cross-platform discovery matrix.",
    bestPractice: "Map out the complete digital touchpoint footprint of your brand to build perfect cross-platform entity consistency.",
    details: "SXO is about optimizing discoverability on every surface users ask questions. Focus on establishing entity signals first.",
    checklistItems: createItems(301, [
      { title: "Search Ecosystem Audit", desc: "Evaluate search market visibility percentages across classic search, AI chat interfaces, and social video boards." },
      { title: "Brand Presence Audit", desc: "Conduct exhaustive search queries for exact-match corporate labels to identify indexing or naming variations." },
      { title: "Search Platform Inventory", desc: "Document active profiles and ranking states on YouTube, Reddit, ChatGPT, Gemini, Amazon, and App Stores." },
      { title: "Visibility Scorecard", desc: "Create a baseline metrics audit assessing organic rankings versus conversational engine quote citations." },
      { title: "Entity Consistency Review", desc: "Verify Name, Organization Schema, corporate URLs, and author names are aligned across primary platforms." }
    ])
  },
  {
    id: 302,
    title: "SXO 2: Google Search Optimization",
    category: "sxo",
    description: "Master classic organic criteria, featured snippet extraction, E-E-A-T trust signals, and Google AI Overview optimization models.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Maintains authority on the world's primary search engine while securing premium visibility within AI Overviews.",
    bestPractice: "Write clear, direct, and fact-focused summaries paired with structural schemas to satisfy Google's retrieval systems.",
    details: "Google ranking models rely heavily on quality, user satisfaction, and machine-readable data structures such as JSON-LD schemas.",
    checklistItems: createItems(302, [
      { title: "Core Web Vitals Check", desc: "Validate LCP, FID, and CLS performance levels across mobile templates." },
      { title: "Structured Data Implementation", desc: "Submit JSON-LD organization, article, product, and QA schemas to define explicit entity connections." },
      { title: "Internal Linking Model", desc: "Design a strict parent-child topical routing pattern to pass domain rank authority to core resources." },
      { title: "Entity Mapping Setup", desc: "Map vocabulary concepts to authoritative Wikipedia, Wikidata, or industry authority indices." },
      { title: "AI Overview Optimization", desc: "Structure summary sections at the top of resources to optimize for AI Overview query extractions." },
      { title: "Featured Snippet Optimization", desc: "Implement clean tables, target lists, and explicit definition headers to satisfy snippet extractions." },
      { title: "Knowledge Graph Alignment", desc: "Claim organization knowledge panels and link social indexes to reinforce google identification." },
      { title: "Google Search Console Link", desc: "Connect properties to monitor real-time index coverage, sitemap submissions, and Google queries." }
    ])
  },
  {
    id: 303,
    title: "SXO 3: Bing Search Optimization",
    category: "sxo",
    description: "Submit real-time indexing records, configure Bing Webmaster tools, and maximize authority signals for Microsoft Copilot integration.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Expands reach to the premium Bing user demographic and ensures integration into the Windows/Microsoft AI ecosystem.",
    bestPractice: "Deploy real-time IndexNow protocols to alert Bing instantly of any fresh or optimized directory updates.",
    details: "Bing values direct index submissions and clear machine-readable markup, which are directly queried by the Copilot search engine.",
    checklistItems: createItems(303, [
      { title: "Bing Webmaster Verification", desc: "Establish ownership of properties within Bing Webmaster tools via DNS or meta-tags." },
      { title: "XML Sitemap Submission", desc: "Deliver up-to-date, indexable directory sitemaps directly into the Bing sitemaps control." },
      { title: "IndexNow Integration", desc: "Install direct API hooks to automatically alert Bing search agents of layout or text updates." },
      { title: "Copilot Visibility Audit", desc: "Query Microsoft Copilot with commercial brand queries to verify product or site citations." },
      { title: "Bing Ranking Audit", desc: "Monitor search query CTR trends and index performance inside Bing Webmaster tools." }
    ])
  },
  {
    id: 304,
    title: "SXO 4: YouTube Search Optimization",
    category: "sxo",
    description: "Leverage the world's second-largest search engine by optimizing video assets, ranking algorithms, and user retention models.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Drives visual, high-engaging video traffic directly to product lines from organic search results.",
    bestPractice: "Incorporate semantic terms in video transcribing and format titles to match user question intent directly.",
    details: "YouTube ranking incorporates play loops, retention rates, CTR, chapters, and the thematic metadata of titles and descriptions.",
    checklistItems: createItems(304, [
      { title: "Keyword Search Research", desc: "Identify high-volume and low-competition search phrases inside YouTube Search autocomplete." },
      { title: "Title & Hook Optimization", desc: "Refine titles to balance clickability with clear semantic search relevance." },
      { title: "Thumbnail CTR Optimization", desc: "Design custom visual patterns specifying core phrases to increase click frequencies." },
      { title: "Interactive Video Chapters", desc: "Provide precise timecode points with keyword titles to unlock organic Google video key-moments." },
      { title: "Transcript Optimization", desc: "Read target search terms clearly within the initial 30 seconds of video audio files to improve autogenerated transcribing." },
      { title: "Video Schema Deployment", desc: "Incorporate VideoObject structured metadata inside the hosting web page to map index paths." },
      { title: "Playlist Organization", desc: "Group related video subjects into structured playlists to amplify crawl path loops." }
    ])
  },
  {
    id: 305,
    title: "SXO 5: ChatGPT Search Optimization",
    category: "sxo",
    description: "Structure highly readable content, implement LLM robot rules, and secure citation references in ChatGPT / OpenAI Search.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Captures high-intent users who utilize ChatGPT as their primary research and recommendation tool.",
    bestPractice: "Maintain an explicit, text-rich, and clearly structured web directory that is easy for RAG retrieval models to crawl.",
    details: "ChatGPT utilizes OpenAI's search crawlers and partner search layers to pull live summaries. It prioritizes direct citations of trustworthy, clear sites.",
    checklistItems: createItems(305, [
      { title: "Entity Consistency Check", desc: "Maintain uniform and clear description patterns across Wikidata and Crunchbase profile records." },
      { title: "Structured Content Format", desc: "Write distinct, heading-based copy with clear factual points to facilitate retrieval parse passes." },
      { title: "FAQ Optimization Layout", desc: "Incorporate clear question-and-answer patterns that match conversational user prompts." },
      { title: "Brand Mention Strategy", desc: "Acquire mentions across reputable industry publications mapped to ChatGPT citation groups." },
      { title: "Authority Verification", desc: "Incorporate authoritative external reference links to build trust scores with retrieval engines." },
      { title: "LLM Access (llms.txt)", desc: "Deploy standard /llms.txt metadata files at domain roots to provide dense, machine-readable data feeds." },
      { title: "Citation Building Blocks", desc: "Configure review layouts and product descriptions with clear identifiers to capture user quote blocks." }
    ])
  },
  {
    id: 306,
    title: "SXO 6: Gemini Search Optimization",
    category: "sxo",
    description: "Optimize layout systems, schema mappings, and organization data for Google's Gemini multimodal AI ecosystems.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Ensures maximum brand visibility and direct attribution within google conversation indices.",
    bestPractice: "Utilize structured entity references in the Google Knowledge Graph and verify exact organizational schema alignments.",
    details: "Gemini is deeply integrated with Google's main Knowledge Graph and search databases, parsing both multimodal inputs and structured schemas.",
    checklistItems: createItems(306, [
      { title: "Entity Reconciliation", desc: "Reconcile brand attributes across Google Business Listings and Wikidata records." },
      { title: "Multimodal Schema Sync", desc: "Deploy robust Organization, Author, and Article schemas stating sameAs link targets." },
      { title: "Author Entity Definition", desc: "Define individual writer biographics containing validated LinkedIn and Wikipedia link indicators." },
      { title: "Organization Schema Build", desc: "Incorporate explicit sameAs values linking to official social profiles and corporate registers." },
      { title: "Google Business Optimization", desc: "Optimize your primary local listing with rich, accurate category attributes and updated photos." },
      { title: "Knowledge Graph Audit", desc: "Inspect Google search entity panels to verify name, founder, parent organization, and details are accurate." }
    ])
  },
  {
    id: 307,
    title: "SXO 7: Claude Search Optimization",
    category: "sxo",
    description: "Prepare dense, factual, and exhaustively structured long-form content optimized for Anthropic's Claude context retrieval models.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Aids B2B companies in capturing deep technical queries where professionals consult Claude for research.",
    bestPractice: "Publish complete, highly dense, authoritative content guides that are easy to parse and contain clear structural headers.",
    details: "Claude prioritizes dense, coherent, logically sound long-form data. It performs exceptionally well on clearly formatted data chunks.",
    checklistItems: createItems(307, [
      { title: "Long-Form Data Density", desc: "Produce exhaustive, definitive guides covering topics from multiple critical viewpoints." },
      { title: "Structured Section Blocks", desc: "Format with HTML tags or Markdown structures to clearly block conceptual categories." },
      { title: "Source Attributions", desc: "Cite reputable scientific publications or primary data sources explicitly in the text." },
      { title: "Content Chunking Layout", desc: "Write distinct paragraphs focusing on a single core point with explicit definitions." },
      { title: "Entity References Mapped", desc: "Define proprietary concepts early in the document to allow direct concept indexing." }
    ])
  },
  {
    id: 308,
    title: "SXO 8: Perplexity Search Optimization",
    category: "sxo",
    description: "Align brand mentions on primary citation domains and optimize news feeds for Perplexity's real-time retrieval engines.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Captures active, tech-savvy users seeking live, referenced answers for buying decisions.",
    bestPractice: "Target the index sources Perplexity cites for target topics, and keep news directories updated via indexing protocols.",
    details: "Perplexity answers questions with live search results, citing credible publications, directories, and high-quality web pages.",
    checklistItems: createItems(308, [
      { title: "Citation Source Audit", desc: "Identify what domains Perplexity cites for industry competitor keywords." },
      { title: "Content Freshness Audit", desc: "Refresh outdated reference pages with recent timestamps and up-to-date data figures." },
      { title: "Digital PR Placements", desc: "Secure brand features and reviews on top-tier authority news domains." },
      { title: "Expert Quote Integrations", desc: "Add expert name opinions paired with credentials directly inside your landing pages." },
      { title: "Factual FAQ Build", desc: "Include direct answers to long-tail user queries to capture fast citation slots." }
    ])
  },
  {
    id: 309,
    title: "SXO 9: Reddit Search Optimization",
    category: "sxo",
    description: "Navigate community boards, manage brand visibility, and target community-driven discovery on Reddit.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Attains genuine word-of-mouth visibility on Google Search results which heavily feature Reddit discussions.",
    bestPractice: "Encourage honest community discussions and participate helpfully without overt promotional spam.",
    details: "Reddit has massive Google search visibility and high-trust user search volume. Users value raw, peer-to-peer authentic reviews.",
    checklistItems: createItems(309, [
      { title: "Subreddit Target Mapping", desc: "Audit and map the active Reddit boards where target audiences ask for sector solutions." },
      { title: "Community Participation", desc: "Contribute helpful answers, link citations, and guide user issues, building local account trust." },
      { title: "Expert Profile Building", desc: "Optimize profile bios with corporate titles and clear contact/verified links." },
      { title: "Brand Discussion Monitoring", desc: "Track name mentions and feedback threads to react to reputation concerns quickly." },
      { title: "Reputation Management", desc: "Adopt formal, polite guidelines to address negative user experiences on public threads." }
    ])
  },
  {
    id: 310,
    title: "SXO 10: LinkedIn Search Optimization",
    category: "sxo",
    description: "Accelerate professional and brand B2B discoverability by optimizing creator and corporate profile assets.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Drives B2B lead generation and enhances authority positioning directly with executive decision-makers.",
    bestPractice: "Utilize critical target industry search words in titles, about descriptions, and periodic published posts.",
    details: "LinkedIn search index filters profiles, keywords, and publication headlines to match search request patterns.",
    checklistItems: createItems(310, [
      { title: "Profile Keyword Optimization", desc: "Incorporate targeted skill and service keywords in creator headlines and profile summaries." },
      { title: "Headline Optimization", desc: "Structure job titles and taglines to clearly declare specialized niche solutions." },
      { title: "Niche Keyword Mapping", desc: "Define 5 core phrases and integrate them into articles and about descriptions." },
      { title: "Company Page Setup", desc: "Align corporate bio taglines and website URLs on organization portfolio structures." },
      { title: "Content Visibility Strategy", desc: "Establish weekly thought-leadership posts containing relevant industry hashtags." }
    ])
  },
  {
    id: 311,
    title: "SXO 11: Amazon Search Optimization",
    category: "sxo",
    description: "Dominate the transactional search index by mastering the A9/A10 ranking factors, reviews, and detail pages.",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    businessImpact: "Directly increases product sales and organic transaction velocities on the largest e-commerce platform.",
    bestPractice: "Place high-priority transactional keyword tags directly into titles and backend keyword files.",
    details: "Amazon's search index ranks product listings based on sales velocity, text matches, conversion rates, and positive review volumes.",
    checklistItems: createItems(311, [
      { title: "Transactional Keyword Research", desc: "Compile actual purchase intent phrases from Amazon search suggest lists." },
      { title: "Product Title Optimization", desc: "Write titles containing brand, model, key benefits, and critical search descriptors." },
      { title: "Bullet Point Semantic Build", desc: "Optimize the 5 main feature bullets with benefits and critical technical parameters." },
      { title: "A+ Content Integration", desc: "Deploy visually rich blocks, comparison charts, and image keyword data." },
      { title: "Product Image Alt Tags", desc: "Incorporate clear, descriptive keywords in image alternative details." },
      { title: "Review Acceleration Strategy", desc: "Utilize Amazon Vine or feedback requests to build initial verified customer reviews." }
    ])
  },
  {
    id: 312,
    title: "SXO 12: App Store Search Optimization (ASO)",
    category: "sxo",
    description: "Optimize metadata and rating signals to maximize visibility inside Apple App Store and Google Play listings.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Increases organic catalog downloads and reduces dependency on paid user acquisition spend.",
    bestPractice: "Balance keyword placements across titles, subtitles, and hidden metadata fields to avoid keyword stuffing.",
    details: "ASO relies on textual keyword matching, user ratings, download velocity, crash rates, and conversion-to-download percentages.",
    checklistItems: createItems(312, [
      { title: "App Title Optimization", desc: "Determine an engaging name specifying main utility descriptors within character counts." },
      { title: "Keyword Field Mapping", desc: "Target high-traffic competitive keywords inside store backend metadata fields." },
      { title: "Store Screenshot Assets", desc: "Upload clear, high-contrast visual screens detailing value-propositions." },
      { title: "Video Store Previews", desc: "Insert high-retention video loops showcasing active app UI mechanics." },
      { title: "Rating and Review Strategy", desc: "Trigger rating request alerts at moments of peak user satisfaction within the app." },
      { title: "Store Listing Localization", desc: "Translate app listings and screenshots to scale international download volumes." }
    ])
  },
  {
    id: 313,
    title: "SXO 13: Entity SEO Across Search Platforms",
    category: "sxo",
    description: "Build an ironclad entity presence across authoritative registries to align brand definitions in the AI age.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Ensures Google Knowledge Graph and AI search engines resolve your brand as a primary, trustworthy authority entity.",
    bestPractice: "Reconcile corporate attributes and founders on independent entities such as Wikidata.",
    details: "AI engines do not just index keywords; they index entities. Reconciling metadata across semantic platforms secures entity status.",
    checklistItems: createItems(313, [
      { title: "Wikidata Entity Build", desc: "Establish Wikidata records highlighting the corporate mission, website, and parent organization." },
      { title: "Google Knowledge Graph Alignment", desc: "Directly link organization websites to Knowledge Graph records via unified identifier IDs." },
      { title: "Social Profiles Optimization", desc: "Verify exact handle and name consistency on official LinkedIn, X, and YouTube accounts." },
      { title: "Business Directories Audit", desc: "Perform cleanup of public records on Yelp, Crunchbase, and localized directories." },
      { title: "AI Search Entity Profile", desc: "Cross-link brand references on authoritative sources to reinforce organizational sameAs parameters." }
    ])
  },
  {
    id: 314,
    title: "SXO 14: AI Search Visibility Monitoring",
    category: "sxo",
    description: "Formulate programmatic or systematic routines to monitor brand citation levels across ChatGPT, Gemini, and Perplexity.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Provides marketing teams with clear data on conversational engine citation share and competitive visibility.",
    bestPractice: "Consistently prompt conversational AI layers with buying templates to check brand recommendations.",
    details: "Tracking artificial intelligence mentions is a new discipline. Establish qualitative brand queries to monitor coverage ratios.",
    checklistItems: createItems(314, [
      { title: "ChatGPT Visibility Tracking", desc: "Query OpenAI Search Weekly with product niche reviews to inspect citation links." },
      { title: "Gemini Visibility Monitoring", desc: "Audit Google AI Overviews on target seed phrases to log display rates." },
      { title: "Claude Citation Audit", desc: "Verify Claude correctly states corporate details and service attributes when asked deep industry guides." },
      { title: "Perplexity citation checks", desc: "Analyze cited domains in Perplexity solutions to log your domain footprint." },
      { title: "Mentions Alerts Config", desc: "Deploy automated trackers monitoring brand keywords on news networks and forums." }
    ])
  },
  {
    id: 315,
    title: "SXO 15: Search Everywhere Dashboard & Reporting",
    category: "sxo",
    description: "Build deep unified metrics reporting dashboards tracking search, conversational citation performance, and social discovery paths.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Synthesizes multi-platform visibility metrics into unified B2B KPIs for board-level decision-makers.",
    bestPractice: "Create a single visualization framework that balances traditional SEO clicks with AI search citations.",
    details: "A comprehensive reporting board provides an exhaustive view of search organic health and brand discoverability metrics.",
    checklistItems: createItems(315, [
      { title: "Set Unified Visibility", desc: "Configure an integrated analytics board showing classic views and conversational share of voice." },
      { title: "Verify Webmaster Analytics", desc: "Maintain monthly sitemap, click, and placement trend metrics from Google and Bing panels." },
      { title: "YouTube Discovery Patterns", desc: "Track video traffic, search impressions, and external site click attributes." },
      { title: "AI Citations Metric Build", desc: "Integrate brand citation counts from LLMs into primary marketing logs." },
      { title: "Reddit & Forum Tracking", desc: "Track thread placements, upvotes, and customer referral clicks." }
    ])
  },
  {
    id: 316,
    title: "SXO 16: Final Capstone Project - Search Everywhere Optimization Audit",
    category: "sxo",
    description: "Submit a comprehensive multi-platform search, AI, and social visibility optimization report for a target commercial organization.",
    difficulty: "Expert",
    estimatedMinutes: 120,
    businessImpact: "Validates high-level professional mastery, unlocking the authoritative SXO Enterprise Architect Certification.",
    bestPractice: "Conduct exhaustive, real-world discovery tests across all 11 platforms to expose visibility gap opportunities.",
    details: "The capstone project represents the ultimate challenge. Complete the exhaustive audits to secure official board recognition.",
    checklistItems: createItems(316, [
      { title: "Conduct Google & Bing Audit", desc: "Submit complete indexing reports, schemas, and performance diagnostics." },
      { title: "Execute AI Answer Audit", desc: "Query ChatGPT, Gemini, Claude, and Perplexity, stating citation links and reference sources." },
      { title: "Optimize Community Channels", desc: "Deploy optimised YouTube content guides, Reddit engagement procedures, and optimized LinkedIn bios." },
      { title: "Model transactional platforms", desc: "Draft high-converting Amazon detail copy and optimized app store screenshot descriptions." },
      { title: "Validate Brand Entity Mappings", desc: "Submit unified sameAs JSON-LD blocks and compiled platform reports to certification panels." }
    ])
  },
  {
    id: 401,
    title: "GBP 1: Core Identity (NAP-W)",
    category: "gbp",
    description: "Secure business authenticity by configuring your storefront's exact legal name, physical coordinates, local phone lines, and UTM-tracked landing URLs.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Establishes a solid foundational footprint in Google's local indexing databases, preventing profile suspensions while accurately tracking organic click attribution.",
    bestPractice: "Always utilize your exact storefront legal name without keyword stuffing, and ensure the address matches your official corporate articles exactly.",
    details: "Google Business Profile rules mandate perfect matching across digital footprints. Inconsistencies or title keyword-stuffing are leading causes of automatic suspension.",
    checklistItems: createItems(401, [
      { title: "Official Business Name", desc: "Use your exact legal storefront name. Never stuff keywords into your title, as Google frequently suspends profiles for this violation." },
      { title: "Physical Address", desc: "Ensure your street name, suite number, and postal code perfectly match your official website and government listings." },
      { title: "Phone Number", desc: "Use a local phone number as your primary line to signal local presence. You can add a tracking number as primary only if your main line is listed as secondary." },
      { title: "Website URL", desc: "Link directly to your homepage or a location-specific landing page. Append UTM tracking codes (?utm_source=google&utm_medium=organic&utm_campaign=gbp) to track clicks accurately in Google Analytics." }
    ])
  },
  {
    id: 402,
    title: "GBP 2: Category & Service Architecture",
    category: "gbp",
    description: "Formulate local directory visibility using primary classifications, specific sub-categories, long-tail custom services, and rich product menus.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Unlocks high search volume for categorical search queries and maps specific commercial intents to your service cards.",
    bestPractice: "Match your primary category exactly to your primary commercial intent, and populate custom service descriptions with long-tail keywords.",
    details: "Category mapping is the single most powerful off-site optimization hook. Well-structured custom service cards feed semantic contexts back to Google query matches.",
    checklistItems: createItems(402, [
      { title: "Primary Category Selection", desc: "Choose the absolute closest match to your core business model. This single setting carries the heaviest weight for your local search rankings." },
      { title: "Secondary Categories", desc: "Add 2 to 5 specific secondary categories to unlock broader search visibility. Do not add irrelevant categories, as this dilutes your profile relevance." },
      { title: "Services Menu", desc: "Fully build out your services tab. Utilize custom service fields to add targeted, long-tail local keywords and clear price ranges where applicable." },
      { title: "Products Catalog", desc: "For physical goods or fixed-price packages, upload high-quality product images, detailed descriptions, and direct 'Buy' or 'Order Online' call-to-action buttons." }
    ])
  },
  {
    id: 403,
    title: "GBP 3: Profile Enrichment",
    category: "gbp",
    description: "Elevate search engine indexation coverage using the 750-character story pane, exact holiday operating hours, and voice-search attribute tagging.",
    difficulty: "Beginner",
    estimatedMinutes: 25,
    businessImpact: "Aligns business profile matching with detailed voice commands, filter searches, and improves CTR on localized query interfaces.",
    bestPractice: "Synthesize keyword density inside the first 250 characters of corporate descriptions before truncation takes place.",
    details: "Profile enrichment increases your surface area for secondary filters (e.g., wheelchair accessible, veteran-owned) which are increasingly triggered by voice assistant searches.",
    checklistItems: createItems(403, [
      { title: "750-Character Description", desc: "Write a compelling brand story. Put your most important services and target city names in the first 250 characters, as the rest gets truncated behind a 'More' link." },
      { title: "Operation Hours", desc: "Keep regular hours accurate to prevent negative reviews from angry customers. Update the 'Special Hours' tool immediately for holidays or sudden closures." },
      { title: "Business Attributes", desc: "Check all applicable boxes for amenities, safety measures, and identity tags (e.g., Wheelchair Accessible, Women-Led, Identifies as LGBTQ+ owned). These power Google's voice and filtered searches." }
    ])
  },
  {
    id: 404,
    title: "GBP 4: Visuals & Engagement Media",
    category: "gbp",
    description: "Reinforce customer engagement ratios by publishing verified high-resolution logos, cover layouts, geotagged real team imagery, and dynamic video walk-throughs.",
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    businessImpact: "Increases user dwell times, builds trust before physical contact, and delivers micro-conversions directly within Google Maps.",
    bestPractice: "Upload real, un-edited pictures of your office facade and team instead of stock imagery, and aim for weekly photo updates.",
    details: "Visual content signals active business presence to Google algorithms. User dwell time on photos provides a proxy of trust and direct conversion activity.",
    checklistItems: createItems(404, [
      { title: "Logo & Cover Photo", desc: "Upload a clean square logo (250x250px) and an high-resolution cover photo (1080x608px) that clearly shows your physical location or main service." },
      { title: "Geotagged Real Photos", desc: "Upload 3 to 5 new photos weekly. Prioritize real photos of your team, interior, exterior, and completed work over generic stock imagery." },
      { title: "Short Videos", desc: "Upload 30-second video clips showing customer walkthroughs, product demonstrations, or behind-the-scenes work to increase user dwell time on your profile." }
    ])
  },
  {
    id: 405,
    title: "GBP 5: Conversion & Trust Management",
    category: "gbp",
    description: "Establish deep engagement loops by setting up review protocols, rapid feedback replies, chat/messaging features, and automated FAQs.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Maximizes local buyer conversion rates, boosts ranking positions through active user interaction signals, and increases lead velocities.",
    bestPractice: "Reply to all reviews within 24 hours and include service keywords in your answers politely to enrich local contextual keywords.",
    details: "Conversion management signals freshness. Google rewards profiles that engage with customers via active messaging, prompt review responses, and constant post updates.",
    checklistItems: createItems(405, [
      { title: "Review Acquisition Strategy", desc: "Create a short, custom review link from your dashboard. Actively ask customers for feedback and guide them to mention specific services and your city name in their text." },
      { title: "Review Responses", desc: "Reply to every single review within 24 to 48 hours. Thank positive reviewers, and address negative ones politely with a clear solution and a number to call offline." },
      { title: "Merchant Messaging", desc: "Turn on the chat feature to allow real-time customer inquiries. Set up automated welcome messages and ensure your team replies within 24 hours to keep the feature active." },
      { title: "Pre-Populated Q&A", desc: "Use a personal Google account to ask your business its top 5 most frequently asked questions. Log into your business profile to provide authoritative, detailed answers." },
      { title: "Google Weekly Posts", desc: "Use the 'Updates,' 'Offers,' or 'Events' post types at least once a week. Include sharp visuals and specific call-to-action buttons like 'Book Now' or 'Learn More'." }
    ])
  }
];

export const LEVEL_QUIZZES: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: "q1_1",
      levelId: 1,
      question: "Why is precise Name, Address, and Phone (NAP) parity so important across legal registrations and footers?",
      options: [
        "It determines web server SSL security constraints directly.",
        "It provides entity validation to the Google Knowledge Graph and search engines, preventing duplicate ambiguity.",
        "It automatically allows you to rank first on standard commercial keywords.",
        "It eliminates the need for any internal linking structures."
      ],
      correctAnswerIndex: 1,
      explanation: "Consistent NAP data establishes a reliable entity map across multiple indexes, allowing search bots to resolve matching address parameters into a single secure entity."
    },
    {
      id: "q1_2",
      levelId: 1,
      question: "Which schema layout defines corporate profiles, registered addresses, and logo URLs directly to bots?",
      options: [
        "Product Schema",
        "HowTo Schema",
        "Organization Schema",
        "LocalBusiness Schema exclusively"
      ],
      correctAnswerIndex: 2,
      explanation: "Organization Schema is the primary structure to link brand details (Name, LegalName, SameAs) directly to corporate entities."
    }
  ],
  2: [
    {
      id: "q2_1",
      levelId: 2,
      question: "How does Brotli compression differ from legacy GZIP compression?",
      options: [
        "Brotli is specialized strictly for MP4 video streaming compression.",
        "Brotli uses a modern dictionary format to deliver smaller file sizes and faster page decompression.",
        "Brotli disables standard browser caching structures to stay fresh.",
        "Brotli requires HTTPS Port 80 exclusively to render correctly."
      ],
      correctAnswerIndex: 1,
      explanation: "Brotli compression delivers significantly smaller payload files than GZIP, resulting in faster download times and improved Core Web Vitals performance."
    },
    {
      id: "q2_2",
      levelId: 2,
      question: "What is an acceptable target Time to First Byte (TTFB) for high-performance hosting?",
      options: [
        "Under 200 milliseconds globally",
        "Between 1.5 to 2.5 seconds",
        "TTFB has no impact on technical crawlers",
        "Strictly 500 to 800 milliseconds"
      ],
      correctAnswerIndex: 0,
      explanation: "A high-performance benchmark for web hosting is a TTFB under 200ms, which ensures search bots can crawl your pages quickly and efficiently."
    }
  ],
  3: [
    {
      id: "q3_1",
      levelId: 3,
      question: "What is the primary function of a self-referential canonical tag on a resource page?",
      options: [
        "To enforce redirect rules to the developer's sandbox environment.",
        "To tell indexers that this specific URL is the authoritative master, preventing duplicate tracking strings from fragmenting link equity.",
        "To bypass Google's robots.txt directives automatically.",
        "To speed up raw CSS file parsing times."
      ],
      correctAnswerIndex: 1,
      explanation: "Self-referential canonical tags ensure that tracking variables or dynamic sorting parameters are rolled up to the primary index URL, preventing duplicate content issues."
    }
  ],
  13: [
    {
      id: "q13_1",
      levelId: 13,
      question: "What does 'GEO' (Generative Engine Optimization) optimize for?",
      options: [
        "Optimizing map parameters for fast spatial database geometry responses.",
        "Designing page layout structures and semantic text formulas to rank within LLM synthesis and RAG retrieval pools.",
        "Enforcing exact keyword counts inside hidden meta elements to trick AI crawlers.",
        "Creating interactive map overlays for native client locations."
      ],
      correctAnswerIndex: 1,
      explanation: "GEO focuses on keeping content structures, summary boxes, and cited statistics optimized for Retrieval-Augmented Generation (RAG) and LLM search flows."
    },
    {
      id: "q13_2",
      levelId: 13,
      question: "Which page item increases your 'retrieval confidence' score for AI search tools?",
      options: [
        "A large array of blinking banner graphics.",
        "An active sidebar tracker displaying server log ports.",
        "Proprietary datasets, direct factual definitions, and clear reference citations.",
        "Hiding keyword terms behind white background elements."
      ],
      correctAnswerIndex: 2,
      explanation: "Proprietary stats, original research, and clear definitions provide the fact-rich material that LLMs and search engines actively retrieve and cite as authoritative sources."
    }
  ]
};

// Fill up missing quizzes dynamically to ensure every level has exactly 5 basic diagnostic questions
MASTER_LEVELS.forEach(level => {
  if (!LEVEL_QUIZZES[level.id]) {
    LEVEL_QUIZZES[level.id] = [];
  }
  
  const currentQuizzes = LEVEL_QUIZZES[level.id];
  const needed = 5 - currentQuizzes.length;
  
  if (needed > 0) {
    const items = level.checklistItems || [];
    
    // Attempt to grab distinct checklist items for questions
    const item1: any = items[0] || { title: "Strategic Discovery Routing", description: "Allows crawler bots to navigate structural paths easily." };
    const item2: any = items[Math.min(1, items.length - 1)] || items[0] || { title: "Diagnostic Validation Checking", description: "Secures performance health benchmarks across all URLs." };
    const item3: any = items[Math.min(2, items.length - 1)] || items[0] || { title: "Metadata Signal Precision", description: "Tells search indices the exact context of the node content." };
    const item4: any = items[items.length - 1] || items[0] || { title: "Continuous Auditing Standards", description: "Maintains optimal search visibility over long-term updates." };
    
    // We will generate different types of questions to reach exactly 5
    for (let i = currentQuizzes.length; i < 5; i++) {
      if (i === 0) {
        // High Level Best Practice Question
        currentQuizzes.push({
          id: `q${level.id}_b1`,
          levelId: level.id,
          question: `What is the primary industry best practice when optimizing for "${level.title}"?`,
          options: [
            "Rely entirely on automated tools or templates without conducting custom audits.",
            level.bestPractice ? level.bestPractice : "Implement programmatic checks, structured schemas, and document original insights.",
            "Pack high volumes of hidden keyword strings into footer boxes.",
            "Serve outdated media layers to crawl bots to reduce processing loads."
          ],
          correctAnswerIndex: 1,
          explanation: `Succeeding in "${level.title}" requires structured execution: ${level.bestPractice ? level.bestPractice : 'prioritizing high-quality, readable content and robust indexing architectures.'}`
        });
      } else if (i === 1) {
        // Business Impact Question
        currentQuizzes.push({
          id: `q${level.id}_b2`,
          levelId: level.id,
          question: `Regarding "${level.title}", how does this optimization primarily influence business and index performance?`,
          options: [
            "It acts as a temporary styling fix with zero long-term search engine impact.",
            "It guarantees immediate top-ranking spots for competitive terms with no further effort.",
            level.businessImpact ? level.businessImpact : "It accelerates page discoverability, enhances user engagement, and secures rich-result presentation.",
            "It allows the domain to bypass all legal and technical security standards automatically."
          ],
          correctAnswerIndex: 2,
          explanation: `The real impact of "${level.title}" is clear: ${level.businessImpact ? level.businessImpact : 'it optimizes the user experience, avoids search bot crawl friction, and improves overall domain visibility.'}`
        });
      } else if (i === 2) {
        // Question about item 1
        currentQuizzes.push({
          id: `q${level.id}_i1`,
          levelId: level.id,
          question: `Within "${level.title}", what is the primary benefit of completing "${item1.title}"?`,
          options: [
            item1.description ? item1.description : "It ensures the directory is accessible, properly formatted, and discoverable.",
            "It completely replaces the need for standard robots.txt exclusion rules.",
            "It disables layout rendering on non-mobile devices to restrict cache use.",
            "It enforces secure client-browser encryptions across local developer environments."
          ],
          correctAnswerIndex: 0,
          explanation: `Completing "${item1.title}" allows developers to: ${item1.description ? item1.description : 'guarantee proper configuration and optimal crawler accessibility.'}`
        });
      } else if (i === 3) {
        // Question about item 2 / item 3
        currentQuizzes.push({
          id: `q${level.id}_i2`,
          levelId: level.id,
          question: `During the implementation of "${level.title}", why should you dedicate focus to "${item2.title}"?`,
          options: [
            "To mask network latency errors from diagnostic crawler logs.",
            "To minimize the need for high-performance hosting plans.",
            "To hide key sections from being scraped by competitive indexing frameworks.",
            item2.description ? item2.description : "To elevate search engine comprehension of pages and accelerate discovery cycles."
          ],
          correctAnswerIndex: 3,
          explanation: `Directing focus to "${item2.title}" directly helps to: ${item2.description ? item2.description : 'ensure your metadata and code structures are fully discoverable and readable by search bots.'}`
        });
      } else if (i === 4) {
        // Question about last item
        currentQuizzes.push({
          id: `q${level.id}_i3`,
          levelId: level.id,
          question: `For advanced performance scaling in "${level.title}", what is the primary objective of "${item4.title}"?`,
          options: [
            item4.description ? item4.description : "To continuously audit, validate, and secure the domain's long-term ranking signals.",
            "To flatten interactive navigation paths into single-record static files.",
            "To inject high quantities of tracking variables into product sitemaps.",
            "To delay search crawler requests until the database completes intensive storage compression."
          ],
          correctAnswerIndex: 0,
          explanation: `The "${item4.title}" benchmark helps to: ${item4.description ? item4.description : 'establish secure, robust, and scalable indexing signals that resist core algorithm updates.'}`
        });
      }
    }
  }
});
