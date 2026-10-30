import React from 'react';
import { Presentation, ShieldCheck, FileArchive } from 'lucide-react';
import { downloadFullCodeZip } from '../utils/zipExport';

interface HeaderProps {
  onOpenDeck: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDeck,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-[#171717]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4 sm:px-8 lg:px-12">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bullbee-gradient text-[#171717] shadow-sm">
              <span className="font-display font-bold text-xl tracking-wider">B</span>
            </div>
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#F8F0E2] group-hover:text-[#D3AF68] transition-colors whitespace-nowrap shrink-0">
              BULLBEE
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <button
            onClick={() => onNavigate('paid-strategy')}
            className={`whitespace-nowrap transition-colors hover:text-[#D3AF68] ${
              activeSection === 'paid-strategy' ? 'text-[#D3AF68] font-semibold' : ''
            }`}
          >
            01. Paid Strategy
          </button>
          <button
            onClick={() => onNavigate('cro-funnel')}
            className={`whitespace-nowrap transition-colors hover:text-[#D3AF68] ${
              activeSection === 'cro-funnel' ? 'text-[#D3AF68] font-semibold' : ''
            }`}
          >
            02. Funnel & AOV
          </button>
          <button
            onClick={() => onNavigate('geo-ai-search')}
            className={`whitespace-nowrap transition-colors hover:text-[#D3AF68] ${
              activeSection === 'geo-ai-search' ? 'text-[#D3AF68] font-semibold' : ''
            }`}
          >
            03. AI Search (GEO)
          </button>
          <button
            onClick={() => onNavigate('retention-lifecycle')}
            className={`whitespace-nowrap transition-colors hover:text-[#D3AF68] ${
              activeSection === 'retention-lifecycle' ? 'text-[#D3AF68] font-semibold' : ''
            }`}
          >
            04. Retention & UGC
          </button>
          <button
            onClick={() => onNavigate('growth-projections')}
            className={`whitespace-nowrap transition-colors hover:text-[#D3AF68] ${
              activeSection === 'growth-projections' ? 'text-[#D3AF68] font-semibold' : ''
            }`}
          >
            05. 12-Mo Financials
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#CC9C52] font-medium mr-1">
            <ShieldCheck className="h-4 w-4 text-[#D3AF68]" />
            <span className="whitespace-nowrap font-mono-numbers">Plan Target: $21.8k/mo</span>
          </div>
          <button
            onClick={async () => {
              try {
                await downloadFullCodeZip();
              } catch (e) {
                console.error(e);
              }
            }}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-stone-700 bg-[#211E1A] px-3.5 py-2 text-xs font-semibold text-stone-200 hover:border-[#D3AF68] hover:text-[#D3AF68] transition-all cursor-pointer shadow-sm"
            title="Download full application source code as a ZIP archive"
          >
            <FileArchive className="h-3.5 w-3.5 text-[#D3AF68]" />
            <span>Download Code (.zip)</span>
          </button>
          <button
            onClick={onOpenDeck}
            className="flex items-center gap-2 rounded-lg bg-bullbee-gradient px-5 py-2.5 text-xs font-bold text-[#171717] hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Presentation className="h-4 w-4" />
            <span>Present Deck</span>
          </button>
        </div>
      </div>
    </header>
  );
};
