# Tradinglekha Architecture, Security, & User Retention Plan

## 1. High-Level Architecture & Scalability
To support 10,000+ users seamlessly, the architecture must be highly available, fast, and scalable.

*   **Frontend & Application Framework**: **Next.js (App Router)**. This provides Server-Side Rendering (SSR) and Static Site Generation (SSG). 
    *   *Solves Direct Routing Issue*: Unlike pure Single Page Applications (SPAs) like basic React, Next.js natively handles direct URL requests on the server, ensuring pages load properly without 404s when a user refreshes or shares a deep link.
*   **Database**: **PostgreSQL** hosted on a scalable provider (e.g., Supabase, AWS RDS, or Neon). Connection pooling (e.g., PgBouncer) will be used to handle thousands of concurrent database connections.
*   **Caching Layer**: **Redis** (e.g., Upstash). Used for caching session data, rate-limiting requests, and caching heavy analytical queries (like user win-rate calculations).
*   **Edge CDN**: **Vercel Edge Network or Cloudflare**. Assets (images, fonts, scripts) will be cached globally.

## 2. Security & Data Protection
Trading data is highly sensitive. We must ensure absolute security.

*   **Broker Credential Encryption**: Any API keys or broker credentials must be encrypted *at rest* in the database using strong symmetric encryption (AES-256-GCM). The decryption keys will be stored securely in a Key Management Service (KMS), isolated from the database.
*   **Protection Against XSS & SQL Injection**: 
    *   **SQL Injection**: Completely mitigated by using **Prisma ORM**, which uses parameterized queries.
    *   **XSS (Cross-Site Scripting)**: React/Next.js automatically escapes data. We will enforce strict Content Security Policies (CSP).
*   **Smart Organizational Rate Limiting**: We will not uniformly rate-limit all routes, as that ruins the user experience. Instead, we implement "context-aware" rate limiting:
    *   **High-Volume Actions (Allowed)**: Features like live price fetching, auto-saving journal entries, or rapid UI interactions will have highly permissive limits. If the user naturally needs to ping the database frequently to save their work, we let them do it (e.g., 500 requests/minute per IP).
    *   **Costly/AI Actions (Strictly Limited)**: AI insights and LLM generation endpoints will be strictly rate-limited to **1 request per minute per user**. This prevents the AI from hallucinating due to rapid contextual switching, saves API costs, and ensures high-quality responses.
    *   **Authentication Routes**: Standard strict limits on Login/Signup (e.g., 5 attempts per minute) to prevent brute force.
    *   **DDoS & Bot Mitigation**: Cloudflare WAF will be used to automatically block non-human botnets trying to spam the database from a single IP.
*   **Secure HTTP Headers**: Use libraries/Next.js config to enforce HSTS, X-Frame-Options, and prevent MIME-sniffing.

## 3. Authentication & "Remember Me" Sessions
Users hate logging in repeatedly.

*   **Session Strategy**: We will use secure, HTTP-only, SameSite cookies for session management (via NextAuth.js or Supabase).
*   **"Remember Me" Implementation**: 
    *   When signing in, users will have a "Stay signed in" checkbox.
    *   If checked, the session cookie will have an extended `Max-Age` (e.g., 30 days).
    *   If unchecked, it will be a "session cookie" that expires when the browser is fully closed.
    *   We will implement **Sliding Sessions**: Every time an active user visits the app, the 30-day expiry automatically resets, meaning active users *never* get logged out unexpectedly.

## 4. Accessibility (a11y) & Cross-Browser Compatibility
The site must work for everyone, everywhere.

*   **Cross-Browser Support**: 
    *   CSS will run through **Autoprefixer** (part of PostCSS) to automatically add `-webkit-` and `-moz-` prefixes for older/different browsers (Safari, Firefox, Chrome, Edge).
    *   We will use standard ES6+ JavaScript compiled down via Next.js SWC compiler, ensuring broad compatibility.
*   **Accessibility Standards (WCAG 2.1 AA)**:
    *   **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<article>`, etc.
    *   **Keyboard Navigation**: Every button, link, and form must be fully navigable using only the `Tab` key.
    *   **Screen Readers**: Extensive use of `aria-labels` and `aria-hidden` tags.
    *   **Color Contrast**: UI color palette will be tested to ensure high contrast for visually impaired users.
*   **Responsive Design**: Mobile-first Tailwind CSS ensures the site looks perfect on iOS, Android, Tablets, and giant monitors.

## 5. Robust Routing & Error Handling
*   **Middleware Route Protection**: Next.js Middleware will intercept requests before the page loads. If a logged-out user tries to access `/dashboard`, they are instantly redirected to `/login` without a flash of broken content.
*   **Custom Fallbacks**: Custom 404 (Not Found) and 500 (Server Error) pages that gracefully guide the user back to safety rather than showing scary server logs.

## 6. User Retention Strategies (The "Sticky" Factors)
Based on research of successful SaaS and trading tools, here is what brings traders back daily:

1.  **Zero-Friction Automated Syncing**: The biggest hurdle in journaling is manual entry. Automatic broker sync in the background ensures their dashboard is always updated before they even log in.
2.  **Daily "Morning Briefing"**: When they open the app, show a quick snapshot: "You are on a 3-day winning streak. Your best setup recently is Breakout Re-tests." 
3.  **Gamification & Discipline Score**: Traders struggle with psychology. Implement a "Discipline Score" that goes up when they follow their rules (e.g., daily loss limit not exceeded, position sizing respected) and drops when they break rules.
4.  **Actionable AI Insights**: "Did you know? You lose 60% of the time when you trade between 2 PM and 3 PM." This specific, actionable data feels like magic to a user.
5.  **Dark Mode / Custom Dashboards**: Traders love staring at charts in dark mode. Letting them drag and drop widgets to build their perfect command center creates psychological investment in the platform.
6.  **Progressive Web App (PWA)**: Allow users to "Install" the website to their phone's home screen. It feels like a native app, works fast, and drastically increases daily active usage.
