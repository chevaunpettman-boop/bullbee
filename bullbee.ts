export interface GrowthMonth {
  month: string;
  spend: number;
  clicks: number;
  visitors: number;
  blendedCpc: number;
  conversionRate: number;
  newCustomers: number;
  repeatCustomers: number;
  aov: number;
  grossRevenue: number;
  netRevenue: number;
  roas: number;
  cogs: number;
  fulfillment: number;
  processingFees: number;
  netProfit: number;
  netMarginPercent: number;
}


export interface AdKeyword {
  keyword: string;
  cpc: number;
  intent: 'High Commercial' | 'Direct Product' | 'Symptom / Problem';
  projectedClicks: number;
  cost: number;
  recommendation: string;
}

export interface BundleProduct {
  id: string;
  name: string;
  size: string;
  singlePrice: number;
  keyIngredients: string[];
  benefit: string;
  includedInKit: boolean;
}

export interface GeoPrompt {
  id: string;
  category: string;
  userPrompt: string;
  aiEngine: 'Google AI Overview' | 'ChatGPT Search' | 'Perplexity';
  bullbeeCitation: string;
  keyPhrases: string[];
  organicAction: string;
}

export interface RetentionStage {
  day: number;
  channel: 'Email' | 'SMS' | 'Push';
  subject: string;
  headline: string;
  intent: string;
  offer: string;
  openRateEst: string;
  conversionEst: string;
  details: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  bulletPoints: string[];
  keyMetric: {
    label: string;
    value: string;
    change: string;
  };
  notes: string;
}
