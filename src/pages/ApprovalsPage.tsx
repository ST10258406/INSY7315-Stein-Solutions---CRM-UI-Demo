import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ShieldAlert, 
  Globe, 
  Edit3, 
  User, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ApprovalRecord } from '@/types/crm';
import { getInitials, MANAGER_PALETTE } from '@/data/mockData';
import { RejectionModal } from '@/components/modals/RejectionModal';

interface ApprovalsPageProps {
  approvals: ApprovalRecord[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onNavigateToDonor: (donorId: string) => void;
}

export const ApprovalsPage: React.FC<ApprovalsPageProps> = ({
  approvals,
  onApprove,
  onReject,
  onNavigateToDonor,
}) => {
  const [tab, setTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [confirmApproveId, setConfirmApproveId] = useState<string | null>(null);
  const [rejectingRecord, setRejectingRecord] = useState<ApprovalRecord | null>(null);
  const [expandedReasons, setExpandedReasons] = useState<Record<string, boolean>>({});

  const counts = {
    Pending: approvals.filter((r) => r.state === 'Pending').length,
    Approved: approvals.filter((r) => r.state === 'Approved').length,
    Rejected: approvals.filter((r) => r.state === 'Rejected').length,
  };

  const currentRows = approvals.filter((r) => r.state === tab);

  const handleConfirmReject = (reason: string) => {
    if (!rejectingRecord) return;
    onReject(rejectingRecord.id, reason);
    setRejectingRecord(null);
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-[26px_30px_40px]">
      {/* Header Banner */}
      <div className="flex items-end gap-6 flex-wrap mb-4.5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="m-0 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
              Approvals
            </h1>
            <span
              className={`min-w-[32px] h-8 px-2.75 rounded-full inline-flex items-center justify-center text-sm font-extrabold ${
                counts.Pending > 0
                  ? 'bg-[#16160F] text-[#FADF01]'
                  : 'bg-[var(--chip)] text-[var(--muted)]'
              }`}
            >
              {counts.Pending}
            </span>
          </div>
          <p className="m-0 mt-1.75 text-sm text-[var(--muted)] font-medium">
            Review and approve new donor submissions before they go live.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.25 h-[36px] px-3.5 pl-2.75 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-[0_1px_2px_var(--shadow)]">
          <ShieldAlert className="w-3.75 h-3.75 text-[var(--icon)]" />
          <span className="text-xs font-bold tracking-wide text-[var(--muted)]">
            ADMIN ONLY
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-[var(--border)] mb-5 overflow-x-auto no-scrollbar">
        {(['Pending', 'Approved', 'Rejected'] as const).map((label) => {
          const isActive = tab === label;
          return (
            <button
              key={label}
              onClick={() => {
                setTab(label);
                setConfirmApproveId(null);
              }}
              className={`flex items-center gap-2 h-11 px-4.5 border-b-[3px] text-[13.5px] cursor-pointer whitespace-nowrap -mb-px transition-all ${
                isActive
                  ? 'font-extrabold text-[var(--ink)] border-[var(--ink)]'
                  : 'font-semibold text-[var(--muted)] border-transparent hover:text-[var(--ink)]'
              }`}
            >
              <span>{label}</span>
              <span
                className={`min-w-[20px] h-[20px] px-1.5 rounded-full inline-flex items-center justify-center text-[10.5px] font-bold ${
                  isActive
                    ? 'bg-[var(--ink)]/10 text-[var(--ink)]'
                    : 'bg-[var(--chip)] text-[var(--muted2)]'
                }`}
              >
                {counts[label]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rows List */}
      <div className="flex flex-col gap-2.5">
        {currentRows.map((r) => {
          const isPublic = r.source === 'Public Form';
          const isPending = r.state === 'Pending';
          const isApproved = r.state === 'Approved';
          const isReasonOpen = !!expandedReasons[r.id];
          const isConfirmOpen = confirmApproveId === r.id;
          const requesterInitials = r.requester ? getInitials(r.requester) : '';
          const avatarBg = r.requester ? MANAGER_PALETTE[r.requester] || '#3B4A40' : '';

          return (
            <article
              key={r.id}
              className={`p-5 px-5.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] transition-all ${
                isPending && isPublic ? 'border-l-[3px] border-l-[#D99A00]' : ''
              }`}
            >
              <div className="flex items-center gap-5 flex-wrap">
                {/* Donor Info */}
                <div className="min-w-[220px] flex-1">
                  <button
                    onClick={() => onNavigateToDonor('foodcorp-sa')}
                    className="text-[15.5px] font-extrabold tracking-tight text-[var(--ink)] hover:text-[#C9B300] cursor-pointer text-left"
                  >
                    {r.name}
                  </button>
                  <div className="flex items-center gap-2 mt-1.75 flex-wrap">
                    <span className="text-[12.5px] font-medium text-[var(--muted)]">{r.type}</span>
                    <span className="w-0.75 h-0.75 rounded-full bg-[var(--muted2)]" />
                    <span className="text-[12.5px] font-medium text-[var(--muted)]">{r.regions}</span>
                  </div>
                </div>

                {/* Source Column */}
                <div className="shrink-0 min-w-[152px]">
                  <div className="text-[10.5px] font-bold tracking-wide text-[var(--muted2)] mb-1.75">
                    SOURCE
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.75 text-[12.5px] font-bold whitespace-nowrap ${
                      isPublic ? 'text-[#8A6100]' : 'text-[var(--ink)]'
                    }`}
                  >
                    {isPublic ? (
                      <Globe className="w-3.25 h-3.25 shrink-0" />
                    ) : (
                      <Edit3 className="w-3.25 h-3.25 shrink-0" />
                    )}
                    <span>{r.source}</span>
                  </span>
                </div>

                {/* Requested By */}
                <div className="shrink-0 min-w-[176px]">
                  <div className="text-[10.5px] font-bold tracking-wide text-[var(--muted2)] mb-1.75">
                    REQUESTED BY
                  </div>
                  <div className="flex items-center gap-2.25">
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        r.requester
                          ? 'text-white'
                          : 'bg-[var(--icon-bg)] border border-dashed border-[var(--border)] text-[var(--muted2)]'
                      }`}
                      style={{ backgroundColor: avatarBg || undefined }}
                    >
                      {r.requester ? requesterInitials : <User className="w-3.25 h-3.25" />}
                    </span>
                    <span
                      className={`text-13 whitespace-nowrap ${
                        r.requester ? 'font-semibold text-[var(--ink)]' : 'font-medium text-[var(--muted)]'
                      }`}
                    >
                      {r.requester || 'External submission'}
                    </span>
                  </div>
                </div>

                {/* Submitted Ago */}
                <div className="shrink-0 min-w-[118px]">
                  <div className="text-[10.5px] font-bold tracking-wide text-[var(--muted2)] mb-1.75">
                    SUBMITTED
                  </div>
                  <div className="text-13 font-semibold text-[var(--ink)]">{r.submittedAgo}</div>
                </div>

                {/* Action Buttons & Outcome States */}
                <div className="ml-auto flex items-center gap-2.5 relative">
                  {isPending && (
                    <>
                      <Button
                        variant="approve"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmApproveId(confirmApproveId === r.id ? null : r.id);
                        }}
                      >
                        <Check className="w-3.75 h-3.75 stroke-[2.4]" />
                        <span>Approve</span>
                      </Button>

                      <Button
                        variant="reject"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmApproveId(null);
                          setRejectingRecord(r);
                        }}
                      >
                        <X className="w-3.75 h-3.75 stroke-[2.2]" />
                        <span>Reject</span>
                      </Button>
                    </>
                  )}

                  {/* Inline Confirmation Dialog for Approve */}
                  {isConfirmOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-13 right-0 z-40 w-[268px] p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_16px_40px_rgba(20,20,15,0.2)] text-left animate-pop"
                    >
                      <div className="text-[13.5px] font-extrabold tracking-tight text-[var(--ink)]">
                        Approve this donor?
                      </div>
                      <p className="m-0 mt-1.5 mb-3.5 text-xs font-medium text-[var(--muted)] leading-relaxed">
                        {r.name} will go live as an Active donor and the relationship manager will be notified.
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setConfirmApproveId(null)}
                          className="h-9 px-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[12.5px] font-semibold text-[var(--ink)] cursor-pointer hover:border-[var(--ink)]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setConfirmApproveId(null);
                            onApprove(r.id);
                          }}
                          className="h-9 px-4 rounded-full border-none bg-[#1E6E3C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#185C32]"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Decided Outcome Badges */}
                  {!isPending && (
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[12.5px] font-bold whitespace-nowrap ${
                          isApproved ? 'bg-[#E5F4E9] text-[#1E6E3C]' : 'bg-[#FBE9E9] text-[#9B2C2C]'
                        }`}
                      >
                        {isApproved ? (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span>
                          {isApproved ? 'Approved by ' : 'Rejected by '}
                          {r.approvedBy || 'Keegan Roux'}, {r.decidedWhen || 'just now'}
                        </span>
                      </span>

                      {!isApproved && r.rejectionReason && (
                        <button
                          onClick={() =>
                            setExpandedReasons((prev) => ({
                              ...prev,
                              [r.id]: !prev[r.id],
                            }))
                          }
                          className="p-0 border-none bg-transparent text-xs font-bold text-[var(--ink)] cursor-pointer border-b-[1.5px] border-[#FADF01]"
                        >
                          {isReasonOpen ? 'Hide reason' : 'View reason'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable Rejection Reason Panel */}
              {!isPending && !isApproved && r.rejectionReason && isReasonOpen && (
                <div className="mt-4 p-3.5 px-4 rounded-xl bg-[#FBE9E9] border border-[#F1CFCF]">
                  <div className="text-[10.5px] font-bold tracking-wide text-[#9B2C2C] mb-1.5">
                    REJECTION REASON
                  </div>
                  <p className="m-0 text-13 font-medium text-[#7C2325] leading-relaxed">
                    {r.rejectionReason}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {currentRows.length === 0 && (
        <div className="flex flex-col items-center text-center py-17 px-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)]">
          <div className="w-15.5 h-15.5 rounded-2xl bg-[#E5F4E9] flex items-center justify-center mb-4.5">
            <CheckCircle2 className="w-7 h-7 text-[#1E6E3C]" />
          </div>
          <h3 className="m-0 mb-1.75 text-lg font-extrabold tracking-tight text-[var(--ink)]">
            {tab === 'Pending' ? "No pending approvals — you're all caught up!" : 'Nothing here yet'}
          </h3>
          <p className="m-0 text-[13.5px] text-[var(--muted)] font-medium max-w-[380px]">
            {tab === 'Pending'
              ? 'Every submission has been reviewed. New donor applications will appear here the moment they arrive.'
              : `No submissions have been ${tab.toLowerCase()} yet.`}
          </p>
        </div>
      )}

      {/* Rejection Reason Modal */}
      <RejectionModal
        isOpen={!!rejectingRecord}
        rejectName={rejectingRecord?.name || ''}
        onClose={() => setRejectingRecord(null)}
        onConfirm={handleConfirmReject}
      />
    </main>
  );
};
