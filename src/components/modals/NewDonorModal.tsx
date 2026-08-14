import React, { useState, useEffect } from 'react';
import { X, Building2, User, Phone, Mail, MapPin, Truck, ShieldCheck, Check } from 'lucide-react';
import type { Donor, DonorType, DonorStatus } from '@/types/crm';

interface NewDonorModalProps {
  isOpen: boolean;
  donorToEdit?: Donor | null;
  onClose: () => void;
  onSave: (donorData: Partial<Donor>) => void;
}

const MANAGERS = [
  'Nomsa Khumalo',
  'Sipho Ndlovu',
  'Riaan Botha',
  'Lerato Mahlangu',
  'Ayesha Patel',
  'Thabo Sithole',
  'Johan Pretorius'
];

const AVAILABLE_REGIONS = ['JHB', 'CPT', 'DBN', 'PTA', 'NLP', 'GRJ', 'EC', 'BFN', 'MPU', 'LIM'];
const AVAILABLE_DONATION_TYPES = ['Produce', 'Dairy', 'Dry goods', 'Meat', 'Bakery', 'Beverages', 'Fruit', 'Non-food'];

export const NewDonorModal: React.FC<NewDonorModalProps> = ({
  isOpen,
  donorToEdit,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [type, setType] = useState<DonorType>('Manufacturer');
  const [status, setStatus] = useState<DonorStatus>('Pending Review');
  const [manager, setManager] = useState('Nomsa Khumalo');
  const [regions, setRegions] = useState<string[]>(['JHB']);
  const [frequency, setFrequency] = useState('Weekly');
  const [donationTypes, setDonationTypes] = useState<string[]>(['Produce']);
  
  // Contact info
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  
  // Address & Logistics
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [logisticsInfo, setLogisticsInfo] = useState('');

  useEffect(() => {
    if (donorToEdit) {
      setName(donorToEdit.name || '');
      setTradingName(donorToEdit.tradingName || '');
      setType(donorToEdit.type || 'Manufacturer');
      setStatus(donorToEdit.status || 'Active');
      setManager(donorToEdit.manager || 'Nomsa Khumalo');
      setRegions(donorToEdit.regions || ['JHB']);
      setFrequency(donorToEdit.frequency || 'Weekly');
      setDonationTypes(donorToEdit.donationTypes || ['Produce']);
      setContactName(donorToEdit.primaryContact?.name || '');
      setContactRole(donorToEdit.primaryContact?.role || '');
      setContactPhone(donorToEdit.primaryContact?.phone || '');
      setContactEmail(donorToEdit.primaryContact?.email || '');
      setWebsite(donorToEdit.website || '');
      setAddress(donorToEdit.address || '');
      setLogisticsInfo(donorToEdit.logisticsInfo || '');
    } else {
      setName('');
      setTradingName('');
      setType('Manufacturer');
      setStatus('Pending Review');
      setManager('Nomsa Khumalo');
      setRegions(['JHB']);
      setFrequency('Weekly');
      setDonationTypes(['Produce']);
      setContactName('');
      setContactRole('');
      setContactPhone('');
      setContactEmail('');
      setWebsite('');
      setAddress('');
      setLogisticsInfo('');
    }
  }, [donorToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleRegion = (r: string) => {
    setRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const toggleDonationType = (dt: string) => {
    setDonationTypes((prev) =>
      prev.includes(dt) ? prev.filter((x) => x !== dt) : [...prev, dt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: donorToEdit ? donorToEdit.id : `donor_${Date.now()}`,
      name: name.trim(),
      tradingName: tradingName.trim() || undefined,
      type,
      status,
      manager,
      regions,
      frequency,
      donationTypes,
      website: website.trim() || undefined,
      address: address.trim() || undefined,
      logisticsInfo: logisticsInfo.trim() || undefined,
      primaryContact: contactName.trim() ? {
        name: contactName.trim(),
        role: contactRole.trim() || 'Primary Contact',
        phone: contactPhone.trim() || '+27 11 000 0000',
        email: contactEmail.trim() || 'contact@donor.co.za'
      } : undefined,
      lastInteraction: donorToEdit ? donorToEdit.lastInteraction : 'Just created',
      lastInteractionType: donorToEdit ? donorToEdit.lastInteractionType : 'note',
      followUpDate: donorToEdit ? donorToEdit.followUpDate : 'Next week',
      overdue: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--ink)]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[var(--ink)] tracking-tight">
                {donorToEdit ? 'Edit Donor Profile' : 'Add New Donor'}
              </h2>
              <p className="text-xs font-medium text-[var(--muted)]">
                {donorToEdit ? 'Update donor information and preferences.' : 'Register a new donor profile in the CRM.'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[var(--hover)] flex items-center justify-center text-[var(--icon)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[var(--muted2)] uppercase tracking-wider">
              Basic Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">
                  Company / Organization Name <span className="text-[#D4373A]">*</span>
                </span>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. FoodCorp SA"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Trading Name (Optional)</span>
                <input 
                  type="text" 
                  value={tradingName}
                  onChange={(e) => setTradingName(e.target.value)}
                  placeholder="e.g. FoodCorp Retail"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Donor Type</span>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value as DonorType)}
                  className="h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] cursor-pointer shadow-xs"
                >
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Distributor">Distributor</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Status</span>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DonorStatus)}
                  className="h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] cursor-pointer shadow-xs"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Active">Active</option>
                  <option value="Lapsed">Lapsed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                <span className="text-xs font-bold text-[var(--ink)]">Assigned Relationship Manager</span>
                <select 
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] cursor-pointer shadow-xs"
                >
                  {MANAGERS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <hr className="border-[var(--hair)]" />

          {/* Section 2: Regions & Donation Types */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[var(--muted2)] uppercase tracking-wider">
              Operating Regions & Donation Scope
            </h3>

            <div>
              <span className="text-xs font-bold text-[var(--ink)] block mb-1.5">Operating Regions</span>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_REGIONS.map((r) => {
                  const active = regions.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleRegion(r)}
                      className={`h-8 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#16160F] text-[#FADF01] shadow-xs' 
                          : 'bg-[var(--pill)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[var(--ink)] block mb-1.5">Donation Categories</span>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_DONATION_TYPES.map((dt) => {
                  const active = donationTypes.includes(dt);
                  return (
                    <button
                      key={dt}
                      type="button"
                      onClick={() => toggleDonationType(dt)}
                      className={`h-8 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#16160F] text-white shadow-xs' 
                          : 'bg-[var(--pill)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {dt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <hr className="border-[var(--hair)]" />

          {/* Section 3: Contact Person */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[var(--muted2)] uppercase tracking-wider">
              Primary Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Contact Name</span>
                <input 
                  type="text" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dineo Molefe"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Job Title / Role</span>
                <input 
                  type="text" 
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value)}
                  placeholder="e.g. Sustainability Lead"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Phone Number</span>
                <input 
                  type="text" 
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+27 11 123 4567"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Email Address</span>
                <input 
                  type="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="dineo@foodcorp.co.za"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>
            </div>
          </div>

          <hr className="border-[var(--hair)]" />

          {/* Section 4: Address & Logistics */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[var(--muted2)] uppercase tracking-wider">
              Location & Logistics
            </h3>

            <div className="space-y-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Physical Address</span>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Depot or facility address"
                  className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Logistics / Collection Notes</span>
                <textarea 
                  rows={3}
                  value={logisticsInfo}
                  onChange={(e) => setLogisticsInfo(e.target.value)}
                  placeholder="Loading bay details, security gate requirements, refrigeration needs..."
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10 transition-all shadow-xs resize-none"
                />
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#FADF01] hover:bg-[#EDD400] text-xs font-bold text-[#16160F] shadow-sm transition-colors cursor-pointer"
            >
              {donorToEdit ? 'Save Changes' : 'Create Donor Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
