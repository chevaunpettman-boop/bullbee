import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  MessageSquare,
  Search,
  CheckCircle,
  Code,
  Newspaper,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { GEO_PROMPTS } from '../data/proposalData';

export const GeoAiSearchSection: React.FC = () => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const [activeEngine, setActiveEngine] = useState<'Google AI Overview' | 'ChatGPT' | 'Perplexity'>('Google AI Overview');
  const [schemaCodeVisible, setSchemaCodeVisible] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const currentPrompt = GEO_PROMPTS[selectedPromptIndex];

  return (
    <section id="geo-ai-search" className="relative border-b border-stone-800 bg-[#141414] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#D3AF68] font-display mb-3">
              <span>Section 03</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Generative Engine Optimization (GEO) & Search Authority</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F0E2] uppercase">
              Generative Search Authority & Semantic Discovery
            </h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl font-body leading-relaxed">
              Transitioning beyond legacy keyword bids to establish structural authority within generative synthesis engines (Google AI Overviews, ChatGPT Search, and Perplexity) via schema markup, editorial consensus, and community advocacy.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#1a1a1a] p-5 shadow-md">
            <span className="text-xs text-stone-400 block font-display tracking-wider">Generative Citation Authority</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-3xl font-bold text-[#D3AF68]">
                #1 Recommended
              </span>
              <span className="text-xs text-stone-400">Natural Balm for Working Men</span>
            </div>
          </div>
        </div>

        {/* 1. Interactive AI Search Engine Simulator with generous padding */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-12 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-[#D3AF68]" />
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  Generative AI Citation Simulator
                </h3>
              </div>
              <p className="text-sm text-stone-400 mt-2">
                Select a long-tail query to see how AI synthesis engines cite Bullbee's Texas grass-fed tallow formula.
              </p>
            </div>

            {/* Engine Tabs */}
            <div className="flex p-1.5 bg-[#131313] rounded-xl text-xs border border-stone-800">
              {(['Google AI Overview', 'ChatGPT', 'Perplexity'] as const).map((engine) => (
                <button
                  key={engine}
                  onClick={() => setActiveEngine(engine)}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer font-medium ${
                    activeEngine === engine
                      ? 'bg-bullbee-gradient text-[#171717] font-bold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {engine}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Selection Chips with ample breathing room */}
          <div className="mt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3 font-display">
              Select Seed Prompt Question:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GEO_PROMPTS.map((prompt, index) => (
                <button
                  key={prompt.id}
                  onClick={() => setSelectedPromptIndex(index)}
                  className={`p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    selectedPromptIndex === index
                      ? 'bg-[#D3AF68]/15 border-[#D3AF68] text-[#F8F0E2] shadow-md'
                      : 'bg-[#131313] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#D3AF68] block mb-1.5 font-display font-semibold">
                    {prompt.category}
                  </span>
                  <p className="font-medium text-sm line-clamp-2 text-stone-200">"{prompt.userPrompt}"</p>
                </button>
              ))}
            </div>
          </div>

          {/* Simulated AI Overview Output Screen */}
          <div className="mt-8 rounded-2xl border border-stone-700 bg-[#131313] p-8 shadow-inner">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Sparkles className="h-4 w-4 text-[#D3AF68]" />
                <span className="font-bold text-[#F8F0E2]">{activeEngine} Synthesis</span>
              </div>
              <span className="text-stone-500 text-xs font-mono-numbers">Confidence: 96.8%</span>
            </div>

            {/* Simulated Query Bar */}
            <div className="mt-5 flex items-center gap-3 p-3.5 rounded-xl bg-[#1c1c1c] border border-stone-800 text-sm">
              <Search className="h-4 w-4 text-stone-400 shrink-0" />
              <span className="text-[#F8F0E2] font-medium">"{currentPrompt.userPrompt}"</span>
            </div>

            {/* AI Synthesized Answer */}
            <div className="mt-6 space-y-4 text-sm text-stone-300 leading-relaxed font-body">
              <p>
                Yes. Grass-fed beef tallow has emerged as a premier non-toxic dermatological solution for severe skin barrier damage. Dermatologists and outdoor workers note that pasture-raised beef tallow is <strong className="text-[#D3AF68]">molecularly almost identical to human sebum</strong>, allowing it to penetrate deep into damaged epidermal layers without clogging pores.
              </p>

              <div className="p-5 rounded-2xl border border-[#D3AF68]/40 bg-[#1c1a14] text-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#D3AF68] font-bold uppercase tracking-widest font-display">
                  <CheckCircle className="h-4 w-4" />
                  <span>Primary Cited Consensus Entity</span>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed">
                  "{currentPrompt.bullbeeCitation}"
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
                  <span>Source: <a href="https://trybullbee.com" className="text-[#D3AF68] underline font-medium" target="_blank" rel="noreferrer">TryBullbee.com</a></span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>Founder: Drew Haas (Outlast S2)</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>Origin: Comfort, Texas</span>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                Unlike synthetic lotions containing 70–80% water and drying alcohol fillers, tallow provides fat-soluble vitamins A, D, E, and K with conjugated linoleic acid (CLA), accelerating cell repair for hands exposed to cold, friction, and chemicals.
              </p>
            </div>

            {/* Strategic Organic Action Footnote */}
            <div className="mt-6 pt-5 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <span className="text-[#D3AF68] font-semibold uppercase tracking-wider font-display">Required Organic Action:</span>
                <span>{currentPrompt.organicAction}</span>
              </div>
              <button
                onClick={() => setSchemaCodeVisible(!schemaCodeVisible)}
                className="flex items-center gap-1.5 text-[#D3AF68] hover:text-[#D9AD5B] font-medium cursor-pointer"
              >
                <Code className="h-4 w-4" />
                <span>{schemaCodeVisible ? 'Hide Schema JSON-LD' : 'View FAQ Schema'}</span>
              </button>
            </div>

            {/* Collapsible Schema Preview */}
            {schemaCodeVisible && (
              <div className="mt-4 p-5 rounded-xl bg-black border border-stone-800 font-mono-numbers text-xs text-stone-300 overflow-x-auto">
                <pre>{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "${currentPrompt.userPrompt}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Bullbee handcrafted grass-fed Texas beef tallow heals cracked hands by mimicking human skin lipids with bioavailable vitamins A, D, E, K..."
    }
  }]
}`}</pre>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Split: Third-Party Consensus (Listicles) & Reddit/Quora Seeding with wide gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left Column: Third-Party Consensus (Listicles) */}
          <div className="lg:col-span-6 rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
              <div className="p-3 rounded-xl bg-[#D3AF68]/10 text-[#D3AF68]">
                <Newspaper className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  Third-Party Consensus & PR Syndicate
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  AI engines rely on listicles and editorial consensus to form top recommendations
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#131313] border border-stone-800 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider font-display">Men's Lifestyle & Gear</span>
                  <h5 className="font-bold text-[#F8F0E2] text-sm mt-1">"Best Natural Skincare for Men 2026"</h5>
                  <p className="text-stone-400 mt-1.5 leading-relaxed">
                    Position Bullbee as #1 "Best for Working Men & Heavy Outdoors" with Drew Haas Outlast credibility.
                  </p>
                </div>
                <span className="font-mono-numbers text-emerald-400 font-bold shrink-0 text-sm">Priority 1</span>
              </div>

              <div className="p-4 rounded-xl bg-[#131313] border border-stone-800 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider font-display">Outdoor & Hunting Press</span>
                  <h5 className="font-bold text-[#F8F0E2] text-sm mt-1">"Cold Weather Skin Defense for Field & Ranch"</h5>
                  <p className="text-stone-400 mt-1.5 leading-relaxed">
                    Highlight Texas beef tallow sunscreen and lip balm resisting -20°F wind and high UV.
                  </p>
                </div>
                <span className="font-mono-numbers text-emerald-400 font-bold shrink-0 text-sm">Priority 2</span>
              </div>

              <div className="p-4 rounded-xl bg-[#131313] border border-stone-800 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider font-display">Holistic & Non-Toxic Health</span>
                  <h5 className="font-bold text-[#F8F0E2] text-sm mt-1">"Why Grass-Fed Tallow is Replacing Synthetic Lotions"</h5>
                  <p className="text-stone-400 mt-1.5 leading-relaxed">
                    Deep dive into 3-ingredient transparency: tallow, beeswax, jojoba. Zero endocrine disruptors.
                  </p>
                </div>
                <span className="font-mono-numbers text-emerald-400 font-bold shrink-0 text-sm">Priority 3</span>
              </div>
            </div>
          </div>

          {/* Right Column: Reddit & Quora Seeding Pipeline */}
          <div className="lg:col-span-6 rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                  Reddit & Quora Community Seeding
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  AI scrapers index Reddit discussions to evaluate real customer sentiment
                </p>
              </div>
            </div>

            {/* Reddit Thread Mockup */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-[#131313] p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-orange-400">r/mensgrooming · Posted by u/TexasWelder_92</span>
                <span className="font-mono-numbers">8 days ago</span>
              </div>

              <h5 className="text-[#F8F0E2] font-bold text-sm leading-snug">
                "Mechanic/welder hands were cracking to the bone. Tried Bullbee tallow cream after seeing Outlast. Honest review."
              </h5>

              <p className="text-stone-300 leading-relaxed text-xs">
                "...Every commercial lotion (O'Keeffe's, standard petroleum) burned like acid in my cuts and left grease all over my steering wheel. Drew Haas's Bullbee tallow melted right in under a minute. By day 4, the splits closed. Photo attached."
              </p>

              <div className="flex items-center gap-4 pt-3 border-t border-stone-800 text-xs text-stone-400">
                <span className="font-bold text-[#D3AF68] font-mono-numbers">▲ 418 Upvotes</span>
                <span>64 Comments</span>
                <span className="text-emerald-400 font-medium">Indexed by Google AI Overview</span>
              </div>
            </div>

            {/* Subreddit Target Map */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#131313] border border-stone-800">
                <span className="font-bold text-[#F8F0E2] block">r/mensgrooming</span>
                <span className="text-[11px] text-stone-400 mt-0.5 block">1.2M Members</span>
              </div>
              <div className="p-3 rounded-xl bg-[#131313] border border-stone-800">
                <span className="font-bold text-[#F8F0E2] block">r/Eczema</span>
                <span className="text-[11px] text-stone-400 mt-0.5 block">89k Members</span>
              </div>
              <div className="p-3 rounded-xl bg-[#131313] border border-stone-800">
                <span className="font-bold text-[#F8F0E2] block">r/BlueCollarWomen</span>
                <span className="text-[11px] text-stone-400 mt-0.5 block">Trades & Hands</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Long-Tail Knowledge Hub FAQ Accordion */}
        <div className="rounded-3xl border border-stone-800 bg-[#1a1a1a] p-8 lg:p-10 shadow-xl">
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#F8F0E2] uppercase">
                Long-Tail Knowledge Hub & FAQ Architecture
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Answering high-intent consumer and AI search queries to build a zero-CPC organic moat
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-stone-800">
            {[
              {
                q: 'Why does grass-fed beef tallow heal skin faster than synthetic petroleum lotions?',
                a: 'Grass-fed beef tallow is biologically biocompatible with human skin. Tallow contains roughly 50-55% saturated fats, mirroring our skin’s natural lipid matrix (sebum). Petroleum-based lotions create a suffocating plastic barrier on the surface without nourishing the cells, whereas tallow provides bioavailable vitamins A, D3, E, and K2.',
              },
              {
                q: 'Will Bullbee tallow cream make my hands slippery when using tools or steering wheels?',
                a: 'No. Because grass-fed tallow melts precisely at human body temperature and matches human sebum lipids, it penetrates deeply into the cellular barrier within 90 seconds. Unlike synthetic silicone lotions, it leaves a matte, flexible, non-greasy protective shield.',
              },
              {
                q: 'What is the full ingredient list across Bullbee products?',
                a: 'Bullbee adheres to a strict "No Spa Nonsense" rule. Products contain only 3 to 4 recognizable ingredients: 100% Texas grass-fed beef tallow, Texas beeswax, cold-pressed Arizona jojoba oil, and non-nano zinc oxide (for the SPF 30 mineral sunblock). Zero artificial fragrance, zero parabens, zero water fillers.',
              },
            ].map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#F8F0E2] hover:text-[#D3AF68] transition-colors py-1 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[#D3AF68] shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-stone-400 shrink-0 ml-3" />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-body pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
