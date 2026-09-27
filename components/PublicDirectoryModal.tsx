'use client';

import React, { useState } from 'react';
import { DIRECTORY_ATTENDEES } from '@/lib/data';
import { DirectoryAttendee } from '@/lib/types';
import { X, Search, ExternalLink, ThumbsUp, MessageSquare, Award, Check } from 'lucide-react';

interface PublicDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseAttendeeContent?: (attendee: DirectoryAttendee) => void;
  onToast: (title: string, desc: string) => void;
}

export function PublicDirectoryModal({
  isOpen,
  onClose,
  onUseAttendeeContent,
  onToast,
}: PublicDirectoryModalProps) {
  const [filter, setFilter] = useState<'All' | 'Attendee' | 'Speaker'>('All');
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'pre' | 'post'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = DIRECTORY_ATTENDEES.filter((att) => {
    const matchesFilter = filter === 'All' || att.badgeType === filter;
    const matchesPhase = phaseFilter === 'all' || att.phase === phaseFilter;
    const matchesSearch =
      att.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesPhase && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004e99] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">Verified Attendee Directory</h3>
              <p className="text-xs text-[#414752]">
                Explore authorized badges & live LinkedIn posts segregated by Pre-Event and Post-Event phases.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#e5e2e1] text-[#727783] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Segregation Filters Bar */}
        <div className="p-4 border-b border-[#f0eded] bg-[#ffffff] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#727783] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, company, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f6f3f2] rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
              />
            </div>
            {/* Phase segregation pills */}
            <div className="flex items-center gap-1 bg-[#f6f3f2] p-1 rounded-lg text-xs self-start sm:self-center border border-[#e5e2e1]">
              <button
                type="button"
                onClick={() => setPhaseFilter('all')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  phaseFilter === 'all'
                    ? 'bg-white text-[#0a66c2] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                All Phases
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
                🗓️ Pre-Event Passes
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
                🏆 Post-Event Recaps
              </button>
            </div>
          </div>

          {/* Sub filter by role */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#f6f3f2]">
            <span className="text-[11px] text-[#727783]">Filter attendee role:</span>
            <div className="flex items-center gap-1.5">
              {(['All', 'Attendee', 'Speaker'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-[#004e99] text-white shadow-xs'
                      : 'bg-[#f6f3f2] text-[#414752] hover:text-[#1c1b1b]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#e5e2e1] hover:border-[#0a66c2] transition-all bg-[#fcf9f8] flex flex-col justify-between gap-3 shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.photoUrl}
                        alt={item.name}
                        className="w-11 h-11 rounded-lg object-cover ring-1 ring-[#e5e2e1]"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-[#1c1b1b]">{item.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
                            {item.badgeType}
                          </span>
                        </div>
                        <span className="text-xs text-[#414752] truncate max-w-[170px]">
                          {item.role} @ {item.company}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-[#727783]">{item.passId}</span>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-sm ${
                              item.phase === 'post'
                                ? 'bg-[#e8f5e9] text-[#2e7d32]'
                                : 'bg-[#e3f2fd] text-[#1565c0]'
                            }`}
                          >
                            {item.phase === 'post' ? 'Post-Event' : 'Pre-Event'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#1c1b1b] mt-3 line-clamp-3 bg-white p-2.5 rounded-lg border border-[#f0eded] leading-relaxed">
                    {item.postPreview}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0eded] text-[11px] text-[#727783]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[#004e99] font-medium">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {item.reactions}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {item.comments}
                    </span>
                  </div>
                  {onUseAttendeeContent && (
                    <button
                      type="button"
                      onClick={() => {
                        onUseAttendeeContent(item);
                        onClose();
                        onToast('Attendee Loaded', `Loaded ${item.name}'s details into the Magic Tool.`);
                      }}
                      className="text-xs font-semibold text-[#0a66c2] hover:underline"
                    >
                      Load into Studio →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#727783] text-sm">
              No matching attendees found for &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center justify-between">
          <span className="text-xs text-[#414752]">
            Total {DIRECTORY_ATTENDEES.length} registered attendees tracked in campaign
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#f0eded] text-xs font-semibold text-[#1c1b1b] hover:bg-[#e5e2e1]"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
