# The ground state — where it all began

*Rogue Wave Audio · the headwater of the arc. Author: Peter Higgins (human authorship for all claims); AI-assisted per HUF-STD-001. Honest-broker; claim tiers marked. This document is the origin end of the lineage chain whose far end is the 3ⁿ confidence index and the verification network.*

---

## One formula, and the whole system is already in it

A rectangular cabinet radiates sound into a room. At low frequencies, where the wavelength is much larger than the box, radiation is omnidirectional — full 4π steradian, every direction carrying the same share of the energy. As frequency rises and the wavelength approaches the cabinet's dimensions, that balance breaks: sound concentrates forward, the sides lose power, the back drops off. The composition of the radiated energy moves away from uniform.

The total correction for that transition is **fixed**. Exactly

```
6.02 dB = 20 · log₁₀(2)
```

— the 2π-to-4π radiation step. It cannot be more or less; it is the doubling. That fixed budget is then **apportioned** across the physical dimensions, each getting a share proportional to its size:

```
G_dim = 6.02 · dim / S ,   S = H + W + D
```

and the shares **always sum back to the budget**:

```
G_H + G_W + G_D = 6.02 dB   (exactly, by construction)
```

each with its own corner frequency

```
f_c = 115 / dim   (Hz·m)
```

For the Binaural Test Lab box (H=0.8, W=0.368, D=0.33 m): `G_H=3.215, G_W=1.479, G_D=1.326` dB — summing to 6.0206 — with corners `143.8, 312.5, 348.5` Hz. *(Tier 1 — derived and measured; arithmetic verified.)*

That is the engineering object. It is also, term for term, a **3-part composition on the simplex with a conserved total**. The gain vector `(G_H, G_W, G_D)` normalized by 6.02 is a point in the 2-simplex. The apportionment is the *shape*; the corner frequencies are the *scale*. The constraint that the parts sum to a constant is **closure** — the defining property of compositional data. None of this was imposed by theory. All of it was forced by the physics of a finite body radiating into a room. The loudspeaker was doing compositional data analysis before CoDa had a name for it.

## The two faces you asked to find: ground state and diffraction

These are not two ideas. They are the rest state and the first motion of one idea.

**The ground state.** At low frequency the box radiates isotropically — energy shared *equally* across all 4π. That uniform pattern is the acoustic ground state, and it is, coordinate for coordinate, the **barycentre of the simplex** `(1/D, 1/D, …, 1/D)`: the maximum-entropy composition, the reference state every later departure is measured against. RWA found it in a radiation pattern; the framework generalized it to any compositional system's resting point. Same point, different room.

**Diffraction.** As frequency climbs past `f_c`, the conserved budget begins to redistribute across the dimensions — the composition departs from the barycentre, and the *direction and size* of that departure carries all the structural information. This is the first motion away from the ground state, and every diagnostic built since (total variation, Aitchison distance, the coherence residual) is a way of reading exactly this departure.

The ground state is where the information is zero. Diffraction is how the information appears. The whole instrument is the careful reading of the gap between them.

## The drivers — how the coherent ground state is built, and the dimensional ladder it sets

The apportionment above is the *cabinet's* radiation balance (the three box dimensions). But the field that actually arrives at the listening position is the sum of an **array of drivers**, each controlled in **time** (phase/delay) and **space** (position), so their contributions add to a *uniform, coherent composition on the listening surface* — omnidirectional, equalized, no direction or band privileged. The ground state is not only the barycentre of the cabinet's dimensions; it is the **coherent sum of the drivers at the listener**.

That makes **coherence the engineered quantity**. The array reaches the uniform ground state only when the drivers phase- and position-align so their radiation adds into the uniform field instead of scattering. Coherence *is* the condition for the ground state; incoherence is departure from it. *(Tier 1 — the design law of the instrument.)*

And the **driver count sets a dimensional ladder** that the whole framework later runs on:

| Configuration | Drivers | Composition dimension | Reading |
|---|---|---|---|
| one cabinet | 4 drivers | **D = 4** | unit quaternion `S³ = SU(2)`; Aitchison rotation = `q v q*`, **exact** (IEEE floor ~4.4e‑16) |
| stereo | 2 cabinets = 8 | D = 8 | twin quaternion (experimental) |
| quadraphonic | 4 cabinets = 16 | D = 16 | quad (not yet implemented) |

The four‑driver cabinet is the **physical source of the D=4 quaternion exactness** — the isomorphism that anchors everything downstream. Stereo and quadraphonic are the 8‑ and 16‑part rungs of the same ladder.

**Why this is the headwater of the coherence result.** When the matured instrument was turned on 107 unrelated real systems (Compositional Character Space, the second‑order read), two things were *measured*: that **coherence is the principal axis organizing the entire space**, and that the one **exact** isomorphism among all systems is the **D=4 quaternion**. Both are this section. The coherence axis is the radiation‑coherence the array equalizes; the quaternion anchor is the four drivers. The downstream synthesis *"coherence is isomorphizability"* (a system's coherent part admits a clean structure‑preserving map; its incoherent part is the residual that resists one and costs dimensions) is the loudspeaker's design law generalized: the coherent field is exactly the one the exact 4‑driver quaternion description fits. *(Tier 1 for the acoustic system and the D=4 exactness; Tier 2 — recognition, not proof — for the lineage to the abstract coherence result.)*

## Time is not tacked on — it is read off the box

This is the part that earns blank stares, and it is the centre of everything.

In a conventional model you choose a time axis and lay an integral or an operator over it. The dynamics then live in that choice — which means they live in the modeler. There is always a free parameter, a place where someone decided.

In DADC nobody chose the frequency. `f_c = 115/dim` is not fitted; it **falls out of the boundary condition**. When the wavelength reaches the size of the box, the pattern *has* to break, and the physics decides exactly where — set by the ratio of wavelength to dimension, nothing else. Frequency is the reciprocal of time, so the characteristic timescale is a **property of the radiating object, not a coordinate imposed on it**. Time enters through the geometry, intrinsically, not through a tacked-on integral.

EITT (the Entropy-Invariant Time Transformer) is that same sentence spoken in the time domain: Shannon entropy of a compositional time series stays near-invariant under geometric-mean decimation (measured: 0.18% over a 341:1 reduction). It holds *because the timescale was intrinsic to begin with* — coarse-graining time cannot destroy a structure the geometry already fixed. DADC is the spatial/frequency face; EITT is the temporal face; both say the timescale belongs to the object.

## Why this grounds certainty — and the honest edge that makes it stronger

Forced structure has no researcher degrees of freedom. When the closure is a consequence of a conserved budget, the barycentre is a consequence of isotropic radiation, and the information-bearing departure is a consequence of what diffraction physically does, then there is nothing left in the usual place where models turn out to be wrong. The wrongness lives in the choices, and here there were none to make. *(Tier 1 for the acoustic system; Tier 2 — standard math soundly applied — for the generalization to abstract compositions.)*

The honest edge does not weaken this; it sharpens it. The certainty is exact **wherever the structure is genuinely present**: a conserved whole, apportioned across parts. Carrying it into a new domain reduces to a single empirical question — does *this* system actually have that shape? When it does, the certainty transfers intact. When it does not, the diagnostics say so out loud. So what the framework offers is not certainty that it applies to all things; it is certainty in the instrument, plus the honesty to let it report where it fits. That is why the loop was kept open (HUF-GOV observes; it does not silently close), and it is a harder, cleaner thing to stand on than blanket certainty would ever be.

## The arc, source to network

Every later stage is this same object in new clothes — nothing invented at a whiteboard, all of it forced from the box outward:

```
ground state (isotropic 4π = barycentre)
   └─ diffraction (DADC: 6.02 dB apportioned, f_c = 115/dim)
        └─ the simplex (parts sum to a constant — closure)
             └─ Higgins operator H₁ (unity + coherence, in Hilbert space)
                  └─ MC-4 · EITT (composition monitoring; entropy invariant in time)
                       └─ CN-TT v4 (deterministic, hash-receipted instrument)
                            └─ the 3ⁿ confidence index (opinion → agreement → validation)
                                 └─ triple-channel · the network (any node checks any node)
```

The paired-measurement instinct at the root — *one curve lies; a flat frequency response can hide a violent directional redistribution, so always read two* — is the direct ancestor of the dual-metric protocol, then the three-diagnostic protocol, then the 3ⁿ confidence index, and finally the triple-channel verification network. "Two curves because one lies" and "three perspectives to locate an error" are the same discipline at two scales. The loudspeaker taught it first.

## Invariants carried unchanged

| Invariant | RWA origin (acoustic) | What it became |
|---|---|---|
| `6.02 dB = 20·log₁₀2` | total baffle-step budget, fixed | binary doubling; the 2:1 ratio as the primary decimation test |
| `115 Hz·m` | corner frequency = 115/dimension | scale constant linking compositional dimension to timescale |
| inert measurement | non-contact probe imprints nothing | "HUF is inert" — open-loop by architecture, not by choice |
| sum = constant | gains sum to exactly 6.02 dB | simplex closure: parts sum to κ |
| isotropic ground state | uniform 4π radiation | barycentre (1/D…1/D); maximum-entropy reference |

## Cross-references (resolver in `CROSS_BRAIN.md`)

- `LINEAGE.md` (this repo) — the RWA→HUF arc in narrative form.
- `HUF_RELATIONSHIP.json` (this repo) — the machine-readable concept-to-counterpart map and the shared invariants.
- `data/btl-lab/notes/DIMENSION-APPORTIONED_DIFFRACTION_CORRECTION_3.txt` — the DADC-ADAC derivation (the formula, in full).
- HUF repo `science/methodology/CONFIDENCE_INDEX.md` — the 3ⁿ index; this document is its origin end.
- HUF repo `briefings/THE_LINEAGE.md` and `science/coda-monitoring/ORIGIN_BRIDGE_DADC_TO_MC4.md` — the same arc from the framework side.
- Hˢ repo `experiments/network_redundancy_2026-06/` and `clifford_tiling_redundancy_2026-06/` — the far end: the discipline, built and verified.

*The box gave the formula. The open loop is what lets it be trusted everywhere it is earned.*
