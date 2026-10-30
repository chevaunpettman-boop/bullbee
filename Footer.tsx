import React from 'react';
import { ArrowUp, ShieldCheck, FileArchive } from 'lucide-react';
import { BRAND_CONFIG } from '../data/proposalData';
import { downloadFullCodeZip } from '../utils/zipExport';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800 bg-[#0D0906] py-16 text-stone-400 font-body">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bullbee-gradient text-[#171717] font-display font-bold text-base shadow-sm">
                B
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-[#F8F0E2]">
                BULLBEE
              </span>
            </div>
            <p className="mt-3 text-sm text-stone-400 max-w-md leading-relaxed">
              Handcrafted in Comfort, Texas. 100% grass-fed beef tallow skincare built for tradesmen, outdoor workers, and real skin repair. No spa nonsense.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-sm text-stone-300 font-medium">
            <button
              onClick={() => onNavigate('paid-strategy')}
              className="hover:text-[#D3AF68] transition-colors cursor-pointer"
            >
              Paid Strategy
            </button>
            <button
              onClick={() => onNavigate('cro-funnel')}
              className="hover:text-[#D3AF68] transition-colors cursor-pointer"
            >
              Funnel & CRO
            </button>
            <button
              onClick={() => onNavigate('geo-ai-search')}
              className="hover:text-[#D3AF68] transition-colors cursor-pointer"
            >
              AI Search (GEO)
            </button>
            <button
              onClick={() => onNavigate('retention-lifecycle')}
              className="hover:text-[#D3AF68] transition-colors cursor-pointer"
            >
              Lifecycle Retention
            </button>
            <button
              onClick={() => onNavigate('growth-projections')}
              className="hover:text-[#D3AF68] transition-colors cursor-pointer"
            >
              12-Mo Financials
            </button>
            <button
              onClick={() => downloadFullCodeZip()}
              className="flex items-center gap-1.5 text-[#D3AF68] hover:underline transition-colors cursor-pointer font-semibold"
            >
              <FileArchive className="h-3.5 w-3.5" />
              <span>Download Code (.zip)</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl border border-stone-800 bg-[#171717] px-4 py-2.5 text-xs font-semibold text-stone-300 hover:text-[#D3AF68] hover:border-[#D3AF68]/50 transition-colors cursor-pointer shrink-0"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Back to Top</span>
          </button>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#D3AF68]" />
            <span>Bullbee Skincare (TryBullbee.com) · Founder: Drew Haas (Outlast S2 Winner)</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-500 font-mono-numbers">
            <span>Confidential Executive Strategy Proposal</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
