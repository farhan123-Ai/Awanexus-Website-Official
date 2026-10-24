export type WingType = 'main' | 'education' | 'creative';

export interface ProfessionalRole {
  title: string;
  category: 'ai' | 'design' | 'multimedia' | 'data' | 'education';
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  field: string;
  years: number;
  label: string;
  details: string;
  highlight: string;
}

export interface ServicePackage {
  id: string;
  name: string; // 'Basic' | 'Standard' | 'Premium'
  tier: 'basic' | 'standard' | 'premium';
  pricePKR: number | null; // null represents "Request a Quote"
  priceDisplay: string;
  turnaroundDays: string;
  revisions: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServiceItem {
  id: string;
  wing: 'creative' | 'education';
  category: string; // e.g., 'AI & Web Development', 'Awan Academy Services'
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  suggestedTurnaround: string;
  packages: ServicePackage[];
  icon: string;
  badge?: string;
}

export type OrderStatus =
  | 'New'
  | 'Under Review'
  | 'Quote Sent'
  | 'Awaiting Approval'
  | 'Awaiting Payment'
  | 'In Progress'
  | 'Revision Requested'
  | 'Completed'
  | 'Cancelled';

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  updatedBy: string;
}

export interface OrderItem {
  id: string; // e.g., AWN-ORD-2026-1042
  trackingCode: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  wing: 'creative' | 'education';
  serviceCategory: string;
  serviceTitle: string;
  packageTier: string;
  pricePKR?: number | null;
  budgetNotes?: string;
  projectTitle: string;
  detailedRequirements: string;
  expectedDeliveryDate: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone';
  referenceLinks?: string;
  fileAttachmentNames?: string[];
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  internalNotes: string[];
  customerUpdates: string[];
  deliverableLinks?: string[];
}

export type BookingStatus = 'Confirmed' | 'Pending' | 'Rescheduled' | 'Completed' | 'Cancelled';

export interface BookingItem {
  id: string; // e.g., AWN-CNS-2026-8812
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  wing: 'creative' | 'education' | 'general';
  category: string;
  preferredDate: string;
  timeSlot: string;
  timeZone: string;
  meetingType: 'Google Meet / Zoom' | 'WhatsApp Call' | 'Direct Phone Call';
  topic: string;
  briefRequirements: string;
  referenceLinks?: string;
  status: BookingStatus;
  adminNotes?: string;
}

export interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  category: 'Guess Paper' | 'Notes' | 'Exam Paper' | 'Quiz' | 'Study Guide';
  description: string;
  previewSnippet: string;
  downloadAvailable: boolean;
  downloadsCount: number;
}

export interface ContactInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  wing: 'creative' | 'education' | 'general';
  subject: string;
  message: string;
  status: 'Unread' | 'Responded' | 'Archived';
}

export interface PortfolioProject {
  id: string;
  title: string;
  wing: 'creative' | 'education';
  category: 'AI & Web' | 'AI Agents & Apps' | 'Graphic Design' | 'Video & Multimedia' | 'Educational Content';
  description: string;
  tags: string[];
  liveUrl?: string;
  image?: string;
  isFeatured?: boolean;
  metrics?: string;
}

export interface WebsiteSettings {
  contactPhone: string;
  contactWhatsApp: string;
  creativeEmail: string;
  educationEmail: string;
  academyPlatformUrl: string;
  workingDays: string;
  workingHours: string;
  acceptingOrders: boolean;
  acceptingBookings: boolean;
}
