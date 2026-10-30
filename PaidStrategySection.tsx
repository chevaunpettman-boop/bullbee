import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Search,
  Video,
  ExternalLink,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { AD_KEYWORDS } from '../data/proposalData';

export const PaidStrategySection: React.FC = () => {
  // Simulator State
  const [budget, setBudget] = useState<number>(21833);
  const [searchRatio, setSearchRatio] = useState<number>(80); // 80% Google, 20% Retargeting
  const [searchCpc, setSearchCpc] = useState<number>(0.70); // target search CPC
  const [retargetingCpc] = useState<number>(0.67); // retargeting click cost estimate

  // Keyword filter
  const [selectedIntent, setSelectedIntent] = useState<string>('All');

  // Ad preview toggle
  const [activeAdKeyword, setActiveAdKeyword] = useState<string>('tradesman hand repair balm');

  // Calculations
  const searchBudget = Math.round(budget * (searchRatio / 100));
  const retargetingBudget = budget - searchBudget;

  const estimatedSearchClicks = Math.round(searchBudget / searchCpc);
  const estimatedRetargetingClicks = Math.round(retargetingBudget / retargetingCpc);
  const totalClicks = estimatedSearchClicks + estimatedRetargetingClicks;
  const blendedCpc = Number((budget / totalClicks).toFixed(3));

  // Total Clicks = Ad Spend / Blended CPC ($21,833 / $0.695 = ~31,414 clicks)
  const targetRequiredClicks = 31414;
  const clickGoalProgress = Math.min(100, Math.round((totalClicks / targetRequiredClicks) * 100));
  const oldCostForSameClicks = totalClicks * 1.16;
  const monthlySavingsVsBaseline = Math.round(oldCostForSameClicks - budget);
  const annualSavings = monthlySavingsVsBaseline * 12;

  const resetDefaults = () => {
    setBudget(21833);
    setSearchRatio(80);
    setSearchCpc(0.70);
  };

  const filteredKeywords = selectedIntent === 'All'
    ? AD_KEYWORDS
    : AD_KEYWORDS.filter((k) => k.intent === selectedIntent);

  return (
    <section id="paid-strategy" className="relative border-b border-stone-800 bg-[#141414] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <span>Section 01</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Capital Allocation & Paid Acquisition Strategy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F0E2] uppercase">
              $21,833/Month Capital Allocation Model
            </h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl font-body leading-relaxed">
              Allocating ad capital toward high-intent search acquisition and behavioral retargeting to compress blended CPC from $1.16 down to $0.695, securing 31,414 qualified visitors within the target budget.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-stone-800 bg-[#1a1a1a] px-6 py-3.5 shadow-md">
              <span className="text-xs text-stone-400 block font-display tracking-wider">Annual Acquisition Savings</span>
              <span className="font-display text-2xl font-bold text-emerald-400 font-mono-numbers">
                +${annualSavings.toLocaleString()}/yr
              </span>
            </div>
          </div>
        </div>

        {/* 1. Interactive Budget & CPC Simulator Card with generous inner padding */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 mb-16 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <Sliders className="h-6 w-6 text-[#D3AF68]" />
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase tracking-wide">
                  Capital Allocation Model & CPC Sensitivity Simulator
                </h3>
              </div>
              <p className="text-sm text-stone-400 mt-2">
                Simulate how shifting search bidding thresholds and retargeting weight alters click volume and capital efficiency.
              </p>
            </div>
            <button
              onClick={resetDefaults}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-[#D3AF68] transition-colors py-2 px-4 rounded-lg border border-stone-700 hover:border-[#D3AF68]/50 w-fit cursor-pointer bg-[#242424]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Target Plan ($21,833)</span>
            </button>
          </div>

          {/* Sliders Grid with increased spacing */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly Budget Slider */}
            <div className="space-y-3 bg-[#131313] p-5 rounded-2xl border border-stone-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-medium">Monthly Ad Spend</span>
                <span className="text-[#D3AF68] font-mono-numbers font-bold text-sm">
                  ${budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={12000}
                max={40000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#D3AF68] bg-stone-800 rounded-lg h-2.5 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono-numbers">
                <span>$12,000</span>
                <span>Target: $21,833</span>
                <span>$40,000</span>
              </div>
            </div>

            {/* Google Search vs Retargeting Split Slider */}
            <div className="space-y-3 bg-[#131313] p-5 rounded-2xl border border-stone-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-medium">Channel Ratio</span>
                <span className="text-[#D3AF68] font-mono-numbers font-bold text-sm">
                  {searchRatio}% Search / {100 - searchRatio}% Retarget
                </span>
              </div>
              <input
                type="range"
                min={60}
                max={90}
                step={5}
                value={searchRatio}
                onChange={(e) => setSearchRatio(Number(e.target.value))}
                className="w-full accent-[#D3AF68] bg-stone-800 rounded-lg h-2.5 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono-numbers">
                <span>60/40 Split</span>
                <span>Target: 80/20</span>
                <span>90/10 Split</span>
              </div>
            </div>

            {/* Target Search CPC Slider */}
            <div className="space-y-3 bg-[#131313] p-5 rounded-2xl border border-stone-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-medium">Target Search CPC</span>
                <span className="text-[#D3AF68] font-mono-numbers font-bold text-sm">
                  ${searchCpc.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0.50}
                max={1.16}
                step={0.05}
                value={searchCpc}
                onChange={(e) => setSearchCpc(Number(e.target.value))}
                className="w-full accent-[#D3AF68] bg-stone-800 rounded-lg h-2.5 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono-numbers">
                <span>$0.50 (Aggressive)</span>
                <span>$0.70 Target</span>
                <span>$1.16 Baseline</span>
              </div>
            </div>
          </div>

          {/* Simulator Reactive KPI Output Cards */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-display uppercase tracking-wider">Total Monthly Clicks</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                {totalClicks.toLocaleString()}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <div className="h-2 flex-1 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bullbee-gradient rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, clickGoalProgress)}%` }}
                  />
                </div>
                <span className="text-stone-400 font-mono-numbers">{clickGoalProgress}% of 31.4k target</span>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-display uppercase tracking-wider">Blended CPC</span>
                <DollarSign className="h-4 w-4 text-[#D3AF68]" />
              </div>
              <p className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#D3AF68] font-mono-numbers">
                ${blendedCpc.toFixed(3)}
              </p>
              <p className="mt-2 text-xs text-emerald-400 font-medium">
                -{(100 - (blendedCpc / 1.16) * 100).toFixed(1)}% vs $1.16 baseline
              </p>
            </div>

            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-display uppercase tracking-wider">Google Search (80%)</span>
                <Search className="h-4 w-4 text-sky-400" />
              </div>
              <p className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                ${searchBudget.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-stone-400">
                {estimatedSearchClicks.toLocaleString()} cold intent clicks
              </p>
            </div>

            <div className="rounded-2xl border border-stone-800 bg-[#131313] p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-display uppercase tracking-wider">Meta & TikTok (20%)</span>
                <Video className="h-4 w-4 text-rose-400" />
              </div>
              <p className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#F8F0E2] font-mono-numbers">
                ${retargetingBudget.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-stone-400">
                {estimatedRetargetingClicks.toLocaleString()} warm cart recaptures
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Channel 1 (Search Strategy) & Channel 2 (Retargeting) with wide gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left Column: Google Search Ads Execution */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                      Google Search Ads: $17,466/mo (80%)
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Bidding weighted to lower-cost, high-intent problem solvers
                    </p>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-1.5 p-1 bg-[#131313] rounded-xl text-xs border border-stone-800">
                  {['All', 'Direct Product', 'Symptom / Problem'].map((intent) => (
                    <button
                      key={intent}
                      onClick={() => setSelectedIntent(intent)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        selectedIntent === intent
                          ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {intent}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword Auction Table with generous row padding */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 font-display text-[11px] uppercase tracking-wider">
                      <th className="py-3.5 pr-4">Target Keyword Query</th>
                      <th className="py-3.5 px-4">CPC</th>
                      <th className="py-3.5 px-4">Intent Tier</th>
                      <th className="py-3.5 px-4">Est. Clicks</th>
                      <th className="py-3.5 pl-4 text-right">Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80 font-body">
                    {filteredKeywords.map((kw) => (
                      <tr
                        key={kw.keyword}
                        onClick={() => setActiveAdKeyword(kw.keyword)}
                        className={`hover:bg-[#222222] transition-colors cursor-pointer ${
                          activeAdKeyword === kw.keyword ? 'bg-[#D3AF68]/10' : ''
                        }`}
                      >
                        <td className="py-4 pr-4 font-semibold text-[#F8F0E2]">
                          <span className="font-mono-numbers">{kw.keyword}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono-numbers font-bold text-[#D3AF68]">
                            ${kw.cpc.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-stone-400">{kw.intent}</span>
                        </td>
                        <td className="py-4 px-4 text-stone-300 font-mono-numbers">
                          {kw.projectedClicks.toLocaleString('en-US')}
                        </td>
                        <td className="py-4 pl-4 text-right text-stone-400">
                          <span className="text-[#CC9C52] underline text-xs font-medium">
                            Dedicated Landing Page
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#131313] border border-stone-800 text-xs text-stone-300 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-[#D3AF68] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#F8F0E2]">Critical Landing Page Rule:</strong> Search traffic is never sent to the generic homepage. "Tradesman hand repair" traffic routes to the dedicated Hand Repair PDP with Made-in-Texas proof and 100% money-back guarantee.
                </p>
              </div>
            </div>

            {/* Interactive Live Google Search Ad Mockup */}
            <div className="rounded-3xl border border-stone-800 bg-[#131313] p-7 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2 font-display">
                  <ExternalLink className="h-4 w-4 text-sky-400" />
                  Live Google Search Ad Mockup (High Intent)
                </span>
                <span className="text-xs text-[#D3AF68] font-mono-numbers">
                  Active Query: "{activeAdKeyword}"
                </span>
              </div>

              <div className="space-y-3 text-left font-sans">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#F8F0E2]">Sponsored</span>
                  <span className="text-stone-500">·</span>
                  <span className="text-stone-400">https://trybullbee.com/tradesman-hand-repair</span>
                </div>
                <h4 className="text-lg font-medium text-sky-400 hover:underline cursor-pointer">
                  Bullbee™ Texas Beef Tallow Hand Balm | Real Skin Repair, No Spa Nonsense
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                  Engineered with 100% Texas grass-fed beef tallow, Texas beeswax & cold-pressed jojoba. Absorbs in 90 seconds with zero tool slip. Heals severely cracked working hands. 100% Money-Back Guarantee.
                </p>
                {/* Sitelinks */}
                <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#1c1c1c] border border-stone-800 hover:border-[#D3AF68]/60 transition-colors cursor-pointer">
                    <span className="text-sky-400 font-medium block">Weather Defense System ($95)</span>
                    <span className="text-xs text-stone-400 mt-0.5 block">Cream, Sunblock & Lip Balm bundle</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1c1c1c] border border-stone-800 hover:border-[#D3AF68]/60 transition-colors cursor-pointer">
                    <span className="text-sky-400 font-medium block">100% Money-Back Guarantee</span>
                    <span className="text-xs text-stone-400 mt-0.5 block">Empty jar return policy, no questions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Meta & TikTok Retargeting Architecture */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                    Behavioral Retargeting: $4,367/mo (20%)
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Recapturing cart abandoners and high-dwell search visitors
                  </p>
                </div>
              </div>

              {/* Retargeting Funnel Steps */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#131313] border border-stone-800">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D3AF68]/20 text-[#D3AF68] text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#F8F0E2] uppercase tracking-wider font-display">Pixel Audience Ingestion</h5>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Segment bounced cold search visitors, product page dwell &gt;30s, and abandoned carts over the last 14 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#131313] border border-stone-800">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D3AF68]/20 text-[#D3AF68] text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#F8F0E2] uppercase tracking-wider font-display">Proof-First Video Creative</h5>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Short-form 9:16 UGC video: Close-up of bleeding mechanic knuckles healed completely in 5 days with Bullbee.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#131313] border border-stone-800">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D3AF68]/20 text-[#D3AF68] text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#F8F0E2] uppercase tracking-wider font-display">100% Risk Reversal</h5>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Lead with "Use the whole jar. If your hands aren't fixed, we refund 100% of your money. Drew Haas guarantees it."
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulated 9:16 Retargeting Ad Visual Card with more room */}
              <div className="mt-8 relative overflow-hidden rounded-2xl border border-stone-700 bg-black shadow-2xl">
                <img
                  src="/src/assets/images/tradesman_hands_healed_1792588492010.jpg"
                  alt="Healed Tradesman Hands Retargeting Ad Creative"
                  className="h-72 w-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Floating Creative Badges */}
                <div className="absolute top-4 left-4 bg-[#171717]/95 border border-[#D3AF68]/80 rounded-lg px-3 py-1.5 text-xs font-bold text-[#D3AF68] font-display tracking-wider">
                  100% MONEY-BACK GUARANTEE
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[11px] uppercase tracking-widest text-[#D3AF68] font-semibold block font-display">
                    TikTok & Instagram Reel Retargeting
                  </span>
                  <p className="text-sm font-bold text-[#F8F0E2] mt-1">
                    "Chemical lotions stung my open cuts. 4 days with Bullbee tallow and my hands stopped splitting."
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-stone-300">Hank M. · Heavy Equipment Mechanic</span>
                    <button className="bg-bullbee-gradient text-[#171717] font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-md">
                      Claim Guarantee
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
