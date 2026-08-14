import React from 'react';
import type { NavTab } from '@/types/crm';
import { useTheme } from '@/context/ThemeContext';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  CheckCircle2,
  BarChart3,
  UserCheck,
  Sun,
  Moon,
  Mail,
  Bell
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  pendingApprovalsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingApprovalsCount = 3
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems: { label: NavTab; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Donors', icon: <Users className="w-4 h-4" /> },
    { label: 'Tasks', icon: <CheckSquare className="w-4 h-4" /> },
    { label: 'Approvals', icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Users', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="flex items-center gap-7 px-6.5 h-[88px] bg-[var(--page)] shrink-0 border-b border-[var(--divider)]">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
        <img
          src="/assets/sa-harvest-logo.svg"
          alt="S.A. Harvest"
          className="w-[62px] h-[62px] rounded-2xl object-cover block shadow-sm border border-[var(--border)]"
        />
        <div className="flex flex-col leading-snug">
          <span className="text-[15.5px] font-extrabold tracking-tight text-[var(--ink)]">
            S.A. Harvest
          </span>
          <span className="text-[9.5px] font-bold tracking-[1.4px] text-[var(--muted)]">
            DONOR CRM
          </span>
        </div>
      </div>

      {/* Global Navigation Pills */}
      <nav className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-2 h-10 px-4 pl-2 rounded-full border text-[13.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive
                  ? 'bg-[var(--pill-active-bg)] border-[var(--pill-active-bg)] text-[var(--pill-active-fg)] font-bold'
                  : 'bg-[var(--pill)] border-[var(--border)] text-[var(--pill-ink)] hover:border-[var(--ink)]'
                }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${isActive ? 'bg-[#FADF01]/20 text-[#FADF01]' : 'bg-[var(--pill-icon-bg)] text-[var(--icon)]'
                  }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.label === 'Approvals' && pendingApprovalsCount > 0 && (
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#FADF01] text-[#16160F]' : 'bg-[#16160F] text-[#FADF01]'
                  }`}>
                  {pendingApprovalsCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="ml-auto shrink-0 flex items-center gap-2.5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle dark mode"
          className="w-9.5 h-9.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Mail Icon */}
        <button
          title="Messages"
          className="w-9.5 h-9.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
        >
          <Mail className="w-4 h-4" />
        </button>

        {/* Notifications Icon with Badge */}
        <button
          title="Notifications"
          className="relative w-9.5 h-9.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-fg)] text-[9.5px] font-bold flex items-center justify-center border-2 border-[var(--page)]">
            7
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-1.5">
          <img
            src="/assets/avatar-keegan.svg"
            alt="Keegan Roux"
            className="w-9.5 h-9.5 rounded-full object-cover block border-2 border-[var(--border)]"
          />
        </div>
      </div>
    </header>
  );
};
