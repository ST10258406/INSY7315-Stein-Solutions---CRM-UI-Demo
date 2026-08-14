import React from 'react';
import { 
  Search, 
  Bookmark, 
  Calendar as CalendarIcon, 
  Bot, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface SideRailProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SideRail: React.FC<SideRailProps> = ({ isOpen, onToggle }) => {
  if (!isOpen) {
    return (
      <aside className="w-[30px] shrink-0 bg-[var(--page)] flex items-end justify-center pb-4 transition-all">
        <button
          onClick={onToggle}
          title="Expand rail"
          className="w-6 h-10 rounded-lg border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-[68px] shrink-0 bg-[var(--page)] flex flex-col items-center py-5.5 pb-4 transition-all">
      <div className="mt-16 flex flex-col gap-1 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-[26px] shadow-[0_1px_3px_var(--shadow)]">
        <button
          title="Search"
          className="w-9.5 h-9.5 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          title="Saved filters"
          className="w-9.5 h-9.5 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <button
          title="Calendar"
          className="w-9.5 h-9.5 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>

        <button
          title="Agent"
          className="w-9.5 h-9.5 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
        >
          <Bot className="w-4 h-4" />
        </button>

        <button
          title="Help & support"
          className="w-9.5 h-9.5 rounded-full border-none bg-transparent flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onToggle}
        title="Collapse rail"
        className="mt-auto w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </aside>
  );
};
