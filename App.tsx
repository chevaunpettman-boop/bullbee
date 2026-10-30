/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroExecutive } from './components/HeroExecutive';
import { PaidStrategySection } from './components/PaidStrategySection';
import { CroFunnelSection } from './components/CroFunnelSection';
import { GeoAiSearchSection } from './components/GeoAiSearchSection';
import { RetentionSection } from './components/RetentionSection';
import { GrowthProjectionsSection } from './components/GrowthProjectionsSection';
import { StakeholderDeckModal } from './components/StakeholderDeckModal';
import { Footer } from './components/Footer';

export default function App() {
  const [deckOpen, setDeckOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#F8F0E2] selection:bg-[#D3AF68] selection:text-[#171717] font-body">
      {/* Top Header */}
      <Header
        onOpenDeck={() => setDeckOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Executive Hero & Brand Identity */}
        <HeroExecutive
          onOpenDeck={() => setDeckOpen(true)}
          onNavigate={scrollToSection}
        />

        {/* Section 01: Paid Acquisition & Financial Strategy */}
        <PaidStrategySection />

        {/* Section 02: CRO & Funnel Architecture */}
        <CroFunnelSection />

        {/* Section 03: AI Search (GEO) & Organic SEO */}
        <GeoAiSearchSection />

        {/* Section 04: Social Commerce & Lifecycle Retention */}
        <RetentionSection />

        {/* Section 05: Financial Projections & 12-Month Model */}
        <GrowthProjectionsSection />
      </main>

      {/* Quiet Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Stakeholder Slide Presentation Deck Modal */}
      <StakeholderDeckModal
        isOpen={deckOpen}
        onClose={() => setDeckOpen(false)}
      />
    </div>
  );
}
