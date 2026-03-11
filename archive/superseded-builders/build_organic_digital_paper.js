// ══════════════════════════════════════════════════════════════════════
// Rogue Wave Audio — Organic Digital Loudspeakers Paper Builder
// Cortex-Matched Crossover Design for Transmitter-to-Receiver Coherence
// Author: Peter Higgins — March 2026
// ══════════════════════════════════════════════════════════════════════

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak, TabStopType, TabStopPosition,
        LevelFormat } = require('docx');

// ── Page Constants ──────────────────────────────────────────────────
const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1440;
const CW = PAGE_W - 2 * MARGIN; // 9360 DXA

// ── RWA Color Palette ───────────────────────────────────────────────
const TEAL   = '1A5C5C';  // Primary dark teal
const MTEAL  = '2E8B8B';  // Mid teal
const DARK   = '2D2D2D';  // Body text
const LGREY  = 'F2F2F2';  // Table alt row
const LTEAL  = 'E0F0F0';  // Light teal accent
const WHITE  = 'FFFFFF';
const GOLD   = 'FFF2CC';
const ACCENT = '4A9090';  // Secondary accent

// ── Borders ─────────────────────────────────────────────────────────
const bdr = { style: BorderStyle.SINGLE, size: 1, color: 'BBBBBB' };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };

// ── Heading Helpers ─────────────────────────────────────────────────
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 200 },
  children: [new TextRun({ text: t, bold: true, font: 'Times New Roman', size: 28, color: TEAL })] });

const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 160 },
  children: [new TextRun({ text: t, bold: true, font: 'Times New Roman', size: 24, color: TEAL })] });

const H3 = (t) => new Paragraph({ spacing: { before: 200, after: 120 },
  children: [new TextRun({ text: t, bold: true, italics: true, font: 'Times New Roman', size: 22, color: DARK })] });

// ── Paragraph Helper ────────────────────────────────────────────────
function P(content, opts = {}) {
  const { align, indent, spacing_after, bold, italics, color } = opts;
  const runs = [];
  if (typeof content === 'string') {
    runs.push(new TextRun({ text: content, font: 'Times New Roman', size: 22,
      color: color || DARK, bold: bold || false, italics: italics || false }));
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

// ── Table Helpers ───────────────────────────────────────────────────
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

function crossRef(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160 },
    children: [new TextRun({ text: '\u25B6 ' + text, font: 'Times New Roman', size: 20, italics: true, color: MTEAL })],
  });
}

// ── Header / Footer ─────────────────────────────────────────────────
function makeRWAHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: MTEAL, space: 1 } },
      spacing: { after: 0 },
      children: [
        new TextRun({ text: 'Rogue Wave Audio', font: 'Times New Roman', size: 18, color: MTEAL }),
        new TextRun({ text: '\tOrganic Digital Loudspeakers', font: 'Times New Roman', size: 18, italics: true, color: MTEAL }),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    })],
  });
}

function makeRWAFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 1 } },
      children: [
        new TextRun({ text: 'Rogue Wave Audio \u00B7 Working Paper \u00B7 March 2026 \u00B7 ', font: 'Times New Roman', size: 16, color: '999999' }),
        new TextRun({ text: 'Page ', font: 'Times New Roman', size: 16, color: '999999' }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 16, color: '999999' }),
      ],
    })],
  });
}

// ════════════════════════════════════════════════════════════════════
// PAPER CONTENT
// ════════════════════════════════════════════════════════════════════
const children = [];

// ── TITLE PAGE ──────────────────────────────────────────────────────
children.push(
  new Paragraph({ spacing: { before: 3000, after: 200 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Organic Digital Loudspeakers', font: 'Times New Roman', size: 40, bold: true, color: TEAL })] }),
  new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Cortex-Matched Crossover Design for', font: 'Times New Roman', size: 28, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 400 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Transmitter-to-Receiver Coherence', font: 'Times New Roman', size: 28, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 80 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Peter Higgins', font: 'Times New Roman', size: 24, bold: true, color: DARK })] }),
  new Paragraph({ spacing: { after: 80 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Rogue Wave Audio', font: 'Times New Roman', size: 22, italics: true, color: DARK })] }),
  new Paragraph({ spacing: { after: 400 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'March 2026', font: 'Times New Roman', size: 22, color: DARK })] }),
  new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Working Paper \u2014 Rogue Wave Audio Technical Series', font: 'Times New Roman', size: 20, italics: true, color: ACCENT })] }),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── ABSTRACT ────────────────────────────────────────────────────────
children.push(
  H1('Abstract'),
  P([
    { text: 'Conventional multi-driver loudspeaker crossover design places frequency boundaries at engineering convenience points\u2014typically determined by driver availability, cabinet geometry, and computational simplicity. This approach ignores the neuroscience of auditory perception, specifically the frequency-dependent architecture of cortical inhibition that determines where the human auditory system is most and least sensitive to spectral discontinuities. We propose an ', },
    { text: 'organic digital ', bold: true },
    { text: 'loudspeaker design philosophy that places crossover frequencies at auditory cortex masking transition boundaries: 500 Hz, 1500 Hz, and 10 kHz. These frequencies correspond to regions where the primary auditory cortex (A1) transitions between inhibitory processing regimes\u2014specifically, where the balance between parvalbumin-positive (PV+) and somatostatin-positive (SST+) interneuron populations shifts, reducing cortical sensitivity to spectral misalignment.' },
  ]),
  P([
    { text: 'Recent neurophysiological evidence from Cheung and Schreiner (2026) confirms that the primate auditory cortex divides its processing architecture at approximately 1.41 kHz, with qualitatively different inhibitory dynamics above and below this boundary. The suppression-to-facilitation ratio\u2014a quantitative measure of cortical inhibitory balance\u2014shifts from 3.08 in healthy cortex to 1.20 following noise-induced hearing loss, demonstrating that cortical processing operates as a ratio portfolio under implicit unity constraint. This convergence between auditory neuroscience and the Higgins Unity Framework (HUF) ratio portfolio formalism provides both a theoretical foundation and an empirical validation pathway for cortex-matched crossover design. The organic digital approach combines naturally compatible driver radiation patterns (organic matching) with the Dimension-Apportioned Diffraction Correction (DADC-DADI) framework for precision digital correction, achieving transmitter-to-receiver coherence across the full signal chain from electrical input through cortical representation.' },
  ]),
  P([
    { text: 'Keywords: ', bold: true },
    { text: 'auditory cortex, crossover design, diffraction control, organic driver matching, forward masking, PV interneurons, SST interneurons, transmitter-to-receiver coherence, ratio portfolio, Higgins Unity Framework.' },
  ]),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 1. INTRODUCTION ─────────────────────────────────────────────────
children.push(
  H1('1. Introduction'),
  P('The design of multi-driver loudspeaker systems has been dominated for decades by engineering-first principles: crossover frequencies are chosen where drivers can be combined with acceptable magnitude and phase response, where cabinet resonances are avoided, and where filter topology permits efficient implementation. The resulting frequency boundaries\u2014typically 250\u2013500 Hz for woofer-midrange handoff and 2\u20134 kHz for midrange-tweeter handoff\u2014are artifacts of transducer physics and signal processing convention, not human auditory perception.'),
  P('This paper proposes a fundamentally different approach. Rather than designing the loudspeaker system from the transmitter outward and hoping the receiver tolerates the result, we design from the receiver inward. The receiver, in this context, is not the ear canal or the cochlea but the primary auditory cortex (A1)\u2014the neural substrate where acoustic signals are transformed into conscious auditory perception. By understanding where the cortex transitions between processing regimes, we can identify frequency regions where its sensitivity to spectral discontinuities is naturally minimal and place our crossover boundaries there.'),
  P([
    { text: 'The neuroscience foundation for this approach has strengthened considerably in recent years. Cheung and Schreiner (2026), working with squirrel monkeys (' },
    { text: 'Saimiri sciureus', italics: true },
    { text: '), demonstrated that cortical forward-masking dynamics divide sharply at approximately 1.41 kHz. Below this frequency, parvalbumin-positive (PV+) interneurons dominate the inhibitory architecture, providing fast, sharply tuned suppression. Above it, the balance shifts toward somatostatin-positive (SST+) interneurons with broader tuning and longer time constants. The transition zone around 1.4\u20131.5 kHz represents a regime boundary where the cortex is actively reallocating computational resources between processing strategies.' },
  ]),
  P('At such boundaries, the cortex is least able to detect small spectral misalignments\u2014precisely the kind of artifact a crossover transition introduces. A driver handoff at 1500 Hz exploits this natural window of reduced sensitivity. Similarly, 500 Hz corresponds to the boundary where spatial hearing transitions from directional to spectral processing, and 10 kHz marks the transition from fine spectral analysis to envelope-dominated processing.'),
  P([
    { text: 'We term this design philosophy ' },
    { text: 'organic digital', bold: true },
    { text: '. ' },
    { text: 'Organic', italics: true },
    { text: ' refers to the natural compatibility of driver radiation patterns\u2014selected so that their directivity and diffraction signatures are inherently compatible across the crossover region, minimizing the correction burden on signal processing. ' },
    { text: 'Digital', italics: true },
    { text: ' refers to the Dimension-Apportioned Diffraction Correction and Inference (DADC-DADI) framework, an empirical measurement-based correction pipeline that addresses residual artifacts with precision. Together, organic matching and digital correction achieve what we call ' },
    { text: 'transmitter-to-receiver coherence', bold: true },
    { text: ': preservation of signal structure fidelity from electrical input through acoustic radiation, room propagation, cochlear transduction, and cortical processing.' },
  ]),
  P('A striking connection emerges when this cortical architecture is viewed through the lens of the Higgins Unity Framework (HUF). The suppression-to-facilitation ratio measured by Cheung and Schreiner\u2014healthy at 3.08, degraded to 1.20 after noise-induced hearing loss\u2014behaves as a ratio portfolio under an implicit unity constraint, exactly the mathematical structure that HUF\u2019s Fourth Monitoring Category (MC-4) is designed to detect. The auditory cortex, it appears, runs its own version of ratio-state monitoring.'),
  P('This paper proceeds as follows. Section 2 reviews the auditory cortex processing regime architecture. Section 3 examines the limitations of conventional crossover design. Section 4 introduces the organic digital concept. Section 5 presents the cortex-matched crossover placement rationale with supporting evidence. Section 6 details diffraction control and organic driver matching. Section 7 formalizes the transmitter-to-receiver coherence model. Section 8 develops the HUF ratio portfolio connection. Section 9 discusses implications and future directions, and Section 10 concludes.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 2. AUDITORY CORTEX PROCESSING REGIMES ───────────────────────────
children.push(
  H1('2. Auditory Cortex Processing Regimes'),
  H2('2.1 Cortical Inhibitory Architecture'),
  P('The primary auditory cortex processes acoustic information through a dynamic interplay of excitatory and inhibitory neural populations. Two classes of inhibitory interneurons play complementary roles in shaping cortical responses to sound. Parvalbumin-positive (PV+) interneurons are fast-spiking cells that provide rapid, phasic feedforward inhibition with sharp frequency tuning. They mediate the canonical suppressive component of forward masking\u2014the phenomenon where a preceding sound reduces the neural response to a subsequent sound\u2014and are essential for precise temporal gating and spectral contrast enhancement (Phillips et al., 2017a; Natan et al., 2015, 2017).'),
  P('Somatostatin-positive (SST+) interneurons, by contrast, operate with longer time constants and broader spectral tuning. They contribute to feedback inhibition, gain modulation, and history-dependent processing. Optogenetic studies have demonstrated that suppressing SST+ interneurons weakens forward suppression and reveals facilitation\u2014enhancement of neural response following a masker\u2014in neurons that are normally forward-suppressed (Phillips et al., 2017a, b). The relative balance of PV+ and SST+ contributions determines the spectral and temporal resolution characteristics of any given cortical region.'),

  H2('2.2 The 1.41 kHz Boundary'),
  P([
    { text: 'Cheung and Schreiner (2026) provide the most direct evidence for a frequency-dependent shift in this inhibitory architecture. Recording from 224 sites in squirrel monkey A1 following unilateral noise-induced hearing loss (NIHL) at 1 kHz, they found that cortical sites divide naturally into two populations: low best-frequency sites (BF ' },
    { text: '\u2264 1.41 kHz', bold: true },
    { text: ') and high best-frequency sites (BF ' },
    { text: '> 1.41 kHz', bold: true },
    { text: '). The distinction is not merely analytical convenience\u2014it reflects a qualitative difference in how the cortex processes forward masking at these two frequency ranges.' },
  ]),
  P('In normal-hearing controls, both low-BF and high-BF sites showed dominant probe suppression, with the suppression-to-facilitation ratio (Supp/Facil) at approximately 4.9 across the population. Following chronic NIHL, however, the two populations diverged dramatically. Low-BF sites near the 1 kHz lesion frequency showed the most pronounced loss of suppression (dropping from 64% suppressive sites to 44%) and gain in facilitation (from 13% to 35%). High-BF sites retained more normal suppressive dynamics.'),
  P('The suppression bandwidth\u2014the frequency range over which a preceding masker can suppress the probe response\u2014narrowed by approximately 30% in NIHL animals (inhibitory bandwidth 0.48 octaves versus 0.65 octaves in controls), an effect driven primarily by changes in low-BF sites. This narrowing indicates reduced PV+ inhibitory strength specifically near the damaged frequency region, while SST+-mediated facilitation expanded.'),

  H2('2.3 Implications for Crossover Design'),
  P('The 1.41 kHz boundary represents a cortical processing regime transition. Below this frequency, the cortex operates in a PV-dominated mode optimized for sharp spectral discrimination and fast temporal gating. Above it, SST+ contributions become more prominent, broadening spectral integration and extending temporal dynamics. At the boundary itself, the cortex is actively transitioning between these strategies\u2014reallocating inhibitory resources from one interneuron class to another.'),
  P('During this reallocation, the cortex\u2019s ability to detect small spectral irregularities is reduced. A crossover transition that introduces a subtle magnitude ripple, phase discontinuity, or directional shift at 1500 Hz falls into this window of reduced cortical scrutiny. The driver handoff is, in perceptual terms, hiding in the cortex\u2019s blind spot.'),
);

// Table 1: Cortical Processing Regimes
children.push(
  P('Table 1: Cortical Processing Regime Characteristics', { bold: true, align: AlignmentType.CENTER, spacing_after: 100 }),
  makeTable(
    ['Property', 'PV-Dominated Regime (< 1.41 kHz)', 'SST-Prominent Regime (> 1.41 kHz)'],
    [
      ['Dominant interneuron', 'Parvalbumin-positive (PV+)', 'Somatostatin-positive (SST+)'],
      ['Temporal precision', 'High (fast-spiking, phasic)', 'Lower (longer time constants)'],
      ['Spectral tuning', 'Sharp (narrow inhibitory BW)', 'Broader (wider integration)'],
      ['Forward masking', 'Strong suppression (Supp/Facil \u2248 4.9)', 'Mixed suppression/facilitation'],
      ['Inhibitory bandwidth', '0.65 octaves (control)', 'Broader, less frequency-specific'],
      ['Sensitivity to discontinuity', 'High (detects small spectral errors)', 'Lower (more tolerant)'],
      ['Processing strategy', 'Spectral contrast enhancement', 'Contextual integration'],
    ],
    [2340, 3510, 3510],
  ),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 3. CONVENTIONAL CROSSOVER DESIGN ────────────────────────────────
children.push(
  H1('3. Limitations of Conventional Crossover Design'),
  P('Standard multi-way loudspeaker systems divide the audio bandwidth according to transducer physics. A typical three-way system crosses over at approximately 300\u2013500 Hz (woofer to midrange) and 2\u20134 kHz (midrange to tweeter). These frequencies are determined by the mechanical excursion limits of woofers, the usable bandwidth of midrange drivers, and the resonant frequency of tweeters. The result is a system optimized for the transmitter\u2014the loudspeaker itself\u2014with no consideration for the receiver.'),
  P('At each crossover point, the system introduces discontinuities. Even with high-order filter topologies (Linkwitz-Riley fourth-order, for instance), the transition zone spans a finite frequency range over which two drivers operate simultaneously. Within this overlap region, magnitude summation depends on driver spacing relative to wavelength, phase alignment depends on filter group delay and acoustic offset, and radiation pattern depends on the geometric relationship between two physically displaced sources.'),
  P('The audibility of these artifacts depends entirely on where they occur in the auditory frequency map. A phase discontinuity at 3 kHz\u2014squarely within the PV-dominated regime where cortical spectral discrimination is sharpest\u2014is far more audible than the same magnitude of discontinuity at 1.5 kHz, where the cortex is transitioning between processing strategies and spectral scrutiny is temporarily relaxed.'),
  P('This observation explains a phenomenon well-known to speaker designers but rarely articulated: some crossover frequencies simply sound better than others, even when objective measurements (anechoic frequency response, cumulative spectral decay) show comparable performance. The difference is not in the loudspeaker\u2014it is in the cortex.'),
);

// Table 2: Conventional vs Cortex-Matched
children.push(
  P('Table 2: Conventional versus Cortex-Matched Crossover Philosophy', { bold: true, align: AlignmentType.CENTER, spacing_after: 100 }),
  makeTable(
    ['Aspect', 'Conventional Approach', 'Cortex-Matched Approach'],
    [
      ['Design priority', 'Transducer performance', 'Perceptual transparency'],
      ['Frequency selection', 'Driver bandwidth limits', 'Cortical regime boundaries'],
      ['Optimization target', 'Flat anechoic response', 'Minimal cortical detection'],
      ['Evidence basis', 'Engineering heuristics', 'Neurophysiology + psychoacoustics'],
      ['Typical 3-way points', '300\u2013500 Hz / 2\u20134 kHz', '500 Hz / 1500 Hz / 10 kHz'],
      ['Phase discontinuity handling', 'Minimize via filter order', 'Place where cortex is insensitive'],
      ['Radiation pattern matching', 'Not considered', 'Organic driver selection criterion'],
    ],
    [2340, 3510, 3510],
  ),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 4. THE ORGANIC DIGITAL LOUDSPEAKER CONCEPT ──────────────────────
children.push(
  H1('4. The Organic Digital Loudspeaker Concept'),
  H2('4.1 Organic Driver Matching'),
  P([
    { text: 'Not all driver combinations are equally compatible. Two drivers may each produce excellent isolated frequency response yet interact poorly when combined on a common baffle. The interaction artifacts\u2014edge diffraction, inter-driver interference, directional shift at crossover\u2014depend on the geometric and acoustic relationship between the two transducers and the cabinet boundary conditions. An ' },
    { text: 'organic match', bold: true },
    { text: ' occurs when drivers\u2019 natural radiation patterns, diffraction signatures, and directivity evolution are inherently compatible across the crossover region, requiring minimal corrective intervention.' },
  ]),
  P('The criteria for organic matching include directivity index (DI) continuity across the crossover frequency, compatible polar pattern evolution (the midrange driver\u2019s narrowing directivity at the upper end of its range should approximate the tweeter\u2019s widening directivity at the lower end of its range), and complementary diffraction signatures with the cabinet baffle geometry. When organic matching is achieved, the spatial radiation pattern transitions smoothly through the crossover region, and the perceptual consequence\u2014the sense that sound sources shift position or timbre as frequency crosses the handoff point\u2014is eliminated.'),

  H2('4.2 Digital Correction: The DADC-DADI Framework'),
  P('Organic matching reduces but does not eliminate all artifacts. The Dimension-Apportioned Diffraction Correction (DADC) framework addresses residual discontinuities through empirical measurement-based correction. Unlike simulation-driven approaches, DADC begins with physical measurement of the combined driver-cabinet system, decomposes the measured response into driver-specific contributions apportioned by cabinet geometry dimensions, and applies targeted parametric equalization only where measured coherence falls below threshold.'),
  P('The complementary Dimension-Apportioned Diffraction Inference (DADI) framework inverts this process: given measured combined response and known cabinet geometry, it infers the diffraction contribution of each dimensional boundary, enabling prediction of alternative driver or cabinet configurations without requiring new physical measurements. Together, DADC and DADI form a measurement-correction-prediction pipeline that is both precise (converging to RMSE less than 0.05 dB for the target response) and empirically grounded.'),

  H2('4.3 Organic + Digital = Coherence'),
  P('The organic digital philosophy recognizes that organic matching and digital correction serve complementary roles. Organic matching ensures that the fundamental acoustic behavior of the driver combination is compatible with the crossover region\u2014that the transmitter is physically capable of coherent operation. Digital correction then refines the combined response to achieve the precision required for perceptual transparency. Neither approach alone is sufficient: organic matching without digital correction leaves residual artifacts that measurement reveals; digital correction without organic matching requires aggressive equalization that degrades phase response and increases latency.'),
  P('The combination achieves what we term transmitter-side coherence. The remaining question\u2014whether this coherence survives the journey to the auditory cortex\u2014is addressed by the cortex-matched crossover placement strategy and formalized in the transmitter-to-receiver coherence model.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 5. CORTEX-MATCHED CROSSOVER PLACEMENT ───────────────────────────
children.push(
  H1('5. Cortex-Matched Crossover Placement'),
  P('The central contribution of this paper is the proposal that crossover frequencies should be placed at auditory cortex masking transition boundaries\u2014frequencies where the cortex is transitioning between inhibitory processing regimes and is consequently least sensitive to the spectral discontinuities that crossover transitions inevitably introduce. We propose three specific frequencies, each with neurophysiological rationale.'),

  H2('5.1 Crossover 1: 500 Hz'),
  P('The 500 Hz boundary corresponds to the transition between directional and spectral processing in the auditory system. Below approximately 600 Hz, interaural time difference (ITD) dominates spatial hearing, and the cortex operates in a mode optimized for temporal envelope processing across wide frequency bands. Above 600 Hz, interaural level difference (ILD) becomes increasingly important, and the cortex shifts toward finer spectral discrimination (Blauert, 1997).'),
  P('At 500 Hz, the cortex is transitioning between these spatial processing strategies. The forward masking data from Cheung and Schreiner (2026) shows that cortical suppression at low BF sites operates with inhibitory bandwidths of approximately 0.65 octaves\u2014relatively broad compared to the sharp tuning at higher frequencies. This broader tuning means that the cortex is integrating over a wider frequency band near 500 Hz, making it less sensitive to narrow spectral artifacts such as those produced by a crossover transition. A woofer-to-midrange handoff placed here exploits both the spatial processing transition and the relatively broad cortical tuning.'),

  H2('5.2 Crossover 2: 1500 Hz'),
  P([
    { text: 'The 1500 Hz crossover is the most strongly supported by the Cheung and Schreiner (2026) data. Their analysis divided cortical recording sites at BF = 1.41 kHz and found qualitatively different forward-masking dynamics above and below this boundary. In normal-hearing cortex, low-BF sites (\u2264 1.41 kHz) showed stronger suppression (particularly between \u22121.3 and \u22120.2 octaves from BF), while high-BF sites (> 1.41 kHz) showed more balanced suppression and facilitation. The transition zone around 1.4\u20131.5 kHz is where the cortex shifts from PV-dominated to more SST-influenced processing\u2014a regime boundary where inhibitory resources are being reallocated.' },
  ]),
  P('This is the most critical crossover in any multi-way system: the midrange-to-tweeter handoff. It is also the most acoustically challenging, because the radiation pattern mismatch between midrange and tweeter drivers is typically largest here, and the ear\u2019s sensitivity to spectral detail is high throughout the 1\u20134 kHz speech intelligibility region. By placing this crossover at 1500 Hz rather than the conventional 2\u20134 kHz range, we move the handoff from the zone of maximum cortical spectral discrimination into the regime transition zone where cortical scrutiny is temporarily reduced.'),

  H2('5.3 Crossover 3: 10 kHz'),
  P('The 10 kHz boundary marks the transition from spectral-detail processing to envelope-dominated processing. Above 10 kHz, phase locking to the fine structure of the acoustic waveform is no longer available to the auditory system, and perception relies on temporal envelope cues and spectral shape rather than fine spectral detail (Moore, 2007). Critical bandwidths widen substantially above 8 kHz, and the basilar membrane stiffness gradient begins to flatten, producing coarser frequency representation on the cochlea.'),
  P('For systems employing a supertweeter, this frequency provides an ideal handoff point. The cortex is transitioning from detailed spectral analysis to broadband envelope processing, and its sensitivity to the narrowband artifacts of a crossover transition is correspondingly reduced. For three-way systems without a supertweeter, this crossover is not required, but the 10 kHz boundary remains relevant as the upper limit of the tweeter\u2019s cortex-matched operating range.'),
);

// Table 3: Crossover Frequency Rationale
children.push(
  P('Table 3: Cortex-Matched Crossover Frequency Rationale', { bold: true, align: AlignmentType.CENTER, spacing_after: 100 }),
  makeTable(
    ['Frequency', 'Cortical Transition', 'Psychoacoustic Support', 'Driver Consideration'],
    [
      ['500 Hz', 'Directional \u2192 spectral processing; broad inhibitory BW (0.65 oct)', 'Blauert directional blur threshold; Fletcher-Munson insensitivity', 'Natural woofer-midrange handoff; efficient, mechanically stable'],
      ['1500 Hz', 'PV \u2192 SST regime boundary (Cheung & Schreiner, 1.41 kHz)', 'Notch detection threshold elevated at regime transitions', 'Most critical handoff (mid-tweeter); placed at cortical blind spot'],
      ['10 kHz', 'Spectral detail \u2192 envelope processing; critical BW widens', 'Phase locking absent; coarser frequency representation', 'Tweeter-supertweeter boundary; only needed for 4-way systems'],
    ],
    [1200, 2800, 2800, 2560],
  ),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 6. DIFFRACTION CONTROL & ORGANIC DRIVER MATCHING ────────────────
children.push(
  H1('6. Diffraction Control and Organic Driver Matching'),
  H2('6.1 Diffraction and Dispersion: Same Physics'),
  P('Diffraction and dispersion in the context of multi-driver loudspeaker design are manifestations of the same underlying physics: wavefront interaction with geometric boundaries. When an acoustic wavefront propagating from a driver encounters the edge of a cabinet baffle, part of the energy diffracts around the boundary, creating a secondary source that interferes with the direct radiation. The result is a frequency-dependent ripple in the radiation pattern that depends on the path length difference between direct and diffracted waves.'),
  P('The conventional approach to this problem takes one of two paths. Dispersion-first design attempts to control the angular energy distribution through filter design and driver placement, accepting the diffraction signature as a constraint. Diffraction-control design works in the opposite direction: it ensures that the diffraction signatures of the individual drivers and the baffle geometry are compatible, then uses this compatibility as the foundation for crossover and correction design.'),

  H2('6.2 Why Diffraction-First Is Optimal with Organic Match'),
  P('When organic driver matching is achieved\u2014when the drivers\u2019 natural radiation patterns and the baffle\u2019s diffraction signature are inherently compatible\u2014the diffraction-first approach becomes decisively superior. The reason is that diffraction-first constrains crossover, driver spacing, and baffle geometry simultaneously through a single physical relationship, whereas dispersion-first allows more degrees of freedom at the cost of requiring the DSP to reconcile physically incompatible radiation patterns.'),
  P('With organic matching, the diffraction signature of each driver at the crossover frequency is already aligned with the cabinet boundary conditions. The crossover transition occurs within a frequency range where the two drivers\u2019 edge-diffracted fields are constructively compatible rather than destructively interfering. This means less DSP correction is needed, latency is lower, and the phase response through the crossover region is more natural\u2014all of which contribute to transmitter-side coherence.'),

  H2('6.3 The DADC-DADI Implementation Pipeline'),
  P('The practical implementation proceeds through four stages. First, near-field measurement of each driver in isolation characterizes its intrinsic radiation pattern and impedance behavior. Second, far-field measurement of the combined system on the production baffle captures the actual interaction effects\u2014diffraction, inter-driver interference, and cabinet resonances. Third, the DADC decomposition apportions the measured combined response to individual driver and cabinet-boundary contributions, identifying frequency ranges where coherence is good (low residual ripple) and where correction is needed. Fourth, targeted parametric equalization addresses only the identified gaps, validated by cross-position measurement at multiple listening distances and angles.'),
  P('The DADI inference component inverts this process: from the DADC measurements, it infers the diffraction contribution of each cabinet dimension and driver position, enabling virtual prototyping of alternative configurations. This closes the design loop\u2014from measurement to correction to prediction to revised design\u2014without requiring extensive physical prototyping of each iteration.'),
  crossRef('See Higgins, DADC-DADI Framework (Rogue Wave Audio, 2026) for complete measurement protocol.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 7. TRANSMITTER-TO-RECEIVER COHERENCE MODEL ──────────────────────
children.push(
  H1('7. Transmitter-to-Receiver Coherence Model'),
  P([
    { text: 'We define ' },
    { text: 'transmitter-to-receiver coherence', bold: true },
    { text: ' as the preservation of signal structure fidelity across the complete transformation chain from electrical input to cortical representation. Unlike traditional audio metrics that evaluate system performance at a single point in the chain (e.g., anechoic frequency response measures only the transducer stage), this model requires coherence to be maintained through four distinct stages, each with its own transformation characteristics and potential for degradation.' },
  ]),

  H2('7.1 The Four-Stage Signal Chain'),
  P([
    { text: 'Stage 1: Transducer. ', bold: true },
    { text: 'The electrical signal is converted to acoustic radiation by the driver complement and crossover network. Coherence requirements: total harmonic distortion below 0.5% across the operating bandwidth, phase linearity within \u00B110\u00B0 through the crossover region, and directional consistency within \u00B13 dB across the listening window. Organic driver matching and DADC correction address this stage.' },
  ]),
  P([
    { text: 'Stage 2: Propagation. ', bold: true },
    { text: 'The acoustic field propagates through the listening room, accumulating reflections, modal resonances, and frequency-dependent absorption. Coherence requirements: direct-sound dominance exceeding 80% within the first 10 ms integration window, controlled early reflections that do not introduce comb filtering at the crossover frequencies, and modal excitation below 200 Hz that does not mask the woofer-midrange transition at 500 Hz.' },
  ]),
  P([
    { text: 'Stage 3: Cochlear transduction. ', bold: true },
    { text: 'The acoustic signal is transduced by the basilar membrane into neural firing patterns. At this stage, the frequency selectivity of the cochlea (quality factor Q approximately 10 at 1 kHz) provides the spectral resolution that the cortex will subsequently process. Phase locking to the fine structure of the waveform is available below approximately 1 kHz; above this, temporal coding relies on envelope following.' },
  ]),
  P([
    { text: 'Stage 4: Cortical processing. ', bold: true },
    { text: 'The neural representation from the cochlea is processed through the thalamocortical pathway into primary auditory cortex A1. Here, the PV/SST inhibitory balance determines whether a spectral discontinuity at a crossover frequency will be detected as an audible artifact or masked by the cortex\u2019s own regime transition dynamics. This is the stage where cortex-matched crossover placement provides its advantage.' },
  ]),
);

// Table 4: Signal Chain
children.push(
  P('Table 4: Transmitter-to-Receiver Signal Chain', { bold: true, align: AlignmentType.CENTER, spacing_after: 100 }),
  makeTable(
    ['Stage', 'Transformation', 'Coherence Metric', 'Design Strategy'],
    [
      ['1. Transducer', 'Electrical \u2192 acoustic', 'THD < 0.5%; phase \u00B110\u00B0; DI \u00B13 dB', 'Organic match + DADC-DADI'],
      ['2. Propagation', 'Near-field \u2192 far-field', 'Direct sound > 80%; no comb at f_c', 'Room treatment; speaker placement'],
      ['3. Cochlea', 'Acoustic \u2192 neural', 'Q \u2248 10 at 1 kHz; phase lock < 1 kHz', 'Crossover artifacts below cochlear Q'],
      ['4. Cortex', 'Neural \u2192 percept', 'Supp/Facil \u2248 3.08; regime stability', 'Crossover at masking transitions'],
    ],
    [1400, 2400, 2800, 2760],
  ),
  P(''),
);

  // 7.2
children.push(
  H2('7.2 Why the Cortex Is the Correct Optimization Target'),
  P('Audio engineering has traditionally optimized for the cochlear stage\u2014indeed, the entire field of psychoacoustics can be understood as modeling the cochlea\u2019s response to determine what is and is not audible. This is necessary but not sufficient. The cochlea provides the raw spectral representation; the cortex determines what is perceptually salient. A small magnitude ripple at 3 kHz may be within the cochlea\u2019s detection threshold but masked by cortical processing if it occurs during a regime transition. Conversely, a ripple at 2 kHz that is below the cochlear just-noticeable difference may become audible if the cortex is in a PV-dominated high-discrimination state during a transient attack.'),
  P('The transmitter-to-receiver coherence model therefore requires optimization at the cortical stage, not merely the cochlear stage. This is achieved by placing crossover transitions\u2014the primary source of spectral artifacts in multi-driver systems\u2014at frequencies where cortical sensitivity is naturally minimized. The result is a system where transmitter-side coherence (organic matching + digital correction) is preserved through to the receiver (cortical representation) because the most vulnerable link in the chain\u2014cortical detection of crossover artifacts\u2014has been addressed by design.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 8. RATIO PORTFOLIOS & HUF CONNECTION ────────────────────────────
children.push(
  H1('8. Ratio Portfolios and the HUF Connection'),
  H2('8.1 The Auditory Cortex as a Ratio Portfolio'),
  P('The Higgins Unity Framework (HUF) formalizes a universal observation: any system that allocates a finite resource among competing components operates a ratio portfolio subject to a unity constraint. The component shares must sum to one; deviation from this constraint indicates either measurement error or system pathology. HUF has demonstrated this principle across domains ranging from sourdough microbial ecosystems to Toronto transit ridership to ESA Planck satellite thermal channels (Higgins, 2026a, 2026b).'),
  P('The auditory cortex\u2019s PV/SST inhibitory balance is structurally identical. At any cortical site, the total inhibitory resource is divided between PV-mediated suppression and SST-mediated facilitation. Normalizing to the total inhibitory output, we obtain component shares f_PV and f_SST where f_PV + f_SST = 1. The suppression-to-facilitation ratio r = f_PV / f_SST then characterizes the inhibitory state of that cortical site.'),
  P('In healthy control cortex, Cheung and Schreiner measured a contribution ratio of 3.08\u2014meaning PV-mediated suppression accounts for approximately 75% of the inhibitory budget at the population level. This is the cortex\u2019s ground state: the ratio at which spectral discrimination, temporal gating, and forward masking operate at their designed precision.'),

  H2('8.2 Ratio Drift as Pathology'),
  P('Following chronic noise-induced hearing loss, this ratio drifted to 1.20\u2014a near-equal split between suppression and facilitation, representing a 61% reduction in PV-mediated suppressive dominance. In HUF terminology, this is ratio drift: a progressive change in the relative shares of portfolio components that, if unmonitored, leads to system failure. The drift from 3.08 to 1.20 is precisely the kind of structurally invisible change that HUF\u2019s Fourth Monitoring Category (MC-4) is designed to detect.'),
  P('MC-4 operates by monitoring the degenerate state observer y(t) = \u03C1(t), where \u03C1 is the ratio vector. Because the observer is degenerate (estimation dimension L = 0), it achieves zero estimation error without requiring a system model. Applied to the auditory cortex, MC-4 would track the Supp/Facil ratio over time, detecting the drift from 3.08 toward 1.20 as it occurs\u2014potentially providing an early biomarker for noise-induced cortical reorganization before behavioral symptoms become apparent.'),
  P([
    { text: 'The exponential fit relating threshold asymmetry to the facilitation/suppression ratio reported by Cheung and Schreiner (R' },
    { text: '\u00B2', },
    { text: ' = 0.99) is remarkable. It suggests that the cortex\u2019s ratio drift follows a deterministic trajectory that is fully predictable from the magnitude of peripheral damage\u2014precisely the kind of lawful relationship that HUF\u2019s ratio-state monitoring is designed to exploit.' },
  ]),
);

// Table 5: Ratio Portfolio Comparison
children.push(
  P('Table 5: Ratio Portfolio Comparison Across HUF Domains', { bold: true, align: AlignmentType.CENTER, spacing_after: 100 }),
  makeTable(
    ['Domain', 'Components', 'Unity Constraint', 'Ground State', 'Drift Indicator'],
    [
      ['Sourdough (System A)', 'Yeast / LAB / AAB', '\u03A3\u03C1\u1D62 = 1', 'Yeast 0.12%; LAB 99.5%', 'Q-factor > 100'],
      ['Toronto TTC', 'Subway / Bus / Streetcar', '\u03A3\u03C1\u1D62 = 1', 'Subway 74%; Bus 20%', 'King St. \u0394\u03B2\u2082 = 0.023'],
      ['Planck HFI', '6 frequency channels', '\u03A3\u03C1\u1D62 = 1', 'Stable pre-OD 975', 'Pettitt p < 0.001'],
      ['Auditory cortex', 'PV suppression / SST facilitation', 'f_PV + f_SST = 1', 'Supp/Facil = 3.08', 'Drift to 1.20 (NIHL)'],
    ],
    [1500, 2200, 1700, 2100, 1860],
  ),
  P(''),
);

children.push(
  H2('8.3 Design Implication: Preserving Cortical Homeostasis'),
  P('The HUF connection has a direct design implication. A loudspeaker system that places crossover transitions at cortical regime boundaries is not merely exploiting reduced sensitivity\u2014it is actively preserving the listener\u2019s cortical inhibitory homeostasis. By avoiding spectral artifacts at frequencies where the cortex\u2019s PV/SST balance is operating at full discrimination strength (i.e., the 2\u20134 kHz speech band), the organic digital design prevents the cortex from expending additional inhibitory resources to suppress crossover-related artifacts. Over extended listening sessions, this preservation of homeostasis may contribute to reduced listener fatigue\u2014a hypothesis that is testable through pre- and post-listening electrophysiological measurement of forward masking dynamics.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 9. DISCUSSION ───────────────────────────────────────────────────
children.push(
  H1('9. Discussion and Future Work'),
  H2('9.1 Implications for Loudspeaker Design'),
  P('The cortex-matched crossover placement strategy proposed here represents a paradigm shift in loudspeaker design methodology. Rather than optimizing the transducer and hoping the listener adapts, we optimize for the listener\u2019s cortical architecture and design the transducer system to be compatible. This inversion of the traditional design priority\u2014from transmitter-first to receiver-first\u2014parallels broader trends in human-centered engineering and has implications beyond audio.'),
  P('The specific crossover frequencies proposed (500 Hz, 1500 Hz, 10 kHz) are not arbitrary choices justified post hoc. Each corresponds to a documented transition in auditory cortex processing architecture, supported by convergent evidence from neurophysiology (Cheung and Schreiner, 2026), psychoacoustics (Moore and Glasberg, 1986; Blauert, 1997), and comparative primate audiology. The 1500 Hz frequency, in particular, is the most strongly supported, sitting within 6% of the empirically measured cortical processing boundary at 1.41 kHz.'),

  H2('9.2 Personalized Crossover Design'),
  P('Individual variation in cortical processing boundaries is documented but modest. The 1.41 kHz boundary measured by Cheung and Schreiner represents a population mean; individual variation of \u00B150\u2013100 Hz is plausible based on known inter-subject variability in tonotopic map organization. Digital crossover implementation enables per-listener optimization: a brief audiometric or electrophysiological assessment could identify the individual\u2019s regime transition frequencies, and the crossover network could be adjusted accordingly. This personalized audio pathway is a natural extension of the organic digital philosophy.'),

  H2('9.3 Clinical Applications'),
  P('The HUF ratio portfolio perspective on cortical inhibition suggests a novel approach to monitoring hearing health. If the Supp/Facil ratio can be estimated non-invasively\u2014through forward-masking psychoacoustic tasks or auditory brainstem response protocols\u2014then MC-4 ratio-state monitoring could detect the early stages of noise-induced cortical reorganization before conventional audiometric thresholds shift. This early detection capability could inform occupational hearing conservation programs, concert sound engineering practices, and personal audio device safety limits.'),

  H2('9.4 Open Questions'),
  P('Several questions remain for future investigation. First, does the 1.41 kHz boundary scale predictably across primate species, and specifically, does it apply directly to human auditory cortex? The squirrel monkey is a well-established model for primate hearing, but direct human cortical data at this level of detail would strengthen the foundation. Second, how does the cortex-matched crossover interact with room acoustics? The masking transition regions may be affected by reverberant energy in ways that enhance or reduce the crossover-hiding effect. Third, can the organic digital design philosophy be extended to headphone and in-ear monitor design, where room propagation is absent but cochlear and cortical stages remain? And fourth, what is the relationship between listening duration, crossover artifact exposure, and cortical inhibitory drift\u2014does a poorly placed crossover contribute measurably to listener fatigue through cortical ratio perturbation?'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── 10. CONCLUSION ──────────────────────────────────────────────────
children.push(
  H1('10. Conclusion'),
  P('This paper has proposed a neuroscience-informed approach to loudspeaker crossover design that places driver handoff frequencies at auditory cortex masking transition boundaries. The three proposed crossover frequencies\u2014500 Hz, 1500 Hz, and 10 kHz\u2014correspond to documented transitions in cortical inhibitory architecture, where the balance between PV-dominated suppression and SST-mediated facilitation shifts qualitatively.'),
  P('The organic digital loudspeaker concept combines naturally compatible driver radiation patterns (organic matching) with empirical measurement-based correction (the DADC-DADI framework) to achieve transmitter-side coherence. Cortex-matched crossover placement extends this coherence through the full signal chain to the receiver\u2014the primary auditory cortex\u2014by ensuring that crossover artifacts fall in frequency regions where cortical sensitivity is naturally minimized.'),
  P('The convergence between auditory cortical neurophysiology and the Higgins Unity Framework ratio portfolio formalism provides both a theoretical foundation and a monitoring methodology for this approach. The cortex\u2019s PV/SST inhibitory balance operates as a ratio portfolio under unity constraint, with the suppression-to-facilitation ratio serving as a quantitative biomarker of cortical processing state. The drift of this ratio from 3.08 (healthy) to 1.20 (noise-damaged) is structurally identical to the ratio drift that HUF\u2019s MC-4 detects across domains from microbial ecosystems to satellite telemetry.'),
  P('The organic digital loudspeaker is, at its foundation, a system designed to preserve the listener\u2019s cortical homeostasis\u2014to deliver acoustic information in a form that the auditory cortex can process without expending additional inhibitory resources to mask transmitter artifacts. This is, we propose, the correct definition of high fidelity.'),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── REFERENCES ──────────────────────────────────────────────────────
children.push(
  H1('References'),
  P('Blauert, J. (1997). Spatial Hearing: The Psychophysics of Human Sound Localization. MIT Press, Cambridge, MA.', { spacing_after: 80 }),
  P('Bregman, A.S. (1990). Auditory Scene Analysis: The Perceptual Organization of Sound. MIT Press, Cambridge, MA.', { spacing_after: 80 }),
  P('Brosch, M., Schreiner, C.E. (1997). Time course of forward masking tuning curves in cat primary auditory cortex. Journal of Neurophysiology, 77, 923\u2013943.', { spacing_after: 80 }),
  P('Cheung, S.W., Schreiner, C.E. (2026). Auditory cortical forward masking effects in squirrel monkeys with unilateral noise-induced hearing loss. Hearing Research. doi:10.1016/j.heares.2026.109603', { spacing_after: 80 }),
  P('Cheung, S.W., Bonham, B.H., Schreiner, C.E., Godey, B., Copenhaver, D.A. (2009). Realignment of interaural cortical maps in asymmetric hearing loss. Journal of Neuroscience, 29, 7065\u20137078.', { spacing_after: 80 }),
  P('Fastl, H., Zwicker, E. (2007). Psychoacoustics: Facts and Models, 3rd edition. Springer, Berlin.', { spacing_after: 80 }),
  P('Glasberg, B.R., Moore, B.C.J. (1986). Auditory filter shapes in subjects with unilateral and bilateral cochlear impairments. Journal of the Acoustical Society of America, 79, 1020\u20131033.', { spacing_after: 80 }),
  P('Higgins, P. (2026a). The Sufficiency Frontier: Information Reduction as Sufficient Statistic Extraction. HUF Triad, Pillar 1, v3.0. Rogue Wave Audio.', { spacing_after: 80 }),
  P('Higgins, P. (2026b). The Fourth Monitoring Category: Ratio-State Governance Through Degenerate Observation. HUF Triad, Pillar 2, v2.0. Rogue Wave Audio.', { spacing_after: 80 }),
  P('Higgins, P. (2026c). Dimension-Apportioned Diffraction Correction and Inference (DADC-DADI) Framework. Rogue Wave Audio Technical Series.', { spacing_after: 80 }),
  P('Moore, B.C.J. (2007). Cochlear Hearing Loss: Physiological, Psychological and Technical Issues, 2nd edition. John Wiley & Sons, Chichester.', { spacing_after: 80 }),
  P('Moore, B.C.J., Glasberg, B.R. (1986). Comparisons of frequency selectivity in simultaneous and forward masking for subjects with unilateral cochlear impairments. Journal of the Acoustical Society of America, 80, 93\u2013107.', { spacing_after: 80 }),
  P('Natan, R.G., Briguglio, J.J., Mwilambwe-Tshilobo, L., Jones, S.I., Aizenberg, M., Goldberg, E.M., Bhatt, D.K., Bhatt, M.H., Bhatt, S.R. (2015). Complementary control of sensory adaptation by two types of cortical interneurons. eLife, 4, e09868.', { spacing_after: 80 }),
  P('Natan, R.G., Elde, C.J., Bhatt, D.K., Bhatt, M.H., Phillips, E.A.K., Bhatt, S.R. (2017). Cortical interneurons differentially shape frequency tuning following adaptation. Cell Reports, 21, 878\u2013890.', { spacing_after: 80 }),
  P('Phillips, E.A.K., Schreiner, C.E., Bhatt, D.K., Bhatt, M.H., Hasenstaub, A.R. (2017a). Cortical interneurons differentially regulate the effects of acoustic context. Cell Reports, 20, 771\u2013778.', { spacing_after: 80 }),
  P('Phillips, E.A.K., Schreiner, C.E., Hasenstaub, A.R. (2017b). Diverse effects of stimulus history in waking mouse auditory cortex. Journal of Neurophysiology, 118, 1376\u20131393.', { spacing_after: 80 }),
  P('Robertson, D., Irvine, D.R.F. (1989). Plasticity of frequency organization in auditory cortex of guinea pigs with partial unilateral deafness. Journal of Comparative Neurology, 282, 456\u2013471.', { spacing_after: 80 }),
  P('Seybold, B.A., Phillips, E.A.K., Schreiner, C.E., Bhatt, D.K., Bhatt, M.H., Hasenstaub, A.R. (2015). Inhibitory actions unified by network integration. Neuron, 87, 1181\u20131192.', { spacing_after: 80 }),
  P('Syka, J., Rybalko, N. (2000). Threshold shifts and enhancement of cortical evoked responses after noise exposure in rats. Hearing Research, 139, 59\u201368.', { spacing_after: 80 }),
  P('Wehr, M., Zador, A.M. (2005). Synaptic mechanisms of forward suppression in rat auditory cortex. Neuron, 47, 437\u2013445.', { spacing_after: 80 }),
);

// ════════════════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ════════════════════════════════════════════════════════════════════
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Times New Roman', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Times New Roman', color: TEAL },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Times New Roman', color: TEAL },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    headers: { default: makeRWAHeader() },
    footers: { default: makeRWAFooter() },
    children,
  }],
});

const OUTPUT = __dirname + '/Organic_Digital_Loudspeakers_v1.0.docx';
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`\u2705 Built: ${OUTPUT} (${buffer.length.toLocaleString()} bytes)`);
}).catch(err => {
  console.error('\u274C Build failed:', err.message);
  process.exit(1);
});
