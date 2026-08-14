import React, { useState } from 'react';
import { X, Search, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Donor } from '@/types/crm';

interface NewTaskModalProps {
  isOpen: boolean;
  donors: Donor[];
  onClose: () => void;
  onCreate: (task: {
    donor: string;
    title: string;
    desc: string;
    assignedTo: string;
    due: string;
  }) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  donors,
  onClose,
  onCreate,
}) => {
  const [selectedDonor, setSelectedDonor] = useState('FoodCorp SA');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [assignedTo, setAssignedTo] = useState('Keegan Roux');
  const [due, setDue] = useState('14 Aug 2026');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate({
      donor: selectedDonor,
      title: title.trim(),
      desc: desc.trim(),
      assignedTo,
      due: due || '14 Aug 2026',
    });
    setTitle('');
    setDesc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#14140F]/44 backdrop-blur-xs flex items-center justify-center p-7 animate-email-fade">
      <div className="w-[540px] max-w-full max-h-full overflow-y-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_24px_64px_rgba(20,20,15,0.3)] p-6.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="m-0 text-lg font-extrabold tracking-tight text-[var(--ink)]">
              New Task
            </h3>
            <p className="m-0 text-xs font-medium text-[var(--muted)]">
              Assign a follow-up to a colleague against a donor record.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Donor Select */}
          <div>
            <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
              <span>Donor</span>
              <span className="text-[#C0272B]">*</span>
            </label>
            <div className="relative flex items-center gap-[9px] h-11.5 px-3.5 rounded-full border border-[var(--border)] bg-[var(--field)]">
              <Search className="w-4 h-4 text-[var(--icon)] shrink-0" />
              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--ink)] outline-none cursor-pointer appearance-none pr-6"
              >
                {donors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] shrink-0 absolute right-4 pointer-events-none" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
              <span>Title</span>
              <span className="text-[#C0272B]">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Confirm Thursday collection slot"
              className="w-full h-11.5 px-4 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-semibold text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold mb-2 text-[var(--ink)]">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Optional detail for whoever picks this up."
              className="w-full h-24 p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--field)] outline-none resize-none text-[13.5px] font-medium text-[var(--ink)] leading-relaxed focus:ring-2 focus:ring-[#FADF01] transition-all"
            />
          </div>

          {/* Assigned To & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                <span>Assigned To</span>
                <span className="text-[#C0272B]">*</span>
              </label>
              <div className="relative flex items-center gap-2 h-11.5 px-3.5 rounded-full border border-[var(--border)] bg-[var(--field)]">
                <span className="w-6 h-6 rounded-full bg-[#2E5A78] text-white text-[9.5px] font-bold flex items-center justify-center shrink-0">
                  KR
                </span>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--ink)] outline-none cursor-pointer appearance-none pr-6"
                >
                  <option value="Keegan Roux">Keegan Roux</option>
                  <option value="Nomsa Khumalo">Nomsa Khumalo</option>
                  <option value="Ayesha Patel">Ayesha Patel</option>
                  <option value="Sipho Ndlovu">Sipho Ndlovu</option>
                  <option value="Lerato Mahlangu">Lerato Mahlangu</option>
                  <option value="Riaan Botha">Riaan Botha</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] shrink-0 absolute right-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                <span>Due Date</span>
                <span className="text-[#C0272B]">*</span>
              </label>
              <div className="flex items-center gap-2 h-11.5 px-3.5 rounded-full border border-[var(--border)] bg-[var(--field)]">
                <CalendarIcon className="w-4 h-4 text-[var(--icon)] shrink-0" />
                <input
                  type="text"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  placeholder="Select a date"
                  className="w-full bg-transparent border-none outline-none text-[13.5px] font-semibold text-[var(--ink)]"
                />
              </div>
              <p className="m-0 mt-1.5 text-[11.5px] font-medium text-[var(--muted2)]">
                Must be today or later.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-5.5 pt-4.5 border-t border-[var(--divider)]">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};
