export interface Lesson {
  id: string;
  number: number;
  title: string;
  goal: string;
  content: string;
  interactiveQuiz?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface PracticalActivity {
  id: string;
  title: string;
  description: string;
  steps: string[];
  deliverable: string;
}

export interface MiniProject {
  title: string;
  description: string;
  prompt: string;
  guidelines: string[];
}

export const SEO_FUNDAMENTALS_LESSONS: Lesson[] = [
  {
    id: "seo-f-1",
    number: 1,
    title: "What is SEO?",
    goal: "Understand the meaning and purpose of Search Engine Optimization.",
    content: `
### What is SEO?

SEO stands for **Search Engine Optimization**.

It is the strategic process of improving a website's design, content, and performance so it appears higher and more frequently in Google and other search engine results.

The better your SEO, the easier people can find your website when searching for your products, services, or expertise.

---

### 💡 Example Scenario

Imagine you own a cozy local bakery in New York.

Someone nearby pulls out their phone and searches:

> **"Best Bakery Near Me"** or **"buy fresh croissants NY"**

If your website is optimized for SEO and appears on the first page, you are extremely likely to get a flood of new customers. If it appears on page 4, those customers will go to your competitors.

---

### 🔑 Remember

SEO is a long-term strategy that helps people find your website **naturally (organically)** without you having to pay search engines for every single click.
    `,
    interactiveQuiz: {
      question: "What does SEO stand for?",
      options: [
        "Search Engine Optimization",
        "Search Easy Online",
        "Search Engine Operation"
      ],
      correctAnswerIndex: 0,
      explanation: "SEO stands for Search Engine Optimization, which is the practice of optimizing web content to rank naturally in organic search results."
    }
  },
  {
    id: "seo-f-2",
    number: 2,
    title: "Why is SEO Important?",
    goal: "Learn why modern businesses invest heavily in organic search marketing.",
    content: `
### Why is SEO Important?

Every single day, billions of search queries are performed on Google. People are actively searching for solutions, products, services, and educational answers.

If your website appears at the very top of those search results, you capture high-intent, targeted visitors at the precise moment they are looking for what you offer.

---

### 🌐 Real-World Examples
Think about what happens when you search for:
* *“Best Laptop for Coding”*
* *“Digital Marketing Agency near me”*
* *“Hair Salon reviews”*

The businesses that rank in the top positions receive the vast majority of visitors, clicks, and trust.

---

### ✨ Core Benefits of SEO

1. **More Traffic:** Ranking higher leads to more clicks and visits.
2. **High-Value Leads:** Visitors are searching for your exact topic, meaning they are already interested.
3. **Better Trust & Credibility:** Searchers naturally trust websites that Google places on the first page.
4. **Cost-Effective ROI:** Unlike paid ads, organic traffic continues to flow even after you stop active optimization.
    `,
    interactiveQuiz: {
      question: "Which of the following is a primary benefit of SEO over paid advertising?",
      options: [
        "SEO traffic stops immediately when your budget runs out.",
        "SEO traffic is sustainable and doesn't require paying for every click.",
        "SEO guarantees 100% conversion rates."
      ],
      correctAnswerIndex: 1,
      explanation: "Unlike paid ads (where clicks stop when budget ends), SEO continues to deliver organic search visitors long-term without per-click fees."
    }
  },
  {
    id: "seo-f-3",
    number: 3,
    title: "Organic vs Paid Search",
    goal: "Distinguish between free, natural listings and paid advertisement listings on search engines.",
    content: `
### Organic vs Paid Search

When you perform a Google search, the results page (SERP) is divided into two primary categories:

---

### 💰 Paid Results (Search Engine Marketing - SEM)
* **What are they?:** Advertisements that businesses pay to display at the very top or bottom of search listings.
* **Cost:** Every time a user clicks on a paid listing, the business pays Google a fee (known as Pay-Per-Click or PPC).
* **Sustainability:** Once the business stops paying or runs out of budget, the ads disappear instantly.

---

### 🌿 Organic Results (Search Engine Optimization - SEO)
* **What are they?:** Natural search listings that Google ranks based purely on quality, authority, and relevance to the search query.
* **Cost:** Free! You do not pay Google anything when someone clicks on your organic search results.
* **Sustainability:** Organic rankings are highly durable, building authority over time and delivering steady, compounding traffic.
    `,
    interactiveQuiz: {
      question: "What happens to your paid search listings (PPC ads) when your ad budget runs out?",
      options: [
        "They remain in organic search results.",
        "They disappear from the search page instantly.",
        "Google leaves them up for free for 30 days."
      ],
      correctAnswerIndex: 1,
      explanation: "Paid search listings are tied directly to active budgets; they disappear the moment funding or advertising campaigns end."
    }
  },
  {
    id: "seo-f-4",
    number: 4,
    title: "History of Search Engines",
    goal: "Understand the evolutionary timeline of search and why Google became the dominant player.",
    content: `
### History of Search Engines

Search engines didn't always use advanced machine learning and AI. In the early days of the web, finding information was a challenge.

---

### 📅 The Evolution Timeline

* **1990 — Archie:** The first search tool, which simply indexed a directory of downloadable files.
* **1994 — Yahoo:** Began as a web directory curated manually by human editors.
* **1995 — AltaVista:** The first search engine that allowed full-text searches and crawled pages dynamically.
* **1998 — Google:** Co-founded by Larry Page and Sergey Brin. Google revolutionized search by introducing **PageRank**, evaluating backlinks to determine website authority.
* **2009 — Bing:** Launched by Microsoft as a major competitor to Google.
* **Present Day — AI Search:** Search results now blend semantic indexes, NLP models, and real-time AI generation.

---

### 💡 Fun Fact
Google became the world's most popular search engine because it went beyond simple keyword matching; it measured *trust and relationships* between web pages.
    `,
    interactiveQuiz: {
      question: "Why did Google outperform early search engines in the late 1990s?",
      options: [
        "Google was the first directory curated by human editors.",
        "Google introduced PageRank to rank web pages based on links and authority, not just keywords.",
        "Google offered free physical books with every search."
      ],
      correctAnswerIndex: 1,
      explanation: "Google's PageRank algorithm used backlink profiles as trust votes, making search results infinitely more relevant than competitor keyword-matching directories."
    }
  },
  {
    id: "seo-f-5",
    number: 5,
    title: "How Search Engines Work",
    goal: "Learn the high-level technical process of how search engines discover, store, and rank pages.",
    content: `
### How Search Engines Work

To serve search results in less than a second, search engines must constantly complete a highly complex, multi-stage pipeline:

  [Webpages] ➔ 1. Crawl (Googlebot) ➔ 2. Index (Database) ➔ 3. Rank (Algorithms) ➔ 4. Show (SERP)

---

### 📚 The Librarian Analogy

Imagine search engines as a master librarian:

1. **Discover & Read:** The librarian travels the world, buying and reading every book in existence (Crawling).
2. **Organize:** The librarian catalogs and files every book in a massive, structured database (Indexing).
3. **Recommend:** When someone enters the library and asks a question, the librarian instantly pulls out the single most helpful and authoritative book to answer their question (Ranking).
    `,
    interactiveQuiz: {
      question: "Which of the following describes the correct order of a search engine's primary functions?",
      options: [
        "Ranking ➔ Indexing ➔ Crawling",
        "Crawling ➔ Indexing ➔ Ranking",
        "Indexing ➔ Crawling ➔ Ranking"
      ],
      correctAnswerIndex: 1,
      explanation: "Search engines first discover and crawl pages, then index (store) them, and finally rank them when a user submits a search query."
    }
  },
  {
    id: "seo-f-6",
    number: 6,
    title: "Crawling",
    goal: "Master the technical details of web crawling and the role of Googlebot.",
    content: `
### What is Crawling?

**Crawling** is the initial discovery process where search engines send out automated software bots to scan and analyze websites.

---

### 🤖 Meet Googlebot
Google's primary crawler is called **Googlebot**. It works like this:

1. **Starts with list of URLs:** It begins with a list of known web pages from previous crawls and sitemaps.
2. **Discovers links:** As Googlebot reads a page, it finds links to other pages.
3. **Follows paths:** It follows those links to discover new webpages, files, and assets.

---

### 🗺️ The Explorer Analogy
Think of Googlebot as a tourist exploring a new city. It starts at a popular landmark, walks down street links, and records every new shop, house, and road it sees.
    `,
    interactiveQuiz: {
      question: "What is Googlebot?",
      options: [
        "A premium browser extensions for SEO audit work.",
        "Google's automated crawler software that scans and discovers webpages.",
        "A chatbot that answers user search queries."
      ],
      correctAnswerIndex: 1,
      explanation: "Googlebot is the official web crawler software utilized by Google to automatically discover, read, and follow links on websites."
    }
  },
  {
    id: "seo-f-7",
    number: 7,
    title: "Indexing",
    goal: "Understand how search engines parse and store web data in their index.",
    content: `
### What is Indexing?

Once a crawler visits a webpage, it sends the page's code, text, images, and structure back to Google. Google analyzes this data and stores it in its massive database, known as the **Search Index**.

---

### ⚠️ The Golden Rule of Indexation

> **"If your website is not in Google's index, it does not exist in search results."**

Even if your website is beautiful and fast, users will never find it in Google searches unless it has been successfully crawled and indexed.

---

### 📝 Key Indexing Checkpoints

* **Robots directives:** Google respects instructions like \`noindex\`, which tells it *not* to store a page.
* **Render parsing:** Google parses the HTML and executes CSS/JavaScript to understand how the page looks to a real visitor.
* **Content extraction:** Google extracts text, keywords, headers, and schemas to catalog the page's topic.
    `,
    interactiveQuiz: {
      question: "What is Google's search index?",
      options: [
        "A premium analytical tool that measures site loading speeds.",
        "A massive database containing crawled webpages that Google can serve to searchers.",
        "An list of blocklisted websites that cannot rank."
      ],
      correctAnswerIndex: 1,
      explanation: "The Google Search Index is the massive, optimized library of crawled webpages that Google uses to immediately fetch and rank search results."
    }
  },
  {
    id: "seo-f-8",
    number: 8,
    title: "Ranking",
    goal: "Learn how search engine algorithms evaluate ranking signals to order search results.",
    content: `
### What is Ranking?

When a user performs a search, Google must decide which index records are most relevant. Google's algorithm sorts through billions of pages to display the most helpful ones first.

---

### 📊 Key Algorithmic Ranking Signals

Google uses over **200+ ranking signals** to determine positions, broadly categorized into:

* **Content Quality & Depth:** Does this page answer the user's search query fully and accurately?
* **User Experience & Speed:** Does the site load fast, and is it secure (HTTPS)?
* **Mobile-Friendliness:** Does the page render beautifully and behave cleanly on mobile phones?
* **Authority (Backlinks):** Do other trusted websites link back to this page as a reference?
* **Relevance:** Does the page's title, headers, and text match the searcher's intent?
    `,
    interactiveQuiz: {
      question: "Which of the following represents a key Google ranking signal?",
      options: [
        "The price of the domain name.",
        "Website loading speed and mobile-friendliness.",
        "The number of images on the contact page."
      ],
      correctAnswerIndex: 1,
      explanation: "Site performance (speed/Core Web Vitals) and mobile-friendliness are official Google ranking signals focused on user experience."
    }
  },
  {
    id: "seo-f-9",
    number: 9,
    title: "Search Engine Results Page (SERP)",
    goal: "Analyze the components of a modern, visual Google search results layout.",
    content: `
### The Modern SERP Layout

A **SERP (Search Engine Results Page)** is no longer just a list of ten blue links. Modern search results are highly interactive, visual, and AI-driven.

---

### 🧩 Common SERP Features

1. **AI Overview:** Summaries generated by AI models at the top, synthesizing answers from multiple search sources.
2. **Paid Ads:** Clearly labeled promotional links targeting high-intent commercial keywords.
3. **Featured Snippets:** Direct definition boxes, lists, or tables pulled from websites to answer queries immediately.
4. **Local Map Pack:** Maps and listings displaying nearby businesses for regional searches.
5. **People Also Ask (PAA):** Dynamic accordion blocks showing questions related to the search query.
6. **Organic Results:** Classic list of title tags, URLs, and meta description snippets.
    `,
    interactiveQuiz: {
      question: "What is a 'Featured Snippet' on a SERP?",
      options: [
        "A premium text ad placed by digital agencies.",
        "A block containing direct definitions, lists, or tables from a webpage displayed at the top of results.",
        "A list of related videos hosted exclusively on YouTube."
      ],
      correctAnswerIndex: 1,
      explanation: "Featured Snippets are organic answer boxes that Google extracts from helpful websites to answer queries directly on the SERP."
    }
  },
  {
    id: "seo-f-10",
    number: 10,
    title: "Types of SEO",
    goal: "Understand the different pillars and specializations within SEO.",
    content: `
### The 5 Core Pillars of SEO

SEO is a multi-disciplinary field. To rank successfully, you must address multiple categories of optimization:

---

### 1. 📝 On-Page SEO
Optimizing the user-facing content and HTML elements of a specific webpage (e.g., titles, headers, text, images, internal links).

### 2. ⚙️ Technical SEO
Improving the underlying website infrastructure so search engines can easily crawl, render, and index your site (e.g., page speed, SSL, XML sitemaps, javascript handling).

### 3. 🔗 Off-Page SEO
Activities performed *outside* of your website to build trust, authority, and brand awareness (e.g., securing backlinks, digital PR, brand mentions).

### 4. 📍 Local SEO
Optimizing your presence for geographic, brick-and-mortar searches (e.g., managing a Google Business Profile, local citations, map optimization).

### 5. 🛒 Ecommerce SEO
Specialized optimization for online store environments (e.g., product page structured schema, category page structures, handling out-of-stock items).
    `,
    interactiveQuiz: {
      question: "If you are focusing on improving website speed and sitemaps, which type of SEO are you practicing?",
      options: [
        "On-Page SEO",
        "Technical SEO",
        "Off-Page SEO"
      ],
      correctAnswerIndex: 1,
      explanation: "Speed optimization, server response auditing, and XML sitemaps fall squarely under the category of Technical SEO."
    }
  },
  {
    id: "seo-f-11",
    number: 11,
    title: "On-Page SEO",
    goal: "Learn how to optimize individual webpage components for search engines and users.",
    content: `
### Core Elements of On-Page SEO

On-Page SEO involves matching your page's visible and structural elements to search intent:

---

### 🔑 Critical On-Page Checklist Items

* **Title Tag:** The main clickable headline in search results. It should contain your primary keyword near the beginning.
* **Meta Description:** A short summary (under 155 characters) beneath the title. It should describe the page and encourage clicks.
* **H1 Header:** The main heading visible on the page. It should be unique and match the search topic.
* **Body Content:** High-quality, original, and well-structured text using headings (H2, H3) and bulleted lists.
* **Image Alt Text:** Text descriptions added to images to help search crawlers and visually impaired users understand their content.
* **Internal Links:** Linking to other relevant pages on your own website to share page authority.
    `,
    interactiveQuiz: {
      question: "Where should you ideally place your primary target keyword in On-Page optimization?",
      options: [
        "In a tiny, hidden font at the bottom of your footer.",
        "Near the beginning of the Title Tag and in the H1 header.",
        "Repeated 50 times in a single paragraph block."
      ],
      correctAnswerIndex: 1,
      explanation: "Placing your main target keyword near the start of your Title Tag and in your H1 header strongly signals relevance to search crawlers."
    }
  },
  {
    id: "seo-f-12",
    number: 12,
    title: "Technical SEO",
    goal: "Examine key technical requirements for clean search engine access.",
    content: `
### The Technical SEO Checklist

Technical SEO ensures that search crawlers can read your site without encountering errors or delays:

---

* **⚡ Mobile-Friendliness:** Websites must render beautifully and run smoothly on smartphones.
* **🔒 Secure Connections (HTTPS):** Encryption (via SSL certificates) is an official Google ranking signal.
* **⚡ Speed & Core Web Vitals:** Pages must load in under 2.5 seconds to prevent visitors from bouncing.
* **🗺️ XML Sitemap:** A clean, automated list of your active pages that helps search engines locate and crawl them.
* **🚫 Robots.txt:** A file that instructs search spiders which sections of your site to crawl and which to ignore.
    `,
    interactiveQuiz: {
      question: "Which file is used to tell Googlebot which directories on your site should NOT be crawled?",
      options: [
        "sitemap.xml",
        "robots.txt",
        "index.html"
      ],
      correctAnswerIndex: 1,
      explanation: "The robots.txt file is specifically configured to define crawl permissions and exclusions for automated search engines."
    }
  },
  {
    id: "seo-f-13",
    number: 13,
    title: "Off-Page SEO",
    goal: "Explore link-building and digital PR strategies to establish domain authority.",
    content: `
### Understanding Off-Page SEO

Off-Page SEO focuses on building your website's **authority, trust, and reputation** across the broader web.

---

### 🔗 The Power of Backlinks
The most critical asset in Off-Page SEO is the **Backlink** (a link from another website to yours).

Google views backlinks as *trust votes*. If an authoritative website links to your guide, it signals to Google that your content is trustworthy and valuable.

---

### 📈 Effective Off-Page Strategies

* **Digital PR:** Creating newsworthy stories or research data that major news outlets want to cover and link to.
* **Guest Publishing:** Writing high-quality articles for leading blogs in your industry that link back to your resource.
* **Brand Mentions:** Building brand reputation so people actively search for your brand name on Google.
    `,
    interactiveQuiz: {
      question: "How does Google view a backlink from a highly trusted, industry-relevant website?",
      options: [
        "As a toxic signal that will hurt rankings.",
        "As a vote of confidence that boosts your site's authority.",
        "As a duplicate content violation."
      ],
      correctAnswerIndex: 1,
      explanation: "A high-quality contextual backlink from an authoritative site is a strong trust vote, which can improve your organic rankings."
    }
  },
  {
    id: "seo-f-14",
    number: 14,
    title: "Local SEO",
    goal: "Learn how to optimize businesses for nearby, geography-specific search queries.",
    content: `
### What is Local SEO?

Local SEO helps physical storefronts and regional service providers (e.g., plumbers, lawyers, dental clinics) appear for nearby searches.

---

### 🗺️ The Google Map Pack
When people search for local services (e.g., *“coffee near me”*), Google displays a map alongside three local business listings, known as the **Map Pack**.

---

### 🎯 Key Local SEO Tactics

1. **Google Business Profile (GBP):** Claiming and updating your free business profile with contact info, hours, and photos.
2. **Customer Reviews:** Actively gathering positive, genuine reviews from clients on your Google profile.
3. **Local Citations:** Ensuring your business Name, Address, and Phone number (NAP) are identical across local directories.
    `,
    interactiveQuiz: {
      question: "Which of the following is most critical for appearing in Google Map Pack results?",
      options: [
        "An active, fully optimized Google Business Profile with positive customer reviews.",
        "Displaying banner ads on regional news sites.",
        "Changing your business's physical address every month."
      ],
      correctAnswerIndex: 0,
      explanation: "A fully optimized, verified Google Business Profile combined with active reviews is the most important factor in local map rankings."
    }
  },
  {
    id: "seo-f-15",
    number: 15,
    title: "White Hat SEO",
    goal: "Identify safe, long-term, and Google-compliant optimization techniques.",
    content: `
### What is White Hat SEO?

**White Hat SEO** refers to optimization practices that align with search engine guidelines and focus on delivering genuine value to human users.

---

### 😇 Key White Hat Characteristics

* **User-Focused:** You write content to help, educate, or entertain real people, not just search bots.
* **High-Quality Content:** Crafting comprehensive resources, original research, and useful data.
* **Clean Performance:** Building fast, safe (HTTPS), and easy-to-use websites.
* **Natural Link Building:** Securing backlinks because people genuinely want to share and reference your content.

---

### 🛡️ Why it Matters
White hat strategies take effort and time, but they build sustainable organic traffic that is safe from algorithm penalties.
    `,
    interactiveQuiz: {
      question: "Which of the following represents a classic White Hat SEO technique?",
      options: [
        "Creating high-quality, original content that solves a searcher's problem.",
        "Hiding keywords inside your background in white text.",
        "Buying hundreds of cheap links from spammy forums."
      ],
      correctAnswerIndex: 0,
      explanation: "Focusing on helpful, high-quality content that satisfies user intent is the core foundation of ethical White Hat SEO."
    }
  },
  {
    id: "seo-f-16",
    number: 16,
    title: "Black Hat SEO",
    goal: "Identify high-risk, manipulative, and unethical SEO techniques to avoid.",
    content: `
### What is Black Hat SEO?

**Black Hat SEO** refers to manipulative techniques used to trick search engine algorithms into giving a webpage higher rankings than it deserves.

---

### 🚫 Common Black Hat Tactics to Avoid

* **Keyword Stuffing:** Forcing keywords into your content repeatedly in an unnatural way (e.g., *"We sell best bakery bread NY best bakery bread NY..."*).
* **Hidden Text:** Placing keywords in white text on a white background so only search bots can read them, while human visitors cannot see them.
* **Link Buying:** Paying websites to link back to your site to artificially boost your search authority.
* **Cloaking:** Showing one version of a webpage to search bots and a completely different version to human visitors.

---

### ⚠️ Google Penalties
Google uses sophisticated filters and manual review teams to detect black hat practices. If caught, Google may penalize your site, causing your organic search rankings to plunge.
    `,
    interactiveQuiz: {
      question: "What is 'Keyword Stuffing'?",
      options: [
        "Grouping semantically related topics on a single pillar page.",
        "Repeating focus keywords unnaturally throughout content to manipulate rankings.",
        "Adding image descriptions for visually impaired users."
      ],
      correctAnswerIndex: 1,
      explanation: "Keyword stuffing is the spammy practice of cramming target terms into text unnaturally to manipulate search rankings."
    }
  },
  {
    id: "seo-f-17",
    number: 17,
    title: "Google Algorithm",
    goal: "Learn how search algorithms evaluate content quality, trust, and relevance.",
    content: `
### What is a Search Algorithm?

Google's search engine relies on a complex network of computer algorithms to evaluate crawled web pages and determine rankings.

---

### 🧠 How Google Evaluates Content

Google's core algorithm doesn't just look for keyword matches. It evaluates complex signals:

* **Query Meaning:** Understanding synonyms, natural language, and search intent.
* **Page Relevance:** Determining if a page's content actively answers the query.
* **Content Quality:** Analyzing depth of information, clarity of structure, and originality.
* **Usability & Security:** Confirming the site is fast, easy to navigate, and secure (HTTPS).
* **Context:** Factoring in the searcher's location, language settings, and past searches.
    `,
    interactiveQuiz: {
      question: "How does Google's modern search algorithm evaluate keywords?",
      options: [
        "It strictly counts the number of times a keyword appears.",
        "It uses semantic natural language processing to understand the meaning and context of the search query.",
        "It ranks pages purely based on alphabetical order."
      ],
      correctAnswerIndex: 1,
      explanation: "Modern search engines use advanced natural language processing (NLP) to understand topical context and searcher intent, moving beyond basic keyword counts."
    }
  },
  {
    id: "seo-f-18",
    number: 18,
    title: "Major Google Updates",
    goal: "Examine key historical and modern Google algorithm updates and core releases.",
    content: `
### Historic Google Algorithm Updates

To improve search results and combat spam, Google regularly updates its algorithms. Here are the milestone updates that shaped modern SEO:

---

### 🐼 Google Panda (2011)
Targeted thin, low-quality, scraped, or duplicate content, rewarding comprehensive and original websites.

### 🐧 Google Penguin (2012)
Targeted manipulative link-building and spammy backlink profiles, encouraging natural link acquisition.

### 🕊️ Google Hummingbird (2013)
Revolutionized search by focusing on semantic understanding and user intent, rather than just matching individual words.

### 🧠 RankBrain (2015)
Google's first machine-learning algorithm, used to interpret search queries and predict intent.

### 🌟 Helpful Content & Core Updates (Present)
Continuous updates designed to ensure searchers see original, expert-backed content written *by* humans *for* humans.
    `,
    interactiveQuiz: {
      question: "Which historical Google update was launched specifically to target manipulative, low-quality link building?",
      options: [
        "Panda",
        "Penguin",
        "Hummingbird"
      ],
      correctAnswerIndex: 1,
      explanation: "The Google Penguin update was launched specifically to detect and penalize spammy, manipulative link schemes."
    }
  },
  {
    id: "seo-f-19",
    number: 19,
    title: "Search Intent",
    goal: "Learn to identify and satisfy the four primary search intents.",
    content: `
### What is Search Intent?

**Search Intent** (or user intent) is the primary reason why a user enters a query into a search engine.

If your webpage does not align with the user's intent, Google's algorithm will not rank it, regardless of how long your content is or how many backlinks you have.

---

### 🗂️ The Four Primary Search Intents

1. **Informational:** The user is looking for knowledge or answers.
2. **Navigational:** The user wants to find a specific website or brand page.
3. **Commercial:** The user is researching products or services before buying.
4. **Transactional:** The user is ready to make a purchase.
    `,
    interactiveQuiz: {
      question: "What is 'Search Intent'?",
      options: [
        "The number of daily searches Googlebot performs.",
        "The primary underlying goal or reason why a user performs a search.",
        "The language settings on a user's browser."
      ],
      correctAnswerIndex: 1,
      explanation: "Search Intent is the 'why' behind a user's search query, which is crucial for choosing the right content format."
    }
  },
  {
    id: "seo-f-20",
    number: 20,
    title: "Informational Intent",
    goal: "Learn how to optimize content for informational search queries.",
    content: `
### Understanding Informational Intent

With **Informational Intent**, the searcher is looking for educational content, quick answers, or guides to help solve a specific problem.

---

### 🔑 Example Queries
* *“What is a sitemap?”*
* *“How to bake sourdough bread”*
* *“SEO guide for beginners”*

---

### 📝 Content Strategy for Informational Queries

* **Best Formats:** In-depth blog posts, definition boxes, step-by-step guides, FAQs, and video tutorials.
* **Optimization Tactic:** Use H2/H3 headers for questions, and provide a clear, direct answer in the first 40-60 words of your section to win featured snippet placements.
    `,
    interactiveQuiz: {
      question: "Which of the following queries carries Informational Intent?",
      options: [
        "buy hiking boots online",
        "how to plant tomato seeds",
        "Apple store login"
      ],
      correctAnswerIndex: 1,
      explanation: "'how to plant tomato seeds' is an informational search where the user is seeking educational guidance."
    }
  },
  {
    id: "seo-f-21",
    number: 21,
    title: "Commercial Intent",
    goal: "Learn how to target commercial-intent queries with comparisons and reviews.",
    content: `
### Understanding Commercial Intent

With **Commercial Intent**, the searcher is planning to buy a product or service but has not made their final decision. They are researching options, comparing brands, and looking for reviews.

---

### 🔑 Example Queries
* *“Best SEO tools 2026”*
* *“WordPress vs Wix comparison”*
* *“iPhone 17 Pro review”*

---

### 📝 Content Strategy for Commercial Queries

* **Best Formats:** Comparison tables, detailed product review pages, 'Top 10' list posts, and video reviews.
* **Optimization Tactic:** Build clean, user-friendly comparison matrices that outline features, pricing, pros, and cons.
    `,
    interactiveQuiz: {
      question: "What type of content is best suited for Commercial Intent searches?",
      options: [
        "A raw checkout form with no details.",
        "Comparison tables and detailed 'Best of' list articles.",
        "A brief history of search engines."
      ],
      correctAnswerIndex: 1,
      explanation: "Since commercial searchers are comparing options, list posts and comparison tables are the most helpful content formats."
    }
  },
  {
    id: "seo-f-22",
    number: 22,
    title: "Transactional Intent",
    goal: "Optimize ecommerce and landing pages for buyers ready to purchase.",
    content: `
### Understanding Transactional Intent

With **Transactional Intent**, the searcher has completed their research and is ready to make a purchase. They are looking for a place to buy, a discount, or a service booking page.

---

### 🔑 Example Queries
* *“Buy Semrush subscription”*
* *“bakery NY coupon code”*
* *“hire local SEO expert”*

---

### 🛒 Strategy for Transactional Queries

* **Best Formats:** Clean product pages, pricing grids, checkout pages, and service scheduling forms.
* **Optimization Tactic:** Ensure your checkout process is fast and seamless, call-to-action buttons (CTAs) are clear, and your pages have security badges and reviews to build immediate buyer trust.
    `,
    interactiveQuiz: {
      question: "Which search query carries clear Transactional Intent?",
      options: [
        "what is digital marketing",
        "buy running shoes size 10",
        "best running routes NY"
      ],
      correctAnswerIndex: 1,
      explanation: "The query 'buy running shoes size 10' represents a user who is ready to purchase a specific product."
    }
  },
  {
    id: "seo-f-23",
    number: 23,
    title: "What is E-E-A-T?",
    goal: "Learn the core components of Google's E-E-A-T trust framework.",
    content: `
### Decoding E-E-A-T

Google's Search Quality Rater Guidelines highlight a critical trust framework called **E-E-A-T**.

E-E-A-T is not a direct ranking factor, but rather a set of standards Google's algorithm is trained to look for to measure a website's quality and trustworthiness:

---

### 🧩 The Four Pillars of E-E-A-T

1. **Experience (E):** Does the content creator have real-world, hands-on experience with the topic?
2. **Expertise (E):** Is the content creator a recognized expert, certified professional, or authority on the subject?
3. **Authoritativeness (A):** Is your website viewed as a go-to source for this topic by other industry experts?
4. **Trustworthiness (T):** Is your website honest, accurate, secure, and transparent?
    `,
    interactiveQuiz: {
      question: "What does E-E-A-T stand for in Google's Quality Guidelines?",
      options: [
        "Easy, Efficient, Active, Technical",
        "Experience, Expertise, Authoritativeness, Trustworthiness",
        "Evaluation, Engagement, Action, Tracking"
      ],
      correctAnswerIndex: 1,
      explanation: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness."
    }
  },
  {
    id: "seo-f-24",
    number: 24,
    title: "Experience",
    goal: "Learn how to demonstrate real-world, hands-on experience in your content.",
    content: `
### Demonstrating Lived Experience

Google introduced the first 'E' (**Experience**) because searchers value advice from people who have actually *done* what they are writing about.

---

### 🏡 High-Value Experience Examples

* **Travel Blog:** A guide written by someone who physically visited the destination and took original photos.
* **Product Reviews:** A review that includes original photos of the reviewer holding and testing the product.
* **Troubleshooting:** A guide detailing how an engineer solved a coding issue, complete with sample code and terminal screenshots.

---

### 📝 How to Optimize for Experience

* Write in the first person (*“In my experience...”, “We tested this...”*).
* Include original media, hands-on test logs, and unique case study data.
    `,
    interactiveQuiz: {
      question: "Which travel article demonstrates the best E-E-A-T 'Experience' signal?",
      options: [
        "An article summarizing Wikipedia travel pages with stock images.",
        "A first-person guide detailing a writer's trip to Rome, featuring their original photos and tips.",
        "An article generated entirely by an AI writer who has never traveled."
      ],
      correctAnswerIndex: 1,
      explanation: "A first-person guide with original photos and unique personal insights is a strong demonstration of hands-on Experience."
    }
  },
  {
    id: "seo-f-25",
    number: 25,
    title: "Expertise & Authority",
    goal: "Establish professional authority and content expertise on your website.",
    content: `
### Expertise & Authoritativeness

Google wants to ensure that critical search queries (especially those affecting user health, finance, or safety) are answered by qualified professionals.

---

### 🩺 Expertise
Expertise refers to the formal credentials, certifications, or deep subject knowledge of the content creator.
* *Example:* A medical article reviewed and signed by a certified cardiologist.

---

### 🛡️ Authoritativeness
Authoritativeness represents your overall brand reputation. It is measured by how often other experts cite, link to, or mention your website as an industry authority.
* *Example:* A legal website referenced by university law reviews and official government domains.
    `,
    interactiveQuiz: {
      question: "How can you establish 'Expertise' on a health and wellness blog?",
      options: [
        "Publishing anonymous blog posts without author details.",
        "Including detailed author bios highlighting professional certifications, degrees, and medical reviews.",
        "Using flashy banner ads and pop-ups."
      ],
      correctAnswerIndex: 1,
      explanation: "Providing clear author bios with verified professional credentials and reviews demonstrates subject-matter Expertise."
    }
  },
  {
    id: "seo-f-26",
    number: 26,
    title: "Trustworthiness",
    goal: "Master the most critical pillar of E-E-A-T: Trustworthiness.",
    content: `
### Trustworthiness: The Core of E-E-A-T

According to Google's Search Quality Rater Guidelines:

> **"Trustworthiness is the absolute core of E-E-A-T. If a webpage is untrustworthy, it cannot achieve high rankings, regardless of its experience or authority."**

---

### 🔒 Building Website Trustworthiness

You can improve your site's trustworthiness by focusing on these key technical and editorial elements:

* **Transparency:** Display clear contact details, an 'About Us' page, and editorial policies.
* **Accuracy:** Regularly update your content and cite authoritative, peer-reviewed sources.
* **Security:** Keep your site secure by enforcing HTTPS (SSL certificates) and secure checkout processes.
* **Customer Feedback:** Gather and display honest, unedited customer reviews and ratings on your site.
    `,
    interactiveQuiz: {
      question: "According to Google's guidelines, which of the E-E-A-T pillars is the most critical?",
      options: [
        "Experience",
        "Expertise",
        "Trustworthiness"
      ],
      correctAnswerIndex: 2,
      explanation: "Google explicitly states that Trustworthiness is the single most important member of the E-E-A-T family."
    }
  },
  {
    id: "seo-f-27",
    number: 27,
    title: "SEO Myths",
    goal: "Dispel common misconceptions and outdated beliefs in the SEO industry.",
    content: `
### Debunking Outdated SEO Myths

The search landscape changes rapidly. Many common beliefs are either outdated or flat-out incorrect:

---

* **❌ Myth 1: SEO yields instant results.**
  * *Fact:* SEO is a long-term investment. It typically takes 3 to 6 months to start seeing substantial organic search traffic.
* **❌ Myth 2: More keywords always improve rankings.**
  * *Fact:* Cramming keywords into your text unnaturally (keyword stuffing) will hurt your user experience and can lead to search engine penalties.
* **❌ Myth 3: Backlinks no longer matter.**
  * *Fact:* Authoritative, relevant backlinks remain one of the most powerful trust votes in Google's ranking algorithm.
* **❌ Myth 4: SEO is dead.**
  * *Fact:* As long as people search for answers online, SEO will remain a vital channel for businesses to capture high-intent customers.
    `,
    interactiveQuiz: {
      question: "How long does it typically take to start seeing substantial results from an SEO campaign?",
      options: [
        "Within 24 hours.",
        "Typically 3 to 6 months of consistent optimization.",
        "Exactly 5 years."
      ],
      correctAnswerIndex: 1,
      explanation: "Because crawlers must process updates and build domain authority, SEO typically takes 3 to 6 months to yield major returns."
    }
  },
  {
    id: "seo-f-28",
    number: 28,
    title: "Module Summary",
    goal: "Review key takeaways from Module 1 and prepare for the final assessment.",
    content: `
### 🎉 Congratulations!

You have completed all **28 bite-sized lessons** in **Module 1: SEO Fundamentals**!

---

### 📝 Key Takeaways

1. **What SEO Is:** The art and science of optimizing content to rank naturally in organic search.
2. **How Search Engines Work:** Google discovered pages via **crawling**, stores them via **indexing**, and serves them via **ranking algorithms**.
3. **The SEO Pillars:** A successful strategy balances On-Page, Off-Page, and Technical SEO.
4. **Trust Matters:** Satisfying search intent and building trust through E-E-A-T are essential for modern SEO success.

---

### 🏆 Ready for Your Assessment?
Now that you have completed the lessons, put your knowledge to the test! Below, you can complete the **20-Question Final Assessment**, try the **5 Practical Activities**, and start your first **Mini Project**!
    `
  }
];

export const SEO_FUNDAMENTALS_ASSESSMENT: AssessmentQuestion[] = [
  {
    id: "q-1",
    question: "What does SEO stand for?",
    options: [
      "Search Engine Optimization",
      "Systematic Entity Optimization",
      "Search Engine Operation",
      "Static Document Indexing"
    ],
    correctAnswerIndex: 0,
    explanation: "SEO stands for Search Engine Optimization, the process of optimizing web pages to rank higher in organic search listings."
  },
  {
    id: "q-2",
    question: "Which of these is a major difference between organic search and paid ads?",
    options: [
      "Organic clicks cost money; paid ads are free.",
      "Organic results disappear immediately if budget stops.",
      "Organic listings are ranked by search algorithms based on relevance, whereas paid ads require a fee-per-click.",
      "Paid ads are crawled and organic results are not."
    ],
    correctAnswerIndex: 2,
    explanation: "Organic results are ranked naturally by quality and relevance without advertising fees, while paid results charge a fee-per-click (PPC)."
  },
  {
    id: "q-3",
    question: "What is Googlebot?",
    options: [
      "An automated AI assistant for search engine users.",
      "Google's software crawler that discovers, visits, and scans webpages.",
      "An SEO audit tool from a third-party developer.",
      "A database indexing server."
    ],
    correctAnswerIndex: 1,
    explanation: "Googlebot is the official name of Google's automated web crawler that discovers and scans pages by following links."
  },
  {
    id: "q-4",
    question: "What is the primary function of Google's search index?",
    options: [
      "To measure web design responsiveness.",
      "To run advertising campaigns.",
      "To store crawled and parsed web page data so it can be fetched instantly.",
      "To penalize unethical websites."
    ],
    correctAnswerIndex: 2,
    explanation: "The search index is Google's massive catalog/database where all crawled, processed, and readable pages are stored."
  },
  {
    id: "q-5",
    question: "Which system evaluates backlink profiles as a measure of website authority?",
    options: [
      "Robots.txt",
      "PageRank",
      "XML Sitemaps",
      "Core Web Vitals"
    ],
    correctAnswerIndex: 1,
    explanation: "Google was founded on PageRank, an algorithm that evaluates links as 'trust votes' to judge page authority."
  },
  {
    id: "q-6",
    question: "Which category of SEO covers mobile responsiveness, HTTPS security, and sitemaps?",
    options: [
      "On-Page SEO",
      "Off-Page SEO",
      "Technical SEO",
      "Local SEO"
    ],
    correctAnswerIndex: 2,
    explanation: "Technical SEO focuses on underlying site infrastructure, speed, and indexability criteria."
  },
  {
    id: "q-7",
    question: "What is a backlink?",
    options: [
      "A link from one page on your site to another page on your site.",
      "A link from an external website pointing to your webpage.",
      "A link leading to the administrative backend of a CMS.",
      "An HTML tag that reverses text flow."
    ],
    correctAnswerIndex: 1,
    explanation: "A backlink is an external inbound link from someone else's website referencing your web document."
  },
  {
    id: "q-8",
    question: "How does Local SEO display brick-and-mortar stores for regional queries like 'dentist near me'?",
    options: [
      "In the Google Map Pack along with ratings and locations.",
      "Exclusively in paid shopping boxes.",
      "As hidden keyword tags.",
      "Only in the sitemap.xml file."
    ],
    correctAnswerIndex: 0,
    explanation: "For local searches, Google serves the 'Map Pack' displaying physical listings, contact numbers, hours, and map markers."
  },
  {
    id: "q-9",
    question: "Where should you instruct search crawlers to ignore secure admin folders or duplicate parameters?",
    options: [
      "In the robots.txt file.",
      "Inside the image alt tags.",
      "In the main H1 header.",
      "Within the Google Business Profile."
    ],
    correctAnswerIndex: 0,
    explanation: "The robots.txt file is the standard configuration file used to permit or block specific spiders from crawling folders."
  },
  {
    id: "q-10",
    question: "What is White Hat SEO?",
    options: [
      "SEO techniques that manipulate algorithms behind-the-scenes.",
      "Ethical optimization strategies centered on user value and search engine rules.",
      "A fast-ranking method that buys links.",
      "Creating hidden pages filled with target search terms."
    ],
    correctAnswerIndex: 1,
    explanation: "White Hat SEO represents ethical, approved, and long-term search marketing strategies focusing on genuine user benefit."
  },
  {
    id: "q-11",
    question: "Which of the following is a classic Black Hat SEO technique?",
    options: [
      "Writing detailed product reviews with custom pictures.",
      "Keyword stuffing, hidden text, and cloaking.",
      "Linking out to helpful medical research publications.",
      "Optimizing site loading speeds."
    ],
    correctAnswerIndex: 1,
    explanation: "Keyword stuffing, cloaking, bought backlink packages, and hidden text are manipulative practices categorized as Black Hat."
  },
  {
    id: "q-12",
    question: "Which historical Google update was launched specifically to target thin, duplicate, or scraped content?",
    options: [
      "Google Panda",
      "Google Penguin",
      "Google Hummingbird",
      "Google RankBrain"
    ],
    correctAnswerIndex: 0,
    explanation: "Google Panda (2011) penalized low-quality, thin content mills and rewarded rich, original, and detailed reporting."
  },
  {
    id: "q-13",
    question: "What does the first 'E' in Google's E-E-A-T trust guideline represent?",
    options: [
      "Efficiency",
      "Experience",
      "Engagement",
      "Estimation"
    ],
    correctAnswerIndex: 1,
    explanation: "The first 'E' stands for Experience, evaluating whether content creators have personal, first-hand, lived experience with the subject matter."
  },
  {
    id: "q-14",
    question: "What does the 'T' in E-E-A-T stand for, and why is it considered the core of the framework?",
    options: [
      "Technical; because code is everything.",
      "Trustworthiness; because searchers must trust the accuracy and safety of the source.",
      "Traffic; because high traffic proves authority.",
      "Tracking; because of analytical monitoring."
    ],
    correctAnswerIndex: 1,
    explanation: "Trustworthiness is the absolute anchor of E-E-A-T. High authority and expertise mean nothing if a page is untrustworthy or unsafe."
  },
  {
    id: "q-15",
    question: "Which search intent is active when a user searches 'WordPress vs Wix comparison reviews'?",
    options: [
      "Informational Intent",
      "Navigational Intent",
      "Commercial Intent",
      "Transactional Intent"
    ],
    correctAnswerIndex: 2,
    explanation: "The user is researching alternative options, prices, and features before purchasing, representing Commercial Intent."
  },
  {
    id: "q-16",
    question: "What search intent is represented by the query 'buy organic coffee beans online'?",
    options: [
      "Informational",
      "Navigational",
      "Commercial",
      "Transactional"
    ],
    correctAnswerIndex: 3,
    explanation: "A search starting with 'buy' indicates the user has already decided what they want and are looking for a transaction interface."
  },
  {
    id: "q-17",
    question: "Why does keyword stuffing hurt your website's search performance?",
    options: [
      "Because it makes text illegible for humans and triggers algorithmic penalties from Google.",
      "Because it costs money to use too many keywords.",
      "Because Googlebot only reads sitemaps, not body text.",
      "Because servers cannot process more than 10 keywords."
    ],
    correctAnswerIndex: 0,
    explanation: "Keyword stuffing degrades user experience and is actively detected and filtered out by modern semantic algorithms."
  },
  {
    id: "q-18",
    question: "How long does a standard, high-quality SEO campaign typically take to yield substantial traffic?",
    options: [
      "12 to 24 hours.",
      "Exactly 3 to 6 months of steady optimization.",
      "At least 3 years.",
      "Never; SEO doesn't drive traffic anymore."
    ],
    correctAnswerIndex: 1,
    explanation: "SEO builds authority and trust incrementally over time, requiring typically 3 to 6 months to register broad competitive ranking changes."
  },
  {
    id: "q-19",
    question: "What is an 'AI Overview' in modern search results?",
    options: [
      "A paid advertisement banner.",
      "A map of nearby services.",
      "An AI-synthesized response summarizing information from multiple sources at the top of the SERP.",
      "A custom code validator."
    ],
    correctAnswerIndex: 2,
    explanation: "AI Overviews are generative search features where Google synthesizes quick, smart summaries directly on the SERP using leading LLMs."
  },
  {
    id: "q-20",
    question: "Which of the following is considered an ethical White Hat link-building strategy?",
    options: [
      "Buying thousands of low-quality directory links for $5.",
      "Securing editorial links by producing unique research studies, data points, or news stories.",
      "Hacking competitor websites to insert hidden link lines.",
      "Spamming blog comments with link anchors."
    ],
    correctAnswerIndex: 1,
    explanation: "Producing unique, citation-worthy resources that journalists and industry peers naturally reference is the gold standard of organic link acquisition."
  }
];

export const SEO_FUNDAMENTALS_PRACTICALS: PracticalActivity[] = [
  {
    id: "p-1",
    title: "Deconstruct your First SERP Layout",
    description: "Analyze the composition of a real search results page to understand organic, paid, and structured snippets.",
    steps: [
      "Open Google on your desktop or mobile browser.",
      "Search for a commercial intent keyword, such as: 'best laptop for graphic design' or 'best coffee makers reviews'.",
      "Take a screenshot of the results, and outline every SERP feature you observe.",
      "List: How many paid ads? Is there an AI Overview? Are there featured snippets, accordions (People Also Ask), or Map packs?"
    ],
    deliverable: "A list describing the elements of the SERP and identifying which sections are organic (free) vs paid."
  },
  {
    id: "p-2",
    title: "Draft an E-E-A-T Trust Check",
    description: "Audit a popular blog or website to see how they establish experience, authority, and trust signals.",
    steps: [
      "Go to a major blog of your choice (e.g., Wirecutter, Healthline, or a favorite niche travel site).",
      "Look for the author byline. Is there a bio? Does the bio link to professional credentials or social handles?",
      "Verify if the site has a 'Reviewed By' badge or an editor sign-off.",
      "Check if they specify their testing methodology (Lived Experience evidence) and have a visible Contact and About page."
    ],
    deliverable: "Write a 3-bullet evaluation of the site's E-E-A-T signals, suggesting 1 way they could increase visitor trust."
  },
  {
    id: "p-3",
    title: "Search Intent Classification Activity",
    description: "Classify real user search keywords into the 4 correct search intent buckets.",
    steps: [
      "Analyze this list of queries: (A) 'how to change car oil', (B) 'cheap flight to Miami booking', (C) 'Slack app login', (D) 'Hubspot vs Salesforce pricing and reviews', (E) 'SEO definition for beginners'.",
      "Map each query to either: Informational, Navigational, Commercial, or Transactional intent.",
      "Explain what type of page format would best satisfy the user's need for query (A) and query (B)."
    ],
    deliverable: "A completed 5-item intent mapping sheet with a brief structural recommendation."
  },
  {
    id: "p-4",
    title: "Analyze robots.txt and sitemap.xml on a Live Site",
    description: "View the public crawl rules and indexing sitemaps of a real, live company website.",
    steps: [
      "In your browser, visit a major website and add '/robots.txt' to the end of the URL (e.g., 'https://nytimes.com/robots.txt' or 'https://github.com/robots.txt').",
      "Observe what folders they allow or disallow. Can you find a link to their sitemap XML?",
      "Now search for their sitemap directly (e.g. 'https://example.com/sitemap.xml'). Look at how the URLs are listed."
    ],
    deliverable: "Note down 1 folder that the site blocks search spiders from crawling and explain why they might want that hidden."
  },
  {
    id: "p-5",
    title: "Draft your First Meta Tags Block",
    description: "Synthesize a perfectly sized, keyword-optimized Title and Meta Description tag block.",
    steps: [
      "Choose a topic you are passionate about (e.g., 'A guide on how to learn Python fast' or 'Homemade gluten-free chocolate cookies recipe').",
      "Write a Title Tag that includes your main keyword at the start, staying strictly under 60 characters.",
      "Draft a Meta Description tag with a clear Call-To-Action (CTA) and focus keywords, staying strictly under 155 characters."
    ],
    deliverable: "Your optimized Title and Meta Description tag block with exact character counts."
  }
];

export const SEO_FUNDAMENTALS_MINI_PROJECT: MiniProject = {
  title: "A Comprehensive SEO Site Audit",
  description: "Analyze the organic visibility, search intent matching, trust metrics, and layout design of your favorite website.",
  prompt: "Choose any website (your current company's site, a local business page, or your favorite blog) and write a high-impact, 3-section SEO audit report.",
  guidelines: [
    "Section 1: Website Profile & Search Intent Map. What is the business domain? Who are their main target customers? List 3 high-intent queries that they should target to capture buyers.",
    "Section 2: On-Page & Crawl Analysis. Look at their landing page title and structure. Are they using H1 headings properly? Is their URL clean? Do images have descriptive alt texts? Suggest 2 optimization tweaks.",
    "Section 3: E-E-A-T and Trust Assessment. Check their About page, contact details, author profiles, and SSL certificate. Give them a letter grade (A-F) for Trustworthiness and outline 2 concrete action items to improve their authority profile."
  ]
};
