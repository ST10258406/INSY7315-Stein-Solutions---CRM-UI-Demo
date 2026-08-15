import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  User as UserIcon, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type DateRangeOption = 'Last 30 days' | 'Last month' | 'Last quarter' | 'Year to date';

const DATE_TOTALS: Record<DateRangeOption, number> = {
  'Last 30 days': 34,
  'Last month': 41,
  'Last quarter': 112,
  'Year to date': 287
};

const MANAGERS = ["Nomsa", "Riaan", "Lerato", "Thabo", "Ayesha", "Sipho", "Johan"];
const WEIGHTS = [0.24, 0.20, 0.17, 0.15, 0.12, 0.07, 0.05];

const STATUS_DATA = [
  { label: "Pending Review", count: 23, color: "#D99A00" },
  { label: "Active", count: 1286, color: "#2E9E56" },
  { label: "Lapsed", count: 214, color: "#D4373A" },
  { label: "Rejected", count: 87, color: "#9A9A90" }
];

const REGIONS = [
  { label: "JHB", value: 486 },
  { label: "CPT", value: 402 },
  { label: "KZN", value: 297 },
  { label: "EC", value: 138 },
  { label: "BFN", value: 96 },
  { label: "MPU", value: 112 },
  { label: "LIM", value: 79 }
];

const TYPES = [
  { full: "Bakery", label: "Bak", value: 61 },
  { full: "Beverages", label: "Bev", value: 39 },
  { full: "Dairy", label: "Dai", value: 44 },
  { full: "Dry Goods", label: "Dry", value: 74 },
  { full: "Financial", label: "Fin", value: 33 },
  { full: "Fruit", label: "Fru", value: 92 },
  { full: "Meat", label: "Mea", value: 27 },
  { full: "Non Food", label: "NF", value: 22 },
  { full: "Prepared Food", label: "Prep", value: 48 },
  { full: "Vegetables", label: "Veg", value: 88 },
  { full: "Other", label: "Oth", value: 15 }
];

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeOption>('Last 30 days');
  const [selectedRm, setSelectedRm] = useState<string>('All managers');
  
  // Dropdown states
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [rmMenuOpen, setRmMenuOpen] = useState(false);
  const [exportPageOpen, setExportPageOpen] = useState(false);
  const [exportHeroOpen, setExportHeroOpen] = useState(false);
  const [exportStatusOpen, setExportStatusOpen] = useState(false);
  const [exportRegionOpen, setExportRegionOpen] = useState(false);
  const [exportTypeOpen, setExportTypeOpen] = useState(false);
  
  // Toast state
  const [toastVisible, setToastVisible] = useState(false);

  // Close menus when clicking outside
  const closeAllMenus = () => {
    setDateMenuOpen(false);
    setRmMenuOpen(false);
    setExportPageOpen(false);
    setExportHeroOpen(false);
    setExportStatusOpen(false);
    setExportRegionOpen(false);
    setExportTypeOpen(false);
  };

  const handleTriggerToast = () => {
    closeAllMenus();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3200);
  };

  // Manager data calculations
  const totalForRange = DATE_TOTALS[dateRange];
  const calculatedVals = WEIGHTS.map((w) => Math.round(w * totalForRange));
  const diff = totalForRange - calculatedVals.reduce((a, b) => a + b, 0);
  calculatedVals[0] += diff;

  const managerData = MANAGERS.map((name, i) => ({
    name,
    contacted: calculatedVals[i],
    interactions: Math.round(calculatedVals[i] * (2.6 + i * 0.18))
  }));

  const filteredManagerData = selectedRm === 'All managers' 
    ? managerData 
    : managerData.filter((d) => d.name === selectedRm);

  const headlineCount = filteredManagerData.reduce((s, d) => s + d.contacted, 0);
  const maxHero = Math.max(...managerData.map((d) => d.contacted));

  // Donut chart calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const statusTotal = STATUS_DATA.reduce((s, d) => s + d.count, 0);

  let accumulatedLength = 0;
  const donutSegments = STATUS_DATA.map((d) => {
    const len = (d.count / statusTotal) * circumference;
    const dashVal = Math.max(len - 2, 0.5);
    const seg = {
      color: d.color,
      dashArray: `${dashVal.toFixed(2)} ${(circumference - dashVal).toFixed(2)}`,
      offset: (-accumulatedLength).toFixed(2)
    };
    accumulatedLength += len;
    return seg;
  });

  const maxRegion = Math.max(...REGIONS.map((r) => r.value));
  const maxType = Math.max(...TYPES.map((t) => t.value));

  return (
    <main 
      className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8"
      onClick={closeAllMenus}
    >
      <div className="flex items-end gap-6 flex-wrap mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-1.5">Reports</h1>
          <p className="text-sm font-medium text-[var(--muted)]">Track donor engagement and organizational KPIs.</p>
        </div>

        <div className="ml-auto relative">
          <Button
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); setExportPageOpen(!exportPageOpen); }}
          >
            <Download className="w-3.75 h-3.75 text-[var(--ink)]" />
            <span>Export</span>
          </Button>
          {exportPageOpen && (
            <div
              className="absolute top-12 right-0 z-30 min-w-[168px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleTriggerToast}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
                <span>Export as PDF</span>
              </button>
              <button
                onClick={handleTriggerToast}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--icon)]" />
                <span>Export as Excel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 1: Donors Contacted */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 mb-5">
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <div className="mr-auto">
            <h2 className="text-base font-bold text-[var(--ink)] tracking-tight mb-1">Donors Contacted</h2>
            <p className="text-xs font-medium text-[var(--muted)]">Unique donors contacted per relationship manager.</p>
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setDateMenuOpen(!dateMenuOpen); setRmMenuOpen(false); setExportHeroOpen(false); }}
              className="flex items-center gap-2 h-9 px-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[var(--icon)]" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-[var(--icon)]" />
            </button>
            {dateMenuOpen && (
              <div 
                className="absolute top-11 right-0 z-30 min-w-[180px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {(Object.keys(DATE_TOTALS) as DateRangeOption[]).map((label) => (
                  <button
                    key={label}
                    onClick={() => { setDateRange(label); setDateMenuOpen(false); }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                      dateRange === label ? 'bg-[var(--hover)] text-[var(--ink)]' : 'text-[var(--ink)] hover:bg-[var(--hover)]'
                    }`}
                  >
                    <span>{label}</span>
                    {dateRange === label && <Check className="w-3.5 h-3.5 text-[var(--ink)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RM Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setRmMenuOpen(!rmMenuOpen); setDateMenuOpen(false); setExportHeroOpen(false); }}
              className="flex items-center gap-2 h-9 px-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-[var(--icon)]" />
              <span>{selectedRm}</span>
              <ChevronDown className="w-3 h-3 text-[var(--icon)]" />
            </button>
            {rmMenuOpen && (
              <div 
                className="absolute top-11 right-0 z-30 min-w-[190px] max-h-[280px] overflow-y-auto bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {['All managers', ...MANAGERS].map((label) => (
                  <button
                    key={label}
                    onClick={() => { setSelectedRm(label); setRmMenuOpen(false); }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                      selectedRm === label ? 'bg-[var(--hover)] text-[var(--ink)]' : 'text-[var(--ink)] hover:bg-[var(--hover)]'
                    }`}
                  >
                    <span>{label}</span>
                    {selectedRm === label && <Check className="w-3.5 h-3.5 text-[var(--ink)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hero Export Button */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setExportHeroOpen(!exportHeroOpen); setDateMenuOpen(false); setRmMenuOpen(false); }}
              title="Export this report"
              className="w-9 h-9 rounded-full bg-[#FADF01] hover:bg-[#EDD400] flex items-center justify-center cursor-pointer shadow-sm transition-colors"
            >
              <Download className="w-4 h-4 text-[#16160F]" />
            </button>
            {exportHeroOpen && (
              <div 
                className="absolute top-11 right-0 z-30 min-w-[168px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleTriggerToast}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
                  <span>Export as PDF</span>
                </button>
                <button
                  onClick={handleTriggerToast}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--icon)]" />
                  <span>Export as Excel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-stretch">
          {/* Main Bar Chart */}
          <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-sm min-w-0 flex flex-col justify-between">
            <div className="flex items-baseline gap-2.5 mb-5">
              <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">{headlineCount}</span>
              <span className="text-sm font-semibold text-[var(--muted)]">donors contacted · {dateRange}</span>
            </div>
            <div className="flex items-end gap-4 h-[200px] pt-4">
              {managerData.map((d) => {
                const isDimmed = selectedRm !== 'All managers' && d.name !== selectedRm;
                const barHeight = Math.round((d.contacted / maxHero) * 150 + 8);
                return (
                  <div key={d.name} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                    <span className={`text-xs font-bold text-[var(--ink)] ${isDimmed ? 'opacity-25' : 'opacity-100'}`}>
                      {d.contacted}
                    </span>
                    <div 
                      className="w-full max-w-[52px] rounded-t-lg bg-[#FADF01] transition-all duration-300"
                      style={{
                        height: `${barHeight}px`,
                        opacity: isDimmed ? 0.18 : 1
                      }}
                    />
                    <span className={`text-[11px] font-semibold text-[var(--muted2)] truncate w-full text-center ${isDimmed ? 'opacity-35' : 'opacity-100'}`}>
                      {d.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-[var(--card)] rounded-xl p-3 px-4 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-2 text-xs font-semibold text-[var(--muted2)]">Manager</th>
                  <th className="text-right py-3 pr-2 text-xs font-semibold text-[var(--muted2)] whitespace-nowrap">Donors Contacted</th>
                  <th className="text-right py-3 pl-2 text-xs font-semibold text-[var(--muted2)] whitespace-nowrap">Total Interactions</th>
                </tr>
              </thead>
              <tbody>
                {managerData.map((d) => {
                  const isDimmed = selectedRm !== 'All managers' && d.name !== selectedRm;
                  return (
                    <tr key={d.name} className={`border-t border-[var(--hair)] transition-opacity ${isDimmed ? 'opacity-35' : 'opacity-100'}`}>
                      <td className="py-2.5 pr-2 text-xs font-semibold text-[var(--ink)] whitespace-nowrap">{d.name}</td>
                      <td className="py-2.5 pr-2 text-xs font-bold text-[var(--ink)] text-right">{d.contacted}</td>
                      <td className="py-2.5 pl-2 text-xs font-medium text-[var(--muted)] text-right">{d.interactions}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sections 2-4 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
        
        {/* Section 2: Donors by Status */}
        <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--ink)] tracking-tight mb-1">Donors by Status</h2>
              <p className="text-xs font-medium text-[var(--muted)]">as of today</p>
            </div>
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setExportStatusOpen(!exportStatusOpen); }}
                title="Export this report"
                className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] flex items-center justify-center cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-[var(--icon)]" />
              </button>
              {exportStatusOpen && (
                <div className="absolute top-11 right-0 z-30 min-w-[168px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1">
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as PDF</span>
                  </button>
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm flex items-center gap-6 flex-wrap min-h-[226px]">
            {/* SVG Donut Chart */}
            <div className="relative w-[150px] h-[150px] shrink-0">
              <svg width="150" height="150" viewBox="0 0 150 150">
                {donutSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="75"
                    cy="75"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="22"
                    strokeDasharray={seg.dashArray}
                    strokeDashoffset={seg.offset}
                    transform="rotate(-90 75 75)"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-[var(--ink)] tracking-tight">
                  {statusTotal.toLocaleString('en-ZA').replace(/,/g, ' ')}
                </span>
                <span className="text-[10.5px] font-semibold text-[var(--muted2)]">donors</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 min-w-[150px] flex flex-col gap-2.5">
              {STATUS_DATA.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: item.color }} />
                  <span className="text-xs font-semibold text-[var(--pill-ink)]">{item.label}</span>
                  <span className="ml-auto text-xs font-bold text-[var(--ink)]">{item.count.toLocaleString('en-ZA').replace(/,/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Donors by Region */}
        <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--ink)] tracking-tight mb-1">Donors by Region</h2>
              <p className="text-xs font-medium text-[var(--muted)]">as of today</p>
            </div>
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setExportRegionOpen(!exportRegionOpen); }}
                title="Export this report"
                className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] flex items-center justify-center cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-[var(--icon)]" />
              </button>
              {exportRegionOpen && (
                <div className="absolute top-11 right-0 z-30 min-w-[168px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1">
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as PDF</span>
                  </button>
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-5 pb-3 shadow-sm min-h-[226px] flex items-end gap-3">
            {REGIONS.map((r) => {
              const heightPx = Math.round((r.value / maxRegion) * 130 + 6);
              return (
                <div key={r.label} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                  <span className="text-[11px] font-bold text-[var(--pill-ink)]">{r.value}</span>
                  <div 
                    className="w-full max-w-[40px] rounded-t bg-[#4E7E7C]"
                    style={{ height: `${heightPx}px` }}
                  />
                  <span className="text-[10.5px] font-semibold text-[var(--muted2)]">{r.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Donors by Donation Type */}
        <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--ink)] tracking-tight mb-1">Donors by Donation Type</h2>
              <p className="text-xs font-medium text-[var(--muted)]">as of today</p>
            </div>
            <div className="relative shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setExportTypeOpen(!exportTypeOpen); }}
                title="Export this report"
                className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] flex items-center justify-center cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-[var(--icon)]" />
              </button>
              {exportTypeOpen && (
                <div className="absolute top-11 right-0 z-30 min-w-[168px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1">
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileText className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as PDF</span>
                  </button>
                  <button onClick={handleTriggerToast} className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-5 px-4 pb-3 shadow-sm min-h-[226px] flex items-end gap-1.5">
            {TYPES.map((t) => {
              const heightPx = Math.round((t.value / maxType) * 128 + 6);
              return (
                <div 
                  key={t.full} 
                  className="flex-1 flex flex-col items-center gap-1.5 min-w-0" 
                  title={`${t.full}: ${t.value} donors`}
                >
                  <span className="text-[10px] font-bold text-[var(--pill-ink)]">{t.value}</span>
                  <div 
                    className="w-full max-w-[26px] rounded-t bg-[#4E7E7C]"
                    style={{ height: `${heightPx}px` }}
                  />
                  <span className="text-[9px] font-semibold text-[var(--muted2)] whitespace-nowrap">{t.label}</span>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed left-1/2 bottom-7 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-[#16160F] text-[#F4F4EE] px-5 py-3 rounded-full shadow-2xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 whitespace-nowrap">
          <Download className="w-4 h-4 text-[#FADF01]" />
          <span>Generating report... your download will start shortly.</span>
        </div>
      )}
    </main>
  );
};
