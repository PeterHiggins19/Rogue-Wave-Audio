# Contributing to RWA

## Build Workflow

### Prerequisites

- Node.js 18+
- npm packages: `docx` (docx-js)

### Building the Paper

```bash
npm install
node src/builders/build_organic_digital_paper_v2_6.js
```

### Building the BTL Guide

```bash
node src/builders/build_btl_guide.js
# or
python src/builders/build_btl_guide.py
```

## Versioning

The primary paper uses semantic versioning: `vMAJOR.MINOR`. Only the latest canonical version lives in `docs/papers/`. Superseded versions are preserved in git history.

## Data Management

Engineering data (simulation spreadsheets, measurement files) lives in `data/btl-lab/current/`. When a new design iteration replaces the current data, move the old files to `archive/btl-lab/old/` or let git history preserve them.

## Third-Party Materials

Datasheets, standards references, and inspiration materials may have redistribution restrictions. Before committing such files, check `THIRD_PARTY_SOURCES.md` and update it if needed. If redistribution rights are unclear, reference the source by URL rather than committing the file.
