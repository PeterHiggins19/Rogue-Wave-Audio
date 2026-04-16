# Rogue Wave Audio (RWA)

**Professional audio engineering: organic digital loudspeaker design, BTL studio lab, and advanced acoustic methods.**

Rogue Wave Audio is an audio engineering project spanning loudspeaker design theory, studio monitoring certification, and computational acoustic tools. The primary publication is *Organic Digital Loudspeakers* — a framework for designing loudspeakers that bridge digital precision with organic acoustic behavior.

> **Scientific framework sibling:** [Higgins Unity Framework (HUF)](https://github.com/PeterHiggins19/Higgins-Unity-Framework). The compositional-monitoring mathematics developed at RWA for loudspeaker diffraction correction generalizes — across energy markets, chemistry, climate scenarios, and infrastructure — into HUF's MC-4 and EITT frameworks. See [`LINEAGE.md`](LINEAGE.md) for the arc, [`HUF_RELATIONSHIP.json`](HUF_RELATIONSHIP.json) for the concept-to-concept cross-reference.

## Core Projects

### Organic Digital Loudspeakers (v2.6)

The flagship paper presenting a design philosophy for loudspeakers that achieve digital-grade accuracy while maintaining natural acoustic properties. Covers driver selection, crossover topology, cabinet design, and measurement validation.

### BTL Small Studio Lab

A certified monitoring environment designed and measured to BTL (Below Threshold Loudspeaker) standards. Includes complete system design, simulation data, diffraction correction, and certification documentation.

### DADC-DADI

Dimension-Apportioned Diffraction Correction and Inference — a computational method for predicting and equalizing cabinet edge diffraction effects. Includes an interactive Jupyter notebook tool. The compositional structure in DADC (gains summing to exactly 6.02 dB across the cabinet dimensions) was the engineering discovery that later became HUF's MC-4 framework.

### Higgins Operator H₁

A nonlinear unity-normalization map on Hilbert space that enforces strict global unity normalization (∑ = 1) across hierarchical regimes while preserving directional coherence. Originated from loudspeaker diffraction and dispersion correction, generalized to multi-scale systems. Published in February 2026. See [`docs/papers/The_Higgins_Operator_H1_101.pdf`](docs/papers/The_Higgins_Operator_H1_101.pdf).

### BTL Advanced ODL Lab Study (proposal, new)

A physical systems study using a stereo pair of BTL Advanced Organic Digital Loudspeakers under full Smaart v9 monitoring as a laboratory test platform. The platform bridges RWA engineering and HUF methodology — a place where compositional-monitoring hypotheses can be validated against physical acoustic truth. See [`concepts/btl-lab-study/`](concepts/btl-lab-study/).

### Concept Work

Advanced acoustic research including V-infinity Core engine architecture, Entropix regime-balanced predictive systems, TensorAcousticForge processing pipeline, and universal regime classification. Several of these concept names carried forward into the HUF repo — `entropix` anticipates EITT, `regimes` anticipates HUF's regime vocabulary, `v-infinity-core` became HUF's V∞Core stack documentation.

## Repository Structure

```
RWA/
├── docs/                      # Publications, lab documentation, references
│   ├── papers/                #   Canonical papers (Organic Digital, DADC-DADI, H₁)
│   ├── btl-lab/               #   BTL certification, design, and guides
│   └── reference/             #   Supporting reference materials
├── data/                      # Engineering data (simulations, measurements)
│   └── btl-lab/               #   Current design and measurement spreadsheets
├── src/                       # Build scripts and tools
│   ├── builders/              #   docx-js builder scripts
│   └── tools/                 #   DADC-DADI calculator and other tools
├── concepts/                  # Advanced R&D concept documents
│   ├── ai-reports/            #   AI-assisted research reports
│   ├── btl-lab-study/         #   NEW — BTL Advanced ODL physical systems study proposal
│   ├── entropix/              #   Entropy-based prediction (anticipates HUF/EITT)
│   ├── regimes/               #   Universal regime classification (anticipates HUF regime work)
│   ├── tensor-acoustic-forge/ #   Tensor-based processing pipeline concepts
│   └── v-infinity-core/       #   V∞Core engine architecture (carries into HUF)
├── archive/                   # Superseded designs, logs, reference materials
├── LINEAGE.md                 # NEW — RWA-side narrative of the arc to HUF
├── HUF_RELATIONSHIP.json      # NEW — structured cross-reference to HUF concepts
└── package.json               # Node.js dependencies
```

## Building Documents

```bash
npm install
node src/builders/build_organic_digital_paper_v2_6.js
```

## The Arc

Rogue Wave Audio is where the instrument was built. Binaural Test Lab, Markham, Ontario — a basement lab purpose-built by its user. Loudspeaker diffraction correction forced the mathematics: a fixed 6.02 dB budget apportioned across three cabinet dimensions, gains that must sum to the total, corner frequencies set by the physics. Forward mapping (DADC), inverse inference (DADI), adaptive closure (ADAC). The measurement system was designed to be inert — the probe reads without imprinting.

That design discipline, and the compositional mathematics that emerged from it, generalized. First to the Higgins Operator H₁ in Hilbert space. Then — once the team at HUF recognized it as a compositional data analysis problem — to MC-4 composition monitoring and EITT (Entropy-Invariant Time Transformer). The simplex is the simplex regardless of what lives on it.

HUF-GOV was not a fluke. It was built block by block by reverse-engineering component partitions, diffraction, geometric associations, remote monitoring with wave analysis tools, all wrapped in an energy budget on the simplex. Driven by a systems perfectionist. Discovery was as inevitable as entropy itself.

## License

All rights reserved. See [LICENSE](LICENSE) for details.

## Citation

See [CITATION.cff](CITATION.cff) for citation metadata.
