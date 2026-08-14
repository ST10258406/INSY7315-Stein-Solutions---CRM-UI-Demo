import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  ChevronDown, 
  Check, 
  AlertCircle, 
  UploadCloud, 
  Search, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Donor, DonorType } from '@/types/crm';

interface NewDonorPageProps {
  onBack: () => void;
  onSave: (donor: Partial<Donor>) => void;
}

const SECTIONS = [
  { id: 'company', num: '1', label: 'Company' },
  { id: 'contacts', num: '2', label: 'Contacts' },
  { id: 'address', num: '3', label: 'Legal Address' },
  { id: 'donation', num: '4', label: 'Donation' },
  { id: 'compliance', num: '5', label: 'Compliance' },
  { id: 'crm', num: '6', label: 'CRM Details' },
];

const REGIONS = ['JHB', 'CPT', 'KZN', 'EC', 'BFN', 'MPU', 'LIM'];
const DTYPES = ['Bakery', 'Beverages', 'Dairy', 'Dry Goods', 'Financial', 'Fruit', 'Meat', 'Non Food', 'Prepared Food', 'Vegetables', 'Other'];

export const NewDonorPage: React.FC<NewDonorPageProps> = ({ onBack, onSave }) => {
  const [activeSection, setActiveSection] = useState('company');

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState<DonorType>('Manufacturer');
  const [website, setWebsite] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [legalEntity, setLegalEntity] = useState('Private Company');
  const [regNumber, setRegNumber] = useState('');
  const [taxNumber, setTaxNumber] = useState('');

  // Contacts
  const [primaryName, setPrimaryName] = useState('');
  const [primaryRole, setPrimaryRole] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [mktName, setMktName] = useState('');
  const [mktPhone, setMktPhone] = useState('');
  const [mktEmail, setMktEmail] = useState('');
  const [accName, setAccName] = useState('');
  const [accEmail, setAccEmail] = useState('');
  const [accPhone, setAccPhone] = useState('');

  // Address
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [postalCode, setPostalCode] = useState('');

  // Donation Info
  const [pickupAddress, setPickupAddress] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['CPT']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Meat', 'Dairy']);
  const [frequency, setFrequency] = useState('Weekly');
  const [logisticsNotes, setLogisticsNotes] = useState('');

  // Compliance
  const [bbbeeStatus, setBbbeeStatus] = useState('Level 4');

  // CRM
  const [manager, setManager] = useState('Nomsa Khumalo');
  const [followUpDate, setFollowUpDate] = useState('2026-08-28');
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [impactPreferences, setImpactPreferences] = useState('Quarterly impact report, Annual certificate');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleChip = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSave = () => {
    const newDonorData: Partial<Donor> = {
      id: `d_${Date.now()}`,
      name: companyName || 'New Donor Organisation',
      tradingName: tradingName || companyName,
      type: companyType,
      status: 'Pending Review',
      manager: manager || 'Nomsa Khumalo',
      regions: selectedRegions.length ? selectedRegions : ['JHB'],
      donationTypes: selectedTypes.length ? selectedTypes : ['Dry Goods'],
      frequency: frequency,
      lastInteraction: 'just now',
      lastInteractionType: 'note',
      followUpDate: followUpDate || '28 Aug 2026',
      overdue: false,
      website: website ? (website.startsWith('http') ? website : `https://${website}`) : undefined,
      address: street ? `${street}, ${suburb}, ${city}, ${province}, ${postalCode}` : 'Unit 14, Industrial Park',
      logisticsInfo: logisticsNotes || 'Standard collection SLA',
      primaryContact: {
        name: primaryName || 'Primary Contact',
        role: primaryRole || 'Manager',
        phone: primaryPhone || '+27 11 000 0000',
        email: primaryEmail || 'contact@donor.co.za',
      },
      marketingContact: mktName ? { name: mktName, phone: mktPhone, email: mktEmail } : undefined,
      legalInfo: {
        registeredName: registeredName || companyName,
        entityType: legalEntity,
        regNumber: regNumber || '2026/000000/07',
        taxNumber: taxNumber || '9000000000',
        registeredAddress: `${street}, ${suburb}, ${city}, ${province}`,
        bbbeeStatus: bbbeeStatus,
        bbbeeCertFile: 'certificate.pdf',
        bbbeeCertMeta: 'Uploaded via New Donor form',
      },
      crmInfo: {
        marketingConsent: marketingConsent,
        marketingConsentDate: 'just now',
        impactPreferences: impactPreferences.split(',').map((s) => s.trim()),
        foodspaceIdSynced: false,
        notes: additionalNotes || 'Captured via internal CRM New Donor form.',
      },
    };

    onSave(newDonorData);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-30 bg-[var(--page)] p-[26px_30px_16px]">
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <h1 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight text-[var(--ink)]">
              Donors <span className="text-[var(--muted2)] font-semibold">—</span> New Donor
            </h1>
            <p className="m-0 text-sm font-medium text-[var(--muted)]">
              Capture a new donor profile for review.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="w-3.75 h-3.75 stroke-[2.2]" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Info Notice Banner */}
      <div className="px-[30px] mb-4.5">
        <div className="flex items-start gap-3 p-3.75 px-4.5 bg-[var(--info-bg)] border border-[var(--info-border)] rounded-2xl">
          <AlertCircle className="w-4.5 h-4.5 text-[var(--ink)] shrink-0 mt-0.5" />
          <p className="m-0 text-13 font-semibold leading-relaxed text-[var(--ink)]">
            This donor will be marked as <span className="font-extrabold">Pending Review</span> until an Admin approves it.
          </p>
        </div>
      </div>

      {/* Main Grid: Sticky Section Nav + Form Content */}
      <div className="px-[30px] pb-10 grid grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] gap-6 items-start">
        {/* Sticky Left Section Nav */}
        <nav className="sticky top-[178px] flex flex-col gap-[2px] p-2.5 bg-[var(--soft)] border border-[var(--border)] rounded-2xl">
          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-2.25 p-[9px_10px_9px_4px] rounded-xl text-13 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[var(--card)] font-bold text-[var(--ink)] shadow-xs'
                    : 'bg-transparent font-semibold text-[var(--ink)] hover:bg-[var(--hover)]'
                }`}
              >
                <span
                  className={`w-0.75 h-4.5 rounded-full shrink-0 ${
                    isActive ? 'bg-[#FADF01]' : 'bg-transparent'
                  }`}
                />
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-[10.5px] font-bold shrink-0 ${
                    isActive ? 'bg-[var(--ink)] text-[var(--card)]' : 'bg-[var(--chip)] text-[var(--muted)]'
                  }`}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Form Sections */}
        <div className="flex flex-col gap-4.5 min-w-0">
          {/* Section 1: Company Information */}
          <section id="company" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  Company Information
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  Legal and trading identity of the donor organisation.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] grid grid-cols-1 md:grid-cols-2 gap-4.5">
              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Company Name</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Woodlands Meat Packers"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Company Type</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value as DonorType)}
                    className="w-full h-11.5 px-3.75 pr-10 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] appearance-none cursor-pointer"
                  >
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Registered Company Name</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={registeredName}
                  onChange={(e) => setRegisteredName(e.target.value)}
                  placeholder="As registered with CIPC"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Trading Name</label>
                <input
                  value={tradingName}
                  onChange={(e) => setTradingName(e.target.value)}
                  placeholder="If different from registered name"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Legal Entity Type</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={legalEntity}
                    onChange={(e) => setLegalEntity(e.target.value)}
                    className="w-full h-11.5 px-3.75 pr-10 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] appearance-none cursor-pointer"
                  >
                    <option value="Private Company">Private Company (Pty) Ltd</option>
                    <option value="Public Company">Public Company Ltd</option>
                    <option value="Close Corporation">Close Corporation CC</option>
                    <option value="Trust">Trust</option>
                    <option value="Non Profit">Non Profit NPC</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Company Registration Number</label>
                <input
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="2019/123456/07"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Income Tax Number</label>
                <input
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder="9012345678"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] focus:ring-2 focus:ring-[#FADF01]"
                />
                <p className="m-0 mt-1.75 pl-3.75 text-[11.5px] text-[var(--muted)] font-medium">
                  Must not start with 4 — that's a VAT number.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Contacts */}
          <section id="contacts" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  Contacts
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  Who we speak to for donations, marketing, and accounts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Primary Contact */}
              <div className="bg-[var(--card)] rounded-xl p-5 shadow-[0_1px_3px_var(--shadow)]">
                <div className="flex items-center gap-1.75 mb-4">
                  <h3 className="m-0 text-[13.5px] font-extrabold text-[var(--ink)]">Primary Contact</h3>
                  <span className="px-2 py-0.75 rounded-md bg-[#FBE9E9] text-[#9B2C2C] text-[10px] font-bold">
                    Required
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Name</label>
                    <input
                      value={primaryName}
                      onChange={(e) => setPrimaryName(e.target.value)}
                      placeholder="Full name"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Job Title</label>
                    <input
                      value={primaryRole}
                      onChange={(e) => setPrimaryRole(e.target.value)}
                      placeholder="e.g. Operations Manager"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Phone</label>
                    <input
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      placeholder="+27 82 447 1930"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Email</label>
                    <input
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      placeholder="name@company.co.za"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Contact */}
              <div className="bg-[var(--card)] rounded-xl p-5 shadow-[0_1px_3px_var(--shadow)]">
                <div className="flex items-center gap-1.75 mb-4">
                  <h3 className="m-0 text-[13.5px] font-extrabold text-[var(--ink)]">Marketing Contact</h3>
                  <span className="px-2 py-0.75 rounded-md bg-[var(--chip)] text-[var(--muted)] text-[10px] font-bold">
                    Optional
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Name</label>
                    <input
                      value={mktName}
                      onChange={(e) => setMktName(e.target.value)}
                      placeholder="Full name"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Phone</label>
                    <input
                      value={mktPhone}
                      onChange={(e) => setMktPhone(e.target.value)}
                      placeholder="+27 71 234 5678"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Email</label>
                    <input
                      value={mktEmail}
                      onChange={(e) => setMktEmail(e.target.value)}
                      placeholder="name@company.co.za"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                </div>
              </div>

              {/* Accounts Contact */}
              <div className="bg-[var(--card)] rounded-xl p-5 shadow-[0_1px_3px_var(--shadow)]">
                <div className="flex items-center gap-1.75 mb-4">
                  <h3 className="m-0 text-[13.5px] font-extrabold text-[var(--ink)]">Accounts Contact</h3>
                  <span className="px-2 py-0.75 rounded-md bg-[var(--chip)] text-[var(--muted)] text-[10px] font-bold">
                    Optional
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Name</label>
                    <input
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                      placeholder="Full name"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Email</label>
                    <input
                      value={accEmail}
                      onChange={(e) => setAccEmail(e.target.value)}
                      placeholder="accounts@company.co.za"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.75 text-[var(--ink)]">Phone</label>
                    <input
                      value={accPhone}
                      onChange={(e) => setAccPhone(e.target.value)}
                      placeholder="+27 21 555 0100"
                      className="w-full h-11 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Registered Address */}
          <section id="address" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  Registered / Legal Address
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  All fields required for Section 18A certificates.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] grid grid-cols-1 md:grid-cols-3 gap-4.5">
              <div className="md:col-span-2">
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Street Name & Number</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="14 Marconi Road"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Suburb</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="Montague Gardens"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>City</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Cape Town"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Province</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full h-11.5 px-3.75 pr-10 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] appearance-none cursor-pointer"
                  >
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="North West">North West</option>
                    <option value="Northern Cape">Northern Cape</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Postal Code</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="7441"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                />
              </div>
            </div>
          </section>

          {/* Section 4: Donation Information */}
          <section id="donation" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  Donation Information
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  What they donate, where from, and how often.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] flex flex-col gap-5">
              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                  <span>Collection / Pickup Address</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Gate 4, Unit 12 Marconi Park, Montague Gardens"
                  className="w-full p-3.5 px-3.75 rounded-2xl border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] resize-y"
                />
                <p className="m-0 mt-1.75 pl-3.75 text-[11.5px] text-[var(--muted)] font-medium">
                  Different from the legal address above.
                </p>
              </div>

              <div className="h-px bg-[var(--hair)]" />

              {/* Regions Chips */}
              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2.5 text-[var(--ink)]">
                  <span>Operational Regions</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r) => {
                    const isSelected = selectedRegions.includes(r);
                    return (
                      <button
                        key={r}
                        onClick={() => toggleChip(r, selectedRegions, setSelectedRegions)}
                        className={`inline-flex items-center gap-1.75 h-9 px-3.75 rounded-full border text-[12.5px] font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                            : 'border-[var(--border)] bg-[var(--field)] text-[var(--ink)]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#16160F] stroke-[3.2]" />}
                        <span>{r}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Donation Types Chips */}
              <div>
                <label className="flex items-center gap-1 text-xs font-bold mb-2.5 text-[var(--ink)]">
                  <span>Donation Types</span>
                  <span className="text-[#C0272B]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DTYPES.map((t) => {
                    const isSelected = selectedTypes.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleChip(t, selectedTypes, setSelectedTypes)}
                        className={`inline-flex items-center gap-1.75 h-9 px-3.75 rounded-full border text-[12.5px] font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-[#FADF01] bg-[#FADF01] text-[#16160F]'
                            : 'border-[var(--border)] bg-[var(--field)] text-[var(--ink)]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#16160F] stroke-[3.2]" />}
                        <span>{t}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-[var(--hair)]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                <div>
                  <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                    <span>Donation Frequency</span>
                    <span className="text-[#C0272B]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full h-11.5 px-3.75 pr-10 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] appearance-none cursor-pointer"
                    >
                      <option value="Ad Hoc">Ad Hoc</option>
                      <option value="Once-off">Once-off</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Seasonal">Seasonal</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--ink)]">
                    Operations / Logistics Details
                  </label>
                  <textarea
                    rows={2}
                    value={logisticsNotes}
                    onChange={(e) => setLogisticsNotes(e.target.value)}
                    placeholder="Loading bay hours, pallet requirements, cold chain notes"
                    className="w-full p-3.5 px-3.75 rounded-2xl border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Compliance */}
          <section id="compliance" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  Compliance
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  BBBEE standing and supporting documentation.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">BBBEE Status</label>
                <div className="relative">
                  <select
                    value={bbbeeStatus}
                    onChange={(e) => setBbbeeStatus(e.target.value)}
                    className="w-full h-11.5 px-3.75 pr-10 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] appearance-none cursor-pointer"
                  >
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                    <option value="Level 4">Level 4</option>
                    <option value="Exempt Micro Enterprise">Exempt Micro Enterprise</option>
                    <option value="Non-Compliant">Non-Compliant</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--icon)] absolute right-4 top-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">BBBEE Certificate</label>
                <div className="flex flex-col items-center text-center p-5 border-2 border-dashed border-[var(--border)] rounded-2xl bg-[var(--field)] cursor-pointer hover:border-[var(--ink)] transition-colors">
                  <UploadCloud className="w-5 h-5 text-[var(--icon)] mb-2" />
                  <p className="m-0 mb-0.75 text-13 font-bold text-[var(--ink)]">Drop file here or browse</p>
                  <p className="m-0 text-[11.5px] text-[var(--muted)] font-medium">
                    PDF or image, max 10 MB. Only visible to Admins.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: CRM Details */}
          <section id="crm" className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2.75 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--icon)]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h2 className="m-0 text-base font-bold tracking-tight text-[var(--ink)] mb-0.5">
                  CRM & Internal Details
                </h2>
                <p className="m-0 text-xs text-[var(--muted)] font-medium">
                  Ownership, consent, and follow-up tracking.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl p-5.5 shadow-[0_1px_3px_var(--shadow)] flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                <div>
                  <label className="flex items-center gap-1 text-xs font-bold mb-2 text-[var(--ink)]">
                    <span>Relationship Manager</span>
                    <span className="text-[#C0272B]">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)]">
                    <Search className="w-3.75 h-3.75 text-[var(--icon)] shrink-0" />
                    <select
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-[13.5px] font-medium text-[var(--ink)] cursor-pointer"
                    >
                      <option value="Nomsa Khumalo">Nomsa Khumalo</option>
                      <option value="Keegan Roux">Keegan Roux</option>
                      <option value="Ayesha Patel">Ayesha Patel</option>
                      <option value="Sipho Ndlovu">Sipho Ndlovu</option>
                      <option value="Lerato Mahlangu">Lerato Mahlangu</option>
                      <option value="Riaan Botha">Riaan Botha</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Follow-up Date</label>
                  <div className="flex items-center gap-2 h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)]">
                    <CalendarIcon className="w-4 h-4 text-[var(--icon)] shrink-0" />
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-[13.5px] font-medium text-[var(--ink)]"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-[var(--hair)]" />

              {/* Marketing Consent Toggle */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <label className="flex items-center gap-1 text-xs font-bold mb-1 text-[var(--ink)]">
                    <span>Marketing Consent</span>
                    <span className="text-[#C0272B]">*</span>
                  </label>
                  <p className="m-0 text-[11.5px] text-[var(--muted)] font-medium">Required for POPIA compliance.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMarketingConsent(!marketingConsent)}
                  className={`relative w-13 h-7.5 rounded-full border shrink-0 cursor-pointer transition-colors ${
                    marketingConsent ? 'border-[#FADF01] bg-[#FADF01]' : 'border-[var(--border)] bg-[var(--chip)]'
                  }`}
                >
                  <span
                    className={`absolute top-[3px] w-5.5 h-5.5 rounded-full shadow-xs transition-all ${
                      marketingConsent ? 'left-[25px] bg-[#16160F]' : 'left-[3px] bg-[var(--card)]'
                    }`}
                  />
                </button>
              </div>

              <div className="h-px bg-[var(--hair)]" />

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Impact Reporting Preferences</label>
                <input
                  value={impactPreferences}
                  onChange={(e) => setImpactPreferences(e.target.value)}
                  placeholder="e.g. Quarterly PDF via email"
                  className="w-full h-11.5 px-3.75 rounded-full border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-[var(--ink)]">Additional Information</label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Anything else the team should know about this donor"
                  className="w-full p-3.5 px-3.75 rounded-2xl border border-[var(--border)] bg-[var(--field)] outline-none text-[13.5px] font-medium text-[var(--ink)] resize-y leading-relaxed"
                />
              </div>
            </div>
          </section>

          {/* Bottom Action Footer */}
          <div className="flex items-center gap-3 p-1 px-1">
            <p className="m-0 text-[12.5px] text-[var(--muted)] font-medium">
              Fields marked <span className="text-[#C0272B] font-bold">*</span> are required before this donor can be submitted for approval.
            </p>
            <div className="ml-auto flex items-center gap-2.5">
              <Button variant="secondary" onClick={onBack}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave} className="h-11 px-6.5">
                Save Donor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
