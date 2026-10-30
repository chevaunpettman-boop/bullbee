import React, { useState } from 'react';
import {
  Mail,
  Smartphone,
  Video,
  Download,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Camera,
  Repeat
} from 'lucide-react';
import { RETENTION_JOURNEY } from '../data/proposalData';
import { ExitIntentModal } from './ExitIntentModal';

export const RetentionSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const activeStage = RETENTION_JOURNEY[activeStageIndex];

  return (
    <section id="retention-lifecycle" className="relative border-b border-stone-800 bg-[#171717] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <span>Section 04</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Social Commerce & Lifecycle Marketing</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F0E2] uppercase">
              Lifecycle Economics & Cohort Retention Model
            </h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl font-body leading-relaxed">
              Transitioning transactional search buyers into high-LTV recurring cohorts through authentic occupational advocacy, value-first lead capture, and a 45-day replenishment onboarding sequence.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D3AF68] bg-[#D3AF68]/10 px-5 py-3 text-xs font-bold text-[#D3AF68] hover:bg-bullbee-gradient hover:text-[#171717] transition-all cursor-pointer font-display tracking-wider shadow-md"
            >
              <Download className="h-4 w-4" />
              <span>Test Exit-Intent Lead Capture Modal</span>
            </button>
          </div>
        </div>

        {/* 1. TikTok Shop & Micro-Influencer UGC Architecture with generous padding */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 mb-16 shadow-2xl">
          <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                TikTok Shop & Micro-Influencer UGC Matrix
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Showcasing the 3-ingredient formula under real job site punishment with zero spa fluff
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Persona 1: Heavy Diesel Mechanic */}
            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#D3AF68] tracking-widest font-display">Creator Archetype 1</span>
                <span className="text-xs text-stone-400 font-mono-numbers">15k-80k Following</span>
              </div>
              <h4 className="font-display text-xl font-bold text-[#F8F0E2] uppercase">
                The Master Diesel Mechanic
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                <strong>Hook:</strong> "Stop using hand lotion that turns your steering wheel into an oil slick. Watch this 90-second wrench test."
              </p>
              <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 space-y-1.5">
                <p>· Demonstrates degreased hands, deep crack relief</p>
                <p>· Torques a bolt immediately with zero hand slip</p>
                <p className="text-emerald-400 font-semibold pt-1">Projected CVR: 4.8% on TikTok Shop</p>
              </div>
            </div>

            {/* Persona 2: Texas Rancher & Lineman */}
            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#D3AF68] tracking-widest font-display">Creator Archetype 2</span>
                <span className="text-xs text-stone-400 font-mono-numbers">30k-120k Following</span>
              </div>
              <h4 className="font-display text-xl font-bold text-[#F8F0E2] uppercase">
                The High-Wire Lineman / Rancher
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                <strong>Hook:</strong> "30-degree biting wind splits my knuckles until they bleed. Bullbee is the only thing that actually fixed it."
              </p>
              <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 space-y-1.5">
                <p>· Compares standard petroleum jelly (freezes & flakes) to tallow</p>
                <p>· Shows the 100% money-back guarantee seal</p>
                <p className="text-emerald-400 font-semibold pt-1">High Share Velocity on Instagram Reels</p>
              </div>
            </div>

            {/* Persona 3: Drew Haas Survivalist Core */}
            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#D3AF68] tracking-widest font-display">Founder Brand Anchor</span>
                <span className="text-xs text-[#D3AF68] font-bold">Netflix Outlast S2</span>
              </div>
              <h4 className="font-display text-xl font-bold text-[#F8F0E2] uppercase">
                Drew Haas: Outlast Survival Proof
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                <strong>Hook:</strong> "When you survive 30 days in the freezing wilderness, you learn real animal fats save skin. Synthetic chemicals don't."
              </p>
              <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 space-y-1.5">
                <p>· Authentic Texas family ranch kitchen footage</p>
                <p>· 100% grass-fed cattle tallow rendering process</p>
                <p className="text-emerald-400 font-semibold pt-1">Core Trust & Retention Catalyst</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive 45-Day Retention Journey Timeline */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <Repeat className="h-6 w-6 text-[#D3AF68]" />
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  Automated 45-Day Retention & Subscription Sequence
                </h3>
              </div>
              <p className="text-sm text-stone-400 mt-2">
                Click any day along the timeline to inspect the automated email/SMS message and conversion triggers.
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-xs bg-[#131313] px-4 py-2.5 rounded-xl border border-stone-800 text-stone-300">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Target M12 Repeat Rate: <strong className="text-[#D3AF68] font-mono-numbers text-sm">38.2%</strong></span>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {RETENTION_JOURNEY.map((stage, index) => (
              <button
                key={stage.day}
                onClick={() => setActiveStageIndex(index)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeStageIndex === index
                    ? 'bg-[#D3AF68]/15 border-[#D3AF68] text-[#F8F0E2] shadow-lg'
                    : 'bg-[#131313] border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-xl font-bold font-mono-numbers text-[#D3AF68]">
                    Day {stage.day}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#242424] text-stone-300 font-display">
                    {stage.channel}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#F8F0E2] line-clamp-1">{stage.headline}</p>
                <span className="text-[11px] text-stone-400 block mt-1.5 font-mono-numbers">Open: {stage.openRateEst}</span>
              </button>
            ))}
          </div>

          {/* Active Email/SMS Preview Box */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Message Preview */}
            <div className="lg:col-span-7 rounded-2xl border border-stone-700 bg-[#131313] p-8 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs">
                <div className="flex items-center gap-2.5 text-stone-300">
                  {activeStage.channel === 'Email' ? (
                    <Mail className="h-5 w-5 text-[#D3AF68]" />
                  ) : (
                    <Smartphone className="h-5 w-5 text-emerald-400" />
                  )}
                  <span className="font-bold text-sm text-[#F8F0E2]">
                    Automated Trigger: Day {activeStage.day} · {activeStage.channel}
                  </span>
                </div>
                <span className="text-stone-400 font-mono-numbers text-xs">Est. CVR: {activeStage.conversionEst}</span>
              </div>

              {/* Subject line */}
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block font-display">
                  Subject Line:
                </span>
                <p className="text-base font-bold text-[#F8F0E2]">"{activeStage.subject}"</p>
              </div>

              {/* Message Body */}
              <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-stone-800 space-y-4 text-sm text-stone-200 font-body leading-relaxed">
                <h5 className="font-display text-lg font-bold text-[#D3AF68] uppercase">
                  {activeStage.headline}
                </h5>
                <p className="text-stone-300">
                  {activeStage.details}
                </p>
                <div className="p-4 rounded-xl bg-[#131313] border border-stone-800 text-xs text-[#D3AF68] font-medium">
                  <strong>Strategic Offer:</strong> {activeStage.offer}
                </div>
              </div>
            </div>

            {/* Right: Retention Impact & Drew Haas Quote */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-stone-800 bg-[#131313] p-7 space-y-4">
                <h5 className="font-display text-xl font-bold text-[#F8F0E2] uppercase">
                  Cohort Compounding Math
                </h5>
                <p className="text-xs text-stone-400 leading-relaxed font-body">
                  In D2C skincare, acquiring a customer on cold search at $21.8k/mo only breaks even on Month 1 without retention. By triggering the <strong>Day 14 Knuckle Photo Review (20% off)</strong> and the <strong>Day 45 Subscription Lock (15% off)</strong>, Customer Lifetime Value (LTV) increases from $37.50 to $148.20 within 12 months.
                </p>

                <div className="pt-3 border-t border-stone-800 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Day 14 Review Upload Rate:</span>
                    <span className="font-mono-numbers font-bold text-[#D3AF68] text-sm">18.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Day 45 Subscription Conversion:</span>
                    <span className="font-mono-numbers font-bold text-emerald-400 text-sm">22.6%</span>
                  </div>
                </div>
              </div>

              {/* Founder quote box */}
              <div className="rounded-2xl border border-[#D3AF68]/40 bg-[#1c1a14] p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D3AF68] font-display">
                  <Award className="h-4 w-4" />
                  <span>The Drew Haas Promise</span>
                </div>
                <p className="text-xs text-stone-300 italic leading-relaxed font-body">
                  "If a man spends his hard-earned money on Bullbee and his hands aren't healed, he doesn't pay a dime. We keep it simple: 100% Texas grass-fed beef tallow, Texas beeswax, and cold-pressed jojoba."
                </p>
                <span className="text-xs text-[#CC9C52] block pt-1 font-semibold font-display">
                  — Drew Haas, Founder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Intent Modal Component */}
      <ExitIntentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};
