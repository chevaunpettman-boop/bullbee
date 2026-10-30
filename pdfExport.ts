import { jsPDF } from 'jspdf';
import {
  BRAND_CONFIG,
  PRESENTATION_SLIDES,
  MONTHLY_GROWTH_PROJECTIONS,
  AD_KEYWORDS
} from '../data/proposalData';

export const generateBrandedPdf = async (onProgress?: (step: string) => void): Promise<void> => {
  if (onProgress) onProgress('Initializing document layout & executive styles...');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14; // Optimized margins for wider A4 readable canvas
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Executive color palette: Deep Obsidian, Bullbee Gold, Soft Parchment & Muted Saddle Leather
  const goldColor = [211, 175, 104] as const; // #D3AF68 Bullbee Core Gold
  const goldDark = [185, 145, 68] as const; // Darker gold for text on light backgrounds
  const darkObsidian = [20, 20, 20] as const; // #141414 Deep Obsidian
  const darkCard = [28, 28, 28] as const; // #1C1C1C
  const softParchment = [248, 244, 237] as const; // #F8F4ED Soft Parchment mid-tone
  const parchmentAlt = [242, 237, 228] as const; // #F2EDE4 Alternating row mid-tone
  const borderParchment = [218, 208, 194] as const; // Soft leather-parchment border
  const borderDark = [50, 44, 38] as const; // Muted leather border
  const textDark = [24, 24, 24] as const; // Deep Charcoal text
  const textMuted = [105, 98, 88] as const; // Warm muted slate
  const greenRoas = [22, 128, 60] as const; // Muted forest green

  // Standardized, error-proof formatting helpers
  const fmtMoney = (val: number): string => `$${val.toFixed(2)}`;
  const fmtCurrencyWhole = (val: number): string => `$${Math.round(val).toLocaleString('en-US')}`;
  const fmtCount = (val: number): string => Math.round(val).toLocaleString('en-US');
  const fmtRoas = (val: number): string => `${val.toFixed(2)}x`;
  const fmtPercent = (val: number): string => `${(val * 100).toFixed(2)}%`;

  // Running executive footer
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...textMuted);
    doc.text(
      'Bullbee Skincare (TryBullbee.com) · Founder: Drew Haas (Netflix Outlast S2) · Confidential Commercial Strategy',
      margin,
      pageHeight - 8
    );
    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  };

  // ==========================================
  // PAGE 1: COVER & STRATEGIC BLUEPRINT
  // ==========================================
  if (onProgress) onProgress('Composing Executive Strategy & Metrics (Page 1)...');

  // Top Dark Header Banner
  doc.setFillColor(...darkObsidian);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Gold Accent Line
  doc.setFillColor(...goldColor);
  doc.rect(0, 50, pageWidth, 2.5, 'F');

  // Brand Header
  doc.setTextColor(252, 250, 246);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('BULLBEE', margin, 19);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...goldColor);
  doc.text('TEXAS GRASS-FED BEEF TALLOW SKINCARE · EXECUTIVE COMMERCIAL STRATEGY', margin, 27);

  doc.setTextColor(205, 200, 192);
  doc.setFontSize(8.5);
  doc.text(
    'Comfort, Texas · Founder: Drew Haas · FY2026 Direct-to-Consumer Capital Allocation Model',
    margin,
    35
  );

  // Document Title
  let curY = 64;
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GROWTH STRATEGY & FINANCIAL PLAN', margin, curY);

  curY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...textMuted);
  doc.text(
    `Scaling $21,833/Month Paid Capital into ${fmtCount(BRAND_CONFIG.targetClicks)} Clicks & $221.5k/Mo Sustainable Run Rate`,
    margin,
    curY
  );

  // 4 Core Executive Metric Cards with scaled fonts
  curY += 10;
  const cardW = (contentWidth - 9) / 4;
  const metrics = [
    { label: 'Monthly Ad Capital', val: fmtCurrencyWhole(BRAND_CONFIG.monthlyAdSpend), sub: '80% Search / 20% Retarget' },
    { label: 'Monthly Clicks', val: fmtCount(BRAND_CONFIG.targetClicks), sub: 'Spend / $0.695 CPC' },
    { label: 'Blended Target CPC', val: `$${BRAND_CONFIG.targetBlendedCpc.toFixed(3)}`, sub: 'Reduced from $1.16 old' },
    { label: 'Target Initial AOV', val: fmtMoney(BRAND_CONFIG.baseAov), sub: 'Anchored by $95 Bundle' },
  ];

  metrics.forEach((m, idx) => {
    const x = margin + idx * (cardW + 3);
    doc.setFillColor(...softParchment);
    doc.roundedRect(x, curY, cardW, 26, 2, 2, 'F');
    doc.setDrawColor(...borderParchment);
    doc.roundedRect(x, curY, cardW, 26, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...textMuted);
    doc.text(m.label.toUpperCase(), x + 4, curY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...goldDark);
    doc.text(m.val, x + 4, curY + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textMuted);
    doc.text(m.sub, x + 4, curY + 22);
  });

  // Executive Summary Narrative
  curY += 34;
  doc.setFillColor(252, 250, 246);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(...borderParchment);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...textDark);
  doc.text('EXECUTIVE THESIS & STRATEGIC RATIONALE', margin + 4.5, curY + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 50, 45);
  const narrative = [
    'Bullbee occupies a highly defensible category leadership position: 100% Texas grass-fed beef tallow with zero fillers.',
    `By strategically allocating ad capital toward high-intent problem searches ("beef tallow lip balm" @ $0.65 CPC and "tallow for skin" @ $0.75 CPC),`,
    `blended CPC is compressed from $1.16 to $0.695, securing ${fmtCount(BRAND_CONFIG.targetClicks)} qualified visitors within the fixed $21,833 monthly budget.`,
    'Simultaneously, orienting customer acquisition around the $95 "Weather Defense System" expands portfolio AOV to $37.50+,',
    'while structured 45-day replenishment workflows compound cohort retention into predictable, high-margin enterprise value.',
  ];
  narrative.forEach((line, i) => {
    doc.text(line, margin + 4.5, curY + 14 + i * 4.8);
  });

  // Initial High-Intent Search Bidding Portfolio Table
  curY += 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...textDark);
  doc.text('INITIAL HIGH-INTENT SEARCH BIDDING PORTFOLIO', margin, curY);

  curY += 4.5;
  // Table Header
  doc.setFillColor(...darkObsidian);
  doc.rect(margin, curY, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(245, 245, 242);
  doc.text('KEYWORD QUERY', margin + 3.5, curY + 5.5);
  doc.text('TARGET CPC', margin + 68, curY + 5.5);
  doc.text('INTENT CLASSIFICATION', margin + 94, curY + 5.5);
  doc.text('EST. CLICKS', margin + 136, curY + 5.5);
  doc.text('LANDING ASSET', margin + 160, curY + 5.5);

  curY += 8;
  AD_KEYWORDS.forEach((kw, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 244, isEven ? 255 : 238);
    doc.rect(margin, curY, contentWidth, 7, 'F');
    doc.setDrawColor(...borderParchment);
    doc.line(margin, curY + 7, margin + contentWidth, curY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...textDark);
    doc.text(kw.keyword, margin + 3.5, curY + 4.8);

    // CPC formatted with leading dollar sign (e.g. tradesman hand repair balm strictly renders as $0.68)
    doc.setTextColor(...goldDark);
    doc.text(fmtMoney(kw.cpc), margin + 68, curY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textMuted);
    doc.text(kw.intent, margin + 94, curY + 4.8);
    doc.text(fmtCount(kw.projectedClicks), margin + 136, curY + 4.8);

    doc.setTextColor(175, 80, 10);
    doc.text('Dedicated PDP', margin + 160, curY + 4.8);

    curY += 7;
  });

  // Strategic Slide Briefing Highlights
  curY += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...textDark);
  doc.text('STRATEGIC SLIDE BRIEFING SUMMARY', margin, curY);

  curY += 4;
  PRESENTATION_SLIDES.slice(0, 3).forEach((slide) => {
    doc.setFillColor(...softParchment);
    doc.roundedRect(margin, curY, contentWidth, 14.5, 1.5, 1.5, 'F');
    doc.setDrawColor(...borderParchment);
    doc.roundedRect(margin, curY, contentWidth, 14.5, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...goldDark);
    doc.text(`SLIDE 0${slide.id}: ${slide.badge.toUpperCase()}`, margin + 3.5, curY + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...textDark);
    doc.text(slide.title, margin + 3.5, curY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...textMuted);
    doc.text(slide.bulletPoints[0], margin + 3.5, curY + 12.8);

    // Metric badge on right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...goldDark);
    doc.text(slide.keyMetric.value, margin + contentWidth - 4, curY + 7.5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(slide.keyMetric.label, margin + contentWidth - 4, curY + 12, { align: 'right' });

    curY += 16.5;
  });

  addFooter(1, 3);

  // ==========================================
  // PAGE 2: THE FOUR STRATEGIC PILLARS
  // ==========================================
  doc.addPage();
  if (onProgress) onProgress('Compiling Four Pillars of Execution (Page 2)...');

  // Header Banner
  doc.setFillColor(...darkObsidian);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setFillColor(...goldColor);
  doc.rect(0, 25, pageWidth, 1.5, 'F');

  doc.setTextColor(252, 250, 246);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('BULLBEE COMMERCIAL STRATEGY: FOUR PILLARS OF EXECUTION', margin, 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...goldColor);
  doc.text('CAPITAL ALLOCATION · CONVERSION ARCHITECTURE · GENERATIVE SEARCH · LIFECYCLE ECONOMICS', margin, 20.5);

  curY = 35;

  const pillars = [
    {
      num: 'PILLAR 01',
      title: 'CAPITAL ALLOCATION & PAID ACQUISITION ($21,833/MO)',
      badge: '80% Search / 20% Retargeting',
      bullets: [
        'Google Search Ads (80% | $17,466/mo): Algorithmic bid management prioritizing high-intent, sub-$0.80 commercial keywords.',
        'Meta & TikTok Retargeting (20% | $4,367/mo): Full-funnel video retargeting featuring 100% money-back guarantee to convert high-dwell visitors.',
        `Cost Compression: Blended cost-per-click reduced from $1.16 to $0.695, delivering ${fmtCount(BRAND_CONFIG.targetClicks)} qualified visitors.`,
        'Message Match: Dedicated Tradesman Hand Repair landing pages that eliminate homepage bounce friction.',
      ],
    },
    {
      num: 'PILLAR 02',
      title: 'CONVERSION RATE OPTIMIZATION & FUNNEL ARCHITECTURE',
      badge: 'Target AOV: $37.50 -> $95 Bundle Anchor',
      bullets: [
        'High-Ticket Baseline Path: $95 "Weather Defense System" (Whipped Tallow Cream, Mineral Sunblock, Lip Balm).',
        'Friction-Free Mobile Checkout: Instant Apple Pay, Google Pay, and Shop Pay 1-click checkout options.',
        '100% Empty-Jar Guarantee: Prominently anchored directly adjacent to the primary Add-to-Cart callout.',
        'Acquisition Sensitivity: Expanding AOV from $28 to $37.50 reduces required visitor volume to meet gross revenue targets by 25%.',
      ],
    },
    {
      num: 'PILLAR 03',
      title: 'GENERATIVE SEARCH AUTHORITY & SEMANTIC DISCOVERY (GEO)',
      badge: 'Google AI Overviews & ChatGPT',
      bullets: [
        'Conversational Prompts: Comprehensive answers to long-tail queries: "Can grass-fed tallow heal cracked hands from outdoor labor?".',
        'Structured Knowledge Hub: schema.org MedicalWebPage and FAQ markup enabling generative models to cite Bullbee authoritative data.',
        'Editorial Consensus: Targeted PR placement across outdoor and lifestyle media listicles for natural men\'s skincare.',
        'Community Proof Seeding: Authentic customer transformation documentation across r/mensgrooming and r/Eczema.',
      ],
    },
    {
      num: 'PILLAR 04',
      title: 'LIFECYCLE ECONOMICS & COHORT RETENTION ARCHITECTURE',
      badge: 'LTV Expansion: Compounding Subscription Base',
      bullets: [
        'Trade Creator UGC: Real mechanics, ranchers, and tradesmen demonstrating 90-second non-greasy absorption on tools.',
        'Value-Based Lead Capture: Exit-intent modal offering "The Working Man\'s 3-Step Routine" PDF protocol with 15% incentive.',
        'Founder Sequence: Day 0 onboarding spotlighting Drew Haas (Netflix Outlast S2) and Texas pasture rendering integrity.',
        'Subscription Conversion: Day 14 photo verification for 20% credit; Day 45 automated recurring VIP Ranch Reserve.',
      ],
    },
  ];

  pillars.forEach((p) => {
    doc.setFillColor(...softParchment);
    doc.roundedRect(margin, curY, contentWidth, 54, 2, 2, 'F');
    doc.setDrawColor(...borderParchment);
    doc.roundedRect(margin, curY, contentWidth, 54, 2, 2, 'S');

    // Pillar Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...goldDark);
    doc.text(p.num, margin + 4.5, curY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textMuted);
    doc.text(p.badge, margin + contentWidth - 4.5, curY + 7, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...textDark);
    doc.text(p.title, margin + 4.5, curY + 13.5);

    // Bullets with enhanced spacing and legibility
    p.bullets.forEach((bullet, bIdx) => {
      const bulletY = curY + 21 + bIdx * 8;
      doc.setFillColor(...goldDark);
      doc.circle(margin + 6.5, bulletY - 1, 1.0, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(45, 40, 35);
      const splitLines = doc.splitTextToSize(bullet, contentWidth - 16);
      doc.text(splitLines, margin + 10, bulletY);
    });

    curY += 58;
  });

  addFooter(2, 3);

  // ==========================================
  // PAGE 3: 12-MONTH FINANCIAL MODEL & PROJECTIONS
  // ==========================================
  doc.addPage();
  if (onProgress) onProgress('Compiling 12-Month Financial Model (Page 3)...');

  // Header Banner
  doc.setFillColor(...darkObsidian);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setFillColor(...goldColor);
  doc.rect(0, 25, pageWidth, 1.5, 'F');

  const m1Rev = MONTHLY_GROWTH_PROJECTIONS[0].grossRevenue;
  const m12Rev = MONTHLY_GROWTH_PROJECTIONS[11].grossRevenue;
  const m12Roas = MONTHLY_GROWTH_PROJECTIONS[11].roas;

  doc.setTextColor(252, 250, 246);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('BULLBEE 12-MONTH UNIT ECONOMICS & CONTRIBUTION MODEL', margin, 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...goldColor);
  doc.text(
    `SCALING FROM $21,833/MO INITIAL SPEND TO ${fmtCurrencyWhole(m12Rev)}/MO RUN RATE WITH A CREDIBLE ${fmtRoas(m12Roas)} EXIT ROAS`,
    margin,
    20.5
  );

  curY = 34;

  // Cumulative Totals Summary Box including Net Profit / Contribution Margin
  const totalRevenue = MONTHLY_GROWTH_PROJECTIONS.reduce((a, b) => a + b.grossRevenue, 0);
  const totalSpend = MONTHLY_GROWTH_PROJECTIONS.reduce((a, b) => a + b.spend, 0);
  const totalNewCust = MONTHLY_GROWTH_PROJECTIONS.reduce((a, b) => a + b.newCustomers, 0);
  const totalRepeat = MONTHLY_GROWTH_PROJECTIONS.reduce((a, b) => a + b.repeatCustomers, 0);
  const totalOrders = totalNewCust + totalRepeat;
  const totalNetProfit = MONTHLY_GROWTH_PROJECTIONS.reduce((a, b) => a + b.netProfit, 0);
  const blendedMargin = ((totalNetProfit / totalRevenue) * 100).toFixed(1);
  const blendedRoas = (totalRevenue / totalSpend).toFixed(2);

  doc.setFillColor(252, 250, 246);
  doc.roundedRect(margin, curY, contentWidth, 23, 2, 2, 'F');
  doc.setDrawColor(...goldDark);
  doc.roundedRect(margin, curY, contentWidth, 23, 2, 2, 'S');

  const summaryCols = [
    { label: 'Year 1 Gross Revenue', val: `$${(totalRevenue / 1000000).toFixed(2)}M` },
    { label: 'Total Paid Ad Capital', val: `$${(totalSpend / 1000).toFixed(0)}k` },
    { label: 'Net Profit (Contribution)', val: `+$${Math.round(totalNetProfit / 1000)}k (${blendedMargin}%)` },
    { label: 'Blended 12-Mo ROAS', val: `${blendedRoas}x` },
    { label: 'Total Orders Delivered', val: fmtCount(totalOrders) },
  ];

  const sColW = contentWidth / 5;
  summaryCols.forEach((col, idx) => {
    const x = margin + idx * sColW;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(...textMuted);
    doc.text(col.label.toUpperCase(), x + 3, curY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(idx === 2 ? 22 : 185, idx === 2 ? 128 : 145, idx === 2 ? 60 : 68);
    doc.text(col.val, x + 3, curY + 15);
  });

  // Financial Table with Net Profit Column
  curY += 29;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...textDark);
  doc.text('MONTH-BY-MONTH UNIT ECONOMICS & CONTRIBUTION MARGIN MATRIX', margin, curY);

  curY += 4.5;

  // Strict column coordinates fitting all 11 columns cleanly across 182mm contentWidth:
  const colX = {
    month: margin + 1.5,   // 15.5
    spend: margin + 16,    // 30
    clicks: margin + 32,   // 46
    cpc: margin + 47,      // 61
    cvr: margin + 59,      // 73
    aov: margin + 71,      // 85
    newCust: margin + 84,  // 98
    repeat: margin + 98,   // 112
    grossRev: margin + 114,// 128
    netProfit: margin + 138,// 152
    roas: margin + 164,    // 178
  };

  // Table Header
  doc.setFillColor(...darkObsidian);
  doc.rect(margin, curY, contentWidth, 7.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(245, 245, 242);
  doc.text('MONTH', colX.month, curY + 5.2);
  doc.text('AD SPEND', colX.spend, curY + 5.2);
  doc.text('CLICKS', colX.clicks, curY + 5.2);
  doc.text('CPC', colX.cpc, curY + 5.2);
  doc.text('CVR', colX.cvr, curY + 5.2);
  doc.text('AOV', colX.aov, curY + 5.2);
  doc.text('NEW', colX.newCust, curY + 5.2);
  doc.text('REPEAT', colX.repeat, curY + 5.2);
  doc.text('GROSS REV', colX.grossRev, curY + 5.2);
  doc.text('NET PROFIT', colX.netProfit, curY + 5.2);
  doc.text('ROAS', colX.roas, curY + 5.2);

  curY += 7.5;
  MONTHLY_GROWTH_PROJECTIONS.forEach((m, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 244, isEven ? 255 : 238);
    doc.rect(margin, curY, contentWidth, 6.6, 'F');
    doc.setDrawColor(...borderParchment);
    doc.line(margin, curY + 6.6, margin + contentWidth, curY + 6.6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(...textDark);
    doc.text(m.month, colX.month, curY + 4.6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textMuted);
    // Currency with leading dollar sign
    doc.text(fmtCurrencyWhole(m.spend), colX.spend, curY + 4.6);
    // Clicks with standard US comma separators (e.g. 31,414 - never periods)
    doc.text(fmtCount(m.clicks), colX.clicks, curY + 4.6);
    // CPC with leading dollar sign
    doc.text(`$${m.blendedCpc.toFixed(3)}`, colX.cpc, curY + 4.6);
    // CVR formatted cleanly
    doc.text(fmtPercent(m.conversionRate), colX.cvr, curY + 4.6);

    // Guaranteed leading dollar sign and clean currency formatting (e.g. Month 6 strictly renders as "$48.20")
    doc.setTextColor(...goldDark);
    doc.setFont('helvetica', 'bold');
    doc.text(fmtMoney(m.aov), colX.aov, curY + 4.6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
    doc.text(fmtCount(m.newCustomers), colX.newCust, curY + 4.6);

    doc.setTextColor(...greenRoas);
    doc.text(fmtCount(m.repeatCustomers), colX.repeat, curY + 4.6);

    // Gross Revenue strictly with leading dollar sign (e.g., Month 10 strictly "$152,914")
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    const grossRevFormatted = `$${Math.round(m.grossRevenue).toLocaleString('en-US')}`;
    doc.text(grossRevFormatted, colX.grossRev, curY + 4.6);

    // Net Profit: Contribution Margin after Spend, 18% COGS, $8 Fulfillment, 3% Fees
    if (m.netProfit >= 0) {
      doc.setTextColor(...greenRoas);
      doc.text(`+$${Math.round(m.netProfit).toLocaleString('en-US')}`, colX.netProfit, curY + 4.6);
    } else {
      doc.setTextColor(180, 50, 40); // Muted dark red for initial acquisition investment
      doc.text(`-$${Math.round(Math.abs(m.netProfit)).toLocaleString('en-US')}`, colX.netProfit, curY + 4.6);
    }

    // ROAS formatted with period decimal and no space (e.g. "1.26x", "2.44x", "5.54x")
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...goldDark);
    doc.text(fmtRoas(m.roas), colX.roas, curY + 4.6);

    curY += 6.6;
  });

  // Final Sign-Off & Commercial Governance Box
  curY += 6.5;
  doc.setFillColor(...softParchment);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(...borderParchment);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  doc.text('EXECUTIVE VERIFICATION & UNIT ECONOMICS GOVERNANCE', margin + 4.5, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(60, 55, 48);
  const closingLines = [
    '1. D2C Contribution Benchmarks: Product COGS at 18% of Gross Revenue, Fulfillment/Shipping at $8.00 per order, Merchant Fees at 3%.',
    '2. Profitability Transition: Model achieves net contribution positive cash flow by Month 4 (+$2,855) scaling to +$103,058/mo in Month 12.',
    '3. Working Capital: Initial 3-month cumulative acquisition investment ($10.7k net) is fully recovered in Month 5 through cohort retention.',
    '4. Product Packaging: Anchor the $95 "Weather Defense System" to secure $37.50+ AOV immediately upon paid traffic launch.',
  ];
  closingLines.forEach((l, idx) => {
    doc.text(l, margin + 4.5, curY + 11.5 + idx * 4.6);
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...goldDark);
  doc.text('Certified Strategy Prepared for Stakeholder Review · Bullbee Skincare Texas', margin + 4.5, curY + 33);

  addFooter(3, 3);

  // Trigger Save
  if (onProgress) onProgress('Finalizing and downloading PDF...');
  doc.save('Bullbee-Executive-Growth-Strategy.pdf');
};
