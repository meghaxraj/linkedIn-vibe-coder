'use client';

import React from 'react';
import { POST_TEMPLATES } from '@/lib/data';
import { PostTemplate, PostTone } from '@/lib/types';
import { X, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PostTemplate) => void;
}

export function TemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplatesModalProps) {
  const [phaseFilter, setPhaseFilter] = React.useState<'all' | 'pre' | 'post'>('all');

  if (!isOpen) return null;

  const filteredTemplates = POST_TEMPLATES.filter(
    (t) => phaseFilter === 'all' || t.phase === phaseFilter || t.phase === 'all'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004e99] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">LinkedIn Post Templates</h3>
              <p className="text-xs text-[#414752]">
                Curated prompt structures segregated by Pre-Event announcements and Post-Event debriefs.
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

        {/* Phase Filter Tabs */}
        <div className="px-5 py-3 border-b border-[#f0eded] bg-white flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#f6f3f2] p-1 rounded-lg border border-[#e5e2e1] text-xs">
            <button
              type="button"
              onClick={() => setPhaseFilter('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                phaseFilter === 'all'
                  ? 'bg-white text-[#0a66c2] shadow-xs'
                  : 'text-[#414752] hover:text-[#1c1b1b]'
              }`}
            >
              All Templates ({POST_TEMPLATES.length})
            </button>
            <button
              type="button"
              onClick={() => setPhaseFilter('pre')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                phaseFilter === 'pre'
                  ? 'bg-white text-[#0a66c2] shadow-xs'
                  : 'text-[#414752] hover:text-[#1c1b1b]'
              }`}
            >
              🗓️ Pre-Event Hype (4)
            </button>
            <button
              type="button"
              onClick={() => setPhaseFilter('post')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                phaseFilter === 'post'
                  ? 'bg-white text-[#0a66c2] shadow-xs'
                  : 'text-[#414752] hover:text-[#1c1b1b]'
              }`}
            >
              🏆 Post-Event Recaps (4)
            </button>
          </div>
          <span className="text-[11px] text-[#727783] hidden sm:inline">
            1-Click applies prompt & narrative style
          </span>
        </div>

        {/* Templates List */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="p-4 rounded-xl border border-[#e5e2e1] hover:border-[#0a66c2] transition-all bg-[#fcf9f8] flex flex-col justify-between gap-3 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#1c1b1b]">{tmpl.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#414752] mt-1">{tmpl.description}</p>

                  <div className="mt-3 bg-white p-2.5 rounded-lg border border-[#f0eded] text-xs text-[#1c1b1b] leading-relaxed line-clamp-3 italic">
                    &ldquo;{tmpl.previewSnippet}&rdquo;
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[11px] text-[#727783] capitalize">
                    Tone: {tmpl.recommendedTone.replace('_', ' ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate(tmpl);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0a66c2] text-white text-xs font-semibold hover:bg-[#004e99] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#f0eded] text-xs font-semibold text-[#1c1b1b] hover:bg-[#e5e2e1]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
