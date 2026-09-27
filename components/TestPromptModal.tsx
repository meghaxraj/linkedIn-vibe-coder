'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, RefreshCw, ThumbsUp } from 'lucide-react';
import { EventConfig } from '@/lib/types';

interface TestPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EventConfig;
  onToast: (title: string, desc: string) => void;
}

export function TestPromptModal({
  isOpen,
  onClose,
  config,
  onToast,
}: TestPromptModalProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [activePersona, setActivePersona] = useState(0);

  if (!isOpen) return null;

  const testPersonas = [
    {
      role: 'VP of Engineering (Enterprise)',
      name: 'Michael Chang',
      preview: `Preparing for ${config.name} in SF this October! 🚀\n\nOur team is prioritizing autonomous agent reliability and cost benchmarks. Particularly keen to connect with leaders tackling production governance standards and multi-cluster orchestrations.\n\nLet's catch up if you're attending Moscone West! ${config.hashtags}`,
      viralityScore: '9.6 / 10 Virality Index',
      hookStrength: 'High • Enterprise Authority',
    },
    {
      role: 'Staff ML Infrastructure Architect',
      name: 'Jessica Ramos',
      preview: `Counting down the days to #${config.name.replace(/\s+/g, '')}! ⚡\n\nLooking forward to the deep dives on distributed context windows, vector caching, and inference latency optimizations.\n\nWho else is building agentic systems at scale? Let's connect in the expo hall! ${config.hashtags}`,
      viralityScore: '9.3 / 10 Virality Index',
      hookStrength: 'High • Technical Precision',
    },
    {
      role: 'Founder & AI Startup CEO',
      name: 'Liam Vance',
      preview: `Excited to be heading to SF for ${config.name}! 💡\n\nWe'll be on the ground meeting engineering partners and learning from the keynote speaker sessions.\n\nDrop a comment if you'll be around Moscone West—always down for coffee and tech chats! ${config.hashtags}`,
      viralityScore: '9.5 / 10 Virality Index',
      hookStrength: 'Very High • Network Expansion',
    },
  ];

  const handleRetest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      onToast('Prompt Synthesized', 'Tested across 3 attendee archetype personas.');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-2xl w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004e99] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">AI Prompt Synthesis Sandbox</h3>
              <p className="text-xs text-[#414752]">
                Testing your event fundamentals against synthetic attendee personas.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#e5e2e1] text-[#727783] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-1.5 bg-[#f6f3f2] p-1 rounded-xl text-xs">
            {testPersonas.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePersona(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center truncate ${
                  activePersona === idx
                    ? 'bg-white text-[#0a66c2] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                {p.role.split(' ')[0]} Archetype
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-[#e5e2e1] bg-[#fcf9f8] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#1c1b1b]">
                  {testPersonas[activePersona].name}
                </span>
                <span className="text-xs text-[#414752]">
                  {testPersonas[activePersona].role}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#cde5ff] text-[#004b74] text-xs font-semibold">
                {testPersonas[activePersona].viralityScore}
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#f0eded] text-xs text-[#1c1b1b] leading-relaxed whitespace-pre-line">
              {testPersonas[activePersona].preview}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#727783] pt-1">
              <span>Hook Strength: {testPersonas[activePersona].hookStrength}</span>
              <span className="text-[#004e99] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Prompt validated
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center justify-between">
          <button
            type="button"
            onClick={handleRetest}
            disabled={isRunning}
            className="px-4 py-2 rounded-full bg-[#cde5ff] text-[#004b74] hover:bg-[#93ccff] text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Re-synthesizing...' : 'Re-test Variations'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#f0eded] text-xs font-semibold text-[#1c1b1b] hover:bg-[#e5e2e1]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
