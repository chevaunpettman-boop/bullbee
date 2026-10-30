import React from 'react';
import { ArrowRight, Flame, Shield, Award, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../data/proposalData';

interface HeroExecutiveProps {
  onOpenDeck: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroExecutive: React.FC<HeroExecutiveProps> = ({
  onOpenDeck,
  onNavigate,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-stone-800 bg-[#171717] pt-14 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting matching Bullbee warm gold */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#D3AF68]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-[#CC9C52]/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Kicker - Unboxed clean metadata */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-6">
          <span>{BRAND_CONFIG.headquarters}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Grass-Fed Beef Tallow</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Founder Drew Haas (Outlast S2 Winner)</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-stone-400">FY2026 Acquisition Plan</span>
        </div>

        {/* 2-Column Split: Editorial Value Prop & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#F8F0E2] uppercase leading-[1.05] text-balance">
                High-Intent Acquisition & CRO Growth Blueprint
              </h1>
              <p className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed font-body max-w-2xl">
                Deploying <span className="font-semibold text-[#D3AF68] font-mono-numbers">$21,833/month</span> in strategic ad capital to secure <span className="font-semibold text-[#D3AF68] font-mono-numbers">31,414</span> qualified visitors by compressing blended CPC from $1.16 to $0.695, elevating baseline AOV via the $95 Weather Defense System, and establishing generative search authority.
              </p>
            </div>

            {/* Core Brand Pillars Grid with ample breathing room */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-stone-800/80 pt-8">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2 text-[#D3AF68] text-xs font-bold uppercase tracking-wider font-display">
                  <Shield className="h-4 w-4" />
                  <span>No Spa Nonsense</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  100% Texas grass-fed beef tallow, Texas beeswax, and cold-pressed jojoba. 3 pure ingredients.
                </p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2 text-[#D3AF68] text-xs font-bold uppercase tracking-wider font-display">
                  <Flame className="h-4 w-4" />
                  <span>Sub-90s Absorption</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Molecular sebum match soaks in under 90 seconds. Zero slick residue on tools or steering wheels.
                </p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2 text-[#D3AF68] text-xs font-bold uppercase tracking-wider font-display">
                  <Award className="h-4 w-4" />
                  <span>Battle Tested</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Built by survivalist Drew Haas. Engineered for outdoor tradesmen, mechanics, and ranchers.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('paid-strategy')}
                className="inline-flex items-center gap-2 rounded-lg bg-bullbee-gradient px-7 py-3.5 text-sm font-bold text-[#171717] hover:brightness-110 transition-all shadow-lg shadow-black/40 active:scale-98 cursor-pointer"
              >
                <span>Explore Capital Allocation Model</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenDeck}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-[#212121] px-6 py-3.5 text-sm font-semibold text-[#F8F0E2] hover:bg-stone-800 hover:border-[#D3AF68]/60 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#D3AF68]" />
                <span>Open Stakeholder Slides</span>
              </button>
            </div>
          </div>

          {/* Visual Carrier: Founder & Product Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 self-stretch">
            <div className="relative col-span-2 overflow-hidden rounded-2xl border border-stone-800 bg-[#1f1f1f] group shadow-xl">
              <img
                src="/src/assets/images/bullbee_hero_products_1792588490929.jpg"
                alt="Bullbee Handcrafted Texas Beef Tallow Skincare"
                className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D3AF68] font-display">
                  Texas Ranch Handcrafted
                </span>
                <p className="text-base font-bold text-[#F8F0E2]">
                  Whipped Tallow Cream, Mineral Sunblock & Lip Balm
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-[#1f1f1f] group shadow-lg">
              <img
                src="/src/assets/images/drew_haas_founder_1792588491370.jpg"
                alt="Founder Drew Haas Texas Ranch Craftsman"
                className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-xs font-bold text-[#F8F0E2]">Drew Haas</p>
                <p className="text-[11px] text-[#CC9C52] truncate">Outlast S2 Winner</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-[#1f1f1f] group shadow-lg">
              <img
                src="/src/assets/images/tradesman_hands_healed_1792588492010.jpg"
                alt="Tradesman Hands Healed Without Greasy Residue"
                className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-xs font-bold text-[#F8F0E2]">100% Healed Proof</p>
                <p className="text-[11px] text-[#D3AF68] truncate">Working Men Tested</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Executive KPI Strip with expanded spacing */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-stone-800 bg-[#1f1f1f] p-6 sm:p-7 transition-all hover:border-[#D3AF68]/50 shadow-md">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400 font-display">
              Monthly Paid Spend
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                $21,833
              </span>
              <span className="text-xs text-[#D3AF68] font-semibold">Allocated</span>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              80% Google Search · 20% Meta/TikTok
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1f1f1f] p-6 sm:p-7 transition-all hover:border-[#D3AF68]/50 shadow-md">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400 font-display">
              Target Monthly Clicks
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                31,414
              </span>
              <span className="text-xs text-emerald-400 font-semibold">Required</span>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              High-intent searches + warm retargets
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1f1f1f] p-6 sm:p-7 transition-all hover:border-[#D3AF68]/50 shadow-md">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400 font-display">
              Target Blended CPC
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#D3AF68] font-mono-numbers">
                $0.695
              </span>
              <span className="text-xs text-emerald-400 font-semibold line-through text-stone-500">
                $1.16 old
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              -$0.465/click cost compression
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1f1f1f] p-6 sm:p-7 transition-all hover:border-[#D3AF68]/50 shadow-md">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400 font-display">
              Target Initial AOV
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                $37.50
              </span>
              <span className="text-xs text-[#D3AF68] font-semibold">Up to $95</span>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Via Weather Defense System bundle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
