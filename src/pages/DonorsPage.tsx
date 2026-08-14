import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ChevronDown, 
  Check, 
  MoreHorizontal, 
  Eye, 
  Edit3, 
  MessageSquare, 
  Phone, 
  Mail, 
  Users,
  ChevronLeft,
  ChevronRight,
  FilterX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Donor } from '@/types/crm';
import { getInitials, MANAGER_PALETTE } from '@/data/mockData';

interface DonorsPageProps {
  donors: Donor[];
  onNewDonorClick: () => void;
  onSelectDonor: (id: string) => void;
  onLogInteractionClick: (donorName: string) => void;
}

export const DonorsPage: React.FC<DonorsPageProps> = ({
  donors,
  onNewDonorClick,
  onSelectDonor,
  onLogInteractionClick,
}) => {
  const [viewState, setViewState] = useState<'table' | 'loading' | 'empty'>('table');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [donationFilter, setDonationFilter] = useState('All');
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const statusOpts = ['All', 'Pending Review', 'Active', 'Lapsed', 'Rejected'];
  const typeOpts = ['All', 'Manufacturer', 'Retailer', 'Distributor'];
  const regionOpts = ['All', 'Johannesburg', 'Cape Town', 'Durban'];
  const donationOpts = ['All', 'Meat', 'Dairy', 'Produce'];
  const pageSizes = [10, 20, 50];

  const cycleFilter = (current: string, options: string[], setter: (val: string) => void) => {
    const idx = options.indexOf(current);
    setter(options[(idx + 1) % options.length]);
    setPage(1);
  };

  const filteredDonors = donors.filter((d) => {
    const q = query.trim().toLowerCase();
    if (q && !d.name.toLowerCase().includes(q)) return false;
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    if (typeFilter !== 'All' && d.type !== typeFilter) return false;
    if (overdueOnly && !d.overdue) return false;
    return true;
  });

  const total = filteredDonors.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = total ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, total);
  const pageRows = viewState === 'loading' || viewState === 'empty' ? [] : filteredDonors.slice(start - 1, end);
  const anyFilter = query || statusFilter !== 'All' || typeFilter !== 'All' || regionFilter !== 'All' || donationFilter !== 'All' || overdueOnly;

  const clearAllFilters = () => {
    setQuery('');
    setStatusFilter('All');
    setTypeFilter('All');
    setRegionFilter('All');
    setDonationFilter('All');
    setOverdueOnly(false);
    setPage(1);
    setViewState('table');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending Review':
        return { fg: '#8A6100', dot: '#D99A00' };
      case 'Active':
        return { fg: '#1E6E3C', dot: '#2E9E56' };
      case 'Lapsed':
        return { fg: '#9B2C2C', dot: '#D4373A' };
      default:
        return { fg: '#5F5F57', dot: '#9A9A90' };
    }
  };

  const renderLastInteractionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-3.75 h-3.75 text-[var(--muted2)]" />;
      case 'meeting':
        return <Users className="w-3.75 h-3.75 text-[var(--muted2)]" />;
      default:
        return <Phone className="w-3.75 h-3.75 text-[var(--muted2)]" />;
    }
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-[26px_30px_34px]">
      {/* Header Banner */}
      <div className="flex items-end gap-6 flex-wrap mb-5">
        <div>
          <h1 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
            Donors
          </h1>
          <p className="m-0 text-sm font-medium text-[var(--muted)]">
            Manage your donor relationships and profiles.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <Button
            variant="secondary"
            onClick={() => setViewState((prev) => (prev === 'table' ? 'loading' : prev === 'loading' ? 'empty' : 'table'))}
            title="Cycle demo state: Table -> Loading -> Empty"
          >
            <Download className="w-3.75 h-3.75 text-[var(--ink)]" />
            <span>Export</span>
          </Button>

          <Button variant="default" onClick={onNewDonorClick}>
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>New Donor</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-4 mb-4.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search Input */}
          <div className="flex items-center gap-2.25 h-[42px] px-4 rounded-full border border-[var(--border)] bg-[var(--card)] flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[var(--icon)] shrink-0" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by company name..."
              className="flex-1 min-w-0 border-none outline-none bg-transparent text-[13.5px] font-medium text-[var(--ink)] placeholder-[var(--muted2)]"
            />
          </div>

          {/* Status Dropdown Filter */}
          <button
            onClick={() => cycleFilter(statusFilter, statusOpts, setStatusFilter)}
            className={`flex items-center gap-1.75 h-[42px] px-3.5 rounded-full border text-[12.5px] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              statusFilter !== 'All'
                ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--ink)]'
            }`}
          >
            <span className={statusFilter !== 'All' ? 'font-semibold text-[#16160F]' : 'font-semibold text-[var(--muted)]'}>
              Status:
            </span>
            <span className="font-bold">{statusFilter}</span>
            <ChevronDown className="w-3.25 h-3.25 text-[var(--icon)] shrink-0" />
          </button>

          {/* Type Dropdown Filter */}
          <button
            onClick={() => cycleFilter(typeFilter, typeOpts, setTypeFilter)}
            className={`flex items-center gap-1.75 h-[42px] px-3.5 rounded-full border text-[12.5px] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              typeFilter !== 'All'
                ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--ink)]'
            }`}
          >
            <span className={typeFilter !== 'All' ? 'font-semibold text-[#16160F]' : 'font-semibold text-[var(--muted)]'}>
              Type:
            </span>
            <span className="font-bold">{typeFilter}</span>
            <ChevronDown className="w-3.25 h-3.25 text-[var(--icon)] shrink-0" />
          </button>

          {/* Region Dropdown Filter */}
          <button
            onClick={() => cycleFilter(regionFilter, regionOpts, setRegionFilter)}
            className={`flex items-center gap-1.75 h-[42px] px-3.5 rounded-full border text-[12.5px] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              regionFilter !== 'All'
                ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--ink)]'
            }`}
          >
            <span className={regionFilter !== 'All' ? 'font-semibold text-[#16160F]' : 'font-semibold text-[var(--muted)]'}>
              Region:
            </span>
            <span className="font-bold">{regionFilter}</span>
            <ChevronDown className="w-3.25 h-3.25 text-[var(--icon)] shrink-0" />
          </button>

          {/* Overdue Checkbox Filter */}
          <button
            onClick={() => {
              setOverdueOnly(!overdueOnly);
              setPage(1);
            }}
            className={`flex items-center gap-2.25 h-[42px] px-4 rounded-full border text-[12.5px] font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              overdueOnly
                ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--ink)]'
            }`}
          >
            <span
              className={`w-4.25 h-4.25 rounded-md flex items-center justify-center border ${
                overdueOnly ? 'border-[#16160F] bg-[#16160F]' : 'border-[var(--border)] bg-[var(--field)]'
              }`}
            >
              {overdueOnly && <Check className="w-3 h-3 text-[#FADF01] stroke-[3]" />}
            </span>
            <span>Follow-up overdue</span>
          </button>

          {/* Clear Filters */}
          {anyFilter && (
            <button
              onClick={clearAllFilters}
              className="h-[42px] px-2 border-b-[1.5px] border-[#FADF01] bg-transparent text-xs font-bold text-[var(--ink)] cursor-pointer self-center"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Main Table Section */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-4">
        <div className="bg-[var(--card)] rounded-xl shadow-[0_1px_3px_var(--shadow)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[1180px]">
              <thead>
                <tr className="bg-[var(--hair)]">
                  <th className="text-left py-3.75 pr-3.5 pl-5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    COMPANY NAME
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    COMPANY TYPE
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    STATUS
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    RELATIONSHIP MANAGER
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    REGIONS
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    DONATION FREQUENCY
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    LAST INTERACTION
                  </th>
                  <th className="text-left py-3.75 px-3.5 text-[11.5px] font-bold tracking-wider text-[var(--muted2)]">
                    FOLLOW-UP DATE
                  </th>
                  <th className="w-14 py-3.75 pr-4 pl-2"></th>
                </tr>
              </thead>
              <tbody>
                {/* Skeleton Loading State */}
                {viewState === 'loading' && (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <tr key={idx} className="border-t border-[var(--hair)]">
                      <td className="py-4 pr-3.5 pl-5">
                        <div className="w-[158px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[92px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[86px] h-5.5 rounded-full bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                          <div className="w-[102px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                        </div>
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[70px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[74px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[88px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 px-3.5">
                        <div className="w-[84px] h-3 rounded-md bg-gradient-to-r from-[var(--skel)] via-[var(--skel2)] to-[var(--skel)] animate-shimmer" />
                      </td>
                      <td className="py-4 pr-4 pl-2" />
                    </tr>
                  ))
                )}

                {/* Data Table Rows */}
                {viewState === 'table' && pageRows.map((donor, idx) => {
                  const s = getStatusStyle(donor.status);
                  const initials = getInitials(donor.manager);
                  const avatarBg = MANAGER_PALETTE[donor.manager] || '#3B4A40';
                  const shownRegions = donor.regions.slice(0, 2);
                  const extraRegions = donor.regions.length - shownRegions.length;

                  return (
                    <tr
                      key={donor.id}
                      onClick={() => onSelectDonor(donor.id)}
                      className="border-t border-[var(--hair)] cursor-pointer hover:bg-[var(--row-hover)] transition-colors"
                    >
                      <td className="py-3.75 pr-3.5 pl-5">
                        <span className="text-[13.5px] font-bold text-[var(--ink)] hover:text-[#C9B300] whitespace-nowrap">
                          {donor.name}
                        </span>
                      </td>

                      <td className="py-3.75 px-3.5 text-13 text-[var(--muted)] font-medium whitespace-nowrap">
                        {donor.type}
                      </td>

                      <td className="py-3.75 px-3.5">
                        <span
                          className="inline-flex items-center gap-1.75 text-[12.5px] font-bold whitespace-nowrap"
                          style={{ color: s.fg }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: s.dot }}
                          />
                          <span>{donor.status}</span>
                        </span>
                      </td>

                      <td className="py-3.75 px-3.5">
                        <div className="flex items-center gap-2.25">
                          <div
                            className="shrink-0 w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                            style={{ backgroundColor: avatarBg }}
                          >
                            {initials}
                          </div>
                          <span className="text-13 font-semibold text-[var(--ink)] whitespace-nowrap">
                            {donor.manager}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.75 px-3.5">
                        <div className="flex items-center gap-1.25">
                          {shownRegions.map((reg) => (
                            <span
                              key={reg}
                              className="px-2.25 py-1 rounded-lg bg-[var(--chip)] text-[var(--ink)] text-[11px] font-bold tracking-tight whitespace-nowrap"
                            >
                              {reg}
                            </span>
                          ))}
                          {extraRegions > 0 && (
                            <span className="px-2 py-1 text-[11px] font-semibold text-[var(--muted2)] whitespace-nowrap">
                              +{extraRegions} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.75 px-3.5 text-13 text-[var(--muted)] font-medium whitespace-nowrap">
                        {donor.frequency}
                      </td>

                      <td className="py-3.75 px-3.5">
                        <div className="flex items-center gap-1.75 whitespace-nowrap">
                          {renderLastInteractionIcon(donor.lastInteractionType)}
                          <span className="text-13 text-[var(--muted)] font-medium">
                            {donor.lastInteraction}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.75 px-3.5 text-13 font-semibold whitespace-nowrap">
                        <span className={donor.overdue ? 'text-[#C0272B]' : 'text-[var(--ink)]'}>
                          {donor.followUpDate}
                        </span>
                      </td>

                      {/* Row Action Menu */}
                      <td className="py-3.75 pr-4 pl-2 text-right relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === donor.id ? null : donor.id);
                          }}
                          title="Row actions"
                          className="w-8 h-8 rounded-full border border-transparent bg-transparent flex items-center justify-center cursor-pointer ml-auto hover:border-[var(--border)] hover:bg-[var(--hover)] transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-[var(--icon)]" />
                        </button>

                        {openMenuId === donor.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-[46px] right-3.5 z-20 w-44 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_12px_28px_rgba(20,20,15,0.16)] flex flex-col gap-0.5 text-left"
                          >
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                onSelectDonor(donor.id);
                              }}
                              className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                            >
                              <Eye className="w-3.75 h-3.75 text-[var(--icon)]" />
                              <span>View Profile</span>
                            </button>
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                            >
                              <Edit3 className="w-3.75 h-3.75 text-[var(--icon)]" />
                              <span>Edit Donor</span>
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                onLogInteractionClick(donor.name);
                              }}
                              className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                            >
                              <MessageSquare className="w-3.75 h-3.75 text-[var(--icon)]" />
                              <span>Log Interaction</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!pageRows.length && viewState !== 'loading') && (
            <div className="flex flex-col items-center text-center py-16 px-6">
              <div className="w-14.5 h-14.5 rounded-2xl bg-[var(--icon-bg)] flex items-center justify-center mb-4.5">
                <FilterX className="w-6.5 h-6.5 text-[var(--icon)]" />
              </div>
              <h3 className="m-0 mb-1.75 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                No donors found
              </h3>
              <p className="m-0 mb-5.5 text-[13.5px] text-[var(--muted)] font-medium max-w-[340px]">
                {anyFilter
                  ? 'No donor records match the filters you have applied. Try widening your search.'
                  : 'You have no donor records yet. Create the first profile to start tracking relationships.'}
              </p>
              <div className="flex items-center gap-2.5">
                {anyFilter ? (
                  <Button variant="default" onClick={clearAllFilters}>
                    Clear filters
                  </Button>
                ) : (
                  <Button variant="default" onClick={onNewDonorClick}>
                    Add your first donor
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="flex items-center justify-end gap-4.5 flex-wrap p-3.5 px-5 border-t border-[var(--hair)]">
            <span className="text-[12.5px] text-[var(--muted)] font-medium">
              {total ? `Showing ${start}–${end} of ${total} donors` : 'Showing 0 of 0 donors'}
            </span>

            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-[12.5px] text-[var(--muted)] font-medium">Rows</span>
              <button
                onClick={() => {
                  const idx = pageSizes.indexOf(pageSize);
                  setPageSize(pageSizes[(idx + 1) % pageSizes.length]);
                  setPage(1);
                }}
                className="flex items-center gap-1.75 h-8.5 px-3 rounded-full border border-[var(--border)] bg-[var(--field)] text-[12.5px] font-bold text-[var(--ink)] cursor-pointer"
              >
                <span>{pageSize}</span>
                <ChevronDown className="w-3 h-3 text-[var(--icon)]" />
              </button>
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                title="Previous page"
                className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--field)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => {
                const isActive = n === currentPage;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`min-w-[34px] h-8.5 px-2.5 rounded-full border text-[12.5px] font-bold cursor-pointer transition-colors ${
                      isActive
                        ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--card)]'
                        : 'border-[var(--border)] bg-[var(--field)] text-[var(--ink)]'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={currentPage === pageCount}
                title="Next page"
                className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--field)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:border-[var(--ink)] disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
