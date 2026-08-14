import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RejectionModalProps {
  isOpen: boolean;
  rejectName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const RejectionModal: React.FC<RejectionModalProps> = ({
  isOpen,
  rejectName,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const len = reason.trim().length;
  const isValid = len >= 10;

  const handleSubmit = () => {
    if (!isValid) return;
    onConfirm(reason.trim());
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#14140F]/45 backdrop-blur-xs flex items-center justify-center p-7 animate-email-fade">
      <div className="w-[520px] max-w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_24px_64px_rgba(20,20,15,0.32)] p-6.5">
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4.5">
          <span className="shrink-0 w-10 h-10 rounded-xl bg-[#FBE9E9] flex items-center justify-center text-[#B12A2D]">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="m-0 text-lg font-extrabold tracking-tight text-[var(--ink)]">
              Reject Donor Submission
            </h3>
            <p className="m-0 text-xs font-medium text-[var(--muted)]">
              You are rejecting: <span className="font-extrabold text-[var(--ink)]">{rejectName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reason Input */}
        <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
          <span>Rejection Reason</span>
          <span className="text-[#C0272B]">*</span>
        </label>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Explain what is wrong with this submission and what the relationship manager should do next."
          className={`w-full h-33 p-3.5 rounded-2xl border ${
            reason.length > 0 && !isValid ? 'border-[#D4373A]' : 'border-[var(--border)]'
          } bg-[var(--field)] outline-none resize-none text-[13.5px] font-medium text-[var(--ink)] leading-relaxed focus:ring-2 focus:ring-[#FADF01] transition-all`}
        />

        <div className="flex items-start justify-between gap-3.5 mt-2">
          <p className="m-0 text-[11.5px] font-medium text-[var(--muted)] leading-normal max-w-[340px]">
            This reason will be sent to the relationship manager. Minimum 10 characters.
          </p>
          <span
            className={`shrink-0 text-[11.5px] font-bold tabular-nums ${
              isValid ? 'text-[#1E6E3C]' : 'text-[#B12A2D]'
            }`}
          >
            {len} / 10 min
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 mt-5.5 pt-4.5 border-t border-[var(--divider)]">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`h-11 px-5.5 rounded-full font-bold text-[13.5px] transition-all cursor-pointer ${
              isValid
                ? 'bg-[#C0272B] text-white shadow-[0_2px_8px_rgba(192,39,43,0.3)] hover:bg-[#a61f23]'
                : 'bg-[#EDD9D9] text-[#B49A9A] cursor-not-allowed'
            }`}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};
