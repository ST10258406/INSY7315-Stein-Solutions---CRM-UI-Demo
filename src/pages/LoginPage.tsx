import React, { useState } from 'react';
import { Eye, EyeOff, Check, Link2, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import saHarvestLogo from '@/assets/sa-harvest-logo.png';

interface LoginPageProps {
  onSignIn: () => void;
}

const TALLY_HEIGHTS = [14, 22, 10, 26, 18, 30, 12, 24, 20, 16, 28, 11, 23, 17, 25, 13, 21, 15, 27, 19, 12, 24];

export const LoginPage: React.FC<LoginPageProps> = ({ onSignIn }) => {
  const [view, setView] = useState<'signin' | 'forgot'>('signin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const [forgotEmail, setForgotEmail] = useState('');
  const [sendState, setSendState] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === 'loading') return;
    setSendState('loading');
    setTimeout(() => setSendState('sent'), 2000);
  };

  const handleBackToSignIn = () => {
    setView('signin');
    setSendState('idle');
    setForgotEmail('');
  };

  return (
    <div className="h-screen w-screen flex bg-[#F2F2EF] text-[#16160F] overflow-hidden">
      {/* Left Brand Panel */}
      <div className="hidden md:flex w-[42%] max-w-[520px] min-w-[360px] flex-col bg-[#16160F] text-white px-11 py-10 shrink-0 relative overflow-hidden">
        <div className="border-t-4 border-[#FADF01] absolute top-0 left-0 right-0" />

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FADF01] flex items-center justify-center shrink-0 overflow-hidden">
            <img src={saHarvestLogo} alt="S.A. Harvest logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-snug">
            <span className="text-[15.5px] font-extrabold tracking-tight text-white">SA Harvest</span>
            <span className="text-[10.5px] font-semibold text-white/50">Donor CRM</span>
          </div>
        </div>

        {/* Stat block */}
        <div className="mt-auto mb-auto pt-24">
          <span className="text-[11px] font-bold tracking-[1.6px] text-[#FADF01]">
            RESCUED THIS MONTH
          </span>

          <div className="flex items-end gap-[3px] h-8 mt-4 mb-6">
            {TALLY_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-[#FADF01] to-white/70"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-extrabold tracking-tight text-white max-w-[340px]">
            124 tonnes of surplus food moved to communities that needed it.
          </h1>
          <p className="m-0 text-[13.5px] leading-relaxed text-white/50 max-w-[300px]">
            Each mark is 6 tonnes. Every donor relationship you keep warm in here is part of that number.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 text-[11.5px] text-white/40 font-medium">
          <span>© 2026 SA Harvest NPC</span>
          <a href="#" className="text-white/40 hover:text-white/70 no-underline">Privacy</a>
          <a href="#" className="text-white/40 hover:text-white/70 no-underline">Support</a>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto bg-[#F2F2EF]">
        <div className="w-full max-w-[380px] py-10">
          {view === 'signin' ? (
            <>
              <h2 className="m-0 mb-1.5 text-[26px] font-extrabold tracking-tight text-[#16160F]">
                Sign in
              </h2>
              <p className="m-0 mb-6 text-[13.5px] font-medium text-[#82827A]">
                Use your SA Harvest staff account.
              </p>

              <form
                onSubmit={handleSignIn}
                className="bg-white border border-[#E4E4DE] rounded-2xl p-5 shadow-[0_1px_3px_rgba(20,20,15,.05)]"
              >
                <label className="block mb-1.5 text-[12.5px] font-bold text-[#16160F]">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shaun@foodspace.org"
                  required
                  className="w-full h-11 px-3.5 mb-4 rounded-xl border border-[#E4E4DE] bg-[#FAFAF8] text-[13.5px] font-medium text-[#16160F] placeholder-[#B5B5AC] outline-none focus:border-[#16160F] transition-colors"
                />

                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12.5px] font-bold text-[#16160F]">Password</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[12.5px] font-bold text-[#16160F] underline underline-offset-2 bg-transparent border-none cursor-pointer p-0"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ShaunIsAwesome$1!"
                    required
                    className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-[#E4E4DE] bg-[#FAFAF8] text-[13.5px] font-medium text-[#16160F] placeholder-[#B5B5AC] outline-none focus:border-[#16160F] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] font-bold text-[#82827A] hover:text-[#16160F] bg-transparent border-none cursor-pointer p-0"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <button
                    type="button"
                    onClick={() => setKeepSignedIn((v) => !v)}
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
                  >
                    <span
                      className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-colors ${keepSignedIn ? 'border-[#FADF01] bg-[#FADF01]' : 'border-[#E4E4DE] bg-[#FAFAF8]'
                        }`}
                    >
                      {keepSignedIn && <Check className="w-3 h-3 text-[#16160F] stroke-[3]" />}
                    </span>
                    <span className="text-[12.5px] font-semibold text-[#16160F]">Keep me signed in</span>
                  </button>
                  <span className="text-[12px] font-medium text-[#9A9A90]">7 days</span>
                </div>

                <Button type="submit" variant="default" className="w-full">
                  Sign in
                </Button>
              </form>

              <div className="flex items-start gap-2.5 mt-4 p-3.5 rounded-xl bg-[#EEECFB] border border-[#DCD8F5]">
                <Link2 className="w-4 h-4 text-[#5B4FC4] shrink-0 mt-0.5" />
                <p className="m-0 text-[12px] leading-relaxed font-medium text-[#4A4470]">
                  Accounts are provisioned by an admin — your role (Marketing, Procurement or Admin) decides what you can see and edit. Need access?{' '}
                  <a href="#" className="font-bold underline underline-offset-2 text-[#4A4470]">
                    Request an account.
                  </a>
                </p>
              </div>

              <p className="mt-5 text-center text-[11.5px] font-medium text-[#9A9A90]">
                Donor data is confidential. Sign-ins are logged.
              </p>
            </>
          ) : (
            <>
              <h2 className="m-0 mb-1.5 text-[26px] font-extrabold tracking-tight text-[#16160F]">
                Forgot your password?
              </h2>
              <p className="m-0 mb-6 text-[13.5px] font-medium text-[#82827A]">
                Enter your work email and we'll send you a reset link.
              </p>

              <div className="bg-white border border-[#E4E4DE] rounded-2xl p-5 shadow-[0_1px_3px_rgba(20,20,15,.05)] min-h-[180px] flex flex-col justify-center">
                {sendState === 'idle' && (
                  <form onSubmit={handleSendResetLink}>
                    <label className="block mb-1.5 text-[12.5px] font-bold text-[#16160F]">
                      Work email
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@saharvest.org"
                      required
                      className="w-full h-11 px-3.5 mb-4 rounded-xl border border-[#E4E4DE] bg-[#FAFAF8] text-[13.5px] font-medium text-[#16160F] placeholder-[#9A9A90] outline-none focus:border-[#16160F] transition-colors"
                    />
                    <Button type="submit" variant="default" className="w-full">
                      Send reset link
                    </Button>
                  </form>
                )}

                {sendState === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <Loader2 className="w-7 h-7 text-[#16160F] animate-spin" />
                    <span className="text-[12.5px] font-semibold text-[#82827A]">Sending reset link…</span>
                  </div>
                )}

                {sendState === 'sent' && (
                  <div className="flex flex-col items-center text-center py-2 gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#E5F3EA] flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#1E6E3C]" />
                    </div>
                    <p className="m-0 text-[13.5px] font-bold text-[#16160F] max-w-[260px]">
                      Password reset email link successfully sent
                    </p>
                    <Button type="button" variant="default" onClick={handleBackToSignIn} className="w-full mt-1">
                      Return back to sign in
                    </Button>
                  </div>
                )}
              </div>

              {sendState !== 'sent' && (
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="block mx-auto mt-5 text-[12.5px] font-bold text-[#16160F] underline underline-offset-2 bg-transparent border-none cursor-pointer p-0"
                >
                  Back to sign in
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
