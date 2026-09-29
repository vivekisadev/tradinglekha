"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Logo } from "@/components/logo";

const footerLinks = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/analytics" },
    { label: "AI Coach", href: "/ai-coach" },
    { label: "Playbook", href: "/playbook" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Wall of Love", href: "#wall-of-love" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function ShapeWaves() {
  return (
    <footer className="relative w-full overflow-hidden bg-white py-20 border-t border-zinc-200">
      {/* Background Animated Waves — always light emerald-green mint */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg
          className="absolute w-full h-[200%] top-[-50%] left-0"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z"
            fill="currentColor"
            className="text-emerald-500/10"
            animate={{
              d: [
                "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z",
                "M0,400 C320,500 420,200 720,400 C1020,600 1120,200 1440,400 L1440,800 L0,800 Z",
                "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.path
            d="M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z"
            fill="currentColor"
            className="text-emerald-500/20"
            animate={{
              d: [
                "M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z",
                "M0,500 C280,300 480,700 720,500 C960,300 1160,700 1440,500 L1440,800 L0,800 Z",
                "M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Top row: brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6"><Logo className="h-12 md:h-16 w-auto" /></Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              The AI-powered trading journal that helps you find your edge, eliminate tilt, and grow your portfolio.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Tradinglekha. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com/tradinglekha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/tradinglekha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/tradinglekha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
