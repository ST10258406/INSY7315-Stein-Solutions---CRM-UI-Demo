import React, { useState } from 'react';
import { X, Phone, Mail, Users, FileText, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: string, subject: string, body: string) => void;
}

const TYPE_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  Call: { label: 'Call', icon: <Phone className="w-3.5 h-3.5" /> },
  Email: { label: 'Email', icon: <Mail className="w-3.5 h-3.5" /> },
  Meeting: { label: 'Meeting', icon: <Users className="w-3.5 h-3.5" /> },
  Note: { label: 'Note', icon: <FileText className="w-3.5 h-3.5" /> },
  'Form Submission': { label: 'Form Submission', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  'Follow-up': { label: 'Follow-up', icon: <Clock className="w-3.5 h-3.5" /> },
};

export const LogInteractionModal: React.FC<LogInteractionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedType, setSelectedType] = useState('Call');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedType, subject || selectedType + ' interaction', body);
    setSubject('');
    setBody('');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#14140F]/42 backdrop-blur-xs flex items-center justify-center p-7 animate-email-fade"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[520px] max-w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_24px_60px_rgba(20,20,15,0.28)] p-6.5"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4.5">
          <h3 className="m-0 text-lg font-extrabold tracking-tight text-[var(--ink)]">
            Log Interaction
          </h3>
          <button
            onClick={onClose}
            className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type Choice Chips */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {Object.keys(TYPE_CONFIG).map((typeKey) => {
            const isSelected = selectedType === typeKey;
            const item = TYPE_CONFIG[typeKey];
            return (
              <button
                key={typeKey}
                onClick={() => setSelectedType(typeKey)}
                className={`flex items-center gap-1.5 h-8.5 px-3.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                    : 'border-[var(--border)] bg-[var(--field)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Inputs */}
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full h-11.5 px-4 mb-2.5 rounded-xl border border-[var(--border)] bg-[var(--field)] text-[13.5px] font-semibold text-[var(--ink)] outline-none focus:ring-2 focus:ring-[#FADF01] transition-all"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What happened?"
          className="w-full h-27 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--field)] text-[13.5px] font-medium text-[var(--ink)] outline-none resize-none focus:ring-2 focus:ring-[#FADF01] transition-all"
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-4.5">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Interaction
          </Button>
        </div>
      </div>
    </div>
  );
};
