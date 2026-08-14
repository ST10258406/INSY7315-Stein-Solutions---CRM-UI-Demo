import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Plus, 
  MessageSquare, 
  Users, 
  Clock, 
  TrendingUp, 
  ChevronDown, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DASHBOARD_CHARTS_DATA, OVERDUE_FOLLOWUPS, getInitials, MANAGER_PALETTE } from '@/data/mockData';

interface DashboardPageProps {
  onNewDonorClick: () => void;
  onNavigateToDonor: (donorId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNewDonorClick,
  onNavigateToDonor,
}) => {
  const [period, setPeriod] = useState<'Weekly' | 'Monthly'>('Weekly');

  const chartItems = DASHBOARD_CHARTS_DATA[period];
  const maxVal = Math.max(...chartItems.map((d) => d.value));
  const totalContacted = chartItems.reduce((acc, d) => acc + d.value, 0);
  const avgPerManager = Math.round(totalContacted / chartItems.length);
  const top3Names = [...chartItems]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((d) => d.label);

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

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-[26px_30px_34px]">
      {/* Header Banner */}
      <div className="flex items-end gap-6 flex-wrap mb-6">
        <div>
          <h1 className="m-0 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
            Welcome back, <span className="text-[var(--ink)]">Keegan</span>!
          </h1>
          <p className="m-0 mt-1.5 text-sm font-medium text-[var(--muted)]">
            Track donor relationships, follow-ups, and approvals.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <Button variant="secondary">
            <Filter className="w-3.75 h-3.75 text-[var(--ink)]" />
            <span>Filters</span>
          </Button>

          <Button variant="secondary">
            <Download className="w-3.75 h-3.75 text-[var(--ink)]" />
            <span>Export</span>
          </Button>

          <Button variant="default" onClick={onNewDonorClick}>
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>New Donor</span>
          </Button>
        </div>
      </div>

      {/* Top 3 Stat Cards Section */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 mb-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="m-0 mb-1 text-base font-bold tracking-tight text-[var(--ink)]">
              Donor activity
            </h2>
            <p className="m-0 text-xs font-medium text-[var(--muted)]">
              Rolling 30 days, compared with the previous period.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors">
              <SlidersHorizontal className="w-3.75 h-3.75" />
            </button>
            <button className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors">
              <ExternalLink className="w-3.75 h-3.75" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Donors Contacted */}
          <div className="bg-[var(--card)] rounded-xl p-[18px_18px_0] shadow-[0_1px_3px_var(--shadow)]">
            <div className="flex items-center gap-2.25 mb-4">
              <div className="w-7.5 h-7.5 rounded-lg bg-[var(--icon-bg)] flex items-center justify-center text-[var(--ink)]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[var(--ink)]">Donors Contacted</span>
            </div>
            <div className="flex items-center gap-1.25 mb-0.5">
              <TrendingUp className="w-3.25 h-3.25 text-[#1E8A4C]" />
              <span className="text-xs font-bold text-[#1E8A4C]">+11.5%</span>
            </div>
            <div className="text-[28px] font-extrabold tracking-tight mb-1.5 text-[var(--ink)]">
              412
            </div>
            <svg viewBox="0 0 220 62" preserveAspectRatio="none" className="block w-full h-[62px]">
              <defs>
                <linearGradient id="sparkA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FADF01" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#FADF01" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 44 L18 38 L36 46 L54 30 L72 36 L90 22 L108 30 L126 16 L144 26 L162 12 L180 20 L198 8 L220 14 L220 62 L0 62 Z"
                fill="url(#sparkA)"
              />
              <path
                d="M0 44 L18 38 L36 46 L54 30 L72 36 L90 22 L108 30 L126 16 L144 26 L162 12 L180 20 L198 8 L220 14"
                fill="none"
                stroke="#FADF01"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Card 2: Active Donors */}
          <div className="bg-[var(--card)] rounded-xl p-[18px_18px_0] shadow-[0_1px_3px_var(--shadow)]">
            <div className="flex items-center gap-2.25 mb-4">
              <div className="w-7.5 h-7.5 rounded-lg bg-[var(--icon-bg)] flex items-center justify-center text-[var(--ink)]">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[var(--ink)]">Active Donors</span>
            </div>
            <div className="flex items-center gap-1.25 mb-0.5">
              <TrendingUp className="w-3.25 h-3.25 text-[#1E8A4C]" />
              <span className="text-xs font-bold text-[#1E8A4C]">+4.5%</span>
            </div>
            <div className="text-[28px] font-extrabold tracking-tight mb-1.5 text-[var(--ink)]">
              1 286
            </div>
            <svg viewBox="0 0 220 62" preserveAspectRatio="none" className="block w-full h-[62px]">
              <defs>
                <linearGradient id="sparkB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FADF01" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#FADF01" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 34 L18 40 L36 28 L54 34 L72 20 L90 32 L108 24 L126 34 L144 22 L162 28 L180 16 L198 24 L220 18 L220 62 L0 62 Z"
                fill="url(#sparkB)"
              />
              <path
                d="M0 34 L18 40 L36 28 L54 34 L72 20 L90 32 L108 24 L126 34 L144 22 L162 28 L180 16 L198 24 L220 18"
                fill="none"
                stroke="#FADF01"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Card 3: Pending Approvals (Urgent Dark Card) */}
          <div className="bg-[var(--urgent)] rounded-xl p-[18px_18px_0] shadow-[0_4px_14px_rgba(20,20,15,0.22)]">
            <div className="flex items-center gap-2.25 mb-4">
              <div className="w-7.5 h-7.5 rounded-lg bg-[#FADF01]/16 flex items-center justify-center text-[#FADF01]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white">Pending Approvals</span>
            </div>
            <div className="flex items-center gap-1.25 mb-0.5">
              <TrendingUp className="w-3.25 h-3.25 text-[#FADF01]" />
              <span className="text-xs font-bold text-[#FADF01]">+8 this week</span>
            </div>
            <div className="text-[28px] font-extrabold tracking-tight mb-1.5 text-white">
              23
            </div>
            <svg viewBox="0 0 220 62" preserveAspectRatio="none" className="block w-full h-[62px]">
              <defs>
                <linearGradient id="sparkC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FADF01" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#FADF01" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 40 L18 30 L36 38 L54 24 L72 32 L90 18 L108 28 L126 20 L144 30 L162 18 L180 26 L198 14 L220 22 L220 62 L0 62 Z"
                fill="url(#sparkC)"
              />
              <path
                d="M0 40 L18 30 L36 38 L54 24 L72 32 L90 18 L108 28 L126 20 L144 30 L162 18 L180 26 L198 14 L220 22"
                fill="none"
                stroke="#FADF01"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Grid: Summary Chart + Overdue Table */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,0.85fr)_1.3fr] gap-5 items-start">
        {/* Left Section: RM Activity Chart */}
        <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="m-0 mb-1 text-base font-bold tracking-tight text-[var(--ink)]">
                Summary
              </h2>
              <p className="m-0 text-xs font-medium text-[var(--muted)]">
                Donors contacted per relationship manager.
              </p>
            </div>
            <button
              onClick={() => setPeriod((p) => (p === 'Weekly' ? 'Monthly' : 'Weekly'))}
              className="flex items-center gap-1.75 h-8.5 px-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-semibold text-[var(--ink)] cursor-pointer shrink-0 hover:border-[var(--ink)] transition-colors"
            >
              <span>{period}</span>
              <ChevronDown className="w-3.25 h-3.25 text-[var(--icon)]" />
            </button>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-4.5 shadow-[0_1px_3px_var(--shadow)]">
            <div className="flex items-stretch gap-5 mb-5">
              <div>
                <div className="text-[11.5px] font-semibold text-[var(--muted2)] mb-0.75">
                  Total contacted
                </div>
                <div className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">
                  {totalContacted}
                </div>
              </div>
              <div className="w-px bg-[var(--divider)]" />
              <div>
                <div className="text-[11.5px] font-semibold text-[var(--muted2)] mb-0.75">
                  Avg per manager
                </div>
                <div className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">
                  {avgPerManager}
                </div>
              </div>
            </div>

            {/* Bar Graph */}
            <div className="flex items-end gap-2.5 h-[150px]">
              {chartItems.map((bar) => {
                const isTop = top3Names.includes(bar.label);
                const heightPx = Math.round((bar.value / maxVal) * 118 + 8);
                return (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isTop ? 'bg-[#FADF01]' : 'bg-[var(--bar-track)]'
                      }`}
                      style={{ height: `${heightPx}px` }}
                      title={`${bar.label}: ${bar.value} donors`}
                    />
                    <span className="text-[10.5px] font-semibold text-[var(--muted2)]">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Section: Overdue Follow-Ups Table */}
        <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="m-0 mb-1 text-base font-bold tracking-tight text-[var(--ink)]">
                Overdue Follow-Ups
              </h2>
              <p className="m-0 text-xs font-medium text-[var(--muted)]">
                28 relationships past their contact commitment.
              </p>
            </div>
            <button className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] transition-colors">
              <SlidersHorizontal className="w-3.75 h-3.75" />
            </button>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-[6px_18px_10px] shadow-[0_1px_3px_var(--shadow)] overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left py-3.5 pr-2 pl-0 text-[11.5px] font-semibold text-[var(--muted2)]">
                    Donor
                  </th>
                  <th className="text-left py-3.5 pr-2 pl-0 text-[11.5px] font-semibold text-[var(--muted2)]">
                    Reference
                  </th>
                  <th className="text-left py-3.5 pr-2 pl-0 text-[11.5px] font-semibold text-[var(--muted2)]">
                    Status
                  </th>
                  <th className="text-left py-3.5 pr-2 pl-0 text-[11.5px] font-semibold text-[var(--muted2)]">
                    Overdue
                  </th>
                  <th className="text-right py-3.5 pr-0 pl-2 text-[11.5px] font-semibold text-[var(--muted2)]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {OVERDUE_FOLLOWUPS.map((row, idx) => {
                  const s = getStatusStyle(row.status);
                  const initials = getInitials(row.name);
                  const avatarBg = Object.values(MANAGER_PALETTE)[idx % 7];
                  return (
                    <tr key={row.ref} className="border-t border-[var(--hair)]">
                      <td className="py-3.25 pr-2 pl-0">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="shrink-0 w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center"
                            style={{ backgroundColor: avatarBg }}
                          >
                            {initials}
                          </div>
                          <span className="text-[13.5px] font-semibold text-[var(--ink)] whitespace-nowrap">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.25 pr-2 pl-0 text-13 text-[var(--muted)] font-medium whitespace-nowrap">
                        {row.ref}
                      </td>
                      <td className="py-3.25 pr-2 pl-0">
                        <span
                          className="inline-flex items-center gap-1.75 text-[12.5px] font-bold whitespace-nowrap"
                          style={{ color: s.fg }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: s.dot }}
                          />
                          <span>{row.status}</span>
                        </span>
                      </td>
                      <td className="py-3.25 pr-2 pl-0 text-13 font-bold whitespace-nowrap">
                        <span className={row.days >= 14 ? 'text-[#E05C5F]' : 'text-[var(--ink)]'}>
                          {row.days} days
                        </span>
                      </td>
                      <td className="py-3.25 pr-0 pl-2 text-right whitespace-nowrap">
                        <button
                          onClick={() => onNavigateToDonor('foodcorp-sa')}
                          className="text-13 font-bold text-[var(--ink)] border-b-[1.5px] border-[#FADF01] pb-0.25 hover:text-[#C9B300] cursor-pointer"
                        >
                          View donor
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};
