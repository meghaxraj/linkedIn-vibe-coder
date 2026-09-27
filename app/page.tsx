'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { OrganizerDashboard } from '@/components/OrganizerDashboard';
import { AttendeeMagicTool } from '@/components/AttendeeMagicTool';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { ManageSpeakersModal } from '@/components/ManageSpeakersModal';
import { PublicDirectoryModal } from '@/components/PublicDirectoryModal';
import { TemplatesModal } from '@/components/TemplatesModal';
import { ChangePhotoModal } from '@/components/ChangePhotoModal';
import { TestPromptModal } from '@/components/TestPromptModal';
import { CommentsModal } from '@/components/CommentsModal';
import {
  ScreenMode,
  EventConfig,
  AttendeeProfile,
  Speaker,
  DirectoryAttendee,
  PostTemplate,
  ToastNotification,
} from '@/lib/types';
import { INITIAL_EVENT_CONFIG, INITIAL_ATTENDEE_PROFILE } from '@/lib/data';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('organizer');
  const [config, setConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [profile, setProfile] = useState<AttendeeProfile>(INITIAL_ATTENDEE_PROFILE);

  // Modals state
  const [isManageSpeakersOpen, setIsManageSpeakersOpen] = useState(false);
  const [isPublicDirectoryOpen, setIsPublicDirectoryOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);
  const [isTestPromptOpen, setIsTestPromptOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToast({ id, title, desc, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3600);
  };

  const handleUpdateConfig = (newVals: Partial<EventConfig>) => {
    setConfig((prev) => ({ ...prev, ...newVals }));
  };

  const handleUpdateProfile = (newVals: Partial<AttendeeProfile>) => {
    setProfile((prev) => ({ ...prev, ...newVals }));
  };

  // Cross-component handlers
  const handleSelectSpeakerFromModal = (speaker: Speaker) => {
    setProfile((prev) => ({
      ...prev,
      name: speaker.name,
      role: speaker.role,
      company: speaker.company,
      photoUrl: speaker.photoUrl,
      filename: `${speaker.name.toLowerCase().replace(/\s+/g, '_')}_speaker.jpg`,
      fileSize: '1.8 MB',
    }));
    setCurrentScreen('attendee');
    showToast('Speaker Loaded into Studio', `Ready to generate keynote announcement for ${speaker.name}.`);
  };

  const handleSelectDirectoryAttendee = (att: DirectoryAttendee) => {
    setProfile((prev) => ({
      ...prev,
      name: att.name,
      role: att.role,
      company: att.company,
      location: att.location,
      passId: att.passId,
      photoUrl: att.photoUrl,
      filename: `${att.name.toLowerCase().replace(/\s+/g, '_')}_pass.jpg`,
      fileSize: '1.5 MB',
    }));
    if (att.phase) {
      setConfig((prev) => ({ ...prev, activePhase: att.phase }));
    }
    setCurrentScreen('attendee');
    showToast('Attendee Loaded', `Loaded ${att.name}'s ${att.phase === 'post' ? 'post-event debrief' : 'pre-event pass'} into the social post generator.`);
  };

  const handleSelectTemplate = (template: PostTemplate) => {
    if (template.phase === 'pre' || template.phase === 'post') {
      setConfig((prev) => ({ ...prev, activePhase: template.phase as 'pre' | 'post' }));
    }
    setCurrentScreen('attendee');
    showToast('Template Applied', `"${template.title}" loaded into the interactive composer.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b]">
      {/* Global Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenDirectory={() => setIsPublicDirectoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex-1 flex flex-col">
        {currentScreen === 'organizer' ? (
          <OrganizerDashboard
            config={config}
            onChangeConfig={handleUpdateConfig}
            onOpenDirectory={() => setIsPublicDirectoryOpen(true)}
            onOpenTemplates={() => setIsTemplatesOpen(true)}
            onOpenManageSpeakers={() => setIsManageSpeakersOpen(true)}
            onOpenTestPrompt={() => setIsTestPromptOpen(true)}
            onSwitchToAttendeeMagic={() => setCurrentScreen('attendee')}
            onToast={showToast}
          />
        ) : (
          <AttendeeMagicTool
            config={config}
            profile={profile}
            onChangeConfig={handleUpdateConfig}
            onChangeProfile={handleUpdateProfile}
            onOpenChangePhoto={() => setIsChangePhotoOpen(true)}
            onOpenComments={() => setIsCommentsOpen(true)}
            onToast={showToast}
          />
        )}
      </main>

      {/* Shared Modals */}
      <ManageSpeakersModal
        isOpen={isManageSpeakersOpen}
        onClose={() => setIsManageSpeakersOpen(false)}
        onSelectSpeaker={handleSelectSpeakerFromModal}
        onToast={showToast}
      />

      <PublicDirectoryModal
        isOpen={isPublicDirectoryOpen}
        onClose={() => setIsPublicDirectoryOpen(false)}
        onUseAttendeeContent={handleSelectDirectoryAttendee}
        onToast={showToast}
      />

      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <ChangePhotoModal
        isOpen={isChangePhotoOpen}
        onClose={() => setIsChangePhotoOpen(false)}
        currentPhotoUrl={profile.photoUrl}
        onSelectPhoto={(photo) => {
          handleUpdateProfile({
            photoUrl: photo.url,
            filename: photo.filename,
            fileSize: photo.size,
            ...(photo.name ? { name: photo.name } : {}),
            ...(photo.role ? { role: photo.role } : {}),
          });
          showToast('Headshot Updated', 'Applied new attendee photo to pass card.');
        }}
      />

      <TestPromptModal
        isOpen={isTestPromptOpen}
        onClose={() => setIsTestPromptOpen(false)}
        config={config}
        onToast={showToast}
      />

      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        onToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
