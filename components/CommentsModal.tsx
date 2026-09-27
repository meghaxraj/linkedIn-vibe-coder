'use client';

import React, { useState } from 'react';
import { X, MessageSquare, ThumbsUp, Send } from 'lucide-react';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (title: string, desc: string) => void;
}

export function CommentsModal({ isOpen, onClose, onToast }: CommentsModalProps) {
  const [comments, setComments] = useState([
    {
      id: 'c1',
      name: 'Michael Chang',
      role: 'Staff Systems Engineer @ CloudScale',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      time: '12m ago',
      text: "Awesome to see this! We're also presenting on Day 2 about multi-agent latency benchmarks. Let's definitely grab a coffee at Moscone West.",
      likes: 8,
    },
    {
      id: 'c2',
      name: 'Jessica Ramos',
      role: 'Engineering Lead @ Nexus Infra',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      time: '34m ago',
      text: 'Congrats Sarah! Great to see TechNova featured as a summit leader. Looking forward to your session takeaways.',
      likes: 4,
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newC = {
      id: `c-${Date.now()}`,
      name: 'Sarah Jenkins',
      role: 'VP of Product Engineering @ TechNova Solutions',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBFjuczMEVfH2YwhQmQSyWNJLUl9TP8SX-NsiSKFlsI3R77jtxRdwAnwaOh93GTJ51ksGy6v-57mN8L6YrRLeWanUaHhL2hL62ZGrcYJWmXSxSFuRZjmDZkfhk1RvBs30k81sHiGZpJwpjEQG8-1ldW5Wz_Vak7WsFBSgxCdh2Us-m9pDcPJAjv6qCD-8Bv883AclgrGbVbv3R1tddGR-yOUkxx-cU55wO2zmo1KE18MDCIVgCpKpjg',
      time: 'Just now',
      text: inputVal.trim(),
      likes: 0,
    };

    setComments([...comments, newC]);
    setInputVal('');
    onToast('Comment Posted', 'Added your response to the LinkedIn discussion thread.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-lg w-full flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0a66c2]" />
            <h3 className="text-base font-bold text-[#1c1b1b]">LinkedIn Post Discussion</h3>
            <span className="text-xs text-[#727783]">({comments.length})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#e5e2e1] text-[#727783] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Feed */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-[#e5e2e1]"
              />
              <div className="flex-1 bg-[#f6f3f2] p-3 rounded-xl flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c1b1b]">{c.name}</span>
                  <span className="text-[10px] text-[#727783]">{c.time}</span>
                </div>
                <span className="text-[10px] text-[#414752] truncate">{c.role}</span>
                <p className="text-xs text-[#1c1b1b] mt-1 leading-relaxed">{c.text}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#727783]">
                  <button type="button" className="hover:text-[#0a66c2] flex items-center gap-1 font-medium">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{c.likes > 0 ? c.likes : 'Like'}</span>
                  </button>
                  <span>•</span>
                  <button type="button" className="hover:text-[#0a66c2] font-medium">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleAddComment} className="p-3 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a comment on LinkedIn..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-white rounded-lg border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2]"
          />
          <button
            type="submit"
            className="p-2 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004e99] transition-colors shrink-0"
            title="Post Comment"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
