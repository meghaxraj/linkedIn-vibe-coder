'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ScreenMode } from '@/lib/types';
import { POSTSPARK_LOGO_URL } from '@/lib/data';
import {
  Calendar,
  ChevronDown,
  Bell,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenMode;
  onSelectScreen: (screen: ScreenMode) => void;
  onOpenTemplates: () => void;
  onOpenDirectory: () => void;
}

export function Navbar({
  currentScreen,
  onSelectScreen,
  onOpenTemplates,
  onOpenDirectory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifications = [
    {
      id: 'n1',
      title: 'Elena Vance shared her pass',
      desc: 'Attendee pass post reached 142 reactions on LinkedIn (9.4% Virality)',
      time: '22m ago',
    },
    {
      id: 'n2',
      title: '18 new attendee registrations synced',
      desc: 'Synced with LinkedIn Events API via automated webhook',
      time: '45m ago',
    },
    {
      id: 'n3',
      title: 'Marcus Chen speaker badge approved',
      desc: 'Keynote announcement teaser generated and queued',
      time: '1h ago',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e5e2e1] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand & Event Selector */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectScreen('organizer')}>
            <div className="h-8 w-8 relative shrink-0 flex items-center justify-center">
              <img
                src={POSTSPARK_LOGO_URL}
                alt="PostSpark Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="text-xl tracking-tight text-[#1c1b1b] font-bold">PostSpark</span>
            <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-xs font-semibold uppercase tracking-wide">
              AI Studio
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f6f3f2] text-[#1c1b1b] border border-[#e5e2e1] text-xs">
            <Calendar className="w-4 h-4 text-[#004e99]" />
            <span className="font-medium truncate max-w-[190px]">Global AI & Tech Summit 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#727783]" />
          </div>
        </div>

        {/* Center Pill Nav: Organizer Dashboard vs Attendee Magic Tool */}
        <nav className="hidden md:flex items-center p-1 bg-[#f6f3f2] rounded-full gap-1 shrink-0 border border-[#e5e2e1]">
          <button
            type="button"
            onClick={() => onSelectScreen('organizer')}
            className={`transition-all font-semibold text-sm rounded-full px-4 py-1.5 cursor-pointer ${
              currentScreen === 'organizer'
                ? 'bg-[#0a66c2] text-white shadow-sm'
                : 'text-[#414752] hover:text-[#1c1b1b]'
            }`}
          >
            Organizer Dashboard
          </button>
          <button
            type="button"
            onClick={() => onSelectScreen('attendee')}
            className={`transition-all font-semibold text-sm rounded-full px-4 py-1.5 cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'attendee'
                ? 'bg-[#0a66c2] text-white shadow-sm'
                : 'text-[#414752] hover:text-[#1c1b1b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Attendee Magic Tool</span>
          </button>
        </nav>

        {/* Right Section: Templates, Help, Notifications, User */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#414752]">
            <button
              type="button"
              onClick={onOpenTemplates}
              className="px-2.5 py-1 rounded-md hover:text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors"
            >
              Templates
            </button>
            <button
              type="button"
              onClick={onOpenDirectory}
              className="px-2.5 py-1 rounded-md hover:text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-[#006398]" />
              Directory
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setHasUnread(false);
              }}
              className="relative p-2 rounded-full text-[#414752] hover:bg-[#f0eded] hover:text-[#1c1b1b] transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#e5e2e1] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
                  <span className="font-semibold text-sm text-[#1c1b1b]">Live Campaign Activity</span>
                  <span className="text-[11px] text-[#006398] font-medium bg-[#cde5ff] px-2 py-0.5 rounded-full">
                    3 updates
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-[#f6f3f2] hover:bg-[#f0eded] transition-colors flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1c1b1b] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#004e99]" />
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#727783]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#414752] leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#f0eded] mt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs text-[#0a66c2] font-semibold hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-1 border-l border-[#e5e2e1]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFjuczMEVfH2YwhQmQSyWNJLUl9TP8SX-NsiSKFlsI3R77jtxRdwAnwaOh93GTJ51ksGy6v-57mN8L6YrRLeWanUaHhL2hL62ZGrcYJWmXSxSFuRZjmDZkfhk1RvBs30k81sHiGZpJwpjEQG8-1ldW5Wz_Vak7WsFBSgxCdh2Us-m9pDcPJAjv6qCD-8Bv883AclgrGbVbv3R1tddGR-yOUkxx-cU55wO2zmo1KE18MDCIVgCpKpjg"
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c1c6d4]"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#1c1b1b] leading-tight">Sarah Jenkins</span>
              <span className="text-[11px] text-[#414752] leading-tight">Event Lead</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#414752] hover:bg-[#f6f3f2]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-[#ffffff] border-b border-[#e5e2e1] flex flex-col gap-2">
          <div className="flex p-1 bg-[#f6f3f2] rounded-full">
            <button
              type="button"
              onClick={() => {
                onSelectScreen('organizer');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-full transition-all ${
                currentScreen === 'organizer' ? 'bg-[#0a66c2] text-white' : 'text-[#414752]'
              }`}
            >
              Organizer Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectScreen('attendee');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-full transition-all ${
                currentScreen === 'attendee' ? 'bg-[#0a66c2] text-white' : 'text-[#414752]'
              }`}
            >
              Attendee Magic Tool
            </button>
          </div>
          <div className="flex items-center justify-around pt-2 text-xs font-medium text-[#414752]">
            <button
              type="button"
              onClick={() => {
                onOpenTemplates();
                setMobileMenuOpen(false);
              }}
              className="py-1 px-3 rounded hover:bg-[#f6f3f2]"
            >
              Templates
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenDirectory();
                setMobileMenuOpen(false);
              }}
              className="py-1 px-3 rounded hover:bg-[#f6f3f2]"
            >
              Public Directory
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
