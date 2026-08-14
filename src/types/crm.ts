export type NavTab = 'Dashboard' | 'Donors' | 'Tasks' | 'Approvals' | 'Reports' | 'Users';

export type DonorStatus = 'Pending Review' | 'Active' | 'Lapsed' | 'Rejected';
export type DonorType = 'Manufacturer' | 'Retailer' | 'Distributor';

export interface Donor {
  id: string;
  name: string;
  tradingName?: string;
  type: DonorType;
  status: DonorStatus;
  manager: string;
  regions: string[];
  donationTypes?: string[];
  frequency: string;
  lastInteraction: string;
  lastInteractionType: 'call' | 'email' | 'meeting' | 'note' | 'form';
  followUpDate: string;
  overdue: boolean;
  website?: string;
  address?: string;
  logisticsInfo?: string;
  primaryContact?: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  marketingContact?: {
    name: string;
    phone: string;
    email: string;
  };
  legalInfo?: {
    registeredName: string;
    entityType: string;
    regNumber: string;
    taxNumber: string;
    registeredAddress: string;
    bbbeeStatus: string;
    bbbeeCertFile: string;
    bbbeeCertMeta: string;
  };
  crmInfo?: {
    marketingConsent: boolean;
    marketingConsentDate: string;
    impactPreferences: string[];
    foodspaceIdSynced: boolean;
    notes: string;
  };
}

export interface ApprovalRecord {
  id: string;
  name: string;
  type: DonorType;
  regions: string;
  source: 'Public Form' | 'Manual Capture';
  requester: string | null;
  submittedAgo: string;
  state: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  decidedWhen?: string;
  rejectionReason?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  desc: string;
  donor: string;
  due: string;
  overdue: boolean;
  by: string;
  done: boolean;
  doneOn?: string;
  doneBy?: string;
}

export interface TimelineItem {
  id: string;
  type: 'Note' | 'Call' | 'Email' | 'Meeting' | 'Form Submission' | 'Follow-up';
  subject: string;
  body: string;
  author: string;
  ago: string;
}

export interface EmailMessage {
  id: number;
  sender: string;
  initials: string;
  avatarBg: string;
  age: string;
  subject: string;
  body: string;
  forwarded?: boolean;
  fromLine?: string;
  signature?: boolean;
  sigName?: string;
  sigTitle?: string;
  sigPhone?: string;
}

export interface EmailAttachment {
  name: string;
  meta: string;
}
