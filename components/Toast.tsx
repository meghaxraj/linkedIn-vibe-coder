'use client';

import React from 'react';
import { Check, Info, AlertTriangle } from 'lucide-react';
import { ToastNotification } from '@/lib/types';

interface ToastProps {
  toast: ToastNotification | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 bg-white text-[#1c1b1b] px-4 py-3 rounded-xl shadow-[0_8px_24px_rgba(15,23,42,0.14)] border border-[#e5e2e1] flex items-center gap-3 max-w-md">
      <div className="w-8 h-8 rounded-full bg-[#cde5ff] flex items-center justify-center text-[#004e99] shrink-0">
        {toast.type === 'warning' ? (
          <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 text-[#006398]" />
        ) : (
          <Check className="w-4 h-4 text-[#004e99]" />
        )}
      </div>
      <div className="flex flex-col min-w-0 pr-2">
        <span className="text-sm font-semibold text-[#1c1b1b] leading-tight">{toast.title}</span>
        <span className="text-xs text-[#414752] leading-tight mt-0.5">{toast.desc}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-[#727783] hover:text-[#1c1b1b] text-sm ml-auto p-1"
      >
        ✕
      </button>
    </div>
  );
}
