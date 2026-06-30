import { Level, ChecklistItem } from "../types";

// Helper to generate checklist items
const createCourseItems = (levelId: number, items: { title: string; desc?: string; pts?: number }[]): ChecklistItem[] => {
  return items.map((it, idx) => ({
    id: `seo-l${levelId}-item-${idx}`,
    title: it.title,
    description: it.desc || "Standard verification checkpoint.",
    completed: false,
    points: it.pts || 10,
    levelId
  }));
};

export const SEO_COURSE_LEVELS: Level[] = [
  {
    id: 1001,
    title: "SEO Fundamentals",
    category: "seo-course",
    description: "Master the fundamental principles of SEO, including search engine crawling, indexation, algorithm updates, search intent, and the core elements of E-E-A-T.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Builds a rock-solid understanding of search algorithms to avoid black-hat penalties and align content with real user demands.",
    bestPractice: "Always design websites primarily for human users, then make them easily crawlable and indexable for search engines.",
    details: "This module covers the core concepts of SEO. You will learn the history of search engines, the mechanisms of crawlers, the difference between indexing and ranking, and how Google evaluates site trust through Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T).",
    checklistItems: createCourseItems(1001, [
      { title: "What is SEO?", desc: "Define Search Engine Optimization, its marketing values, and the critical differences between organic and paid acquisition." },
      { title: "History of Search Engines", desc: "Trace search engine evolution from early keyword-stuffing directories to advanced multi-modal semantic indices." },
      { title: "How Search Engines Work", desc: "Examine the technical pipeline of how bots crawl web documents, process assets, index text, and apply ranking formulas." },
      { title: "Crawling, Indexing & Ranking", desc: "Understand rendering cues, raw HTML parsing, index allocation, and final query matching stages." },
      { title: "Types of SEO", desc: "Differentiate the roles of On-Page (content/HTML), Off-Page (links/PR), and Technical SEO (rendering/infrastructure)." },
      { title: "White Hat vs Black Hat SEO", desc: "Establish ethical search marketing practices and learn to avoid manipulative techniques that trigger manual algorithmic penalties." },
      { title: "Google Algorithm Overview", desc: "Deconstruct major Google updates (Panda, Penguin, Hummingbird, Helpful Content) and real-time machine-learning signals." },
      { title: "Search Intent Mapping", desc: "Learn the four core search intents (Informational, Navigational, Commercial, Transactional) to align pages with query expectations." },
      { title: "E-E-A-T Core Principles", desc: "Deconstruct Experience, Expertise, Authoritativeness, and Trustworthiness as highlighted in Google's Search Quality Rater Guidelines." },
      { title: "SEO Myths & Facts", desc: "Dispel common industry misconceptions such as meta keyword tags, domain age ranking bias, and PPC rank correlations." }
    ])
  },
  {
    id: 1002,
    title: "Keyword Research",
    category: "seo-course",
    description: "Learn systematic keyword discovery, search intent alignment, competitor gap audits, keyword clustering, and AI-assisted search volume analysis.",
    difficulty: "Beginner",
    estimatedMinutes: 40,
    businessImpact: "Ensures you target high-intent search terms that attract paying customers instead of low-value, untargeted web traffic.",
    bestPractice: "Focus on commercial-intent long-tail keywords first to capture high-converting users with lower search competition.",
    details: "Keyword research is the blueprint of any SEO strategy. This module teaches you how to map keywords to customer journeys, utilize advanced tools, cluster topics semantically, and discover competitor ranking gaps.",
    checklistItems: createCourseItems(1002, [
      { title: "Keyword Fundamentals", desc: "Identify seed keywords, understand head terms vs long-tails, and evaluate search demand curves." },
      { title: "Search Intent Mapping", desc: "Match specific keyword groups to precise funnel stages, from educational blog posts to transactional product listings." },
      { title: "Keyword Types", desc: "Classify queries based on brand modifiers, geo-location, transactional triggers, and comparative attributes." },
      { title: "Long-tail Keywords", desc: "Discover highly specific search queries that carry massive intent and present faster ranking opportunities." },
      { title: "Semantic SEO", desc: "Shift from singular keyword matching to broad topical relevance, addressing entire subject categories comprehensively." },
      { title: "LSI Keywords", desc: "Locate Latent Semantic Indexing terms and co-occurring vocabulary to enrich content depth naturally." },
      { title: "Competitor Keyword Research", desc: "Reverse-engineer leading competitor URLs to discover their top-ranking keywords and traffic-driving directories." },
      { title: "Keyword Gap Analysis", desc: "Identify high-value keywords that multiple competitors rank for but your website does not yet target." },
      { title: "Keyword Clustering", desc: "Group related keywords into unified semantic categories to avoid keyword cannibalization and plan topical hubs." },
      { title: "Search Volume & Difficulty", desc: "Evaluate search volumes, organic click-through rates, seasonal swings, and realistic keyword difficulty scores." },
      { title: "Seasonal Keywords", desc: "Identify holiday or seasonal search spikes to schedule content publication and promotional campaigns proactively." },
      { title: "AI-assisted Keyword Research", desc: "Use LLM prompts to brainstorm search niches, generate lateral topics, and categorize keywords at scale." }
    ])
  },
  {
    id: 1003,
    title: "SEO Planning & Strategy",
    category: "seo-course",
    description: "Construct custom 90-day SEO roadmaps, plan competitive content strategies, map topic clusters, and set trackable business KPIs.",
    difficulty: "Beginner",
    estimatedMinutes: 35,
    businessImpact: "Transforms ad-hoc content creation into a structured organic growth engine with clear ROI targets and project timelines.",
    bestPractice: "Establish a clear hub-and-spoke content architecture, building out comprehensive pillar pages linked to supporting sub-articles.",
    details: "A great strategy beats random optimization. Learn how to audit a site, benchmark competitors, draft topical clusters, build a structured content calendar, and present SEO roadmaps.",
    checklistItems: createCourseItems(1003, [
      { title: "SEO Roadmap Formulation", desc: "Design a step-by-step 90-day operational roadmap prioritizing tech fixes, content creation, and link building." },
      { title: "Website Audit Foundations", desc: "Examine baseline technical health, page indexing, on-page layouts, and structural backlink metrics." },
      { title: "Competitor Analysis", desc: "Assess competitor link profiles, domain authority tiers, content depth, and directory structures." },
      { title: "SEO Goal Setting", desc: "Align organic search objectives with high-level business goals like customer acquisitions and revenue totals." },
      { title: "KPI Definition", desc: "Establish trackable key performance indicators: impressions, organic clicks, average positions, and conversion events." },
      { title: "Topic Clusters Planning", desc: "Formulate a clustered architecture containing high-level pillar pages and supporting hyper-focused sub-articles." },
      { title: "Pillar Pages Design", desc: "Structure comprehensive, broad resources that cover a major topic fully and serve as hubs for internal links." },
      { title: "Content Strategy", desc: "Formulate a systematic editorial flow centered on topical gaps, search demand, and brand authority." },
      { title: "SEO Project Planning", desc: "Establish workflow responsibilities, editorial calendars, link acquisition campaigns, and technical timelines." }
    ])
  },
  {
    id: 1004,
    title: "Technical SEO",
    category: "seo-course",
    description: "Deep-dive into website crawlability, sitemaps, canonical tags, server responses, JavaScript rendering, Core Web Vitals, and international indexation.",
    difficulty: "Intermediate",
    estimatedMinutes: 60,
    businessImpact: "Ensures Google can crawl and index your pages rapidly without wasting crawl budget on duplicate or broken URLs.",
    bestPractice: "Keep your site architecture flat (no page should be more than 3 clicks away from the homepage) and minimize JavaScript client-side rendering.",
    details: "Technical SEO ensures a search engine can read your site without friction. This advanced module teaches sitemap routing, robots rules, canonical configurations, redirect chains resolution, log analysis, Core Web Vitals optimization, and multi-language Hreflang setups.",
    checklistItems: createCourseItems(1004, [
      { title: "Website Architecture", desc: "Design flat, logical directory tree paths that guide link equity and spider crawl tracks efficiently." },
      { title: "Crawlability & Robots.txt", desc: "Configure robots.txt rules to block indexing of admin panels while keeping primary assets accessible to search spiders." },
      { title: "XML Sitemap Optimization", desc: "Structure dynamic, clean XML sitemaps excluding redirected URLs, 404 pages, and canonicalized paths." },
      { title: "HTML Sitemap Creation", desc: "Deploy user-facing HTML sitemaps to establish robust internal link networks and aid structural indexation." },
      { title: "Canonical Tags Implementation", desc: "Apply self-referential and cross-domain canonical tags to prevent duplicate content flags on parameter pages." },
      { title: "Pagination Management", desc: "Optimize multi-page list layouts using clean URL pathways, self-referential canonicals, or click-to-load configurations." },
      { title: "Redirects & Redirect Chains", desc: "Eliminate wasteful redirect loops, and implement server-level 301 redirects to consolidate link value." },
      { title: "HTTPS Enforcements", desc: "Verify secure SSL/TLS handshakes, eliminate mixed content issues, and enforce site-wide HTTPS rules." },
      { title: "URL Structure Guidelines", desc: "Construct clean, readable, lowercase, and descriptive URL paths containing focus keywords." },
      { title: "Crawl Budget Optimization", desc: "Optimize crawl pathways by blocking parameters and server-intensive scripts, keeping crawl focus on active pages." },
      { title: "Duplicate Content Resolution", desc: "Resolve duplicate page problems via canonicalization, 301 redirects, or robots noindex instructions." },
      { title: "Server Response Codes Audit", desc: "Audit and fix server headers: ensure status 200 for good pages, 301 for moved assets, and 404/410 for deleted content." },
      { title: "Log File Analysis", desc: "Evaluate actual server access logs to track where Googlebots crawl and identify crawl bottlenecks." },
      { title: "JavaScript SEO", desc: "Optimize dynamic JS rendering: test Client-Side Rendering vs Server-Side Rendering (SSR) for indexation." },
      { title: "Core Web Vitals Core", desc: "Optimize site performance: target Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)." },
      { title: "Mobile-First Indexing Audit", desc: "Confirm text parity, asset accessibility, and touch target sizes match mobile-first rendering layouts." },
      { title: "International SEO Hreflang", desc: "Implement correct hreflang tags to map regional and multi-language variations without duplicate content flags." },
      { title: "Image, Video & PDF SEO", desc: "Configure media indexes: optimize descriptive alt texts, media schemas, compressed formats, and PDF metadata." }
    ])
  },
  {
    id: 1005,
    title: "On-Page SEO",
    category: "seo-course",
    description: "Optimize title tags, meta descriptions, heading hierarchies, URL structures, internal links, anchor text, and rich-snippet layouts.",
    difficulty: "Beginner",
    estimatedMinutes: 45,
    businessImpact: "Maximizes keyword relevance scores and significantly boosts click-through rates (CTR) in search results.",
    bestPractice: "Put your primary target keyword at the absolute beginning of your title tag and maintain clean, descriptive header hierarchies.",
    details: "On-Page SEO is about making your content clearly understandable to crawlers while enticing users in search results. Learn to craft metadata, format heading tags, structure internal anchor texts, and build featured snippet formats.",
    checklistItems: createCourseItems(1005, [
      { title: "Title Tags Optimization", desc: "Write distinct, compelling title tags within 60 characters with primary keywords placed at the start." },
      { title: "Meta Descriptions Strategy", desc: "Draft action-oriented meta descriptions within 155 characters that incorporate search terms and high-converting CTAs." },
      { title: "Heading Structure (H1-H6)", desc: "Enforce a single semantic H1 tag per page, followed by a logical, nested header outline (H2, H3, H4)." },
      { title: "URL Directory Optimization", desc: "Keep URL slugs short, clean, lowercase, and keyword-focused while removing stop words and special characters." },
      { title: "Internal Linking Network", desc: "Create descriptive contextual internal link structures to distribute authority and aid index discovery." },
      { title: "External Citation Outlinks", desc: "Link out to trusted, authoritative reference sources to establish trust signals and supplement topic depth." },
      { title: "Anchor Text Relevance", desc: "Use natural, keyword-relevant variations for anchor texts, avoiding generic triggers like 'click here' or 'read more'." },
      { title: "Image Alt Text & Compression", desc: "Include informative, keyword-rich alt texts on all images, and deploy WebP formats with lazy-loading parameters." },
      { title: "Content Keyword Placement", desc: "Naturally place target keywords in first 100 words, body text, image filenames, and page footer lines." },
      { title: "Readability & Font Optimization", desc: "Use responsive font scaling, short paragraph blocks, bulleted lists, and high-contrast typography to maximize readability." },
      { title: "Featured Snippet Formatting", desc: "Incorporate direct definitions (40-60 words), clean HTML list tables, or structured Q&A formats to win Google featured results." }
    ])
  },
  {
    id: 1006,
    title: "Content SEO",
    category: "seo-course",
    description: "Learn to design comprehensive topic silos, draft content briefs for topical authority, evaluate Helpful Content compliance, and execute programmatic SEO.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Builds a reliable wall of topical authority that secures sustainable, long-term rankings across entire niches.",
    bestPractice: "Audit and prune low-performing old content systematically, merging pages into authoritative, comprehensive guides.",
    details: "Content is the fuel of search. Learn to structure content silos, build comprehensive guides that align with Google's Helpful Content System, deploy ethical AI-assisted content pipelines, and scale search presence via clean programmatic pages.",
    checklistItems: createCourseItems(1006, [
      { title: "Content Planning Briefs", desc: "Draft semantic content briefs detailing target intent, heading plans, related LSI keywords, and competing URL benchmarks." },
      { title: "Topical Authority Mapping", desc: "Chart comprehensive coverage of your niche to satisfy semantic algorithms and demonstrate deep subject expertise." },
      { title: "Content Silos Architecture", desc: "Isolate distinct product or informational silos, enforcing tight internal linking paths between related articles." },
      { title: "Blogging & Editorial Calendars", desc: "Design a regular, consistent publishing schedule centered on informational queries and keyword clusters." },
      { title: "Google Helpful Content Compliance", desc: "Ensure your content is written by or with real experts, solves actual problems, and avoids thin, low-value summaries." },
      { title: "AI Content Guidelines", desc: "Employ AI generation tools ethically for drafts, focusing on human editing, adding original data, and incorporating unique brand perspectives." },
      { title: "Evergreen Content", desc: "Build comprehensive evergreen guides that provide consistent, long-term search value and require minimal updates." },
      { title: "Updating Old Content", desc: "Regularly rewrite outdated articles, optimize old headings, add fresh data points, and adjust canonical references." },
      { title: "Duplicate Content Prevention", desc: "Audit content assets to prevent self-cannibalization and ensure every active URL targets a distinct search intent." },
      { title: "Programmatic SEO", desc: "Deploy programmatic templates to build highly localized or data-driven landing pages at scale, keeping content original and useful." }
    ])
  },
  {
    id: 1007,
    title: "Off-Page SEO",
    category: "seo-course",
    description: "Master link building fundamentals, digital PR campaigns, journalist outreach (HARO/Connectively), unlinked brand mentions, and disavow protocols.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Supercharges your domain authority, allowing your content to rank higher and faster for competitive search queries.",
    bestPractice: "Prioritize acquiring backlinks from highly relevant websites with real, active search traffic rather than pursuing pure link volume.",
    details: "Backlinks are vote indicators of trust. Learn to build relationships, write pitches, win digital PR placements, secure editorial links, audit incoming backlink profiles, and handle toxic links correctly.",
    checklistItems: createCourseItems(1007, [
      { title: "Backlink Fundamentals", desc: "Assess link quality metrics: evaluate PageRank theories, domain authority, anchor texts, and spam scores." },
      { title: "Link Building Outreach", desc: "Master cold email pitches, propose valuable resource placements, and build long-term relationships with site webmasters." },
      { title: "Digital PR Campaigns", desc: "Design data-backed studies, infographics, and original surveys to earn natural, high-authority media links." },
      { title: "HARO & Journalist Outreach", desc: "Monitor daily journalist requests on platforms like Connectively/HARO and write expert responses to win media placements." },
      { title: "Guest Posting", desc: "Pitch and write highly valuable guest articles for relevant industry publications that include editorial backlinks." },
      { title: "Broken Link Building", desc: "Identify broken outbound links on high-quality external resources and suggest your active content as the perfect replacement." },
      { title: "Resource Page Link Building", desc: "Locate curated resource directories in your industry and submit your pillar assets for citation additions." },
      { title: "Unlinked Brand Mentions Recovery", desc: "Search for sites that mention your brand name but do not link to your website, and pitch them to add active links." },
      { title: "Local Citation & Directory Building", desc: "Submit your business details to authoritative local business portals and industry directories to solidify localized footprints." },
      { title: "Toxic Link Audits & Disavow", desc: "Audit your backlink profile for manipulative, low-quality link injections, and deploy disavow files when necessary." }
    ])
  },
  {
    id: 1008,
    title: "Local SEO",
    category: "seo-course",
    description: "Optimize your Google Business Profile, construct clean local citations, maintain strict NAP consistency, and dominate map pack rankings.",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    businessImpact: "Captures ready-to-buy local customers who search for service providers or physical store locations in your vicinity.",
    bestPractice: "Respond to every single customer review (positive or negative) promptly and include localized keywords in your owner responses.",
    details: "Local SEO makes physical storefronts and localized service providers visible in Google Maps. Learn to claim and manage Google Business Profiles, maintain NAP data consistency, collect local reviews, and audit localized rankings.",
    checklistItems: createCourseItems(1008, [
      { title: "Google Business Profile Optimizations", desc: "Claim your GBP, select the correct primary business categories, upload high-res photos, and publish weekly updates." },
      { title: "NAP Consistency Auditing", desc: "Ensure your Name, Address, and Phone details are formatted identically across your website, GBP, and all directory portals." },
      { title: "Local Citations", desc: "Submit accurate business listings to top citation aggregators like Yelp, Foursquare, YellowPages, and localized directories." },
      { title: "Reviews Acquisition & Management", desc: "Implement automated review pipelines, draft helpful owner responses, and build social proof safely." },
      { title: "Local Keyword Research", desc: "Target geo-modified keywords (e.g., 'dentist near me', 'plumber in Boston') and optimize content headings accordingly." },
      { title: "Local Landing Pages", desc: "Design conversion-focused local office or service area landing pages with integrated maps and specific team bios." },
      { title: "Maps Ranking Factors", desc: "Optimize proximity indicators, localized link metrics, structural business categories, and direct customer clicks." },
      { title: "Multi-location SEO Management", desc: "Manage bulk listings, deploy distinct location landing pages, and handle global multi-location brand architectures." }
    ])
  },
  {
    id: 1009,
    title: "E-commerce SEO",
    category: "seo-course",
    description: "Optimize product listing pages, category hubs, handle faceted navigation, deploy product schemas, and configure Merchant Center listings.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Enables direct category rankings and rich merchant results, boosting transactional organic traffic and sales.",
    bestPractice: "Implement self-referential canonical tags on faceted filtering URLs to avoid indexing thousands of dynamic parameter pages.",
    details: "E-commerce sites are large and complex. Learn to manage faceted navigation, craft category descriptions, optimize product pages with JSON-LD schema, and connect product feeds directly into Google Merchant listings.",
    checklistItems: createCourseItems(1009, [
      { title: "Category Page Optimization", desc: "Structure high-authority category listing pages containing intro copy, clean heading tags, and logical internal links." },
      { title: "Product Page SEO", desc: "Optimize product pages with original descriptions, high-res photos, alt attributes, and clear customer reviews." },
      { title: "Faceted Navigation Management", desc: "Prevent duplicate page indexes by applying robots noindex tags, canonical rules, or GSC parameter blocks on filter selections." },
      { title: "Product JSON-LD Schema", desc: "Configure product, price, reviews, availability, and merchant offer schemas to win rich results in search layouts." },
      { title: "Google Merchant Listings Integration", desc: "Connect product feeds directly to Google Merchant Center to unlock free organic merchant listings in search tabs." },
      { title: "WooCommerce & Shopify SEO", desc: "Optimize checkout templates, speed up loading assets, customize permalink rules, and manage native SEO app configurations." }
    ])
  },
  {
    id: 1010,
    title: "Enterprise SEO",
    category: "seo-course",
    description: "Manage large-scale websites with thousands of pages, optimize massive crawl budgets, automate technical checks, and report to stakeholders.",
    difficulty: "Advanced",
    estimatedMinutes: 55,
    businessImpact: "Unlocks million-dollar traffic gains by ensuring site updates do not break indexing across massive directories.",
    bestPractice: "Automate technical regression testing to catch broken canonicals, 404 response codes, and hreflang errors on build deployments.",
    details: "Enterprise SEO involves managing websites with 100k+ pages. Learn how to optimize massive crawl budgets, manage multi-department content governance, implement automated QA checks, and build high-level dashboard reports.",
    checklistItems: createCourseItems(1010, [
      { title: "Large Website SEO Management", desc: "Manage index structures and crawl flows across sites containing 100k+ pages, preventing index bloat and thin pages." },
      { title: "Crawl Budget Scaling", desc: "Reduce server loads and prioritize core URL crawl frequencies by pruning old directories and cleaning redirects." },
      { title: "Automated SEO Checks", desc: "Deploy scripts or scheduled crawling bots to automatically monitor canonical status, meta tags, and indexing configurations." },
      { title: "Content Governance", desc: "Establish corporate workflows, style guides, and approval gates to maintain SEO standards across multi-editor teams." },
      { title: "Enterprise Executive Dashboards", desc: "Build automated Looker Studio dashboards consolidating GSC, GA4, and ranking tools for executive reporting." }
    ])
  },
  {
    id: 1011,
    title: "Schema & Structured Data",
    category: "seo-course",
    description: "Deploy advanced machine-readable JSON-LD schema markups, map custom entity profiles, and validate rich search results.",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    businessImpact: "Feeds structured data directly to Google and AI search systems, winning high-CTR rich snippets and carousel card placements.",
    bestPractice: "Nest related schemas (like Author within Article and Offer within Product) inside a unified JSON-LD block to maintain semantic relationships.",
    details: "Structured data helps engines understand your page's entities and concepts. This module covers organization, local business, product, article, FAQ, video, and review schemas using validated JSON-LD scripts.",
    checklistItems: createCourseItems(1011, [
      { title: "Schema Basics", desc: "Understand semantic web theories, vocabularies (Schema.org), and microdata vs JSON-LD formats." },
      { title: "JSON-LD Structuring", desc: "Draft valid JSON-LD scripts, managing brackets, comma syntax, nesting structures, and specific context keys." },
      { title: "Organization & Local Business Schema", desc: "Incorporate address data, social media profiles, logo files, coordinates, and contact details for Knowledge Graphs." },
      { title: "Product & AggregateRating Schema", desc: "Incorporate product pricing, SKU tags, currencies, product ratings, stock status, and merchant listings parameters." },
      { title: "Article & BlogPosting Schema", desc: "Markup articles with publication dates, headline summaries, author profiles, and publisher organization data." },
      { title: "FAQ & FAQPage Schema", desc: "Implement question-and-answer structured schemas to win accordions directly inside search results." },
      { title: "Breadcrumb Schema", desc: "Markup breadcrumb navigation sequences to help search engines display clean hierarchical paths in search results." },
      { title: "Review & Video Schema", desc: "Configure rating values, review authors, video players, thumbnails, play durations, and video timestamps." },
      { title: "Validation Tools Mastery", desc: "Test scripts with Google Rich Results Test and Schema.org Validator to confirm zero rendering errors." }
    ])
  },
  {
    id: 1012,
    title: "Search Everywhere Optimization (SXO)",
    category: "seo-course",
    description: "Optimize brand discoverability and visibility across traditional search engines, social platforms, video hubs, and marketplace databases.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Diversifies organic search traffic, capturing active shoppers across Reddit, YouTube, TikTok, and Amazon search portals.",
    bestPractice: "Publish original, helpful discussions on Reddit and YouTube, then optimize their video and text content for native platform search systems.",
    details: "SXO recognizes that search occurs everywhere. This module shows you how to optimize for YouTube, TikTok, Reddit, Pinterest, Amazon, app stores, and local directory search interfaces to create a comprehensive digital footprint.",
    checklistItems: createCourseItems(1012, [
      { title: "Search Everywhere Ecosystems", desc: "Map where your audience searches, from classic engines to social networks, video portals, and specialized databases." },
      { title: "Video Search Optimization", desc: "Optimize video descriptions, tags, captions, chapter headings, and thumbnail alt texts on platforms like YouTube." },
      { title: "Reddit & Community Search", desc: "Secure brand presence in subreddits, publish authentic expert threads, and optimize titles for user search queries." },
      { title: "Marketplace Search & ASO", desc: "Optimize product copy for Amazon algorithms, and improve App Store listings with keywords, reviews, and high-impact images." },
      { title: "Omnichannel Search Coordination", desc: "Unify search keywords across web directories, YouTube profiles, and social posts to maintain a consistent brand footprint." }
    ])
  },
  {
    id: 1013,
    title: "Generative Engine Optimization (GEO)",
    category: "seo-course",
    description: "Format block-level content for retrieval-augmented generation (RAG) models, secure citations in AI overviews, and manage LLM bot crawling.",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    businessImpact: "Secures top-tier citations in ChatGPT Search, Gemini, and Claude, capturing the next generation of conversational searchers.",
    bestPractice: "Publish original, citeable research with clear statistics and bulleted lists that AI systems can easily extract and reference.",
    details: "GEO is the science of being visible in AI search. Learn SGE/AI Overviews retrieval patterns, structure data for Retrieval-Augmented Generation (RAG), deploy llms.txt, and write content optimized for LLM citations.",
    checklistItems: createCourseItems(1013, [
      { title: "AI Search Fundamentals", desc: "Examine generative engine architectures: deconstruct how search systems combine traditional index data with LLMs." },
      { title: "Retrieval-Augmented Generation (RAG)", desc: "Learn how AI models search, select, and compile external website content to formulate dynamic user answers." },
      { title: "Citation Optimization", desc: "Format high-value statistics, short expert quotes, and bulleted data sets to win citation references in AI Overviews." },
      { title: "Entity Mapping", desc: "Register and connect your brand, founders, and products as distinct entities in Wikipedia, Wikidata, and Knowledge Graphs." },
      { title: "LLM Bot Controls & llms.txt", desc: "Deploy llms.txt and configure robots.txt parameters to control how OpenAI, Google, and Anthropic bots crawl your assets." },
      { title: "AI-Friendly Content Designs", desc: "Incorporate structured summaries, key takeaways, and direct question-answer pairings to optimize RAG retrieval." }
    ])
  },
  {
    id: 1014,
    title: "Answer Engine Optimization (AEO)",
    category: "seo-course",
    description: "Dominate Google featured snippets, People Also Ask (PAA) accordions, zero-click answers, voice queries, and conversational conversational blocks.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Positions your brand as the definitive answer source, capturing massive visibility in voice search and automated mobile answers.",
    bestPractice: "Incorporate a direct, concise 50-word answer immediately below your article headings, followed by deep supporting details.",
    details: "AEO focuses on providing the absolute best answer to user questions. Learn to parse PAA accordions, map conversational search patterns, configure voice search queries, and structure content to dominate zero-click searches.",
    checklistItems: createCourseItems(1014, [
      { title: "Featured Snippets Optimization", desc: "Optimize content to capture paragraph, list, and table featured snippets at the top of organic search lists." },
      { title: "People Also Ask (PAA) Strategy", desc: "Identify popular PAA questions for target topics and incorporate direct, authoritative answers within your articles." },
      { title: "Voice Search Optimization", desc: "Target natural speech query variations, creating conversational content that matches spoken assistant requests." },
      { title: "Zero-Click Search Optimization", desc: "Win visibility on informational searches by using bold summaries, clean tables, and informative lists that answer queries directly." },
      { title: "Conversational FAQ Clusters", desc: "Create structured FAQ blocks mapped to related long-tail user queries to capture conversational search flows." }
    ])
  },
  {
    id: 1015,
    title: "AI SEO & Automation",
    category: "seo-course",
    description: "Build automated SEO workflows, master programmatic prompt engineering, execute automated site audits, and design custom SEO agents.",
    difficulty: "Expert",
    estimatedMinutes: 60,
    businessImpact: "Multiplies your team's operational output by 10x, automating tedious analysis to focus resources on strategic execution.",
    bestPractice: "Always review AI-generated code, sitemaps, or text drafts with a senior human SEO before publishing to maintain accuracy and quality.",
    details: "Automation is the future of SEO. Learn programmatic prompt engineering, build python scripts for keyword clustering, use AI models for metadata generation, and construct custom AI agents for complete site audits.",
    checklistItems: createCourseItems(1015, [
      { title: "AI Workflow Architectures", desc: "Incorporate AI automation into daily workflows, from keyword clustering to metadata generation and schema drafting." },
      { title: "SEO Prompt Engineering", desc: "Draft detailed, multi-step LLM prompts containing context, formatting constraints, and target guidelines for SEO tasks." },
      { title: "AI Content Audits", desc: "Use AI APIs to evaluate existing pages against target content briefs and identify information gaps." },
      { title: "Automated Keyword Clustering", desc: "Build Python scripts or utilize AI platforms to categorize thousands of keywords based on search intent and topical relevance." },
      { title: "AI Agents for Technical Audits", desc: "Design custom AI agents that crawl site directories, inspect meta tags, and flag technical indexation issues." }
    ])
  },
  {
    id: 1016,
    title: "Core Web Vitals & Performance",
    category: "seo-course",
    description: "Optimize Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) to ensure blazing-fast load speeds.",
    difficulty: "Advanced",
    estimatedMinutes: 55,
    businessImpact: "Improves organic search rankings, dramatically reduces bounce rates, and boosts user conversion metrics.",
    bestPractice: "Pre-load hero images, apply exact width/height attributes to media elements, and defer non-critical JavaScript execution.",
    details: "User experience is a critical ranking factor. This module covers performance optimization using PageSpeed Insights, debugging layout shifts, accelerating render pipelines, configuring CDN caches, and optimizing code.",
    checklistItems: createCourseItems(1016, [
      { title: "Largest Contentful Paint (LCP) Optimization", desc: "Accelerate hero asset delivery by compressing images, preloading primary resources, and reducing server response times." },
      { title: "Cumulative Layout Shift (CLS) Elimination", desc: "Eliminate layout shifts by setting explicit aspect ratios on all image and media elements and avoiding late dynamic content inserts." },
      { title: "Interaction to Next Paint (INP) Reduction", desc: "Reduce input delays by deferring non-essential JS, breaking up long main-thread tasks, and optimizing browser paint pipelines." },
      { title: "Image Compression & Formats", desc: "Adopt modern formats like WebP or AVIF, apply responsive srcsets, and implement native lazy-loading." },
      { title: "CDNs, Caching & Minification", desc: "Deploy global CDNs, configure server-side page caching, and minify HTML, CSS, and JS resources to minimize payload sizes." }
    ])
  },
  {
    id: 1017,
    title: "Mobile SEO",
    category: "seo-course",
    description: "Ensure flawless responsive design, optimize mobile viewport rendering speeds, audit touch targets, and configure mobile-first index parameters.",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    businessImpact: "Ensures your site ranks and converts flawlessly for the majority of searchers who use mobile devices.",
    bestPractice: "Always verify your content layout and rendering speed on simulated 3G/4G networks and budget mobile devices.",
    details: "Google uses mobile-first indexing. Learn responsive design rules, optimize viewport configurations, audit touch sizes, resolve mobile rendering blocks, and verify text parity between desktop and mobile versions.",
    checklistItems: createCourseItems(1017, [
      { title: "Responsive Layout Auditing", desc: "Verify that all pages adapt to diverse screen dimensions without horizontal scrolling or clipped text." },
      { title: "Mobile Touch Target Sizes", desc: "Ensure interactive elements like buttons and links are at least 44x44 pixels with ample spacing around them." },
      { title: "Mobile Rendering Performance", desc: "Test mobile load speeds under throttled network conditions and eliminate render-blocking assets." },
      { title: "Desktop-Mobile Text Parity", desc: "Verify that all headings, body copy, structured schemas, and navigation menus are identical on both desktop and mobile layouts." }
    ])
  },
  {
    id: 1018,
    title: "International SEO",
    category: "seo-course",
    description: "Deploy multi-language and multi-regional targeting, configure hreflang tags, map country-specific domains, and build localization plans.",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    businessImpact: "Allows risk-free expansion into global markets, matching regional searchers to localized language directories.",
    bestPractice: "Always include a self-referential hreflang tag and a default 'x-default' version for unspecified languages.",
    details: "International SEO matches regional users to localized site directories. Learn hreflang tag configurations, domain targeting models (ccTLDs vs subfolders), multi-region keyword research, and regional content localization techniques.",
    checklistItems: createCourseItems(1018, [
      { title: "Hreflang Tags Architecture", desc: "Deploy precise hreflang tags in HTML headers, XML sitemaps, or HTTP headers to specify target languages and regions." },
      { title: "Regional Domain Target Models", desc: "Select country-specific ccTLDs (site.fr), subdomains (fr.site.com), or subfolders (site.com/fr/) based on business scale." },
      { title: "International Keyword Research", desc: "Analyze search terms based on regional language behaviors, avoiding direct, automated translations of seed keywords." },
      { title: "Localization & Cultural Mapping", desc: "Localize currency displays, address info, contact lines, and content messaging to match local market expectations." }
    ])
  },
  {
    id: 1019,
    title: "SEO Analytics & Reporting",
    category: "seo-course",
    description: "Master Google Search Console and GA4 integrations, configure custom exploration reports, track organic keyword rankings, and build Looker Studio boards.",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    businessImpact: "Establishes a reliable feedback loop to track organic progress and clearly demonstrate SEO value to business leadership.",
    bestPractice: "Set up content groups in Google Search Console to track performance improvements across specific directory categories.",
    details: "Decisions must be data-driven. This module teaches how to navigate GSC, configure custom GA4 exploration reports, monitor organic keyword positions, calculate search ROI, and build Looker Studio dashboards.",
    checklistItems: createCourseItems(1019, [
      { title: "Google Search Console Configurations", desc: "Verify domains, connect Search Console to GA4, submit sitemaps, and analyze indexing errors." },
      { title: "GA4 Organic Search Conversions", desc: "Configure conversion events, build organic search segmentations, and track specific landing page performance." },
      { title: "Organic Keyword Position Tracking", desc: "Configure tracking for priority head terms and long-tails across search engines and localized markets." },
      { title: "Looker Studio Dashboard Creation", desc: "Build automated, visual report dashboards that pull live data from Search Console, Analytics, and rank trackers." }
    ])
  },
  {
    id: 1020,
    title: "SEO Audits",
    category: "seo-course",
    description: "Conduct professional technical, content, backlink, and schema audits, and construct prioritised sitemaps and roadmaps for fixes.",
    difficulty: "Intermediate",
    estimatedMinutes: 55,
    businessImpact: "Provides a clear, prioritized checklist of issues to fix to resolve indexing blocks and reverse traffic declines.",
    bestPractice: "Group your audit findings into clear 'High, Medium, and Low' impact categories to prioritize technical fixes.",
    details: "An audit is a comprehensive diagnostic checkup. Learn to run technical crawls (Screaming Frog), perform content inventory audits (pruning/merging), run backlink risk reviews, and compile actionable fix lists for developer teams.",
    checklistItems: createCourseItems(1020, [
      { title: "Technical Crawl Audit", desc: "Perform comprehensive crawl diagnostics using Screaming Frog to locate broken links, redirect chains, and missing tags." },
      { title: "Content Inventory & Pruning", desc: "Identify low-performing, thin, or duplicate pages to delete, merge, or rewrite to consolidate topical authority." },
      { title: "Backlink Risk Audit", desc: "Examine backlink profiles for manipulative, low-quality anchor text signals or unnatural link velocities." },
      { title: "Actionable Roadmap Compilation", desc: "Transform audit findings into prioritized developer tickets, noting technical requirements, business impact, and complexity." }
    ])
  },
  {
    id: 1021,
    title: "SEO for Different CMS",
    category: "seo-course",
    description: "Optimize search performance across popular content management systems including WordPress, Shopify, Webflow, and Headless setups.",
    difficulty: "Beginner",
    estimatedMinutes: 40,
    businessImpact: "Enables fast, robust SEO configurations regardless of the technical platform your website is built on.",
    bestPractice: "Disable unused add-ons, compress custom templates, and rely on native schema features over heavy plugins.",
    details: "Different platforms require unique SEO configurations. Learn to optimize WordPress with plugins and caching, manage Shopify category URLs, configure Webflow collections, and implement proper indexation setups for headless architectures.",
    checklistItems: createCourseItems(1021, [
      { title: "WordPress SEO Setup", desc: "Configure SEO plugins (Yoast, RankMath), optimize permalinks, and set up caching modules." },
      { title: "Shopify E-commerce SEO", desc: "Customize shopify templates, manage collection hierarchies, and optimize tag sitemaps." },
      { title: "Webflow SEO Configurations", desc: "Configure collection page SEO metadata, set up sitemaps, and manage custom 301 redirects." },
      { title: "Headless CMS & JS SEO", desc: "Optimize Next.js, React, or Vue setups, ensuring static page exports or server-side hydration for crawling." }
    ])
  },
  {
    id: 1022,
    title: "SEO for Different Industries",
    category: "seo-course",
    description: "Adapt your SEO strategies for specialized industries like SaaS (PLG model), E-commerce, YMYL niches (Legal/Medical), and News publishers.",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    businessImpact: "Applies targeted, high-ROI search blueprints tailored to your specific business model and regulatory landscape.",
    bestPractice: "For YMYL sites, include clear author bios, editorial review boards, and verified citations to satisfy strict E-E-A-T criteria.",
    details: "One size does not fit all. Learn about Product-Led Growth (PLG) for SaaS SEO, authority signals for Your Money or Your Life (YMYL) niches, local service area setups, and real-time news indexation in Google Discover.",
    checklistItems: createCourseItems(1022, [
      { title: "SaaS SEO Blueprint", desc: "Deploy Product-Led Growth (PLG) setups, build competitor comparison hubs, and optimize features guides." },
      { title: "YMYL (Your Money Your Life) SEO", desc: "Satisfy Google's strict medical/financial trust standards via doctor reviews, expert bios, and citations." },
      { title: "Local Service SEO", desc: "Optimize local landing pages, click-to-contact pathways, and review portfolios for home services." },
      { title: "Google News & Discover", desc: "Configure publishers platforms, optimize image sizes, set up real-time indexation, and track Google Discover traffic." }
    ])
  },
  {
    id: 1023,
    title: "SEO Tools Masterclass",
    category: "seo-course",
    description: "Learn to navigate industry-standard SEO toolsets including Search Console, SEMrush, Ahrefs, Screaming Frog, and PageSpeed Insights.",
    difficulty: "Beginner",
    estimatedMinutes: 50,
    businessImpact: "Saves hundreds of technical hours by utilizing tools to automate keyword discovery, backlink checks, and performance tracking.",
    bestPractice: "Configure daily rank tracking for high-priority commercial keywords to monitor algorithm fluctuations and competitor shifts.",
    details: "Tools provide the data for analysis. Learn to scrape data with Screaming Frog, evaluate keyword difficulty in Ahrefs or SEMrush, analyze user behavior in Clarity, and run loading diagnostics in PageSpeed Insights.",
    checklistItems: createCourseItems(1023, [
      { title: "Crawling with Screaming Frog", desc: "Master technical crawling configurations, HTML scraping, custom extraction rules, and XML sitemap testing." },
      { title: "Ahrefs & Semrush Mastery", desc: "Perform search term discovery, competitor backlink auditing, ranking analysis, and keyword difficulty tracking." },
      { title: "Microsoft Clarity Analytics", desc: "Identify user friction by reviewing session recordings, scroll depth heatmaps, and rage clicks." },
      { title: "PageSpeed Insights Diagnostics", desc: "Locate technical render bottlenecks, analyze lab vs field data, and implement optimization recommendations." }
    ])
  },
  {
    id: 1024,
    title: "SEO Case Studies",
    category: "seo-course",
    description: "Deconstruct real-world SEO case studies, analyze site migration recoveries, algorithm penalty responses, and global organic scaling.",
    difficulty: "Intermediate",
    estimatedMinutes: 55,
    businessImpact: "Equips you with proven blueprints to execute complex site migrations and recover from organic search traffic declines.",
    bestPractice: "Map all old URLs to new counterparts in a detailed 1-to-1 redirect sheet before initiating site migrations.",
    details: "Learn from real outcomes. This module analyzes successful site migrations, recoveries from Google core updates, e-commerce scale-ups, and international expansions.",
    checklistItems: createCourseItems(1024, [
      { title: "Site Migration Cases", desc: "Deconstruct how massive domains migrated directories, updated URLs, and preserved link equity and keyword rankings." },
      { title: "Google Algorithm Recoveries", desc: "Examine actual recoveries from major search updates: deconstruct how content pruning and formatting changes restored organic reach." },
      { title: "E-commerce & SaaS Scaling", desc: "Review real case studies of brands that scaled traffic through topic clusters and programmatics." }
    ])
  },
  {
    id: 1025,
    title: "Capstone Project",
    category: "seo-course",
    description: "Complete a comprehensive website audit, keyword clustering map, 90-day roadmap, schema layouts, and Looker reporting dashboard.",
    difficulty: "Expert",
    estimatedMinutes: 90,
    businessImpact: "Demonstrates your practical mastery of SEO by producing a professional-grade organic search strategy ready to present to stakeholders.",
    bestPractice: "Build your case study around real website data, creating practical deliverables that highlight technical, content, and reporting skills.",
    details: "The ultimate practical test. In this capstone project, you will perform a complete audit on a live website, draft a keyword clustering plan, design structural JSON-LD schemas, map a 90-day roadmap, and compile an executive report.",
    checklistItems: createCourseItems(1025, [
      { title: "Live Site Audit", desc: "Run a complete technical crawl on a real website, documenting indexing issues, redirect chains, and missing tags." },
      { title: "Keyword Clustering Plan", desc: "Map focus keyword groups to specific landing pages, defining search volume, search intent, and difficulty." },
      { title: "JSON-LD Schema Designs", desc: "Draft fully validated, customized JSON-LD scripts for Organization, Product, FAQ, or local business pages." },
      { title: "Looker Studio Setup", desc: "Integrate GSC and GA4 feeds into a custom, high-contrast, automated Looker Studio report." },
      { title: "SEO Roadmap Compilation", desc: "Compile all audit findings and plans into a clean, prioritized, step-by-step 90-day organic growth roadmap." }
    ])
  },
  {
    id: 1026,
    title: "Bonus Modules: SEO Business & Career",
    category: "seo-course",
    description: "Learn to onboard clients, draft monthly reporting agreements, set pricing models, build freelance workflows, and train internal teams.",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    businessImpact: "Enables freelancers, agencies, and in-house managers to commercialize their SEO skills and manage projects profitably.",
    bestPractice: "Always tie your SEO reports to high-level business goals (revenue and customer acquisitions) rather than pure search positions.",
    details: "The business side of SEO. Learn to draft client onboarding SOPs, price service contracts, write persuasive proposals, construct reporting agreements, and structure in-house teams or freelance agencies.",
    checklistItems: createCourseItems(1026, [
      { title: "Client Onboarding SOPs", desc: "Design structured client onboarding questionnaires, technical access checklists, and target keyword baseline reviews." },
      { title: "Pricing & Contract Scopes", desc: "Differentiate pricing models (monthly retainers, hourly rates, project rates) and draft clear scopes of work." },
      { title: "SEO Proposals & Contracts", desc: "Draft professional, persuasive SEO campaign proposals highlighting audits, deliverables, and trackable milestones." },
      { title: "Monthly SLA Reporting", desc: "Design high-contrast monthly reports that clearly match organic gains to client revenue and acquisition goals." },
      { title: "Team Building & Roles", desc: "Structure high-performing SEO teams, defining clear responsibilities for writers, tech managers, and link builders." }
    ])
  }
];

export const SEO_COURSE_TRACK: { id: string; title: string; description: string; colorClass: string; textColorClass: string; levelIds: number[] } = {
  id: "seo-course",
  title: "Complete SEO Course (2026 Edition)",
  description: "The complete, definitive 25-module masterclass from beginner principles to Generative Engine Optimization (GEO) and AI automation pipelines.",
  colorClass: "bg-neutral-900 border-neutral-900 text-white",
  textColorClass: "text-neutral-900",
  levelIds: SEO_COURSE_LEVELS.map(l => l.id)
};
