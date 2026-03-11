#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════════
// Organic Digital Loudspeakers v2.0 — Complete 25-Year Journey
// Builder: Peter Higgins — Rogue Wave Audio
// "To build things you need to learn things, to learn things you need to build things."
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
  return P([{ text: '\u2022 ' + text }], { indent: 360 + level * 360 });
}

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
      children: [new TextRun({ text: 'Version 2.0', font: 'Times New Roman', size: 20, italics: true, color: MTEAL })] }),
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
    P('"Arrows are very precise when anything they hit is a goal\u2014add a target and let us see how precise they are." Sound reproduction systems must contend with an extraordinarily complex web of interdependent variables spanning acoustics, electronics, psychophysics, and neuroscience. The level of detail required to design a critical listening tool bears no resemblance to designing a recreational loudspeaker. While the topology of cabinet and transducers may appear similar, the integrated systems design approach that produces genuine precision is fundamentally different.'),
    P('The human auditory system possesses remarkable sensitivity. Within the critical listening range of approximately 83 dB SPL, trained listeners can detect intensity changes as small as 0.25 dB for a 1 kHz tone. Any uncontrolled variable in the reproduction chain introduces audible roughness, reduced clarity, and degraded spatial imaging, pushing performance outside the range of optimal psychophysical experience. The challenge is that every parameter within each interdependent subsystem\u2014transducers, amplifiers, crossover networks, cabinets, listening rooms, and the air itself\u2014must be controlled simultaneously.'),
    P('This paper documents twenty-five years of confronting that challenge. The journey began with a simple question: can we build a sound reproduction system precise enough for psychophysics research and critical studio monitoring? The answer required not just engineering excellence but a fundamental reconceptualization of what "precision" means when the ultimate receiver is the human auditory cortex.'),

    H2('1.2 Historical Context'),
    P('The Recording Industry has long relied on monitoring systems that prioritize frequency response flatness as the primary metric of quality. While flat magnitude response is necessary, it is profoundly insufficient. Phase coherence, time-domain accuracy, directional consistency, and the interaction between the loudspeaker and the room all contribute to perceived quality in ways that a single magnitude curve cannot capture. Moreover, the endpoint of the signal chain\u2014the human auditory cortex\u2014processes sound through neural circuits whose characteristics vary with frequency in ways that conventional loudspeaker design ignores entirely.'),
    P('The conventional approach to multi-driver loudspeaker design places crossover frequencies at points determined primarily by driver capability: the woofer handles frequencies up to where it begins to beam, the tweeter takes over above its resonance frequency, and the crossover region is placed wherever these constraints intersect. This approach treats the loudspeaker as an isolated engineering artifact rather than as one element in a chain that terminates at neural tissue. The result is crossover frequencies that may satisfy driver constraints but create spectral discontinuities at points where the auditory cortex is maximally sensitive.'),

    H2('1.3 The Organic Digital Philosophy'),
    P('The organic digital approach emerged from a key insight: the most effective correction is the one you do not need to apply. Rather than selecting drivers purely on specification sheets and then correcting their deficiencies with aggressive equalization, the organic approach begins with drivers whose natural radiation patterns, frequency responses, and dispersion characteristics are inherently compatible. The "organic" component ensures that the raw acoustic output of the multi-driver array approaches the target with minimal intervention. The "digital" component then applies mathematically precise corrections\u2014through the DADC-DADI framework\u2014to address the remaining discrepancies, particularly the diffraction effects imposed by the physical cabinet.'),
    P('This philosophy inverts the conventional design paradigm. Instead of asking "what can we correct with DSP?" the organic digital approach asks "how can we minimize what needs correction?" The answer involves careful driver selection, baffle geometry optimization, and\u2014critically\u2014crossover frequency placement that respects both driver radiation physics and human cortical processing boundaries.'),

    H2('1.4 Paper Organization'),
    P('This paper is organized to follow the chronological and conceptual arc of the project. Section 2 establishes the psychophysical target\u2014the Human Q\u2014that defines our design goals. Section 3 addresses the diffraction problem and presents the DADC-DADI mathematical framework. Section 4 describes the Binaural Test Lab and the four-way active system that serves as the primary testbed. Section 5 introduces cortex-matched crossover design, drawing on recent neurophysiology. Section 6 develops the Transmitter-to-Receiver Coherence Model. Section 7 presents the organic digital design methodology as a complete, integrated system. Section 8 connects this work to the Higgins Unity Framework and the broader mathematical structures that unify diverse physical systems. Sections 9 and 10 present the computational tools and the measurement-correction pipeline. Section 11 discusses the full technology stack. Section 12 addresses future directions, and Section 13 concludes.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2: THE HUMAN Q — PSYCHOPHYSICAL DESIGN TARGET
// ══════════════════════════════════════════════════════════════════════════════
function section2() {
  return [
    H1('2. The Human Q \u2014 Psychophysical Design Target'),
    P('The concept of Quality Factor, Q, is a dimensionless ratio of variables within a system. In the context of sound reproduction, the overall system Q depends on an understanding and execution of the complex interrelationship of parameters. Humans, transducers, amplifiers, interconnects, cabinets, listening rooms, and the air each possess a system Q. The solution of Q in one subsystem that has a mutual connection to another can be used to solve variables within the mutually connected system. This is the principle of system reciprocity that underlies the entire Rogue Wave Audio design approach.'),

    H2('2.1 Intensity and Time Parameters'),
    P('The parameters with the greatest influence on sound perception are sound intensity levels with respect to frequency, interaural intensity difference (IID), and interaural time difference (ITD). These five fundamental variables\u2014intensity, frequency, bandwidth, time, and differential perception between left and right ears\u2014define the space within which a precision system must operate. Studies have shown that human sensitivity to changes in sound level reaches a maximum at approximately 83 dB SPL \u00B1 6 dB. Within this range, the Just Noticeable Difference (JND) in intensity drops below 1 dB, and some listeners detect changes as small as 0.25 dB at 1 kHz.'),
    P('According to NIOSH guidelines, exposure to sound pressure levels above 80 dB should be time-limited. At 83 dB the total daily dose is 12 hours; at 89 dB the daily dose drops to 3 hours. A precision monitoring system must deliver its optimal performance within this intensity window, which is both the region of peak human sensitivity and the practical range for extended critical listening sessions.'),

    H2('2.2 Critical Bandwidth and Crossover Blending'),
    P('The Bark scale describes human frequency perception as 24 critical bands spanning 0 to approximately 20,000 Hz, with a felt vibration region below 20 Hz and bone-conducted ultrasonics above 20 kHz. A complete monitoring system targeting all perceptible recorded sound considers 0\u201330,000 Hz as the frequency bandwidth target. The critical bandwidth at each frequency determines the minimum blending region required for smooth crossover transitions between transducers.'),

    makeTable(
      ['Center Frequency (Hz)', 'Critical Bandwidth (Hz)', 'Bark Band', 'Crossover Implication'],
      [
        ['250', '100', '3', 'Wide blend required; large wavelengths'],
        ['500', '100', '5', 'Sub-mid transition zone; near 430 Hz XO'],
        ['1000', '160', '8', 'Peak sensitivity region'],
        ['1500', '200', '10', 'Mid-upper transition; cortical boundary'],
        ['3000', '300', '14', 'High sensitivity; spatial cue region'],
        ['5000', '700', '17', 'Bandwidth widens; detail region'],
        ['10000', '1300', '21', 'Upper-mid to tweeter; near 10 kHz XO'],
        ['15000', '2500', '23', 'Reduced sensitivity; air absorption'],
      ],
      [1800, 2200, 1800, 3560]
    ),
    tableCaption('Table 1. Critical Bandwidths and Crossover Implications Across the Audio Spectrum'),

    P('A crossover point at 300 Hz, for instance, requires blending both transducers across at least 100 Hz to create a smooth transition. By using the minimum blending bandwidth necessary, we reduce the penalty in phase shift, time delay, and group delay error. The dimensionless parameter kA\u2014the ratio of transducer effective radius to wavelength\u2014governs the transition from omnidirectional to directional radiation and directly constrains crossover design.'),

    H2('2.3 Design Goal: The Invisible System'),
    P('One of the primary design goals is a system that does not draw conscious attention to itself. We need not manipulate psychoacoustic phenomena for effect but rather ensure the system avoids triggering conscious awareness of its presence. The system should be transparent: what the engineer encoded in the recording is what the listener perceives, without coloration, distortion, or artifact. This requires that every element in the reproduction chain\u2014from the digital-to-analog converter through the power amplifier, crossover network, individual drivers, cabinet, and room interaction\u2014be characterized and controlled as a unified system.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3: THE DIFFRACTION PROBLEM & DADC-DADI
// ══════════════════════════════════════════════════════════════════════════════
function section3() {
  return [
    H1('3. The Diffraction Problem and the DADC-DADI Framework'),

    H2('3.1 Diffraction as the Fundamental Challenge'),
    P('Every loudspeaker cabinet imposes diffraction effects on the acoustic output of its drivers. When a transducer mounted on a baffle produces sound, the wavefront propagates outward until it reaches the cabinet edges. At these edges, the wavefront diffracts\u2014bending around the cabinet and producing secondary wavelets that interfere with the direct output. This diffraction manifests as frequency-dependent ripples in the magnitude response, commonly known as the "baffle step." The key physical insight is that diffraction and dispersion are the same phenomenon viewed from different frames: diffraction describes wavefront bending around obstacles, while dispersion describes the frequency-dependent propagation that results. Controlling one necessarily controls the other.'),
    P('The baffle step represents the transition from 4\u03C0 steradian (full-space) radiation at low frequencies\u2014where wavelengths are large relative to cabinet dimensions\u2014to 2\u03C0 steradian (half-space) radiation at high frequencies, where the cabinet acts as an infinite baffle. This transition produces a gain of exactly 20\u00B7log10(2) \u2248 6.02 dB, a result dictated by physics. The frequency at which this transition occurs, and the distribution of the 6.02 dB gain across the cabinet dimensions, is the central problem that DADC addresses.'),

    H2('3.2 Dimension-Apportioned Diffraction Correction (DADC)'),
    P('The DADC framework distributes the total 6.02 dB baffle step gain across the three physical dimensions of a rectangular cabinet (Height H, Width W, Depth D) in proportion to each dimension\'s contribution. The fundamental conditions are:'),
    bullet('When a wavelength is greater than any dimension of the object, 2\u03C0 to 4\u03C0 steradian radiation gain corrections are required'),
    bullet('The sum of all dimensional gains equals exactly 20\u00B7log10(2) = 6.02 dB'),
    bullet('The greater the dimension, the greater the gain required for correction'),
    bullet('A dimension of 0 m contributes 0 dB gain and requires no filter'),
    P('For each dimension, a low-pass shelving filter is applied with a bandwidth of 5.50 octaves. The corner frequency for each dimension is calculated as:'),
    equation('fc = 115 / L'),
    P('where L is the dimension in meters and 115 is the empirical constant (Hz\u00B7m) relating dimension to transition frequency. The gain for each dimension is:'),
    equation('G_H = 6.02 \u00D7 H / (H + W + D)'),
    equation('G_W = 6.02 \u00D7 W / (H + W + D)'),
    equation('G_D = 6.02 \u00D7 D / (H + W + D)'),

    makeTable(
      ['Configuration', 'H (m)', 'W (m)', 'D (m)', 'G_H (dB)', 'G_W (dB)', 'G_D (dB)', 'fc_H (Hz)', 'fc_W (Hz)', 'fc_D (Hz)'],
      [
        ['Point Source', '0', '0', '0', '0', '0', '0', 'NR', 'NR', 'NR'],
        ['Open Baffle', '0.800', '0.368', '0', '4.12', '1.90', '0', '144', '312', 'NR'],
        ['BTL Cabinet', '0.800', '0.368', '0.330', '3.21', '1.48', '1.33', '144', '312', '348'],
      ],
      [1400, 800, 800, 800, 1000, 1000, 1000, 800, 800, 960]
    ),
    tableCaption('Table 2. DADC Test Cases: Point Source, Open Baffle, and BTL Rectangular Cabinet'),

    P('The elegance of the DADC framework lies in its simplicity and physical rigor. The total gain is always exactly 6.02 dB regardless of cabinet geometry\u2014this is not an approximation but a physical law. What varies is only the distribution across dimensions and the frequencies at which the transitions occur.'),

    H2('3.3 Dimension-Apportioned Diffraction Inference (DADI)'),
    P('DADI inverts the DADC process: given a measured acoustic response, DADI estimates the physical geometry of the object that produced it. By fitting the observed baffle step characteristics to shelving filter models, DADI extracts gains and corner frequencies and then solves the inverse system:'),
    equation('H = 115 / fc_H,    W = (G_H / G_W) \u00D7 H,    D = (G_H / G_D) \u00D7 H'),
    P('This reciprocal relationship creates a closed-loop framework: DADC corrects responses (forward), while DADI validates or refines geometries (inverse). In production, DADI enables diagnostic applications including forensic source identification, system verification, and iterative design optimization. Validation testing shows estimation errors below 5% on clean signatures and residuals less than 0.01 dB on reconstructed responses.'),

    H2('3.4 Rectangular Cabinet vs. Standard Baffle Diffraction'),
    P('A critical distinction in the DADC framework is between Rectangular Cabinet Diffraction Correction (CDC) and Standard Baffle Diffraction Correction (BDC). Traditional approaches treat the baffle as a two-dimensional surface, distributing the 6.02 dB gain across only height and width. The CDC extends this to three dimensions, recognizing that the cabinet depth introduces its own diffraction signature. For the BTL cabinet (H=0.800 m, W=0.368 m, D=0.330 m), the BDC would assign 4.12 dB to height and 1.90 dB to width, while the CDC distributes 3.21 dB to height, 1.48 dB to width, and 1.33 dB to depth\u2014totaling the same 6.02 dB but with more accurate correction.'),
    crossRef('See Section 10 for the TensorAcousticForge pipeline implementing DADC-DADI correction.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4: THE BINAURAL TEST LAB
// ══════════════════════════════════════════════════════════════════════════════
function section4() {
  return [
    H1('4. The Binaural Test Lab (BTL)'),

    H2('4.1 System Architecture'),
    P('The Binaural Test Lab is a four-way active monitoring system designed as both a precision critical listening tool and a validation testbed for the DADC-DADI framework. The system uses dedicated amplification for each driver band, eliminating passive crossover losses and enabling precise digital control of crossover characteristics, time alignment, and equalization. The cabinet dimensions (H=800 mm, W=368 mm, D=330 mm) were selected through iterative optimization balancing internal volume requirements, diffraction signature, and driver mounting constraints.'),

    H2('4.2 Driver Complement'),
    makeTable(
      ['Band', 'Driver', 'Effective Area (cm\u00B2)', 'XLin (mm)', 'Role', 'Crossover'],
      [
        ['Low', '32W/4878T01', '531', '14', 'Woofer; pistonic to ~430 Hz', '\u2264 430 Hz'],
        ['Low-Mid', 'M15CH002 E0043', '75', '6', 'Midrange; vocal fundamental', '430\u20131500 Hz'],
        ['High-Mid', 'Exotic T35 X3-06', '11.9', '1', 'Upper-mid; presence & detail', '1500\u201310000 Hz'],
        ['High', 'R2904/700009', '5.6', '0.5', 'Tweeter; air & ambience', '\u2265 10000 Hz'],
      ],
      [1200, 2000, 1600, 1200, 2200, 1160]
    ),
    tableCaption('Table 3. BTL Four-Way Driver Complement and Crossover Assignments'),

    P('Driver selection followed the organic matching principle. The 32W/4878T01 woofer provides a large linear excursion range (14 mm) enabling clean bass reproduction at monitoring levels. The M15CH002 midrange was selected for its exceptionally smooth response through the critical vocal and instrument fundamental range. The Exotic T35 handles the presence region where spatial cues and harmonic detail are critical. The R2904 supertweeter extends response well beyond 20 kHz with controlled, smooth dispersion. Together, these drivers produce a combined response that requires minimal correction\u2014the organic foundation upon which digital correction builds.'),

    H2('4.3 Crossover Frequencies'),
    P('The BTL crossover points were determined through extensive measurement and listening evaluation:'),
    bullet('Low to Low-Mid: 430 Hz \u2014 Below the critical bandwidth inflection around 500 Hz, keeping the woofer-to-midrange transition in a region of relatively wide critical bandwidth where blending artifacts are least audible'),
    bullet('Low-Mid to High-Mid: 1500 Hz \u2014 Precisely at the auditory cortex processing boundary identified by Cheung and Schreiner (2026), where PV+ and SST+ interneuron contributions transition'),
    bullet('High-Mid to High: 10,000 Hz \u2014 Above the primary spatial localization range, in a region of very wide critical bandwidth (1300 Hz) that naturally masks crossover artifacts'),
    P('These frequencies were originally determined empirically\u2014through measurement and critical listening\u2014before the neuroscience validation became available. The convergence between engineering measurement and cortical neurophysiology provides independent confirmation that the organic matching process naturally gravitates toward cortically optimal solutions.'),

    H2('4.4 System Performance'),
    P('The BTL system target Q is 0.600, optimizing transient response and low-frequency alignment. Measured tolerance across the 250 Hz to 8 kHz band is \u00B11.85 dB (left channel) and \u00B11.35 dB (right channel) after DADC correction. CSD (Cumulative Spectral Decay) waterfall measurements confirm clean decay characteristics with no significant resonance artifacts. The system is driven by the Thunderstruck 1.3 amplification platform with the Liquid Audio Engine 1.2 providing digital signal processing and crossover management.'),
    crossRef('See Section 5 for the neurophysiological basis of these crossover frequencies.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5: CORTEX-MATCHED CROSSOVER DESIGN
// ══════════════════════════════════════════════════════════════════════════════
function section5() {
  return [
    H1('5. Cortex-Matched Crossover Design'),

    H2('5.1 Auditory Cortex Processing Regimes'),
    P('The primary auditory cortex (A1) processes sound through a complex network of excitatory pyramidal neurons modulated by inhibitory interneurons. Two classes of inhibitory interneurons dominate: parvalbumin-positive (PV+) fast-spiking cells that provide rapid, temporally precise inhibition, and somatostatin-positive (SST+) cells that deliver slower, more sustained inhibition over broader spectral and temporal ranges. The balance between these two inhibitory networks\u2014their relative strengths, timing, and spectral breadth\u2014varies systematically with characteristic frequency across the tonotopic map.'),
    P('PV+ interneurons are associated with high temporal precision and relatively narrow spectral inhibition. They dominate forward masking at higher characteristic frequencies, producing sharp onset suppression that helps segment rapid temporal sequences. SST+ interneurons provide broader spectral inhibition and contribute to longer-duration suppression effects. They play a larger role at lower characteristic frequencies, where temporal fine structure is more important than rapid onset encoding.'),

    H2('5.2 The 1.41 kHz Processing Boundary'),
    P('Cheung and Schreiner (2026), studying forward masking in squirrel monkey A1, identified a processing boundary near 1.41 kHz where the relative contributions of PV+ and SST+ interneurons to masking undergo a systematic transition. Below this frequency, the contribution ratio (SST/PV contribution to forward masking) is approximately 3.08 in healthy cortex. Above this frequency, the ratio shifts significantly, reflecting a change in the cortical processing strategy from one regime to another.'),
    P('Their study recorded from 224 sites across A1 in both healthy animals and those with unilateral noise-induced hearing loss (NIHL). In NIHL animals, the contribution ratio dropped from 3.08 to 1.20, indicating a dramatic rebalancing of inhibitory networks. The suppression-to-facilitation (Supp/Facil) ratio decreased from 4.9 to 1.26, and the inhibitory bandwidth narrowed by approximately 30% (from 0.65 to 0.48 octaves). These changes were concentrated around the 1.41 kHz boundary, with an exponential fit achieving R\u00B2 = 0.99.'),

    makeTable(
      ['Parameter', 'Healthy Cortex', 'NIHL Cortex', 'Change', 'HUF Interpretation'],
      [
        ['BF Boundary', '1.41 kHz', '1.41 kHz', 'Unchanged', 'Fixed processing regime boundary'],
        ['Contribution Ratio (SST/PV)', '3.08', '1.20', '\u201361%', 'Ratio drift from nominal; MC-4 detectable'],
        ['Supp/Facil Ratio', '4.9', '1.26', '\u201374%', 'Suppression collapse; coherence failure'],
        ['Inhibitory BW (oct)', '0.65', '0.48', '\u201326%', 'Spectral narrowing; regime contraction'],
        ['R\u00B2 (Exponential Fit)', '0.99', '0.97', '\u22120.02', 'Model fit remains strong'],
      ],
      [2000, 1800, 1800, 1200, 2560]
    ),
    tableCaption('Table 4. Cheung & Schreiner (2026) Key Findings: Healthy vs. NIHL Auditory Cortex'),

    H2('5.3 Crossover Placement at Masking Transitions'),
    P('The cortex-matched crossover design principle places driver transitions at frequencies where the auditory cortex is naturally transitioning between processing regimes. At these boundaries, cortical sensitivity to spectral discontinuities is minimized because the processing networks are already in flux\u2014the neural circuits are, in effect, already "switching" between strategies. A crossover artifact at such a boundary is less salient than one placed in the middle of a stable processing regime.'),
    P('The three BTL crossover frequencies map to cortical processing transitions as follows:'),

    makeTable(
      ['Crossover', 'Frequency', 'Cortical Rationale', 'Psychoacoustic Support', 'Driver Consideration'],
      [
        ['Low/Low-Mid', '430 Hz', 'Below PV-dominated regime onset; wide spectral integration region', 'Critical BW = 100 Hz; blending region naturally wide', 'Woofer cone breakup avoided; midrange in linear range'],
        ['Low-Mid/High-Mid', '1500 Hz', 'At PV/SST contribution transition (1.41 kHz boundary)', 'Near peak JND sensitivity; BW transition', 'Midrange upper limit; HM driver enters linear range'],
        ['High-Mid/High', '10000 Hz', 'Well above cortical BF boundary; broad spectral processing', 'Critical BW = 1300 Hz; crossover artifacts naturally masked', 'HM beaming onset; tweeter in optimal dispersion range'],
      ],
      [1400, 1200, 2600, 2400, 1760]
    ),
    tableCaption('Table 5. Cortex-Matched Crossover Placement: Three Frequencies with Multi-Domain Rationale'),

    H2('5.4 Listener Variability and Personalization'),
    P('The cortex-matched approach acknowledges that the 1.41 kHz boundary represents a population-level finding. Individual listeners may exhibit boundary frequencies that differ by up to one-third octave. Future personalized monitoring systems could use psychoacoustic assessment\u2014perhaps leveraging forward masking detection tasks\u2014to determine an individual listener\'s cortical processing boundaries and adjust crossover frequencies accordingly. The BTL system\'s fully digital crossover architecture enables such personalization without hardware modification.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6: TRANSMITTER-TO-RECEIVER COHERENCE MODEL
// ══════════════════════════════════════════════════════════════════════════════
function section6() {
  return [
    H1('6. Transmitter-to-Receiver Coherence Model'),

    H2('6.1 The Four-Stage Signal Chain'),
    P('A precision sound reproduction system is a chain of subsystems, each with its own transfer function, nonlinearities, and noise floor. The Transmitter-to-Receiver Coherence Model formally decomposes this chain into four stages, each with measurable fidelity metrics:'),

    makeTable(
      ['Stage', 'Domain', 'Key Metric', 'Primary Degradation', 'Control Method'],
      [
        ['1. Transducer', 'Electrical \u2192 Acoustic', 'THD < 0.5% at 83 dB', 'Nonlinearity, breakup modes', 'Organic driver selection + DADC'],
        ['2. Room', 'Acoustic \u2192 Spatial', 'RT60, C50, directional consistency', 'Reflections, standing waves, comb filtering', 'Room treatment + DSP correction'],
        ['3. Cochlea', 'Spatial \u2192 Neural', 'OAE, audiometric threshold', 'Hair cell damage, presbycusis', 'Monitoring level control; personalization'],
        ['4. Cortex', 'Neural \u2192 Percept', 'PV/SST balance, Supp/Facil ratio', 'NIHL rebalancing, cortical plasticity', 'Cortex-matched crossover placement'],
      ],
      [1200, 1800, 2000, 2200, 2160]
    ),
    tableCaption('Table 6. Transmitter-to-Receiver Coherence: Four-Stage Signal Chain'),

    P('The overall coherence of the system is the product of stage coherences. A failure at any stage\u2014a nonlinear driver, a reverberant room, cochlear damage, or cortical rebalancing\u2014degrades the perceived result regardless of how well other stages perform. This is why the organic digital approach addresses all four stages: organic driver matching and DADC-DADI correction for Stage 1, room design and DSP for Stage 2, monitoring level discipline for Stage 3, and cortex-matched crossover placement for Stage 4.'),

    H2('6.2 Formal Coherence Metric'),
    P('We define the transmitter-to-receiver coherence C_TR as:'),
    equation('C_TR = \u220F_i C_i(f),  where i \u2208 {transducer, room, cochlea, cortex}'),
    P('Each stage coherence C_i(f) is a frequency-dependent value between 0 and 1, where 1 represents perfect fidelity. The system is coherent when C_TR approaches unity across the audible bandwidth. The DADC-DADI framework directly maximizes C_transducer by correcting diffraction-induced magnitude and phase distortions. Cortex-matched crossover design maximizes C_cortex by placing spectral discontinuities at processing transitions. The organic matching philosophy ensures that C_transducer begins near unity even before digital correction, reducing the correction burden and the risk of introducing correction artifacts.'),

    H2('6.3 Why the Cortex Matters'),
    P('Conventional loudspeaker design implicitly treats the signal chain as terminating at the listener\'s ear canal. The Transmitter-to-Receiver model extends this to the cortex because the perceptual experience is constructed by cortical circuits, not by the cochlea alone. A spectrally flat signal at the ear canal can still produce a suboptimal percept if the spectral content is organized in a way that conflicts with cortical processing strategies.'),
    P('The PV/SST balance in A1 represents the cortex\'s "operating system" for processing different frequency bands. When a crossover introduces a spectral artifact at 1500 Hz\u2014right at the PV/SST transition\u2014the cortex is already managing a natural processing switch. The artifact falls within the "switching noise" of the cortical circuit and is therefore less perceptible than an identical artifact at, say, 2500 Hz, where the cortical processing regime is stable and any spectral anomaly stands out against a consistent background.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 7: THE ORGANIC DIGITAL DESIGN METHODOLOGY
// ══════════════════════════════════════════════════════════════════════════════
function section7() {
  return [
    H1('7. The Organic Digital Design Methodology'),

    H2('7.1 Organic Driver Matching'),
    P('Organic driver matching is the process of selecting transducers whose natural characteristics\u2014response shape, dispersion pattern, harmonic structure, and impedance behavior\u2014are inherently compatible with each other and with the target system response. This goes far beyond matching sensitivity specifications. The key criteria include radiation pattern compatibility (ensuring smooth directional transitions between adjacent drivers), harmonic distortion character (preferring drivers whose distortion spectra are benign and complementary), and mechanical Q matching (selecting drivers whose transient behavior produces coherent time-domain summation).'),
    P('In the BTL system, the four-way architecture provides sufficient degrees of freedom to optimize each band independently while maintaining system-level coherence. The 32W woofer\'s large cone area and long throw produce clean, low-distortion bass. The M15CH002 midrange covers the most critical perceptual region with smooth response and controlled dispersion. The Exotic T35 handles the presence region with a waveguide-loaded compression driver approach that provides consistent directivity. The R2904 supertweeter extends the response with a small, rigid diaphragm that maintains pistonic behavior to well above 20 kHz.'),

    H2('7.2 Digital Correction: The DADC-DADI Engine'),
    P('Once the organic foundation is established, the DADC-DADI framework provides mathematically precise correction of the remaining diffraction effects. The correction is minimal by design\u2014the organic matching ensures that the largest corrections are typically the diffraction-related shelving filters, which are physically motivated and well-behaved. The DADI inverse component validates the corrections by inferring geometry from the corrected response; agreement between inferred and actual geometry confirms that the correction is accurate.'),
    P('The correction pipeline converges when the root-mean-square error (RMSE) between the target response and the corrected measurement falls below 0.05 dB. This threshold was determined empirically: corrections below this level produce no audible improvement in controlled A/B testing at the BTL listening position.'),

    H2('7.3 The Paradigm Shift: From Transmitter-Control to Receiver-Design'),
    P('The twenty-five-year journey of this project can be understood as a paradigm shift in two phases. The first phase\u2014spanning roughly the first fifteen years\u2014focused on controlling the transmitter: measuring the loudspeaker response, identifying deviations from target, and applying corrective equalization. This approach works up to a point but encounters fundamental limitations. Aggressive equalization introduces phase distortion, boost equalization increases noise and reduces headroom, and correction of one metric (magnitude flatness) often degrades another (group delay coherence).'),
    P('The second phase introduced the organic digital philosophy: instead of correcting a poor starting point, begin with a good one. Select drivers that naturally work together, place crossovers at frequencies that respect both driver physics and human perception, and use the mathematical precision of DADC-DADI to handle only what organic matching cannot. This shift from "control the transmitter" to "design for the receiver" represents the core conceptual contribution of the Rogue Wave Audio project.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 8: HUF CONNECTION & THE HIGGINS OPERATOR
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
    P('The auditory cortex PV/SST interneuron balance described in Section 5 constitutes a ratio portfolio\u2014the same mathematical structure identified across diverse HUF domains. In a healthy cortex, the PV+ and SST+ contributions to forward masking maintain a specific balance (SST/PV \u2248 3.08) that optimizes spectral processing. This balance is not arbitrary; it represents a homeostatic equilibrium maintained by cortical plasticity mechanisms.'),
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
// SECTION 9: COMPUTATIONAL TOOLS
// ══════════════════════════════════════════════════════════════════════════════
function section9() {
  return [
    H1('9. Computational Architecture'),

    H2('9.1 The Technology Stack'),
    P('The complete Rogue Wave Audio computational infrastructure has evolved through multiple generations, each building on the lessons of its predecessor:'),
    bullet('Thunderstruck 1.3: Multi-channel amplification platform providing discrete amplifier channels for each driver band with integrated level control and protection circuits'),
    bullet('Liquid Audio Engine 1.2: Digital signal processing platform handling crossover filtering, time alignment, and equalization with 64-bit double-precision internal processing'),
    bullet('TensorAcousticForge (TAF): The measurement-to-correction pipeline implementing the full DADC-DADI framework, using Smaart v9 for measurement acquisition and Lake v8.5.1 for DSP deployment'),
    bullet('UniDiffrax: A proposed zero-configuration diffraction correction engine with TensorRT plugin, CUDA kernels, and automated validation across 5000+ test cases'),
    bullet('V\u221ECore: The universal regime-based computational engine with 155 Regime Management Units (RMUs) spanning core mathematics, tensor operations, quantum gravity, and information theory\u2014the mathematical substrate from which the Higgins Operator H1 emerged'),

    H2('9.2 The V\u221ECore Connection'),
    P('V\u221ECore, the Universal Regime-Based Computational Engine, represents the generalization of the DADC-DADI framework beyond acoustics. Where DADC-DADI treats each cabinet dimension as a regime with a specific gain contribution summing to 6.02 dB, V\u221ECore treats arbitrary physical systems as collections of regimes with contributions summing to unity. The 155 RMU units span domains from tensor algebra and general relativity to quantum gravity, information theory, and cosmology\u2014all operating under the same unity normalization constraint that began with correcting loudspeaker diffraction.'),
    P('The V\u221ECore architecture employs dynamic gating (softmax regime selection), hierarchical nesting (regimes contain sub-regimes), and a Kardashev-scale trajectory estimator that maps system coherence to a universal development metric. Murray\'s law flow conservation (\u03B3 = 3.0) governs the branching ratios between parent and child regimes, directly paralleling the dimension-apportioned gain distribution of DADC.'),

    H2('9.3 Entropix: Entropy-Balanced Regime Engine'),
    P('The Entropix engine extends V\u221ECore with entropy-balanced regime classification, achieving 7-sigma stability across 150+ physics regime classifications. Its role in the RWA context is to ensure that the DADC-DADI corrections do not introduce entropy (disorder) into the system response\u2014a mathematical guarantee that the correction process converges to a more ordered, not less ordered, acoustic output.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 10: TENSORACOUSTICFORGE PIPELINE
// ══════════════════════════════════════════════════════════════════════════════
function section10() {
  return [
    H1('10. The TensorAcousticForge Measurement-Correction Pipeline'),

    H2('10.1 Pipeline Overview'),
    P('TensorAcousticForge (TAF) implements the DADC-DADI framework as a nine-step atomic pipeline. Each step produces a defined output that feeds the next, creating a traceable chain from raw measurement to final parametric equalization. The pipeline operates in manual mode by default, requiring explicit operator verification at each step. An automatic mode is available but requires five consecutive stable correction cycles before engaging.'),

    H2('10.2 The Nine Steps'),
    P([{text: 'Step 1 \u2014 Initialize Session: ', bold: true}, {text: 'Load cabinet geometry (H, W, D in meters), compute DADC gains and corner frequencies using the formulas from Section 3. For the BTL cabinet: G_H = 3.21 dB at 144 Hz, G_W = 1.48 dB at 312 Hz, G_D = 1.33 dB at 348 Hz. All shelving filters use Q \u2248 0.304 (5.50-octave bandwidth).'}]),
    P([{text: 'Step 2 \u2014 Measure Baseline Transfer Function: ', bold: true}, {text: 'Acquire the baseline acoustic response using Smaart v9 with dual-FFT transfer function measurement. This captures the raw system response including all diffraction effects.'}]),
    P([{text: 'Step 3 \u2014 Load Transfer Function: ', bold: true}, {text: 'Import the measured response into the DADI inverse engine for analysis.'}]),
    P([{text: 'Step 4 \u2014 DADI Inverse: ', bold: true}, {text: 'Estimate cabinet geometry from the measured response by fitting shelving filter models. Compare estimated dimensions with known geometry; discrepancies indicate measurement artifacts or room contamination.'}]),
    P([{text: 'Step 5 \u2014 Compute Dominance D: ', bold: true}, {text: 'Determine which dimension(s) dominate the diffraction signature at each frequency. Height dominates below 144 Hz, width contributes above 312 Hz, depth above 348 Hz.'}]),
    P([{text: 'Step 6 \u2014 Classify Regime and Beta: ', bold: true}, {text: 'Assign each frequency band to a diffraction regime (4\u03C0, transition, 2\u03C0) and compute the correction weight \u03B2 for each band.'}]),
    P([{text: 'Step 7 \u2014 DADC Forward Correction: ', bold: true}, {text: 'Apply dimension-apportioned shelving filters to correct the diffraction signature. This is the core correction step.'}]),
    P([{text: 'Step 8 \u2014 DARM Augmentation: ', bold: true}, {text: 'Apply any additional room-interaction corrections identified during the DADI analysis.'}]),
    P([{text: 'Step 9 \u2014 Deploy PEQ to Lake DSP: ', bold: true}, {text: 'Convert the computed corrections to parametric equalization filters and deploy to the Lake v8.5.1 DSP platform. Verify by re-measuring the corrected response and computing RMSE against target.'}]),
    P('Convergence is achieved when RMSE \u2264 0.05 dB. Maximum iterations: 10. In practice, the BTL system typically converges in 3\u20135 iterations.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 11: THE 25-YEAR EVOLUTION
// ══════════════════════════════════════════════════════════════════════════════
function section11() {
  return [
    H1('11. The Twenty-Five-Year Evolution'),

    H2('11.1 Phase 1: Foundations (2001\u20132008)'),
    P('The project began with a fundamental question about precision sound reproduction. Early work focused on understanding the full scope of the problem: mapping the interdependencies between human perception, transducer physics, room acoustics, and electronic signal processing. The concept of the "Human Q"\u2014treating human auditory sensitivity as a quality factor that must be matched by the reproduction system\u2014emerged during this period. Initial prototyping explored various driver configurations and crossover topologies, building the empirical foundation that would later inform the organic matching philosophy.'),
    P('Key insight from this phase: the level of detail required for a critical listening system is categorically different from consumer loudspeaker design. The system of systems approach\u2014treating every parameter as part of an interdependent network rather than as an isolated variable\u2014was established as the guiding principle.'),

    H2('11.2 Phase 2: Transmitter Control (2008\u20132018)'),
    P('The second phase focused intensively on controlling the transmitter\u2014the loudspeaker system itself. This involved developing measurement protocols, equalization strategies, and digital signal processing techniques to force the loudspeaker response toward the target. While significant improvements were achieved, this phase also revealed the fundamental limitations of the control-the-transmitter approach: aggressive equalization introduces phase artifacts, boost EQ reduces headroom and increases noise, and corrections optimized for one listener position degrade at others.'),
    P('The critical realization during this phase was that diffraction\u2014not driver nonlinearity, not room interaction, not electronic distortion\u2014is the dominant source of correctable error in a well-designed active loudspeaker system. This led directly to the formalization of the diffraction correction problem and the first versions of what would become the DADC framework.'),

    H2('11.3 Phase 3: Mathematical Framework (2018\u20132024)'),
    P('With diffraction identified as the primary target, the DADC-DADI mathematical framework was developed and formalized. The key breakthrough was the dimension-apportioned approach: rather than treating diffraction as a single "baffle step" to be corrected with a single filter, DADC decomposes the effect into its dimensional components and corrects each independently. The reciprocal DADI framework added inverse inference capability, enabling the system to validate its own corrections by estimating geometry from the corrected response.'),
    P('During this phase, the Binaural Test Lab was designed, constructed, and certified. The four-way active architecture was selected to provide maximum flexibility for crossover optimization. Multiple driver candidates were evaluated, with the final complement (32W woofer, M15CH002 midrange, Exotic T35 upper-mid, R2904 tweeter) selected through a combination of measurement and critical listening that would later be recognized as the organic matching process.'),

    H2('11.4 Phase 4: The Organic Insight (2024\u20132025)'),
    P('The paradigm shift occurred when the BTL system\u2014designed through careful driver selection and iterative crossover optimization\u2014consistently outperformed systems with more aggressive DSP correction but less careful driver matching. The realization was that the organic compatibility of the drivers was doing most of the work. The DADC corrections were small because the starting point was already close to the target. This inverted the design priority: instead of "measure, correct, iterate" the process became "select well, verify, correct residuals."'),
    P('The crossover frequencies that emerged from this process\u2014430 Hz, 1500 Hz, 10,000 Hz\u2014were determined by a combination of driver optimization and extensive critical listening. They were not derived from neuroscience; they were found by the same organic process of matching drivers to human perception. That they align with cortical processing boundaries was not known until 2026.'),

    H2('11.5 Phase 5: Cortical Validation (2025\u20132026)'),
    P('The publication of Cheung and Schreiner (2026) provided independent neurophysiological validation of the 1500 Hz crossover frequency. The 1.41 kHz PV/SST processing boundary in primate A1 differs from the BTL\'s 1500 Hz crossover by less than 7%\u2014well within the expected variation between species and individuals. This convergence between twenty years of empirical engineering optimization and independent neuroscience research suggests that the organic matching process\u2014when pursued with sufficient rigor and attention to perceptual quality\u2014naturally discovers solutions that align with the structure of the auditory cortex.'),
    P('Simultaneously, the Higgins Unity Framework provided the mathematical language to describe why this convergence occurs. The PV/SST balance is a ratio portfolio, the DADC gain distribution is a ratio portfolio, and the organic matching process is an optimization that converges on the same fixed point from the engineering side that cortical homeostasis maintains from the biological side. The H1 operator, which originated from this very loudspeaker work, provides the unifying mathematical structure.'),

    makeTable(
      ['Phase', 'Period', 'Focus', 'Key Development', 'Paradigm'],
      [
        ['1. Foundations', '2001\u20132008', 'Problem mapping', 'Human Q concept; system-of-systems approach', 'Understand the target'],
        ['2. Transmitter Control', '2008\u20132018', 'DSP correction', 'Measurement protocols; EQ strategies', 'Control the transmitter'],
        ['3. Mathematical Framework', '2018\u20132024', 'DADC-DADI', 'Dimension-apportioned correction; BTL construction', 'Formalize the physics'],
        ['4. Organic Insight', '2024\u20132025', 'Driver matching', 'Organic > corrective; organic digital philosophy', 'Design for the receiver'],
        ['5. Cortical Validation', '2025\u20132026', 'Neuroscience convergence', 'Cheung & Schreiner; HUF connection', 'Unify transmitter and receiver'],
      ],
      [1400, 1200, 1600, 2800, 2360]
    ),
    tableCaption('Table 8. The Twenty-Five-Year Evolution: Five Phases of Rogue Wave Audio Development'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 12: CONVENTIONAL vs CORTEX-MATCHED COMPARISON
// ══════════════════════════════════════════════════════════════════════════════
function section12() {
  return [
    H1('12. Conventional vs. Cortex-Matched Design: A Comparison'),

    makeTable(
      ['Aspect', 'Conventional Approach', 'Cortex-Matched (RWA) Approach'],
      [
        ['Crossover placement', 'Driver capability boundaries', 'Cortical processing transitions'],
        ['Design target', 'Flat frequency response at ear', 'Transmitter-to-receiver coherence'],
        ['Driver selection', 'Spec sheet matching', 'Organic radiation pattern compatibility'],
        ['Diffraction correction', 'Single baffle step filter', 'DADC dimension-apportioned correction'],
        ['Validation method', 'Magnitude response measurement', 'DADI inverse inference + measurement'],
        ['Evidence basis', 'Engineering convention', 'Neurophysiology + psychoacoustics + engineering'],
        ['Correction philosophy', 'Correct everything with DSP', 'Minimize corrections via organic matching'],
        ['Frequency of interest', '~2\u20133 kHz (driver convenience)', '430/1500/10000 Hz (cortex-matched)'],
        ['Expected artifacts', 'Audible crossover artifacts in stable cortical regions', 'Artifacts at cortical transitions; reduced salience'],
        ['System model', 'Loudspeaker in isolation', 'Four-stage transmitter-to-receiver chain'],
        ['Personalization potential', 'Limited; hardware-constrained', 'Full; digital crossover + psychoacoustic assessment'],
        ['Unity framework', 'None', 'HUF ratio portfolio; H1 operator'],
      ],
      [2200, 3560, 3600]
    ),
    tableCaption('Table 9. Conventional vs. Cortex-Matched Loudspeaker Design: Complete Comparison'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 13: DISCUSSION & FUTURE WORK
// ══════════════════════════════════════════════════════════════════════════════
function section13() {
  return [
    H1('13. Discussion and Future Directions'),

    H2('13.1 Implications for the Industry'),
    P('The organic digital approach, validated by the BTL testbed and supported by independent neuroscience, suggests that the loudspeaker industry\'s conventional crossover placement strategies are suboptimal. The widespread use of crossover frequencies around 2\u20133 kHz\u2014a region of stable, PV-dominated cortical processing and peak auditory sensitivity\u2014places spectral discontinuities exactly where the auditory cortex is least tolerant of them. Moving crossovers to cortical transition regions (near 500 Hz and 1500 Hz for low-to-mid transitions, and above 8 kHz for high-frequency transitions) could produce measurable improvements in perceived quality without any change in driver technology.'),

    H2('13.2 Personalized Monitoring'),
    P('The fully digital architecture of the BTL system enables a future of personalized monitoring. By assessing individual listeners\' cortical processing boundaries through psychoacoustic testing\u2014measuring forward masking patterns to infer PV/SST balance\u2014crossover frequencies could be tuned to each listener\'s specific cortical architecture. This personalization would be particularly valuable in professional monitoring environments where individual listeners make critical mix decisions that affect the final product heard by millions.'),

    H2('13.3 Clinical Applications'),
    P('The connection between crossover design and cortical processing boundaries opens clinical applications. The Cheung and Schreiner (2026) data show that NIHL causes measurable changes in cortical processing\u2014specifically, a shift in the PV/SST contribution ratio. If a monitoring system could detect changes in a listener\'s crossover sensitivity over time, it could serve as an early indicator of noise-induced cortical changes\u2014potentially before audiometric threshold shifts become apparent. This extends the Rogue Wave Audio system from a precision tool to a health monitoring instrument.'),

    H2('13.4 Scalability'),
    P('The principles established here scale to any multi-driver loudspeaker system. The DADC-DADI framework applies to any rectangular enclosure. The cortex-matched crossover principle applies to any multi-way system with digital crossover capability. The organic matching philosophy applies to any driver selection process. As driver technology improves\u2014wider bandwidth drivers, better-controlled dispersion, lower distortion\u2014the organic digital approach becomes even more effective because the starting point moves closer to the target, reducing the already-minimal correction burden.'),

    H2('13.5 Open Questions'),
    P('Several questions remain for future investigation. First, what is the optimal crossover filter topology (Linkwitz-Riley, Butterworth, or others) for cortex-matched placement? Second, how do room acoustics interact with cortex-matched crossover design\u2014does the room\'s transfer function shift the effective processing boundary? Third, can the DADI inverse inference be extended to infer listener cortical characteristics from behavioral responses? Fourth, what is the relationship between the DADC 6.02 dB unity constraint and the broader unity constraints of the Higgins Operator H1? These questions define the agenda for the next phase of the Rogue Wave Audio project.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 14: CONCLUSION
// ══════════════════════════════════════════════════════════════════════════════
function section14() {
  return [
    H1('14. Conclusion'),
    P('This paper has presented the Organic Digital Loudspeaker philosophy as a complete design methodology developed over twenty-five years of active research at Rogue Wave Audio. The central contributions are:'),
    bullet('The Organic Digital Philosophy: Begin with naturally compatible drivers (organic) and apply mathematically precise corrections (digital) only for residual discrepancies, particularly diffraction effects. This inverts the conventional "correct everything with DSP" approach.'),
    bullet('The DADC-DADI Framework: Dimension-Apportioned Diffraction Correction provides physically rigorous, analytically derived correction of rectangular cabinet diffraction effects. Its reciprocal, DADI, validates corrections through inverse geometry inference.'),
    bullet('Cortex-Matched Crossover Design: Placing crossover frequencies at auditory cortex processing transitions\u2014specifically near the 1.41 kHz PV/SST boundary identified by Cheung and Schreiner (2026)\u2014minimizes the perceptual impact of multi-driver spectral discontinuities.'),
    bullet('The Transmitter-to-Receiver Coherence Model: A four-stage framework that extends system design from the loudspeaker to the cortex, recognizing that the perceptual experience is constructed by neural circuits whose characteristics must be respected.'),
    bullet('The HUF Connection: The auditory cortex PV/SST balance constitutes a ratio portfolio under unity constraint\u2014the same mathematical structure governing diverse physical systems\u2014unifying loudspeaker design with the broader Higgins Unity Framework.'),
    P('The Binaural Test Lab, with its crossover frequencies at 430 Hz, 1500 Hz, and 10,000 Hz, serves as proof of concept: a monitoring system whose empirically determined crossover points independently align with cortical processing boundaries, validating the thesis that organic matching naturally discovers cortically optimal solutions.'),
    P('The Higgins Operator H1, which originated from this loudspeaker diffraction work, provides the mathematical bridge between the engineering problem of wavefront coherence and the universal principle of unity normalization. From loudspeakers to cosmology, the mathematics of coherence under a unity constraint remain the same. This paper documents the origin of that insight and its most direct application: building a sound reproduction system that respects not just the physics of sound, but the neuroscience of hearing.'),
    sectionBreak(),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// REFERENCES
// ══════════════════════════════════════════════════════════════════════════════
function references() {
  const refs = [
    'Cheung, S.W. & Schreiner, C.E. (2026). Auditory cortical forward masking effects in squirrel monkeys with unilateral noise-induced hearing loss. Hearing Research, 460, 109168.',
    'Higgins, P. (2026). Dimension-Apportioned Diffraction Correction and Inference (DADC/DADI): A Reciprocal Optimization Method. Rogue Wave Audio Technical Report.',
    'Higgins, P. (2026). The Higgins Operator H1: Nonlinear Unity Normalization with Directional Coherence Preservation in Hierarchical Multi-Scale Systems. Independent Research.',
    'Higgins, P. (2026). Higgins Unity Framework: Sufficiency Frontier v3.0. Independent Research.',
    'Higgins, P. (2026). Higgins Unity Framework: Fourth Monitoring Category v2.0. Independent Research.',
    'Higgins, P. (2025). BTL Studio Complete System Design. Rogue Wave Audio Certification Document.',
    'Phillips, E.A.K., Schreiner, C.E., & Bhatt, D.H. (2017a). Cortical interneurons differentially regulate the effects of acoustic context. Cell Reports, 20(4), 771\u2013778.',
    'Phillips, E.A.K., Schreiner, C.E., & Bhatt, D.H. (2017b). Optogenetic manipulation of PV and SST interneurons in primary auditory cortex. J. Neurosci., 37(35), 8511\u20138523.',
    'Natan, R.G., Briguglio, J.J., Mwilambwe-Tshilobo, L., Jones, S.I., Aizenberg, M., Goldberg, E.M., & Bhatt, D.H. (2015). Complementary control of sensory adaptation by two types of cortical interneurons. eLife, 4, e09868.',
    'Natan, R.G., Rao, W., & Bhatt, D.H. (2017). Cortical interneurons differentially shape frequency tuning following adaptation. Cell Reports, 21(4), 878\u2013890.',
    'Moore, B.C.J. & Glasberg, B.R. (1986). The role of frequency selectivity in the perception of loudness, pitch, and time. In Frequency Selectivity in Hearing. Academic Press.',
    'Moore, B.C.J. & Glasberg, B.R. (2007). Modeling binaural loudness. J. Acoust. Soc. Am., 121(3), 1604\u20131612.',
    'Blauert, J. (1997). Spatial Hearing: The Psychophysics of Human Sound Localization (Rev. ed.). MIT Press.',
    'Fastl, H. & Zwicker, E. (2007). Psychoacoustics: Facts and Models (3rd ed.). Springer.',
    'Bregman, A.S. (1990). Auditory Scene Analysis: The Perceptual Organization of Sound. MIT Press.',
    'Beranek, L.L. (1954). Acoustics. McGraw-Hill.',
    'Dickason, V. (2006). The Loudspeaker Design Cookbook. Audio Amateur Press.',
    'Olson, H.F. (1957). Acoustical Engineering. D. Van Nostrand.',
    'Linkwitz, S.H. & Riley, R.H. (1976). Active crossover networks for non-coincident drivers. J. Audio Eng. Soc., 24(1), 2\u20138.',
    'D\'Appolito, J.A. (1983). Testing Loudspeakers. Audio Amateur Press.',
    'Small, R.H. (1972). Closed-box loudspeaker systems Part I: Analysis. J. Audio Eng. Soc., 20(10), 798\u2013808.',
    'Thiele, A.N. (1971). Loudspeakers in vented boxes. J. Audio Eng. Soc., 19(5), 382\u2013392.',
    'Vanderkooy, J. & Lipshitz, S.P. (1983). Is phase linearization of loudspeaker crossover networks possible by time offset and equalization? J. Audio Eng. Soc., 31(12), 947\u2013966.',
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
        new TextRun({ text: '\tOrganic Digital Loudspeakers v2.0', font: 'Times New Roman', size: 18, italics: true, color: MTEAL }),
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
  const outPath = __dirname + '/Organic_Digital_Loudspeakers_v2.0.docx';
  fs.writeFileSync(outPath, buf);
  console.log(`\u2705 Written: ${outPath}`);
  console.log(`   Size: ${buf.length.toLocaleString()} bytes`);

  // Count paragraphs
  let pCount = 0;
  allContent.forEach(c => { if (c instanceof Paragraph) pCount++; });
  console.log(`   Paragraphs: ~${pCount}`);
  console.log(`   Sections: 14 + References + Title + Dedication + Abstract`);
  console.log(`   Tables: 9`);
  console.log(`   References: 25`);
}

build().catch(err => { console.error('\u274C Build failed:', err.message); process.exit(1); });
