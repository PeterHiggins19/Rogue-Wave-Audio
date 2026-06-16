<!-- ╔══════════════════════════════════════════════════════════════════╗
     ║  THREE-LEVEL ORIENTATION  ·  always three to confirm position     ║
     ║  Level 1 below is identical in every repository of this system.   ║
     ╚══════════════════════════════════════════════════════════════════╝ -->

# The system — one instrument, one arc of discovery

*Level 1 of 3 · the shared message. This section is identical in every repository of this system.*

This is one deterministic compositional instrument and the living history that produced it. It began as a loudspeaker's **ground state** — uniform 4π radiation into a room, a fixed **6.02 dB** budget apportioned across a cabinet's dimensions and summing to a constant — and that single structure, *forced by physics rather than chosen at a whiteboard*, became the simplex, the Higgins operator, composition monitoring (MC‑4 / EITT), the deterministic CN‑TT engine, the **3ⁿ confidence index**, and finally a verification network where any node checks any other. Each step was forced by the one before it.

**Read the whole arc, source to network → [`ARC_OF_DISCOVERY.md`](ARC_OF_DISCOVERY.md).**

![The arc of discovery — from a loudspeaker's ground state to the verification network](arc_of_discovery.svg)

## …and the system lives in more than one repository

*Level 2 of 3 · the other half exists.*

This is one **cross‑brain** split across sibling repositories that reference and **check** each other:

- **RWA — Rogue‑Wave‑Audio** — *you are here* — the headwater, where the ground state and diffraction were first measured.
- **Hˢ — [higgins‑decomposition](https://github.com/PeterHiggins19/higgins-decomposition)** — the live deterministic instrument (the math).
- **HUF — [Higgins‑Unity‑Framework](https://github.com/PeterHiggins19/Higgins-Unity-Framework)** — the governance, lineage, and development history.

Two‑repo map and the cross‑repo resolver: [`CROSS_BRAIN.md`](CROSS_BRAIN.md) · routing rule: [`DOCUMENT_DISTRIBUTION.md`](DOCUMENT_DISTRIBUTION.md).

## …and this repository is the headwater

*Level 3 of 3 · what this one is.*

**RWA (Rogue Wave Audio)** is where the instrument was built — the Binaural Test Lab, the loudspeaker diffraction work, and the **ground state** the whole arc flows from. See [`THE_GROUND_STATE.md`](THE_GROUND_STATE.md) and [`LINEAGE.md`](LINEAGE.md). Everything below this line is that origin record.

> ▶ **The instrument this headwater produced now lives as Hˢ kinematics** — the matured deterministic engine for reading any composition in motion. If you have a composition to analyse, start at **`IS_Hs_RIGHT_FOR_YOU.md`** in the [Higgins Decomposition (Hˢ) repository](https://github.com/PeterHiggins19/higgins-decomposition): an honest guide to whether Hˢ fits your data, what it does at your D, and how an AI assistant can run it for you. The coherence the four‑driver ground state was engineered around is the same coherence the engine now reads everywhere.

> **Why three.** Three statements — what the system is, that a sibling exists, and which one you are reading — let any reader, human or machine, confirm both their **position** and the system's **status**. It is the same rule the instrument runs on: one perspective is a point, two a line, three a plane; three is the minimum to *locate*, not merely detect. Machines: each repo's entry point is its identity card / fast‑refresh JSON (`RWA-001.json` here); the resolver in [`CROSS_BRAIN.md`](CROSS_BRAIN.md) keeps every cross‑repo path valid standalone.

---

# Rogue Wave Audio (RWA)

**Professional audio engineering: organic digital loudspeaker design, Binaural Test Lab (BTL), and advanced acoustic methods.**

Rogue Wave Audio is an audio engineering project spanning loudspeaker design theory, studio monitoring certification, and computational acoustic tools. The primary publication is *Organic Digital Loudspeakers* — a framework for designing loudspeakers that bridge digital precision with organic acoustic behavior.

> **Lab identity card:** [`RWA-001.json`](RWA-001.json) — canonical machine-readable identity for the **Binaural Test Lab (BTL)** in Markham, Ontario. BTL is a single canonical identity (no other gloss). Issued 2026-05-08.

> **Scientific framework sibling:** [Higgins Unity Framework (HUF)](https://github.com/PeterHiggins19/Higgins-Unity-Framework). The compositional-monitoring mathematics developed at RWA for loudspeaker diffraction correction generalizes — across energy markets, chemistry, climate scenarios, and infrastructure — into HUF's MC-4 and EITT frameworks. See [`LINEAGE.md`](LINEAGE.md) for the arc, [`HUF_RELATIONSHIP.json`](HUF_RELATIONSHIP.json) for the concept-to-concept cross-reference.

## Core Projects

### Organic Digital Loudspeakers (v2.6)

The flagship paper presenting a design philosophy for loudspeakers that achieve digital-grade accuracy while maintaining natural acoustic properties. Covers driver selection, crossover topology, cabinet design, and measurement validation.

### BTL Small Studio Lab

A certified monitoring environment designed and measured at the **Binaural Test Lab (BTL)** — a sound-controlled professional laboratory class with a research deployment in Markham, Ontario and a four-laboratory institutional deployment (two facilities in Ottawa, Canada; two in Monaco) operated by the project's private Canadian industrial sponsor. BTL is a single canonical identity: the lab's identity card is [`RWA-001.json`](RWA-001.json). Includes complete system design, simulation data, diffraction correction, and certification documentation.

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

Rogue Wave Audio is where the instrument was built. The Binaural Test Lab (BTL) — a sound-controlled professional laboratory currently sited in Markham, Ontario, with pre-COVID origins at the manufacturing facility of a private Canadian industrial sponsor and parallel institutional deployments at two laboratories in Ottawa and two in Monaco — is the research home of the work. Loudspeaker diffraction correction forced the mathematics: a fixed 6.02 dB budget apportioned across three cabinet dimensions, gains that must sum to the total, corner frequencies set by the physics. Forward mapping (DADC), inverse inference (DADI), adaptive closure (ADAC). The measurement system was designed to be inert — the probe reads without imprinting.

That design discipline, and the compositional mathematics that emerged from it, generalized. First to the Higgins Operator H₁ in Hilbert space. Then — once the team at HUF recognized it as a compositional data analysis problem — to MC-4 composition monitoring and EITT (Entropy-Invariant Time Transformer). The simplex is the simplex regardless of what lives on it.

HUF-GOV was not a fluke. It was built block by block by reverse-engineering component partitions, diffraction, geometric associations, remote monitoring with wave analysis tools, all wrapped in an energy budget on the simplex. Driven by a systems perfectionist. Discovery was as inevitable as entropy itself.

## License

All rights reserved. See [LICENSE](LICENSE) for details.

## Citation

See [CITATION.cff](CITATION.cff) for citation metadata.

---

## References & Acknowledgments

*A fully maintained list. The science here stands on the work of others; we cite it extensively, as both respect and protection. When the framework adopts a new method, or a member of the community engages the work, add it here — and in the identical block carried by the sibling repositories.*

### Acknowledgments — the compositional data analysis community

This instrument is built on standard compositional tools, and it exists in dialogue with the people who created and steward them. With gratitude to the **CoDa Association** and the organisers, scientific committee, and hosts of **CoDaWork 2026** (Coimbra, Portugal, 1–5 June 2026; co-hosted with the **Sociedade Portuguesa de Geologia**), whose welcome made this work's first compositional presentation possible — and to the community members who welcomed, questioned, and strengthened it:

- **Conference chairs & hosts:** Juan José Egozcue (chair of the committee that accepted the work), Teresa Albuquerque (conference co-chair and host).
- **Foundational scholars whose work the instrument stands on:** Vera Pawlowsky-Glahn, Juan José Egozcue, Raimon Tolosana-Delgado, Karel Hron, Antonella Buccianti, Gregory B. Gloor, Javier Palarea-Albaladejo.
- **Colleagues who welcomed and challenged the work:** Paul-Gauthier Noé, Patricia Genius Serra, Christine Thomas-Agnan, Dot Dumuid, Kamila Fačevicová, Gianna Serafina Monti, Rui Santos.
- **Fellow presenters whose work runs alongside this one:** Narayana & Chotirmall (microbiome time series), Ascari & Fiori (energy-mix clustering), Kanjiradan & Veetil (compositional health series), Vega Baquero & Santolino (compositional finance).

Particular thanks to **Juan José Egozcue** and **Vera Pawlowsky-Glahn** for their written discussion of this work and their subcompositional-coherence results, which directly informed it.

*The instrument reads. The expert decides. These are the experts.*

### References — the science this instrument is built upon

**Compositional data analysis.**
- Aitchison, J. (1982). The statistical analysis of compositional data. *Journal of the Royal Statistical Society, Series B*, 44(2), 139–177.
- Aitchison, J. (1986). *The Statistical Analysis of Compositional Data*. London: Chapman & Hall.
- Pawlowsky-Glahn, V., & Egozcue, J. J. (2001). Geometric approach to statistical analysis on the simplex. *Stochastic Environmental Research and Risk Assessment*, 15, 384–398.
- Egozcue, J. J., Pawlowsky-Glahn, V., Mateu-Figueras, G., & Barceló-Vidal, C. (2003). Isometric logratio transformations for compositional data analysis. *Mathematical Geology*, 35(3), 279–300.
- Egozcue, J. J., & Pawlowsky-Glahn, V. (2005). Groups of parts and their balances in compositional data analysis. *Mathematical Geology*, 37(7), 795–828.
- Pawlowsky-Glahn, V., Egozcue, J. J., & Tolosana-Delgado, R. (2015). *Modeling and Analysis of Compositional Data*. Chichester: John Wiley & Sons.
- Egozcue, J. J., & Pawlowsky-Glahn, V. (2023). Subcompositional coherence and proportionality. *SORT — Statistics and Operations Research Transactions*.
- Martín-Fernández, J. A., Barceló-Vidal, C., & Pawlowsky-Glahn, V. (2003). Dealing with zeros and missing values in compositional data sets. *Mathematical Geology*, 35(3), 253–278.
- Palarea-Albaladejo, J., & Martín-Fernández, J. A. (2015). zCompositions: R package for the imputation of left-censored compositional data. *Chemometrics and Intelligent Laboratory Systems*, 143, 85–96.
- Filzmoser, P., Hron, K., & Templ, M. (2018). *Applied Compositional Data Analysis*. Cham: Springer.
- Greenacre, M. (2018). *Compositional Data Analysis in Practice*. Boca Raton: Chapman & Hall/CRC.
- Gloor, G. B., Macklaim, J. M., Pawlowsky-Glahn, V., & Egozcue, J. J. (2017). Microbiome datasets are compositional: and this is not optional. *Frontiers in Microbiology*, 8, 2224.

**Information theory & geometry.**
- Shannon, C. E. (1948). A mathematical theory of communication. *Bell System Technical Journal*, 27, 379–423 & 623–656.
- Stevens, S. S. (1946). On the theory of scales of measurement. *Science*, 103(2684), 677–680.
- Amari, S. (1985). *Differential-Geometrical Methods in Statistics*. New York: Springer.

**Acoustic & mathematical lineage (the DADC origin).**
- Strutt, J. W. (Lord Rayleigh) (1896). *The Theory of Sound* (2nd ed.). London: Macmillan.
- Sommerfeld, A. (1896). Mathematische Theorie der Diffraction. *Mathematische Annalen*, 47, 317–374.
- Olson, H. F. (1957). *Acoustical Engineering*. Princeton: Van Nostrand.
- Vanderkooy, J. (1991). A simple theory of cabinet edge diffraction. *Journal of the Audio Engineering Society*, 39(12), 923–933.
- Linkwitz, S. H. (1976). Active crossover networks for noncoincident drivers. *Journal of the Audio Engineering Society*, 24(1), 2–8.
- Banach, S. (1922). Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales. *Fundamenta Mathematicae*, 3, 133–181.
- Gershgorin, S. A. (1931). Über die Abgrenzung der Eigenwerte einer Matrix. *Izvestiya Akademii Nauk SSSR*.

**How to cite this work:** see [`CITATION.cff`](CITATION.cff). AI assistance is used per HUF-STD-001; research design, mathematical content, and scientific responsibility remain with the named author.
