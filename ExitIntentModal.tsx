import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Sparkles, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid working email address.');
      return;
    }
    setError('');
    const code = `TEXAS15-${Math.floor(1000 + Math.random() * 9000)}`;
    setDiscountCode(code);
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#D3AF68', '#D9AD5B', '#D09931', '#F8F0E2'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-stone-800 bg-[#171717] p-8 sm:p-10 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-[#F8F0E2] hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <FileText className="h-4 w-4" />
              <span>Free Tradesman Field Guide + 15% Off</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F8F0E2] uppercase leading-tight">
              The Working Man’s 3-Step Routine to Fix Severely Cracked Hands
            </h3>

            <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
              Stop wasting money on scented spa water lotions that burn your cuts and leave steering wheels slick. Download Drew Haas’s battle-tested 3-step field guide and get 15% off your first jar of Bullbee.
            </p>

            {/* Guide Bullet Points with more breathing room */}
            <div className="mt-6 space-y-3 p-5 rounded-2xl bg-[#111111] border border-stone-800 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-[#D3AF68] shrink-0" />
                <span><strong className="text-[#F8F0E2]">Step 1:</strong> The 5-second body-heat palm liquefaction technique</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-[#D3AF68] shrink-0" />
                <span><strong className="text-[#F8F0E2]">Step 2:</strong> Sub-90s absorption protocol (zero tool slip)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-[#D3AF68] shrink-0" />
                <span><strong className="text-[#F8F0E2]">Step 3:</strong> Night-time tallow lipid barrier restoration</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email for the guide & discount..."
                  className="w-full rounded-xl border border-stone-700 bg-[#111111] px-5 py-3.5 text-xs sm:text-sm text-[#F8F0E2] placeholder-stone-500 focus:border-[#D3AF68] focus:outline-none"
                />
                {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-bullbee-gradient py-4 px-5 font-bold text-xs uppercase tracking-wider text-[#171717] hover:brightness-110 transition-colors shadow-lg font-display cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Claim Free Guide & 15% Discount Code</span>
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>No spa nonsense. 100% money-back guarantee on all orders.</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>

            <h3 className="font-display text-3xl font-bold text-[#F8F0E2] uppercase">
              Field Guide Sent & 15% Code Unlocked!
            </h3>

            <p className="text-sm text-stone-300 max-w-sm mx-auto leading-relaxed">
              We've dispatched "The Working Man's 3-Step Routine" PDF directly to <strong>{email}</strong>. Use your exclusive discount code at checkout:
            </p>

            <div className="p-5 rounded-2xl border border-[#D3AF68]/60 bg-[#111111] max-w-xs mx-auto shadow-inner">
              <span className="text-xs text-stone-400 uppercase tracking-widest block font-display">Your 15% Off Code</span>
              <span className="font-display text-3xl font-bold text-[#D3AF68] tracking-wider font-mono-numbers mt-1 block">
                {discountCode}
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-[#262626] hover:bg-[#333333] px-8 py-3 text-xs font-bold text-[#F8F0E2] transition-colors cursor-pointer"
            >
              Back to Growth Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
