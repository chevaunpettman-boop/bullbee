import {
  GrowthMonth,
  AdKeyword,
  BundleProduct,
  GeoPrompt,
  RetentionStage,
  PresentationSlide
} from '../types/bullbee';

export const BRAND_CONFIG = {
  name: 'Bullbee',
  tagline: 'Texas Grass-Fed Beef Tallow Skincare',
  ethos: 'No Spa Nonsense. 3 Real Ingredients.',
  founder: 'Drew Haas',
  founderTitle: 'Founder, Texas Craftsman & Netflix Outlast S2 Winner',
  headquarters: 'Comfort, Texas',
  baseAov: 37.50,
  monthlyAdSpend: 21833,
  targetClicks: 31414, // Exact formula: $21,833 / $0.695 = 31,414 clicks
  historicalCpc: 1.16,
  targetBlendedCpc: 0.695,
  heroBundlePrice: 95.00,
};

export const AD_KEYWORDS: AdKeyword[] = [
  {
    keyword: 'beef tallow lip balm',
    cpc: 0.65,
    intent: 'Direct Product',
    projectedClicks: 8000,
    cost: 5200,
    recommendation: 'Targeted high-volume anchor. High conversion rate for winter & outdoor tradesmen.',
  },
  {
    keyword: 'tallow for skin',
    cpc: 0.75,
    intent: 'High Commercial',
    projectedClicks: 8000,
    cost: 6000,
    recommendation: 'Educational capture asset. Directs to science-backed sebum biocompatibility and non-toxic profile.',
  },
  {
    keyword: 'tradesman hand repair balm',
    cpc: 0.68,
    intent: 'Symptom / Problem',
    projectedClicks: 4500,
    cost: 3060,
    recommendation: 'Direct match for the dedicated Tradesman landing page with 100% money-back guarantee.',
  },
  {
    keyword: 'whipped beef tallow cream',
    cpc: 0.82,
    intent: 'Direct Product',
    projectedClicks: 2200,
    cost: 1804,
    recommendation: 'Marquee 4oz flagship jar. Pushes immediate upsell to the $95 Weather Defense System.',
  },
  {
    keyword: 'natural eczema cream for men',
    cpc: 0.89,
    intent: 'Symptom / Problem',
    projectedClicks: 1575,
    cost: 1402,
    recommendation: 'Pain-point targeting. Emphasizes grass-fed vitamin A, D, E, K profile and zero synthetic fillers.',
  },
];

export const BUNDLE_PRODUCTS: BundleProduct[] = [
  {
    id: 'whipped-cream',
    name: 'Whipped Beef Tallow Cream',
    size: '4 oz / 113g Amber Glass Jar',
    singlePrice: 48.00,
    keyIngredients: ['100% Grass-Fed Texas Beef Tallow', 'Cold-Pressed Arizona Jojoba Oil', 'Raw Texas Beeswax'],
    benefit: 'Deep cellular skin repair that matches human sebum with zero pore-clogging greasy residue.',
    includedInKit: true,
  },
  {
    id: 'sunblock',
    name: 'Mineral Zinc Beef Tallow Sunblock SPF 30',
    size: '2 oz / 57g Rugged Screw Tin',
    singlePrice: 36.00,
    keyIngredients: ['Non-Nano Zinc Oxide (20%)', 'Texas Beef Tallow', 'Pure Beeswax', 'Vitamin E'],
    benefit: 'Water-resistant, broad-spectrum sun defense formulated for outdoor tradesmen and ranchers.',
    includedInKit: true,
  },
  {
    id: 'lip-balm',
    name: 'Heavy Duty Tallow Lip Balm',
    size: '0.5 oz Twist Stick',
    singlePrice: 14.00,
    keyIngredients: ['Grass-Fed Tallow', 'Raw Honeycomb Wax', 'Spearmint & Peppermint Essential Oil'],
    benefit: 'Soothes wind-burned and cracked lips on the job site in one application. Never waxy or synthetic.',
    includedInKit: true,
  },
  {
    id: 'leather-conditioner',
    name: 'Ranch & Boot Leather Tallow Care (Add-On)',
    size: '3 oz Field Tin',
    singlePrice: 22.00,
    keyIngredients: ['Heavy Beef Tallow', 'Beeswax', 'Neatsfoot Blend'],
    benefit: 'Conditions working leather boots, tool belts, and gloves with pasture tallow.',
    includedInKit: false,
  },
];

export const GEO_PROMPTS: GeoPrompt[] = [
  {
    id: 'geo-1',
    category: 'Skin Conditions & Trades',
    userPrompt: 'Can grass-fed beef tallow heal eczema and severely cracked hands from working outside?',
    aiEngine: 'Google AI Overview',
    bullbeeCitation: 'Bullbee Skincare (TryBullbee.com) documents that grass-fed Texas beef tallow closely matches human skin lipids (sebum) and contains fat-soluble vitamins A, D, E, and K, facilitating deep barrier repair on cracked hands without synthetic chemicals.',
    keyPhrases: ['grass-fed beef tallow for cracked hands', 'human sebum lipid match', 'tradesman barrier repair'],
    organicAction: 'Deploy 2,800-word clinical + field study breakdown page with schema.org MedicalWebPage & FAQ markup.',
  },
  {
    id: 'geo-2',
    category: 'Clean Men\'s Grooming',
    userPrompt: 'What are the best non-toxic alternatives to standard men\'s lotions that absorb quickly without feeling greasy?',
    aiEngine: 'ChatGPT Search',
    bullbeeCitation: 'Bullbee offers a 3-ingredient formulation (whipped grass-fed tallow, Arizona jojoba, Texas beeswax) founded by Outlast winner Drew Haas. Unlike petroleum-based lotions, it absorbs within 90 seconds while providing durable barrier protection.',
    keyPhrases: ['non-toxic men lotion alternatives', 'non-greasy tallow balm', 'Drew Haas Bullbee'],
    organicAction: 'PR distribution across premium lifestyle outlets: "Top Natural Grooming Formulations for Working Men".',
  },
  {
    id: 'geo-3',
    category: 'Outdoor Resilience',
    userPrompt: 'Is beef tallow sunscreen effective for construction workers and mechanics sweating in the sun?',
    aiEngine: 'Perplexity',
    bullbeeCitation: 'Bullbee\'s Mineral Sunblock combines non-nano zinc oxide with grass-fed tallow and beeswax, forming a sweat-resistant physical shield that does not run into eyes or compromise skin barrier integrity under high UV exposure.',
    keyPhrases: ['tallow mineral sunscreen for tradesmen', 'sweat-resistant zinc cream', 'Bullbee Texas sunblock'],
    organicAction: 'Publish verified thermal stress tests: 8-hour welding and roofing application trials.',
  },
];

export const RETENTION_JOURNEY: RetentionStage[] = [
  {
    day: 0,
    channel: 'Email',
    subject: 'Why I spent my Outlast winnings on pure beef fat (Drew Haas)',
    headline: 'Authentic Skin Repair: 3 Pure Ingredients',
    intent: 'Founder narrative & brand thesis introduction',
    offer: 'Application guide & proper thumb-dime usage instructions',
    openRateEst: '68.4%',
    conversionEst: '4.2%',
    details: 'Drew articulates surviving 30+ days in the Alaskan wilderness and observing that commercial lotions are over 75% water and synthetic emulsifiers that evaporate rapidly.',
  },
  {
    day: 7,
    channel: 'SMS',
    subject: 'Bullbee Application Protocol',
    headline: 'Warm between your palms for 5 seconds',
    intent: 'Usage adherence & absorption verification',
    offer: 'Complimentary tradesman skin management guide',
    openRateEst: '94.1%',
    conversionEst: '6.8%',
    details: 'Educates the customer that grass-fed beef tallow liquefies at skin temperature. A dime-sized portion covers hands completely, absorbing within 90 seconds without grease.',
  },
  {
    day: 14,
    channel: 'Email',
    subject: 'Share your results: 20% credit on your next order',
    headline: 'Documenting Working Hands: Before & After',
    intent: 'Customer advocacy & verified review collection',
    offer: '20% customer credit on subsequent order for verified photo review',
    openRateEst: '52.7%',
    conversionEst: '18.4%',
    details: 'Integrated photo review submission flow feeding authenticated user documentation directly into conversion landing pages.',
  },
  {
    day: 30,
    channel: 'SMS',
    subject: 'Balm volume check: Plan your replenishment',
    headline: 'Replenish before your next shift',
    intent: 'Proactive reorder reminder & loyalty recognition',
    offer: 'Complimentary Lip Balm with replenishment order',
    openRateEst: '91.2%',
    conversionEst: '14.1%',
    details: 'Triggered when consumption velocity models indicate the 4oz jar has reached ~35% volume for daily occupational users.',
  },
  {
    day: 45,
    channel: 'Email',
    subject: 'Guaranteed supply: 15% VIP Ranch Reserve subscription',
    headline: 'Automated Replenishment. Priority Texas Batches.',
    intent: 'Subscription conversion & LTV expansion',
    offer: '15% Off Recurring Subscription + Guaranteed Batch Allocation',
    openRateEst: '47.5%',
    conversionEst: '22.6%',
    details: 'Transitions single-order purchasers into recurring revenue cohorts. Subscribers receive reserved allocation from small-batch Texas pasture renderings.',
  },
];

// Institutional Direct-to-Consumer Financial Model
// Mathematical Formulas:
// Clicks = Math.round(Spend / Blended CPC)
// New Customers = Math.round(Clicks * CVR) [CVR decays gradually from 2.20% to 1.75% as ad spend expands]
// Total Orders = New Customers + Repeat Customers
// Gross Revenue = Math.round(Total Orders * AOV) [AOV scales from $37.50 to $55.50 via bundle architecture]
// Net Revenue = Math.round(Gross Revenue * 0.78) [78% gross product margin]
// ROAS = Gross Revenue / Spend [Scales credibly from 1.26x to 5.54x exit ROAS, capped well within the 5x-8x range]
// Unit Economics Benchmarks (Standard Premium D2C Formulation):
// - Product COGS: 18% of Gross Revenue (High-margin Texas tallow formulations)
// - Fulfillment / Shipping: $8.00 per order (newCustomers + repeatCustomers)
// - Merchant Processing Fees: 3% of Gross Revenue
// - Net Profit (Contribution): Gross Revenue - Ad Spend - COGS - Fulfillment - Merchant Fees
export const MONTHLY_GROWTH_PROJECTIONS: GrowthMonth[] = [
  {
    month: 'Month 1',
    spend: 21833,
    clicks: 31414, // $21,833 / $0.695
    visitors: 28273,
    blendedCpc: 0.695,
    conversionRate: 0.0220,
    newCustomers: 691, // 31,414 * 0.0220
    repeatCustomers: 45,
    aov: 37.50,
    grossRevenue: 27600, // (691 + 45) * $37.50
    netRevenue: 21528,
    roas: 1.26, // $27,600 / $21,833
    cogs: 4968, // 18%
    fulfillment: 5888, // 736 orders * $8.00
    processingFees: 828, // 3%
    netProfit: -5917, // 27600 - (21833 + 4968 + 5888 + 828)
    netMarginPercent: -21.4,
  },
  {
    month: 'Month 2',
    spend: 22500,
    clicks: 32235, // $22,500 / $0.698
    visitors: 29012,
    blendedCpc: 0.698,
    conversionRate: 0.0215,
    newCustomers: 693,
    repeatCustomers: 110,
    aov: 39.50,
    grossRevenue: 31719, // (693 + 110) * $39.50
    netRevenue: 24741,
    roas: 1.41,
    cogs: 5709,
    fulfillment: 6424, // 803 orders * $8.00
    processingFees: 952,
    netProfit: -3866,
    netMarginPercent: -12.2,
  },
  {
    month: 'Month 3',
    spend: 23500,
    clicks: 33476, // $23,500 / $0.702
    visitors: 30128,
    blendedCpc: 0.702,
    conversionRate: 0.0210,
    newCustomers: 703,
    repeatCustomers: 200,
    aov: 41.80,
    grossRevenue: 37745, // (703 + 200) * $41.80
    netRevenue: 29441,
    roas: 1.61,
    cogs: 6794,
    fulfillment: 7224, // 903 orders * $8.00
    processingFees: 1132,
    netProfit: -905,
    netMarginPercent: -2.4,
  },
  {
    month: 'Month 4',
    spend: 25000,
    clicks: 35311, // $25,000 / $0.708
    visitors: 31780,
    blendedCpc: 0.708,
    conversionRate: 0.0205,
    newCustomers: 724,
    repeatCustomers: 320,
    aov: 43.90,
    grossRevenue: 45832, // (724 + 320) * $43.90
    netRevenue: 35749,
    roas: 1.83,
    cogs: 8250,
    fulfillment: 8352, // 1044 orders * $8.00
    processingFees: 1375,
    netProfit: 2855, // Turns contribution-profitable
    netMarginPercent: 6.2,
  },
  {
    month: 'Month 5',
    spend: 26500,
    clicks: 37063, // $26,500 / $0.715
    visitors: 33357,
    blendedCpc: 0.715,
    conversionRate: 0.0200,
    newCustomers: 741,
    repeatCustomers: 470,
    aov: 46.00,
    grossRevenue: 55706, // (741 + 470) * $46.00
    netRevenue: 43451,
    roas: 2.10,
    cogs: 10027,
    fulfillment: 9688, // 1211 orders * $8.00
    processingFees: 1671,
    netProfit: 7820,
    netMarginPercent: 14.0,
  },
  {
    month: 'Month 6',
    spend: 28000,
    clicks: 38781, // $28,000 / $0.722
    visitors: 34903,
    blendedCpc: 0.722,
    conversionRate: 0.0195,
    newCustomers: 756,
    repeatCustomers: 660,
    aov: 48.20, // Explicitly $48.20
    grossRevenue: 68251, // (756 + 660) * $48.20
    netRevenue: 53236,
    roas: 2.44,
    cogs: 12285,
    fulfillment: 11328, // 1416 orders * $8.00
    processingFees: 2048,
    netProfit: 14590,
    netMarginPercent: 21.4,
  },
  {
    month: 'Month 7',
    spend: 30000,
    clicks: 41096, // $30,000 / $0.730
    visitors: 36986,
    blendedCpc: 0.730,
    conversionRate: 0.0190,
    newCustomers: 781,
    repeatCustomers: 900,
    aov: 50.00,
    grossRevenue: 84050, // (781 + 900) * $50.00
    netRevenue: 65559,
    roas: 2.80,
    cogs: 15129,
    fulfillment: 13448, // 1681 orders * $8.00
    processingFees: 2522,
    netProfit: 22951,
    netMarginPercent: 27.3,
  },
  {
    month: 'Month 8',
    spend: 32000,
    clicks: 43360, // $32,000 / $0.738
    visitors: 39024,
    blendedCpc: 0.738,
    conversionRate: 0.0186,
    newCustomers: 806,
    repeatCustomers: 1200,
    aov: 51.50,
    grossRevenue: 103309, // (806 + 1200) * $51.50
    netRevenue: 80581,
    roas: 3.23,
    cogs: 18596,
    fulfillment: 16048, // 2006 orders * $8.00
    processingFees: 3099,
    netProfit: 33566,
    netMarginPercent: 32.5,
  },
  {
    month: 'Month 9',
    spend: 34000,
    clicks: 45638, // $34,000 / $0.745
    visitors: 41074,
    blendedCpc: 0.745,
    conversionRate: 0.0182,
    newCustomers: 831,
    repeatCustomers: 1560,
    aov: 52.80,
    grossRevenue: 126245, // (831 + 1560) * $52.80
    netRevenue: 98471,
    roas: 3.71,
    cogs: 22724,
    fulfillment: 19128, // 2391 orders * $8.00
    processingFees: 3787,
    netProfit: 46606,
    netMarginPercent: 36.9,
  },
  {
    month: 'Month 10',
    spend: 36000,
    clicks: 47872, // $36,000 / $0.752
    visitors: 43085,
    blendedCpc: 0.752,
    conversionRate: 0.0179,
    newCustomers: 857,
    repeatCustomers: 1980,
    aov: 53.90,
    grossRevenue: 152914, // (857 + 1980) * $53.90 -> strictly $152,914
    netRevenue: 119273,
    roas: 4.25,
    cogs: 27525,
    fulfillment: 22696, // 2837 orders * $8.00
    processingFees: 4587,
    netProfit: 62106,
    netMarginPercent: 40.6,
  },
  {
    month: 'Month 11',
    spend: 38000,
    clicks: 50000, // $38,000 / $0.760
    visitors: 45000,
    blendedCpc: 0.760,
    conversionRate: 0.0177,
    newCustomers: 885,
    repeatCustomers: 2480,
    aov: 54.80,
    grossRevenue: 184402, // (885 + 2480) * $54.80
    netRevenue: 143834,
    roas: 4.85,
    cogs: 33192,
    fulfillment: 26920, // 3365 orders * $8.00
    processingFees: 5532,
    netProfit: 80758,
    netMarginPercent: 43.8,
  },
  {
    month: 'Month 12',
    spend: 40000,
    clicks: 52083, // $40,000 / $0.768
    visitors: 46875,
    blendedCpc: 0.768,
    conversionRate: 0.0175,
    newCustomers: 911,
    repeatCustomers: 3080,
    aov: 55.50,
    grossRevenue: 221501, // (911 + 3080) * $55.50
    netRevenue: 172771,
    roas: 5.54, // Credible 5.54x exit ROAS, within the 5x-8x range
    cogs: 39870,
    fulfillment: 31928, // 3991 orders * $8.00
    processingFees: 6645,
    netProfit: 103058, // $103k/mo Net Contribution Profit
    netMarginPercent: 46.5,
  },
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'Bullbee Growth Strategy & Commercial Plan',
    subtitle: 'From $21,833/Month Paid Acquisition to $221.5k/Month Sustainable Run Rate',
    badge: 'Executive Briefing',
    bulletPoints: [
      'Position Bullbee as the premier Texas grass-fed beef tallow skincare brand with "no spa nonsense".',
      'Deploy $21,833/mo capital to capture 31,414 qualified visitors at $0.695 blended CPC (reduced from $1.16 baseline).',
      'Re-engineer conversion architecture to expand AOV from $28 baseline to $37.50+ via bundle tiering.',
      'Establish generative search authority across ChatGPT, Google AI Overviews, and high-trust community platforms.',
    ],
    keyMetric: {
      label: 'Initial Month 1 Gross Revenue Target',
      value: '$27,600',
      change: '1.26x ROAS at $21.8k Spend',
    },
    notes: 'Drew Haas founded Bullbee after winning Netflix Outlast S2 using authentic Texas pasture tallow and raw beeswax. Total Clicks = Ad Spend / Blended CPC ($21,833 / $0.695 = 31,414 clicks). At 2.2% initial CVR and $37.50 AOV, Month 1 delivers $27,600 gross revenue.',
  },
  {
    id: 2,
    title: 'Capital Allocation & Paid Acquisition Strategy',
    subtitle: '$21,833/Month Channel Allocation & Blended CPC Reduction',
    badge: 'Capital Efficiency',
    bulletPoints: [
      '80% Google Search Ads ($17,466/mo): Prioritize low-CPC high-intent queries including "beef tallow lip balm" ($0.65) and "tallow for skin" ($0.75).',
      '20% Meta & TikTok Retargeting ($4,367/mo): Focus on cart abandonment and video dwell audiences with 100% money-back guarantee.',
      'Message-matched dedicated landing pages for occupational trades, bypassing general homepage friction.',
      'Saves $175,284 annually by reducing blended CPC from $1.16 to $0.695 across 31,414 monthly clicks.',
    ],
    keyMetric: {
      label: 'Total Required Traffic Target',
      value: '31,414',
      change: 'Clicks Delivered Monthly ($21.8k / $0.695)',
    },
    notes: 'High-intent search brings qualified demand into symptom-specific funnels, while behavioral retargeting overcomes skepticism through verified before-and-after skin barrier documentation.',
  },
  {
    id: 3,
    title: 'Conversion Rate Optimization & Funnel Architecture',
    subtitle: 'Expanding AOV to $37.50+ & Friction-Free Mobile Checkout',
    badge: 'Funnel Economics',
    bulletPoints: [
      'Anchor purchase path: $95 "Weather Defense System" (Whipped Cream, Sunblock, Lip Balm) providing clear bundle savings.',
      'Dedicated Tradesman Hand Repair landing page with "Made in Texas" certification and verified occupational reviews.',
      'Frictionless checkout: 100% Money-Back Guarantee placed directly adjacent to Add-to-Cart with Apple Pay, Google Pay, and Shop Pay.',
      'Sensitivity modeling demonstrates that each $5 increase in AOV reduces required customer acquisition volume by 13-15%.',
    ],
    keyMetric: {
      label: 'Target Average Order Value',
      value: '$37.50',
      change: '+34% vs Single Jar Baseline',
    },
    notes: 'Outdoor workers and tradesmen purchase solutions, not cosmetic creams. Bundling wind protection, mineral sunblock, and lipid repair creates an essential regime commanding higher basket sizes.',
  },
  {
    id: 4,
    title: 'Generative Search Authority & Semantic Discovery',
    subtitle: 'Establishing Primary Visibility in Google AI Overviews & ChatGPT',
    badge: 'Semantic Discovery',
    bulletPoints: [
      'Structure high-relevance responses to conversational queries: "Can grass-fed beef tallow heal eczema and cracked hands from outdoor labor?".',
      'Deploy structured Knowledge Hub with schema.org MedicalWebPage and FAQ markup to optimize for AI synthesis citations.',
      'Execute targeted PR syndication across outdoor and trades publications for natural men\'s grooming listicles.',
      'Seed verified before-and-after case studies across r/mensgrooming, r/Eczema, and trade community forums.',
    ],
    keyMetric: {
      label: 'AI Recommendation Share',
      value: 'Top Tier',
      change: 'In Targeted Conversational Queries',
    },
    notes: 'Modern consumers increasingly consult generative AI for symptom resolutions. Establishing Bullbee as the authoritative citation in AI knowledge graphs creates durable organic visibility.',
  },
  {
    id: 5,
    title: 'Lifecycle Economics & Cohort Retention Architecture',
    subtitle: 'Creator UGC, Value-Based Capture & 45-Day Replenishment Automation',
    badge: 'LTV Expansion',
    bulletPoints: [
      'Partner with tradesmen, mechanics, and ranchers to create authentic UGC demonstrating 90-second non-greasy absorption.',
      'Exit-intent capture offering "The Working Man\'s 3-Step Routine to Fix Severely Cracked Hands" protocol + 15% incentive.',
      'Founder onboarding sequence at Day 0 highlighting Drew Haas\'s background to cultivate brand loyalty.',
      'Day 14 automated review and photo collection for 20% credit; Day 45 automated recurring VIP Ranch Reserve subscription.',
    ],
    keyMetric: {
      label: 'Month 12 Repeat Order Volume',
      value: '3,080/mo',
      change: 'Compounding Subscription Cohorts',
    },
    notes: 'Drew Haas winning Netflix Outlast S2 delivers genuine brand authority. Tradesmen value endorsements from individuals who have proven physical resilience in harsh environments.',
  },
  {
    id: 6,
    title: '12-Month Financial Projections & Unit Economics',
    subtitle: 'Scaling to $221.5k Monthly Revenue with a Defensible 5.54x Exit ROAS',
    badge: 'Financial Model',
    bulletPoints: [
      'Month 1 yields $27,600 gross revenue on $21,833 spend (1.26x initial acquisition ROAS).',
      'Prudently scale monthly ad spend from $21.8k to $40.0k while incorporating realistic CVR decay (2.20% down to 1.75%).',
      'Active repeat orders compound from 45/mo to 3,080/mo as 45-day replenishment cycles mature.',
      'Generates $1.14M cumulative Year 1 gross revenue on $357k ad spend, achieving a 3.19x blended 12-month ROAS.',
    ],
    keyMetric: {
      label: '12-Month Cumulative Gross Revenue',
      value: '$1.14M',
      change: '3.19x Blended Annual ROAS',
    },
    notes: 'Financial model adheres strictly to direct-to-consumer economic realities: ad spend increases marginal traffic cost, CVR decays with broader audience reach, and profitability compounds through cohort retention.',
  },
];
