# RWA Update — Push Instructions

**Target:** `github.com/PeterHiggins19/Rogue-Wave-Audio` (branch `master`)
**Prepared:** 2026-04-15
**Purpose:** Second commit to the public RWA repo since the March 11, 2026 initial commit. Brings the public RWA current with local work and establishes reciprocal linkage with the HUF repo.

## What's in this folder

Drop-in replacements (overwrite existing files in the RWA repo):

- `README.md` — updated with "Scientific framework sibling" link to the HUF repo, new BTL Advanced ODL lab study section, references to the new LINEAGE and HUF_RELATIONSHIP documents.
- `CITATION.cff` — fixed the repository-code URL typo (`peterhiggins/RWA` → `PeterHiggins19/Rogue-Wave-Audio`), updated date.

New files (add to the repo):

- `LINEAGE.md` — RWA-side narrative of the arc from DADC-DADI to HUF. Parallel to but distinct from the HUF-side `THE_LINEAGE.md`. This is the engineering-home view: where the instrument was built, how the physics led to the scientific framework.
- `HUF_RELATIONSHIP.json` — structured cross-reference from RWA concepts and artifacts to their HUF counterparts. Reciprocal to the `MASTER_LINEAGE.json` that lives in the HUF repo.
- `docs/papers/The_Higgins_Operator_H1_101.pdf` — the H₁ generalization paper (Feb 2026), previously only in local working folder.
- `concepts/btl-lab-study/README.md` — overview of the physical systems study proposal.
- `concepts/btl-lab-study/BTL_Advanced_ODL_Test_Platform.md` — the detailed proposal: stereo pair of BTL Advanced Organic Digital Loudspeakers under Smaart v9 monitoring, as a cross-validation platform between RWA hardware and HUF methods.

## Suggested commit sequence

One commit, or split as you prefer. Suggested split:

**Commit 1: "RWA ↔ HUF cross-linkage and H₁ paper"**
- README.md (updated)
- CITATION.cff (fixed)
- LINEAGE.md (new)
- HUF_RELATIONSHIP.json (new)
- docs/papers/The_Higgins_Operator_H1_101.pdf (new)

**Commit 2: "BTL Advanced ODL lab study — physical systems cross-validation platform"**
- concepts/btl-lab-study/ (new folder with two files)

Single commit works too; the split just keeps the relationship work and the new lab study conceptually separate.

## What's NOT in this update

- The local DADC-DADI, Organic Digital Loudspeakers, BTL build guides, and src/ folder are unchanged from the March 11 initial commit. If any of those have been updated locally, they should be pushed separately and are not part of this rwa-update.
- No changes to `archive/`, `data/`, `src/`, or `docs/btl-lab/`. Those remain as-is.
- The AES paper draft (`aes doc.docx` in the local RogueWaveAudio folder) is not included. If you want to push it, add to `docs/papers/`.

## What to do after push

Once this lands on `master`:

1. Update the HUF side's `ai-refresh/MASTER_LINEAGE.json` `public_rwa_repo.current_state_as_of_review` to the new date, and note the second commit in the `commit_history` field.
2. Update `ai-refresh/HUF_INTEGRITY_MANIFEST.json` with a new version entry recording the RWA push.
3. Consider whether to verify by cold-starting a fresh AI on both repos to confirm the reciprocal links make sense.

## Context — why this push now

Per your message of 2026-04-15: the concern about HUF-CLS having too much power is now resolved. The safety-boundaries work in `science/eitt/EITT_SAFETY_BOUNDARIES.md` establishes the fence. All project threads are now green-lit for push. The BTL Advanced ODL stereo pair becomes a physical test platform where RWA engineering and HUF methodology meet.

> "HUF-GOV was not a fluke. It was block by block build by reverse engineering component partitions, diffraction, geometric associations, remote monitoring with wave analysis tools, all wrapped in an energy budget on the simplex. All driven by a systems perfectionist. Discovery was as inevitable as entropy itself."
> — Peter Higgins, 2026-04-15
