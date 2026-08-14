import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Mail, 
  MessageSquare, 
  Building2, 
  FileText, 
  ExternalLink, 
  Phone, 
  Plus, 
  Check, 
  ShieldAlert, 
  Download, 
  Calendar as CalendarIcon, 
  Clock, 
  Database,
  User,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Donor, TimelineItem, TaskItem } from '@/types/crm';
import { getInitials, MANAGER_PALETTE } from '@/data/mockData';

interface DonorDetailPageProps {
  donor: Donor;
  timeline: TimelineItem[];
  tasks: TaskItem[];
  onBack: () => void;
  onOpenEmailDrawer: () => void;
  onOpenLogModal: () => void;
  onToggleTask: (taskId: string) => void;
}

type DetailTab = 'Overview' | 'Contacts' | 'Legal' | 'CRM' | 'Activity';

export const DonorDetailPage: React.FC<DonorDetailPageProps> = ({
  donor,
  timeline,
  tasks,
  onBack,
  onOpenEmailDrawer,
  onOpenLogModal,
  onToggleTask,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
  const [expandedTimeline, setExpandedTimeline] = useState<Record<number, boolean>>({});

  const tabs: DetailTab[] = ['Overview', 'Contacts', 'Legal', 'CRM', 'Activity'];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending Review':
        return { bg: '#FDF3DA', fg: '#8A6100', dot: '#D99A00' };
      case 'Active':
        return { bg: '#E5F4E9', fg: '#1E6E3C', dot: '#2E9E56' };
      case 'Lapsed':
        return { bg: '#FBE9E9', fg: '#9B2C2C', dot: '#D4373A' };
      default:
        return { bg: '#EFEFEC', fg: '#5F5F57', dot: '#9A9A90' };
    }
  };

  const statusStyle = getStatusStyle(donor.status);

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-[22px_30px_40px]">
      {/* Top Banner Section */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-[20px_22px_0] mb-5">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="m-0 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
                Donors <span className="text-[var(--muted2)] font-semibold">—</span> {donor.name}
              </h1>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.75 rounded-2xl text-[12.5px] font-bold whitespace-nowrap"
                style={{ backgroundColor: statusStyle.bg, color: statusStyle.fg }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: statusStyle.dot }}
                />
                <span>{donor.status}</span>
              </span>
            </div>
            <p className="m-0 mt-1.5 text-13 text-[var(--muted)] font-medium">
              Trading as {donor.tradingName || donor.name}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-2.5 flex-wrap mt-4">
              <div className="flex items-center gap-2 h-8.5 px-3.25 rounded-full bg-[var(--card)] border border-[var(--border)] text-[12.5px] font-semibold text-[var(--ink)]">
                <Building2 className="w-3.75 h-3.75 text-[var(--icon)]" />
                <span>{donor.type}</span>
              </div>

              <div className="flex items-center gap-2 h-8.5 px-3.25 rounded-full bg-[var(--card)] border border-[var(--border)] text-[12.5px] font-semibold text-[var(--ink)]">
                <FileText className="w-3.75 h-3.75 text-[var(--icon)]" />
                <span>Public Form</span>
              </div>

              <div className="flex items-center gap-2.25 h-8.5 px-3.25 pl-1.25 rounded-full bg-[var(--card)] border border-[var(--border)] text-[12.5px] font-semibold text-[var(--ink)]">
                <span className="w-6 h-6 rounded-full bg-[#3F5D46] text-white text-[9.5px] font-bold flex items-center justify-center">
                  NK
                </span>
                <span>{donor.manager}</span>
                <span className="text-[11.5px] text-[var(--muted2)] font-semibold">RM</span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="ml-auto flex items-center gap-2.5">
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="w-3.75 h-3.75 stroke-[2.2]" />
              <span>Back</span>
            </Button>

            <Button variant="secondary">
              <Edit3 className="w-3.75 h-3.75 text-[var(--ink)]" />
              <span>Edit</span>
            </Button>

            <Button variant="secondary" onClick={onOpenEmailDrawer}>
              <Mail className="w-3.75 h-3.75 text-[var(--ink)]" />
              <span>Send Email</span>
            </Button>

            <Button variant="default" onClick={onOpenLogModal}>
              <MessageSquare className="w-4 h-4" />
              <span>Log Interaction</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-1 mt-5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const badgeCount =
              tab === 'Activity' ? timeline.length : tab === 'Contacts' ? '2' : null;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 h-10.5 px-4.5 border-b-[3px] text-[13.5px] font-semibold cursor-pointer whitespace-nowrap transition-all ${
                  isActive
                    ? 'font-extrabold text-[var(--ink)] border-[#FADF01]'
                    : 'text-[var(--muted)] border-transparent hover:text-[var(--ink)]'
                }`}
              >
                <span>{tab}</span>
                {badgeCount && (
                  <span
                    className={`min-w-[20px] h-[20px] px-1.5 rounded-full inline-flex items-center justify-center text-[10.5px] font-bold ${
                      isActive
                        ? 'bg-[var(--ink)]/10 text-[var(--ink)]'
                        : 'bg-[var(--card)] text-[var(--muted)]'
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab Content 1: OVERVIEW */}
      {activeTab === 'Overview' && (
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-6.5">
          <h2 className="m-0 mb-5 text-15 font-extrabold tracking-tight text-[var(--ink)]">
            Company & donation profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                COMPANY TYPE
              </div>
              <div className="text-sm font-semibold text-[var(--ink)]">{donor.type}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                WEBSITE
              </div>
              <a
                href={donor.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)] border-b-[1.5px] border-[#FADF01] hover:text-[#C9B300]"
              >
                <span>{donor.website ? donor.website.replace('https://', '') : 'www.foodcorpsa.co.za'}</span>
                <ExternalLink className="w-3.25 h-3.25" />
              </a>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                DONATION FREQUENCY
              </div>
              <div className="text-sm font-semibold text-[var(--ink)]">{donor.frequency}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                OPERATIONAL REGIONS
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {donor.regions.map((reg) => (
                  <span
                    key={reg}
                    className="px-2.5 py-1 rounded-lg bg-[var(--chip)] text-[11.5px] font-bold text-[var(--ink)]"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                DONATION TYPES
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(donor.donationTypes || ['Meat', 'Dairy', 'Dry goods']).map((dt) => (
                  <span
                    key={dt}
                    className="px-2.5 py-1 rounded-lg bg-[var(--chip)] text-[11.5px] font-bold text-[var(--ink)]"
                  >
                    {dt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--divider)] my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                COLLECTION / PICKUP ADDRESS
              </div>
              <div className="text-[13.5px] font-medium leading-relaxed text-[var(--ink)] whitespace-pre-line">
                {donor.address}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                OPERATIONS / LOGISTICS DETAILS
              </div>
              <p className="m-0 text-[13.5px] font-medium leading-relaxed text-[var(--ink)]">
                {donor.logisticsInfo}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content 2: CONTACTS */}
      {activeTab === 'Contacts' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {/* Primary Contact */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-5.5">
            <div className="flex items-center justify-between mb-4.5">
              <h2 className="m-0 text-xs font-extrabold tracking-wider text-[var(--ink)]">
                PRIMARY CONTACT
              </h2>
              <span className="w-6.5 h-6.5 rounded-full bg-[var(--icon-bg)] flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[var(--icon)]" />
              </span>
            </div>
            <div className="text-base font-extrabold tracking-tight text-[var(--ink)]">
              {donor.primaryContact?.name || 'Dineo Molefe'}
            </div>
            <div className="text-[12.5px] font-semibold text-[var(--muted)] mt-1">
              {donor.primaryContact?.role || 'Head of Supply Chain'}
            </div>
            <div className="flex flex-col gap-2.5 mt-4.5">
              <a
                href={`tel:${donor.primaryContact?.phone || '+27113456780'}`}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[var(--ink)] hover:text-[#C9B300]"
              >
                <span className="w-7.5 h-7.5 rounded-full bg-[var(--field)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[var(--icon)]" />
                </span>
                <span>{donor.primaryContact?.phone || '+27 11 345 6780'}</span>
              </a>
              <a
                href={`mailto:${donor.primaryContact?.email || 'dineo.molefe@foodcorpsa.co.za'}`}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[var(--ink)] hover:text-[#C9B300] min-w-0"
              >
                <span className="w-7.5 h-7.5 rounded-full bg-[var(--field)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[var(--icon)]" />
                </span>
                <span className="truncate">{donor.primaryContact?.email || 'dineo.molefe@foodcorpsa.co.za'}</span>
              </a>
            </div>
          </div>

          {/* Marketing Contact */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-5.5">
            <div className="flex items-center justify-between mb-4.5">
              <h2 className="m-0 text-xs font-extrabold tracking-wider text-[var(--ink)]">
                MARKETING CONTACT
              </h2>
              <span className="w-6.5 h-6.5 rounded-full bg-[var(--icon-bg)] flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
              </span>
            </div>
            <div className="text-base font-extrabold tracking-tight text-[var(--ink)]">
              {donor.marketingContact?.name || 'Ryan Adams'}
            </div>
            <div className="flex flex-col gap-2.5 mt-4.5">
              <a
                href={`tel:${donor.marketingContact?.phone || '+27214459012'}`}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[var(--ink)] hover:text-[#C9B300]"
              >
                <span className="w-7.5 h-7.5 rounded-full bg-[var(--field)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[var(--icon)]" />
                </span>
                <span>{donor.marketingContact?.phone || '+27 21 445 9012'}</span>
              </a>
              <a
                href={`mailto:${donor.marketingContact?.email || 'ryan.adams@foodcorpsa.co.za'}`}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[var(--ink)] hover:text-[#C9B300] min-w-0"
              >
                <span className="w-7.5 h-7.5 rounded-full bg-[var(--field)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[var(--icon)]" />
                </span>
                <span className="truncate">{donor.marketingContact?.email || 'ryan.adams@foodcorpsa.co.za'}</span>
              </a>
            </div>
          </div>

          {/* Accounts Contact */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-5.5">
            <div className="flex items-center justify-between mb-4.5">
              <h2 className="m-0 text-xs font-extrabold tracking-wider text-[var(--muted)]">
                ACCOUNTS CONTACT
              </h2>
              <span className="w-6.5 h-6.5 rounded-full bg-[var(--icon-bg)] flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-[var(--muted2)]" />
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 py-4 pb-5">
              <div className="text-sm font-semibold text-[var(--muted2)]">Not provided</div>
              <p className="m-0 text-[12.5px] font-medium text-[var(--muted2)] leading-relaxed">
                This donor did not supply accounts details on the public form.
              </p>
              <button className="mt-1.5 flex items-center gap-1.75 h-8.5 px-3.5 rounded-full border border-dashed border-[var(--border)] bg-transparent text-[12.5px] font-bold text-[var(--ink)] cursor-pointer hover:border-[var(--ink)] hover:border-solid transition-colors">
                <Plus className="w-3.25 h-3.25 stroke-[2.2]" />
                <span>Add contact</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content 3: LEGAL */}
      {activeTab === 'Legal' && (
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-4.5 items-start">
          {/* Company Details */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-6.5">
            <h2 className="m-0 mb-5 text-15 font-extrabold tracking-tight text-[var(--ink)]">
              Legal & registration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                  REGISTERED COMPANY NAME
                </div>
                <div className="text-sm font-semibold text-[var(--ink)]">
                  {donor.legalInfo?.registeredName || 'FoodCorp SA Foods & Logistics (Pty) Ltd'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                  LEGAL ENTITY TYPE
                </div>
                <div className="text-sm font-semibold text-[var(--ink)]">
                  {donor.legalInfo?.entityType || 'Private Company (Pty) Ltd'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                  COMPANY REGISTRATION NUMBER
                </div>
                <div className="text-sm font-semibold text-[var(--ink)] tabular-nums">
                  {donor.legalInfo?.regNumber || '2014/318902/07'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-1.75">
                  INCOME TAX NUMBER
                </div>
                <div className="text-sm font-semibold text-[var(--ink)] tabular-nums">
                  {donor.legalInfo?.taxNumber || '9067 428 155'}
                </div>
              </div>
            </div>
            <div className="h-px bg-[var(--divider)] my-6" />
            <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
              REGISTERED ADDRESS
            </div>
            <div className="text-[13.5px] font-medium leading-relaxed text-[var(--ink)] whitespace-pre-line">
              {donor.legalInfo?.registeredAddress || '12 Kramer Road\nBedfordview\nGermiston\nGauteng\n2007'}
            </div>
          </div>

          {/* B-BBEE Card (Admin Only) */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-6.5">
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="m-0 text-15 font-extrabold tracking-tight text-[var(--ink)]">
                B-BBEE
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--icon-bg)] text-[10.5px] font-bold tracking-wide text-[var(--muted)]">
                <ShieldAlert className="w-3 h-3 text-[var(--muted)]" />
                <span>ADMIN ONLY</span>
              </span>
            </div>
            <p className="m-0 mb-5 text-xs font-medium text-[var(--muted2)] leading-relaxed">
              Procurement and Marketing roles do not see this card.
            </p>

            <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2">
              B-BBEE STATUS
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.75 rounded-2xl bg-[#E5F4E9] text-[#1E6E3C] text-[12.5px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E56]" />
              <span>{donor.legalInfo?.bbbeeStatus || 'Level 4 Contributor'}</span>
            </span>

            <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mt-6 mb-2.25">
              B-BBEE CERTIFICATE
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--field)] border border-[var(--border)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <FileText className="w-4.25 h-4.25 text-[var(--icon)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-13 font-bold text-[var(--ink)] truncate">
                  {donor.legalInfo?.bbbeeCertFile || 'foodcorp-bbbee-2026.pdf'}
                </div>
                <div className="text-[11.5px] font-medium text-[var(--muted2)] mt-0.5">
                  {donor.legalInfo?.bbbeeCertMeta || 'PDF · 412 KB · valid to 31 Mar 2027'}
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Download className="w-3.25 h-3.25 stroke-[1.9]" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content 4: CRM */}
      {activeTab === 'CRM' && (
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-6.5">
          <h2 className="m-0 mb-5 text-15 font-extrabold tracking-tight text-[var(--ink)]">
            Relationship management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                RELATIONSHIP MANAGER
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#3F5D46] text-white text-xs font-bold flex items-center justify-center">
                  NK
                </span>
                <div>
                  <div className="text-[13.5px] font-bold text-[var(--ink)]">{donor.manager}</div>
                  <div className="text-[11.5px] font-medium text-[var(--muted2)]">
                    Gauteng & North West
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                MARKETING CONSENT
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.75 px-3 py-1.5 rounded-2xl bg-[#E5F4E9] text-[#1E6E3C] text-[12.5px] font-bold">
                  <Check className="w-3.25 h-3.25 stroke-[2.8]" />
                  <span>Granted</span>
                </span>
                <span className="text-xs font-medium text-[var(--muted)]">
                  {donor.crmInfo?.marketingConsentDate || '18 Feb 2026'}
                </span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                FOLLOW-UP DATE
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#FBE9E9] text-[#9B2C2C] text-[12.5px] font-bold">
                <Clock className="w-3.25 h-3.25" />
                <span>{donor.followUpDate} · 8 days overdue</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                IMPACT REPORTING PREFERENCES
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(donor.crmInfo?.impactPreferences || ['Quarterly impact report', 'Annual certificate']).map(
                  (pref) => (
                    <span
                      key={pref}
                      className="px-2.5 py-1 rounded-lg bg-[var(--chip)] text-[11.5px] font-bold text-[var(--ink)]"
                    >
                      {pref}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
                FOODSPACE COMPANY ID
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[var(--field)] border border-dashed border-[var(--border)] text-[12.5px] font-semibold text-[var(--muted2)]">
                <Database className="w-3.25 h-3.25" />
                <span>Not yet synced</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--divider)] my-6" />
          <div className="text-[11px] font-bold tracking-wider text-[var(--muted2)] mb-2.25">
            ADDITIONAL INFORMATION
          </div>
          <p className="m-0 max-w-[760px] text-[13.5px] font-medium leading-relaxed text-[var(--ink)]">
            {donor.crmInfo?.notes ||
              'Group procurement is reviewing a national surplus agreement that would extend collections to the Cape Town and Durban plants. Dineo has asked for a written impact summary before the September board meeting.'}
          </p>
        </section>
      )}

      {/* Tab Content 5: ACTIVITY */}
      {activeTab === 'Activity' && (
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-4.5 items-start">
          {/* Interaction Timeline */}
          <div>
            <div className="flex items-center justify-between gap-3.5 mb-3.5">
              <h2 className="m-0 text-15 font-extrabold tracking-tight text-[var(--ink)]">
                Interaction timeline
              </h2>
              <Button variant="default" size="sm" onClick={onOpenLogModal}>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Log Interaction</span>
              </Button>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-1.5 px-6">
              {timeline.map((item, idx) => {
                const isExpanded = !!expandedTimeline[idx];
                const isLast = idx === timeline.length - 1;
                const authorInitials = getInitials(item.author);
                const avatarBg = MANAGER_PALETTE[item.author] || '#3F5D46';

                return (
                  <div key={item.id} className="flex gap-4 py-5 border-t border-[var(--hair)] first:border-none">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="w-8.5 h-8.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-[var(--icon)]" />
                      </span>
                      {!isLast && <span className="flex-1 w-[1.5px] bg-[var(--divider)] mt-2 min-h-[6px]" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="text-sm font-extrabold tracking-tight text-[var(--ink)]">
                          {item.subject}
                        </span>
                        <span className="px-2.25 py-0.75 rounded-md bg-[var(--chip)] text-[10.5px] font-bold tracking-wide text-[var(--muted)] whitespace-nowrap">
                          {item.type}
                        </span>
                        <span className="ml-auto text-[11.5px] font-semibold text-[var(--muted2)] whitespace-nowrap">
                          {item.ago}
                        </span>
                      </div>

                      <p
                        className={`m-0 mt-1.75 text-13 font-medium leading-relaxed text-[var(--muted)] max-w-[640px] ${
                          isExpanded ? '' : 'line-clamp-2'
                        }`}
                      >
                        {item.body}
                      </p>

                      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5.5 h-5.5 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: avatarBg }}
                          >
                            {authorInitials}
                          </span>
                          <span className="text-xs font-semibold text-[var(--muted)]">
                            {item.author}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedTimeline((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }))
                          }
                          className="p-0 border-none bg-transparent text-xs font-bold text-[var(--ink)] cursor-pointer border-b-[1.5px] border-[#FADF01]"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks Checklist */}
          <div>
            <div className="flex items-center justify-between gap-3.5 mb-3.5">
              <h2 className="m-0 text-15 font-extrabold tracking-tight text-[var(--ink)]">
                Tasks
              </h2>
              <Button variant="secondary" size="sm">
                <Plus className="w-3.25 h-3.25 stroke-[2.2]" />
                <span>Add Task</span>
              </Button>
            </div>

            <div className="flex flex-col gap-2.5">
              {tasks.map((t) => {
                const assigneeInitials = getInitials(t.by);
                const avatarBg = MANAGER_PALETTE[t.by] || '#3F5D46';

                return (
                  <div
                    key={t.id}
                    className="flex items-start gap-3 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_1px_3px_var(--shadow)] p-3.5 px-4"
                  >
                    <button
                      onClick={() => onToggleTask(t.id)}
                      className={`shrink-0 w-5 h-5 mt-0.5 rounded-md flex items-center justify-center cursor-pointer border-[1.5px] transition-colors ${
                        t.done
                          ? 'border-[#16160F] bg-[#16160F]'
                          : 'border-[var(--border)] bg-[var(--field)]'
                      }`}
                    >
                      {t.done && <Check className="w-3 h-3 text-[#FADF01] stroke-[3.4]" />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-13 font-bold leading-snug ${
                          t.done ? 'text-[var(--muted2)] line-through' : 'text-[var(--ink)]'
                        }`}
                      >
                        {t.title}
                      </div>

                      <div className="flex items-center gap-2.5 mt-2.25 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.25 py-1 rounded-md text-[11.5px] font-bold ${
                            t.overdue && !t.done
                              ? 'bg-[#FBE9E9] text-[#9B2C2C]'
                              : 'bg-[var(--chip)] text-[var(--muted)]'
                          }`}
                        >
                          <CalendarIcon className="w-3 h-3" />
                          <span>{t.due}</span>
                        </span>

                        <span className="ml-auto flex items-center gap-1.75">
                          <span
                            className="w-5.5 h-5.5 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: avatarBg }}
                          >
                            {assigneeInitials}
                          </span>
                          <span className="text-[11.5px] font-semibold text-[var(--muted)]">
                            {t.by}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
