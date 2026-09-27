export type ScreenMode = 'organizer' | 'attendee';

export type EventPhase = 'pre' | 'post';

export type PostTone = 'thought_leader' | 'casual' | 'speaker' | 'direct';

export interface EventConfig {
  name: string;
  date: string;
  timeFormat: string;
  theme: string;
  topics: string[];
  audience: string;
  hashtags: string;
  linkedInUrl: string;
  autoApprove: boolean;
  campaignStatus: 'Active Draft' | 'Live';
  activePhase: EventPhase;
  attendeesTracked: number;
  postsGenerated: number;
  reachMultiplier: string;
}

export interface AttendeeProfile {
  name: string;
  role: string;
  company: string;
  location: string;
  passId: string;
  photoUrl: string;
  filename: string;
  fileSize: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  photoUrl: string;
  isKeynote: boolean;
}

export interface DirectoryAttendee {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  passId: string;
  photoUrl: string;
  postPreview: string;
  reactions: number;
  comments: number;
  sharedAt: string;
  badgeType: 'Attendee' | 'Speaker' | 'VIP';
  phase: EventPhase;
}

export interface PostTemplate {
  id: string;
  title: string;
  category: 'Attendee' | 'Speaker' | 'Sponsor' | 'VIP';
  phase: EventPhase | 'all';
  description: string;
  previewSnippet: string;
  recommendedTone: PostTone;
}

export interface ToastNotification {
  id: string;
  title: string;
  desc: string;
  type?: 'success' | 'info' | 'warning';
}
