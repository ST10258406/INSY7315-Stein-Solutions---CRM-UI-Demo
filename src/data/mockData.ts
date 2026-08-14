import type { Donor, ApprovalRecord, TaskItem, TimelineItem, EmailMessage, EmailAttachment, UserAccount } from '../types/crm';

export const MANAGER_PALETTE: Record<string, string> = {
  "Nomsa Khumalo": "#3F5D46",
  "Keegan Roux": "#2E5A78",
  "Ayesha Patel": "#7A3B4E",
  "Sipho Ndlovu": "#5B4B8A",
  "Lerato Mahlangu": "#8A5A2B",
  "Riaan Botha": "#4A5B2E",
  "Thabo Sithole": "#3B4A40",
  "System": "#5F5F57",
  "Public Form": "#8A5A2B"
};

export const getInitials = (name: string): string => {
  if (!name) return "??";
  const parts = name.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w[0]));
  if (parts.length === 0) return "??";
  return parts.slice(0, 2).map(w => w[0].toUpperCase()).join("");
};

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'foodcorp-sa',
    name: 'FoodCorp SA',
    tradingName: 'FoodCorp SA Foods & Logistics',
    type: 'Manufacturer',
    status: 'Pending Review',
    manager: 'Nomsa Khumalo',
    regions: ['JHB', 'CPT', 'DBN', 'PTA'],
    donationTypes: ['Meat', 'Dairy', 'Dry goods'],
    frequency: 'Weekly',
    lastInteraction: '02 Aug 2026',
    lastInteractionType: 'call',
    followUpDate: '28 Jul 2026',
    overdue: true,
    website: 'https://www.foodcorpsa.co.za',
    address: 'Unit 14, Chilled Distribution Park\n42 Barlow Road, Aeroton\nJohannesburg, Gauteng, 2013',
    logisticsInfo: 'Collections Tuesday and Thursday, 06:00–11:00 only. Refrigerated vehicle required for chilled pallets. Book a slot with the goods-out controller 24 hours ahead; drivers sign in at the Barlow Road gate with company ID.',
    primaryContact: {
      name: 'Dineo Molefe',
      role: 'Head of Supply Chain',
      phone: '+27 11 345 6780',
      email: 'dineo.molefe@foodcorpsa.co.za'
    },
    marketingContact: {
      name: 'Ryan Adams',
      phone: '+27 21 445 9012',
      email: 'ryan.adams@foodcorpsa.co.za'
    },
    legalInfo: {
      registeredName: 'FoodCorp SA Foods & Logistics (Pty) Ltd',
      entityType: 'Private Company (Pty) Ltd',
      regNumber: '2014/318902/07',
      taxNumber: '9067 428 155',
      registeredAddress: '12 Kramer Road\nBedfordview\nGermiston\nGauteng\n2007',
      bbbeeStatus: 'Level 4 Contributor',
      bbbeeCertFile: 'foodcorp-bbbee-2026.pdf',
      bbbeeCertMeta: 'PDF · 412 KB · valid to 31 Mar 2027'
    },
    crmInfo: {
      marketingConsent: true,
      marketingConsentDate: '18 Feb 2026',
      impactPreferences: ['Quarterly impact report', 'Annual certificate'],
      foodspaceIdSynced: false,
      notes: 'Group procurement is reviewing a national surplus agreement that would extend collections to the Cape Town and Durban plants. Dineo has asked for a written impact summary before the September board meeting. Marketing want to co-brand a Mandela Day drive.'
    }
  },
  {
    id: 'woodlands-meat',
    name: 'Woodlands Meat Packers',
    tradingName: 'Woodlands Fresh Meats',
    type: 'Manufacturer',
    status: 'Active',
    manager: 'Nomsa Khumalo',
    regions: ['JHB', 'PTA'],
    donationTypes: ['Meat'],
    frequency: 'Weekly',
    lastInteraction: '02 Aug 2026',
    lastInteractionType: 'call',
    followUpDate: '12 Aug 2026',
    overdue: false,
    website: 'https://www.woodlandsmeat.co.za',
    address: '88 Industry Road, Clayville, Olifantsfontein',
    logisticsInfo: 'Refrigerated truck needed. Pickups Mondays at 07:00.',
    primaryContact: {
      name: 'Thabo Mokoena',
      role: 'Logistics Manager',
      phone: '+27 11 974 1200',
      email: 'thabo@woodlandsmeat.co.za'
    }
  },
  {
    id: 'cape-fresh',
    name: 'Cape Fresh Produce Co.',
    type: 'Distributor',
    status: 'Pending Review',
    manager: 'Riaan Botha',
    regions: ['CPT'],
    donationTypes: ['Produce', 'Fruit'],
    frequency: 'Monthly',
    lastInteraction: '24 Jul 2026',
    lastInteractionType: 'email',
    followUpDate: '28 Jul 2026',
    overdue: true,
    website: 'https://www.capefresh.co.za',
    address: 'Epping Market Place 4, Epping Industrial, Cape Town',
    logisticsInfo: 'Fresh produce crates ready every second Wednesday morning.',
    primaryContact: {
      name: 'Johan Nel',
      role: 'Warehouse Supervisor',
      phone: '+27 21 531 8890',
      email: 'johan@capefresh.co.za'
    }
  },
  {
    id: 'umhlanga-dairy',
    name: 'Umhlanga Dairy Group',
    type: 'Manufacturer',
    status: 'Active',
    manager: 'Lerato Mahlangu',
    regions: ['DBN', 'PMB', 'RCB'],
    donationTypes: ['Dairy'],
    frequency: 'Fortnightly',
    lastInteraction: '31 Jul 2026',
    lastInteractionType: 'meeting',
    followUpDate: '14 Aug 2026',
    overdue: false,
    website: 'https://www.umhlangadairy.co.za',
    address: '14 Palm Boulevard, Umhlanga Ridge, Durban',
    logisticsInfo: 'Cold storage loading bay 2, temperature logs mandatory.',
    primaryContact: {
      name: 'Priya Naidoo',
      role: 'Quality Assurance Manager',
      phone: '+27 31 566 4000',
      email: 'priya.n@umhlangadairy.co.za'
    }
  },
  {
    id: 'shoprite-dc',
    name: 'Shoprite Regional DC',
    type: 'Retailer',
    status: 'Active',
    manager: 'Sipho Ndlovu',
    regions: ['JHB', 'CPT', 'DBN'],
    donationTypes: ['Dry goods', 'Produce', 'Bakery'],
    frequency: 'Weekly',
    lastInteraction: '03 Aug 2026',
    lastInteractionType: 'call',
    followUpDate: '10 Aug 2026',
    overdue: false,
    website: 'https://www.shopriteholdings.co.za',
    address: 'Centurion Distribution Park, Old Pretoria Road, Centurion',
    logisticsInfo: 'Multiple bay slots available, 24/7 security gate clearance.',
    primaryContact: {
      name: 'Gareth Smith',
      role: 'Corporate Social Responsibility Lead',
      phone: '+27 12 657 3000',
      email: 'gsmith@shoprite.co.za'
    }
  },
  {
    id: 'karoo-lamb',
    name: 'Karoo Lamb Exporters',
    type: 'Manufacturer',
    status: 'Lapsed',
    manager: 'Ayesha Patel',
    regions: ['CPT', 'GRJ'],
    donationTypes: ['Meat'],
    frequency: 'Quarterly',
    lastInteraction: '16 Apr 2026',
    lastInteractionType: 'email',
    followUpDate: '01 Jun 2026',
    overdue: true,
    website: 'https://www.karoolamb.co.za',
    address: 'Main Road, Graaff-Reinet, Eastern Cape',
    logisticsInfo: 'Plant recently completed refit. Needs re-engagement.',
    primaryContact: {
      name: 'Willem de Klerk',
      role: 'Plant Manager',
      phone: '+27 49 892 1100',
      email: 'willem@karoolamb.co.za'
    }
  },
  {
    id: 'highveld-grain',
    name: 'Highveld Grain Millers',
    type: 'Manufacturer',
    status: 'Active',
    manager: 'Thabo Sithole',
    regions: ['JHB'],
    donationTypes: ['Dry goods'],
    frequency: 'Monthly',
    lastInteraction: '29 Jul 2026',
    lastInteractionType: 'meeting',
    followUpDate: '26 Aug 2026',
    overdue: false,
    website: 'https://www.highveldgrain.co.za',
    address: 'Silicone Road, Wadeville, Germiston',
    logisticsInfo: 'Bulk grain sacks and milled flour pallets.',
    primaryContact: {
      name: 'Kagiso Ndlovu',
      role: 'Operations Director',
      phone: '+27 11 824 5500',
      email: 'k.ndlovu@highveldgrain.co.za'
    }
  },
  {
    id: 'table-bay-cold',
    name: 'Table Bay Cold Storage',
    type: 'Distributor',
    status: 'Pending Review',
    manager: 'Riaan Botha',
    regions: ['CPT'],
    donationTypes: ['Meat', 'Dairy'],
    frequency: 'Ad hoc',
    lastInteraction: '21 Jul 2026',
    lastInteractionType: 'call',
    followUpDate: '04 Aug 2026',
    overdue: false,
    website: 'https://www.tablebaycold.co.za',
    address: 'Paarden Eiland Road, Paarden Eiland, Cape Town',
    logisticsInfo: 'Palletized chilled storage. Walkthrough booked.',
    primaryContact: {
      name: 'Claire Vance',
      role: 'Key Account Manager',
      phone: '+27 21 511 2020',
      email: 'claire@tablebaycold.co.za'
    }
  },
  {
    id: 'pnp-gauteng',
    name: 'Pick n Pay Gauteng North',
    type: 'Retailer',
    status: 'Rejected',
    manager: 'Nomsa Khumalo',
    regions: ['PTA', 'JHB'],
    donationTypes: ['Dry goods'],
    frequency: 'Ad hoc',
    lastInteraction: '12 Jun 2026',
    lastInteractionType: 'email',
    followUpDate: '26 Jun 2026',
    overdue: true,
    primaryContact: {
      name: 'Bongani Zondo',
      role: 'Regional Merchandiser',
      phone: '+27 12 344 9000',
      email: 'bzondo@pnp.co.za'
    }
  },
  {
    id: 'sundale-fruit',
    name: 'Sundale Fruit Farms',
    type: 'Distributor',
    status: 'Active',
    manager: 'Lerato Mahlangu',
    regions: ['NLP', 'JHB'],
    donationTypes: ['Produce', 'Fruit'],
    frequency: 'Fortnightly',
    lastInteraction: '01 Aug 2026',
    lastInteractionType: 'meeting',
    followUpDate: '18 Aug 2026',
    overdue: false,
    primaryContact: {
      name: 'Mariaan Bothma',
      role: 'Distribution Head',
      phone: '+27 15 291 3300',
      email: 'mariaan@sundale.co.za'
    }
  },
  {
    id: 'ethekwini-poultry',
    name: 'eThekwini Poultry Ltd',
    type: 'Manufacturer',
    status: 'Lapsed',
    manager: 'Sipho Ndlovu',
    regions: ['DBN'],
    donationTypes: ['Meat'],
    frequency: 'Monthly',
    lastInteraction: '08 May 2026',
    lastInteractionType: 'call',
    followUpDate: '22 May 2026',
    overdue: true,
    primaryContact: {
      name: 'Siphamandla Dube',
      role: 'Plant Manager',
      phone: '+27 31 205 9900',
      email: 'sdube@ethekwinipoultry.co.za'
    }
  }
];

export const INITIAL_APPROVALS: ApprovalRecord[] = [
  { id: "s1", name: "FoodCorp SA", type: "Manufacturer", regions: "JHB · CPT · DBN", source: "Public Form", requester: null, submittedAgo: "2 days ago", state: "Pending" },
  { id: "s2", name: "Table Bay Cold Storage", type: "Distributor", regions: "CPT", source: "Manual Capture", requester: "Riaan Botha", submittedAgo: "4 days ago", state: "Pending" },
  { id: "s3", name: "Zwelethu Bakeries", type: "Manufacturer", regions: "DBN · PMB", source: "Public Form", requester: null, submittedAgo: "6 days ago", state: "Pending" },
  { id: "s4", name: "Highveld Grain Millers", type: "Manufacturer", regions: "JHB", source: "Manual Capture", requester: "Nomsa Khumalo", submittedAgo: "1 week ago", state: "Approved", approvedBy: "Keegan Roux", decidedWhen: "3 days ago" },
  { id: "s5", name: "Sundale Fruit Farms", type: "Distributor", regions: "NLP · JHB", source: "Public Form", requester: null, submittedAgo: "2 weeks ago", state: "Approved", approvedBy: "Keegan Roux", decidedWhen: "9 days ago" },
  { id: "s6", name: "Metro Wholesale Foods", type: "Retailer", regions: "JHB", source: "Public Form", requester: null, submittedAgo: "3 weeks ago", state: "Rejected", approvedBy: "Keegan Roux", decidedWhen: "12 days ago", rejectionReason: "Company registration number does not match the CIPC record supplied, and no B-BBEE certificate was attached. Ask the contact to resubmit with the correct registration documents before we re-open the application." },
  { id: "s7", name: "Northgate Trading Co.", type: "Distributor", regions: "PTA", source: "Manual Capture", requester: "Ayesha Patel", submittedAgo: "1 month ago", state: "Rejected", approvedBy: "Keegan Roux", decidedWhen: "26 days ago", rejectionReason: "Duplicate of an existing donor record captured under Northgate Trading (Pty) Ltd. Merge the interaction history into the original profile instead." }
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', title: "Send vehicle availability for extra Thursday collection", desc: "Dineo is waiting on confirmation that we can run a refrigerated vehicle on the second weekly slot.", donor: "FoodCorp SA", due: "04 Aug 2026", overdue: true, by: "Nomsa Khumalo", done: false },
  { id: 't2', title: "Chase signed collection agreement", desc: "Second reminder — legal sent the agreement on 14 July and has had no response from procurement.", donor: "Cape Fresh Produce Co.", due: "28 Jul 2026", overdue: true, by: "Ayesha Patel", done: false },
  { id: 't3', title: "Draft one-page impact summary for September board pack", desc: "Pull Q2 tonnage and meal-equivalent figures, keep it to a single page with the donor logo.", donor: "FoodCorp SA", due: "12 Aug 2026", overdue: false, by: "Nomsa Khumalo", done: false },
  { id: 't4', title: "Confirm cold chain sign-off sheet with drivers", desc: "Every collection at the Aeroton plant now needs a completed cold chain sheet countersigned at the gate.", donor: "Umhlanga Dairy Group", due: "14 Aug 2026", overdue: false, by: "Sipho Ndlovu", done: false },
  { id: 't5', title: "Re-engage lapsed donor after plant shutdown", desc: "Karoo Lamb paused donations in April for a plant refit. Refit is complete — call the ops manager.", donor: "Karoo Lamb Exporters", due: "18 Aug 2026", overdue: false, by: "Keegan Roux", done: false },
  { id: 't6', title: "Verify B-BBEE certificate expiry dates", desc: "Three donor certificates lapse before the end of the financial year and need fresh copies on file.", donor: "Shoprite Regional DC", due: "21 Aug 2026", overdue: false, by: "Ayesha Patel", done: false },
  { id: 't7', title: "Set up quarterly impact report distribution list", desc: "Marketing needs a clean list of consenting donor contacts before the Q3 send.", donor: "Highveld Grain Millers", due: "26 Aug 2026", overdue: false, by: "Lerato Mahlangu", done: false },
  { id: 't8', title: "Book depot walkthrough with logistics", desc: "Table Bay wants our team to inspect the chilled bay before the first collection.", donor: "Table Bay Cold Storage", due: "02 Sep 2026", overdue: false, by: "Riaan Botha", done: false },
  { id: 't9', title: "Load B-BBEE certificate expiry reminder", desc: "Reminder created in the CRM for 31 March 2027, one month before the certificate lapses.", donor: "FoodCorp SA", due: "28 Jul 2026", overdue: false, by: "Ayesha Patel", done: true, doneOn: "27 Jul 2026", doneBy: "Keegan Roux" },
  { id: 't10', title: "Capture donor application from public form", desc: "Application reviewed, mandatory fields complete, routed to Nomsa for approval.", donor: "Woodlands Meat Packers", due: "22 Jul 2026", overdue: false, by: "Nomsa Khumalo", done: true, doneOn: "21 Jul 2026", doneBy: "Keegan Roux" },
  { id: 't11', title: "Confirm monthly collection volumes for July", desc: "Volumes reconciled against the depot weighbridge records — 8.2 tonnes for the month.", donor: "Umhlanga Dairy Group", due: "31 Jul 2026", overdue: false, by: "Sipho Ndlovu", done: true, doneOn: "30 Jul 2026", doneBy: "Keegan Roux" }
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  { id: 'tm1', type: 'Call', subject: 'Surplus volume forecast for Q3', body: 'Dineo confirmed the Aeroton plant will have roughly 2.4 tonnes of chilled surplus a week through September, mostly processed meat nearing best-before. She asked whether we can absorb an extra Thursday collection and flagged that the Cape Town plant is running a separate trial we should not count on yet. Agreed to revert with vehicle availability by Friday.', author: 'Nomsa Khumalo', ago: '2 days ago' },
  { id: 'tm2', type: 'Email', subject: 'Impact summary requested before board meeting', body: 'Forwarded the Q2 impact numbers and offered to prepare a one-page summary for their September board pack. Ryan copied in on the marketing angle. Awaiting confirmation on which figures may be published externally.', author: 'Keegan Roux', ago: '6 days ago' },
  { id: 'tm3', type: 'Meeting', subject: 'Site walkthrough — Aeroton chilled DC', body: 'Walked the goods-out area with the logistics controller. Loading bay 4 is available in the 06:00 window; forklift support is provided. Cold chain sign-off sheet must be completed by our driver at every collection.', author: 'Nomsa Khumalo', ago: '3 weeks ago' },
  { id: 'tm4', type: 'Follow-up', subject: 'Follow-up reminder set — national agreement', body: 'Reminder created to check in on group procurement\'s review of the national surplus agreement. Owner: Nomsa. This is now overdue.', author: 'System', ago: '1 month ago' },
  { id: 'tm5', type: 'Note', subject: 'Marketing consent captured', body: 'Consent to use the FoodCorp SA name and logo in impact reporting confirmed in writing by Ryan Adams. Scope covers quarterly reports and the annual certificate, excludes paid social.', author: 'Ayesha Patel', ago: '5 months ago' },
  { id: 'tm6', type: 'Form Submission', subject: 'Donor application received via public form', body: 'Public donor form submitted by Dineo Molefe. All mandatory fields completed, B-BBEE certificate attached. Routed to Nomsa Khumalo for review.', author: 'Public Form', ago: '6 months ago' }
];

export const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: 1,
    sender: "Nomsa Khumalo",
    initials: "NK",
    avatarBg: "#3F5D46",
    age: "13d ago",
    subject: "Introduction — S.A. Harvest food rescue partnership",
    body: "Hi Dineo,\n\nThank you for taking my call this morning. As discussed, S.A. Harvest rescues surplus food and delivers it to vetted beneficiary organisations at no cost to donors. I've outlined how a weekly chilled collection from your Aeroton facility could work.\n\nLooking forward to your thoughts.",
    signature: true,
    sigName: "Nomsa Khumalo",
    sigTitle: "Relationship Manager, S.A. Harvest",
    sigPhone: "+27 82 447 1930"
  },
  {
    id: 2,
    sender: "Nomsa Khumalo",
    initials: "NK",
    avatarBg: "#3F5D46",
    age: "9d ago",
    forwarded: true,
    fromLine: "Dineo Molefe dineo.molefe@foodcorpsa.co.za",
    subject: "RE: Introduction — S.A. Harvest food rescue partnership",
    body: "Hi Nomsa,\n\nThis sounds like a strong fit for us. Our Aeroton depot typically has 300–400 kg of chilled product weekly that falls inside sell-by but outside our retail window. Please send the Section 18A documentation and your collection SLA so I can route it to our compliance team."
  },
  {
    id: 3,
    sender: "Nomsa Khumalo",
    initials: "NK",
    avatarBg: "#3F5D46",
    age: "2d ago",
    subject: "Section 18A docs + collection SLA attached",
    body: "Hi Dineo,\n\nAttached are our Section 18A receipt template, NPO registration certificate and the standard collection SLA. Once compliance signs off, we can schedule a first pickup for the week of 24 August."
  }
];

export const INITIAL_EMAIL_ATTACHMENTS: EmailAttachment[] = [
  { name: "Section 18A receipt template.pdf", meta: "PDF · 240 KB · sent 2d ago" },
  { name: "NPO registration certificate.pdf", meta: "PDF · 1.1 MB · sent 2d ago" },
  { name: "FW dineo-original-enquiry.eml", meta: "EML · 36 KB · forwarded 9d ago" }
];

export const DASHBOARD_CHARTS_DATA = {
  Weekly: [
    { label: "Nomsa", value: 22 },
    { label: "Sipho", value: 15 },
    { label: "Riaan", value: 31 },
    { label: "Lerato", value: 27 },
    { label: "Ayesha", value: 19 },
    { label: "Johan", value: 12 },
    { label: "Thabo", value: 24 }
  ],
  Monthly: [
    { label: "Nomsa", value: 84 },
    { label: "Sipho", value: 61 },
    { label: "Riaan", value: 112 },
    { label: "Lerato", value: 96 },
    { label: "Ayesha", value: 73 },
    { label: "Johan", value: 48 },
    { label: "Thabo", value: 89 }
  ]
};

export const OVERDUE_FOLLOWUPS = [
  { name: "Thandiwe Mokoena", ref: "DNR-10482", status: "Pending Review" as const, days: 21 },
  { name: "Groote Schuur Trust", ref: "DNR-10231", status: "Active" as const, days: 16 },
  { name: "Pieter van der Merwe", ref: "DNR-10877", status: "Lapsed" as const, days: 14 },
  { name: "Kagiso Family Foundation", ref: "DNR-10119", status: "Pending Review" as const, days: 9 },
  { name: "Zanele Dlamini", ref: "DNR-10945", status: "Rejected" as const, days: 6 },
  { name: "Bo-Kaap Wholesale Co.", ref: "DNR-10307", status: "Active" as const, days: 4 }
];

export const INITIAL_USERS: UserAccount[] = [
  { id: 'usr-1', name: "Keegan Naidoo", email: "keegan@saharvest.org", role: "SuperAdmin", active: true, created: "12 Jan 2024", self: true },
  { id: 'usr-2', name: "Nomsa Dube", email: "nomsa@saharvest.org", role: "Admin", active: true, created: "03 Mar 2024" },
  { id: 'usr-3', name: "Johan Pretorius", email: "johan@saharvest.org", role: "Admin", active: false, created: "15 Feb 2024" },
  { id: 'usr-4', name: "Riaan Fourie", email: "riaan@saharvest.org", role: "Procurement", active: true, created: "18 Apr 2024" },
  { id: 'usr-5', name: "Lerato Molefe", email: "lerato@saharvest.org", role: "Procurement", active: true, created: "02 Jun 2024" },
  { id: 'usr-6', name: "Thabo Mashaba", email: "thabo@saharvest.org", role: "Procurement", active: true, created: "07 Jan 2025" },
  { id: 'usr-7', name: "Ayesha Cassim", email: "ayesha@saharvest.org", role: "Marketing", active: true, created: "11 Aug 2024" },
  { id: 'usr-8', name: "Sipho Ndlovu", email: "sipho@saharvest.org", role: "Marketing", active: true, created: "29 Oct 2024" },
  { id: 'usr-9', name: "Annelie du Toit", email: "annelie@saharvest.org", role: "Marketing", active: false, created: "21 May 2025" }
];

