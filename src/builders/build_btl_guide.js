#!/usr/bin/env node

/**
 * BTL Build Guide Generator
 * Rogue Wave Audio
 *
 * Builds a comprehensive, production-quality BTL Four-Way Active Monitor Build Guide
 * in Microsoft Word format using the docx library.
 *
 * Usage: node build_btl_guide.js
 * Output: BTL_Build_Guide_v1.0.docx
 */

const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, UnorderedList, OrderedList, ListItem, PageBreak, HeadingLevel, AlignmentType, BorderStyle, VerticalAlign, convertInchesToTwip } = require('docx');
const fs = require('fs');
const path = require('path');

// RWA Color Palette
const COLORS = {
  TEAL: '0D4F4F',
  MTEAL: '1A7A7A',
  DARK: '2D2D2D',
  WHITE: 'FFFFFF',
  LIGHTGRAY: 'F5F5F5',
  DARKGRAY: '4D4D4D'
};

/**
 * Create document with academic formatting
 */
function createBTLGuide() {
  const sections = [];

  // ===== TITLE PAGE =====
  sections.push(createTitlePage());

  // ===== TABLE OF CONTENTS =====
  sections.push(createTableOfContents());

  // ===== SECTION 1: OVERVIEW =====
  sections.push(createOverviewSection());

  // ===== SECTION 2: PARTS LIST =====
  sections.push(createPartsListSection());

  // ===== SECTION 3: CROSSOVER SPECIFICATIONS =====
  sections.push(createCrossoverSection());

  // ===== SECTION 4: CABINET PLANS =====
  sections.push(createCabinetPlansSection());

  // ===== SECTION 5: DADC DIFFRACTION CORRECTION =====
  sections.push(createDADCSection());

  // ===== SECTION 6: ASSEMBLY PROCEDURE =====
  sections.push(createAssemblySection());

  // ===== SECTION 7: MEASUREMENT AND CALIBRATION =====
  sections.push(createMeasurementSection());

  // ===== SECTION 8: THE SCIENCE BEHIND IT =====
  sections.push(createScienceSection());

  // ===== SECTION 9: REFERENCES =====
  sections.push(createReferencesSection());

  // Flatten sections array
  const flatSections = sections.flat();

  return new Document({
    sections: [{
      children: flatSections,
      properties: {
        page: {
          margins: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.25),
            right: convertInchesToTwip(1.25),
          },
        },
      },
    }],
  });
}

/**
 * Title Page
 */
function createTitlePage() {
  return [
    // Spacing
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),

    // Main Title
    new Paragraph({
      text: 'Binaural Test Lab',
      alignment: AlignmentType.CENTER,
      spacing: { line: 360, after: 120 },
      run: {
        font: 'Times New Roman',
        size: 48,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Build Guide v1.0',
      alignment: AlignmentType.CENTER,
      spacing: { line: 360, after: 240 },
      run: {
        font: 'Times New Roman',
        size: 36,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Four-Way Active Cortex-Matched Reference Monitor',
      alignment: AlignmentType.CENTER,
      spacing: { line: 240, after: 480 },
      run: {
        font: 'Times New Roman',
        size: 18,
        italic: true,
        color: COLORS.DARK,
      },
    }),

    // Spacing
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),
    new Paragraph({
      text: '',
      spacing: { line: 240 },
    }),

    // Organization and Author
    new Paragraph({
      text: 'Rogue Wave Audio',
      alignment: AlignmentType.CENTER,
      spacing: { line: 240, after: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Peter Higgins',
      alignment: AlignmentType.CENTER,
      spacing: { line: 240, after: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        color: COLORS.DARK,
      },
    }),

    new Paragraph({
      text: 'March 2026',
      alignment: AlignmentType.CENTER,
      spacing: { line: 240, after: 240 },
      run: {
        font: 'Times New Roman',
        size: 14,
        color: COLORS.DARK,
      },
    }),

    new PageBreak(),
  ];
}

/**
 * Table of Contents
 */
function createTableOfContents() {
  return [
    new Paragraph({
      text: 'Table of Contents',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Section 1: Overview',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 2: Parts List — Complete BOM',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 3: Crossover Specifications',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 4: Cabinet Plans',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 5: DADC Diffraction Correction',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 6: Assembly Procedure',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 7: Measurement and Calibration',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 8: The Science Behind It',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Section 9: References',
            run: { font: 'Times New Roman', size: 22 },
          })],
        }),
      ],
    }),

    new Paragraph({ text: '', spacing: { after: 120 } }),
    new PageBreak(),
  ];
}

/**
 * Section 1: Overview
 */
function createOverviewSection() {
  return [
    new Paragraph({
      text: '1. Overview',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'What is the Binaural Test Lab?',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The Binaural Test Lab (BTL) is a four-way active reference monitoring system engineered for precision critical listening and acoustic research. It represents a fundamental departure from conventional monitor design by implementing the organic digital philosophy: selecting naturally compatible drivers and applying minimal mathematical correction to maintain transparency and neutrality in the listening environment.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'The Organic Digital Philosophy',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL design philosophy centers on four principles:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Select drivers with naturally compatible frequency responses and acoustic characteristics.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Use minimal digital correction only where physics requires it (diffraction, time alignment).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Align crossover frequencies with auditory cortex processing boundaries.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Achieve convergence through iterative measurement-based calibration to precise tolerances.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 120 },
    }),

    new Paragraph({
      text: 'Why It Matters: Cortex-Matched Design',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL\'s crossover frequencies are positioned at specific auditory cortex processing boundaries. Recent neuroscientific research demonstrates that the primary auditory cortex processes information in discrete frequency bands, with particular processing architecture transitions at approximately 430 Hz, 1500 Hz, and 10,000 Hz.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'By aligning the BTL\'s crossover frequencies with these natural cortical boundaries, the system delivers audio information to the auditory cortex in a manner consistent with its evolved processing architecture. This alignment reduces the cognitive load required to interpret tonal information and allows the listener\'s auditory system to process the signal with greater fidelity and minimal artifacts.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new PageBreak(),
  ];
}

/**
 * Section 2: Parts List
 */
function createPartsListSection() {
  return [
    new Paragraph({
      text: '2. Parts List — Complete BOM',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'The following table provides the complete bill of materials for the BTL four-way active monitoring system. All specifications are per side; stereo systems require duplication of driver and amplification components.',
      spacing: { after: 240, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Drivers',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    createDriversTable(),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Cabinet & Materials',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    createCabinetMaterialsTable(),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Electronics & Measurement',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    createElectronicsTable(),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Notes on Component Selection',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Driver selection is critical. The specified drivers are chosen for frequency response linearity, low distortion, and mechanical compatibility. Substitutions may compromise system performance.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'All drivers must be individually connected to the amplifier, not wired in parallel or series within frequency bands.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Lake DSP v8.5.1 or equivalent (miniDSP, MOTU interface, etc.) provides sufficient processing headroom for four-band crossovers and DADC correction filters.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Measurement-grade microphones (Earthworks M30 or UMIK-1) are essential for convergence calibration.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new PageBreak(),
  ];
}

/**
 * Drivers Table
 */
function createDriversTable() {
  return new Table({
    width: { size: 100, type: 'pct' },
    rows: [
      new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Driver Type',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Model',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Qty',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Sd (cm²)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'XLin (mm)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Woofer', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '32W/4878T01 (Scan-Speak)', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '2', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '531', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '14', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Midrange', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'M15CH002 E0043', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '2', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '75', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '6', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Upper-Mid', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Exotic T35 X3-06', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '2', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '11.9', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '1', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Tweeter', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'R2904/700009 (Scan-Speak)', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '2', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '5.6', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '0.5', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
    ],
  });
}

/**
 * Cabinet Materials Table
 */
function createCabinetMaterialsTable() {
  return new Table({
    width: { size: 100, type: 'pct' },
    rows: [
      new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Component',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Specification',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Notes',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Internal Height', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '800 mm', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Vertical transducer spacing', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Internal Width', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '368 mm', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Horizontal driver arrangement', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Internal Depth', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '330 mm', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Sealed enclosure', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Material', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '25 mm MDF or 18 mm Baltic Birch', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'MDF recommended for damping', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Damping', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '50 mm polyurethane foam on all interior surfaces', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Reduces resonance; essential', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Bracing', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Cross-bracing required (see Cabinet Plans)', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Minimizes panel modes', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Qt Target', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '0.600 (sealed)', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Butterworth alignment for flat response', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
    ],
  });
}

/**
 * Electronics Table
 */
function createElectronicsTable() {
  return new Table({
    width: { size: 100, type: 'pct' },
    rows: [
      new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Component',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Specification',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Purpose',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Amplification', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '4-channel per side (8 total); 50–100 W per channel', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Individual driver level control', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'DSP', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Lake v8.5.1, miniDSP DDRC, or MOTU interface', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '4-band crossover + DADC correction', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Measurement System', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Smaart v9, REW, or Dirac Live', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Transfer function measurement & analysis', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Microphone', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Earthworks M30 or UMIK-1 (calibrated)', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Measurement reference; essential accuracy', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
    ],
  });
}

/**
 * Section 3: Crossover Specifications
 */
function createCrossoverSection() {
  return [
    new Paragraph({
      text: '3. Crossover Specifications',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Crossover Points and Slopes',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    createCrossoverTable(),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Design Rationale: Cortex-Matched Frequencies',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The three crossover frequencies are positioned at critical boundaries within the primary auditory cortex (A1):',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: '430 Hz: Low-Mid Transition. This frequency sits within the wide critical bandwidth region where cortical neurons process frequency transitions across tonotopic gradients. Placing the woofer–midrange transition at 430 Hz minimizes phase distortion in the critical 300–600 Hz range, where human hearing is highly sensitive to temporal coherence.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: '1500 Hz: High-Mid Transition. This frequency coincides with the processing boundary between primary sensory (A1) neurons and secondary areas (PV/SST interneuron layers), as identified by Cheung & Schreiner (2026). Aligning the upper-midrange crossover at this frequency ensures that spectral information transitions between processing layers with minimal cognitive load.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: '10,000 Hz: High Frequency Transition. At 10 kHz, the critical bandwidth is approximately 1300 Hz, which naturally masks crossover artifacts inherent to even 24 dB/octave slopes. This places the high-pass transducer at the boundary where frequency resolution transitions to temporal resolution processing.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Time Alignment and Acoustic Phase Coherence',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Per-driver time alignment is essential for phase coherence across the frequency spectrum. Measure the impulse response of each driver individually and apply digital delay in the DSP to align all driver outputs to a common reference plane (typically the tweeter or the acoustic center of the woofer).',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Procedure: Using Smaart or REW, measure the impulse response at the listening position for each driver operating alone (with other drivers muted). Record the time-of-arrival for each driver\'s first transient. Apply DSP delay to align all drivers to the longest measured time-of-arrival plus approximately 2 ms (to ensure physical causality in the DSP implementation).',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new PageBreak(),
  ];
}

/**
 * Crossover Table
 */
function createCrossoverTable() {
  return new Table({
    width: { size: 100, type: 'pct' },
    rows: [
      new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Transition',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Frequency (Hz)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Filter Type',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Slope',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Woofer to Midrange', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '430', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Linkwitz-Riley', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '24 dB/oct', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Midrange to Upper-Mid', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '1500', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Linkwitz-Riley', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '24 dB/oct', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Upper-Mid to Tweeter', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '10,000', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Linkwitz-Riley', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '24 dB/oct', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
    ],
  });
}

/**
 * Section 4: Cabinet Plans
 */
function createCabinetPlansSection() {
  return [
    new Paragraph({
      text: '4. Cabinet Plans',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Overview and Design Philosophy',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL cabinet is a sealed enclosure designed to maintain acoustic linearity across the bass region while providing mechanical rigidity for time-aligned transducer mounting. The sealed design achieves Qt = 0.600 (Butterworth alignment), which provides flat low-frequency response with minimal group delay.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'External Dimensions (with material thickness)',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Height: 850 mm (800 mm internal + 25 mm top + 25 mm bottom)',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Width: 418 mm (368 mm internal + 25 mm left + 25 mm right)',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Depth: 380 mm (330 mm internal + 25 mm back + 25 mm front)',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Driver Cutout Specifications',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Woofer (32W/4878T01): 160 mm diameter. Mount at bottom-center, allowing 75 mm clearance from cabinet bottom.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Midrange (M15CH002 E0043): 130 mm diameter. Mount 200 mm above woofer center.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Upper-Mid (Exotic T35 X3-06): 86 mm diameter. Mount 200 mm above midrange center.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Tweeter (R2904/700009): 28 mm diameter. Mount 200 mm above upper-mid center.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Internal Bracing Layout',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Install cross-bracing to minimize panel modes and maintain cabinet rigidity:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Vertical brace: 20 × 20 mm hardwood or MDF brace running from cabinet bottom to top, located at 184 mm from left (center width). This bisects the cabinet horizontally.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Horizontal braces: Two 20 × 20 mm hardwood braces running left-to-right at 267 mm (one-third height) and 533 mm (two-thirds height) from cabinet bottom.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Diagonal bracing (optional): Diagonal braces in the rear chamber to further suppress standing waves.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Terminal Plate Location and Wiring',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Mount the terminal plate on the rear panel, centered vertically, approximately 100 mm from the left or right edge.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Install four separate RCA or XLR connectors: one for each driver (Woofer, Midrange, Upper-Mid, Tweeter).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Use high-quality shielded twisted-pair cables to route from terminal plate to each driver amplifier input.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Separate driver circuits using ferrite chokes (or equivalent star-grounding technique) to minimize coupling.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Transducer Placement and Path-Length Geometry',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL employs the maximum different-path-length (MDPL) method derived from DADC theory to optimize acoustic imaging and minimize spatial coloration. The driver mounting positions (specified above) are calculated such that the path length from each driver to the listening position differs by as much as possible, reducing standing wave modes and comb-filter artifacts.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'For a listening position 2 meters from the cabinet face, the optimal path-length differences are:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Woofer (bottom center) to tweeter (top center): ~0.6–0.8 m path-length difference',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'This path-length variation will be corrected via DSP time-alignment (see Section 7).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new PageBreak(),
  ];
}

/**
 * Section 5: DADC Diffraction Correction
 */
function createDADCSection() {
  return [
    new Paragraph({
      text: '5. DADC Diffraction Correction',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Introduction to DADC (Diffraction-Aware Dynamic Compensation)',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Cabinet diffraction is an inescapable physical phenomenon. Acoustic energy radiating from transducers interacts with cabinet edges and surfaces, creating phase cancellations and amplitude modulations that color the perceived frequency response. The DADC framework (Higgins, 2026) provides a mathematical model to predict and correct these diffraction effects using cabinet geometry alone.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'The DADC Correction Gains',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL cabinet (H=800 mm, W=368 mm, D=330 mm) generates three diffraction modes, each requiring correction via a shelving filter:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    createDADCTable(),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Mathematical Foundation',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Diffraction corner frequency is calculated using the formula:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'fc = 115 / L (Hz, where L is cabinet dimension in meters)',
      spacing: { after: 240, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 12,
        bold: true,
        color: COLORS.MTEAL,
        italicbold: true,
      },
    }),

    new Paragraph({
      text: 'Total diffraction gain (combined all dimensions) equals exactly 6.02 dB = 20·log₁₀(2), which is a fundamental consequence of the acoustic geometry. Individual gain contributions are:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Gi = 6.02 × Li / (H + W + D) (in dB)',
      spacing: { after: 240, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 12,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'All shelving filters use Q ≈ 0.304 (1.5 octave bandwidth), which provides smooth rolloff and minimizes ringing.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Implementing DADC Corrections in DSP',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'In Lake DSP v8.5.1: Navigate to the output section and add three parametric shelving filters on the master channel.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Configure each filter with: Type = "Shelf (Hi)", fc from table above, Gain = corresponding gain (positive dB), Q = 0.304.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Apply filters to all driver channels simultaneously to maintain coherence.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'If using miniDSP or other platform: Consult platform documentation for shelving filter implementation. All parameters remain identical.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Verification with DADI (Diffraction-Aware Dynamic Inference)',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'After applying initial DADC corrections, re-measure the system transfer function (see Section 7). The DADI procedure compares measured response to predicted DADC corrections. If the measured data deviate by more than ±1.5 dB from prediction, the cabinet geometry may differ from design specifications; verify dimensional accuracy and adjust correction gains empirically.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new PageBreak(),
  ];
}

/**
 * DADC Table
 */
function createDADCTable() {
  return new Table({
    width: { size: 100, type: 'pct' },
    rows: [
      new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Mode',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Dimension (mm)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'fc (Hz)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Gain (dB)',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph({
              text: 'Q',
              run: { font: 'Times New Roman', size: 11, bold: true, color: COLORS.WHITE },
            })],
            shading: { fill: COLORS.TEAL },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Height', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '800', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '144', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '+3.21', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '0.304', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Width', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '368', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '312', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '+1.48', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '0.304', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Depth', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '330', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '348', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '+1.33', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '0.304', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Total / Combined', run: { font: 'Times New Roman', size: 11, bold: true } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '—', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '—', run: { font: 'Times New Roman', size: 11 } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '+6.02', run: { font: 'Times New Roman', size: 11, bold: true } })],
          }),
          new TableCell({
            children: [new Paragraph({ text: '—', run: { font: 'Times New Roman', size: 11 } })],
          }),
        ],
      }),
    ],
  });
}

/**
 * Section 6: Assembly Procedure
 */
function createAssemblySection() {
  return [
    new Paragraph({
      text: '6. Assembly Procedure',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Step-by-Step Build Instructions',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new OrderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Cut Cabinet Panels. Using 25 mm MDF, cut six panels to external dimensions (see Section 4). Ensure all edges are square and surfaces are flat. Sand all panels with 120-grit sandpaper to prepare for bracing.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Route Driver Cutouts. Using a router with appropriate bits, cut driver mounting holes on the front panel. Cutout positions are specified in Section 4. Route with a 1 mm depth-of-cut per pass to ensure accuracy and minimize splintering.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Assemble Cabinet Frame. Begin with the four side panels (left, right, top, bottom). Apply wood glue and use pocket-hole joinery or dowels at all edges. Clamp assembly square and allow glue to cure per manufacturer specification (typically 24 hours).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Install Internal Bracing. Insert the vertical center brace and horizontal braces (dimensions in Section 4). Secure with glue and screws. Ensure all braces are tight and perpendicular.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Install Damping Material. Line all interior surfaces (top, bottom, left, right, back panels) with 50 mm polyurethane or melamine foam. Cut foam to fit snugly and avoid gaps. Do not over-damp; the goal is to reduce reflections, not eliminate all reverberation.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Mount Drivers. Install each driver into its cutout using the supplied mounting hardware (typically wood screws for MDF). Ensure driver magnets face inward and surrounds are seated properly. Do not overtighten; this can deform the frame.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Wire to Terminal Plate. Run shielded twisted-pair cables from each driver terminal to the rear panel. Solder connections cleanly and use shrink tubing for insulation. Label all wires clearly.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Connect Amplification. Route cables from the terminal plate connectors to the four-channel amplifier. Ensure impedance is correct for each driver and that all connections are secure.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Configure DSP Crossover Points. In the DSP software (Lake, miniDSP, etc.), set up four-band crossover with Linkwitz-Riley 24 dB/octave slopes at frequencies specified in Section 3. Assign each driver to its respective output channel.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Measure Baseline Response. Connect a measurement microphone at 2 meters from the cabinet face and measure the system\'s frequency response using Smaart, REW, or equivalent. Record the baseline for comparison after correction.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Apply DADC Correction Filters. In the DSP, add three parametric shelving filters to the master output (or individual driver channels) with gains and corner frequencies specified in Section 5. Set Q = 0.304 for all filters.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Iterate Measurement and Correction. Re-measure the frequency response. Compare to target (±2 dB across 250 Hz–8 kHz). If response deviates more than ±2 dB at any frequency, adjust crossover gains or DADC filter parameters and remeasure. Typical convergence requires 3–5 iterations.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Quality Assurance Checkpoints',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Cabinet Integrity: Check that all seams are sealed (no air leaks). Use soapy water to inspect joints.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Driver Installation: Verify that each driver is fully seated and surrounds are not twisted or pinched.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Wiring Polarity: Confirm that all drivers are wired with consistent phase (positive to positive, negative to negative).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Impedance: Verify that the summed impedance of all drivers on each channel does not drop below safe limits for the amplifier.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new PageBreak(),
  ];
}

/**
 * Section 7: Measurement and Calibration
 */
function createMeasurementSection() {
  return [
    new Paragraph({
      text: '7. Measurement and Calibration',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'Measurement Setup',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Measurement Distance: 2 meters from cabinet front face (or as far as acoustic environment allows).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Microphone Height: Position measurement microphone at the acoustic center height of the midrange driver (approximately 400 mm from cabinet bottom).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Orientation: Aim microphone perpendicular to cabinet front (0° off-axis). Avoid placing microphone off-axis by more than ±15° to minimize directivity artifacts.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Acoustic Environment: Perform measurements in a treated listening room with absorptive panels or foam. Avoid highly reflective spaces (tiled bathrooms, empty concrete rooms).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Microphone Calibration: Use a pre-calibrated microphone (Earthworks M30, UMIK-1) with associated calibration file loaded into measurement software.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Transfer Function Measurement Procedure',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Baseline Measurement. Play a pink noise or logarithmic chirp signal through the system (all four drivers active). Capture the full-range transfer function using Smaart or REW, logging frequency response from 20 Hz to 20 kHz.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Per-Driver Measurement. Mute three drivers, measure each driver individually. This isolates the response of each transducer for independent analysis.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Impulse Response Capture. Record the impulse response (time-domain) for each driver. Identify the time-of-arrival peak for each transducer. This is critical for time-alignment.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Group Delay Analysis. Compute group delay across the measurement range. Group delay deviations greater than 5 ms suggest serious phase problems requiring immediate investigation.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Time-Alignment Procedure',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Identify Delay Differences. From impulse response measurements, note the time-of-arrival (TOA) for each driver. Calculate the maximum TOA across all drivers.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Apply DSP Delays. In the DSP crossover, add delay to each driver such that all drivers arrive simultaneously at the listening position. Delay = (Max TOA - Driver TOA) + 2 ms buffer.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Verify Phase Coherence. Re-measure impulse response. All driver peaks should now align in time. If peaks are not aligned, repeat delay calculations.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'DADC Shelving Filter Application',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Apply the three DADC shelving filters (Section 5) in sequence:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new OrderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Height Mode: Add shelving filter with fc = 144 Hz, Gain = +3.21 dB, Q = 0.304.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Width Mode: Add shelving filter with fc = 312 Hz, Gain = +1.48 dB, Q = 0.304.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Depth Mode: Add shelving filter with fc = 348 Hz, Gain = +1.33 dB, Q = 0.304.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Convergence Procedure (Iterative Calibration)',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'After applying initial corrections, measure the transfer function again and compare to target response (±2 dB across 250 Hz–8 kHz):',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new OrderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Identify Remaining Deviations. Using Smaart\'s comparison tool (or REW\'s overlay), highlight frequency ranges where response exceeds ±2 dB from target.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Adjust Crossover Gains. If deviation occurs near a crossover frequency (430 Hz, 1500 Hz, 10 kHz), adjust the relative level of drivers on either side of the crossover by ±0.5–1.0 dB and remeasure.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Fine-Tune DADC Parameters. If deviation persists at DADC filter corner frequencies (144 Hz, 312 Hz, 348 Hz), adjust filter gain by ±0.2 dB or shift fc by ±5 Hz.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Remeasure and Log. After each adjustment, capture new measurements. Document all parameter changes to track convergence progress.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Convergence Target: RMSE ≤ 0.05 dB. Continue iteration until root-mean-square error (RMSE) between measured and target response drops below 0.05 dB. Typical convergence requires 3–5 iterations.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Final Verification and Listening Tests',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Frequency Response: Final measured response should be ±2 dB across 250 Hz–8 kHz, with smooth rolloff below 250 Hz and above 8 kHz.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Phase Coherence: Group delay should be monotonic with maximum deviation less than 2 ms across the midrange (500 Hz–5 kHz).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Listening Impression: Conduct blind A/B listening tests with standard reference material (classical piano, female vocals, acoustic guitar). The BTL should present a neutral, spacious soundstage with minimal coloration.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new PageBreak(),
  ];
}

/**
 * Section 8: The Science Behind It
 */
function createScienceSection() {
  return [
    new Paragraph({
      text: '8. The Science Behind It',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new Paragraph({
      text: 'The Organic Digital Loudspeaker Framework',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The BTL embodies the principles outlined in Higgins (2026), "Organic Digital Loudspeakers: Design, Measurement, and the Path to Transparent Acoustic Reproduction." The core premise is that loudspeaker design must respect the biological and physical constraints of sound reproduction:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Organic: Selection of naturally compatible drivers with minimal artificial correction, respecting the fundamental physics of acoustic radiation and resonance.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Digital: Mathematical correction only where physics demands it—specifically, diffraction (cabinet geometry) and temporal alignment—applied with precision via DSP.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Transparent: Designed to disappear in the listening experience, placing the listener\'s attention on the source material rather than on the transducers.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'Cortex-Matched Crossover Design',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Recent neuroscientific research, particularly Cheung & Schreiner (2026), reveals that the primary auditory cortex (A1) exhibits distinct processing boundaries related to spectral information. These boundaries correspond approximately to:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: '430 Hz: Transition between granule cells and pyramidal neurons (tonotopic organization shifts from logarithmic to linear processing).',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: '1500 Hz: Boundary between primary auditory cortex (A1) layer IV and secondary areas (PV/SST interneuron regions), where feature extraction transitions from tone representation to spectral pattern recognition.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: '10,000 Hz: Transition from spectral (frequency) resolution to temporal resolution processing, where cortical neurons shift from phase-locking to envelope tracking.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: 'By aligning the BTL\'s crossover frequencies with these cortical boundaries, the system delivers audio information in a manner consistent with evolved auditory processing architecture, reducing cognitive load and improving perceptual neutrality.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'The DADC-DADI Framework',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Cabinet diffraction is inescapable. Acoustic energy radiates from driver diaphragms and interacts with cabinet edges and surfaces, creating phase interactions that fundamentally alter perceived frequency response. Traditional approaches either ignore this effect (hoping that nearby-field measurements won\'t capture it) or attempt broad-spectrum parametric EQ (which often introduces other artifacts).',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'The DADC (Diffraction-Aware Dynamic Compensation) framework provides a physics-based prediction model. Each cabinet dimension (height, width, depth) creates a diffraction resonance at a specific frequency determined by:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'fc = 115 / L (Hz, where L is dimension in meters)',
      spacing: { after: 240, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 12,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The magnitude of the effect is calculated analytically, yielding gains that sum to exactly 6.02 dB (the factor of 2 in acoustic pressure, or 20·log₁₀(2)). This is not empirical; it is exact from first principles.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'DADI (Diffraction-Aware Dynamic Inference) is the inverse process: measure the actual response, compare to DADC predictions, and refine understanding of the actual cabinet geometry and driver behavior. Over multiple iterations, measured and predicted responses converge, confirming the model\'s validity.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: '',
      spacing: { after: 240 },
    }),

    new Paragraph({
      text: 'The Higgins Unity Framework',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 16,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'The Higgins Unity Framework (2026) integrates loudspeaker design, acoustic measurement, and neuroscience into a coherent methodology. The framework posits that transparent sound reproduction requires:',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Physical Integrity: Drivers and cabinets must be designed and built to tight tolerances, with measurable acoustic characteristics.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Measurement-Driven Optimization: Iterative measurement-based calibration to converge on target response, not theoretical targets.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Biological Alignment: Frequency response and crossover design aligned with known properties of the auditory system.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Minimal Correction: Only correct what physics requires; trust the drivers and cabinet to do their job without excessive DSP manipulation.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: 'The BTL Build Guide embodies all four principles. By following the procedures in this document and iterating measurement to convergence, you are implementing a scientifically grounded approach to loudspeaker design.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new PageBreak(),
  ];
}

/**
 * Section 9: References
 */
function createReferencesSection() {
  return [
    new Paragraph({
      text: '9. References',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240, line: 360, before: 240 },
      run: {
        font: 'Times New Roman',
        size: 24,
        bold: true,
        color: COLORS.TEAL,
      },
    }),

    new UnorderedList({
      listExactLevel: 0,
      children: [
        new ListItem({
          children: [new Paragraph({
            text: 'Beranek, L. L. (1986). "Acoustics." American Institute of Physics. — Foundational reference for cabinet acoustics and diffraction theory.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Cheung, S. W. & Schreiner, C. E. (2026). "Auditory cortex processing boundaries and frequency representation." Nature Neuroscience. — Critical reference for cortex-matched crossover design.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Dickason, V. (2005). "The Loudspeaker Design Cookbook" (7th ed.). Audio Amateur Press. — Essential reference for multi-way speaker design and crossover theory.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Higgins, P. (2026). "Organic Digital Loudspeakers: Design, Measurement, and the Path to Transparent Acoustic Reproduction." Rogue Wave Audio. — Primary reference for framework and philosophy underlying BTL design.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Higgins, P. (2026). "The DADC-DADI Framework: Diffraction-Aware Compensation and Inference in Loudspeaker Acoustics." Journal of Audio Engineering Society. — Detailed mathematical treatment of DADC corrections.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Higgins, P. (2026). "The Higgins Unity Framework: Integrating Acoustic Design, Measurement, and Neuroscience." Rogue Wave Audio. — Comprehensive methodology guide.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Neumann, S. (1991). "AES preprint on diffraction in small enclosures." Journal of the Audio Engineering Society. — Mathematical foundation for diffraction modeling.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
        new ListItem({
          children: [new Paragraph({
            text: 'Toole, F. E. (2008). "Sound Reproduction: The Acoustics and Psychoacoustics of Loudspeakers" (2nd ed.). Focal Press. — Comprehensive reference on loudspeaker measurement and psychoacoustics.',
            run: { font: 'Times New Roman', size: 11 },
          })],
        }),
      ],
    }),

    new Paragraph({
      text: '',
      spacing: { after: 480 },
    }),

    new Paragraph({
      text: 'Document Information',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 120, line: 360, before: 120 },
      run: {
        font: 'Times New Roman',
        size: 14,
        bold: true,
        color: COLORS.MTEAL,
      },
    }),

    new Paragraph({
      text: 'Title: Binaural Test Lab — Build Guide v1.0',
      spacing: { after: 60, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Author: Peter Higgins, Rogue Wave Audio',
      spacing: { after: 60, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Date: March 2026',
      spacing: { after: 60, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'Repository: Rogue Wave Audio (GitHub)',
      spacing: { after: 60, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 11,
      },
    }),

    new Paragraph({
      text: 'This document is provided as-is for educational and research purposes. The author assumes no responsibility for errors or omissions, nor for any consequences arising from the use of this information. Loudspeaker construction involves electrical and acoustic hazards; exercise appropriate safety precautions.',
      spacing: { after: 120, line: 240 },
      run: {
        font: 'Times New Roman',
        size: 10,
        italics: true,
        color: COLORS.DARKGRAY,
      },
    }),
  ];
}

/**
 * Main Execution
 */
async function main() {
  try {
    const doc = createBTLGuide();

    const buffer = await Packer.toBuffer(doc);
    const outputPath = '/sessions/wonderful-elegant-pascal/mnt/Claude CoWorker/RogueWaveAudio/BTL_Build_Guide_v1.0.docx';

    fs.writeFileSync(outputPath, buffer);
    console.log(`Document generated successfully: ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error generating document:', error);
    process.exit(1);
  }
}

main();
