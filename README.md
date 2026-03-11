# Rogue Wave Audio (RWA)

**Professional audio engineering: organic digital loudspeaker design, BTL studio lab, and advanced acoustic methods.**

Rogue Wave Audio is an audio engineering project spanning loudspeaker design theory, studio monitoring certification, and computational acoustic tools. The primary publication is *Organic Digital Loudspeakers* — a framework for designing loudspeakers that bridge digital precision with organic acoustic behavior.

## Core Projects

### Organic Digital Loudspeakers (v2.6)

The flagship paper presenting a design philosophy for loudspeakers that achieve digital-grade accuracy while maintaining natural acoustic properties. Covers driver selection, crossover topology, cabinet design, and measurement validation.

### BTL Small Studio Lab

A certified monitoring environment designed and measured to BTL (Below Threshold Loudspeaker) standards. Includes complete system design, simulation data, diffraction correction, and certification documentation.

### DADC-DADI

Dimension-Apportioned Diffraction Correction and Inference — a computational method for predicting and equalizing cabinet edge diffraction effects. Includes an interactive Jupyter notebook tool.

### Concept Work

Advanced acoustic research including V-infinity Core engine architecture, Entropix regime-balanced predictive systems, TensorAcousticForge processing pipeline, and universal regime classification.

## Repository Structure

```
RWA/
├── docs/                    # Publications, lab documentation, references
│   ├── papers/              # Canonical papers (Organic Digital, DADC-DADI)
│   ├── btl-lab/             # BTL certification, design, and guides
│   └── reference/           # Supporting reference materials
├── data/                    # Engineering data (simulations, measurements)
│   └── btl-lab/             # Current design and measurement spreadsheets
├── src/                     # Build scripts and tools
│   ├── builders/            # docx-js builder scripts
│   └── tools/               # DADC-DADI calculator and other tools
├── concepts/                # Advanced R&D concept documents
├── archive/                 # Superseded designs, logs, reference materials
└── package.json             # Node.js dependencies
```

## Building Documents

```bash
npm install
node src/builders/build_organic_digital_paper_v2_6.js
```

## License

All rights reserved. See [LICENSE](LICENSE) for details.

## Citation

See [CITATION.cff](CITATION.cff) for citation metadata.
