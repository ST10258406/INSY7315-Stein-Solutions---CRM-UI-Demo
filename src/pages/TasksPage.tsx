import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Building2, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  MoreHorizontal, 
  Edit3, 
  RotateCcw, 
  ChevronDown, 
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TaskItem, Donor } from '@/types/crm';
import { getInitials, MANAGER_PALETTE } from '@/data/mockData';
import { NewTaskModal } from '@/components/modals/NewTaskModal';

interface TasksPageProps {
  tasks: TaskItem[];
  donors: Donor[];
  onToggleTask: (id: string) => void;
  onCreateTask: (task: {
    donor: string;
    title: string;
    desc: string;
    assignedTo: string;
    due: string;
  }) => void;
  onNavigateToDonor: (donorId: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({
  tasks,
  donors,
  onToggleTask,
  onCreateTask,
  onNavigateToDonor,
}) => {
  const [segment, setSegment] = useState<'Open' | 'Completed' | 'All'>('Open');
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [selectedDonorFilter, setSelectedDonorFilter] = useState('All donors');
  const [donorQuery, setDonorQuery] = useState('');
  const [donorMenuOpen, setDonorMenuOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const donorNames = ['All donors', ...Array.from(new Set(donors.map((d) => d.name)))];
  const filteredDonorNames = donorNames.filter(
    (d) => !donorQuery.trim() || d.toLowerCase().includes(donorQuery.trim().toLowerCase())
  );

  const counts = {
    Open: tasks.filter((t) => !t.done).length,
    Completed: tasks.filter((t) => t.done).length,
    All: tasks.length,
  };

  const filteredTasks = tasks.filter((t) => {
    if (segment === 'Open' && t.done) return false;
    if (segment === 'Completed' && !t.done) return false;
    if (overdueOnly && !(t.overdue && !t.done)) return false;
    if (selectedDonorFilter !== 'All donors' && t.donor !== selectedDonorFilter) return false;
    return true;
  });

  const total = filteredTasks.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = total ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, total);
  const pageRows = filteredTasks.slice(start - 1 < 0 ? 0 : start - 1, end);
  const anyFilter = overdueOnly || selectedDonorFilter !== 'All donors' || segment !== 'Open';

  const clearFilters = () => {
    setSegment('Open');
    setOverdueOnly(false);
    setSelectedDonorFilter('All donors');
    setDonorQuery('');
    setPage(1);
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-[26px_30px_40px]">
      {/* Header Banner */}
      <div className="flex items-end gap-6 flex-wrap mb-5">
        <div>
          <h1 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
            My Tasks
          </h1>
          <p className="m-0 text-sm font-medium text-[var(--muted)]">
            Follow-ups and action items assigned to you.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <Button variant="default" onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>New Task</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-4 mb-4.5">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Segment Pills */}
          <div className="flex items-center gap-1 p-1 rounded-[23px] bg-[var(--card)] border border-[var(--border)]">
            {(['Open', 'Completed', 'All'] as const).map((label) => {
              const isActive = segment === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setSegment(label);
                    setPage(1);
                  }}
                  className={`flex items-center gap-2 h-9.5 px-4 rounded-full text-13 cursor-pointer whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--card)] font-bold'
                      : 'bg-transparent text-[var(--pill-ink)] font-semibold hover:text-[var(--ink)]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`min-w-[20px] h-[20px] px-1.5 rounded-full inline-flex items-center justify-center text-[10.5px] font-bold ${
                      isActive
                        ? 'bg-white/16 text-white'
                        : 'bg-[var(--chip)] text-[var(--muted)]'
                    }`}
                  >
                    {counts[label]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Overdue Filter Checkbox */}
          <button
            onClick={() => {
              setOverdueOnly(!overdueOnly);
              setPage(1);
            }}
            className={`flex items-center gap-2.25 h-[42px] px-4 rounded-full border text-[12.5px] font-semibold cursor-pointer whitespace-nowrap transition-colors ${
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
              {overdueOnly && <Check className="w-3 h-3 text-[#FADF01] stroke-[3.4]" />}
            </span>
            <span>Overdue only</span>
          </button>

          {/* Donor Search Dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDonorMenuOpen(!donorMenuOpen);
              }}
              className={`flex items-center gap-2.25 h-[42px] px-3.75 rounded-full border text-[12.5px] font-semibold cursor-pointer whitespace-nowrap bg-[var(--card)] text-[var(--ink)] transition-colors ${
                selectedDonorFilter !== 'All donors' ? 'border-[var(--ink)]' : 'border-[var(--border)]'
              }`}
            >
              <Building2 className="w-3.75 h-3.75 text-[var(--icon)] shrink-0" />
              <span>{selectedDonorFilter}</span>
              <ChevronDown className="w-3.25 h-3.25 text-[var(--icon)] shrink-0" />
            </button>

            {donorMenuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-[50px] right-0 z-40 w-[258px] p-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_14px_34px_rgba(20,20,15,0.18)] animate-pop"
              >
                <div className="flex items-center gap-2 h-9.5 px-3 rounded-full bg-[var(--field)] border border-[var(--border)] mb-1.5">
                  <Search className="w-3.5 h-3.5 text-[var(--icon)] shrink-0" />
                  <input
                    value={donorQuery}
                    onChange={(e) => setDonorQuery(e.target.value)}
                    placeholder="Search donors..."
                    className="flex-1 min-w-0 border-none outline-none bg-transparent text-[12.5px] font-semibold text-[var(--ink)]"
                  />
                </div>
                <div className="max-h-[216px] overflow-y-auto flex flex-col gap-0.5">
                  {filteredDonorNames.map((dName) => {
                    const isSelected = selectedDonorFilter === dName;
                    return (
                      <button
                        key={dName}
                        onClick={() => {
                          setSelectedDonorFilter(dName);
                          setDonorMenuOpen(false);
                          setDonorQuery('');
                          setPage(1);
                        }}
                        className={`flex items-center justify-between gap-2.5 w-full min-h-[36px] px-3 border-none rounded-lg text-[12.5px] cursor-pointer text-left leading-snug transition-colors ${
                          isSelected
                            ? 'bg-[var(--hover)] font-bold text-[var(--ink)]'
                            : 'bg-transparent font-semibold text-[var(--ink)] hover:bg-[var(--hover)]'
                        }`}
                      >
                        <span>{dName}</span>
                        {isSelected && <Check className="w-3.25 h-3.25 text-[var(--ink)] stroke-[2.8]" />}
                      </button>
                    );
                  })}
                  {!filteredDonorNames.length && (
                    <div className="p-3 text-[12.5px] font-semibold text-[var(--muted2)] text-center">
                      No donors match.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {anyFilter && (
            <button
              onClick={clearFilters}
              className="h-[42px] px-2 border-b-[1.5px] border-[#FADF01] bg-transparent text-xs font-bold text-[var(--ink)] cursor-pointer self-center"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Task Cards List */}
      <div className="flex flex-col gap-2.5">
        {pageRows.map((t) => {
          const isLate = t.overdue && !t.done;
          const displayUser = t.done ? t.doneBy || t.by : t.by;
          const initials = getInitials(displayUser);
          const avatarBg = MANAGER_PALETTE[displayUser] || '#3F5D46';

          return (
            <article
              key={t.id}
              className={`flex items-start gap-3.5 p-[18px_18px_18px_20px] rounded-2xl border border-[var(--border)] shadow-[0_1px_3px_var(--shadow)] transition-all ${
                t.done ? 'bg-[var(--soft)] opacity-75' : 'bg-[var(--card)]'
              } ${isLate ? 'border-l-[3px] border-l-[#D4373A]' : ''}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask(t.id)}
                title="Mark complete"
                className={`shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center cursor-pointer border-[1.8px] transition-colors ${
                  t.done
                    ? 'border-[#16160F] bg-[#16160F]'
                    : 'border-[var(--border)] bg-[var(--field)] hover:border-[var(--ink)]'
                }`}
              >
                {t.done && <Check className="w-3.25 h-3.25 text-[#FADF01] stroke-[3.4] animate-pop" />}
              </button>

              {/* Task Details */}
              <div className="min-w-0 flex-1">
                <div
                  className={`text-sm font-extrabold tracking-tight leading-snug ${
                    t.done ? 'text-[var(--muted)] line-through' : 'text-[var(--ink)]'
                  }`}
                >
                  {t.title}
                </div>

                <p className="m-0 mt-1.5 text-[12.5px] font-medium text-[var(--muted)] leading-normal truncate">
                  {t.desc}
                </p>

                <div className="flex items-center gap-2.5 flex-wrap mt-3">
                  {/* Donor Link */}
                  <button
                    onClick={() => onNavigateToDonor('foodcorp-sa')}
                    className="inline-flex items-center gap-1.75 p-1.25 px-2.75 rounded-lg bg-[var(--chip)] text-[11.5px] font-bold text-[var(--ink)] hover:text-[#C9B300] cursor-pointer"
                  >
                    <Building2 className="w-3.25 h-3.25 shrink-0" />
                    <span>{t.donor}</span>
                  </button>

                  {/* Due Date Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold whitespace-nowrap ${
                      isLate ? 'bg-[#FBE9E9] text-[#9B2C2C]' : 'bg-[var(--chip)] text-[var(--muted)]'
                    }`}
                  >
                    {isLate ? <AlertTriangle className="w-3 h-3 shrink-0" /> : <CalendarIcon className="w-3 h-3 shrink-0" />}
                    <span>{t.done ? `Due ${t.due}` : isLate ? `${t.due} · overdue` : `Due ${t.due}`}</span>
                  </span>

                  {/* Assignee / Completed By */}
                  <span className="ml-auto inline-flex items-center gap-1.75 pl-0.5">
                    <span
                      className="w-5.5 h-5.5 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                      style={{ backgroundColor: avatarBg }}
                    >
                      {initials}
                    </span>
                    <span className="text-[11.5px] font-semibold text-[var(--muted2)]">
                      {t.done ? `Completed ${t.doneOn || t.due} by ${displayUser}` : `Created by ${t.by}`}
                    </span>
                  </span>
                </div>
              </div>

              {/* Action Menu */}
              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === t.id ? null : t.id);
                  }}
                  title="Task actions"
                  className="w-8 h-8 rounded-full border border-transparent bg-transparent flex items-center justify-center cursor-pointer hover:border-[var(--border)] hover:bg-[var(--hover)] transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4 text-[var(--icon)]" />
                </button>

                {openMenuId === t.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-9 right-0 z-30 w-[182px] p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_12px_28px_rgba(20,20,15,0.16)] flex flex-col gap-0.5 text-left"
                  >
                    <button
                      onClick={() => setOpenMenuId(null)}
                      className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                    >
                      <Edit3 className="w-3.75 h-3.75 text-[var(--icon)]" />
                      <span>Edit</span>
                    </button>

                    {!t.done ? (
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onToggleTask(t.id);
                        }}
                        className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                      >
                        <Check className="w-3.75 h-3.75 text-[var(--icon)] stroke-[2.2]" />
                        <span>Mark Complete</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onToggleTask(t.id);
                        }}
                        className="flex items-center gap-2.5 h-9 px-3 border-none rounded-lg bg-transparent text-13 font-semibold text-[var(--ink)] cursor-pointer hover:bg-[var(--hover)]"
                      >
                        <RotateCcw className="w-3.75 h-3.75 text-[var(--icon)]" />
                        <span>Reopen</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {!pageRows.length && (
        <div className="flex flex-col items-center text-center py-17 px-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)]">
          <div className="w-15.5 h-15.5 rounded-2xl bg-[#FADF01] flex items-center justify-center mb-4.5 shadow-[0_4px_14px_rgba(250,223,1,0.4)]">
            <CheckCircle className="w-7 h-7 text-[#16160F]" />
          </div>
          <h3 className="m-0 mb-1.75 text-lg font-extrabold tracking-tight text-[var(--ink)]">
            No tasks right now — nice work!
          </h3>
          <p className="m-0 mb-5.5 text-[13.5px] text-[var(--muted)] font-medium max-w-[360px]">
            {anyFilter
              ? 'Nothing matches these filters. Widen them to see the rest of your list.'
              : 'Every task assigned to you is done. New follow-ups will land here automatically.'}
          </p>
          <div className="flex items-center gap-2.5">
            {anyFilter ? (
              <Button variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : null}
            <Button variant="default" onClick={() => setModalOpen(true)}>
              New Task
            </Button>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {!!total && (
        <div className="flex items-center justify-end gap-4.5 flex-wrap mt-4 p-3.5 px-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)]">
          <span className="text-[12.5px] text-[var(--muted)] font-medium">
            Showing {start}–{end} of {total} tasks
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[12.5px] text-[var(--muted)] font-medium">Rows</span>
            <button
              onClick={() => {
                const sizes = [6, 12, 24];
                const idx = sizes.indexOf(pageSize);
                setPageSize(sizes[(idx + 1) % sizes.length]);
                setPage(1);
              }}
              className="flex items-center gap-1.75 h-8.5 px-3 rounded-full border border-[var(--border)] bg-[var(--field)] text-[12.5px] font-bold text-[var(--ink)] cursor-pointer"
            >
              <span>{pageSize}</span>
              <ChevronDown className="w-3 h-3 text-[var(--icon)]" />
            </button>
          </div>

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
      )}

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={modalOpen}
        donors={donors}
        onClose={() => setModalOpen(false)}
        onCreate={(task) => {
          onCreateTask(task);
          setModalOpen(false);
        }}
      />
    </main>
  );
};
