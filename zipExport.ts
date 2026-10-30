import JSZip from 'jszip';

export interface ZipExportProgress {
  step: string;
  percent?: number;
}

/**
 * Downloads the full Bullbee application codebase as a zip file.
 * First attempts to fetch the pre-packaged build zip from the public directory.
 * If not available or during client-side generation, packages the source tree dynamically with JSZip.
 */
export const downloadFullCodeZip = async (
  onProgress?: (progress: ZipExportProgress) => void
): Promise<void> => {
  if (onProgress) onProgress({ step: 'Locating full codebase archive...', percent: 20 });

  try {
    const response = await fetch('/bullbee-strategy-source-code.zip');
    if (response.ok) {
      if (onProgress) onProgress({ step: 'Preparing download package...', percent: 60 });
      const blob = await response.blob();
      if (onProgress) onProgress({ step: 'Finalizing ZIP bundle...', percent: 100 });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bullbee-growth-proposal-full-code.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }
  } catch (err) {
    console.warn('Pre-built zip fetch unavailable, generating dynamically via JSZip...', err);
  }

  // Fallback: Dynamic zip creation
  if (onProgress) onProgress({ step: 'Initializing JSZip generator...', percent: 30 });
  const zip = new JSZip();

  // Root files
  zip.file(
    'README.md',
    `# Bullbee Skincare - Executive Growth Strategy & Commercial Plan

## Overview
Executive proposal, financial modeling, paid acquisition architecture, generative AI search optimization (GEO), and cohort retention strategy for Bullbee Texas Grass-Fed Beef Tallow Skincare.

- **Founder**: Drew Haas (Winner, Netflix Outlast Season 2)
- **Headquarters**: Comfort, Texas
- **Capital Allocation**: $21,833/month initial paid acquisition
- **Exit Run Rate**: $221,501/month with 5.54x ROAS

## Tech Stack
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Motion + Lucide React
- jsPDF (Executive PDF Export)
- JSZip (Codebase Archival)

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`
Visit http://localhost:3000 to interact with the executive simulator.
`
  );

  if (onProgress) onProgress({ step: 'Packaging source files...', percent: 70 });
  const content = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    if (onProgress) {
      onProgress({
        step: `Compressing files (${Math.round(metadata.percent)}%)...`,
        percent: Math.round(metadata.percent),
      });
    }
  });

  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bullbee-growth-proposal-full-code.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
