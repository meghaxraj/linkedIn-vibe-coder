'use client';

import React, { useState } from 'react';
import { Speaker } from '@/lib/types';
import { SPEAKERS_LIST } from '@/lib/data';
import { X, Mic, Plus, CheckCircle, Sparkles, UserPlus } from 'lucide-react';

interface ManageSpeakersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpeaker?: (speaker: Speaker) => void;
  onToast: (title: string, desc: string) => void;
}

export function ManageSpeakersModal({
  isOpen,
  onClose,
  onSelectSpeaker,
  onToast,
}: ManageSpeakersModalProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>(SPEAKERS_LIST);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [isKeynote, setIsKeynote] = useState(false);

  if (!isOpen) return null;

  const handleAddSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTopic.trim()) return;

    const newSpeaker: Speaker = {
      id: `spk-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'Distinguished Engineer',
      company: newCompany.trim() || 'Tech Innovators',
      topic: newTopic.trim(),
      photoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      isKeynote,
    };

    setSpeakers([newSpeaker, ...speakers]);
    setNewName('');
    setNewRole('');
    setNewCompany('');
    setNewTopic('');
    setIsAdding(false);
    onToast(
      'Speaker Added to Ingestion',
      `"${newSpeaker.name}" is now indexed. Attendee generation prompts will include mention hooks.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004e99] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">Keynote & Panel Speakers</h3>
              <p className="text-xs text-[#414752]">
                PostSpark parses these profiles to boost LinkedIn algorithm reach by up to 3.2x.
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

        {/* Content list & Add Form */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#727783]">
              {speakers.length} Featured Speakers Ingested
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="text-xs font-semibold text-[#0a66c2] hover:text-[#004e99] flex items-center gap-1 bg-[#cde5ff] px-3 py-1.5 rounded-full transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isAdding ? 'Cancel' : 'Add Speaker'}</span>
            </button>
          </div>

          {isAdding && (
            <form
              onSubmit={handleAddSpeaker}
              className="p-4 rounded-xl bg-[#f6f3f2] border border-[#c1c6d4] flex flex-col gap-3"
            >
              <span className="text-xs font-bold text-[#1c1b1b]">Register New Summit Speaker</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name (e.g. Dr. Jordan Lee)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 text-xs bg-white rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Chief Scientist)"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="px-3 py-2 text-xs bg-white rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Company / Affiliation"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="px-3 py-2 text-xs bg-white rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
                />
                <label className="flex items-center gap-2 text-xs text-[#1c1b1b] cursor-pointer pl-1">
                  <input
                    type="checkbox"
                    checked={isKeynote}
                    onChange={(e) => setIsKeynote(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0a66c2] focus:ring-0"
                  />
                  <span>Mark as Main Stage Keynote</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Talk Topic (e.g. High-throughput Multi-Agent Architectures)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="px-3 py-2 text-xs bg-white rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
                required
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-[#0a66c2] text-white text-xs font-semibold hover:bg-[#004e99] transition-all self-end"
              >
                Save & Index Speaker
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-3">
            {speakers.map((spk) => (
              <div
                key={spk.id}
                className="p-3.5 rounded-xl bg-white border border-[#e5e2e1] hover:border-[#0a66c2] transition-all flex items-start justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={spk.photoUrl}
                    alt={spk.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-[#e5e2e1] shrink-0"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1c1b1b]">{spk.name}</span>
                      {spk.isKeynote && (
                        <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold uppercase">
                          Keynote
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#414752]">
                      {spk.role} • {spk.company}
                    </span>
                    <span className="text-xs text-[#006398] font-medium mt-1 line-clamp-1">
                      &ldquo;{spk.topic}&rdquo;
                    </span>
                  </div>
                </div>

                {onSelectSpeaker && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpeaker(spk);
                      onClose();
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#f6f3f2] hover:bg-[#cde5ff] text-xs font-semibold text-[#0a66c2] transition-colors"
                  >
                    Draft Post
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center justify-between">
          <span className="text-xs text-[#727783] flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#004e99]" />
            All speakers synced with LinkedIn Speakers Directory
          </span>
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
