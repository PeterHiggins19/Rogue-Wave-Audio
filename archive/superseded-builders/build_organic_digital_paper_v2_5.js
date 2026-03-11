#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════════
// Organic Digital Loudspeakers v2.5 + HUF-Org — Complete 25-Year Journey + Living System
// Builder: Peter Higgins — Rogue Wave Audio
// "To build things you need to learn things, to learn things you need to build things."
// ML-HUF Structural Identity validation: Learning is the organism, silicon the substrate.
// ══════════════════════════════════════════════════════════════════════════════

const { Document, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
        WidthType, ShadingType, PageNumber, PageBreak, TabStopType,
        TabStopPosition, Packer, ExternalHyperlink, ImageRun } = require('docx');
const fs = require('fs');

// ── Color Palette (RWA Teal/Charcoal) ─────────────────────────────────────
const TEAL   = '0D4F4F';
const MTEAL  = '1A7A7A';
const DARK   = '2D2D2D';
const LGREY  = 'F4F4F4';
const LTEAL  = 'D4E8E8';
const WHITE  = 'FFFFFF';
const ACCENT = 'CC6600';  // warm accent for emphasis
const GOLD   = 'FFF2CC';
const GREEN  = 'E2EFDA';

// ── Page Constants ────────────────────────────────────────────────────────
const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1440;
const CW = PAGE_W - 2 * MARGIN;

// ── Border helpers ────────────────────────────────────────────────────────
const bdr = { style: BorderStyle.SINGLE, size: 1, color: 'BBBBBB' };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };

// ── Heading Helpers ───────────────────────────────────────────────────────
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 },
  children: [new TextRun({ text: t, bold: true, font: 'Times New Roman', size: 30, color: TEAL })] });

const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 180 },
  children: [new TextRun({ text: t, bold: true, font: 'Times New Roman', size: 26, color: TEAL })] });

const H3 = (t) => new Paragraph({ spacing: { before: 240, after: 140 },
  children: [new TextRun({ text: t, bold: true, italics: true, font: 'Times New Roman', size: 23, color: DARK })] });

// ── Paragraph Helper ──────────────────────────────────────────────────────
function P(content, opts = {}) {
  const { align, indent, spacing_after, bold, italics, color } = opts;
  const runs = [];
  if (typeof content === 'string') {
    runs.push(new TextRun({ text: content, font: 'Times New Roman', size: 22, color: color || DARK,
      bold: bold || false, italics: italics || false }));
  } else if (Array.isArray(content)) {
    content.forEach(c => {
      if (typeof c === 'string') {
        runs.push(new TextRun({ text: c, font: 'Times New Roman', size: 22, color: color || DARK }));
      } else {
        runs.push(new TextRun({ font: 'Times New Roman', size: 22, color: DARK, ...c }));
      }
    });
  }
  return new Paragraph({
    spacing: { after: spacing_after || 160 },
    alignment: align || AlignmentType.JUSTIFIED,
    indent: indent ? { left: indent } : undefined,
    children: runs,
  });
}

// ── Bullet helper ─────────────────────────────────────────────────────────
function bullet(text, level = 0) {
  if (typeof text === 'string') {
    return P([{ text: '\u2022 ' + text }], { indent: 360 + level * 360 });
  } else if (Array.isArray(text)) {
    // Rich text array — prepend bullet to first element
    const items = [...text];
    if (items.length > 0 && typeof items[0] === 'object') {
      items[0] = { ...items[0], text: '\u2022 ' + (items[0].text || '') };
    }
    return P(items, { indent: 360 + level * 360 });
  }
  return P([{ text: '\u2022 ' + String(text) }], { indent: 360 + level * 360 });
}

// ── Spacing helper ────────────────────────────────────────────────────────
const SP = () => new Paragraph({ spacing: { after: 60 }, children: [] });

// ── Equation display helper ───────────────────────────────────────────────
function equation(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: 'Times New Roman', size: 22, italics: true, color: DARK })],
  });
}

// ── Table Helpers ─────────────────────────────────────────────────────────
function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: { fill: TEAL, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: 'Times New Roman', size: 20, bold: true, color: WHITE })] })],
  });
}

function dataCell(text, width, opts = {}) {
  const { shade, align, bold: b } = opts;
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({ alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text: String(text), font: 'Times New Roman', size: 20, color: DARK, bold: b || false })] })],
  });
}

function makeTable(headers, rows, colWidths) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => headerCell(h, colWidths[i])) }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, ci) => dataCell(cell, colWidths[ci], { shade: ri % 2 === 0 ? LGREY : undefined }))
      })),
    ],
  });
}

// ── ML-HUF Mapping Table ──────────────────────────────────────────────────
function makeMLMappingTable() {
  const mlMappings = [
    ['Weight space', 'Ratio portfolio', 'Driver/correction balance'],
    ['Softmax Σ=1.0', 'Unity constraint', '6.02 dB diffraction budget'],
    ['Learning rate', 'Q-sensitivity governed integration', 'Correction convergence speed'],
    ['Overfitting', 'Cancer / Deceptive Drift', 'Over-correction at single position'],
    ['Regularization (L1/L2/dropout)', 'Immune system / MC-4', 'Organic driver matching + multi-position averaging'],
    ['Early stopping', 'Viability test', 'Measurement convergence criterion'],
    ['Dropout sampling', 'Multi-position averaging', 'Spatially-averaged measurement regularization'],
    ['Training loss curve', 'Logistic growth / carrying capacity', 'TAF pipeline convergence to minimum deviation'],
    ['Model capacity', 'Metabolic budget', '6.02 dB diffraction budget'],
    ['Weight initialization', 'Starting from health state', 'Compatible driver selection'],
  ];

  const colW = [2000, 2400, 2800];
  const rows = mlMappings.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      borders, verticalAlign: 'center', margins: { top: 50, bottom: 50, left: 100, right: 100 },
      shading: ri % 2 === 0 ? { fill: LGREY, type: ShadingType.CLEAR } : undefined,
      width: { size: colW[ci], type: WidthType.DXA },
      children: [new Paragraph({ alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: cell, font: 'Times New Roman', size: 20, color: DARK, bold: ri === 0 })] })] }))
  }));

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({
        children: ['ML Concept', 'HUF-Org', 'Acoustic Parallel'].map((h, i) => headerCell(h, colW[i]))
      }),
      ...rows
    ],
  });
}

// ── Cross-reference note ──────────────────────────────────────────────────
function crossRef(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160 },
    children: [new TextRun({ text: '\u25B6 ' + text, font: 'Times New Roman', size: 20, italics: true, color: MTEAL })],
  });
}

// ── Section Break ─────────────────────────────────────────────────────────
function sectionBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ── Table caption ─────────────────────────────────────────────────────────
function tableCaption(text) {
  return P([{ text, bold: true, italics: true, color: TEAL }], { align: AlignmentType.CENTER, spacing_after: 200 });
}

// ══════════════════════════════════════════════════════════════════════════════
// TITLE PAGE
// ══════════════════════════════════════════════════════════════════════════════
function titlePage() {
  return [
    new Paragraph({ spacing: { before: 2400, after: 0 }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
      children: [new TextRun({ text: 'ROGUE WAVE AUDIO', font: 'Times New Roman', size: 22, bold: true, color: MTEAL, allCaps: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 8 } },
      children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 },
      children: [new TextRun({ text: 'Organic Digital Loudspeakers', font: 'Times New Roman', size: 48, bold: true, color: TEAL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
      children: [new TextRun({ text: 'Cortex-Matched Crossover Design for', font: 'Times New Roman', size: 28, color: DARK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'Transmitter-to-Receiver Coherence', font: 'Times New Roman', size: 28, color: DARK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
      children: [new TextRun({ text: 'A Complete Design Philosophy from 25 Years of Active Development', font: 'Times New Roman', size: 22, italics: true, color: MTEAL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 60 },
      children: [new TextRun({ text: 'Peter Higgins', font: 'Times New Roman', size: 26, bold: true, color: DARK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
      children: [new TextRun({ text: 'Rogue Wave Audio \u2014 Independent Research', font: 'Times New Roman', size: 22, color: DARK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
      children: [new TextRun({ text: 'March 2026', font: 'Times New Roman', size: 22, color: DARK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
      children: [new TextRun({ text: 'Version 2.4 + HUF-Org', font: 'Times New Roman', size: 20, italics: true, color: MTEAL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 0 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: MTEAL, space: 8 } },
      children: [new TextRun({ text: 'Foundational Document \u2014 Higgins Unity Framework Reference', font: 'Times New Roman', size: 18, italics: true, color: MTEAL })] }),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// DEDICATION & EPIGRAPH
// ══════════════════════════════════════════════════════════════════════════════
function dedication() {
  return [
    new Paragraph({ spacing: { before: 2000, after: 400 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Dedication', font: 'Times New Roman', size: 28, bold: true, italics: true, color: TEAL })] }),
    new Paragraph({ spacing: { after: 300 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'To Sharon and Jessica, who both put up with really bad loud test sounds,', font: 'Times New Roman', size: 22, italics: true, color: DARK })]}),
    new Paragraph({ spacing: { after: 300 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'enough for a lifetime. Love you both.', font: 'Times New Roman', size: 22, italics: true, color: DARK })]}),
    new Paragraph({ spacing: { before: 400, after: 200 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: '\u2015', font: 'Times New Roman', size: 22, color: MTEAL })]}),
    new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: '"To build things you need to learn things,', font: 'Times New Roman', size: 22, italics: true, color: DARK })]}),
    new Paragraph({ spacing: { after: 300 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'to learn things you need to build things."', font: 'Times New Roman', size: 22, italics: true, color: DARK })]}),
    new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: '\u2014 Peter Higgins', font: 'Times New Roman', size: 20, color: MTEAL })]}),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// ABSTRACT
// ══════════════════════════════════════════════════════════════════════════════
function abstract() {
  return [
    H1('Abstract'),
    P('This paper presents the Organic Digital Loudspeaker philosophy, a comprehensive design methodology developed over twenty-five years of active research, prototyping, and measurement at Rogue Wave Audio. The central thesis is that precision sound reproduction demands coherence not merely within the electroacoustic transmitter, but across the entire signal chain from transducer through room to human auditory cortex. We document the complete evolutionary arc from early transmitter-control approaches\u2014where brute-force equalization and digital signal processing attempted to correct loudspeaker deficiencies\u2014through the development of the Dimension-Apportioned Diffraction Correction and Inference (DADC-DADI) mathematical framework, to the culminating insight that organic driver matching combined with cortex-aware crossover placement produces results that no amount of post-hoc correction can achieve.'),
    P('The Binaural Test Lab (BTL), a four-way active reference monitoring system, serves as the primary validation platform. Its crossover frequencies at 430 Hz, 1500 Hz, and 10,000 Hz were empirically determined through extensive measurement campaigns but are shown here to coincide with auditory cortex masking transition regions identified in recent neurophysiological research. Cheung and Schreiner (2026) demonstrate a processing boundary near 1.41 kHz in primate primary auditory cortex, where parvalbumin-positive (PV+) and somatostatin-positive (SST+) interneuron networks transition in their relative contributions to forward masking. This convergence between engineering measurement and neuroscience provides independent validation of the cortex-matched crossover concept.'),
    P('We introduce the Transmitter-to-Receiver Coherence Model, a four-stage framework quantifying signal fidelity from electrical input through acoustic radiation, room propagation, cochlear transduction, and cortical processing. The DADC-DADI framework provides the mathematical engine for the transmitter stage, while the organic digital philosophy ensures that corrections remain minimal by beginning with naturally compatible driver radiation patterns. The paper establishes formal connections to the Higgins Unity Framework (HUF), showing that the PV/SST inhibitory balance in auditory cortex constitutes a ratio portfolio under unity constraint\u2014the same mathematical structure governing diverse systems from sourdough fermentation to cosmological evolution. The Higgins Operator H1, which originated from this loudspeaker diffraction work, provides the theoretical bridge between acoustic coherence and universal unity normalization.'),
    P([{text: 'Keywords: ', bold: true}, {text: 'organic digital, loudspeaker design, cortex-matched crossover, DADC-DADI, diffraction correction, transmitter-receiver coherence, auditory cortex, forward masking, PV/SST interneurons, Higgins Unity Framework, ratio portfolio', italics: true}]),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1: INTRODUCTION
// ══════════════════════════════════════════════════════════════════════════════
function section1() {
  return [
    H1('1. Introduction'),

    H2('1.1 The Precision Problem'),
    P('Electro-acoustic systems that reproduce recorded signals with minimal distortion and maximum intelligibility are far more difficult to design and build than conventional engineering practice suggests. A microphone captures sound fields; an amplifier processes electrical signals according to well-understood network principles; a loudspeaker converts electrical commands back into acoustic pressure waves. In theory, connecting them in series should reproduce the original sound. In practice, failure is absolute and immediate.'),
    P('The fundamental problem is that a loudspeaker is not a linear electrical-to-acoustic transducer. It is a complex radiator whose frequency response, phase response, and directional characteristics depend on cabinet geometry, driver displacement, enclosure resonance, and room boundary diffraction. A woofer radiates bass omni-directionally, but its midrange radiation pattern compresses, then narrows, then splits into lobes. A tweeter is inherently directional. A crossover network that hands off from woofer to midrange to tweeter must manage not just electrical impedance and frequency cutoff, but the coherence of the combined acoustic output.'),
    P('The engineer\'s classical response to this incoherence is correction: measure the frequency response with a microphone, identify the deviations from flat, and apply corrective equalization. This approach dominated active speaker design from the 1990s onward. Yet after twenty-five years of research, implementation, and extensive measurement at Rogue Wave Audio, a radically different conclusion has emerged: the correction approach is backward. Attempting to correct an incoherent system does not yield coherence; it yields a system that measures flat but sounds corrected. The right approach is to begin with naturally coherent components and combine them in ways that preserve that coherence.'),
    P('This paper documents that journey. We begin with the mathematics of diffraction (Section 2), the physics of driver behavior (Section 3), and the psychoacoustics of human perception (Section 4), before introducing the Dimension-Apportioned Diffraction Correction and Inference (DADC-DADI) framework (Section 5). Sections 6 and 7 introduce the Binaural Test Lab reference system and the organic digital philosophy that governs its design. Section 8 connects the work to the Higgins Unity Framework. The new Section 9 situates the entire effort within a triad-of-triads architecture connecting mathematics, application, and real-world validation. Sections 10\u201314 cover the computational, measurement, and build infrastructure supporting the work.'),

    H2('1.2 Scope and Audience'),
    P('This document is written for three distinct audiences, each of whom can extract value from different sections:'),
    bullet('Theorists and mathematicians: Section 2 (diffraction mathematics), Section 5 (DADC-DADI framework), Section 8 (HUF connection), and Section 9 (triad-of-triads architecture).'),
    bullet('Acoustic engineers and measurement professionals: Sections 3\u20137 (driver physics, perception, BTL architecture), Sections 10\u201311 (computational pipeline and measurement methodology).'),
    bullet('Builders and enthusiasts: Sections 6\u20137 (organic digital philosophy and BTL design rationale), Section 9 (why the architecture matters at human scale), and Section 12 (BTL Build Guide).'),
    P('Each section builds on prior material, but cross-references are provided to allow non-sequential reading.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2: DIFFRACTION MATHEMATICS
// ══════════════════════════════════════════════════════════════════════════════
function section2() {
  return [
    H1('2. The Mathematics of Diffraction'),

    H2('2.1 The Loudspeaker Cabinet as a Diffraction Source'),
    P('A loudspeaker driver mounted in a cabinet is not an ideal point source. The cabinet edges, the driver flange, and the cabinet material all diffract the acoustic wavefront in ways that depend on frequency. These diffractions sum, in the complex plane, with the direct radiation from the driver. The result is a frequency response that exhibits peaks and nulls due to constructive and destructive interference\u2014independent of the driver\'s inherent response.'),
    P('The classic analysis begins with Babinet\'s principle: the diffraction pattern from a driver-in-cabinet is equivalent to the pattern from a driver-in-infinite-baffle plus the diffraction from the baffle edges. The baffle edge diffraction follows a classic frequency-dependent phase shift, which when summed with the direct path, creates interference patterns. For a cabinet with a longest dimension L, the diffraction features begin near the frequency where the acoustic wavelength becomes comparable to L.'),
    P('Mathematically, the on-axis frequency response can be expressed as:'),
    equation('H(f) = A·h_driver(f) + D·e^{i\u03D5(f)}'),
    P('where h_driver is the intrinsic driver frequency response, A is the direct-path amplitude, D is the diffraction amplitude, and \u03D5(f) is the frequency-dependent diffraction phase. The interference is strongest where |A| \u2248 |D| and |A + D| minimum corresponds to \u03D5(f) \u2248 \u03C0.'),

    H2('2.2 The 6.02 dB Diffraction Budget'),
    P('For a typical loudspeaker with a woofer section (bass driver cabinet) radiating into the listening room, measurements reveal that diffraction artifacts can account for ±3 dB variation across the crossover region. The physical mechanism is this: diffraction occurs at multiple length scales\u2014the woofer cabinet depth (affecting low midrange), the midrange driver diameter (affecting midrange), and the tweeter integration (affecting upper midrange and presence). Each mechanism is separate; each operates in a different frequency band.'),
    P('Summing these diffraction contributions across all cabinet features reveals that the total power in diffraction-related interference patterns is constrained. The 6.02 dB figure comes directly from measurement: that is the approximate total diffraction energy available to be managed across the entire cabinet\u2014from the lowest diffraction feature (deep bass cabinet edge) to the highest (tweeter flange). Allocating this 6.02 dB budget among multiple diffraction mechanisms is the essence of diffraction correction.'),
    P([{text: 'The key insight: ', bold: true}, {text: 'The 6.02 dB budget is not arbitrary; it is a measured constant that emerges from the physics of cabinet diffraction. Attempting to correct diffraction beyond what the physics allows will fail. But working within the budget, correct apportionment of diffraction across frequency can yield a smooth, interference-free response.'}]),

    H2('2.3 Phase and Coherence'),
    P('Frequency response (amplitude) is necessary but not sufficient for transparency. Two systems can have identical flat frequency response yet sound completely different if their phase responses differ. The reason is that phase carries information about timing and wavefront coherence.'),
    P('Consider a multi-driver loudspeaker. If the woofer signal, after acoustic propagation and diffraction, arrives at the listener\'s ear 1 ms ahead of the midrange signal, then the two signals are not coherent in the classical sense. They will interfere. The auditory system will not experience them as a unified acoustic object, but rather as two separate objects with timing separation. The cortex will struggle to fuse them into a single perceived sound source.'),
    P('Achieving phase coherence across a multi-driver array is more difficult than achieving amplitude coherence. It requires that the driver signals be time-aligned (accounting for acoustic propagation distance), that the crossover network introduce no additional phase shift (or introduce equal and opposite phase shifts), and that the driver radiation patterns maintain stable phase across the transition frequency. This is why organic driver matching\u2014beginning with drivers whose radiation patterns are inherently compatible\u2014is preferable to post-hoc correction.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3: DRIVER PHYSICS
// ══════════════════════════════════════════════════════════════════════════════
function section3() {
  return [
    H1('3. Driver Physics and Organic Compatibility'),

    H2('3.1 Driver Radiation Patterns'),
    P('A loudspeaker driver radiates acoustic energy in a pattern determined by its diameter, the wavelength of the signal, and the acoustic environment around the driver. A bass driver with diameter D much smaller than the acoustic wavelength \u03BB radiates omni-directionally\u2014equally in all directions. But as frequency rises and \u03BB becomes comparable to D, the radiation pattern transitions from omnidirectional to directional. At high frequencies where \u03BB \u226b D, the driver becomes highly directional, with most energy concentrated in a narrow beam forward of the driver and significant nulls to the sides and rear.'),
    P('This frequency-dependent pattern change is fundamental. A woofer has a smooth omni-to-directional transition spanning roughly an octave or more. A midrange driver transitions faster. A tweeter is already directional at its lowest operating frequency. If these three drivers are simply summed together, the combined output is incoherent: the woofer is omnidirectional, the tweeter is directional, and the midrange is between. Off-axis response will be wild. The crossover network cannot correct this; the diffraction patterns are already determined by the driver physics.'),
    P('Organic compatibility means: choose drivers whose radiation pattern transitions occur at similar frequencies, relative to their operating ranges. If the woofer transitions from omnidirectional to directional in the band 400\u20131000 Hz, the midrange should transition in a proportionally similar band (e.g., 1500\u20135000 Hz), and the tweeter should be already well-directional at its lowest frequency and maintain that directional pattern. The radiation patterns will then sum coherently.'),

    H2('3.2 Organic Digital Philosophy'),
    P('The term "organic digital" captures the design principle: use modern digital tools (digital crossover, active amplification, DSP measurement) to enable and enhance the organic (natural, physics-based) behavior of drivers, rather than to override or correct that behavior.'),
    P('An alternative approach\u2014the "inorganic digital" philosophy\u2014says: use whatever drivers are cheap and available, then deploy aggressive digital correction (graphic EQ, time alignment, phase correction) to force the system to measure well. This approach often fails in perceived sound quality, even when the measurements appear to validate it, because the phase and coherence relationships are still broken at the cortical level.'),
    P('The organic digital approach requires discipline. It means spending time understanding driver behavior before combining them, designing the crossover to enhance rather than fight the natural transitions, and using digital tools to measure and validate the system, not to correct fundamental incompatibilities. But the result is a system that sounds coherent because it is coherent.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4: AUDITORY PERCEPTION
// ══════════════════════════════════════════════════════════════════════════════
function section4() {
  return [
    H1('4. Auditory Perception and the Cortex-Matched Crossover'),

    H2('4.1 Forward Masking and Inhibitory Balance'),
    P('Human hearing is not a frequency analyzer in the simple Fourier sense. The inner ear cochlea performs a rough frequency decomposition via the traveling wave, but the brain\u2019s auditory processing is far more sophisticated. Neighboring frequency channels at low frequencies suppress each other through a process called forward masking. The amount of suppression depends on the balance between excitation and inhibition within the auditory cortex.'),
    P('Recent neurophysiological research (Cheung and Schreiner, 2026) demonstrates that inhibitory control is exercised by two distinct interneuron types: parvalbumin-positive (PV+) and somatostatin-positive (SST+) cells. These cells maintain a balanced influence on pyramidal output neurons. PV+ cells provide fast, strong inhibition; SST+ cells provide slower, more nuanced inhibition. The balance between these two\u2014the PV/SST ratio\u2014shifts systematically across frequency and determines the forward masking profile.'),
    P('Critically, this balance is not smooth. There are transition regions where the relative contribution of PV+ vs. SST+ inhibition changes abruptly. Near 1.41 kHz (updated from earlier estimates of \u223c1.5 kHz), primary auditory cortex shows a processing boundary: below this frequency, PV+ inhibition dominates and provides tight spectral control; above this frequency, SST+ inhibition begins to dominate and provides more flexible frequency integration. This is not a threshold; it is a gradual transition. But it constitutes a natural regime boundary in cortical processing.'),

    H2('4.2 Cortex-Matched Crossover Design'),
    P('The insight is this: if a multi-driver loudspeaker has a crossover frequency coinciding with a cortical processing boundary, the cortex is already equipped to handle the transition. It expects a change in processing characteristics at that frequency. A crossover artifact placed at a cortical boundary is thus less disruptive than the same artifact placed in the middle of a stable processing regime.'),
    P('The BTL reference system uses crossover frequencies at 430 Hz, 1500 Hz, and 10,000 Hz. The 1500 Hz crossover coincides with the PV/SST transition boundary. The 430 Hz crossover sits in a region of stable PV-dominant processing (where spectral tightness is maximal). The 10 kHz crossover sits in the SST-dominant regime (where frequency integration is more flexible). Each crossover is placed at or near a natural regime boundary, minimizing the cortical processing cost of the transition.'),
    P('This is not a panacea; crossover artifacts are still present. But the perceptual cost is minimized because the crossover sits at a frequency where the cortex is already managing a processing change. The cortex does not experience the crossover as an unexpected discontinuity in a region expecting coherence; it experiences it as part of a natural, expected transition.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5: DADC-DADI FRAMEWORK
// ══════════════════════════════════════════════════════════════════════════════
function section5() {
  return [
    H1('5. The DADC-DADI Framework: Dimension-Apportioned Diffraction Correction and Inference'),

    H2('5.1 Core Concept'),
    P('The DADC-DADI framework replaces the classical approach to diffraction correction (global EQ applied across the entire system) with a physics-based approach where diffraction contributions are estimated, tracked, and apportioned at the source.'),
    P('The key observation: a typical loudspeaker cabinet has multiple dimensions. The woofer enclosure depth contributes diffraction in one frequency band. The width contributes in another. The height, the driver mounting flange, the cabinet port, and the tweeter assembly each contribute in different frequency bands. Rather than applying a single global correction filter, DADC identifies each diffraction source, estimates its contribution, and assigns it a portion of the 6.02 dB budget.'),
    P('Mathematically, the on-axis frequency response is decomposed as:'),
    equation('G(f) = G_woofer_cabinet(f) + G_driver_flange(f) + G_port(f) + G_tweeter_mounting(f) + G_driver_radiation(f)'),
    P('where each term is a measured or calculated contribution, and the sum (in power) is constrained to equal the total available diffraction energy. The constraint is:'),
    equation('\u03A3 |G_i(f)|² = 6.02 dB (integrated across all f)'),
    P('Satisfying this constraint ensures that all diffraction sources are accounted for and that the total correction applied does not exceed the physical budget.'),

    H2('5.2 DADI: Inference and Adaptive Correction'),
    P('Dimension-Apportioned Diffraction Inference (DADI) extends DADC by adding a learning component. As the system is measured in different acoustic environments, the measured response deviations are compared against the DADC predictions. When deviations exceed predictions, DADI infers that either: (1) the cabinet dimensions provided to DADC were incorrect, (2) the room acoustics are more complex than assumed, or (3) the driver\'s actual behavior differs from manufacturer specs.'),
    P('DADI then adjusts the model parameters iteratively, converging on a set of dimension estimates that predict the measured response. This inference loop is crucial for real-world systems, which inevitably deviate from design specifications. Drivers vary; cabinets are hand-built; rooms are unique. DADI accommodates these variations through adaptive learning.'),

    H2('5.3 Connection to the Higgins Operator H1'),
    P('The constraint that all diffraction contributions sum to 6.02 dB (or more generally, that system contributions sum to unity) is a manifestation of the Higgins Operator H1. Where H1 enforces unity normalization across arbitrary systems (from cosmological modes to semiconductor regimes), in the loudspeaker context, it enforces that all diffraction energy is accounted for and properly distributed. The mathematics are identical; only the physical substrate changes.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6: ORGANIC DIGITAL PHILOSOPHY
// ══════════════════════════════════════════════════════════════════════════════
function section6() {
  return [
    H1('6. The Organic Digital Philosophy'),

    H2('6.1 Principles'),
    P('Organic Digital loudspeaker design rests on three foundational principles:'),
    bullet('Begin with naturally compatible drivers whose radiation patterns transition smoothly and coherently across the frequency range.'),
    bullet('Design the crossover network to preserve and enhance this natural coherence, not to force incoherent drivers into fake coherence.'),
    bullet('Use active DSP (digital signal processing) to measure, validate, and fine-tune the system, not as the primary correction mechanism.'),
    P('These principles reverse the conventional wisdom of the last twenty years, which held that digital correction is the solution to all acoustic problems. In the Organic Digital philosophy, the solution is physics-first: get the drivers right, get the crossover right, then use digital tools to validate the result and make small refinements.'),

    H2('6.2 The Role of DSP'),
    P('Active DSP plays a crucial role, but not the role assigned to it in conventional correction-based designs. In Organic Digital systems, DSP is used for:'),
    bullet('Time alignment: phase-aligning the outputs of drivers with different acoustic propagation distances.'),
    bullet('Level control: setting the relative amplitude of each driver band to ensure uniform acoustic pressure.'),
    bullet('Measurement and validation: using real-time or swept-sine measurement to verify that the design goals have been achieved.'),
    bullet('Fine-tuning: making small adjustments (typically < 3 dB at any frequency) to optimize performance in a specific room.'),
    P('DSP is not used for broad-spectrum correction, graphic equalization across octave bands, or attempts to flatten the response at any cost. The response is allowed to deviate from flat in ways that enhance perceived naturalness, because the deviations are the result of coherent driver behavior, not artifacts.'),

    H2('6.3 Implications for Crossover Design'),
    P('Conventional crossover design focuses on filter slope steepness (24 dB/octave, 48 dB/octave, etc.) to minimize driver overlap. Organic Digital design focuses on phase behavior and driver integration. A gentle filter slope (even 12 dB/octave) is acceptable if the drivers\' radiation patterns transition smoothly. A steep slope (48 dB/octave) may be harmful if it introduces phase discontinuities or if the drivers\' patterns are incompatible.'),
    P('The Binaural Test Lab uses mixed-order crossovers (e.g., 12 dB/octave on woofer, 18 dB/octave on midrange, 24 dB/octave on tweeter), chosen to match the natural rolloff of each driver type and to minimize filter-induced phase delay. This is not a universal template; it is the result of iteration with specific driver choices.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 7: BINAURAL TEST LAB
// ══════════════════════════════════════════════════════════════════════════════
function section7() {
  return [
    H1('7. The Binaural Test Lab: A Four-Way Reference Monitoring System'),

    H2('7.1 Architecture'),
    P('The Binaural Test Lab (BTL) is a four-way active monitor designed to serve as a reference system for validating the Organic Digital philosophy. Its specifications have been refined over more than two decades of measurement, listening, and iteration.'),
    bullet('Bass: Rogue Wave RW-12-A woofer, vented enclosure, 20\u2013250 Hz'),
    bullet('Lower Midrange: Rogue Wave RW-150-LMD driver, sealed mount, 200\u2013500 Hz'),
    bullet('Midrange: Rogue Wave RW-100-MD driver, sealed mount, 450\u20135000 Hz'),
    bullet('Treble: Rogue Wave RW-1-HF ribbon tweeter, 2500\u201320000 Hz'),
    P('Crossover frequencies: 430 Hz (woofer-to-lower-mid), 1500 Hz (lower-mid-to-mid), 10 kHz (mid-to-treble).'),

    H2('7.2 Calibration and Measurement'),
    P('The BTL is calibrated using a three-microphone array positioned at the primary listening position and two flanking positions (\u00b745\u00b0). The reference signal is a logarithmic chirp from 20 Hz to 20 kHz. Measurements are performed using the TensorAcousticForge pipeline (Section 10), which applies the DADC-DADI framework to ensure that measured deviations are attributed to the correct diffraction sources.'),
    P('Calibration targets:'),
    bullet('On-axis response: \u00b12 dB from 30 Hz to 15 kHz'),
    bullet('Off-axis response (\u00b145\u00b0): within 3 dB of on-axis'),
    bullet('Phase coherence: group delay variation < 1 ms across crossover regions'),
    P('These targets reflect the principle that a reference monitor should be neither colorless nor overly corrected, but rather transparent\u2014revealing the acoustic properties of the program material without imposing artifacts.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 8: HIGGINS UNITY FRAMEWORK CONNECTION
// ══════════════════════════════════════════════════════════════════════════════
function section8() {
  return [
    H1('8. The Higgins Unity Framework Connection'),

    H2('8.1 Origin: From Loudspeaker Diffraction to Universal Coherence'),
    P('The Higgins Operator H1 originated directly from the loudspeaker diffraction work described in this paper. The challenge of maintaining wavefront coherence across a multi-driver array\u2014ensuring that the summed output preserves the phase, amplitude, and directional characteristics of the original signal\u2014led to the development of a nonlinear operator that enforces strict unity normalization while preserving directional coherence. The mathematical formulation is:'),
    equation('H1|\u03C8\u27E9 = \u03BC(|\u03C8\u27E9) \u00B7 u'),
    P('where u = |\u03C8\u27E9/||\u03C8\u27E9|| is the unit vector (direction), and \u03BC(|\u03C8\u27E9) = \u27E8u|P|u\u27E9 is the marginal oneness measure (coherence with the target subspace P). The operator normalizes the system while damping incoherent components, driving the system toward a fixed point where coherence with the target is maximized.'),
    P('What began as a tool for audio wavefront correction generalized to any hierarchical system requiring global unity under local constraints. The Higgins Operator H1 now finds application across scales from cosmological evolution (Conformal Cyclic Cosmology), urban infrastructure resilience, semiconductor lithography, particle physics, and stellar fusion\u2014all sharing the same mathematical structure of enforcing coherence under a unity constraint.'),

    H2('8.2 PV/SST as Ratio Portfolio Under Unity Constraint'),
    P('The auditory cortex PV/SST interneuron balance described in Section 4 constitutes a ratio portfolio\u2014the same mathematical structure identified across diverse HUF domains. In a healthy cortex, the PV+ and SST+ contributions to forward masking maintain a specific balance (SST/PV \u2248 3.08) that optimizes spectral processing. This balance is not arbitrary; it represents a homeostatic equilibrium maintained by cortical plasticity mechanisms.'),
    P('When noise-induced hearing loss disrupts this balance (driving the ratio from 3.08 to 1.20), the cortex experiences a coherence failure analogous to the degradation described by the H1 operator. The Supp/Facil ratio collapse from 4.9 to 1.26 represents a dramatic loss of the cortex\'s processing precision\u2014its "Q factor" for spectral analysis is degraded. Under the HUF framework, this would be detectable as a ratio drift by the Fourth Monitoring Category (MC-4), which tracks portfolio composition changes across time.'),

    makeTable(
      ['HUF Domain', 'Component A', 'Component B', 'Nominal Ratio', 'Unity Constraint', 'Failure Mode'],
      [
        ['Auditory Cortex', 'PV+ inhibition', 'SST+ inhibition', 'SST/PV \u2248 3.08', 'Balanced masking', 'NIHL \u2192 ratio \u2192 1.20'],
        ['Sourdough', 'Lactobacillus', 'Saccharomyces', 'L/S \u2248 100:1', 'Stable fermentation', 'Temperature shock \u2192 ratio collapse'],
        ['Urban Traffic', 'Flow capacity', 'Construction load', 'Var. by segment', '\u03A3 = 1 resource', 'Cascade failure'],
        ['Cosmological', 'Coherent modes', 'Incoherent modes', '\u03BC \u2192 P alignment', '\u03A3|\u03C8_i| = 1', 'Heat death / Big Rip'],
        ['Loudspeaker', 'Direct radiation', 'Diffraction artifacts', '6.02 dB total', '\u03A3 G_dim = 6.02', 'Uncorrected ripple'],
      ],
      [1600, 1600, 1600, 1600, 1600, 1360]
    ),
    tableCaption('Table 7. Ratio Portfolio Comparison Across HUF Domains'),

    H2('8.3 Crossover Design as Cortical Homeostasis Preservation'),
    P('From the HUF perspective, cortex-matched crossover design is an act of preserving cortical homeostasis. A crossover artifact at 1500 Hz\u2014the PV/SST transition\u2014falls where the cortex is already managing a balance shift. The neural "switching cost" at this frequency is already budgeted for. A crossover artifact at 2500 Hz, in contrast, lands in a region of stable PV-dominated processing and disrupts a regime that is not expecting perturbation. The cortex-matched approach thus minimizes the total "coherence cost" imposed by the multi-driver architecture on the cortical processing system.'),
    P('This insight connects loudspeaker design to the broader HUF program: in any complex system, transitions and corrections should be placed at natural regime boundaries rather than within stable regimes. The same principle that guides crossover placement in a four-way loudspeaker guides resource allocation in urban infrastructure and aeon transitions in Conformal Cyclic Cosmology. The mathematics are identical; only the physical substrate changes.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// NEW SECTION 9: TRIAD OF TRIADS ARCHITECTURE
// ══════════════════════════════════════════════════════════════════════════════
function section9() {
  return [
    H1('9. The Triad of Triads: From Laboratory to Living Room'),

    H2('9.1 Three Nested Triads'),
    P('The RWA research program, taken as a whole, operates within a triad-of-triads architecture. This three-by-three structure connects three domains of inquiry, each consisting of three key elements, through three points of contact and three unions. Understanding this structure clarifies why Organic Digital loudspeaker design yields results that conventional approaches cannot achieve.'),

    P([{text: 'Triad 1 \u2014 Mathematics (HUF): ', bold: true}, {text: 'The theoretical foundation. It consists of (1) the Sufficiency Frontier, which defines the boundary between systems that can maintain unity and those that cannot; (2) the Fourth Category (MC-4), which monitors ratio portfolio drift across time; and (3) the H1 Operator, which enforces coherence under unity constraint. These three mathematical tools apply universally to any hierarchical system.'}]),

    P([{text: 'Triad 2 \u2014 Application (RWA): ', bold: true}, {text: 'The loudspeaker instantiation. It consists of (1) Organic Digital philosophy, which governs driver selection and system design; (2) the DADC-DADI framework, which manages diffraction apportionment; and (3) the Cortex-Matched Crossover, which aligns acoustic transitions with cortical processing boundaries. These three elements work in concert to produce coherent acoustic output.'}]),

    P([{text: 'Triad 3 \u2014 Real World (BTL): ', bold: true}, {text: 'The validation and implementation layer. It consists of (1) the BTL Build, the physical hardware embodying the design principles; (2) Measurement & Calibration, verifying that the built system performs as designed; and (3) Listener Experience, the ultimate validation: does it sound right? These three elements close the loop from mathematics through engineering to human perception.'}]),

    H2('9.2 Points of Contact and Unions'),
    P('The three triads do not exist in isolation. They are connected through nine points of contact and three unions:'),

    bullet('HUF \u2194 RWA: The H1 Operator provides the mathematical engine for DADC-DADI. The 6.02 dB diffraction budget is a specific instance of the unity constraint that H1 enforces. The ratio portfolio structure of the cortical PV/SST balance shows that the loudspeaker problem is actually a ratio-portfolio problem, making it directly addressable using HUF tools.'),

    bullet('RWA \u2194 BTL: Organic Digital philosophy and cortex-matched crossover design are implemented in the BTL Build. The DADC-DADI framework guides measurement and calibration. Listener experience validates whether the design principles have been successfully instantiated.'),

    bullet('BTL \u2194 HUF: The measurement process (Triad 3) confirms that the Sufficiency Frontier is not breached; the MC-4 monitoring via the measurement pipeline detects ratio portfolio drift; listener experience provides independent validation that coherence (as perceived through the H1 metric) has been preserved.'),

    H2('9.3 The Car and Fuel Analogy'),
    P('To make this structure accessible, consider the car analogy: a car traveling on a highway. The fuel tank carries energy. The driver controls the distribution of that energy through the accelerator. The fuel gauge tells the driver the tank\'s state. The road direction constrains where the car can go. The car is "coherent" when the fuel is properly distributed, the driver is responsive, the gauge is accurate, and the direction is preserved.'),

    P('Mapping this to the loudspeaker:'),

    bullet([{text: 'Tank full = unity constraint (', bold: true}, {text: '\u03A3 = 1). The car\'s fuel tank represents the 6.02 dB total diffraction budget. A full tank is the unit reference; the fuel gauge measures against this standard. A tank that is always full represents a system in which all available energy is accounted for and properly distributed.'}]),

    bullet([{text: 'Driver/fuel ratio = ratio portfolio. ', bold: true}, {text: 'The balance between driver skill and fuel consumption determines efficiency. A good driver uses fuel efficiently; a poor driver (or driver drift due to fatigue) leads to inefficiency. In the loudspeaker, the balance between different diffraction sources (woofer cabinet vs. tweeter flange vs. driver radiation) determines acoustic coherence.'}]),

    bullet([{text: 'Fuel gauge = MC-4 monitoring. ', bold: true}, {text: 'The fuel gauge reads the tank state in real time. It tells the driver whether the ratio is drifting (e.g., the engine is running lean or rich). In the loudspeaker, MC-4 monitoring tracks portfolio composition across measurement sweeps and listening sessions, detecting whether the system is drifting out of calibration.'}]),

    bullet([{text: 'Direction preserved = H1 coherence. ', bold: true}, {text: 'The car\'s direction is determined by the road. No matter how efficiently the fuel is used, if the car is pointed backward, it will not reach the destination. In the loudspeaker, the H1 Operator ensures that acoustic coherence is preserved\u2014that phase, amplitude, and directionality relationships are maintained across the frequency range, preserving the "direction" toward the original sound.'}]),

    bullet([{text: 'Empty tank = ground state. ', bold: true}, {text: 'A car with an empty tank cannot move. An loudspeaker with no power produces no sound. The ground state is coherence failure. Ensuring the tank never empties is equivalent to ensuring the system never falls out of the Sufficiency Frontier\u2014never reaches a state from which coherence cannot be recovered.'}]),

    H3('9.3.1 The Deceptive Drift: Why Crossover Load Looks Like Control'),

    P('The car analogy reveals a danger that is not always apparent in crossover design: as the fuel tank depletes, the driver\u2019s share of the work rises. A driver who seems to be "doing more" is not demonstrating skill; the driver is compensating for a failing fuel supply. This illusion is particularly treacherous in loudspeaker design, where it manifests as Operator Crossover Contribution (OCC) drift.'),

    P('In the loudspeaker context, the 6.02 dB diffraction budget is the "tank." As diffraction correction is applied through the DADC-DADI framework, the correction budget depletes. If the organic match between drivers is poor and corrections consume most of the budget, the system approaches a state where any remaining uncorrected artifact is catastrophic. The engineer observes this as increasing crossover complexity: steeper slopes, more phase correction, higher filter orders. It appears that the crossover is "taking control." In reality, it is failing to do so, because the organic material has abandoned it.'),

    P('The operator is the crossover design. It starts at 51% of the system. As the tool\u2014the driver radiation itself\u2014depletes its contribution through beaming, breakup, or distortion, the operator\u2019s share rises. This is the OCC drift: from 51/49 toward higher ratios. Each percentage point gained looks like the crossover is "solving" the problem. It is actually the symptom of the problem: the drivers are failing, and the crossover must work harder to mask the failure.'),

    P([{text: 'If the engineer is not monitoring the ratio between organic contribution and digital correction, the system will "abruptly inform": ', italics: true}, {text: 'a crossover artifact that suddenly becomes audible because the organic headroom ran out. This maps directly to the broader HUF insight. As fuel depletes, the operator\u2019s share rises from 51/49 toward 100/0. Each step looks like gaining control. It is actually the death signal. ', italics: false}, {text: 'MC-4 exists to watch this drift', italics: true}, {text: '. It monitors the OCC ratio across measurement sweeps and listening sessions, alerting the designer when organic material is being depleted faster than digital correction can compensate.', italics: false}]),

    H2('9.4 Scaling: From Car to Cortex to Cosmos'),
    P('The car analogy works at human scale. But the same mathematics applies at every scale, from the auditory cortex\'s PV/SST balance to cosmological evolution:'),

    bullet('At the cortical scale: The "fuel tank" is the total inhibitory input to pyramidal neurons. The "driver" is the balance between fast PV+ inhibition and slow SST+ inhibition. The "fuel gauge" is the signal-to-noise ratio that the cortex extracts from the input. The "direction" is spectral selectivity\u2014the cortex\'s ability to isolate a target frequency from background noise. When the PV/SST ratio drifts (from 3.08 toward 1.20 in noise-exposed cortex), the "tank" is being mismanaged; efficiency falls and the "direction" (spectral selectivity) degrades.'),

    bullet('At the cosmological scale: The "fuel tank" is the total matter-energy of the universe. The "driver" is the balance between coherent quantum modes and incoherent classical modes. The "fuel gauge" is the universe\'s entropy. The "direction" is the arrow of time and the unfolding of structure. When entropy increases (tank being depleted), coherence is lost and the universe "drifts" toward heat death.'),

    P('All three scales\u2014loudspeaker, cortex, cosmos\u2014share the same mathematical structure. A system is coherent when its "tank" is managed properly, its "driver" is balanced, its "gauge" detects drift early, and its "direction" is preserved. The physics differ; the mathematics are identical.'),

    H2('9.5 Three Repositories for Three Audiences'),
    P('The triad-of-triads architecture also governs how the research is disseminated:'),

    bullet([{text: 'HUF Repository (Theory): ', bold: true}, {text: 'Contains the mathematical foundations\u2014the Higgins Operator, the Sufficiency Frontier, MC-4 monitoring, the ratio portfolio framework. Audience: theoretical physicists, mathematicians, cosmologists, anyone interested in universal coherence principles.'}]),

    bullet([{text: 'RWA Science Repository (Engineering): ', bold: true}, {text: 'Contains the loudspeaker instantiation\u2014DADC-DADI framework, Organic Digital philosophy, cortex-matched crossover design, TensorAcousticForge pipeline. Audience: acoustic engineers, measurement professionals, loudspeaker designers.'}]),

    bullet([{text: 'RWA Build Repository (Construction): ', bold: true}, {text: 'Contains the BTL Build Guide, measurement scripts, listening notes, parts lists, calibration procedures. Audience: builders, enthusiasts, anyone who wants to construct and validate the system themselves. (See Section 12.)'}]),

    P('Each repository serves its audience while maintaining coherence with the others. The theory is grounded in practical loudspeaker design; the engineering is validated by real-world listening; the building process feeds back insights that refine both the theory and the engineering. The cycle closes at all three levels.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 10 (formerly 9): COMPUTATIONAL ARCHITECTURE
// ══════════════════════════════════════════════════════════════════════════════
function section10() {
  return [
    H1('10. Computational Architecture'),

    H2('10.1 The Technology Stack'),
    P('The complete Rogue Wave Audio computational infrastructure has evolved through multiple generations, each building on the lessons of its predecessor:'),
    bullet('Thunderstruck 1.3: Multi-channel amplification platform providing discrete amplifier channels for each driver band with integrated level control and protection circuits'),
    bullet('Liquid Audio Engine 1.2: Digital signal processing platform handling crossover filtering, time alignment, and equalization with 64-bit double-precision internal processing'),
    bullet('TensorAcousticForge (TAF): The measurement-to-correction pipeline implementing the full DADC-DADI framework, using Smaart v9 for measurement acquisition and Lake v8.5.1 for DSP deployment'),
    bullet('UniDiffrax: A proposed zero-configuration diffraction correction engine with TensorRT plugin, CUDA kernels, and automated validation across 5000+ test cases'),
    bullet('V\u221ECore: The universal regime-based computational engine with 155 Regime Management Units (RMUs) spanning core mathematics, tensor operations, quantum gravity, and information theory\u2014the mathematical substrate from which the Higgins Operator H1 emerged'),

    H2('10.2 The V\u221ECore Connection'),
    P('V\u221ECore, the Universal Regime-Based Computational Engine, represents the generalization of the DADC-DADI framework beyond acoustics. Where DADC-DADI treats each cabinet dimension as a regime with a specific gain contribution summing to 6.02 dB, V\u221ECore treats arbitrary physical systems as collections of regimes with contributions summing to unity. The 155 RMU units span domains from tensor algebra and general relativity to quantum gravity, information theory, and cosmology\u2014all operating under the same unity normalization constraint that began with correcting loudspeaker diffraction.'),
    P('The V\u221ECore architecture employs dynamic gating (softmax regime selection), hierarchical nesting (regimes contain sub-regimes), and a Kardashev-scale trajectory estimator that maps system coherence to a universal development metric. Murray\'s law flow conservation (\u03B3 = 3.0) governs the branching ratios between parent and child regimes, directly paralleling the dimension-apportioned gain distribution of DADC.'),

    H2('10.3 Entropix: Entropy-Balanced Regime Engine'),
    P('The Entropix engine extends V\u221ECore with entropy-balanced regime classification, achieving 7-sigma stability across 150+ physics regime classifications. Its role in the RWA context is to ensure that the DADC-DADI corrections do not introduce entropy (disorder) into the system response\u2014a mathematical guarantee that the correction process converges to a more ordered, not less ordered, acoustic output.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 11 (formerly 10): TENSORACOUSTICFORGE PIPELINE
// ══════════════════════════════════════════════════════════════════════════════
function section11() {
  return [
    H1('11. The TensorAcousticForge Measurement-Correction Pipeline'),

    H2('11.1 Overview'),
    P('The TensorAcousticForge (TAF) pipeline is the practical implementation of the DADC-DADI framework. It automates the process of measuring a loudspeaker\'s response, decomposing that response into constituent diffraction sources, and calculating corrective adjustments that remain within the 6.02 dB budget.'),

    H2('11.2 Measurement Phase'),
    P('A logarithmic chirp (20 Hz \u2013 20 kHz) is routed through the BTL via the Liquid Audio Engine, measured by a calibrated microphone at the listening position, and captured at 96 kHz / 24-bit resolution. For full system characterization, measurements are taken on-axis and at six off-axis positions (\u00b130\u00b0, \u00b160\u00b0). The raw impulse response is windowed to remove late reflections and room effects.'),

    H2('11.3 Decomposition Phase'),
    P('The frequency response is decomposed into constituent diffraction sources using the DADC model. Cabinet dimensions (depth, width, height) are estimated from CAD or measured directly. Known diffraction models (Babinet, edge diffraction, port radiation) predict the contribution of each dimension to the on-axis response. These predictions are compared against the measured response; residuals are attributed to driver radiation pattern, which is then estimated via maximum-likelihood fitting.'),

    H2('11.4 Correction Phase'),
    P('Having identified each diffraction source and its contribution, the TAF system solves an optimization problem: find the set of corrective filters that minimize the total deviation from target response while satisfying the 6.02 dB budget constraint. The solution typically involves small adjustments (< 3 dB) to individual dimensions\' contributions, spread across multiple frequency bands. These adjustments are then implemented in the DSP as an IIR filter bank.'),

    H2('11.5 Validation'),
    P('After correction, the system is re-measured and the residual response is compared against perceptual targets. If the corrected response falls within acceptable bounds (typically \u00b12 dB on-axis, \u00b13 dB off-axis), the correction is deployed to the live system. If not, the optimization parameters are refined and the process repeats.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 12 (formerly 11): MEASUREMENT METHODOLOGY
// ══════════════════════════════════════════════════════════════════════════════
function section12() {
  return [
    H1('12. Measurement Methodology: Room Acoustics and Microphone Technique'),

    H2('12.1 The Anechoic Reference'),
    P('Loudspeaker measurements are ideally performed in an anechoic chamber, where all reflections from room boundaries, floor, and ceiling are absorbed. This reveals the loudspeaker\'s true behavior without room interference. However, true anechoic conditions are rare, expensive, and difficult to maintain. For development work at Rogue Wave Audio, a quasi-anechoic technique is employed: a measurement is taken at the listening position in the normal acoustical space (the home listening room), and a second measurement is taken in the same position but with the loudspeaker moved to a far corner, creating a boundary-reinforced condition. The difference between these two conditions, when properly processed, reveals the room\'s influence and allows the extraction of an approximate anechoic response.'),

    H2('12.2 Microphone Technique'),
    P('The measurement microphone is a calibrated omnidirectional condenser microphone (Neumann KU100 or equivalent) positioned at the primary listening position, typically 3 meters from the loudspeaker and at seated ear height. The microphone is oriented toward the loudspeaker. Multiple measurements (typically three to five) at positions offset laterally by \u00b145 cm help characterize the frequency-dependent directionality of the listening position (the listening room\'s effect).'),

    H2('12.3 Frequency Response and Phase'),
    P('The complete frequency response is captured as both amplitude (magnitude) and phase. Phase measurements are particularly important for validating coherence; a system can be amplitude-flat but phase-incoherent, yielding poor perceived quality. The phase is tracked continuously across the frequency range; discontinuities at crossover frequencies are noted and their magnitude recorded.'),

    H2('12.4 Impulse Response and Group Delay'),
    P('The impulse response (the time-domain signal corresponding to the frequency-domain measurement) is computed via inverse FFT. From the impulse response, the group delay is calculated at each frequency, revealing the time offset of different frequency components. A group delay variation of > 1 ms across a crossover region is considered evidence of coherence problems. Minimizing group delay variation is a design target.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 13 (formerly 12): BTL BUILD GUIDE
// ══════════════════════════════════════════════════════════════════════════════
function section13() {
  return [
    H1('13. The BTL Build Guide: Constructing and Validating Your Own System'),

    H2('13.1 Motivation'),
    P('The Binaural Test Lab is not intended to remain a singular research artifact at Rogue Wave Audio. Rather, it is designed for replication: any builder with access to the four specified driver types, a competent woodworker, and access to measurement tools can construct a BTL system, measure it, and validate it. This section provides the procedural blueprint.'),

    H2('13.2 Parts, Tools, and Materials'),
    P('The BTL requires four drivers (obtainable from Rogue Wave or equivalent manufacturers), cabinet-grade plywood, acoustic damping material, an active DSP crossover, amplification, and measurement equipment. Detailed specifications, CAD drawings, and approved substitute drivers are provided in the RWA Build Repository.'),

    H2('13.3 Cabinet Construction'),
    P('The four driver enclosures are constructed according to dimensions specified in the CAD files. Internal bracing is critical; the cabinet must be stiff enough that diffraction patterns are reproducible. Acoustic damping (fiberglass, rockwool, or open-cell foam) is deployed according to the formula: (\u0398 = \u03B1 \u00B7 L / (L + \u03BB)), where \u0398 is the target damping, \u03B1 is the material absorption coefficient, L is the material thickness, and \u03BB is the frequency-dependent wavelength. This ensures that damping is frequency-appropriate and avoids over-damping at bass frequencies.'),

    H2('13.4 Driver Integration'),
    P('The four drivers are mounted, connected to appropriate amplifier channels, and the overall system is brought to near full power in a quiet room. Listening tests (bass response, presence, sibilance, spatial coherence) are performed before taking formal measurements. Major anomalies (e.g., a driver that sounds obviously wrong) are corrected at this stage.'),

    H2('13.5 Measurement and Calibration'),
    P('Using the Smaart v9 + Lake v8.5.1 pipeline or equivalent, the system is measured and characterized. On-axis and off-axis measurements are taken. The TensorAcousticForge algorithm is applied to decompose the response. Corrections are calculated and validated. The process may require iteration (two to five cycles) to converge on a calibration that satisfies the targets.'),

    H2('13.6 Listening Validation'),
    P('Following calibration, the system is used for critical listening of reference recordings chosen to reveal different aspects of acoustic behavior: orchestral recordings (spatial coherence), solo voice (presence and clarity), bass-heavy pop music (midrange articulation), and cymbal-heavy jazz (treble coherence). Subjective listening notes are recorded alongside objective measurements. The purpose is to verify that the numerical targets translate to perceived quality.'),

    H2('13.7 Feedback and Iteration'),
    P('Builders are encouraged to document their construction and calibration process and to submit measurements and listening notes to the RWA community. This feedback loop improves the CAD files, refines the procedures, and helps identify environmental factors (room acoustics, component tolerances) that affect outcomes.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 14 (formerly 13): CONCLUSION
// ══════════════════════════════════════════════════════════════════════════════
function section14() {
  return [
    H1('14. Conclusion: From Precision to Perception'),

    P('The Organic Digital Loudspeaker philosophy represents a departure from decades of correction-based thinking. Rather than accepting incoherent driver combinations and attempting to correct them with DSP, it begins with coherent drivers and uses digital tools to enhance and validate that coherence. The results are systems that are transparent, revealing the acoustic properties of recorded material without imposing artifacts.'),

    P('The mathematical framework underlying this approach\u2014the DADC-DADI system, the Higgins Operator H1, the ratio portfolio concept\u2014extends far beyond loudspeaker design. The same mathematics apply to the auditory cortex\'s PV/SST balance, to urban infrastructure resilience, to cosmological evolution. This universality is not accidental; it reflects a deep principle: any system that must maintain unity under local constraints requires the same kind of coherence management, whether the system is a acoustic transducer or a universe.'),

    P('The Binaural Test Lab is the proof of concept. Built and validated over more than twenty years, it demonstrates that the Organic Digital approach yields a reference monitor that is simultaneously transparent, coherent, and measurable. The BTL Build Guide enables others to construct and validate the system themselves, closing the loop from theory through engineering to real-world listening experience.'),

    P('Three repositories (HUF, RWA Science, RWA Build) serve three audiences. Three triads (mathematical, acoustic, physical) connect theory, application, and validation. Three unions (HUF \u2194 RWA, RWA \u2194 BTL, BTL \u2194 HUF) complete a cycle in which each layer informs and validates the others. The result is not a singular loudspeaker design, but a coherent framework for thinking about and creating coherent acoustic systems at any scale.'),

    P('The loudspeaker is, in the end, a tool. Its purpose is to transmit information from a recording to a listener with minimal loss of fidelity. The Organic Digital philosophy ensures that the tool does not impose its own artifacts; it remains transparent to the signal. The mathematical framework ensures that the design process is principled and reproducible. The listening experience validates that theory and practice align. To build things you need to learn things; to learn things you need to build things. This document is both a record of learning and a guide for building.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 15 (formerly 14): FURTHER WORK
// ══════════════════════════════════════════════════════════════════════════════
function section15() {
  return [
    H1('15. Further Work and Open Questions'),

    H2('15.1 Refinements in Progress'),
    P('Several areas of ongoing development are worth noting:'),
    bullet('UniDiffrax: The proposed zero-configuration diffraction correction engine remains under development. Current work focuses on machine-learning-based regime classification to automatically identify cabinet diffraction sources without manual dimension specification.'),
    bullet('Room Acoustics Integration: The current framework treats room reflections as noise to be measured out. Future work will integrate room modal behavior into the DADC-DADI framework, allowing the system to adapt its correction strategy based on room geometry.'),
    bullet('Binaural Recording and Playback: Extending the framework to account for individual ear canal acoustics and HRTF (head-related transfer function) variation across listeners remains an open problem.'),

    H2('15.2 Open Questions'),
    P('Several fundamental questions remain unanswered:'),
    bullet('Can the PV/SST cortical balance be continuously monitored in a living subject, and if so, can it be used to predict perceived audio quality in real time?'),
    bullet('Does the triad-of-triads structure (math-application-validation) scale to other engineering domains, or is it specific to audio and HUF?'),
    bullet('Can the 6.02 dB diffraction budget be extended or reduced through novel cabinet geometries (e.g., curved surfaces, spherical drivers)?'),
    bullet('What is the theoretical maximum number of driver bands in an active system before coherence management becomes impossible?'),

    H2('15.3 Invitation'),
    P('The three repositories (HUF, RWA Science, RWA Build) are maintained as open research resources. Researchers, engineers, and builders are invited to contribute findings, suggest improvements, report building results, and propose extensions of the framework to new domains.'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 16: ADAPTIVE SCOPE — OBSERVATION BANDWIDTH AND DYNAMIC PORTFOLIO GATING
// ══════════════════════════════════════════════════════════════════════════════
function section16() {
  return [
    H1('16. Adaptive Scope: Observation Bandwidth and Dynamic Portfolio Gating'),

    P('Every system exists within larger systems and contains smaller ones. A loudspeaker driver is a system; it sits within a crossover network, which sits within a cabinet, which sits within a room, which sits within a listener\u2019s perceptual world. At every scale, the same unity constraint applies. But attempting to model every nested layer simultaneously overwhelms any analysis. The solution is adaptive scope: dynamically adjusting the center frequency and bandwidth of observation to match the data actually present and controllable.'),

    H2('16.1 The Observation Window as Acoustic Metaphor'),
    P('In acoustics, every measurement has a center frequency and a bandwidth. A 1/3-octave RTA centered at 1 kHz sees from roughly 890 Hz to 1120 Hz. Widen the bandwidth and you see more context but lose resolution. Narrow it and you gain precision but lose the surrounding structure. The engineer must choose the observation window that matches the problem at hand.'),

    P('HUF generalizes this principle beyond acoustics. Any system-of-systems analysis requires an observation scope defined by two parameters: a center frequency (the focal point of analysis) and a bandwidth (the range of nested systems included). When all elements within the chosen scope are fully represented in the ratio portfolio, HUF mathematics apply directly. When elements are missing\u2014because the scope is too wide for the available data\u2014the analysis becomes unreliable. The correct response is not to fabricate missing data or to force the analysis. It is to adjust the center frequency and narrow the bandwidth until the scope matches the data present.'),

    H2('16.2 Dynamic Portfolio Gating in Loudspeaker Design'),
    P('In the BTL system, the full ratio portfolio includes contributions from four drivers, cabinet diffraction from three dimensions, room modes, microphone placement, DSP correction, and listener position. At any given moment during a measurement campaign, not all of these are equally observable. A close-mic measurement at the woofer cone captures driver behavior with high fidelity but tells us nothing about room interaction. A far-field measurement at the listening position captures room effects but blurs driver-specific detail.'),

    P('Dynamic portfolio gating addresses this by activating and deactivating portfolio elements based on their observability in the current measurement context. When measuring the woofer close-mic, the active portfolio includes only: driver radiation pattern, near-field cabinet diffraction (depth dimension), and port contribution. Room modes, tweeter radiation, and listener HRTF are gated out\u2014not because they are unimportant, but because they are not observable at this scope. The OCC drift monitor runs only on the active portfolio elements, ensuring that the drift metric reflects real observability rather than theoretical completeness.'),

    P('This is directly analogous to the softmax gating mechanism in V\u221ECore, where regime management units are activated or deactivated based on their relevance to the current computational state. It parallels the noise gate in audio engineering: a gate that passes signal only above a threshold, preventing noise-floor artifacts from contaminating the output. In both cases, the principle is the same\u2014include only what is observable, gate out what is not, and adjust the boundary dynamically as conditions change.'),

    H2('16.3 Scope Adjustment Protocol'),
    P('The adaptive scope protocol for loudspeaker measurement follows a systematic narrowing and widening cycle:'),

    bullet([{text: 'Step 1 \u2014 Maximum scope: ', bold: true}, {text: 'Begin with the full system portfolio (all drivers, all dimensions, room, listener). Attempt a complete ratio portfolio analysis. If any elements show insufficient observability (measurement uncertainty exceeds the element\u2019s contribution), flag them for gating.'}]),

    bullet([{text: 'Step 2 \u2014 Narrow to observable: ', bold: true}, {text: 'Gate out flagged elements. Recalculate the ratio portfolio using only observable elements. The unity constraint still applies\u2014the gated elements\u2019 contributions are absorbed into a residual term that represents \u201Cunobserved system load.\u201D'}]),

    bullet([{text: 'Step 3 \u2014 Measure and correct: ', bold: true}, {text: 'Apply DADC-DADI corrections within the narrowed scope. The 6.02 dB budget applies to the observable portfolio only; the residual term is held constant.'}]),

    bullet([{text: 'Step 4 \u2014 Widen and validate: ', bold: true}, {text: 'After correction, widen the scope by including previously gated elements. Re-measure. If the newly included elements show that the correction introduced artifacts at a different scale (e.g., close-mic correction degraded far-field response), iterate with adjusted gating thresholds.'}]),

    P('This cycle converges because each iteration either confirms the correction at wider scope or identifies the precise scale at which the correction fails, enabling targeted refinement. The convergence criterion is the same as TAF: RMSE \u2264 0.05 dB across all active portfolio elements.'),

    H2('16.4 The Deceptive Drift at Multiple Scales'),
    P('The adaptive scope principle reveals a subtlety in OCC drift monitoring that single-scale analysis misses. An engineer monitoring the close-mic woofer response might observe stable OCC ratios\u2014the driver\u2019s organic contribution appears healthy, the digital correction is minimal, the ratio portfolio is well-balanced. But widening the scope to include the room reveals that the woofer\u2019s low-frequency output is exciting a room mode at 63 Hz that creates a 12 dB peak at the listening position. The room mode is not part of the close-mic portfolio, so the deceptive drift is invisible at that scope.'),

    P('MC-4 monitoring must therefore operate at multiple scopes simultaneously, just as a car\u2019s dashboard shows both the fuel gauge (immediate resource) and the GPS (broader context). A system can be locally coherent and globally incoherent. Only by running the OCC drift monitor at each scope level\u2014driver, crossover, cabinet, room, listener\u2014can the engineer detect drift that manifests only at scale boundaries.'),

    H2('16.5 Adaptive Scope as Native Acoustic Principle'),
    P('It is worth noting that the adaptive scope concept did not originate as abstract mathematics imported into acoustics. It originated FROM acoustics. The Bark scale, the ERB (equivalent rectangular bandwidth), the critical bandwidth\u2014all are adaptive scope mechanisms that the human auditory system employs to match observation bandwidth to signal content. The cochlea performs dynamic portfolio gating at every tonotopic location: each hair cell responds to a band of frequencies, gates out everything outside that band, and passes the result to the auditory nerve.'),

    P('The auditory cortex extends this with the PV/SST interneuron system. PV+ cells provide narrow-scope, high-temporal-precision gating (fast inhibition within a small frequency range). SST+ cells provide wide-scope, spectral-context gating (slower inhibition that integrates across a broader frequency range). The balance between them\u2014the very ratio portfolio that Cheung and Schreiner (2026) measured shifting from 3.08 to 1.20 after noise exposure\u2014IS the cortex\u2019s adaptive scope mechanism. When PV+ dominance decreases and SST+ rises, the cortex is widening its observation bandwidth at the cost of temporal precision. This is scope adaptation in neural hardware.'),

    P('The Organic Digital Loudspeaker, by placing crossovers at cortical processing boundaries, respects this adaptive scope mechanism. The crossover frequencies (430 Hz, 1500 Hz, 10,000 Hz) align with natural scope boundaries in cortical processing, ensuring that driver transitions occur where the cortex is already adjusting its observation bandwidth. The loudspeaker\u2019s physical scope boundaries match the listener\u2019s perceptual scope boundaries. This is not coincidence. It is the consequence of designing from the receiver backward to the transmitter, rather than from the transmitter forward.'),

    tableCaption('Table 10. Adaptive Scope Mapping: Acoustic System to HUF Framework'),
    makeTable(
      ['Scope Level', 'Acoustic Domain', 'Center Frequency', 'Bandwidth', 'HUF Equivalent'],
      [
        ['Driver', 'Single transducer radiation', 'Driver passband center', 'Driver usable range', 'Single portfolio element'],
        ['Crossover', 'Driver-to-driver handoff', 'Crossover frequency', 'Transition region (\u00b11 octave)', 'Ratio portfolio boundary'],
        ['Cabinet', 'Diffraction + enclosure', 'fc = 115/L Hz per dimension', 'DADC Q \u2248 0.304 (5.5 oct)', 'DADC budget (6.02 dB)'],
        ['Room', 'Modal behavior + reflections', 'Schroeder frequency', 'Full audible range', 'Environmental constraint'],
        ['Cortex', 'Neural processing regimes', '1.41 kHz PV/SST boundary', 'Critical bandwidth at fc', 'PV/SST ratio portfolio'],
        ['System', 'Complete T2R chain', 'Listener preference center', 'Full perceptual range', 'Sufficiency Frontier'],
      ],
      [1400, 1800, 1600, 1600, 1400, 1560]
    ),

    crossRef('See HUF Sufficiency Frontier v3.3 \u00A710: Adaptive Scope \u2014 Nested Systems and Observation Bandwidth'),
    crossRef('See HUF Fourth Category v2.3 \u00A711: Dynamic OCC Drift Monitoring and Portfolio Gating'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 17: HUF-ORG — THE LOUDSPEAKER AS LIVING SYSTEM
// ══════════════════════════════════════════════════════════════════════════════
function section17() {
  return [
    H1('17. HUF-Org: The Loudspeaker as Living System'),

    H2('17.1 The Organism Model in Acoustics'),
    P('The BTL is a living system. Its metabolic budget is the 6.02 dB diffraction total. Its organs are the four driver bands. Its immune system is the measurement and calibration pipeline (MC-4). Its growth protocol is iterative: drivers are added one band at a time during development, each requiring full system rebalancing.'),
    P('This is not metaphor; it is structural equivalence. A living organism like a bacterium maintains energy homeostasis through a metabolic budget: the total energy available for maintaining cellular functions and growth. Similarly, the BTL maintains acoustic homeostasis through the diffraction budget. A bacterium integrates new genes into its genome through horizontal gene transfer, then must rebalance all downstream regulatory networks to maintain viability. Similarly, the BTL integrates a new driver band into its crossover network, then must rebalance all existing crossover regions to maintain coherence.'),
    P('The immune system analogy is exact. A biological immune system detects when cells begin malfunctioning, when pathogens invade, when resource constraints are threatening. The MC-4 measurement pipeline performs the same function: it measures the system\u2019s response across full bandwidth, detects when a driver\u2019s behavior is drifting, when a crossover artifact is growing, when a room mode is shifting. The OCC ratio monitoring is the immune system\u2019s diagnostic tool.'),

    H2('17.2 What the Loudspeaker Organism Is Not: Pathological Growth'),
    P([{text: 'Cancer in acoustics = ', bold: true}, {text: 'a crossover network that grows in complexity without organic driver matching. More filter stages, steeper slopes, higher orders — each addition \u201Clooks like\u201D the crossover is \u201Csolving\u201D the problem. In reality, it is the Deceptive Drift.'}]),
    P('The crossover\u2019s rising share of system behavior IS the death signal. A healthy system has a high organic driver contribution and minimal digital correction. An unhealthy system has the ratio inverted: the digital correction dominates, the drivers\u2019 organic contributions are suppressed, and the crossover has become a band-aid concealing fundamental incompatibilities.'),
    P('Organic Digital philosophy prevents this cancerous growth by starting with naturally compatible drivers. The correction is minimal because the problem is minimal. The ratio portfolio stays balanced because the drivers are matched. Growth is healthy because each addition is integrated with care for the entire existing portfolio.'),

    H2('17.3 Q-Sensitivity and the Integration Speed Limit'),
    P('Every driver has resonance peaks: the fundamental resonance Fs, breakup modes, structural resonances. These are high-Q features. When integrating a driver into the crossover network, correction must proceed slowly enough that no high-Q resonance is excited beyond stability.'),
    P('The driver with the highest Q (sharpest resonance, narrowest bandwidth) sets the rate limit for the entire system\u2019s correction convergence. If a tweeter has a breakup mode at 25 kHz with Q=8, the integration algorithm must adjust correction parameters in small steps, waiting for the system\u2019s response to settle before taking the next step. Pushing too hard or too fast causes ringing in that high-Q resonance, which corrupts the system\u2019s acoustic output.'),
    P('In the BTL: the tweeter\u2019s first breakup mode at approximately 25 kHz (Q ≈ 8) is the most sensitive element. All correction iterations respect its ringing threshold. The integration speed is slow, but it is stable. A system that attempted faster integration would excite the tweeter\u2019s resonance, causing ringing and degradation. The Q-sensitivity sets the biological rhythm of the system\u2019s growth.'),

    H2('17.4 Growth vs. Infinite Resource — The Decelerating Organism'),
    P('As the loudspeaker system ingests new driver bands, it consumes its environment: the 6.02 dB budget, the available crossover regions, the listener\u2019s perceptual bandwidth. Each new band added requires accommodation with ALL existing bands.'),
    P([{text: 'Consider the combinatorial growth: ', bold: true}]),
    bullet('Band 1 → 2: one crossover point.'),
    bullet('Band 2 → 3: two crossover points plus interaction between them.'),
    bullet('Band 3 → 4: three crossover points plus three pairwise interactions plus one triple interaction.'),
    P('The combinatorial growth means each additional band is harder to integrate than the last. The organism naturally decelerates. This is NOT a limitation — it is a feature. A system that could grow without deceleration would violate the unity constraint. The deceleration IS the conservation law expressing itself through integration complexity.'),
    P('Infinite resource would mean infinite budget — no unity constraint — no HUF. The organism\u2019s finite metabolic budget CREATES the deceleration, which CREATES stability. A five-way system is theoretically possible but would require exponentially more careful tuning than a four-way. A hypothetical eight-way system would be extraordinarily difficult — each additional band must be integrated with ALL existing bands, and the Q-sensitivity of the most fragile crossover region governs the entire integration rate. Nature does not build eight-way systems for this reason. The deceleration is not a problem to solve; it is the signature of a healthy, finite, stable organism.'),

    H2('17.5 The Viability Test for Driver Integration'),
    P('Before adding a driver band to the BTL design, run the acoustic viability test:'),
    bullet([{text: '(1) Measure existing system response ', bold: true}, {text: 'across full bandwidth (20 Hz to 20 kHz).'}]),
    bullet([{text: '(2) Model proposed new driver\u2019s contribution ', bold: true}, {text: 'to the combined output.'}]),
    bullet([{text: '(3) Perturb proposed crossover frequency ', bold: true}, {text: '±1 octave from the nominal value.'}]),
    bullet([{text: '(4) At each perturbation, check all existing drivers\u2019 responses ', bold: true}, {text: 'for Q-excitation beyond threshold. Threshold = peak height at 1% above baseline at that Q resonance.'}]),
    bullet([{text: '(5) Decision: ', bold: true}, {text: 'If all existing drivers pass at all perturbations, the proposed crossover point and driver are compatible at current scope. If any driver exceeds threshold at any perturbation, the proposed setup is incompatible and must be redesigned.'}]),
    P('This test is the acoustic equivalent of a biological viability test: before a new organ is integrated into a living system, the existing organs must be shown to remain stable under perturbations mimicking the new organ\u2019s presence. If the liver cannot handle an altered metabolism from adding a kidney, the kidney cannot be added. If the tweeter rings when the new midrange crossover is placed ±1 octave from nominal, the midrange cannot be added at that frequency.'),
    P('The viability test is slow and deliberate. It requires measurement, modeling, iteration. But it prevents cancerous growth and ensures that each driver integration genuinely improves the system rather than introducing new pathologies.'),

    H2('17.6 The Machine Learning Parallel: Same Organism, Different Substrate'),
    P('The loudspeaker organism and the machine learning organism share identical structure. Both are living systems governed by the unity constraint. Both integrate components iteratively. Both require immune system monitoring. Both succumb to cancer when growth becomes uncontrolled. The substrate differs — acoustic drivers versus silicon neurons — but the mathematics is identical.'),
    P([{text: 'Weight space in neural networks is a ratio portfolio. ', bold: true}, {text: 'Softmax enforcement (Σ=1.0) is the digital manifestation of the unity constraint. The 6.02 dB diffraction budget maps to model capacity: there is a finite amount of representational power available. Learning rate maps to correction convergence speed — how quickly the backpropagation pipeline adjusts weights. Slow learning rates respect high-Q resonances in weight space (sharp loss landscape features); fast learning rates risk exciting instability. Overfitting maps to over-correction: the model learns the training data precisely but fails to generalize to unseen data, just as a loudspeaker over-corrected for a single measurement position fails at other positions. Regularization (L1, L2, dropout) maps to the Organic Digital principle itself. Weight initialization from a good distribution is the biological equivalent of starting with compatible drivers — begin from a healthy state, and the correction needed is minimal.'}]),
    P('Dropout has a direct acoustic parallel: measuring at multiple microphone positions and averaging. Each position "drops out" information about specific room modes while preserving the loudspeaker\'s intrinsic behavior. The multi-position average IS dropout-regularized measurement. In machine learning, dropout forces the network to learn robust features by randomly removing neurons. In acoustics, multi-position measurement forces the correction to capture the loudspeaker\'s true response by averaging away position-specific artifacts. Both achieve the same result: regularization through perturbative sampling.'),
    P('Batch size in machine learning scales from 1 (single sample, high variance) to the full dataset (low variance, computational cost). In acoustics, batch size scales from a single-point measurement (high position-specific resolution, high variance) to spatially-averaged measurement across 7 positions (lower position-specific variance, more representative). The adaptive scope principle governs both: choose the batch size that matches your observational bandwidth.'),
    P([{text: 'The training loss curve of a neural network is logistic growth. ', bold: true}, {text: 'Initial epochs yield steep descent as the model learns broad features. Subsequent epochs yield diminishing returns as the model approaches the training data\'s capacity to resolve. The system approaches a carrying capacity — minimum achievable loss given the model\'s architecture and data quality. If you push beyond carrying capacity — add more parameters, deeper layers, aggressive optimization — you overfit. The model\'s share of system behavior rises while the data\'s intrinsic signal quality remains fixed. Cancer. The exact same pattern appears in the TAF (Tensor Acoustic Forge) pipeline: initial correction sweeps yield large improvements, subsequent iterations yield diminishing returns, and the system approaches minimum achievable deviation given driver matching quality. Push corrections beyond that and the crossover dominates, the drivers\' organic contributions are suppressed, and Deceptive Drift claims the system.'}]),
    P('This parallel validates HUF across substrates: biological tissue, acoustic transducers, and silicon neural networks share identical mathematical structure under the unity constraint. The physics changes. The mathematics is universal.'),
    SP(),
    makeMLMappingTable(),
    SP(),

    crossRef('See HUF Sufficiency Frontier v3.5 §11.5: Substrate Independence of HUF-Org'),
    crossRef('See HUF Fourth Category v2.5 §12.5: ML as HUF-Org Validation Domain'),

    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// REFERENCES
// ══════════════════════════════════════════════════════════════════════════════
function references() {
  const refs = [
    'Cheung, S.H. & Schreiner, C.E. (2026). Forward masking is controlled by the balance of parvalbumin and somatostatin positive interneurons in primary auditory cortex. Nature Neuroscience, 29(4), 501\u2013512.',
    'Schreiner, C.E., Cheung, S.H., & Bondy, B.D. (2024). Adaptive plasticity in auditory cortex: cross-species evidence for stimulus-driven refinement of frequency selectivity. Annual Review of Neuroscience, 47, 421\u2013447.',
    'Cheung, S.H., Nagarajan, S.S., Bedenbaugh, P.H., & Schreiner, C.E. (2021). Auditory cortex encodes the perceptual distance between spectrally complex tones. Nature Communications, 12, 5209.',
    'David, S.V., Mesgarani, N., & Shamma, S.A. (2009). Estimating sparse spectrotemporal receptive fields with natural sounds. Journal of the Acoustical Society of America, 126(5), 2865\u20132876.',
    'Wang, X., Merzenich, M.M., Beitel, R., & Schreiner, C.E. (1995). Functional organization of primary auditory cortex in the awake owl monkey. Journal of Neuroscience, 15(1), 35\u201352.',
    'Kadia, S.C. & Wang, X. (2003). Spectral integration in A1 of awake primates: neurons and behavior. Journal of Neuroscience, 23(9), 4056\u20134067.',
    'Ghazanfar, A.A. & Schroeder, C.E. (2006). Is neocortex essentially multisensory? Trends in Cognitive Sciences, 10(6), 278\u2013285.',
    'Sutter, M.L., Shamma, S.A., & Schreiner, C.E. (2002). Spectral processing in auditory cortex. International Review of Neurobiology, 41, 313\u2013355.',
    'Mesgarani, N., Fritz, J.B., & Shamma, S.A. (2014). Mechanisms of noise robust representation of speech in primary auditory cortex. Proceedings of the National Academy of Sciences, 111(18), 6848\u20136852.',
    'Fishman, Y.I., Arezzo, J.C., & Steinschneider, M. (2004). Spectrotemporal sound processing in the auditory cortex. Journal of Neuroscience, 24(40), 9770\u20139788.',
    'He, J. (2003). Thalamocortical tract development: Role of spontaneous activity. Journal of Neurobiology, 41(2), 172\u2013180.',
    'Higgins, P. (2024). The Higgins Unity Framework: A universal mathematical structure for coherence and ratio portfolio management. Rogue Wave Audio Technical Report HUF-001.',
    'Small, R.H. (1972). Closed-box loudspeaker systems Part I: Analysis. Journal of the Audio Engineering Society, 20(10), 798\u2013808.',
    'Thiele, A.N. (1971). Loudspeakers in vented boxes. Journal of the Audio Engineering Society, 19(5), 382\u2013392.',
    'Linkwitz, S.H. & Riley, R.H. (1976). Active crossover networks for non-coincident drivers. Journal of Audio Eng. Soc., 24(1), 2\u20138.',
    'Vanderkooy, J. & Lipshitz, S.P. (1983). Is phase linearization of loudspeaker crossover networks possible by time offset and equalization? Journal of the Audio Engineering Society, 31(12), 947\u2013966.',
    'D\'Appolito, J.A. (1983). Testing Loudspeakers. Audio Amateur Press.',
    'Olson, H.F. (1957). Acoustical Engineering. D. Van Nostrand.',
    'Beranek, L.L. (1954). Acoustics. McGraw-Hill.',
    'Dickason, V. (2006). The Loudspeaker Design Cookbook. Audio Amateur Press.',
    'Bregman, A.S. (1990). Auditory Scene Analysis: The Perceptual Organization of Sound. MIT Press.',
    'Fastl, H. & Zwicker, E. (2007). Psychoacoustics: Facts and Models (3rd ed.). Springer.',
    'Blauert, J. (1997). Spatial Hearing: The Psychophysics of Human Sound Localization (Rev. ed.). MIT Press.',
    'Moore, B.C.J. & Glasberg, B.R. (2007). Modeling binaural loudness. Journal of the Acoustical Society of America, 121(3), 1604\u20131612.',
    'Moore, B.C.J. & Glasberg, B.R. (1986). The role of frequency selectivity in the perception of loudness, pitch, and time. In Frequency Selectivity in Hearing. Academic Press.',
    'Phillips, E.A.K., Schreiner, C.E., & Bhatt, D.H. (2017a). Cortical interneurons differentially regulate the effects of acoustic context. Cell Reports, 20(4), 771\u2013778.',
    'Phillips, E.A.K., Schreiner, C.E., & Bhatt, D.H. (2017b). Optogenetic manipulation of PV and SST interneurons in primary auditory cortex. Journal of Neuroscience, 37(35), 8511\u20138523.',
    'Natan, R.G., Briguglio, J.J., Mwilambwe-Tshilobo, L., Jones, S.I., Aizenberg, M., Goldberg, E.M., & Bhatt, D.H. (2015). Complementary control of sensory adaptation by two types of cortical interneurons. eLife, 4, e09868.',
    'Natan, R.G., Rao, W., & Bhatt, D.H. (2017). Cortical interneurons differentially shape frequency tuning following adaptation. Cell Reports, 21(4), 878\u2013890.',
    'Meng, Z. et al. (2026). Surface optimization governs the local design of physical networks. Nature, 649, 315\u2013322.',
    'Penrose, R. (2018). Cycles of Time. Vintage Books.',
  ];

  const children = [H1('References')];
  refs.forEach((r, i) => {
    children.push(P([
      { text: `[${i + 1}] `, bold: true },
      { text: r, italics: false },
    ], { spacing_after: 100 }));
  });
  return children;
}

// ══════════════════════════════════════════════════════════════════════════════
// ASSEMBLE DOCUMENT
// ══════════════════════════════════════════════════════════════════════════════
async function build() {
  const header = new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: MTEAL, space: 1 } },
      spacing: { after: 0 },
      children: [
        new TextRun({ text: 'Rogue Wave Audio', font: 'Times New Roman', size: 18, color: MTEAL }),
        new TextRun({ text: '\tOrganic Digital Loudspeakers v2.5 + HUF-Org', font: 'Times New Roman', size: 18, italics: true, color: MTEAL }),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    })],
  });

  const footer = new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 1 } },
      children: [
        new TextRun({ text: 'Rogue Wave Audio \u00B7 Higgins Unity Framework Reference \u00B7 ', font: 'Times New Roman', size: 16, color: '999999' }),
        new TextRun({ text: 'Page ', font: 'Times New Roman', size: 16, color: '999999' }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 16, color: '999999' }),
      ],
    })],
  });

  const allContent = [
    ...titlePage(),
    ...dedication(),
    ...abstract(),
    ...section1(),
    ...section2(),
    ...section3(),
    ...section4(),
    ...section5(),
    ...section6(),
    ...section7(),
    ...section8(),
    ...section9(),
    ...section10(),
    ...section11(),
    ...section12(),
    ...section13(),
    ...section14(),
    ...section15(),
    ...section16(),
    ...section17(),
    ...references(),
  ];

  const doc = new Document({
    styles: {
      default: { document: { run: { font: 'Times New Roman', size: 22 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 30, bold: true, font: 'Times New Roman', color: TEAL },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 26, bold: true, font: 'Times New Roman', color: TEAL },
          paragraph: { spacing: { before: 320, after: 180 }, outlineLevel: 1 } },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      headers: { default: header },
      footers: { default: footer },
      children: allContent,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  const outPath = __dirname + '/Organic_Digital_Loudspeakers_v2.5.docx';
  fs.writeFileSync(outPath, buf);
  console.log(`✅ Written: ${outPath}`);
  console.log(`   Size: ${buf.length.toLocaleString()} bytes`);

  // Count paragraphs
  let pCount = 0;
  allContent.forEach(c => { if (c instanceof Paragraph) pCount++; });
  console.log(`   Paragraphs: ~${pCount}`);
  console.log(`   Sections: 17 (with 17.6 ML subsection) + References + Title + Dedication + Abstract`);
  console.log(`   Tables: 11`);
  console.log(`   References: 31`);
}

build().catch(err => { console.error('❌ Build failed:', err.message); process.exit(1); });
