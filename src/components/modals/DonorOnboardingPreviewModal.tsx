import React, { useState } from 'react';
import { X, CheckCircle, Upload, Shield, Leaf, Heart, ArrowRight } from 'lucide-react';
import logoImg from '@/assets/sa-harvest-logo.png';

interface DonorOnboardingPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonorOnboardingPreviewModal: React.FC<DonorOnboardingPreviewModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/55 backdrop-blur-xs animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] bg-[var(--page)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
        {/* Top Header Banner */}
        <div className="bg-[#16160F] text-[#F4F4EE] px-6 py-4 flex items-center justify-between border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="S.A. Harvest Logo" className="w-10 h-10 rounded-xl object-cover border border-[#333]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white">S.A. Harvest</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FADF01] text-[#16160F] uppercase tracking-wider">
                  Public Portal Preview
                </span>
              </div>
              <p className="text-xs text-[var(--muted2)] font-medium">Donor Partner Registration & Onboarding Form</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Portal Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 px-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#E5F4E9] border border-[#2E9E56]/30 flex items-center justify-center mb-4 text-[#2E9E56]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-xs font-medium text-[var(--muted)] leading-relaxed mb-6">
                Thank you for applying to partner with S.A. Harvest! Your application has been routed directly to our relationship manager team for review and approval.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="h-10 px-6 rounded-full bg-[#16160F] text-[#FADF01] text-xs font-bold hover:bg-black transition-colors cursor-pointer"
              >
                Reset Demo Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hero Callout */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADF01]/20 text-[#16160F] dark:text-[#FADF01] flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] mb-1">Partner with S.A. Harvest</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed font-medium">
                    Complete this brief onboarding form to register your business as a donor partner. We issue Section 18A tax certificates and coordinate refrigerated logistics at zero cost to your organization.
                  </p>
                </div>
              </div>

              {/* Section 1: Company Profile */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[var(--icon)]" />
                  <span>1. Entity & Legal Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Registered Legal Name *</span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. FoodCorp South Africa (Pty) Ltd" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Registration Number (CIPC) *</span>
                    <input 
                      type="text" 
                      required
                      placeholder="2018/123456/07" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">VAT / Tax Number</span>
                    <input 
                      type="text" 
                      placeholder="4900123456" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">B-BBEE Level</span>
                    <select className="h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none cursor-pointer">
                      <option>Level 1 Contributor</option>
                      <option>Level 2 Contributor</option>
                      <option>Level 3 Contributor</option>
                      <option>Level 4 Contributor</option>
                      <option>Non-Compliant / Exempt</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Section 2: Contact Person */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[var(--icon)]" />
                  <span>2. Representative & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Full Name *</span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dineo Molefe" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Designation / Role *</span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. CSR Manager" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Mobile / Work Phone *</span>
                    <input 
                      type="text" 
                      required
                      placeholder="+27 82 123 4567" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[var(--ink)]">Work Email Address *</span>
                    <input 
                      type="email" 
                      required
                      placeholder="dineo@foodcorp.co.za" 
                      className="h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-black/10"
                    />
                  </label>
                </div>
              </div>

              {/* Section 3: B-BBEE Upload */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">
                  3. Documentation Upload
                </h4>

                <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 flex flex-col items-center justify-center text-center bg-[var(--icon-bg)] hover:border-[var(--ink)] transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-[var(--muted2)] mb-2" />
                  <span className="text-xs font-bold text-[var(--ink)] mb-0.5">Upload B-BBEE Certificate / Affidavit</span>
                  <span className="text-[11px] font-medium text-[var(--muted)]">PDF, PNG, JPG up to 10MB</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 px-6 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="submit"
                  className="h-11 px-8 rounded-full bg-[#16160F] hover:bg-black text-[#FADF01] text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <span>Submit Partner Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
