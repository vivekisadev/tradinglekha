# Implementation Concepts & Explanations

This document serves as an educational log. For every major architectural decision or feature we build, an entry will be added here. It explains *what* we did, *why* we did it, and the *underlying concepts*—which is highly useful for engineering interviews.

---

## 1. Using Next.js (App Router) instead of Standard React (SPA)
**What did we do?**
We chose Next.js with its server-side routing (App Router) as our core framework instead of a standard React Single Page Application (SPA).

**Why did we do that? (The Problem)**
In a standard React SPA, there is only one HTML file (`index.html`). Routing happens completely in the browser via JavaScript. If a user tries to directly visit `tradinglekha.com/dashboard` or refreshes the page, the server gets confused because no `dashboard.html` file exists on the server, resulting in a 404 error (unless specific fallback rewrites are configured on the server). 

**Why we used it (Interview Concept):**
Next.js solves this by providing **Server-Side Rendering (SSR)** and **File-based Routing**. When a user requests `/dashboard`, the Next.js server intercepts the request, runs the React code on the server, and sends a fully formed HTML page back to the browser. 
*   **Interview Keyword:** "Hydration". The server sends the static HTML first for speed and SEO, and then React "hydrates" it (attaches event listeners) to make it interactive. This provides massive performance benefits (Faster First Contentful Paint) and solves direct URL routing issues automatically.

---

## 2. Using Prisma ORM
**What did we do?**
We are using Prisma as our Object-Relational Mapper (ORM) to connect our Next.js backend to the PostgreSQL database, rather than writing raw SQL strings.

**Why did we do that?**
Writing raw SQL strings (e.g., `SELECT * FROM users WHERE email = '${email}'`) is prone to **SQL Injection**, a critical security vulnerability where a user types malicious SQL code into an input field to delete or steal database records.

**Why we used it (Interview Concept):**
Prisma acts as an abstraction layer. It provides **Type Safety** (catching errors in code before the app even runs) and uses **Parameterized Queries** under the hood. 
*   **Interview Keyword:** "SQL Injection Mitigation via Parameterized Queries". This means the database driver treats user input strictly as *data*, never as executable *code*, making SQL injection impossible. It also drastically simplifies backend code, making it highly readable.

---

## 3. AI Screenshot Processing (Vision OCR) vs Broker Sync
**What did we do?**
For the MVP, we prioritized an AI Vision feature that reads uploaded trade screenshots to auto-fill forms, rather than directly connecting to Broker APIs (delayed to V2).

**Why did we do that?**
Connecting to multiple broker APIs (like Zerodha, Binance, Interactive Brokers) requires dealing with complex OAuth flows, webhooks, and varying API rate limits per broker. It's a massive engineering lift. By using a Vision LLM (like GPT-4o Vision), we create a "universal" input method. The user just uploads a screenshot from *any* broker, and the AI extracts the `Symbol`, `Entry Price`, and `Date`.

**Why we used it (Interview Concept):**
This is a classic example of **MVP Scoping and Time-to-Market strategy**. In system design interviews, demonstrating the ability to choose a universal, high-impact feature (AI Vision) over a highly complex, fragmented feature (10 different broker API integrations) shows strong product-engineering intuition.

---

## 4. Isolated Currency Ledgers (No Conversion)
**What did we do?**
We added a `currency` string field to every Trade in the database, but we strictly avoided adding any logic that converts currencies (e.g., no live Forex API conversion). The dashboard completely isolates data by currency: you toggle between seeing *only* your USD stats or *only* your INR stats. 
Additionally, we are using this feature as a monetization tier: Free users are locked to a single currency dashboard, while Pro/Elite users unlock the multi-currency toggle.

**Why did we do that?**
Forex exchange rates fluctuate constantly. If a trader earned ₹10,000 yesterday, and we convert that to USD on the dashboard, the displayed USD amount will change every single day based on global Forex markets. To a trader, this looks like their PnL is magically changing, which destroys trust in the platform. A trading journal must reflect exact, immutable ledger values.

**Why we used it (Interview Concept):**
This is a prime example of **Product-Driven Architecture vs. Engineering-Driven Architecture**. An engineer might try to build a complex, "clever" system using historical Forex APIs to unify the data. However, the *Product* requirement dictates that a user's psychological trust in their exact PnL is paramount. By enforcing **Isolated Ledgers**, we simplify the backend (no complex chron-jobs or third-party APIs needed) while completely solving the user experience problem.