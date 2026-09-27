'use client';

import React, { useState, useEffect } from 'react';
import { EventConfig, AttendeeProfile, PostTone } from '@/lib/types';
import {
  Sparkles,
  Calendar,
  Clock,
  Check,
  RefreshCw,
  Trash2,
  BadgeAlert,
  Monitor,
  Smartphone,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Send,
  Copy,
  Share2,
  Download,
  MoreHorizontal,
  Globe,
  Brain,
  Award,
  Zap,
  Coffee,
  CheckCircle2,
  Mic,
  Smile,
  Layers,
  Cpu,
} from 'lucide-react';

interface AttendeeMagicToolProps {
  config: EventConfig;
  profile: AttendeeProfile;
  onChangeConfig?: (newConfig: Partial<EventConfig>) => void;
  onChangeProfile: (newProfile: Partial<AttendeeProfile>) => void;
  onOpenChangePhoto: () => void;
  onOpenComments: () => void;
  onToast: (title: string, desc: string, type?: 'success' | 'info' | 'warning') => void;
}

export function AttendeeMagicTool({
  config,
  profile,
  onChangeConfig,
  onChangeProfile,
  onOpenChangePhoto,
  onOpenComments,
  onToast,
}: AttendeeMagicToolProps) {
  const preEventFallbacks: Record<PostTone, string[]> = {
    thought_leader: [
      `Excited to announce I'll be attending the ${config.name} in San Francisco this October! 🚀\n\nLooking forward to deep-diving into practical autonomous agent architectures and learning how leading engineering teams are scaling resilient LLM applications in production.\n\nWill you be there? Let's connect or grab a coffee! Link to registration in comments 👇\n\n#GlobalAISummit #ArtificialIntelligence #SoftwareEngineering #TechLeaders #PostSpark`,
      `As enterprise AI shifts from rapid experiments to mission-critical infrastructure, the conversations at ${config.name} will define 2026 engineering roadmaps.\n\nI'm particularly interested in architectural governance, deterministic fallbacks, and multi-agent coordination.\n\nHeading to Moscone West on Oct 24? Drop a note below—let's exchange benchmark data!\n\n#EnterpriseAI #CloudArchitecture #LLMOps #AILeadership`,
      `Why ${config.name} is on my must-attend calendar this fall:\n\n1. Real-world migration breakdowns (beyond synthetic benchmarks)\n2. Agentic system security and data isolation standards\n3. High-bandwidth conversations with fellow systems architects\n\nLet's connect if you'll be in SF!\n\n#SystemArchitecture #AIProduction #SanFranciscoTech`,
    ],
    casual: [
      `Heading to San Francisco for #${config.name.replace(/\s+/g, '')}! 🎉\n\nCan't wait to catch up with old friends, meet new collaborators, and see what everyone is building with autonomous agents and frontier models.\n\nDrop a comment if you're in town or attending Moscone West—first round of pour-overs is on me! ☕\n\n#SanFranciscoTech #AICommunity #Networking #PostSpark`,
      `October in SF is going to be electric! 🌉\n\nJust grabbed my pass for ${config.name}. Looking forward to the hands-on workshops and catching the latest demos.\n\nWho else is going? Ping me so we can sync schedules!\n\n#AIBuilders #TechConference #SFEvents`,
      `Packed and ready for Moscone West! 🚀 Can't wait to hear how teams are solving autonomous latency bottlenecks. Drop a comment if you want to meet up for lunch or coffee during the summit!\n\n#GlobalAISummit #SFBayArea #CloudDev`,
    ],
    speaker: [
      `Humbled and thrilled to take the stage at ${config.name}! 🎙️\n\nI'll be unpacking "Architecting Production-Grade Autonomous Agents for Enterprise Reliability"—sharing hard-won lessons from scaling multi-agent systems without breaking latency budgets.\n\nSave the date: Oct 24th at 2:30 PM (Stage B). See you there!\n\n#KeynoteSpeaker #AIArchitecture #EnterpriseTech #SystemScale`,
      `Honored to keynote at ${config.name}! ⚡\n\nI'll be breaking down zero-downtime migrations to distributed LLM clusters, multi-tenant context management, and production telemetry.\n\nGrab your ticket via the link below: #CloudSummit #PostSpark`,
      `Sneak preview into my upcoming session at ${config.name}: We'll be doing a live teardown of autonomous agent failover protocols under heavy load.\n\nBring your toughest technical questions—looking forward to an engaging Q&A!\n\n#EnterpriseSoftware #AIKeynote #TechConference`,
    ],
    direct: [
      `Attending: ${config.name}\nWhen: ${config.date}\nWhere: San Francisco (Moscone West)\n\nPrimary focus: Autonomous agent architectures and system scalability.\n\nDM me or comment if you'd like to schedule 15 minutes to chat tech!\n\n#GlobalAISummit #SoftwareEngineering #SanFrancisco`,
      `Confirmed for ${config.name} in SF! 📍\n\nKey priority: Connecting with engineering leads scaling production AI.\n\nLet me know if you'll be there.\n\n#EnterpriseAI #Networking`,
      `Going to ${config.name}. Interested in discussions around scalable AI architectures and infrastructure. Let's connect.\n\n#AIArchitects #CloudTech`,
    ],
  };

  const postEventFallbacks: Record<PostTone, string[]> = {
    thought_leader: [
      `What an incredible 3 days in San Francisco at ${config.name}! 💡\n\nReflecting on the sessions, here are my top 3 takeaways for engineering leaders:\n\n1. Agent autonomy is moving from research demos to hardened multi-tenant infrastructure.\n2. In-context caching and retrieval-aware memory are non-negotiable for sub-second latency.\n3. Deterministic security policies beat stochastic guardrails every single time.\n\nWhat was your standout insight from the summit? Drop your thoughts below!\n\n#GlobalAISummit #EnterpriseAI #EngineeringLeadership #PostSpark`,
      `Back from Moscone West after a jam-packed ${config.name}. 📊\n\nThe biggest industry shift I observed: teams are stopping the debate about foundation model sizes and obsessing over agent orchestration reliability.\n\nParticularly grateful for the sessions diving into fault-tolerant reasoning loops and production observability.\n\nHuge shoutout to the organizers for an unforgettable conference. See you in 2026!\n\n#AIInfrastructure #CloudArchitecture #LLMOps`,
      `3 key themes that will shape enterprise software over the next 12 months, straight from ${config.name}:\n\n• Microservice boundaries are being redrawn around autonomous agent domains.\n• Telemetry is now evaluating semantic drift rather than simple CPU spikes.\n• Cross-disciplinary teams combining AI Ops with distributed infrastructure are pulling ahead.\n\nFull debrief notes in the comments 👇\n\n#SystemArchitecture #AIProduction #SanFranciscoTech`,
    ],
    casual: [
      `Home from San Francisco with a full notebook and so much inspiration! 🚀\n\n${config.name} exceeded all expectations. The best part? The impromptu hallway chats, debate over pour-overs, and finally meeting so many collaborators in person.\n\nHighlight for me was seeing live demos of autonomous systems operating in production.\n\nThank you to everyone who made this summit so memorable! Let's keep in touch. ☕\n\n#SanFranciscoTech #AICommunity #Networking #PostSpark`,
      `What an unforgettable week at Moscone West! 🎉\n\nFrom the opening keynotes to the after-hours meetups, #${config.name.replace(/\s+/g, '')} was pure high-signal energy.\n\nLoved catching up on the latest breakthroughs in developer workflows and model toolchains.\n\nTagging everyone I had coffee with—until next year! 👋\n\n#GlobalAISummit #TechCommunity #SFBayArea`,
      `Can we rewind to #${config.name.replace(/\s+/g, '')} already? 🙌\n\nLearned a ton about production agent deployments, collected great swag, and made lasting connections across the tech ecosystem.\n\nWho's already planning their trip back for 2026?\n\n#AIBuilders #TechConference #SFEvents`,
    ],
    speaker: [
      `Thank you to everyone who packed the room for my keynote at ${config.name}! 🎙️✨\n\nThe energy in Stage B and the caliber of questions around zero-downtime agent migrations and latency budgets was truly humbling.\n\nAs promised, I have open-sourced the architecture slides and benchmark repository. Link is pinned in the comments below 👇\n\nKeep building, and thank you to the summit crew for putting on a world-class production!\n\n#KeynoteSpeaker #AIArchitecture #EnterpriseTech #SystemScale`,
      `Session wrap-up from ${config.name}: ⚡\n\nHonored to present our playbook on scaling multi-agent architectures in high-throughput enterprise environments.\n\nLoved the follow-up discussions in the speaker lounge. If we didn't get to finish our chat, my DMs are open!\n\nSlide deck download link in comments.\n\n#EnterpriseSoftware #AIKeynote #TechConference`,
      `Keynote completed at ${config.name}! 📊\n\nWe broke down real failure modes, latency mitigations, and the migration from monolithic pipelines to distributed reasoning swarms.\n\nRecording and slides will be live on the summit portal next week.\n\n#GlobalAISummit #KeynoteRecap #SoftwareArchitecture`,
    ],
    direct: [
      `Recap: ${config.name} 2025\n\nCore takeaways:\n• Autonomous agents are standardizing on deterministic orchestration.\n• Context window caching cuts inference bills by 60%+.\n• Observability must be end-to-end semantic trace.\n\nSlides and summary notes available upon request.\n\n#GlobalAISummit #SoftwareEngineering #SanFrancisco`,
      `Wrap-up from ${config.name} in SF! 📍\n\nKey learning: Infrastructure resiliency is the number one bottleneck for enterprise AI adoption.\n\nAlways happy to discuss these learnings with anyone building in this space. Reach out!\n\n#EnterpriseAI #Networking`,
      `Attended ${config.name}. Top insight: Agentic architectures are ready for prime time with proper guardrails.\n\nGreat connecting with everyone in SF.\n\n#AIArchitects #CloudTech`,
    ],
  };

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const eventPhase = config.activePhase || 'pre';
  const [selectedTone, setSelectedTone] = useState<PostTone>('thought_leader');
  const [excitedAbout, setExcitedAbout] = useState(
    'Looking forward to diving into autonomous agent architectures and connecting with fellow system architects tackling scale challenges.'
  );
  const [userRoleInput, setUserRoleInput] = useState(
    `${profile.role} @ ${profile.company} | Speaker & AI Practitioner`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVariationIdx, setCurrentVariationIdx] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(84);
  const [copyTooltipVisible, setCopyTooltipVisible] = useState(false);

  const currentFallbacks = eventPhase === 'post' ? postEventFallbacks : preEventFallbacks;
  const [variations, setVariations] = useState<string[]>(currentFallbacks.thought_leader);

  const handlePhaseChange = (newPhase: 'pre' | 'post') => {
    onChangeConfig?.({ activePhase: newPhase });
    const fallbacks = newPhase === 'post' ? postEventFallbacks : preEventFallbacks;
    setVariations(fallbacks[selectedTone]);
    setCurrentVariationIdx(0);
    if (newPhase === 'post') {
      setExcitedAbout(
        'Top takeaways on autonomous agent orchestration, context caching benchmarks, and meeting so many incredible builders in SF.'
      );
      onToast(
        'Post-Event Mode Activated',
        'Composer configured for summit debriefs, takeaways, and speaker slides.'
      );
    } else {
      setExcitedAbout(
        'Looking forward to diving into autonomous agent architectures and connecting with fellow system architects tackling scale challenges.'
      );
      onToast(
        'Pre-Event Mode Activated',
        'Composer configured for pass announcements, talk teasers, and networking hype.'
      );
    }
  };

  const handleToneChange = (tone: PostTone) => {
    setSelectedTone(tone);
    const fallbacks = eventPhase === 'post' ? postEventFallbacks : preEventFallbacks;
    setVariations(fallbacks[tone]);
    setCurrentVariationIdx(0);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_post',
          payload: {
            attendeeName: profile.name,
            role: userRoleInput,
            eventName: config.name,
            eventDate: config.date,
            eventLocation: 'San Francisco, CA (Moscone West)',
            excitedAbout,
            tone: selectedTone,
            phase: eventPhase,
            hashtags: ['#GlobalAISummit', '#ArtificialIntelligence', '#SoftwareEngineering', '#TechLeaders', '#PostSpark'],
          },
        }),
      });
      const data = await res.json();
      if (data.variations && data.variations.length > 0) {
        setVariations(data.variations);
        setCurrentVariationIdx(0);
        onToast('Generated with Gemini', `Synthesized 3 authentic ${eventPhase === 'post' ? 'post-event recap' : 'pre-event announcement'} variations.`);
      } else {
        cycleVariation();
      }
    } catch (e) {
      cycleVariation();
      onToast('Next Variation Loaded', 'Switched to next tailored prompt variation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const cycleVariation = () => {
    const nextIdx = (currentVariationIdx + 1) % variations.length;
    setCurrentVariationIdx(nextIdx);
  };

  const handleCopy = () => {
    const currentText = variations[currentVariationIdx] || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentText);
      setCopyTooltipVisible(true);
      setTimeout(() => setCopyTooltipVisible(false), 2200);
      onToast('Copied to Clipboard', 'LinkedIn post copy is ready to paste.');
    }
  };

  const handleShareToLinkedIn = () => {
    const textToShare = variations[currentVariationIdx] || '';
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      config.linkedInUrl || 'https://postspark.app/events/summit2025'
    )}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
    }
    window.open(shareUrl, '_blank', 'width=600,height=600');
    onToast(
      'LinkedIn Share Window Opened',
      'Your customized post text has been copied to your clipboard to paste into the LinkedIn post window!'
    );
  };

  const handleLikeClick = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
      onToast('Post Liked', 'Simulated 1 reaction on LinkedIn feed.');
    } else {
      setHasLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setExcitedAbout(
      'Looking forward to diving into autonomous agent architectures and connecting with fellow system architects tackling scale challenges.'
    );
    setUserRoleInput('VP of Product Engineering @ TechNova Solutions | Speaker & AI Practitioner');
    setSelectedTone('thought_leader');
    setVariations(currentFallbacks.thought_leader);
    setCurrentVariationIdx(0);
    onToast('Reset to Defaults', 'Composer fields restored to default values.');
  };

  const appendTopicChip = (chipText: string) => {
    const clean = chipText.replace('+', '').trim();
    if (excitedAbout.includes(clean)) return;
    setExcitedAbout((prev) => (prev ? `${prev.trim()}, ${clean}` : clean));
  };

  const downloadBadgeArtwork = () => {
    // Canvas artwork generator
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, '#001b3d');
    grad.addColorStop(0.5, '#004e99');
    grad.addColorStop(1, '#0a66c2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative grid pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 0; x < 1200; x += 30) {
      for (let y = 0; y < 630; y += 30) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Inner White Pass Card
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(150, 60, 900, 510, 24);
    ctx.fill();

    // Top Card Bar
    ctx.fillStyle = '#f6f3f2';
    ctx.beginPath();
    ctx.roundRect(150, 60, 900, 90, [24, 24, 0, 0]);
    ctx.fill();

    // Event title in top bar
    ctx.fillStyle = '#004e99';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText("GLOBAL AI SUMMIT '25", 200, 115);

    // Official Attendee Pill
    ctx.fillStyle = '#cde5ff';
    ctx.beginPath();
    ctx.roundRect(820, 90, 190, 38, 19);
    ctx.fill();
    ctx.fillStyle = '#001d32';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.fillText(selectedTone === 'speaker' ? 'KEYNOTE SPEAKER' : 'OFFICIAL ATTENDEE', 840, 115);

    // Attendee Name & Role
    ctx.fillStyle = '#1c1b1b';
    ctx.font = 'bold 38px Inter, sans-serif';
    ctx.fillText(profile.name, 400, 240);

    ctx.fillStyle = '#006398';
    ctx.font = '600 24px Inter, sans-serif';
    ctx.fillText(profile.role, 400, 280);

    ctx.fillStyle = '#414752';
    ctx.font = '20px Inter, sans-serif';
    ctx.fillText(profile.company, 400, 315);

    // Badges
    ctx.fillStyle = '#f0eded';
    ctx.beginPath();
    ctx.roundRect(400, 350, 180, 36, 8);
    ctx.fill();
    ctx.fillStyle = '#1c1b1b';
    ctx.font = '500 15px Inter, sans-serif';
    ctx.fillText(profile.location, 420, 374);

    ctx.fillStyle = '#d6e3ff';
    ctx.beginPath();
    ctx.roundRect(600, 350, 160, 36, 8);
    ctx.fill();
    ctx.fillStyle = '#001b3d';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.fillText(profile.passId, 620, 374);

    // Bottom info bar
    ctx.fillStyle = '#727783';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('OCTOBER 24-26, 2025', 200, 520);
    ctx.fillText('MOSCONE WEST', 520, 520);
    ctx.fillStyle = '#004e99';
    ctx.fillText('POSTSPARK.AI', 860, 520);

    // Load user headshot image onto canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(200, 190, 160, 160, 16);
      ctx.clip();
      ctx.drawImage(img, 200, 190, 160, 160);
      ctx.restore();

      const link = document.createElement('a');
      link.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_summit_pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      onToast('Official Pass Downloaded', 'High-res LinkedIn social card saved to your device.');
    };
    img.onerror = () => {
      // If CORS or local image error, fallback download
      const link = document.createElement('a');
      link.download = `summit_pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      onToast('Pass Downloaded', 'Social card PNG generated successfully.');
    };
    img.src = profile.photoUrl;
  };

  const currentPostContent = variations[currentVariationIdx] || currentFallbacks[selectedTone][0];

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Breadcrumb & Status Notification Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#e5e2e1]">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#414752]">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#004e99]">
            <Calendar className="w-4 h-4" />
            {config.name}
          </span>
          <span className="text-[#727783]">/</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#727783]">Attendee Studio</span>
          <span className="text-[#727783]">/</span>
          <span className="text-[#1c1b1b] font-semibold text-xs">Social Post Generator</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cde5ff] text-[#001d32] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006398] animate-pulse" />
            Happening {config.date} • Moscone Center, SF
          </span>
        </div>
      </div>

      {/* Main Split-Screen Workspace (5:7 Ratio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Interactive Input Generator Studio (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5e2e1] flex flex-col gap-5">
            {/* Studio Header with Gemini Model Badge */}
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#f0eded]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#004e99] block mb-0.5">
                  Interactive Composer
                </span>
                <h1 className="text-xl font-bold text-[#1c1b1b] leading-tight">
                  {eventPhase === 'post' ? 'Post-Event Debrief & Recap' : 'Personalized Announcement'}
                </h1>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f0eded] text-[#1c1b1b] text-xs font-medium shrink-0 border border-[#e5e2e1]">
                <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
                <span>Gemini 3.8 Flash</span>
              </div>
            </div>

            {/* Event Phase Segregation Switcher */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#f6f3f2] border border-[#e5e2e1]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#004e99]" />
                  <span>Campaign Timeline Mode</span>
                </span>
                <span className="text-[11px] text-[#727783]">
                  {eventPhase === 'pre' ? 'Pre-event hype & passes' : 'Post-event takeaways & slides'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white rounded-lg border border-[#e5e2e1]">
                <button
                  type="button"
                  onClick={() => handlePhaseChange('pre')}
                  className={`py-2 px-2.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    eventPhase === 'pre'
                      ? 'bg-[#0a66c2] text-white shadow-xs'
                      : 'text-[#414752] hover:bg-[#f6f3f2] hover:text-[#1c1b1b]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Pre-Event Announcement</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePhaseChange('post')}
                  className={`py-2 px-2.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    eventPhase === 'post'
                      ? 'bg-[#0a66c2] text-white shadow-xs'
                      : 'text-[#414752] hover:bg-[#f6f3f2] hover:text-[#1c1b1b]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Post-Event Takeaways</span>
                </button>
              </div>
            </div>

            {/* Component 1: File Upload / Headshot Preview Zone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c1b1b] flex items-center justify-between">
                <span>Attendee Headshot / Badge Photo</span>
                <span className="text-[11px] text-[#727783]">Verified Asset</span>
              </label>

              <div className="p-3 bg-[#f6f3f2] rounded-lg flex items-center gap-3 border border-[#e5e2e1]">
                <div className="relative shrink-0">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-16 h-16 rounded-lg object-cover ring-1 ring-[#c1c6d4]"
                  />
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1c1b1b] truncate">{profile.filename}</span>
                    <span className="text-[11px] text-[#727783]">{profile.fileSize}</span>
                  </div>
                  <p className="text-[11px] text-[#414752] truncate">
                    Square ratio • High-res corporate headshot
                  </p>

                  <div className="flex items-center gap-3 mt-1.5">
                    <button
                      type="button"
                      onClick={onOpenChangePhoto}
                      className="text-xs font-semibold text-[#004e99] hover:text-[#0a66c2] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Change Photo</span>
                    </button>
                    <span className="text-[#c1c6d4] text-[10px]">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeProfile({
                          photoUrl:
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                          filename: 'default_headshot.jpg',
                        });
                        onToast('Photo Reset', 'Restored fallback profile image.');
                      }}
                      className="text-xs font-semibold text-[#ba1a1a] hover:opacity-80 flex items-center gap-1 cursor-pointer transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Component 2: Professional Role & Company Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#1c1b1b]">Your Role & Organization</label>
                <span className="text-[11px] text-[#727783]">Auto-synced</span>
              </div>
              <div className="relative flex items-center">
                <BadgeAlert className="w-4 h-4 text-[#727783] absolute left-3" />
                <input
                  type="text"
                  value={userRoleInput}
                  onChange={(e) => {
                    setUserRoleInput(e.target.value);
                    const parts = e.target.value.split('@');
                    if (parts.length > 0) {
                      onChangeProfile({ role: parts[0].trim() });
                    }
                  }}
                  placeholder="e.g. Lead ML Engineer @ Nexus Labs"
                  className="w-full pl-9 pr-3 py-2 bg-[#fcf9f8] rounded-lg text-xs text-[#1c1b1b] border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2] shadow-xs transition-all font-medium"
                />
              </div>
            </div>

            {/* Component 3: Prompt Textarea & Topic Tags */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#1c1b1b]">
                  {eventPhase === 'post'
                    ? 'What was your biggest takeaway or highlight?'
                    : 'What are you most excited about?'}
                </label>
                <span className="text-[11px] text-[#727783]">{excitedAbout.length} / 500</span>
              </div>
              <textarea
                rows={3}
                value={excitedAbout}
                maxLength={500}
                onChange={(e) => setExcitedAbout(e.target.value)}
                placeholder={
                  eventPhase === 'post'
                    ? 'Share your top learnings, memorable session takeaways, or gratitude to speakers...'
                    : 'Share your goals, panels you are attending, or topics you want to debate...'
                }
                className="w-full p-3 bg-[#fcf9f8] rounded-lg text-xs text-[#1c1b1b] border border-[#e5e2e1] focus:outline-none focus:border-[#0a66c2] shadow-xs resize-none transition-all leading-relaxed"
              />

              {/* Quick Suggestion Chips */}
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-[11px] text-[#727783]">
                  {eventPhase === 'post' ? 'Post-event takeaway chips:' : 'Pre-event hype chips:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(eventPhase === 'post'
                    ? [
                        '+ Top 3 Agentic Takeaways',
                        '+ Keynote Slides Available',
                        '+ Met Inspiring Builders',
                        '+ Sub-second Latency Insights',
                        '+ Kudos to Organizers',
                      ]
                    : [
                        '+ Keynote on Agentic Workflows',
                        '+ Networking with Founders',
                        '+ Workshop on LLM Fine-tuning',
                        '+ New Product Launch',
                      ]
                  ).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => appendTopicChip(chip)}
                      className="px-2.5 py-1 rounded-full bg-[#f6f3f2] hover:bg-[#cde5ff] text-[#1c1b1b] hover:text-[#004b74] text-xs transition-colors flex items-center gap-1 border border-[#e5e2e1] cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Component 4: Tone & Narrative Style Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#1c1b1b]">Post Tone & Narrative Style</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    id: 'thought_leader' as PostTone,
                    name: 'Thought Leader',
                    desc: 'Insightful & Strategic',
                    icon: Brain,
                  },
                  {
                    id: 'casual' as PostTone,
                    name: 'Excited & Casual',
                    desc: 'Warm & Approachable',
                    icon: Smile,
                  },
                  {
                    id: 'speaker' as PostTone,
                    name: 'Speaker / Panelist',
                    desc: 'Announcing my session',
                    icon: Mic,
                  },
                  {
                    id: 'direct' as PostTone,
                    name: 'Brief & Direct',
                    desc: 'Short form skimmable',
                    icon: Zap,
                  },
                ].map((tone) => {
                  const Icon = tone.icon;
                  const isSelected = selectedTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => handleToneChange(tone.id)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#cde5ff] border-[#0a66c2] text-[#001d32]'
                          : 'bg-[#f6f3f2] border-[#e5e2e1] hover:bg-[#eae7e7] text-[#1c1b1b]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#006398]' : 'text-[#727783]'}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold truncate leading-tight">{tone.name}</span>
                        <span className={`text-[10px] leading-tight ${isSelected ? 'text-[#004b74]' : 'text-[#727783]'}`}>
                          {tone.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Component 5: Action Controls */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                <Sparkles className={`w-4 h-4 text-[#cde5ff] ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Synthesizing with Gemini...' : 'Generate with Gemini'}</span>
              </button>

              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#727783] hover:text-[#1c1b1b] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to Defaults</span>
                </button>
                <span className="text-xs text-[#414752] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#006398]" />
                  <span>{variations.length} Variations Ready</span>
                </span>
              </div>
            </div>
          </div>

          {/* Helper Tips Card */}
          <div className="p-4 bg-[#f0eded] rounded-xl flex items-start gap-3 border border-[#e5e2e1]">
            <CheckCircle2 className="w-5 h-5 text-[#004e99] shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs text-[#414752] leading-relaxed">
              <span className="font-bold text-[#1c1b1b]">Pro-Tip for Maximum Impressions</span>
              Posts that tag specific tracks or speakers receive an average of 3.8x more engagement across the first 4 hours of publication.
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Live LinkedIn Feed Simulation (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Preview Device Switcher Bar */}
          <div className="bg-white rounded-xl p-3 px-5 shadow-xs border border-[#e5e2e1] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6bbdff]" />
              <span className="text-xs font-bold text-[#1c1b1b]">Live LinkedIn Post Preview</span>
              <span className="hidden sm:inline text-xs text-[#727783]">• Exact 1:1 Rendering</span>
            </div>

            <div className="flex items-center gap-1 bg-[#f0eded] p-1 rounded-full border border-[#e5e2e1]">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'desktop'
                    ? 'bg-white text-[#1c1b1b] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop Feed</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-white text-[#1c1b1b] shadow-xs'
                    : 'text-[#414752] hover:text-[#1c1b1b]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile Feed</span>
              </button>
            </div>
          </div>

          {/* Feed Container Simulator */}
          <div className="w-full flex justify-center transition-all duration-300">
            <article
              className={`w-full bg-white rounded-xl shadow-md border border-[#e5e2e1] overflow-hidden transition-all duration-300 ${
                viewMode === 'mobile' ? 'max-w-[400px]' : 'max-w-full'
              }`}
            >
              {/* Post Author Header */}
              <div className="p-4 sm:p-5 pb-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-[#e5e2e1]"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#0a66c2] text-white text-[9px] flex items-center justify-center font-bold">
                      in
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#1c1b1b] truncate">{profile.name}</span>
                      <span className="text-[#727783] text-xs">• 1st</span>
                    </div>
                    <span className="text-xs text-[#414752] truncate max-w-[280px] sm:max-w-md">
                      {userRoleInput}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#727783] mt-0.5">
                      <span>Just now</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <span>Edited</span>
                        <Globe className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" className="p-1 hover:bg-[#f0eded] rounded-full text-[#727783]">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Post Body Content */}
              <div className="px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#1c1b1b] flex flex-col gap-2.5 whitespace-pre-line leading-relaxed">
                {currentPostContent}
              </div>

              {/* Post Media Asset: Official Summit Pass Digital Badge */}
              <div className="mt-3 relative bg-[#1c1b1b] overflow-hidden border-t border-b border-[#e5e2e1]">
                <div className="relative w-full py-8 sm:py-10 flex items-center justify-center overflow-hidden">
                  {/* Gradient background with digital grid pattern */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#001b3d] via-[#004e99] to-[#0a66c2] opacity-95" />
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Pass Badge Artwork Card */}
                  <div className="relative z-10 w-[90%] max-w-[460px] bg-white rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 border border-white/20">
                    {/* Top sub-header inside badge */}
                    <div className="flex items-center justify-between pb-2 bg-[#f6f3f2] -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 px-4 sm:px-5 pt-3 sm:pt-4 rounded-t-xl border-b border-[#e5e2e1]">
                      <div className="flex items-center gap-1.5">
                        <span className="p-1 rounded bg-[#004e99] text-white flex items-center justify-center">
                          <Brain className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-bold tracking-tight text-[#1c1b1b]">
                          GLOBAL AI SUMMIT &apos;25
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-[10px] font-bold uppercase tracking-wider">
                        {selectedTone === 'speaker'
                          ? eventPhase === 'post'
                            ? 'Keynote Wrap-Up'
                            : 'Keynote Speaker'
                          : eventPhase === 'post'
                          ? 'Attended & Verified'
                          : 'Official Attendee'}
                      </span>
                    </div>

                    {/* Badge Attendee Photo & Details */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={profile.photoUrl}
                        alt={profile.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm ring-1 ring-[#c1c6d4] shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-base sm:text-lg font-bold text-[#1c1b1b] leading-tight truncate">
                          {profile.name}
                        </span>
                        <span className="text-xs font-semibold text-[#006398] truncate">
                          {profile.role}
                        </span>
                        <span className="text-xs text-[#414752] truncate">
                          {profile.company}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#f0eded] text-[#414752] font-medium">
                            {profile.location}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#d6e3ff] text-[#001b3d] font-bold">
                            {eventPhase === 'post' ? 'Alum #AIS-8841' : profile.passId}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="pt-2 flex items-center justify-between text-[#727783] text-[10px] font-mono tracking-tight border-t border-[#f0eded]">
                      <span>{eventPhase === 'post' ? 'OCTOBER 24-26 (CONCLUDED)' : 'OCTOBER 24-26, 2025'}</span>
                      <span>MOSCONE WEST</span>
                      <span className="text-[#004e99] font-bold">{eventPhase === 'post' ? 'EXECUTIVE DEBRIEF' : 'POSTSPARK.AI'}</span>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Card Link Footer */}
                <div className="bg-[#f0eded] px-4 py-2 flex items-center justify-between border-t border-[#e5e2e1]">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-[#1c1b1b] uppercase tracking-wider">
                      {eventPhase === 'post' ? 'globalaisummit.io/recap' : 'globalaisummit.io'}
                    </span>
                    <span className="text-xs text-[#1c1b1b] truncate font-medium">
                      {eventPhase === 'post'
                        ? 'Global AI & Cloud Summit 2025 — Official Keynotes, Slides & Whitepapers'
                        : 'Global AI & Cloud Summit 2025 — Official Pass Confirmation'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-white text-[#1c1b1b] rounded-full shadow-xs shrink-0 ml-2 border border-[#e5e2e1]">
                    {eventPhase === 'post' ? 'View Recap' : 'Register'}
                  </span>
                </div>
              </div>

              {/* Social Proof / Reactions Summary */}
              <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs text-[#727783] border-b border-[#f0eded]">
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleLikeClick}>
                  <div className="flex -space-x-1">
                    <span className="w-4 h-4 rounded-full bg-[#0a66c2] text-white text-[9px] flex items-center justify-center">
                      👍
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px] flex items-center justify-center">
                      ❤️
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#006398] text-white text-[9px] flex items-center justify-center">
                      💡
                    </span>
                  </div>
                  <span className="hover:text-[#004e99] hover:underline font-medium">
                    {likeCount} reactions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    onClick={onOpenComments}
                    className="hover:text-[#004e99] cursor-pointer hover:underline"
                  >
                    16 comments
                  </span>
                  <span>•</span>
                  <span className="hover:text-[#004e99] cursor-pointer hover:underline">
                    5 reposts
                  </span>
                </div>
              </div>

              {/* Post Interaction Buttons */}
              <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-[#414752]">
                <button
                  type="button"
                  onClick={handleLikeClick}
                  className={`flex-1 py-2 rounded-lg hover:bg-[#f0eded] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    hasLiked ? 'text-[#0a66c2]' : ''
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Like</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenComments}
                  className="flex-1 py-2 rounded-lg hover:bg-[#f0eded] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Comment</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToast('Repost Queued', 'Post queued for LinkedIn company page sharing.')}
                  className="flex-1 py-2 rounded-lg hover:bg-[#f0eded] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Repeat className="w-4 h-4" />
                  <span>Repost</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareToLinkedIn}
                  className="flex-1 py-2 rounded-lg hover:bg-[#f0eded] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </article>
          </div>

          {/* Action Toolbar: Copy, Share, Regenerate, Download */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5e2e1] flex flex-col sm:flex-row items-center justify-between gap-3 relative">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Text & Image</span>
              </button>

              <button
                type="button"
                onClick={handleShareToLinkedIn}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#cde5ff] hover:bg-[#93ccff] text-[#001d32] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#004e99]" />
                <span>Share to LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={downloadBadgeArtwork}
                className="px-3 py-2 rounded-lg bg-[#f0eded] hover:bg-[#eae7e7] text-[#1c1b1b] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Download Badge Pass PNG"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Download Badge</span>
              </button>
            </div>

            <button
              type="button"
              onClick={cycleVariation}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#f0eded] hover:bg-[#eae7e7] text-[#1c1b1b] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#006398]" />
              <span>Next Variation ({currentVariationIdx + 1}/{variations.length})</span>
            </button>

            {/* Floating Copied Feedback Tooltip */}
            {copyTooltipVisible && (
              <div className="absolute top-[-42px] left-6 px-3 py-1.5 rounded-md bg-[#1c1b1b] text-white text-xs font-medium shadow-md flex items-center gap-1.5 animate-in fade-in duration-150">
                <Check className="w-3.5 h-3.5 text-[#6bbdff]" />
                <span>Post copied to clipboard!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
