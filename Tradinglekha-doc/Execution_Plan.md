# Tradinglekha MVP Execution Plan (Agent-Driven)

This document outlines the step-by-step execution plan for the AI agent to build the Tradinglekha platform. It focuses on the MVP (Minimum Viable Product) and defers v2 features (like Broker Sync).

## Phase 1: Database & Backend Foundations
1.  **Refine Database Schema (Prisma)**
    *   *Action*: Update `schema.prisma` to include structured models (Account, Strategy, Trade, Execution, Journal) while keeping the code clean and simple.
    *   *Note*: Remove Broker Connection from strict requirements; make it optional for future V2.
2.  **Authentication & Sessions Setup**
    *   *Action*: Implement secure, sliding sessions using NextAuth.js (or Supabase Auth if preferred) with "Remember Me" functionality.

## Phase 2: Core API & AI Integration
3.  **AI Screenshot OCR Feature (MVP Priority)**
    *   *Action*: Implement an API route that accepts an uploaded screenshot.
    *   *Action*: Integrate with a Vision LLM (like GPT-4o Vision or Claude 3.5 Sonnet) to scan the image and extract key fields (Symbol, Entry/Exit Price, Date, Position Size).
    *   *Action*: Return structured JSON to the frontend to auto-fill the "Add Trade" form.
4.  **Smart Rate Limiting Implementation**
    *   *Action*: Set up Redis-based rate limiting (Upstash).
    *   *Action*: Apply strict limits (1 req/min) to the AI screenshot route to prevent abuse and hallucinations. Apply permissive limits to database fetch routes.

## Phase 3: Frontend & User Experience
5.  **Secure, Accessible UI Components**
    *   *Action*: Build accessible forms and tables using Tailwind CSS and Radix UI primitives.
    *   *Action*: Ensure full keyboard navigability and cross-browser support via Autoprefixer.
6.  **Multi-Currency Trading Dashboard & Tiered Access**
    *   *Action*: Build a dashboard that isolates statistics by currency. Free users will view a single locked currency based on their `defaultCurrency`.
    *   *Action*: Build a toggle switch for Pro/Elite users to swap their dashboard view entirely between different currencies (e.g., USD vs INR) without cross-converting data.
    *   *Action*: Fetch and display user statistics (Win Rate, Profit Factor, Discipline Score) grouped strictly by the selected currency.

## Phase 4: Monetization & Tiered Account Strategy
7.  **Multi-Account & Asset Class Segregation**
    *   *Action*: Introduce an `Account` model to allow users to separate F&O, Commodity, and Investment trades (tracked via `assetClass` in the database).
    *   *Action*: Enforce subscription tier limits on account creation:
        *   Free Plan: 1 Account
        *   Pro (Monthly): 2 Accounts
        *   Pro (Yearly) & Elite (Monthly): 3 Accounts
        *   Elite (Yearly): Unlimited Accounts
    *   *Action*: Train the AI Vision prompt to automatically detect and classify the `assetClass` (e.g., recognizing strike prices for F&O vs lot sizes for Commodities) based on screenshot context.

## Phase 5: Polish & Deployment Prep
8.  **Error Handling & Routing**
    *   *Action*: Implement Next.js Middleware for protected routes (redirecting unauthenticated users smoothly).
    *   *Action*: Build custom 404/500 error pages.
8.  **Final Security Audit**
    *   *Action*: Check HTTP headers, rate limits, and ensure no sensitive API keys are exposed to the client.
