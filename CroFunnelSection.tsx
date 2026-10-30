import React, { useState } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  CreditCard,
  Plus,
  Sliders,
  Award
} from 'lucide-react';
import { BUNDLE_PRODUCTS } from '../data/proposalData';
import confetti from 'canvas-confetti';

export const CroFunnelSection: React.FC = () => {
  // AOV sensitivity slider based on Month 1 revenue target ($27,600)
  const [simulatedAov, setSimulatedAov] = useState<number>(37.50);
  const targetRevenue = 27600; // Accurate Month 1 target: (691 new + 45 repeat) * $37.50 = $27,600
  const targetCvr = 0.022; // 2.2% baseline
  // Clicks needed = targetRevenue / (AOV * CVR)
  const clicksNeeded = Math.round(targetRevenue / (simulatedAov * targetCvr));
  const baselineClicks = Math.round(targetRevenue / (28.00 * targetCvr)); // baseline $28 AOV = 44,805 clicks
  const clickReductionPercent = Math.max(0, Math.round(((baselineClicks - clicksNeeded) / baselineClicks) * 100));

  // Funnel comparison toggle: 'generic' vs 'tradesman'
  const [funnelView, setFunnelView] = useState<'tradesman' | 'generic'>('tradesman');

  // Bundle builder state
  const [includeLeatherAddon, setIncludeLeatherAddon] = useState<boolean>(false);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Apple Pay');

  const bundleBasePrice = 95.00;
  const currentBundleTotal = includeLeatherAddon ? bundleBasePrice + 18.00 : bundleBasePrice;
  const individualRetailValue = 48 + 36 + 14 + (includeLeatherAddon ? 22 : 0);
  const totalSavings = individualRetailValue - currentBundleTotal;

  const handleSimulatePurchase = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setCheckoutModalOpen(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D3AF68', '#D9AD5B', '#D09931', '#F8F0E2'],
    });
  };

  return (
    <section id="cro-funnel" className="relative border-b border-stone-800 bg-[#171717] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <span>Section 02</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Conversion Rate Optimization & Funnel Architecture</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F0E2] uppercase">
              AOV Elevation & Frictionless Funnels
            </h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl font-body leading-relaxed">
              Targeting an Average Order Value of $37.50 (anchored by the $95 Weather Defense Kit) to reduce total clicks needed by up to 60%, paired with message-matched landing pages.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1f1f1f] p-5 shadow-md">
            <span className="text-xs text-stone-400 block font-display tracking-wider">Default Target Anchor</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-3xl font-bold text-[#D3AF68] font-mono-numbers">
                $95.00
              </span>
              <span className="text-xs text-stone-300">Weather Defense Kit</span>
            </div>
          </div>
        </div>

        {/* 1. Interactive AOV Sensitivity Calculator with generous padding */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <Sliders className="h-6 w-6 text-[#D3AF68]" />
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  AOV vs. Paid Traffic Sensitivity Curve
                </h3>
              </div>
              <p className="text-sm text-stone-400 mt-2">
                Drag the AOV slider to observe how elevating cart value reduces paid click dependency to hit $250k/mo revenue.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs bg-[#131313] px-4 py-2 rounded-xl border border-stone-800 text-stone-300">
              <span>Month 1 Target: <strong className="text-[#F8F0E2]">$27,600/mo</strong></span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Conversion Rate: <strong className="text-[#D3AF68]">2.2%</strong></span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Slider & Math */}
            <div className="lg:col-span-6 space-y-5 bg-[#131313] p-6 rounded-2xl border border-stone-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300 font-medium">Average Order Value (AOV)</span>
                <span className="text-[#D3AF68] font-mono-numbers font-bold text-xl">
                  ${simulatedAov.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={25}
                max={95}
                step={2.5}
                value={simulatedAov}
                onChange={(e) => setSimulatedAov(Number(e.target.value))}
                className="w-full accent-[#D3AF68] bg-stone-800 rounded-lg h-2.5 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono-numbers">
                <span>$25 (Single Balm)</span>
                <span>$37.50 (Target Baseline)</span>
                <span>$55 (Duo)</span>
                <span>$95 (Full Kit)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#1c1c1c] border border-stone-800 text-xs text-stone-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Clicks Required:</span>
                  <span className="font-mono-numbers font-bold text-[#F8F0E2] text-sm">{clicksNeeded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Clicks Saved vs $28 Baseline:</span>
                  <span className="font-mono-numbers font-bold text-emerald-400 text-sm">
                    -{(baselineClicks - clicksNeeded).toLocaleString()} (-{clickReductionPercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>Baseline ($28 AOV - Single Product Ad)</span>
                  <span className="font-mono-numbers">{baselineClicks.toLocaleString()} clicks</span>
                </div>
                <div className="h-3.5 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-600 rounded-full w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#D3AF68] font-medium">
                  <span>Current Simulated Setting (${simulatedAov.toFixed(2)} AOV)</span>
                  <span className="font-mono-numbers font-bold">{clicksNeeded.toLocaleString()} clicks</span>
                </div>
                <div className="h-3.5 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bullbee-gradient rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(15, (clicksNeeded / baselineClicks) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-emerald-400 font-medium">
                  <span>Weather Defense System ($95 AOV Baseline Anchor)</span>
                  <span className="font-mono-numbers font-bold">13,206 clicks (-71%)</span>
                </div>
                <div className="h-3.5 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[29%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split: The $95 Kit Configurator & The Interactive Tradesman Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left Column: $95 Weather Defense System Configurator */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#D3AF68]/10 text-[#D3AF68]">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                      The $95 "Weather Defense System"
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Baseline purchase path bundling cellular repair, mineral UV barrier, and lip protection
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 line-through font-mono-numbers block">
                    ${individualRetailValue}.00 Value
                  </span>
                  <span className="font-display text-3xl font-bold text-[#D3AF68] font-mono-numbers">
                    ${currentBundleTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Product Image */}
              <div className="mt-6 relative overflow-hidden rounded-2xl border border-stone-800 bg-black shadow-lg">
                <img
                  src="/src/assets/images/ultimate_defense_kit_1792588491663.jpg"
                  alt="Bullbee Weather Defense System"
                  className="h-60 w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#171717]/95 border border-[#D3AF68]/80 text-[#D3AF68] font-bold text-xs px-3 py-1.5 rounded-lg shadow font-display tracking-wider">
                  SAVE ${totalSavings}.00 + FREE SHIPPING
                </div>
              </div>

              {/* Items List with more breathing room */}
              <div className="mt-6 space-y-3">
                {BUNDLE_PRODUCTS.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#131313] border border-stone-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-[#F8F0E2] text-sm">{item.name}</span>
                        <span className="text-xs text-stone-400 block mt-0.5">{item.size}</span>
                      </div>
                    </div>
                    <span className="font-mono-numbers text-stone-400 font-semibold">${item.singlePrice}.00</span>
                  </div>
                ))}

                {/* Optional Add-On */}
                <div
                  onClick={() => setIncludeLeatherAddon(!includeLeatherAddon)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    includeLeatherAddon
                      ? 'bg-[#D3AF68]/15 border-[#D3AF68] text-[#F8F0E2]'
                      : 'bg-[#131313] border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-6 w-6 rounded-lg flex items-center justify-center border transition-colors ${
                        includeLeatherAddon
                          ? 'bg-bullbee-gradient border-[#D3AF68] text-[#171717]'
                          : 'border-stone-700 bg-stone-900'
                      }`}
                    >
                      {includeLeatherAddon ? <Check className="h-4 w-4" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <span className="font-semibold text-[#F8F0E2]">
                        Add Ranch Boot & Leather Tallow Conditioner
                      </span>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        Preserve your boots and leather tool belts (+$18.00 special)
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-numbers font-bold text-[#D3AF68] text-sm">+$18.00</span>
                </div>
              </div>
            </div>

            {/* Simulated Add to Cart Button */}
            <div className="mt-8 pt-6 border-t border-stone-800">
              <button
                onClick={() => {
                  setCartSuccess(true);
                  setTimeout(() => setCartSuccess(false), 2500);
                  confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-bullbee-gradient py-3.5 px-5 font-bold text-xs uppercase tracking-wider text-[#171717] hover:brightness-110 transition-colors cursor-pointer shadow-lg font-display"
              >
                {cartSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added Kit to Simulated Cart (${currentBundleTotal.toFixed(2)})!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Add $95 Weather Kit to Order (Simulate)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Message-Matched Funnel Comparison */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
            <div>
              {/* Funnel Selector Toggle */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                    Message-Matched Funnel vs Homepage
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Comparing generic traffic leak vs. dedicated tradesman conversion architecture
                  </p>
                </div>
                <div className="flex p-1 bg-[#131313] rounded-xl text-xs border border-stone-800">
                  <button
                    onClick={() => setFunnelView('tradesman')}
                    className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      funnelView === 'tradesman'
                        ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Tradesman PDP
                  </button>
                  <button
                    onClick={() => setFunnelView('generic')}
                    className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      funnelView === 'generic'
                        ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Generic Home
                  </button>
                </div>
              </div>

              {/* Funnel Preview Container */}
              {funnelView === 'tradesman' ? (
                <div className="mt-6 space-y-5 rounded-2xl border border-[#D3AF68]/40 bg-[#131313] p-7">
                  {/* Texas Badge & Kicker */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#D3AF68] font-bold tracking-widest uppercase font-display">
                      <Award className="h-4 w-4" />
                      <span>Certified Made in Texas · Comfort, TX</span>
                    </div>
                    <span className="text-[11px] font-mono-numbers text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md font-semibold">
                      CVR: 3.4% (+183%)
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase leading-snug">
                    Tradesman Extreme Hand Repair Balm
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
                    Designed for hands torn by tools, diesel, hydraulic fluid, cement dust, and sub-zero wind. Zero water, zero artificial alcohol. 100% Texas pasture beef fat, honeycomb wax, and cold-pressed jojoba.
                  </p>

                  {/* 100% Healed Proof Strip */}
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-stone-800">
                      <span className="text-xs text-stone-400 block font-medium">Absorption Speed</span>
                      <span className="font-display text-lg font-bold text-[#F8F0E2]">Under 90 Seconds</span>
                      <p className="text-[11px] text-stone-500 mt-1">Will not slip on wrenches</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#1c1c1c] border border-stone-800">
                      <span className="text-xs text-stone-400 block font-medium">Skin Compatibility</span>
                      <span className="font-display text-lg font-bold text-[#D3AF68]">Human Sebum Match</span>
                      <p className="text-[11px] text-stone-500 mt-1">Vitamins A, D, E, K</p>
                    </div>
                  </div>

                  {/* Frictionless 1-Click Checkout Stack */}
                  <div className="pt-4 border-t border-stone-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span className="font-medium flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck className="h-4 w-4" />
                        100% Empty Jar Money-Back Guarantee
                      </span>
                      <span className="font-bold font-mono-numbers text-[#F8F0E2] text-sm">$48.00 / Jar</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleSimulatePurchase('Apple Pay')}
                        className="py-3 px-4 rounded-xl bg-[#F8F0E2] hover:bg-white text-[#171717] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <Zap className="h-4 w-4 fill-current" />
                        <span>Apple Pay</span>
                      </button>
                      <button
                        onClick={() => handleSimulatePurchase('Google Pay')}
                        className="py-3 px-4 rounded-xl bg-[#262626] hover:bg-[#333333] text-[#F8F0E2] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-stone-700"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Google Pay</span>
                      </button>
                      <button
                        onClick={() => handleSimulatePurchase('Shop Pay')}
                        className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Shop Pay</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5 rounded-2xl border border-stone-800 bg-[#131313]/90 p-7 opacity-75">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Generic Root Homepage (Leak)</span>
                    <span className="text-[11px] font-mono-numbers text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded font-semibold">
                      CVR: 1.2% (Cold Traffic Lost)
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-stone-400 uppercase">
                    Bullbee - Texas Natural Skincare Collection
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-body">
                    Welcome to Bullbee. Browse our entire catalog of natural tallow balms, sunscreens, apparel, hats, and accessories.
                  </p>

                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300 leading-relaxed">
                    <strong>Conversion Leak Warning:</strong> When a tradesman with bleeding knuckles searches for "hand repair" and lands on a catalog menu, cognitive friction causes 74% to bounce immediately.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proof Note */}
            <div className="mt-8 pt-5 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Frictionless guarantee next to checkout</span>
              <span className="text-[#D3AF68] font-medium">Estimated CVR lift: +83%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated 1-Click Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-stone-800 bg-[#171717] p-8 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-5 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Check className="h-5 w-5 text-emerald-400" />
                <h3 className="font-display text-xl font-bold text-[#F8F0E2] uppercase">
                  Simulated 1-Click Order Placed
                </h3>
              </div>
              <span className="text-xs text-[#D3AF68] font-mono-numbers font-bold">
                {selectedPaymentMethod}
              </span>
            </div>

            <div className="mt-5 space-y-4 text-xs text-stone-300">
              <div className="p-4 rounded-xl bg-[#131313] border border-stone-800 space-y-1.5">
                <p className="text-stone-400">Product Ordered:</p>
                <p className="text-[#F8F0E2] font-bold text-sm">
                  Weather Defense System (Whipped Tallow, Zinc Sunblock, Lip Balm)
                </p>
                <p className="text-[#D3AF68] font-mono-numbers font-bold text-base">$95.00 · Free Texas Ranch Shipping</p>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Risk-Free Guarantee Activated</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                This demonstrates how frictionless native mobile pay (Apple Pay / Google Pay / Shop Pay) removes address forms and increases checkout completion by up to 24%.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="w-full rounded-xl bg-[#292929] hover:bg-[#333333] py-3 text-xs font-bold text-[#F8F0E2] transition-colors cursor-pointer"
              >
                Close Checkout Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
