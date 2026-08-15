import React, { useState } from 'react';
import {
  Building2,
  Target,
  Users,
  PieChart,
  Truck,
  ShieldCheck,
  MessageSquare,
  ClipboardCheck,
  ChevronDown,
  Check,
  UploadCloud,
  X,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'select' | 'chips' | 'yesno' | 'date' | 'file';

interface FieldConfig {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  maxLength?: number;
  wide?: boolean;
}

interface SectionConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: FieldConfig[];
}

const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const FOCUS_AREAS = [
  'Food Security', 'Nutrition', 'Early Childhood Development', 'Education',
  'Health & Wellness', 'Elderly Care', 'Disability Support', 'Skills Development',
  'Community Upliftment', 'Other',
];

const TARGET_POPULATION = [
  'Children', 'Youth', 'Adults', 'Elderly', 'People with Disabilities',
  'Homeless', 'Refugees / Migrants', 'Families', 'Other',
];

const RACE_OPTIONS = ['African', 'Coloured', 'Indian / Asian', 'White'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const AGE_GROUPS = ['0–5 years', '6–12 years', '13–17 years', '18–35 years', '36–59 years', '60+ years'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const FOOD_STORAGE = ['Dry Storage', 'Chilled Storage', 'Frozen Storage', 'None'];
const INFRASTRUCTURE = ['Roofing', 'Fencing', 'Lighting', 'Gas Safety', 'Electrical Safety', 'Fire Safety'];

const SECTIONS: SectionConfig[] = [
  {
    id: 'organisation',
    title: 'Organisation & Contact Details',
    description: 'Who they are and how to reach them.',
    icon: <Building2 className="w-4 h-4" />,
    fields: [
      { id: 'orgLegalName', label: 'Organisation Legal Name', required: true, type: 'text', maxLength: 255, help: 'Record the official registered name from legal or registration documents. Cross-check spelling against provided certificates.' },
      { id: 'contactName', label: "Contact's Name and Surname", required: true, type: 'text', help: 'Capture the first and last name of the main contact person. This should be the individual responsible for communication and decision-making.' },
      { id: 'contactEmail', label: "Contact's Email Address", required: true, type: 'email', help: 'Record the primary work email address for correspondence. Ensure it is valid by checking for bouncebacks.' },
      { id: 'contactPhone', label: "Contact's Phone Number", required: true, type: 'tel', help: 'Capture a direct mobile or landline number. Prefer a mobile for urgent follow-up.' },
      { id: 'website', label: 'Website', type: 'text', help: "Enter the organisation's official website address, if available. Use to verify information provided elsewhere in the form." },
      { id: 'orgProvince', label: 'Organisation Province', required: true, type: 'select', options: PROVINCES },
      { id: 'orgAddress', label: 'Organisation Address', type: 'textarea', wide: true, help: "Record the full physical address. If it isn't found in the database, then leave this blank and fill it in on the next question rather." },
      { id: 'orgAddress2', label: 'Organisation Address 2', type: 'textarea', wide: true, maxLength: 2000, help: 'Please include as much detail as possible, especially if rural.' },
      { id: 'what3words', label: 'What3Words', required: true, type: 'text', wide: true, placeholder: '///apple.orange.banana', help: 'If in a rural area or informal settlement, use the provided What3Words link (what3words.com) to verify the exact location. Record it exactly as given (three words separated by dots, e.g., ///apple.orange.banana).' },
    ],
  },
  {
    id: 'programme',
    title: 'Programme Information',
    description: 'What they do and who they serve.',
    icon: <Target className="w-4 h-4" />,
    fields: [
      { id: 'focusAreas', label: 'Core Business / Focus Areas', required: true, type: 'chips', wide: true, options: FOCUS_AREAS, help: 'Tick all relevant focus areas. Ensure alignment with stated programmes and target population.' },
      { id: 'targetPopulation', label: 'Target Population', required: true, type: 'chips', wide: true, options: TARGET_POPULATION, help: 'Tick all relevant beneficiary groups. Verify that these match the programmes and services listed.' },
      { id: 'programmesServices', label: 'Programmes & Services', required: true, type: 'textarea', wide: true, maxLength: 2000, help: 'Summarise the main programmes and services offered by the organisation. Use short, factual descriptions.' },
      { id: 'distributionChannel', label: 'Distribution Channel', required: true, type: 'select', options: ['Direct to Beneficiaries', 'Through Partner Organisations', 'Both'], help: 'Select whether services are delivered directly to beneficiaries or through other organisations.' },
    ],
  },
  {
    id: 'staffing',
    title: 'Staffing & Registration',
    description: 'Headcount and legal registration status.',
    icon: <Users className="w-4 h-4" />,
    fields: [
      { id: 'ftFemales', label: 'Full-Time Females', required: true, type: 'number', help: 'Enter the total number of full-time female staff. Confirm against payroll or HR data if available.' },
      { id: 'ftMales', label: 'Full-Time Males', required: true, type: 'number', help: 'Enter the total number of full-time male staff. Confirm against payroll or HR data if available.' },
      { id: 'volunteers', label: 'Number of Volunteers', required: true, type: 'number', help: 'Capture the number of active volunteers. Clarify if this includes ad hoc helpers.' },
      { id: 'registeredNpo', label: 'Registered NPO?', required: true, type: 'yesno', help: 'Indicate if registered as an NPO. Request certificate if not already provided.' },
      { id: 'npoCertUpload', label: 'NPO Certificate Upload', type: 'file', help: 'Upload a clear, legible copy of the NPO certificate.' },
      { id: 'registeredDsd', label: 'Registered with DSD?', required: true, type: 'yesno', help: 'State if the organisation is registered with the Department of Social Development.' },
      { id: 'pboCertUpload', label: 'PBO Certificate Upload', type: 'file', help: 'Upload the Public Benefit Organisation certificate where applicable.' },
    ],
  },
  {
    id: 'demographics',
    title: 'Beneficiary Demographics',
    description: 'Who is served, and how many.',
    icon: <PieChart className="w-4 h-4" />,
    fields: [
      { id: 'race', label: 'Race', required: true, type: 'chips', wide: true, options: RACE_OPTIONS, help: 'Tick all beneficiary race categories served. For reporting, ensure these match BEE demographic splits.' },
      { id: 'gender', label: 'Gender', required: true, type: 'chips', wide: true, options: GENDER_OPTIONS, help: 'Tick all gender groups served by the organisation.' },
      { id: 'ageGroups', label: 'Age Groups', required: true, type: 'chips', wide: true, options: AGE_GROUPS, help: 'Tick all applicable age ranges. Confirm that these are consistent with service descriptions.' },
      { id: 'feedingFrequency', label: 'Feeding Frequency', required: true, type: 'select', options: ['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Ad Hoc'] },
      { id: 'totalServed', label: 'Total Number of People Served', required: true, type: 'number', help: 'Enter the approximate number of people served.' },
      { id: 'femalesServed', label: 'Number of Females Served', required: true, type: 'number' },
      { id: 'malesServed', label: 'Number of Males Served', required: true, type: 'number' },
      { id: 'africanServed', label: 'No. of African Served', required: true, type: 'number' },
      { id: 'colouredServed', label: 'No. of Coloured Served', required: true, type: 'number' },
      { id: 'indianAsianServed', label: 'No. of Indian/Asian Served', required: true, type: 'number' },
      { id: 'whiteServed', label: 'No. of White Served', required: true, type: 'number' },
    ],
  },
  {
    id: 'logistics',
    title: 'SA Harvest Relationship & Logistics',
    description: 'Collection capacity and feeding schedule.',
    icon: <Truck className="w-4 h-4" />,
    fields: [
      { id: 'reliance', label: 'Reliance on SA Harvest', required: true, type: 'select', options: ['Fully Reliant', 'Highly Reliant', 'Moderately Reliant', 'Minimally Reliant', 'Not Reliant'], help: "Select the CBO's level of reliance from the dropdown." },
      { id: 'transportCapacity', label: 'Transport Capacity', required: true, type: 'select', options: ['Own Vehicle', 'Shared / Borrowed Vehicle', 'Public Transport', 'No Transport — Requires Delivery'], help: "Select from the dropdown based on the CBO's ability to collect food." },
      { id: 'mealsProvided', label: 'Meals Provided (B/L/D)', required: true, type: 'chips', wide: true, options: MEALS, help: 'Tick all meal types provided.' },
      { id: 'daysOfWeek', label: 'Days of the Week', required: true, type: 'chips', wide: true, options: DAYS, help: 'Tick all days services are provided. Useful for logistics planning.' },
      { id: 'foodStorage', label: 'Food Storage (dry, chilled, frozen)', required: true, type: 'chips', wide: true, options: FOOD_STORAGE },
      { id: 'feedingHistory', label: 'Feeding History (Last date fed by SA Harvest)', type: 'date', help: 'Record the last date the CBO received food from SA Harvest.' },
    ],
  },
  {
    id: 'facility',
    title: 'Facility & Safety Assessment',
    description: 'On-site conditions and access.',
    icon: <ShieldCheck className="w-4 h-4" />,
    fields: [
      { id: 'kitchenCleanliness', label: 'Kitchen Cleanliness / Organisation', required: true, type: 'yesno', help: 'Indicate whether the kitchen meets cleanliness and organisation standards.' },
      { id: 'waterAccess', label: 'Access to Water / Cleaning Products', required: true, type: 'yesno', help: 'State whether clean water and cleaning materials are available on-site.' },
      { id: 'toiletsHygiene', label: 'Toilets & Hygiene Facilities', required: true, type: 'yesno', help: 'Confirm whether staff/volunteer toilets and hygiene facilities are available and functional.' },
      { id: 'pestFree', label: 'Pest/Rodent Free', required: true, type: 'yesno', help: 'Confirm there are no signs of pests or rodents.' },
      { id: 'deliveryAccess', label: 'Ease of Access for Delivery', required: true, type: 'yesno', help: 'Confirm whether delivery vehicles can access the site without difficulty.' },
      { id: 'parkingSecurity', label: 'Parking & Security', required: true, type: 'yesno', help: 'Confirm parking availability and basic site security measures.' },
      { id: 'infrastructureChecks', label: 'Infrastructure Checks (roofing, fencing, lighting, gas safety, etc.)', required: true, type: 'chips', wide: true, options: INFRASTRUCTURE, help: 'Tick all items that are present and in safe working order.' },
      { id: 'policeProximity', label: 'Proximity to Police Station', type: 'text', wide: true, help: 'State whether the site is near a police station (for safety assessment).' },
      { id: 'kitchenImages', label: 'Kitchen / Food Storage Images', type: 'file', wide: true, help: 'Upload clear photos of food preparation and storage areas.' },
    ],
  },
  {
    id: 'notes',
    title: 'Notes & Capacity',
    description: 'Freeform observations and organisational capability.',
    icon: <MessageSquare className="w-4 h-4" />,
    fields: [
      { id: 'additionalComments', label: 'Additional Comments', type: 'textarea', wide: true, maxLength: 2000, help: 'Record any further notes or relevant observations during vetting.' },
      { id: 'proposalWriting', label: 'Proposal Writing Capabilities', type: 'textarea', wide: true, maxLength: 2000, help: "Comment on the organisation's ability to write and submit funding proposals." },
      { id: 'digitalCapabilities', label: 'Digital Capabilities', type: 'textarea', wide: true, maxLength: 2000, help: "Comment on the organisation's use of technology for communication, reporting, or operations." },
      { id: 'facilityPhotos', label: 'Upload Fridge/Kitchen/Facility Photos', type: 'file', wide: true, help: 'Upload images showing the state and capacity of fridges, kitchens, and other facilities.' },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance & Documentation',
    description: 'Sign-off and supporting paperwork.',
    icon: <ClipboardCheck className="w-4 h-4" />,
    fields: [
      { id: 'sla', label: 'SLA?', required: true, type: 'yesno' },
      { id: 'consentForm', label: 'Consent Form?', required: true, type: 'yesno' },
      { id: 'policyDoc', label: 'Policy Doc?', required: true, type: 'yesno' },
      { id: 'certUploads', label: 'Upload Certificates (NPO/PBO)', type: 'file', wide: true, help: 'Upload all relevant registration and certification documents.' },
    ],
  },
];

const ALL_FIELDS: FieldConfig[] = SECTIONS.flatMap((s) => s.fields);

const initialFormData = (): Record<string, any> => {
  const init: Record<string, any> = {};
  ALL_FIELDS.forEach((f) => {
    init[f.id] = f.type === 'chips' ? [] : f.type === 'file' ? null : '';
  });
  return init;
};

interface VettingPageProps {
  onSubmitted?: () => void;
}

export const VettingPage: React.FC<VettingPageProps> = ({ onSubmitted }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(SECTIONS.map((s) => [s.id, true]))
  );
  const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
  const [dragTarget, setDragTarget] = useState<string | null>(null);
  const [errorIds, setErrorIds] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setField = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleChip = (id: string, value: string) => {
    setFormData((prev) => {
      const arr: string[] = prev[id] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [id]: next };
    });
  };

  const isFieldEmpty = (field: FieldConfig) => {
    const val = formData[field.id];
    if (field.type === 'chips') return !val || val.length === 0;
    if (field.type === 'file') return false;
    return !val || String(val).trim() === '';
  };

  const handleSubmit = () => {
    const missing = new Set<string>();
    const missingSections = new Set<string>();
    SECTIONS.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (f.required && isFieldEmpty(f)) {
          missing.add(f.id);
          missingSections.add(sec.id);
        }
      });
    });

    if (missing.size > 0) {
      setErrorIds(missing);
      setOpenSections((prev) => {
        const next = { ...prev };
        missingSections.forEach((id) => { next[id] = true; });
        return next;
      });
      return;
    }

    setErrorIds(new Set());
    setSubmitted(true);
    if (onSubmitted) onSubmitted();
  };

  const handleStartNew = () => {
    setFormData(initialFormData());
    setErrorIds(new Set());
    setOpenSections(Object.fromEntries(SECTIONS.map((s) => [s.id, true])));
    setSubmitted(false);
  };

  const missingCount = errorIds.size;

  const renderField = (field: FieldConfig) => {
    const hasError = errorIds.has(field.id);
    const baseInput = `w-full h-11.5 px-3.75 rounded-full border bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01] transition-colors ${hasError ? 'border-[#D4373A]' : 'border-[var(--border)]'
      }`;

    let control: React.ReactNode = null;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        control = (
          <input
            type={field.type}
            value={formData[field.id]}
            onChange={(e) => setField(field.id, e.target.value.slice(0, field.maxLength))}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            className={baseInput}
          />
        );
        break;

      case 'number':
        control = (
          <input
            type="number"
            min={0}
            value={formData[field.id]}
            onChange={(e) => setField(field.id, e.target.value)}
            placeholder="0"
            className={baseInput}
          />
        );
        break;

      case 'date':
        control = (
          <input
            type="date"
            value={formData[field.id]}
            onChange={(e) => setField(field.id, e.target.value)}
            className={baseInput}
          />
        );
        break;

      case 'textarea':
        control = (
          <textarea
            rows={3}
            value={formData[field.id]}
            onChange={(e) => setField(field.id, e.target.value.slice(0, field.maxLength))}
            maxLength={field.maxLength}
            className={`w-full p-3.5 px-3.75 rounded-2xl border bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] resize-y leading-relaxed transition-colors ${hasError ? 'border-[#D4373A]' : 'border-[var(--border)]'
              }`}
          />
        );
        break;

      case 'select':
        control = (
          <div className="relative">
            <select
              value={formData[field.id]}
              onChange={(e) => setField(field.id, e.target.value)}
              className={`${baseInput} pr-10 appearance-none cursor-pointer`}
            >
              <option value="" disabled>Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
          </div>
        );
        break;

      case 'chips':
        control = (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((opt) => {
              const isSelected = (formData[field.id] || []).includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleChip(field.id, opt)}
                  className={`inline-flex items-center gap-1.75 h-9 px-3.75 rounded-full border text-[12.5px] font-bold cursor-pointer transition-colors ${isSelected
                    ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                    : `bg-[var(--field)] text-[var(--ink)] ${hasError ? 'border-[#D4373A]' : 'border-[var(--border)]'}`
                    }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-[#16160F] stroke-[3.2]" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        );
        break;

      case 'yesno':
        control = (
          <div className="flex items-center gap-2">
            {['Yes', 'No'].map((opt) => {
              const isSelected = formData[field.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setField(field.id, opt)}
                  className={`inline-flex items-center gap-1.75 h-9 px-4.5 rounded-full border text-[12.5px] font-bold cursor-pointer transition-colors ${isSelected
                    ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                    : `bg-[var(--field)] text-[var(--ink)] ${hasError ? 'border-[#D4373A]' : 'border-[var(--border)]'}`
                    }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-[#16160F] stroke-[3.2]" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        );
        break;

      case 'file': {
        const file: File | null = formData[field.id];
        const isDragging = dragTarget === field.id;
        control = file ? (
          <div className="flex items-center justify-between gap-3 h-11.5 px-4 rounded-full border border-[var(--border)] bg-[var(--field)]">
            <span className="text-[12.5px] font-semibold text-[var(--ink)] truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => setField(field.id, null)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--icon)] hover:bg-[var(--hover)] cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <label
            onDragOver={(e) => { e.preventDefault(); setDragTarget(field.id); }}
            onDragLeave={() => setDragTarget(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragTarget(null);
              const f = e.dataTransfer.files?.[0];
              if (f) setField(field.id, f);
            }}
            className={`flex flex-col items-center text-center p-5 border-2 border-dashed rounded-2xl bg-[var(--field)] cursor-pointer transition-colors ${isDragging ? 'border-[#FADF01]' : 'border-[var(--border)] hover:border-[var(--ink)]'
              }`}
          >
            <UploadCloud className="w-5 h-5 text-[var(--icon)] mb-2" />
            <p className="m-0 mb-0.75 text-13 font-bold text-[var(--ink)]">Choose a file to upload or drag and drop here</p>
            <p className="m-0 text-[11.5px] text-[var(--muted)] font-medium">PDF or image, max 10 MB.</p>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setField(field.id, f);
              }}
            />
          </label>
        );
        break;
      }
    }

    return (
      <div key={field.id} className={field.wide ? 'md:col-span-2' : ''}>
        <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
          <span>{field.label}</span>
          {field.required && <span className="text-[#C0272B]">*</span>}
        </label>
        {field.help && (
          <p className="m-0 mb-2.5 text-[11.5px] text-[var(--muted)] font-medium leading-relaxed">{field.help}</p>
        )}
        {control}
        {field.maxLength && (field.type === 'textarea' || field.type === 'text') && (
          <p className="m-0 mt-1.5 text-right text-[11px] font-medium text-[var(--muted2)]">
            {(formData[field.id]?.length || 0)}/{field.maxLength}
          </p>
        )}
        {hasError && (
          <p className="m-0 mt-1.5 text-[11px] font-bold text-[#C0272B]">This field is required.</p>
        )}
      </div>
    );
  };

  if (submitted) {
    return (
      <main className="flex-1 min-w-0 overflow-y-auto p-[26px_30px_34px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-[420px]">
          <div className="w-14.5 h-14.5 rounded-2xl bg-[#E5F3EA] flex items-center justify-center mb-4.5">
            <CheckCircle2 className="w-6.5 h-6.5 text-[#1E6E3C]" />
          </div>
          <h3 className="m-0 mb-1.75 text-lg font-extrabold tracking-tight text-[var(--ink)]">
            Vetting submitted
          </h3>
          <p className="m-0 mb-5.5 text-[13.5px] text-[var(--muted)] font-medium">
            The CBO vetting record has been captured and is ready for review.
          </p>
          <Button variant="default" onClick={handleStartNew}>
            Start a new vetting
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 overflow-y-auto">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-30 bg-[var(--page)] p-[26px_30px_16px]">
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <h1 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
              CBO Vetting
            </h1>
            <p className="m-0 text-sm font-medium text-[var(--muted)]">
              Assess a community-based organisation's readiness and capacity before onboarding.
            </p>
          </div>
        </div>
      </div>

      {missingCount > 0 && (
        <div className="px-[30px] mb-4.5">
          <div className="flex items-start gap-3 p-3.75 px-4.5 bg-[#FBE9E9] border border-[#F0C6C6] rounded-2xl">
            <AlertCircle className="w-4.5 h-4.5 text-[#9B2C2C] shrink-0 mt-0.5" />
            <p className="m-0 text-13 font-semibold leading-relaxed text-[#9B2C2C]">
              Please complete {missingCount} required field{missingCount === 1 ? '' : 's'} before submitting — the relevant sections have been opened for you.
            </p>
          </div>
        </div>
      )}

      {/* Accordion Sections */}
      <div className="px-[30px] pb-6 flex flex-col gap-4.5">
        {SECTIONS.map((sec) => {
          const isOpen = !!openSections[sec.id];
          return (
            <section key={sec.id} className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center gap-2.75 p-5 cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)] shrink-0">
                  {sec.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                    {sec.title}
                  </h2>
                  <p className="m-0 text-xs text-[var(--muted)] font-medium">
                    {sec.description}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--icon)] shrink-0 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] grid grid-cols-1 md:grid-cols-2 gap-4.5">
                    {sec.fields.map((f) => renderField(f))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Submit Footer */}
      <div className="sticky bottom-0 z-30 bg-[var(--page)] border-t border-[var(--divider)] px-[30px] py-4 flex items-center justify-end gap-2.5">
        <span className="text-[12.5px] font-medium text-[var(--muted)] mr-auto">
          Review each section, then submit when the record is complete.
        </span>
        <Button variant="default" onClick={handleSubmit}>
          Submit Vet
        </Button>
      </div>
    </main>
  );
};
