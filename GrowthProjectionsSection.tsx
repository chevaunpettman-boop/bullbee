import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Repeat,
  Download,
  Calendar,
  Sparkles,
  ArrowUpRight,
  FileDown,
  FileArchive,
  Loader2,
  Check,
  Package,
  Truck,
  Percent,
  Layers
} from 'lucide-react';
import { MONTHLY_GROWTH_PROJECTIONS } from '../data/proposalData';
import { GrowthMonth } from '../types/bullbee';
import { generateBrandedPdf } from '../utils/pdfExport';
import { downloadFullCodeZip } from '../utils/zipExport';
import confetti from 'canvas-confetti';

export const GrowthProjectionsSection: React.FC = () => {
  const [scenario, setScenario] = useState<'conservative' | 'target' | 'aggressive'>('target');
  const [hoveredMonth, setHoveredMonth] = useState<GrowthMonth | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [pdfSuccess, setPdfSuccess] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);

  // Scenario multipliers
  const multiplier = scenario === 'conservative' ? 0.78 : scenario === 'aggressive' ? 1.22 : 1.0;

  // Compute unit economics according to standard premium D2C benchmarks:
  // - COGS: 18% of Gross Revenue
  // - Fulfillment / Shipping: $8.00 per order
  // - Merchant Processing: 3% of Gross Revenue
  // - Net Profit: Gross Revenue - Ad Spend - COGS - Fulfillment - Fees
  const adjustedData: GrowthMonth[] = MONTHLY_GROWTH_PROJECTIONS.map((m) => {
    const grossRevenue = Math.round(m.grossRevenue * multiplier);
    const newCustomers = Math.round(m.newCustomers * multiplier);
    const repeatCustomers = Math.round(m.repeatCustomers * multiplier);
    const totalOrders = newCustomers + repeatCustomers;
    const cogs = Math.round(grossRevenue * 0.18);
    const fulfillment = Math.round(totalOrders * 8.00);
    const processingFees = Math.round(grossRevenue * 0.03);
    const netProfit = grossRevenue - m.spend - cogs - fulfillment - processingFees;
    const netMarginPercent = Number(((netProfit / grossRevenue) * 100).toFixed(1));
    const roas = Number((grossRevenue / m.spend).toFixed(2));
    const netRevenue = Math.round(grossRevenue * 0.78);

    return {
      ...m,
      grossRevenue,
      netRevenue,
      newCustomers,
      repeatCustomers,
      roas,
      cogs,
      fulfillment,
      processingFees,
      netProfit,
      netMarginPercent,
    };
  });

  const totalGrossRevenue = adjustedData.reduce((acc, curr) => acc + curr.grossRevenue, 0);
  const totalSpend = adjustedData.reduce((acc, curr) => acc + curr.spend, 0);
  const totalNewCustomers = adjustedData.reduce((acc, curr) => acc + curr.newCustomers, 0);
  const totalRepeatOrders = adjustedData.reduce((acc, curr) => acc + curr.repeatCustomers, 0);
  const totalOrders = totalNewCustomers + totalRepeatOrders;
  const totalCogs = adjustedData.reduce((acc, curr) => acc + curr.cogs, 0);
  const totalFulfillment = adjustedData.reduce((acc, curr) => acc + curr.fulfillment, 0);
  const totalFees = adjustedData.reduce((acc, curr) => acc + curr.processingFees, 0);
  const totalNetProfit = adjustedData.reduce((acc, curr) => acc + curr.netProfit, 0);
  const blendedMarginPercent = ((totalNetProfit / totalGrossRevenue) * 100).toFixed(1);
  const blendedRoas = (totalGrossRevenue / totalSpend).toFixed(2);

  // SVG Chart Dimensions
  const chartHeight = 240;
  const chartWidth = 700;
  const maxRevenue = Math.max(...adjustedData.map((d) => d.grossRevenue));

  // Generate path points
  const points = adjustedData.map((d, index) => {
    const x = (index / (adjustedData.length - 1)) * (chartWidth - 60) + 30;
    const y = chartHeight - (d.grossRevenue / maxRevenue) * (chartHeight - 40) - 20;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  const handleExportSummary = () => {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    const content = `BULLBEE 12-MONTH PROJECTIONS SUMMARY (${scenario.toUpperCase()})\n` +
      `Total Gross Revenue: $${totalGrossRevenue.toLocaleString()}\n` +
      `Total Ad Spend: $${totalSpend.toLocaleString()}\n` +
      `Total Net Profit (Contribution): $${totalNetProfit.toLocaleString()} (${blendedMarginPercent}% Margin)\n` +
      `Total Product COGS (18%): $${totalCogs.toLocaleString()}\n` +
      `Total Fulfillment ($8/order): $${totalFulfillment.toLocaleString()}\n` +
      `Total Merchant Fees (3%): $${totalFees.toLocaleString()}\n` +
      `Blended ROAS: ${blendedRoas}x\n` +
      `Total Orders Delivered: ${totalOrders.toLocaleString()}\n` +
      `Month 12 Run Rate: $${adjustedData[11].grossRevenue.toLocaleString()}/mo ($${adjustedData[11].netProfit.toLocaleString()} Net Profit)\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bullbee-growth-model-${scenario}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdfReport = async () => {
    try {
      setIsDownloadingPdf(true);
      setPdfSuccess(false);
      await generateBrandedPdf();
      setPdfSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D3AF68', '#D9AD5B', '#D09931', '#F8F0E2'],
      });
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (e) {
      console.error('PDF export failed:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadZipArchive = async () => {
    try {
      setIsDownloadingZip(true);
      setZipSuccess(false);
      await downloadFullCodeZip();
      setZipSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D3AF68', '#D9AD5B', '#52B788', '#F8F0E2'],
      });
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (e) {
      console.error('Zip download failed:', e);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <section id="growth-projections" className="relative border-b border-stone-800 bg-[#141414] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <span>Section 05</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Financial Projections & Contribution Margin Model</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F0E2] uppercase">
              12-Month Financial Roadmap
            </h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl font-body leading-relaxed">
              Defensible month-by-month financial projection scaling from $21,833/mo initial spend to $221.5k/mo run rate with a 5.54x exit ROAS and a compounding 32.3% blended contribution margin.
            </p>
          </div>

          {/* Action Bar: Scenario Selector, PDF, ZIP, and Data Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1.5 bg-[#1a1a1a] rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setScenario('conservative')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  scenario === 'conservative'
                    ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Conservative
              </button>
              <button
                onClick={() => setScenario('target')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  scenario === 'target'
                    ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Target Plan
              </button>
              <button
                onClick={() => setScenario('aggressive')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  scenario === 'aggressive'
                    ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Aggressive Scale
              </button>
            </div>

            {/* Download Full Codebase .ZIP Button */}
            <button
              onClick={handleDownloadZipArchive}
              disabled={isDownloadingZip}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                zipSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-[#221F1B] border border-[#D3AF68]/40 text-[#F8F0E2] hover:bg-[#2C2620] hover:border-[#D3AF68] disabled:opacity-50'
              }`}
              title="Download complete project source code (.zip)"
            >
              {isDownloadingZip ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#D3AF68]" />
                  <span>Packaging ZIP...</span>
                </>
              ) : zipSuccess ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Code ZIP Downloaded!</span>
                </>
              ) : (
                <>
                  <FileArchive className="h-4 w-4 text-[#D3AF68]" />
                  <span>Download Code (.zip)</span>
                </>
              )}
            </button>

            {/* Download as PDF Button */}
            <button
              onClick={handleDownloadPdfReport}
              disabled={isDownloadingPdf}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                pdfSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-bullbee-gradient text-[#171717] hover:brightness-110 disabled:opacity-50'
              }`}
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportSummary}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-[#212121] px-4 py-2.5 text-xs font-semibold text-stone-200 hover:border-[#D3AF68]/60 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#D3AF68]" />
              <span>Export Raw Data</span>
            </button>
          </div>
        </div>

        {/* 5 Cumulative KPI Cards including Contribution Margin */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          <div className="rounded-2xl border border-stone-800 bg-[#1a1a1a] p-5 sm:p-6 shadow-md">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-display block">12-Mo Gross Revenue</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#D3AF68] font-mono-numbers">
                ${(totalGrossRevenue / 1000000).toFixed(2)}M
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-400 font-mono-numbers">{totalOrders.toLocaleString()} total orders</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1a1a1a] p-5 sm:p-6 shadow-md">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-display block">Total Ad Capital</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#F8F0E2] font-mono-numbers">
                ${(totalSpend / 1000).toFixed(0)}k
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-400">Scaled from $21.8k/mo</p>
          </div>

          <div className="rounded-2xl border border-emerald-900/50 bg-[#161D17] p-5 sm:p-6 shadow-md">
            <span className="text-xs text-emerald-400 uppercase tracking-widest font-display block">Net Profit (Contribution)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-400 font-mono-numbers">
                +${Math.round(totalNetProfit / 1000)}k
              </span>
              <span className="text-xs text-emerald-300 font-bold font-mono-numbers">({blendedMarginPercent}%)</span>
            </div>
            <p className="mt-2 text-xs text-emerald-500/80">After Ad Spend, COGS & Ops</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1a1a1a] p-5 sm:p-6 shadow-md">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-display block">Blended 12-Mo ROAS</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#D3AF68] font-mono-numbers">
                {blendedRoas}x
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-400">Gross ROAS efficiency</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1a1a1a] p-5 sm:p-6 shadow-md col-span-2 md:col-span-1">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-display block">Month 12 Run Rate</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#F8F0E2] font-mono-numbers">
                ${(adjustedData[11].grossRevenue / 1000).toFixed(0)}k
              </span>
              <span className="text-xs text-emerald-400 font-bold">+$103k net</span>
            </div>
            <p className="mt-2 text-xs text-stone-400 font-mono-numbers">
              {adjustedData[11].repeatCustomers.toLocaleString()} repeat buyers/mo
            </p>
          </div>
        </div>

        {/* D2C Unit Economics Benchmark Callout Strip */}
        <div className="mb-12 rounded-2xl border border-[#D3AF68]/20 bg-[#1A1815] p-5 lg:p-6 text-xs text-stone-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-[#D3AF68] shrink-0" />
              <div>
                <span className="font-display font-bold text-[#F8F0E2] uppercase tracking-wider text-sm block">
                  D2C Contribution Economics Benchmarks
                </span>
                <span className="text-stone-400">
                  Standardized direct-to-consumer operational modeling based on premium Texas tallow margins
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-numbers">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#241E19] border border-stone-800 text-stone-300">
                <Package className="h-3.5 w-3.5 text-[#D3AF68]" />
                <span>Product COGS: <strong>18% of Gross</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#241E19] border border-stone-800 text-stone-300">
                <Truck className="h-3.5 w-3.5 text-[#D3AF68]" />
                <span>Pick & Ship: <strong>$8.00 / order</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#241E19] border border-stone-800 text-stone-300">
                <Percent className="h-3.5 w-3.5 text-[#D3AF68]" />
                <span>Merchant Processing: <strong>3% of Gross</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Growth Trajectory Graph */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-[#D3AF68]" />
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  Monthly Revenue Trajectory & Repeat Cohort Growth
                </h3>
              </div>
              <p className="mt-2 text-sm text-stone-300">
                Hover over data nodes to inspect monthly gross revenue, net contribution profit, and customer cohorts
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-stone-400 font-mono-numbers">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#D3AF68]" />
                <span>Gross Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span>Net Contribution Profit</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-64 sm:h-80 overflow-visible"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D3AF68" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D3AF68" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = chartHeight - ratio * (chartHeight - 40) - 20;
                return (
                  <line
                    key={ratio}
                    x1="20"
                    y1={y}
                    x2={chartWidth - 20}
                    y2={y}
                    stroke="#2e2e2e"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area under curve */}
              <path d={areaD} fill="url(#revenueGradient)" />

              {/* Line curve */}
              <path
                d={pathD}
                fill="none"
                stroke="#D3AF68"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredMonth?.month === p.data.month ? '8' : '5'}
                    className="cursor-pointer fill-[#D3AF68] stroke-[#171717] stroke-2 transition-all duration-150 hover:r-8"
                    onMouseEnter={() => setHoveredMonth(p.data)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredMonth && (
              <div className="absolute top-4 right-4 rounded-2xl border border-[#D3AF68]/60 bg-[#131313]/95 p-5 shadow-2xl text-xs space-y-2 backdrop-blur-md">
                <span className="font-display font-bold text-[#D3AF68] text-base uppercase block tracking-wider">
                  {hoveredMonth.month} Performance
                </span>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>Gross Revenue:</span>
                  <span className="font-mono-numbers font-bold text-[#F8F0E2]">
                    ${hoveredMonth.grossRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>Ad Spend:</span>
                  <span className="font-mono-numbers text-stone-400">
                    ${hoveredMonth.spend.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>Net Contribution Profit:</span>
                  <span className={`font-mono-numbers font-bold ${hoveredMonth.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {hoveredMonth.netProfit >= 0 ? '+' : '-'}${Math.abs(hoveredMonth.netProfit).toLocaleString()} ({hoveredMonth.netMarginPercent}%)
                  </span>
                </div>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>ROAS:</span>
                  <span className="font-mono-numbers font-bold text-[#D3AF68]">
                    {hoveredMonth.roas.toFixed(2)}x
                  </span>
                </div>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>New / Repeat Orders:</span>
                  <span className="font-mono-numbers text-stone-300">
                    {hoveredMonth.newCustomers.toLocaleString()} / {hoveredMonth.repeatCustomers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between gap-6 text-stone-300">
                  <span>AOV:</span>
                  <span className="font-mono-numbers text-[#D3AF68] font-bold">
                    ${hoveredMonth.aov.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 12-Month Financial Table with Net Profit Column */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                Detailed 12-Month Unit Economics Matrix
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Full cohort waterfall including 18% COGS, $8.00/order fulfillment, 3% processing fees, and Net Contribution Profit
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#D3AF68] font-mono-numbers font-semibold px-3 py-1 bg-[#131313] rounded-lg border border-stone-800">
                Scenario: {scenario.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-numbers">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 font-display text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 pr-3">Month</th>
                  <th className="py-3.5 px-3">Ad Spend</th>
                  <th className="py-3.5 px-3">Clicks</th>
                  <th className="py-3.5 px-3">CPC</th>
                  <th className="py-3.5 px-3">CVR</th>
                  <th className="py-3.5 px-3">AOV</th>
                  <th className="py-3.5 px-3">New</th>
                  <th className="py-3.5 px-3">Repeat</th>
                  <th className="py-3.5 px-3">Gross Revenue</th>
                  <th className="py-3.5 px-3 text-emerald-400 font-bold">Net Profit</th>
                  <th className="py-3.5 pl-3 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {adjustedData.map((row) => (
                  <tr
                    key={row.month}
                    className="hover:bg-[#222222] transition-colors"
                  >
                    <td className="py-4 pr-3 font-display font-bold text-[#F8F0E2] text-sm">
                      {row.month}
                    </td>
                    <td className="py-4 px-3 text-stone-400">
                      ${row.spend.toLocaleString('en-US')}
                    </td>
                    <td className="py-4 px-3 text-stone-300">
                      {row.clicks.toLocaleString('en-US')}
                    </td>
                    <td className="py-4 px-3 text-stone-400">
                      ${row.blendedCpc.toFixed(3)}
                    </td>
                    <td className="py-4 px-3 text-stone-300">
                      {(row.conversionRate * 100).toFixed(2)}%
                    </td>
                    <td className="py-4 px-3 text-[#D3AF68] font-bold">
                      ${row.aov.toFixed(2)}
                    </td>
                    <td className="py-4 px-3 text-stone-300">
                      {row.newCustomers.toLocaleString('en-US')}
                    </td>
                    <td className="py-4 px-3 text-emerald-400 font-semibold">
                      {row.repeatCustomers.toLocaleString('en-US')}
                    </td>
                    {/* Strictly leading dollar sign (e.g. Month 10: $152,914) */}
                    <td className="py-4 px-3 font-bold text-[#F8F0E2] text-sm whitespace-nowrap">
                      ${row.grossRevenue.toLocaleString('en-US')}
                    </td>
                    {/* Net Contribution Profit Column */}
                    <td className="py-4 px-3 whitespace-nowrap font-bold">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                          row.netProfit >= 0
                            ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/50'
                            : 'text-amber-400 bg-amber-950/40 border border-amber-900/40'
                        }`}
                      >
                        {row.netProfit >= 0 ? '+' : '-'}${Math.abs(row.netProfit).toLocaleString('en-US')}
                        <span className="text-[10px] ml-1 opacity-70">({row.netMarginPercent}%)</span>
                      </span>
                    </td>
                    <td className="py-4 pl-3 text-right font-bold text-[#D3AF68] text-sm">
                      {row.roas.toFixed(2)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
