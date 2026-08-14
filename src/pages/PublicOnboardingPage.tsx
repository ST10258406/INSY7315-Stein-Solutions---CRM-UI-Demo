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
  FileText,
  Building2,
  Users,
  MapPin,
  Truck,
  ShieldCheck,
  PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['CPT', 'EC']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Fruit', 'Vegetables', 'Dry Goods']);
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

  const toggleChip = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
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
      <div className="min-h-screen bg-[#FFFFFF] text-[var(--ink)] flex flex-col items-center justify-center p-6 text-center animate-pop">
        <div className="w-18 h-18 rounded-3xl bg-[#E5F4E9] flex items-center justify-center text-[#1E6E3C] mb-5 shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
          Application Submitted!
        </h1>
        <p className="text-base text-[var(--muted)] max-w-md font-medium leading-relaxed mb-6">
          Thank you for applying to partner with S.A. Harvest. Our team will review your application and be in touch shortly.
        </p>
        <Button variant="default" className="h-12 px-8 text-sm" onClick={onClose}>
          Return to CRM
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[var(--ink)] flex flex-col relative">
      {onClose && (
        <button
          onClick={onClose}
          title="Close preview"
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full border border-[var(--border)] bg-[#FFFFFF] flex items-center justify-center text-[var(--icon)] hover:border-[var(--ink)] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <header className="flex flex-col items-center gap-3.5 px-6 pt-11 pb-2.5 text-center">
        <img
          src="/assets/sa-harvest-logo.svg"
          alt="S.A. Harvest"
          className="w-19.5 h-19.5 rounded-2xl object-cover block shadow-sm border border-[var(--border)]"
        />
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">S.A. Harvest</div>
          <div className="text-[10.5px] font-bold tracking-[2px] text-[var(--muted)] mt-0.5">
            DONOR ONBOARDING
          </div>
        </div>
        <p className="m-0 max-w-[460px] text-[14.5px] leading-relaxed text-[var(--muted)] font-medium">
          Partner with us to fight food insecurity in South Africa.
        </p>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[860px] mx-auto px-6 py-7 pb-15 flex-1">
        {/* Step Wizard Progress Bar */}
        <div className="flex items-start mb-7">
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < step;
            const isCurrent = stepNum === step;

            return (
              <div key={label} className="flex-1 relative flex flex-col items-center gap-1.75 min-w-0">
                {i > 0 && (
                  <div
                    className={`absolute top-4 right-1/2 w-full h-0.5 -mr-4 z-0 ${
                      stepNum <= step ? 'bg-[#16160F]' : 'bg-[var(--border)]'
                    }`}
                  />
                )}
                <button
                  onClick={() => {
                    setErrors({});
                    setStep(stepNum);
                  }}
                  className={`relative z-1 w-8.25 h-8.25 rounded-full flex items-center justify-center font-extrabold text-[12.5px] cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-[#FADF01] text-[#16160F] shadow-[0_2px_8px_rgba(250,223,1,0.5)]'
                      : isDone
                      ? 'bg-[#16160F] text-[#FADF01]'
                      : 'border border-[var(--border)] bg-[#FFFFFF] text-[var(--muted2)]'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 text-[#FADF01] stroke-[3]" /> : stepNum}
                </button>
                <span
                  className={`text-[10.5px] whitespace-nowrap ${
                    isCurrent ? 'font-extrabold text-[var(--ink)]' : 'font-semibold text-[var(--muted2)]'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Form Card */}
        <div className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-7.5 px-8 shadow-[0_1px_3px_var(--shadow)]">
          {/* STEP 1: Company Info */}
          {step === 1 && (
            <div>
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Company Information
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                Tell us about your company. Fields marked <span className="text-[#D4373A]">*</span> are required.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Company Name <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Fresh Fields Wholesale"
                    className={`h-11.5 px-3.5 rounded-xl border ${
                      errors.companyName ? 'border-[#D4373A] bg-[#FDF6F6]' : 'border-[var(--border)] bg-[#FFFFFF]'
                    } outline-none text-[13.5px] font-medium text-[var(--ink)]`}
                  />
                  {errors.companyName && (
                    <span className="text-[11.5px] font-semibold text-[#D4373A]">
                      Company name is required.
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Company Type <span className="text-[#D4373A]">*</span>
                  </span>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="h-11.5 px-3 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)] cursor-pointer"
                  >
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Farm / Producer">Farm / Producer</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Website <span className="font-normal text-[var(--muted2)]">(optional)</span>
                  </span>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="freshfields.co.za"
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Registered Company Name <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={registeredName}
                    onChange={(e) => setRegisteredName(e.target.value)}
                    placeholder="Fresh Fields Wholesale (Pty) Ltd"
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: Contacts */}
          {step === 2 && (
            <div>
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Contacts
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                Who should we speak to at your company?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-6">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Primary Contact Name <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={primaryName}
                    onChange={(e) => setPrimaryName(e.target.value)}
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Job Title <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={primaryRole}
                    onChange={(e) => setPrimaryRole(e.target.value)}
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Phone <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Email <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={primaryEmail}
                    onChange={(e) => setPrimaryEmail(e.target.value)}
                    className={`h-11.5 px-3.5 rounded-xl border ${
                      errors.primaryEmail ? 'border-[#D4373A] bg-[#FDF6F6]' : 'border-[var(--border)] bg-[#FFFFFF]'
                    } outline-none text-[13.5px] font-medium text-[var(--ink)]`}
                  />
                  {errors.primaryEmail && (
                    <span className="text-[11.5px] font-semibold text-[#D4373A]">
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
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Registered Address
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">Your company's registered address.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                <label className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-[12.5px] font-bold">
                    Street Name & Number <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="h-11.5 px-3.5 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    City <span className="text-[#D4373A]">*</span>
                  </span>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`h-11.5 px-3.5 rounded-xl border ${
                      errors.city ? 'border-[#D4373A] bg-[#FDF6F6]' : 'border-[var(--border)] bg-[#FFFFFF]'
                    } outline-none text-[13.5px] font-medium text-[var(--ink)]`}
                  />
                  {errors.city && (
                    <span className="text-[11.5px] font-semibold text-[#D4373A]">City is required.</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Province <span className="text-[#D4373A]">*</span>
                  </span>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="h-11.5 px-3 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)] cursor-pointer"
                  >
                    <option value="Western Cape">Western Cape</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Donations */}
          {step === 4 && (
            <div>
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Donation Information
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                Help us plan collections and match your donations to need.
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-bold">
                    Collection / Pickup Address <span className="text-[#D4373A]">*</span>
                  </span>
                  <textarea
                    rows={3}
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className={`p-3 px-3.5 rounded-xl border ${
                      errors.pickupAddress ? 'border-[#D4373A] bg-[#FDF6F6]' : 'border-[var(--border)] bg-[#FFFFFF]'
                    } outline-none text-[13.5px] font-medium text-[var(--ink)] resize-y`}
                  />
                </label>

                <div>
                  <span className="block text-[12.5px] font-bold mb-2">Operational Regions</span>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((r) => {
                      const isSelected = selectedRegions.includes(r);
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => toggleChip(r, selectedRegions, setSelectedRegions)}
                          className={`h-9 px-4 rounded-full font-bold text-[12.5px] cursor-pointer ${
                            isSelected ? 'bg-[#16160F] text-[#FADF01]' : 'border border-[var(--border)] bg-[#FFFFFF] text-[var(--muted)]'
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-[12.5px] font-bold mb-2">Donation Types</span>
                  <div className="flex flex-wrap gap-2">
                    {DTYPES.map((t) => {
                      const isSelected = selectedTypes.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleChip(t, selectedTypes, setSelectedTypes)}
                          className={`h-9 px-4 rounded-full font-bold text-[12.5px] cursor-pointer ${
                            isSelected ? 'bg-[#16160F] text-[#FADF01]' : 'border border-[var(--border)] bg-[#FFFFFF] text-[var(--muted)]'
                          }`}
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
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Compliance
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                All fields on this step are optional.
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5 max-w-xs">
                  <span className="text-[12.5px] font-bold">BBBEE Status</span>
                  <select
                    value={bbbeeStatus}
                    onChange={(e) => setBbbeeStatus(e.target.value)}
                    className="h-11.5 px-3 rounded-xl border border-[var(--border)] bg-[#FFFFFF] outline-none text-[13.5px] font-medium text-[var(--ink)] cursor-pointer"
                  >
                    <option value="Level 2">Level 2</option>
                    <option value="Level 1">Level 1</option>
                    <option value="Level 3">Level 3</option>
                    <option value="Level 4">Level 4</option>
                  </select>
                </label>

                <div>
                  <span className="block text-[12.5px] font-bold mb-2">BBBEE Certificate</span>
                  <div className="border-2 border-dashed border-[var(--border)] rounded-2xl bg-[#FFFFFF] p-7 flex flex-col items-center gap-2 text-center cursor-pointer hover:border-[#C9B300] hover:bg-[#FFFDF0] transition-colors">
                    <UploadCloud className="w-8 h-8 text-[var(--icon)]" />
                    <div className="text-[13.5px] font-bold">Drag & drop your certificate, or browse</div>
                    <div className="text-[11.5px] text-[var(--muted)] font-medium">PDF or image · max 5MB</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Signature */}
          {step === 6 && (
            <div>
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Signature
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                Please sign to confirm the information provided is accurate <span className="text-[#D4373A]">*</span>
              </p>
              <canvas
                ref={sigRef}
                width={740}
                height={220}
                onPointerDown={handleSigPointerDown}
                onPointerMove={handleSigPointerMove}
                onPointerUp={handleSigPointerUp}
                className={`block w-full h-[220px] rounded-2xl bg-[#FFFFFF] touch-none cursor-crosshair border-2 ${
                  errors.signature ? 'border-[#D4373A]' : 'border-[var(--border)]'
                }`}
              />
              {errors.signature && (
                <div className="mt-2 text-[11.5px] font-semibold text-[#D4373A]">
                  A signature is required before you can continue.
                </div>
              )}
              <div className="flex items-center gap-3 mt-3">
                <Button variant="secondary" size="sm" onClick={handleSigClear}>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </Button>
                <span className="text-[11.5px] text-[var(--muted)] font-medium">
                  Draw your signature above using your mouse or finger.
                </span>
              </div>
            </div>
          )}

          {/* STEP 7: Review */}
          {step === 7 && (
            <div>
              <h2 className="m-0 mb-1 text-lg font-extrabold tracking-tight text-[var(--ink)]">
                Review
              </h2>
              <p className="m-0 mb-6 text-13 text-[var(--muted)] font-medium">
                Please check your details before submitting.
              </p>
              <div className="flex flex-col gap-3.5">
                {/* Summary Groups */}
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
                  {
                    title: 'Donations',
                    stepTarget: 4,
                    rows: [
                      { label: 'Regions', value: selectedRegions.join(', ') },
                      { label: 'Types', value: selectedTypes.join(', ') },
                    ],
                  },
                ].map((grp) => (
                  <div key={grp.title} className="bg-[#FFFFFF] border border-[var(--border)] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-13 font-extrabold">{grp.title}</span>
                      <button
                        onClick={() => setStep(grp.stepTarget)}
                        className="flex items-center gap-1 border-none bg-transparent text-xs font-bold text-[var(--ink)] cursor-pointer border-b-[1.5px] border-[#FADF01]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {grp.rows.map((row) => (
                        <React.Fragment key={row.label}>
                          <span className="text-[var(--muted)] font-medium">{row.label}:</span>
                          <span className="font-semibold">{row.value}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-2.5 mt-5.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => {
                    setConfirmChecked(e.target.checked);
                    setErrors({});
                  }}
                  className="w-4.5 h-4.5 mt-0.5 accent-[#16160F] cursor-pointer"
                />
                <span className="text-13 font-semibold">
                  I confirm this information is accurate <span className="text-[#D4373A]">*</span>
                </span>
              </label>
              {errors.confirm && (
                <div className="mt-1.5 ml-7 text-[11.5px] font-semibold text-[#D4373A]">
                  Please confirm before submitting.
                </div>
              )}
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between mt-7.5 pt-5 border-t border-[var(--hair)]">
            <div>
              {step > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-xs font-semibold text-[var(--muted2)]">
                Step {step} of 7
              </span>
              {step < 7 ? (
                <Button variant="default" onClick={handleNext}>
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button variant="default" onClick={handleSubmit} className="h-12 px-7 font-extrabold text-sm">
                  <span>Submit Application</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-[var(--muted2)] font-medium">
        S.A. Harvest NPC · Rescuing food, fighting hunger · Protected under POPIA.
      </footer>
    </div>
  );
};
