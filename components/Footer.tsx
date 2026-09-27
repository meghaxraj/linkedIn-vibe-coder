'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-white mt-12 border-t border-[#e5e2e1] shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1c1b1b]">PostSpark</span>
          <span className="text-xs text-[#727783]">
            © 2025 PostSpark AI Inc. Built for professional LinkedIn event amplification.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#414752]">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#1c1b1b] transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#1c1b1b] transition-colors">
            Terms of Service
          </a>
          <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-[#1c1b1b] transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            System Status
          </a>
          <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-[#1c1b1b] transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
