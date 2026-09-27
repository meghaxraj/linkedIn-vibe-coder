'use client';

import React, { useState } from 'react';
import { EventConfig, Speaker, DirectoryAttendee } from '@/lib/types';
import {
  Sparkles,
  Calendar,
  Clock,
  Tag,
  Link as LinkIcon,
  CheckCircle,
  Copy,
  Download,
  Share2,
  Users,
  TrendingUp,
  RefreshCw,
  Rocket,
  Eye,
  Plus,
  X,
  Lightbulb,
  Radio,
  FileCheck,
  CheckCircle2,
  Mic,
  ChevronRight,
  Flame,
  ThumbsUp,
  Building,
  Award,
} from 'lucide-react';

interface OrganizerDashboardProps {
  config: EventConfig;
  onChangeConfig: (newConfig: Partial<EventConfig>) => void;
  onOpenDirectory: () => void;
  onOpenTemplates: () => void;
  onOpenManageSpeakers: () => void;
  onOpenTestPrompt: () => void;
  onSwitchToAttendeeMagic: () => void;
  onToast: (title: string, desc: string, type?: 'success' | 'info' | 'warning') => void;
}

export function OrganizerDashboard({
  config,
  onChangeConfig,
  onOpenDirectory,
  onOpenTemplates,
  onOpenManageSpeakers,
  onOpenTestPrompt,
  onSwitchToAttendeeMagic,
  onToast,
}: OrganizerDashboardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSummarizing, setIsAutoSummarizing] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [showAddTopicInput, setShowAddTopicInput] = useState(false);
  const [streamFilter, setStreamFilter] = useState<'all' | 'pre' | 'post'>('all');

  const copyMagicLink = (phase: 'pre' | 'post' = 'pre') => {
    const fullUrl = `https://postspark.app/events/summit2025/magic?phase=${phase}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      onToast(
        phase === 'post' ? 'Post-Event Magic Link Copied' : 'Pre-Event Magic Link Copied',
        phase === 'post'
          ? 'Ready to send in post-summit thank-you emails for attendee takeaways & slides.'
          : 'Ready to paste in confirmation emails for attendee passes and badge cards.'
      );
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onToast('Event Synced Successfully', 'All AI prompt weights and attendee badges updated.');
    }, 900);
  };

  const handleLaunchCampaign = () => {
    const isCurrentlyLive = config.campaignStatus === 'Live';
    const nextStatus = isCurrentlyLive ? 'Active Draft' : 'Live';
    onChangeConfig({ campaignStatus: nextStatus });
    onToast(
      isCurrentlyLive ? 'Campaign Switched to Draft' : 'Campaign Launched Successfully! 🚀',
      isCurrentlyLive
        ? 'Draft mode active. Attendee link is still accessible in preview mode.'
        : 'Live mode active! Automated post tracking and LinkedIn feed webhooks are running.'
    );
  };

  const handleAutoSummarize = async () => {
    setIsAutoSummarizing(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'summarize_theme',
          payload: {
            eventTitle: config.name,
            rawNotes: config.theme,
          },
        }),
      });
      const data = await res.json();
      if (data.theme) {
        onChangeConfig({ theme: data.theme });
        onToast('Theme Optimized by Gemini', 'Polished value proposition updated for all attendee post prompts.');
      }
    } catch (e) {
      onChangeConfig({
        theme:
          'Accelerating Enterprise AI Workflows: Real-World Multi-Agent Systems, Governance Standards, and Cloud-Native Scalability.',
      });
      onToast('Theme Refined', 'Value proposition synthesized by PostSpark AI.');
    } finally {
      setIsAutoSummarizing(false);
    }
  };

  const handleAddTopic = () => {
    if (!newTopicInput.trim()) return;
    if (config.topics.includes(newTopicInput.trim())) {
      onToast('Topic Exists', 'This pillar is already in the event prompt weights.', 'info');
      return;
    }
    onChangeConfig({ topics: [...config.topics, newTopicInput.trim()] });
    setNewTopicInput('');
    setShowAddTopicInput(false);
    onToast('Topic Added', `"${newTopicInput.trim()}" will now be woven into post hooks.`);
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    onChangeConfig({
      topics: config.topics.filter((t) => t !== topicToRemove),
    });
  };

  const downloadQRCodePNG = () => {
    // Generate a downloadable QR code image on canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 400);

      ctx.fillStyle = '#004e99';
      // Draw outer frame
      ctx.fillRect(40, 40, 320, 320);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(56, 56, 288, 288);

      // Draw QR simulation matrix
      ctx.fillStyle = '#0a66c2';
      // Top left square
      ctx.fillRect(72, 72, 80, 80);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(88, 88, 48, 48);
      ctx.fillStyle = '#0a66c2';
      ctx.fillRect(100, 100, 24, 24);

      // Top right square
      ctx.fillRect(248, 72, 80, 80);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(264, 88, 48, 48);
      ctx.fillStyle = '#0a66c2';
      ctx.fillRect(276, 100, 24, 24);

      // Bottom left square
      ctx.fillRect(72, 248, 80, 80);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(88, 264, 48, 48);
      ctx.fillStyle = '#0a66c2';
      ctx.fillRect(100, 276, 24, 24);

      // Center decorative elements
      ctx.fillRect(176, 176, 48, 48);
      ctx.fillStyle = '#004e99';
      ctx.fillRect(160, 80, 24, 40);
      ctx.fillRect(200, 260, 40, 20);

      // Download
      const link = document.createElement('a');
      link.download = 'summit2025_badge_qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      onToast('QR Code Downloaded', 'Saved high-res PNG for lanyard prints & slide decks.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Banner / Campaign Setup Header */}
      <section className="w-full bg-white rounded-xl p-6 md:p-8 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#cde5ff] text-[#004b74]">
                <span className="w-2 h-2 rounded-full bg-[#004e99] animate-pulse" />
                Campaign Status: {config.campaignStatus}
              </span>
              <span className="text-xs text-[#414752] flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                Synced 4 mins ago with LinkedIn Events API
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl text-[#1c1b1b] tracking-tight font-bold mt-1">
              Event Campaign Setup
            </h1>
            <p className="text-sm text-[#414752] max-w-3xl leading-relaxed">
              Configure event details to power AI-generated attendee and speaker social posts. PostSpark tunes the tone, custom hashtags, and key takeaways across attendee feeds.
            </p>

            {/* Campaign Phase Segregator Control */}
            <div className="flex items-center gap-1 bg-[#f0eded] p-1 rounded-full border border-[#e5e2e1] text-xs self-start mt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#414752] pl-2 pr-1">
                Active Phase:
              </span>
              <button
                type="button"
                onClick={() => {
                  onChangeConfig({ activePhase: 'pre' });
                  onToast('Phase Updated', 'Campaign set to Pre-Event Hype (pass generation & speaker previews).');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  config.activePhase === 'pre'
                    ? 'bg-[#0a66c2] text-white shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                Pre-Event Hype
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeConfig({ activePhase: 'post' });
                  onToast('Phase Updated', 'Campaign set to Post-Event Debrief (key takeaways & session slides).');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  config.activePhase === 'post'
                    ? 'bg-[#0a66c2] text-white shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                Post-Event Debrief
              </button>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={onOpenDirectory}
              className="h-10 px-4 rounded-full bg-[#f6f3f2] text-[#1c1b1b] text-sm font-semibold hover:bg-[#f0eded] border border-[#e5e2e1] transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Eye className="w-4 h-4 text-[#004e99]" />
              <span>Public Directory</span>
            </button>
            <button
              type="button"
              onClick={handleLaunchCampaign}
              className={`h-10 px-5 rounded-full text-white text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                config.campaignStatus === 'Live'
                  ? 'bg-[#004e99] hover:bg-[#006398]'
                  : 'bg-[#0a66c2] hover:bg-[#004e99]'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>{config.campaignStatus === 'Live' ? 'Campaign is Live' : 'Launch Campaign'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Counter Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-[#f6f3f2] rounded-xl p-4 flex items-center gap-4 border border-[#e5e2e1] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#004e99] shadow-xs shrink-0 border border-[#e5e2e1]">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#414752] uppercase tracking-wider font-semibold">Attendees Tracked</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#1c1b1b]">{config.attendeesTracked}</span>
                <span className="text-xs text-[#004e99] font-bold flex items-center">
                  ↑ +18%
                </span>
              </div>
              <span className="text-xs text-[#727783]">Registered & verified</span>
            </div>
          </div>

          <div className="bg-[#f6f3f2] rounded-xl p-4 flex items-center gap-4 border border-[#e5e2e1] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#006398] shadow-xs shrink-0 border border-[#e5e2e1]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#414752] uppercase tracking-wider font-semibold">Posts Generated</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#1c1b1b]">{config.postsGenerated}</span>
                <span className="text-xs text-[#006398] font-bold">26% conversion</span>
              </div>
              <span className="text-xs text-[#727783]">42 shared directly to LinkedIn</span>
            </div>
          </div>

          <div className="bg-[#f6f3f2] rounded-xl p-4 flex items-center gap-4 border border-[#e5e2e1] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0a66c2] shadow-xs shrink-0 border border-[#e5e2e1]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#414752] uppercase tracking-wider font-semibold">Organic Reach Multiplier</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#1c1b1b]">{config.reachMultiplier}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-[10px] font-bold">
                  High Impact
                </span>
              </div>
              <span className="text-xs text-[#727783]">Est. 214.5k impression boost</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Dashboard: 2-Column Split (7:5 Ratio on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main Configuration Form (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex flex-col gap-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#cde5ff] flex items-center justify-center text-[#0a66c2]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1c1b1b]">Event Fundamentals & AI Context</h2>
                  <p className="text-xs text-[#414752]">
                    PostSpark analyzes these signals to compose authentic, high-converting social posts.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#f6f3f2] text-[#414752] text-xs font-semibold">
                Step 1 of 3
              </span>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Input 1: Event Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c1b1b] flex items-center justify-between">
                  <span>
                    Event Name <span className="text-[#ba1a1a]">*</span>
                  </span>
                  <span className="text-xs text-[#727783] font-normal">Displayed on badge cards</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => onChangeConfig({ name: e.target.value })}
                    placeholder="e.g., Global AI & Cloud Architecture Summit 2025"
                    className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none transition-all shadow-xs"
                  />
                  <Building className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                </div>
                <p className="text-[11px] text-[#727783]">
                  Recommended: Include the year and focus domain to avoid ambiguous LLM prompts.
                </p>
              </div>

              {/* Input 2: Date & Time Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]">
                    Event Date <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={config.date}
                      onChange={(e) => onChangeConfig({ date: e.target.value })}
                      placeholder="e.g., Oct 24, 2025"
                      className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none transition-all shadow-xs"
                    />
                    <Calendar className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]">
                    Time & Format <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={config.timeFormat}
                      onChange={(e) => onChangeConfig({ timeFormat: e.target.value })}
                      placeholder="e.g., 09:00 AM PST - Hybrid"
                      className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none transition-all shadow-xs"
                    />
                    <Clock className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Input 3: Event Theme & Value Prop */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c1b1b] flex items-center justify-between">
                  <span>Primary Theme & Value Proposition</span>
                  <button
                    type="button"
                    onClick={handleAutoSummarize}
                    disabled={isAutoSummarizing}
                    className="text-xs text-[#0a66c2] hover:text-[#004e99] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isAutoSummarizing ? 'animate-spin' : ''}`} />
                    <span>{isAutoSummarizing ? 'Summarizing...' : '✨ Auto-summarize'}</span>
                  </button>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={config.theme}
                    onChange={(e) => onChangeConfig({ theme: e.target.value })}
                    className="w-full p-3.5 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none transition-all shadow-xs leading-relaxed"
                    placeholder="e.g., Scaling Enterprise AI with Responsible Governance..."
                  />
                </div>
                <span className="text-[11px] text-[#727783]">
                  PostSpark extracts narrative angles from this statement to frame attendees as industry thought leaders.
                </span>
              </div>

              {/* Input 4: Core Topics Pill Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#1c1b1b] flex items-center justify-between">
                  <span>Core Topics & Pillars (Pills feed dynamic post variations)</span>
                  <span className="text-xs text-[#727783]">{config.topics.length} active</span>
                </label>

                <div className="p-3 bg-[#f6f3f2] rounded-xl flex flex-wrap items-center gap-2 border border-[#e5e2e1]">
                  {config.topics.map((topic, i) => {
                    const dotColors = ['bg-[#004e99]', 'bg-[#0a66c2]', 'bg-[#006398]', 'bg-[#45505c]'];
                    return (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#1c1b1b] text-xs font-semibold shadow-xs border border-[#e5e2e1] transition-all hover:bg-[#f0eded]"
                      >
                        <span className={`w-2 h-2 rounded-full ${dotColors[i % dotColors.length]}`} />
                        {topic}
                        <button
                          type="button"
                          onClick={() => handleRemoveTopic(topic)}
                          className="text-[#727783] hover:text-[#ba1a1a] ml-1 font-bold text-sm leading-none"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}

                  {showAddTopicInput ? (
                    <div className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-[#0a66c2]">
                      <input
                        type="text"
                        placeholder="New topic..."
                        value={newTopicInput}
                        onChange={(e) => setNewTopicInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddTopic();
                          if (e.key === 'Escape') setShowAddTopicInput(false);
                        }}
                        autoFocus
                        className="text-xs text-[#1c1b1b] focus:outline-none w-28 px-1"
                      />
                      <button
                        type="button"
                        onClick={handleAddTopic}
                        className="text-xs font-bold text-[#0a66c2] hover:text-[#004e99]"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddTopicInput(false)}
                        className="text-xs text-[#727783] hover:text-[#1c1b1b]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddTopicInput(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#cde5ff] text-[#004b74] hover:bg-[#93ccff] text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Topic</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Additional Organizers Options: Audience, Hashtags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]">Target Audience Personas</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={config.audience}
                      onChange={(e) => onChangeConfig({ audience: e.target.value })}
                      className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none shadow-xs"
                    />
                    <Users className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]">Official Event Hashtags</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={config.hashtags}
                      onChange={(e) => onChangeConfig({ hashtags: e.target.value })}
                      className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none shadow-xs font-medium text-[#0a66c2]"
                    />
                    <Tag className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>

              {/* LinkedIn Event Page URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c1b1b] flex items-center justify-between">
                  <span>LinkedIn Event Page URL</span>
                  <span className="text-xs text-[#006398] font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Auto-Sync Enabled
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={config.linkedInUrl}
                    onChange={(e) => onChangeConfig({ linkedInUrl: e.target.value })}
                    className="w-full h-11 px-3.5 pl-10 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] text-sm focus:border-[#0a66c2] focus:outline-none shadow-xs"
                  />
                  <LinkIcon className="w-4 h-4 text-[#727783] absolute left-3 top-3.5" />
                </div>
                <p className="text-[11px] text-[#727783]">
                  PostSpark automatically imports registered speaker profiles and registration badges from this link.
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#f0eded]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-11 px-6 rounded-full bg-[#0a66c2] text-white text-sm font-semibold hover:bg-[#004e99] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                    <span>{isSaving ? 'Saving Changes...' : 'Save & Sync Event Data'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenTestPrompt}
                    className="h-11 px-4 rounded-full bg-[#cde5ff] text-[#004b74] hover:bg-[#93ccff] text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden md:inline">Test AI Prompt</span>
                  </button>
                </div>

                {/* Instant Link Preview Chip */}
                <div className="flex items-center justify-between sm:justify-end gap-2 bg-[#f6f3f2] px-3 py-1.5 rounded-full border border-[#e5e2e1]">
                  <span className="text-xs text-[#414752] flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#004e99]" />
                    Magic URL Ready
                  </span>
                  <button
                    type="button"
                    onClick={() => copyMagicLink(config.activePhase || 'pre')}
                    title="Copy Magic Link"
                    className="p-1 text-[#0a66c2] hover:text-[#004e99] transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Context Visual Card (Speaker AI Ingestion Status) */}
          <div className="bg-white rounded-xl p-4 md:p-5 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#eae7e7] flex items-center justify-center shrink-0 text-[#004e99]">
                <Mic className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1c1b1b]">14 Keynote & Panel Speakers Parsed</span>
                <span className="text-xs text-[#414752] leading-relaxed">
                  PostSpark automatically customized tone presets for attendee engagement posts mentioning speakers.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenManageSpeakers}
              className="shrink-0 h-9 px-3.5 rounded-full bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#eae7e7] border border-[#e5e2e1] text-xs font-semibold transition-all cursor-pointer"
            >
              Manage Speakers
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Campaign Quick Launch & Live Stream (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* CARD 1: Campaign Quick Launch & Attendee Share Kit */}
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#004e99]" />
                <h3 className="text-sm font-bold text-[#1c1b1b]">Attendee Share Kit & Magic Link</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-xs font-semibold">
                1-Click Viral Loop
              </span>
            </div>
            <p className="text-xs text-[#414752] leading-relaxed">
              Provide this personalized link to registered guests in confirmation emails and attendee welcome packets. It pre-populates customized LinkedIn posts with their name and badge!
            </p>

            {/* Magic Link Box with Pre & Post Segregation */}
            <div className="bg-[#f6f3f2] rounded-xl p-4 flex flex-col gap-3 border border-[#e5e2e1]">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#414752] font-semibold">Attendee Magic Tool Access URLs</label>
                <span className="text-[10px] text-[#006398] bg-[#cde5ff] px-2 py-0.5 rounded-full font-bold">
                  2 Segmented Links
                </span>
              </div>

              {/* Pre-Event Link */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#1c1b1b] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#004e99]" />
                  <span>1. Pre-Event Link (Passes & Speaker Teasers)</span>
                </span>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-[#e5e2e1] shadow-xs">
                  <LinkIcon className="w-3.5 h-3.5 text-[#727783] shrink-0" />
                  <span className="text-xs text-[#1c1b1b] font-medium truncate select-all flex-1">
                    postspark.app/events/summit2025/magic?phase=pre
                  </span>
                  <button
                    type="button"
                    onClick={() => copyMagicLink('pre')}
                    className="px-2.5 py-1 rounded-full bg-[#0a66c2] text-white text-[11px] font-semibold hover:bg-[#004e99] transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Post-Event Link */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#1c1b1b] flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#006398]" />
                  <span>2. Post-Event Link (Takeaways & Debriefs)</span>
                </span>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-[#e5e2e1] shadow-xs">
                  <LinkIcon className="w-3.5 h-3.5 text-[#727783] shrink-0" />
                  <span className="text-xs text-[#1c1b1b] font-medium truncate select-all flex-1">
                    postspark.app/events/summit2025/magic?phase=post
                  </span>
                  <button
                    type="button"
                    onClick={() => copyMagicLink('post')}
                    className="px-2.5 py-1 rounded-full bg-[#cde5ff] text-[#004b74] text-[11px] font-semibold hover:bg-[#93ccff] transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* QR Preview & Embed Specs */}
              <div className="flex items-center justify-between pt-1 gap-3 border-t border-[#e5e2e1]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-xs border border-[#e5e2e1] flex items-center justify-center shrink-0">
                    <svg className="w-full h-full text-[#1c1b1b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h2v2h-2zM18 14h3v3h-3zM14 19h3v2h-3zM19 19h2v2h-2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1c1b1b]">Event Badge QR Code</span>
                    <span className="text-[10px] text-[#727783]">For print banners, lanyards & slide decks.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadQRCodePNG}
                  className="h-8 px-2.5 rounded-lg bg-[#f0eded] text-[#1c1b1b] hover:bg-[#eae7e7] text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Automation Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#1c1b1b]">Auto-Approve Attendee Posts</span>
                <span className="text-[11px] text-[#727783]">Allow instant sharing without manual organizer moderation</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.autoApprove}
                  onChange={(e) => onChangeConfig({ autoApprove: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#e5e2e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004e99]" />
              </label>
            </div>

            {/* Launch into Attendee Studio CTA */}
            <button
              type="button"
              onClick={onSwitchToAttendeeMagic}
              className="w-full py-2.5 rounded-lg bg-[#cde5ff] text-[#004b74] hover:bg-[#93ccff] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preview Magic Tool as Attendee →</span>
            </button>
          </div>

          {/* CARD 2: Live Post Inspiration Stream (Miniature Previews with Pre/Post Filter) */}
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#006398]" />
                <h3 className="text-sm font-bold text-[#1c1b1b]">Live Post Inspiration Stream</h3>
              </div>
              <span className="text-xs text-[#727783]">3 Presets Active</span>
            </div>

            {/* Stream Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#f0eded] p-1 rounded-lg border border-[#e5e2e1] text-xs">
              <button
                type="button"
                onClick={() => setStreamFilter('all')}
                className={`flex-1 py-1 rounded-md font-semibold transition-all cursor-pointer text-center ${
                  streamFilter === 'all'
                    ? 'bg-white text-[#0a66c2] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                All (89)
              </button>
              <button
                type="button"
                onClick={() => setStreamFilter('pre')}
                className={`flex-1 py-1 rounded-md font-semibold transition-all cursor-pointer text-center ${
                  streamFilter === 'pre'
                    ? 'bg-white text-[#0a66c2] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                Pre-Event (54)
              </button>
              <button
                type="button"
                onClick={() => setStreamFilter('post')}
                className={`flex-1 py-1 rounded-md font-semibold transition-all cursor-pointer text-center ${
                  streamFilter === 'post'
                    ? 'bg-white text-[#0a66c2] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                Post-Event (35)
              </button>
            </div>

            {/* Pre-Event Post 1: Elena Vance */}
            {(streamFilter === 'all' || streamFilter === 'pre') && (
              <div className="bg-[#f6f3f2] rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNIN6xwe_RNZrGtYBEZ38zK67utUVva0jBBzjc6Yd9Tu7SG_MNS7N4KS2MUf85F6T2IrZap6vZ2NhGQ927Xs86HO-VMxvgTAnm9JNh_mqwngYcNU0L3ma2qrvWLbS1yLNkmQ4FPy6PIttsLxGUUffrtec5ImiU2oL6niZ0D_MZbgUi-FEMGHR-p9tLfdLMZpU7wtM91aHK4j3GHgy8dpcBO0hQg5t5YoWMgPifD7Pp6vATSvRoddp3"
                      alt="Elena Vance"
                      className="w-8 h-8 rounded-full object-cover shadow-xs"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1b1b] leading-tight">Elena Vance • VP of Cloud AI</span>
                      <span className="text-[10px] text-[#727783] leading-tight">Shared 22m ago • Pre-Event Pass</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-[10px] font-bold">
                    Pre-Event Hype
                  </span>
                </div>
                <p className="text-xs text-[#1c1b1b] line-clamp-3 leading-relaxed">
                  Excited to announce I&apos;ll be attending the <strong>#GlobalAISummit2025</strong> in SF this October! Looking forward to diving into autonomous agent governance and real-world enterprise LLM architectures. Who else from my network will be there? Let&apos;s connect! 🚀
                </p>
                <div className="flex items-center justify-between text-[#727783] text-[11px] pt-1 border-t border-[#e5e2e1]">
                  <span className="flex items-center gap-1 font-medium text-[#004e99]">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    142 Reactions • 28 Comments
                  </span>
                  <span className="text-xs text-[#006398] font-bold">9.4% Virality Score</span>
                </div>
              </div>
            )}

            {/* Pre-Event Post 2: Marcus Chen */}
            {(streamFilter === 'all' || streamFilter === 'pre') && (
              <div className="bg-[#f6f3f2] rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeiIl1uI-syHO1utUx8iRkNMjoYL8pslFKswjnVm1I71LkgKZnaT0LGgY9FuuMXlcs7Jnf-i8FRYDYoKwl2Ho8bRrvlczIDF29KBTUw2Z_VlygUgC9Hipf9QV0MWoGE5t9Pv4ZWl_XvI06HN2eC8DeJ-BboIl2WxEcp_G0uW7OUlnUH3jGUhDGiPOw8m4Xq9a3u_uNmjbJcsWkgilWCF8LfzaShzZPuDDMkSmbqbY_5GP6Ch-3LVaa"
                      alt="Marcus Chen"
                      className="w-8 h-8 rounded-full object-cover shadow-xs"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1b1b] leading-tight">Marcus Chen • Chief Architect</span>
                      <span className="text-[10px] text-[#727783] leading-tight">Keynote Talk Teaser</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#eae7e7] text-[#1c1b1b] text-[10px] font-bold">
                    Speaker Preview
                  </span>
                </div>
                <p className="text-xs text-[#1c1b1b] line-clamp-3 leading-relaxed">
                  Honored to keynote at <strong>Global AI & Cloud Architecture Summit 2025</strong>! I&apos;ll be breaking down zero-downtime migrations to distributed LLM clusters. Grab your ticket via the link below: <strong>#CloudSummit</strong>
                </p>
                <div className="flex items-center justify-between text-[#727783] text-[11px] pt-1 border-t border-[#e5e2e1]">
                  <span className="flex items-center gap-1 font-medium text-[#004e99]">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    318 Reactions • 54 Comments
                  </span>
                  <span className="text-xs text-[#004e99] font-bold">Trending #1</span>
                </div>
              </div>
            )}

            {/* Post-Event Post 1: Amara Okafor */}
            {(streamFilter === 'all' || streamFilter === 'post') && (
              <div className="bg-[#f6f3f2] rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                      alt="Amara Okafor"
                      className="w-8 h-8 rounded-full object-cover shadow-xs"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1b1b] leading-tight">Amara Okafor • Head of AI Governance</span>
                      <span className="text-[10px] text-[#727783] leading-tight">Shared 4h ago • Post-Event Debrief</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
                    Top Takeaways
                  </span>
                </div>
                <p className="text-xs text-[#1c1b1b] line-clamp-3 leading-relaxed">
                  What an exhilarating 3 days at <strong>#GlobalAISummit2025</strong>! 🌟 Key takeaways: 1. Autonomous agent guardrails must be deterministic. 2. Real-time observability beats post-hoc audit logs every time. Huge gratitude to the organizers and builders!
                </p>
                <div className="flex items-center justify-between text-[#727783] text-[11px] pt-1 border-t border-[#e5e2e1]">
                  <span className="flex items-center gap-1 font-medium text-[#004e99]">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    215 Reactions • 42 Comments
                  </span>
                  <span className="text-xs text-[#006398] font-bold">9.7% Virality Score</span>
                </div>
              </div>
            )}

            {/* Post-Event Post 2: David Lindqvist */}
            {(streamFilter === 'all' || streamFilter === 'post') && (
              <div className="bg-[#f6f3f2] rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
                      alt="David Lindqvist"
                      className="w-8 h-8 rounded-full object-cover shadow-xs"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1b1b] leading-tight">David Lindqvist • Staff ML Engineer</span>
                      <span className="text-[10px] text-[#727783] leading-tight">Shared 6h ago • Slides & Code Share</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#eae7e7] text-[#1c1b1b] text-[10px] font-bold">
                    Speaker Recap
                  </span>
                </div>
                <p className="text-xs text-[#1c1b1b] line-clamp-3 leading-relaxed">
                  Post-summit debrief: Packed Moscone room for our session on distributed GPU caching! Architecture diagrams and benchmark scripts uploaded. Link in comments! <strong>#GlobalAISummit</strong>
                </p>
                <div className="flex items-center justify-between text-[#727783] text-[11px] pt-1 border-t border-[#e5e2e1]">
                  <span className="flex items-center gap-1 font-medium text-[#004e99]">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    189 Reactions • 31 Comments
                  </span>
                  <span className="text-xs text-[#004e99] font-bold">High Engagement</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onOpenTemplates}
              className="w-full py-2 rounded-lg bg-[#f6f3f2] text-[#004e99] hover:bg-[#eae7e7] text-xs font-bold text-center transition-colors cursor-pointer"
            >
              View All 89 Generated Posts & Templates →
            </button>
          </div>

          {/* CARD 3: Organizer Tips for LinkedIn Virality */}
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(10,102,194,0.04),0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e2e1] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#45505c]" />
              <h3 className="text-sm font-bold text-[#1c1b1b]">Organizer Amplification Tips</h3>
            </div>
            <ul className="flex flex-col gap-3 text-xs text-[#414752] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#004e99] shrink-0 mt-0.5" />
                <span>
                  <strong>Send Magic Links 14 days prior:</strong> Attendee excitement peaks 2 weeks before the event. Scheduling reminders during this window doubles post volume.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#004e99] shrink-0 mt-0.5" />
                <span>
                  <strong>Tag verified speakers in templates:</strong> Posts that mention featured speakers receive up to <strong>3.2x higher algorithm distribution</strong> on the LinkedIn feed.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#004e99] shrink-0 mt-0.5" />
                <span>
                  <strong>Keep hashtags to 3-5:</strong> LinkedIn&apos;s feed index favors focused tagging rather than generic tag dumping.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
