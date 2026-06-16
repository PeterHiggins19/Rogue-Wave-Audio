# AI-refresh — 2026-06-07 corpus reconciliation (RWA)

**Audience.** Any AI agent or collaborator picking up the Rogue-Wave-Audio (RWA) repo on or after 2026-06-07.
**Prepared by.** Cowork (Opus 4.8) session acting as corpus authority. Verified against the GitHub REST API and the local mirror `Current-Repo/RWA`. Commits/pushes remain Peter's gate via GitHub Desktop.
**Companion.** Mirror-root `CORPUS_MAP_2026-06-07.md` + `CORPUS_MANIFEST_2026-06-07.json`.

---

## Why this file exists

RWA had strong identity files (`RWA-001.json`, `LINEAGE.md`, `HUF_RELATIONSHIP.json`, `README.md`) but **no fast-refresh / admin layer** like HUF and Hs. This reconciliation created `RWA_FAST_REFRESH.json` and `RWA_ADMIN.json` so RWA has the same load-first context surface as its sibling repos, and recorded the current state.

## Current state (verified 2026-06-07)

| Fact | Value |
|---|---|
| GitHub remote | `PeterHiggins19/Rogue-Wave-Audio` (branch `master`) |
| Remote last push | **2026-04-16** (`Update validate.yml`) |
| GitHub size | ~3 MB |
| Mirror uncommitted | **63 files** (mostly `archive/`, `docs/`, `concepts/`) |
| Admin layer | **created today** — `RWA_FAST_REFRESH.json` + `RWA_ADMIN.json` (RWA had none before) |

## What RWA is (for grounding)

Engineering home of the corpus. Core outputs: **Organic Digital Loudspeakers (v2.6)**; **BTL** (Binaural Test Lab, Markham — sound-controlled professional lab, single canonical identity); **DADC-DADI** (cabinet-diffraction correction whose gain vector sums to exactly 6.02 dB across dimensions = a 3-simplex composition); and the **Higgins Operator H1** (self-hosted working paper, Feb 2026). The 6.02 dB simplex was the empirical discovery that became HUF's MC-4 and, downstream, the Hs CNT/CNQ instrument — "DADC was doing CoDa before CoDa was named."

## Action owed (Peter, via GitHub Desktop)

1. Review and **commit the 63 uncommitted files** (`archive/`, `docs/`, `concepts/`).
2. **Push** `master` (remote behind since 2026-04-16).
3. Commit the new `RWA_FAST_REFRESH.json` / `RWA_ADMIN.json` / this note as part of that push.

## Honest-broker locks (carry forward)

- **BTL = Binaural Test Lab** — single canonical identity; *not* "Below Threshold Loudspeaker," *not* a "basement lab" (it is a sound-controlled professional laboratory).
- **Higgins Operator H1** is a **self-hosted working paper (Feb 2026)** — do not miscite it as a formal peer-reviewed publication.
- RWA documents must not inflate EITT or the Hs claim tiers; the Hs repo holds the canonical confirmed/experimental/not-implemented strengths.

---

*Reconciliation + new admin layer; no engineering content changed. The instrument reads. The expert decides. The hashes carry the receipts.*
