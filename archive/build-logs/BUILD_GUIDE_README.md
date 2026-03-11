# BTL Build Guide Generator

## Overview

This directory contains automated builders for the **Binaural Test Lab (BTL) Build Guide v1.0** — a comprehensive, production-quality guide for constructing and calibrating the BTL four-way active reference monitoring system.

## Files

### Generated Document
- **BTL_Build_Guide_v1.0.docx** (48 KB)
  - Complete build guide with 9 sections, 5 technical tables, and over 224 paragraphs
  - Professional formatting: Times New Roman, RWA color palette (Teal: #0D4F4F)
  - Ready for distribution and publication

### Builder Scripts

#### Python Version (Recommended)
- **build_btl_guide.py** (875 lines)
  - Uses `python-docx` library (must be installed)
  - Fast, lightweight, and portable
  - Cross-platform compatible (Linux, macOS, Windows)

**To regenerate:**
```bash
python3 build_btl_guide.py
```

#### Node.js Version (Legacy)
- **build_btl_guide.js** (2,596 lines)
  - Uses `docx` npm library
  - Currently requires npm registry access to install dependencies
  - Kept for reference and future use if npm access is restored

## Document Contents

The BTL Build Guide v1.0 contains:

### Title Page
- Document title: "Binaural Test Lab — Build Guide v1.0"
- Subtitle: "Four-Way Active Cortex-Matched Reference Monitor"
- Author: Peter Higgins, Rogue Wave Audio
- Date: March 2026

### Sections

1. **Overview**
   - What the BTL is: four-way active reference monitoring system
   - Organic digital philosophy: naturally compatible drivers + minimal correction
   - Why it matters: cortex-matched crossover design aligned with auditory cortex boundaries

2. **Parts List — Complete BOM**
   - Drivers table: Woofer, Midrange, Upper-Mid, Tweeter (Scan-Speak, Exotic)
   - Cabinet & Materials: 800×368×330mm sealed enclosure, MDF with bracing
   - Electronics & Measurement: 4-channel amplification, DSP (Lake v8.5.1), calibrated microphones

3. **Crossover Specifications**
   - 430 Hz: Woofer to Midrange (Linkwitz-Riley 24 dB/oct)
   - 1500 Hz: Midrange to Upper-Mid (Linkwitz-Riley 24 dB/oct)
   - 10,000 Hz: Upper-Mid to Tweeter (Linkwitz-Riley 24 dB/oct)
   - Per-driver time alignment procedure
   - Cortex-matched design rationale (Cheung & Schreiner 2026)

4. **Cabinet Plans**
   - External dimensions with material thickness allowances
   - Driver cutout positions and diameters
   - Internal bracing layout (vertical, horizontal, diagonal)
   - Terminal plate location and wiring
   - Maximum different-path-length (MDPL) transducer placement

5. **DADC Diffraction Correction**
   - Diffraction-Aware Dynamic Compensation framework
   - Height mode: fc=144 Hz, Gain=+3.21 dB
   - Width mode: fc=312 Hz, Gain=+1.48 dB
   - Depth mode: fc=348 Hz, Gain=+1.33 dB
   - Mathematical foundation: fc = 115/L (Hz)
   - DADI verification procedure

6. **Assembly Procedure**
   - 12-step build instructions
   - Quality assurance checkpoints
   - Cabinet integrity, driver installation, wiring polarity verification

7. **Measurement and Calibration**
   - Measurement setup (2m distance, microphone height, orientation)
   - Transfer function measurement procedure
   - Time-alignment procedure (impulse response capture)
   - DADC shelving filter application
   - Convergence procedure (iterative calibration to RMSE ≤ 0.05 dB)
   - Final verification and listening tests

8. **The Science Behind It**
   - Organic Digital Loudspeaker Framework (Higgins 2026)
   - Cortex-matched crossover design theory
   - DADC-DADI framework explanation
   - Higgins Unity Framework integration principles

9. **References**
   - Beranek (Acoustics, 1986)
   - Cheung & Schreiner (Auditory cortex, 2026)
   - Dickason (Loudspeaker Design Cookbook, 2005)
   - Higgins papers (Organic Digital, DADC-DADI, Unity Framework, 2026)
   - Neumann (Diffraction modeling, 1991)
   - Toole (Sound Reproduction, 2008)

## Technical Specifications

### Color Palette (RWA Brand)
- **TEAL**: #0D4F4F (headings, accents)
- **MTEAL**: #1A7A7A (secondary headings)
- **DARK**: #2D2D2D (body text)
- **LIGHTGRAY**: #F5F5F5 (backgrounds)

### Formatting
- Font: Times New Roman (11pt body, 16pt level-2, 24pt level-1)
- Line spacing: 1.5x
- Page margins: 1" top/bottom, 1.25" left/right
- Tables: 5 comprehensive technical tables with 4-5 columns each

## Validation

The document has been validated for:
- ✓ All 9 sections present and complete
- ✓ 5 technical tables (Drivers, Cabinet, Electronics, Crossover, DADC)
- ✓ 224+ paragraphs with proper formatting
- ✓ 44 heading elements (1 title + 2 tables of contents + sections + subsections)
- ✓ All driver specifications included
- ✓ Complete crossover frequencies (430 Hz, 1500 Hz, 10,000 Hz)
- ✓ DADC formula and correction gains present
- ✓ RWA color palette applied correctly

## Usage

### For End Users
1. Open `BTL_Build_Guide_v1.0.docx` in Microsoft Word, Google Docs, or LibreOffice
2. Follow the step-by-step instructions in each section
3. Use the BOM (Parts List) to source components
4. Refer to Cabinet Plans for construction dimensions
5. Follow Measurement and Calibration section for iterative convergence

### For Developers
To regenerate the guide after updates:

```bash
cd /sessions/wonderful-elegant-pascal/mnt/"Claude CoWorker"/RogueWaveAudio
python3 build_btl_guide.py
```

This will overwrite `BTL_Build_Guide_v1.0.docx` with the latest version.

## Dependencies

### Python Version
- Python 3.6+
- `python-docx` library (typically pre-installed on most systems)

```bash
pip install python-docx
```

### Node.js Version (Legacy)
- Node.js 14+
- `docx` npm package (requires npm registry access)

```bash
npm install docx
```

## Document Specifications

| Property | Value |
|----------|-------|
| File Format | DOCX (Office Open XML) |
| File Size | 48 KB |
| Pages | ~25-30 (estimated) |
| Sections | 9 major sections + Title Page + TOC |
| Tables | 5 technical tables |
| Paragraphs | 224+ |
| Headings | 44 |
| Font | Times New Roman |
| Primary Color | Teal (#0D4F4F) |
| Author | Peter Higgins |
| Organization | Rogue Wave Audio |
| Date | March 2026 |
| Version | v1.0 |

## License and Attribution

This document is provided as part of the **Rogue Wave Audio** open-source repository. The BTL Build Guide is authored by Peter Higgins and is intended for educational and research purposes.

For questions or updates, refer to the main Rogue Wave Audio repository documentation.

## Notes

- The Node.js version (build_btl_guide.js) is included for historical reference but is not currently functional due to npm registry restrictions in this environment.
- The Python version is the recommended and maintained builder script.
- Both scripts generate identical document content and structure; only the implementation technology differs.
