import { QuizQuestion } from "../types";

export const SEO_COURSE_QUIZZES: Record<number, QuizQuestion[]> = {
  1001: [
    {
      id: "seo-q1001-1",
      levelId: 1001,
      question: "Which component of E-E-A-T is considered the absolute core/foundation upon which all other letters rest, according to Google's Search Quality Rater Guidelines?",
      options: [
        "Experience (lived, hands-on involvement with the topic)",
        "Expertise (formal certifications, degrees, or academic records)",
        "Authoritativeness (reputation, mentions, and links from industry peers)",
        "Trustworthiness (honesty, safety, reliability, and lack of conflict of interest)"
      ],
      correctAnswerIndex: 3,
      explanation: "Google explicitly states in its Quality Rater Guidelines that Trust is the most critical member of the E-E-A-T family. Untrustworthy pages cannot rank well, regardless of how experienced, expert, or authoritative they appear."
    }
  ],
  1002: [
    {
      id: "seo-q1002-1",
      levelId: 1002,
      question: "What is the primary benefit of 'Keyword Clustering' compared to traditional single-keyword optimization strategies?",
      options: [
        "It reduces the size of your XML sitemap, making it easier for Googlebot to find files.",
        "It allows a single page to address multiple semantically related queries, matching search intent and avoiding keyword cannibalization.",
        "It guarantees that your page speed load metrics (Core Web Vitals) improve significantly.",
        "It automatically translates your target keywords into multiple languages for regional targeting."
      ],
      correctAnswerIndex: 1,
      explanation: "Keyword clustering groups keywords with similar search intent together. By targeting a cluster on a single page, you create an authoritative resource that answers the user's complete topic query, which prevents page cannibalization."
    }
  ],
  1003: [
    {
      id: "seo-q1003-1",
      levelId: 1003,
      question: "In a typical topic cluster framework, how should supportive spokes relate to the central pillar page via internal linking?",
      options: [
        "Spokes should only link to external sites, and never back to the pillar page.",
        "Both the pillar page and support spokes must link to each other to share equity and signal complete topical authority.",
        "Spokes should only link to the homepage to boost brand-level domain authority.",
        "Spokes must avoid internal links completely to maximize crawl budget efficiency."
      ],
      correctAnswerIndex: 1,
      explanation: "A healthy topic cluster depends on bi-directional linking. The pillar page links out to all supporting sub-articles (spokes), and every supporting spoke links back to the central pillar. This signals deep, structured topical authority to crawlers."
    }
  ],
  1004: [
    {
      id: "seo-q1004-1",
      levelId: 1004,
      question: "Which HTTP status code should be used when a page is permanently deleted and you have NO equivalent page to redirect users to?",
      options: [
        "301 (Moved Permanently)",
        "302 (Found / Temporary Redirect)",
        "404 (Not Found) or 410 (Gone)",
        "503 (Service Unavailable)"
      ],
      correctAnswerIndex: 2,
      explanation: "If a page is deleted permanently and has no logical replacement, returning a 404 (Not Found) or 410 (Gone) is the correct practice. Using 301 to redirect to the homepage can lead to soft-404 flags and waste crawl budget."
    }
  ],
  1005: [
    {
      id: "seo-q1005-1",
      levelId: 1005,
      question: "Which of the following is considered the absolute best practice for heading tags (H1-H6) hierarchy on a standard web page?",
      options: [
        "Use multiple H1 tags containing keywords to maximize crawl relevance scores.",
        "Use exactly one H1 tag matching the page title, followed by nested headings (H2, H3, H4) representing structural outlines.",
        "Avoid using headings completely and style all headings as bold paragraph text to improve rendering speed.",
        "Assign heading tags randomly based on visual font size preference."
      ],
      correctAnswerIndex: 1,
      explanation: "A webpage should have exactly one unique H1 tag representing the primary topic of the page. All subsequent sections should use H2, H3, etc., in a nested, logical order to describe content structure clearly to crawlers and screen readers."
    }
  ],
  1006: [
    {
      id: "seo-q1006-1",
      levelId: 1006,
      question: "What is 'Programmatic SEO' primarily used for?",
      options: [
        "Encrypting website database tables to prevent manual SEO scrapers from stealing files.",
        "Systematically generating thousands of highly localized or dataset-driven landing pages based on clean, dynamic templates.",
        "Automating cold email outreach campaigns using neural language processors.",
        "Rewriting CSS files dynamically to adapt to visitor browser configurations."
      ],
      correctAnswerIndex: 1,
      explanation: "Programmatic SEO involves generating database-driven landing pages at scale (e.g., localized landing pages like 'Plumber in [City]'). By building templated layouts with original data, you can capture high-intent search queries cleanly."
    }
  ],
  1007: [
    {
      id: "seo-q1007-1",
      levelId: 1007,
      question: "When auditing backlinks, what distinguishes an authoritative, valuable link from a potentially toxic or useless link?",
      options: [
        "The link is placed on a page that itself receives real, active organic search traffic and is highly relevant to your niche.",
        "The link uses exact-match keyword anchor texts across hundreds of web directories.",
        "The link is paid for via dynamic sponsorship banners on miscellaneous, multi-niche blog networks.",
        "The link has a nofollow tag and is placed on an unindexed, locked forum profile page."
      ],
      correctAnswerIndex: 0,
      explanation: "Real organic search traffic and topical relevance are the strongest indicators of backlink quality. A single contextual link from a trusted, high-traffic site inside your niche passes more authority than hundreds of spammy directory listings."
    }
  ],
  1008: [
    {
      id: "seo-q1008-1",
      levelId: 1008,
      question: "What is the primary ranking factor for localized map searches in the Google Map Pack?",
      options: [
        "The length of the business owner's responses on their Google Business Profile.",
        "Proximity of the searcher to the business location, combined with prominence (reviews/links) and category relevance.",
        "The quantity of social media followers linked to the local business profile.",
        "The hosting provider of the local business's website."
      ],
      correctAnswerIndex: 1,
      explanation: "Proximity, Prominence, and Relevance are Google's three official local ranking pillars. Proximity (how close the searcher is to your physical address) is highly influential and cannot be altered, making prominence and relevance your core focus areas."
    }
  ],
  1009: [
    {
      id: "seo-q1009-1",
      levelId: 1009,
      question: "How should e-commerce websites configure faceted navigation (product filtering URLs) to prevent index bloat?",
      options: [
        "Allow search engines to crawl and index all possible filter combination URLs.",
        "Set self-referential canonical tags on filtering URLs or block crawler access via robots.txt and GSC parameter controls.",
        "Redirect all product filtering pages to the homepage via temporary 302 redirects.",
        "Disable product filtering completely on the frontend to protect crawl budget."
      ],
      correctAnswerIndex: 1,
      explanation: "Faceted navigation can generate millions of thin, duplicate URLs (e.g., combinations of size, color, price). Standard practice is to block crawlers from indexing these parameters using canonical tags, robots directives, or crawl settings."
    }
  ],
  1010: [
    {
      id: "seo-q1010-1",
      levelId: 1010,
      question: "In Enterprise SEO, which practice is essential for maintaining site indexation health across large sites?",
      options: [
        "Having writers manually check every single link daily inside Google Search Console.",
        "Automating technical regression checks on deployments to catch broken canonical tags, redirects, and rendering bugs before release.",
        "Using a flat file system with only one single directory structure for all products, blogs, and legal documents.",
        "Banning search crawlers from accessing the site on weekends to save server resources."
      ],
      correctAnswerIndex: 1,
      explanation: "Large websites are prone to structural breaks during routine code updates. Automated technical QA testing integrated into delivery pipelines prevents catastrophic breaks, protecting millions of indexed URLs."
    }
  ],
  1011: [
    {
      id: "seo-q1011-1",
      levelId: 1011,
      question: "Which of the following is the modern, search-engine-recommended format for delivering structured schema data to pages?",
      options: [
        "Inline Microdata (adding attributes directly to HTML elements)",
        "JSON-LD (JavaScript Object Notation for Linked Data) placed inside a clean script block",
        "XML metadata nodes appended to the footer of sitemaps",
        "Raw JSON text strings displayed visually on contact pages"
      ],
      correctAnswerIndex: 1,
      explanation: "Google and Schema.org officially recommend JSON-LD for structured data. It isolates the schema markup from user-facing HTML layouts, making it easier to maintain, validate, and parse."
    }
  ],
  1012: [
    {
      id: "seo-q1012-1",
      levelId: 1012,
      question: "What is the core focus of 'Search Everywhere Optimization' (SXO) in 2026?",
      options: [
        "Paying search engines to display your brand logo across all local maps apps.",
        "Optimizing a brand's discoverability and citations across diverse search platforms (YouTube, Reddit, Amazon, Pinterest) where users actively seek answers.",
        "Translating websites into every known international language to maximize raw domain metrics.",
        "Forcing desktop-only screen layouts across all mobile search listings."
      ],
      correctAnswerIndex: 1,
      explanation: "Search has fragmented. Modern users search for products on Amazon, reviews on Reddit, guides on YouTube, and ideas on TikTok. SXO is about optimizing your brand footprint across all of these databases."
    }
  ],
  1013: [
    {
      id: "seo-q1013-1",
      levelId: 1013,
      question: "How can websites optimize their content to win citations in Generative AI Search Platforms (e.g., ChatGPT Search, Perplexity, Gemini)?",
      options: [
        "By writing massive walls of text containing thousands of variations of target keywords.",
        "By publishing original, authoritative, and fact-focused data structured as lists, tables, or direct bullet points that RAG crawlers can easily parse and reference.",
        "By blocking all AI crawlers using robots.txt rules while duplicating competitor articles.",
        "By hiding structured data from visual web interfaces so only bots can read it."
      ],
      correctAnswerIndex: 1,
      explanation: "Retrieval-Augmented Generation (RAG) models rely on precision, facts, and structure. Providing clear tables, bold definitions, structured summaries, and verified research makes it easy for AI engines to extract your content and cite you as the source."
    }
  ],
  1014: [
    {
      id: "seo-q1014-1",
      levelId: 1014,
      question: "What is a 'Zero-Click Search' and how should an SEO adapt to it?",
      options: [
        "A search query that has zero monthly search volume, requiring you to delete supporting pages.",
        "A search where the user gets their answer directly on the search results page (via snippets/AI answers) without clicking any link, requiring SEOs to write deep, structured, high-value content that encourages deeper reading.",
        "A broken search query that leads to server error response codes.",
        "A search performed entirely on voice-activated home speakers."
      ],
      correctAnswerIndex: 1,
      explanation: "In zero-click searches, Google or AI models answer queries directly on the page. To win, SEOs must optimize for featured snippets and structured blocks, and ensure their articles offer deeper context, original data, or templates that require clicking through."
    }
  ],
  1015: [
    {
      id: "seo-q1015-1",
      levelId: 1015,
      question: "When deploying LLMs or AI scripts for SEO automation, what is a crucial safety best practice?",
      options: [
        "Allowing the AI script to automatically publish hundreds of generated content drafts daily without human oversight.",
        "Always reviewing AI-generated text, schemas, redirects, or code scripts with a senior human SEO before deployment to maintain quality, safety, and brand alignment.",
        "Keeping all generated sitemaps locked from crawl access to save indexing costs.",
        "Avoiding AI-assisted tasks entirely to prevent search engines from index-banning your domain."
      ],
      correctAnswerIndex: 1,
      explanation: "While AI and automation are incredibly powerful for clustering and drafting, they are prone to hallucinations or thin outputs. Human-in-the-loop validation ensures all content is accurate, helpful, and compliant with E-E-A-T guidelines."
    }
  ],
  1016: [
    {
      id: "seo-q1016-1",
      levelId: 1016,
      question: "What does Cumulative Layout Shift (CLS) measure, and how do you optimize it?",
      options: [
        "It measures the visual stability of a page by tracking unexpected layout shifts during loading. You optimize it by specifying exact dimensions (width/height) on images and dynamic containers.",
        "It measures how long the server takes to respond to a user request. You optimize it by minifying JavaScript.",
        "It measures the total rendering delay after user interaction. You optimize it by compressing images.",
        "It measures the crawl duration of search engine spiders. You optimize it by cleaning XML sitemaps."
      ],
      correctAnswerIndex: 0,
      explanation: "CLS measures unexpected layout jumps (e.g., text shifting as an ad or image loads). By declaring exact dimensions or aspect ratios on media elements, the browser reserves the correct space, preventing shifting."
    }
  ],
  1017: [
    {
      id: "seo-q1017-1",
      levelId: 1017,
      question: "What is Google's 'Mobile-First Indexing'?",
      options: [
        "Google indexes mobile-friendly websites first, while banning desktop-only websites from search results.",
        "Google uses the mobile version of a website's content, markup, and structure to index and rank the entire site.",
        "Google only indexes websites when crawled using mobile phone networks.",
        "Google penalizes websites that use responsive design layouts instead of separate mobile subdomains."
      ],
      correctAnswerIndex: 1,
      explanation: "Mobile-First Indexing means Google predominantly crawls and indexes your pages using its mobile smartphone agent. The content, internal links, and structured data on your mobile view are what Google uses to evaluate your entire site's rankings."
    }
  ],
  1018: [
    {
      id: "seo-q1018-1",
      levelId: 1018,
      question: "Which of the following describes a common hreflang implementation mistake that can hurt international SEO?",
      options: [
        "Deploying self-referential hreflang tags on regional variations.",
        "Using relative URLs instead of absolute URLs, or failing to establish reciprocal, bi-directional linking between language copies.",
        "Configuring an 'x-default' tag for users in unmatched regions.",
        "Submitting hreflang details inside dynamic XML sitemaps."
      ],
      correctAnswerIndex: 1,
      explanation: "Hreflang tags must be reciprocal. If Page A (English) points to Page B (Spanish) as its alternate, Page B MUST point back to Page A. Failing to do so breaks the relationship, causing search engines to ignore the tags."
    }
  ],
  1019: [
    {
      id: "seo-q1019-1",
      levelId: 1019,
      question: "How does Google Analytics 4 (GA4) measure user sessions differently than Universal Analytics?",
      options: [
        "GA4 measures pageviews exclusively, ignoring user scrolling and clicks.",
        "GA4 is built entirely on an event-driven data model, tracking user interactions as custom, detailed events instead of rigid pageview-based sessions.",
        "GA4 requires third-party cookie trackers to measure organic search entries.",
        "GA4 only tracks users who arrive on your site via Google Search."
      ],
      correctAnswerIndex: 1,
      explanation: "GA4 is event-based. Every interaction (click, scroll, file download, form submit, pageview) is tracked as an event. This provides a unified model of how organic searchers engage with your site across different sessions."
    }
  ],
  1020: [
    {
      id: "seo-q1020-1",
      levelId: 1020,
      question: "What is 'Content Pruning' inside an SEO audit?",
      options: [
        "Adding as many keywords as possible to short blog summaries to boost density metrics.",
        "Systematically identifying, deleting, consolidating, or redirecting thin, out-of-date, or duplicate pages to concentrate search relevance and authority on your best URLs.",
        "Changing all outbound links on your site to point to Wikipedia references.",
        "Hiding content text blocks behind interactive accordion tabs to bypass crawl budget allocations."
      ],
      correctAnswerIndex: 1,
      explanation: "Content pruning is like pruning a tree: by removing dead, low-value, or duplicate branches, you allow the healthy sections to grow. Pruning thin URLs consolidates authority onto core assets and improves overall site quality."
    }
  ],
  1021: [
    {
      id: "seo-q1021-1",
      levelId: 1021,
      question: "What is a major SEO challenge when using a pure Client-Side Rendered (CSR) Headless Javascript CMS?",
      options: [
        "It forces you to use WordPress plugins for schema markup.",
        "Search spiders may crawl the blank, initial HTML shell and fail to execute or index the dynamic content loaded via JavaScript.",
        "It requires absolute URLs for all internal links.",
        "It disables robots.txt file configurations entirely."
      ],
      correctAnswerIndex: 1,
      explanation: "Client-Side Rendered JS sites require the browser (or search bot) to execute JS before viewing content. Since rendering can be delayed, bots may miss your text. Implementing Server-Side Rendering (SSR) or Static Site Generation (SSG) resolves this."
    }
  ],
  1022: [
    {
      id: "seo-q1022-1",
      levelId: 1022,
      question: "For a 'Your Money or Your Life' (YMYL) healthcare or legal website, which E-E-A-T element is a non-negotiable requirement to maintain rankings?",
      options: [
        "Having a high quantity of guest-posts on unrelated local news sites.",
        "Displaying verified author expert bios, scientific/legal citations, and establishing an editorial review board of certified professionals.",
        "Having a dark-mode theme enabled on your contact pages.",
        "Ensuring your keyword density matches exact-match competitor counts."
      ],
      correctAnswerIndex: 1,
      explanation: "YMYL sites are held to extreme trust standards because their content directly impacts user health, finances, or safety. Having qualified expert bios, scientific references, and visible professional reviews establishes the necessary trustworthiness (E-E-A-T)."
    }
  ],
  1023: [
    {
      id: "seo-q1023-1",
      levelId: 1023,
      question: "What is 'Screaming Frog' primarily used for in an SEO audit?",
      options: [
        "Generating automated social media posts to boost citation signals.",
        "Crawling a website to gather technical data on sitemaps, response codes, redirect paths, canonical tags, and page speed.",
        "Designing custom JSON-LD schemas using visual drag-and-drop elements.",
        "Checking keyword difficulty rankings on regional search engines."
      ],
      correctAnswerIndex: 1,
      explanation: "Screaming Frog is an industry-standard desktop website crawler. It mimics search spiders to scan site directories and catalog technical metadata, canonical rules, redirect paths, and structural crawl blocks."
    }
  ],
  1024: [
    {
      id: "seo-q1024-1",
      levelId: 1024,
      question: "When managing a massive website migration or domain rename, what is the most critical technical task?",
      options: [
        "Changing your social media handles first.",
        "Configuring a comprehensive, exact 1-to-1 301-redirect mapping from every single old URL to its corresponding new URL.",
        "Resetting your Google Analytics tracking tag IDs.",
        "Deleting all older content pages to speed up sitemap processing."
      ],
      correctAnswerIndex: 1,
      explanation: "A migration without clean redirections can decimate organic search visibility. A meticulously mapped 1-to-1 redirect sheet ensures search spiders and users are cleanly forwarded from old paths to new counterparts, transferring link equity safely."
    }
  ],
  1025: [
    {
      id: "seo-q1025-1",
      levelId: 1025,
      question: "What is the primary purpose of an SEO capstone roadmap?",
      options: [
        "Displaying daily server logs to corporate team members.",
        "Translating complex technical and audit findings into a prioritized, clear, step-by-step 90-day operational execution plan for stakeholders and developers.",
        "Creating thousands of automated drafts using AI prompting networks.",
        "Bypassing Google's helpful content algorithms via cloaking links."
      ],
      correctAnswerIndex: 1,
      explanation: "An SEO audit is useless without execution. A capstone roadmap translates crawl audits and plans into prioritized, actionable developer tasks and editorial calendars, ensuring clear steps towards business objectives."
    }
  ],
  1026: [
    {
      id: "seo-q1026-1",
      levelId: 1026,
      question: "When reporting organic search performance to a corporate client or internal executive, what metrics should be prioritized first?",
      options: [
        "Raw backlink quantity counts and keyword density scores.",
        "Business-level outcomes like organic conversions, customer acquisitions, organic revenue, and GSC search impressions/clicks trends.",
        "The absolute loading speeds of minor legal footer links.",
        "The social media shares of supporting informational spoke pages."
      ],
      correctAnswerIndex: 1,
      explanation: "Executives care about business impact. While rankings and backlink counts are helpful leading indicators, prioritizing organic conversions, leads, acquisition volumes, and organic revenue proves SEO's direct ROI and business value."
    }
  ]
};
