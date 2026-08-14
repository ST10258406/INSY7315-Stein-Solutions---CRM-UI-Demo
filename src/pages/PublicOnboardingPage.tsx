import React, { useState, useRef } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  RotateCcw, 
  Edit3, 
  CheckCircle2, 
  X,
  FileText
} from 'lucide-react';
import logoImg from '@/assets/sa-harvest-logo.png';

interface PublicOnboardingPageProps {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}

const STEPS = [
  'Company Info',
  'Contacts',
  'Address',
  'Donations',
  'Compliance',
  'Signature',
  'Review',
];

const REGIONS = ['JHB', 'CPT', 'KZN', 'EC', 'BFN', 'MPU', 'LIM'];
const DTYPES = ['Bakery', 'Beverages', 'Dairy', 'Dry Goods', 'Financial', 'Fruit', 'Meat', 'Non Food', 'Prepared Food', 'Vegetables', 'Other'];

export const PublicOnboardingPage: React.FC<PublicOnboardingPageProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const [step, setStep] = useState(1);

  // Step 1: Company
  const [companyName, setCompanyName] = useState('Fresh Fields Wholesale');
  const [companyType, setCompanyType] = useState('Wholesaler');
  const [website, setWebsite] = useState('freshfields.co.za');
  const [registeredName, setRegisteredName] = useState('Fresh Fields Wholesale (Pty) Ltd');
  const [tradingName, setTradingName] = useState('Fresh Fields');
  const [legalEntity, setLegalEntity] = useState('(Pty) Ltd — Private Company');
  const [regNumber, setRegNumber] = useState('2014/183920/07');
  const [taxNumber, setTaxNumber] = useState('9012345678');

  // Step 2: Contacts
  const [primaryName, setPrimaryName] = useState('Naledi Khumalo');
  const [primaryRole, setPrimaryRole] = useState('Head of CSR');
  const [primaryPhone, setPrimaryPhone] = useState('+27 82 447 1123');
  const [primaryEmail, setPrimaryEmail] = useState('naledi@freshfields.co.za');

  // Step 3: Address
  const [street, setStreet] = useState('14 Loop Street');
  const [suburb, setSuburb] = useState('Bo-Kaap');
  const [city, setCity] = useState('Cape Town');
  const [province, setProvince] = useState('Western Cape');
  const [postalCode, setPostalCode] = useState('8001');

  // Step 4: Donation
  const [pickupAddress, setPickupAddress] = useState('Warehouse 3, 14 Loop Street, Bo-Kaap, Cape Town');
  const [selectedRegions, setSelectedRegions] = useState<Record<string, boolean>>({ CPT: true, EC: true });
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({ Fruit: true, Vegetables: true, 'Dry Goods': true });
  const [frequency, setFrequency] = useState('Weekly');
  const [logisticsNotes, setLogisticsNotes] = useState('Contact gate on arrival. Collections weekdays before 14:00.');

  // Step 5: Compliance
  const [bbbeeStatus, setBbbeeStatus] = useState('Level 2');

  // Step 6: Signature
  const [sigDrawn, setSigDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const sigRef = useRef<HTMLCanvasElement>(null);

  // Step 7: Review
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) => ({ ...prev, [r]: !prev[r] }));
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) => ({ ...prev, [t]: !prev[t] }));
  };

  const validateStep = (s: number) => {
    const errs: Record<string, boolean> = {};
    if (s === 1 && !companyName.trim()) errs.companyName = true;
    if (s === 2 && !primaryEmail.trim()) errs.primaryEmail = true;
    if (s === 3 && !city.trim()) errs.city = true;
    if (s === 4 && !pickupAddress.trim()) errs.pickupAddress = true;
    if (s === 6 && !sigDrawn) errs.signature = true;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(7, prev + 1));
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (!confirmChecked) {
      setErrors({ confirm: true });
      return;
    }
    setIsSubmitted(true);
    if (onSubmitSuccess) onSubmitSuccess();
  };

  // Signature Canvas Controls
  const getSigCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = sigRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const handleSigPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = sigRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#16160F';

    const { x, y } = getSigCoords(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvas.setPointerCapture(e.pointerId);
  };

  const handleSigPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = sigRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getSigCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!sigDrawn) {
      setSigDrawn(true);
      setErrors((prev) => ({ ...prev, signature: false }));
    }
  };

  const handleSigPointerUp = () => {
    setIsDrawing(false);
  };

  const handleSigClear = () => {
    const canvas = sigRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSigDrawn(false);
  };

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#16160F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '24px', background: '#E5F4E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E6E3C', marginBottom: '20px' }}>
          <CheckCircle2 size={40} />
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.6px' }}>
          Application Submitted!
        </h1>
        <p style={{ margin: '0 0 24px', maxWidth: '440px', fontSize: '15px', lineHeight: 1.55, color: '#82827A', fontWeight: 500 }}>
          Thank you for applying to partner with S.A. Harvest. Our team will review your application and be in touch shortly.
        </p>
        <button
          onClick={onClose}
          style={{ height: '48px', padding: '0 32px', borderRadius: '24px', border: 'none', background: '#FADF01', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#16160F', cursor: 'pointer' }}
        >
          Return to CRM
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#16160F', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {onClose && (
        <button
          onClick={onClose}
          title="Close preview"
          style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 50, width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E4E4DE', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <X size={18} style={{ margin: 'auto' }} />
        </button>
      )}

      {/* Header */}
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', padding: '44px 24px 10px', textAlign: 'center' }}>
        <img
          src={logoImg}
          alt="S.A. Harvest — Rescuing food, fighting hunger"
          style={{ width: '78px', height: '78px', borderRadius: '18px', objectFit: 'cover', display: 'block' }}
        />
        <div>
          <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.6px' }}>S.A. Harvest</div>
          <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', color: '#82827A', marginTop: '2px' }}>DONOR ONBOARDING</div>
        </div>
        <p style={{ margin: 0, maxWidth: '460px', fontSize: '14.5px', lineHeight: 1.55, color: '#82827A', fontWeight: 500 }}>
          Partner with us to fight food insecurity in South Africa.
        </p>
      </header>

      {/* Main Container */}
      <main style={{ width: '100%', maxWidth: '860px', margin: '0 auto', padding: '28px 24px 60px', flex: 1 }}>
        {/* Step Wizard Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '28px' }}>
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < step;
            const isCurrent = stepNum === step;

            return (
              <div key={label} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', minWidth: 0 }}>
                {i > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '50%',
                      width: '100%',
                      height: '2px',
                      marginRight: '16px',
                      background: stepNum <= step ? '#16160F' : '#E4E4DE',
                      zIndex: 0,
                    }}
                  />
                )}
                <button
                  onClick={() => {
                    setErrors({});
                    setStep(stepNum);
                  }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '33px',
                    height: '33px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '12.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: isCurrent ? 'none' : isDone ? 'none' : '1.5px solid #E4E4DE',
                    background: isCurrent ? '#FADF01' : isDone ? '#16160F' : '#FFFFFF',
                    color: isCurrent ? '#16160F' : isDone ? '#FADF01' : '#9A9A90',
                    boxShadow: isCurrent ? '0 2px 8px rgba(250,223,1,0.5)' : 'none',
                  }}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : stepNum}
                </button>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: isCurrent ? 800 : 600,
                    color: isCurrent ? '#16160F' : '#9A9A90',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Form Card */}
        <div style={{ background: '#F6F6F3', border: '1px solid #E4E4DE', borderRadius: '16px', padding: '30px 32px 26px', boxShadow: '0 1px 3px rgba(20,20,15,0.05)' }}>
          {/* STEP 1: Company Info */}
          {step === 1 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Company Information
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                Tell us about your company. Fields marked <span style={{ color: '#D4373A' }}>*</span> are required.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Company Name <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Fresh Fields Wholesale"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: errors.companyName ? '1.5px solid #D4373A' : '1.5px solid #E4E4DE', background: errors.companyName ? '#FDF6F6' : '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                  {errors.companyName && (
                    <span style={{ fontSize: '11.5px', color: '#D4373A', fontWeight: 600 }}>
                      Company name is required.
                    </span>
                  )}
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Company Type <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    style={{ height: '46px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%', cursor: 'pointer' }}
                  >
                    <option>Wholesaler</option>
                    <option>Retailer</option>
                    <option>Manufacturer</option>
                    <option>Farm / Producer</option>
                    <option>Hospitality</option>
                    <option>Financial Services</option>
                    <option>Other</option>
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Website <span style={{ fontWeight: 500, color: '#9A9A90' }}>(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="freshfields.co.za"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Registered Company Name <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={registeredName}
                    onChange={(e) => setRegisteredName(e.target.value)}
                    placeholder="Fresh Fields Wholesale (Pty) Ltd"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Trading Name <span style={{ fontWeight: 500, color: '#9A9A90' }}>(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={tradingName}
                    onChange={(e) => setTradingName(e.target.value)}
                    placeholder="Fresh Fields"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Legal Entity Type <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <select
                    value={legalEntity}
                    onChange={(e) => setLegalEntity(e.target.value)}
                    style={{ height: '46px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%', cursor: 'pointer' }}
                  >
                    <option>(Pty) Ltd — Private Company</option>
                    <option>Ltd — Public Company</option>
                    <option>CC — Close Corporation</option>
                    <option>NPC — Non-Profit Company</option>
                    <option>Trust</option>
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Company Registration Number <span style={{ fontWeight: 500, color: '#9A9A90' }}>(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="2014/183920/07"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Income Tax Number <span style={{ fontWeight: 500, color: '#9A9A90' }}>(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    placeholder="9012345678"
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                  <span style={{ fontSize: '11.5px', color: '#82827A', fontWeight: 500 }}>Must not start with 4</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: Contacts */}
          {step === 2 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Contacts
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                Who should we speak to at your company?
              </p>

              <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px' }}>
                Primary Contact <span style={{ color: '#D4373A' }}>*</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '26px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Name <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={primaryName}
                    onChange={(e) => setPrimaryName(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Job Title <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={primaryRole}
                    onChange={(e) => setPrimaryRole(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Phone <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Email <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={primaryEmail}
                    onChange={(e) => setPrimaryEmail(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: errors.primaryEmail ? '1.5px solid #D4373A' : '1.5px solid #E4E4DE', background: errors.primaryEmail ? '#FDF6F6' : '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                  {errors.primaryEmail && (
                    <span style={{ fontSize: '11.5px', color: '#D4373A', fontWeight: 600 }}>
                      A valid email address is required.
                    </span>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Address */}
          {step === 3 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Registered Address
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>Your company's registered address.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Street Name & Number <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    City <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ height: '46px', padding: '0 14px', borderRadius: '10px', border: errors.city ? '1.5px solid #D4373A' : '1.5px solid #E4E4DE', background: errors.city ? '#FDF6F6' : '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%' }}
                  />
                  {errors.city && <span style={{ fontSize: '11.5px', color: '#D4373A', fontWeight: 600 }}>City is required.</span>}
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Province <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    style={{ height: '46px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%', cursor: 'pointer' }}
                  >
                    <option>Western Cape</option>
                    <option>Gauteng</option>
                    <option>KwaZulu-Natal</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Donations */}
          {step === 4 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Donation Information
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                Help us plan collections and match your donations to need.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    Collection / Pickup Address <span style={{ color: '#D4373A' }}>*</span>
                  </span>
                  <textarea
                    rows={3}
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    style={{ padding: '12px 14px', borderRadius: '10px', border: errors.pickupAddress ? '1.5px solid #D4373A' : '1.5px solid #E4E4DE', background: errors.pickupAddress ? '#FDF6F6' : '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%', resize: 'vertical' }}
                  />
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>Operational Regions</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {REGIONS.map((r) => {
                      const on = !!selectedRegions[r];
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => toggleRegion(r)}
                          style={{ height: '36px', padding: '0 16px', borderRadius: '18px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', border: on ? 'none' : '1.5px solid #E4E4DE', background: on ? '#16160F' : '#FFFFFF', color: on ? '#FADF01' : '#82827A' }}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>Donation Types</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {DTYPES.map((t) => {
                      const on = !!selectedTypes[t];
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleType(t)}
                          style={{ height: '36px', padding: '0 16px', borderRadius: '18px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', border: on ? 'none' : '1.5px solid #E4E4DE', background: on ? '#16160F' : '#FFFFFF', color: on ? '#FADF01' : '#82827A' }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Compliance */}
          {step === 5 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Compliance
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                All fields on this step are optional.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '340px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>BBBEE Status</span>
                  <select
                    value={bbbeeStatus}
                    onChange={(e) => setBbbeeStatus(e.target.value)}
                    style={{ height: '46px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', color: '#16160F', outline: 'none', width: '100%', cursor: 'pointer' }}
                  >
                    <option>Level 2</option>
                    <option>Level 1</option>
                    <option>Level 3</option>
                    <option>Level 4</option>
                  </select>
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>BBBEE Certificate</span>
                  <div style={{ border: '2px dashed #E4E4DE', borderRadius: '14px', background: '#FFFFFF', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center', cursor: 'pointer' }}>
                    <UploadCloud size={24} style={{ color: '#4A4A43' }} />
                    <div style={{ fontSize: '13.5px', fontWeight: 700 }}>Drag & drop your certificate, or browse</div>
                    <div style={{ fontSize: '11.5px', color: '#82827A', fontWeight: 500 }}>PDF or image · max 5MB</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Signature */}
          {step === 6 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Signature
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                Please sign to confirm the information provided is accurate <span style={{ color: '#D4373A' }}>*</span>
              </p>
              <canvas
                ref={sigRef}
                width={740}
                height={220}
                onPointerDown={handleSigPointerDown}
                onPointerMove={handleSigPointerMove}
                onPointerUp={handleSigPointerUp}
                style={{ display: 'block', width: '100%', height: '220px', borderRadius: '14px', background: '#FFFFFF', touchAction: 'none', cursor: 'crosshair', border: errors.signature ? '2px solid #D4373A' : '2px solid #E4E4DE' }}
              />
              {errors.signature && (
                <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#D4373A', fontWeight: 600 }}>
                  A signature is required before you can continue.
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={handleSigClear}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '38px', padding: '0 16px', borderRadius: '19px', border: '1px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '12.5px', fontWeight: 600, color: '#16160F', cursor: 'pointer' }}
                >
                  <RotateCcw size={13} />
                  <span>Clear</span>
                </button>
                <span style={{ fontSize: '11.5px', color: '#82827A', fontWeight: 500 }}>
                  Draw your signature above using your mouse or finger.
                </span>
              </div>
            </div>
          )}

          {/* STEP 7: Review */}
          {step === 7 && (
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                Review
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#82827A', fontWeight: 500 }}>
                Please check your details before submitting.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  {
                    title: 'Company Information',
                    stepTarget: 1,
                    rows: [
                      { label: 'Company Name', value: companyName },
                      { label: 'Company Type', value: companyType },
                      { label: 'Registered Name', value: registeredName },
                    ],
                  },
                  {
                    title: 'Contacts',
                    stepTarget: 2,
                    rows: [
                      { label: 'Primary Contact', value: `${primaryName} · ${primaryRole}` },
                      { label: 'Email', value: primaryEmail },
                    ],
                  },
                  {
                    title: 'Registered Address',
                    stepTarget: 3,
                    rows: [{ label: 'Location', value: `${street}, ${suburb}, ${city}` }],
                  },
                ].map((grp) => (
                  <div key={grp.title} style={{ background: '#FFFFFF', border: '1px solid #E4E4DE', borderRadius: '12px', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{grp.title}</span>
                      <button
                        onClick={() => setStep(grp.stepTarget)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'transparent', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '12px', fontWeight: 700, color: '#16160F', cursor: 'pointer', borderBottom: '1.5px solid #FADF01', padding: '0 0 1px', marginLeft: 'auto' }}
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', rowGap: '7px', columnGap: '16px' }}>
                      {grp.rows.map((row) => (
                        <React.Fragment key={row.label}>
                          <span style={{ fontSize: '12.5px', color: '#82827A', fontWeight: 500 }}>{row.label}</span>
                          <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{row.value}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '22px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => {
                    setConfirmChecked(e.target.checked);
                    setErrors({});
                  }}
                  style={{ width: '18px', height: '18px', margin: '1px 0 0', accentColor: '#16160F', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>
                  I confirm this information is accurate <span style={{ color: '#D4373A' }}>*</span>
                </span>
              </label>
              {errors.confirm && (
                <div style={{ marginTop: '6px', marginLeft: '28px', fontSize: '11.5px', color: '#D4373A', fontWeight: 600 }}>
                  Please confirm before submitting.
                </div>
              )}
            </div>
          )}

          {/* Footer Navigation Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', paddingTop: '22px', borderTop: '1px solid #EDEDE8' }}>
            <div>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '46px', padding: '0 22px', borderRadius: '23px', border: '1px solid #E4E4DE', background: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', fontWeight: 600, color: '#16160F', cursor: 'pointer' }}
                >
                  <ChevronLeft size={14} />
                  <span>Back</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' }}>
              <span style={{ fontSize: '12px', color: '#9A9A90', fontWeight: 600 }}>
                Step {step} of 7
              </span>

              {step < 7 ? (
                <button
                  onClick={handleNext}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '46px', padding: '0 26px', borderRadius: '23px', border: 'none', background: '#FADF01', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#16160F', cursor: 'pointer', boxShadow: '0 2px 8px rgba(250,223,1,0.45)' }}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{ display: 'flex', alignItems: 'center', gap: '9px', height: '50px', padding: '0 30px', borderRadius: '25px', border: 'none', background: '#FADF01', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '14.5px', fontWeight: 800, color: '#16160F', cursor: 'pointer', boxShadow: '0 2px 10px rgba(250,223,1,0.5)' }}
                >
                  <span>Submit Application</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: '22px 24px 34px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '11.5px', color: '#9A9A90', fontWeight: 500 }}>
          S.A. Harvest NPC · Rescuing food, fighting hunger · Your information is protected under POPIA.
        </p>
      </footer>
    </div>
  );
};
