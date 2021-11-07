export interface EventXUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  fullContactNo: string;
  areaCode: string;
  contactNo: string;
  jobTitle: null;
  organization: null;
  country: null;
  city: null;
  locale: string;
  profilePic: null;
}

export interface EventXLoginResponse {
  user: EventXUser;
  shouldRegisterFromRegForm: boolean;
  isJustRegisteredEvent: boolean;
}

export interface EventXOrganization {
  id: string;
  name: string;
}

export interface EventXMedia {
  id: string;
  mimeType: string;
  originalFilename: string;
  originalFilepath: string;
  previewFilename: string;
  previewFilepath: string;
  type: string;
}

export interface EventXEvent {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  bannerImage: EventXMedia | null;
}

export interface EventXEventDetail extends EventXEvent {
  categories: string[];
  descriptionHtml: string;
  estimatedAttendeeCount: string;
  isPublished: boolean;
}

export interface EventXOrganizerEvent {
  events: EventXEvent[];
  organization: EventXOrganization;
}

export enum EventXWebinarType {
  WLT = 'wlt',
  EXTERNAL = 'external',
  DACAST = 'dacast'
}

export interface EventXWebinarSession {
  id: string;
  startsAt: string;
  endsAt: string;
  name: string;
  timezone: string;
  speakerCount: number;
  webinarType: EventXWebinarType;
  coverImage: EventXMedia | null;
}

export interface EventXWebinarSessionDetail {
  wltSessionId: string;
}

export enum EventXWebinarSessionStatus {
  ENDED = 'ended',
  STARTED = 'started',
  PAUSED = 'paused',
  PENDING = 'pending_start',
}

export interface EventXWebinarSessionMeta {
  countdownFinishesAt: string;
  isRecording: boolean;
  onstageAttendeeId: string;
  pinnedAttendeeId: string;
  startedAt: string;
  status: EventXWebinarSessionStatus;
  updatedAt: string;
}
