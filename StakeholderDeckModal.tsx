import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Download,
  Loader2,
  Check,
  FileArchive
} from 'lucide-react';
import { PRESENTATION_SLIDES, BRAND_CONFIG } from '../data/proposalData';
import { generateBrandedPdf } from '../utils/pdfExport';
import { downloadFullCodeZip } from '../utils/zipExport';
import confetti from 'canvas-confetti';

interface StakeholderDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StakeholderDeckModal: React.FC<StakeholderDeckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      setExportSuccess(false);
      await generateBrandedPdf((status) => setExportStatus(status));
      setExportSuccess(true);
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D3AF68', '#D9AD5B', '#D09931', '#F8F0E2'],
      });
      setTimeout(() => {
        setExportSuccess(false);
        setExportStatus('');
      }, 4000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setExportStatus('Export error occurred. Please try again.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0D0906] text-[#F8F0E2] select-none">
      {/* Top Deck Navigation Bar */}
      <div className="flex items-center justify-between border-b border-stone-800 bg-[#171717] px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bullbee-gradient text-[#171717] font-display font-bold text-base shadow-sm">
            B
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-wider text-[#F8F0E2]">
              BULLBEE PITCH DECK
            </span>
            <span className="text-stone-500 text-xs hidden sm:inline ml-3">|</span>
            <span className="text-xs text-stone-400 hidden sm:inline ml-3 font-mono-numbers">
              Slide {currentSlideIndex + 1} of {PRESENTATION_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-3">
          {/* Download as PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer ${
              exportSuccess
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-bullbee-gradient text-[#171717] hover:brightness-110 disabled:opacity-50'
            }`}
            title="Export Growth Strategy & Projections into branded PDF report"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Exporting PDF...</span>
                <span className="sm:hidden">Exporting...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download as PDF</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
          </button>

          <button
            onClick={async () => {
              try {
                await downloadFullCodeZip();
              } catch (e) {
                console.error(e);
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-stone-800 bg-[#211E1A] text-stone-200 hover:border-[#D3AF68] hover:text-[#D3AF68] transition-colors cursor-pointer"
            title="Download full project code as a ZIP archive"
          >
            <FileArchive className="h-3.5 w-3.5 text-[#D3AF68]" />
            <span>Code (.zip)</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              showNotes
                ? 'bg-[#D3AF68]/20 text-[#D3AF68] border border-[#D3AF68]/40'
                : 'text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-stone-800 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Close Presentation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating PDF Generation Status Toast */}
      {isExportingPdf && exportStatus && (
        <div className="bg-[#1F1B14] border-b border-[#D3AF68]/40 px-6 py-2.5 text-xs text-[#D3AF68] flex items-center justify-between animate-in fade-in shrink-0">
          <div className="flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D3AF68]" />
            <span>{exportStatus}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono-numbers">Generating 3-Page Executive PDF</span>
        </div>
      )}

      {/* Main Slide Canvas - FULLY SCROLLABLE WITH min-h-0 and overscroll-contain */}
      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 w-full p-4 sm:p-8 lg:p-12">
        <div className="min-h-full flex flex-col justify-start items-center py-4 sm:py-8">
          <div className="w-full max-w-5xl rounded-3xl border border-stone-800 bg-[#171717] p-8 sm:p-12 lg:p-14 shadow-2xl relative my-auto shrink-0">
            {/* Ambient Bullbee Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#D3AF68]/10 blur-3xl" />

            {/* Slide Kicker */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D3AF68] font-display">
                {currentSlide.badge}
              </span>
              <span className="text-xs text-stone-400 font-mono-numbers">
                {BRAND_CONFIG.headquarters} · Texas Grass-Fed
              </span>
            </div>

            {/* Slide Title */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F8F0E2] leading-tight">
              {currentSlide.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#CC9C52] font-medium font-body">
              {currentSlide.subtitle}
            </p>

            {/* Slide Content: Bullets + Metric Box */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-stone-800/90 pt-10">
              {/* Bullets */}
              <div className="lg:col-span-8 space-y-5">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D3AF68]/20 text-[#D3AF68] text-xs shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-body">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Metric Feature Box */}
              <div className="lg:col-span-4 rounded-2xl border border-stone-800 bg-[#131313] p-8 text-center space-y-3 shadow-inner">
                <span className="text-xs text-stone-400 uppercase tracking-widest block font-medium font-display">
                  {currentSlide.keyMetric.label}
                </span>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#D3AF68] font-mono-numbers block">
                  {currentSlide.keyMetric.value}
                </span>
                <span className="text-xs text-emerald-400 font-semibold block pt-1">
                  {currentSlide.keyMetric.change}
                </span>
              </div>
            </div>

            {/* Speaker Notes Drawer */}
            {showNotes && (
              <div className="mt-10 rounded-2xl border border-stone-800 bg-[#111111] p-6 text-xs text-stone-300">
                <span className="font-bold text-[#D3AF68] block mb-2 uppercase tracking-widest font-display text-xs">
                  Executive Presenter Context:
                </span>
                <p className="leading-relaxed font-body text-stone-300 text-sm">
                  {currentSlide.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Deck Toolbar & Thumbnails */}
      <div className="border-t border-stone-800 bg-[#171717] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1.5 rounded-lg border border-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-300 hover:bg-stone-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))
            }
            disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
            className="flex items-center gap-1.5 rounded-lg bg-bullbee-gradient px-5 py-2.5 text-xs font-bold text-[#171717] hover:brightness-110 disabled:opacity-40 transition-colors cursor-pointer shadow-sm"
          >
            <span>Next Slide</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-xs font-semibold text-stone-300 hover:text-[#D3AF68] hover:border-[#D3AF68]/40 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-[#D3AF68]" />
            <span>Download Report (PDF)</span>
          </button>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex items-center gap-2.5">
          {PRESENTATION_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'w-10 bg-[#D3AF68]'
                  : 'w-2.5 bg-stone-700 hover:bg-stone-500'
              }`}
              title={`Slide ${idx + 1}: ${slide.title}`}
            />
          ))}
        </div>

        {/* Keyboard hint */}
        <div className="text-[11px] text-stone-500 hidden md:block font-mono-numbers">
          Use ← / → arrows or Spacebar to navigate
        </div>
      </div>
    </div>
  );
};
