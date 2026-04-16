# BTL Advanced ODL Test Platform — Detailed Proposal

**Document:** BTL Advanced ODL Test Platform specification and measurement protocol sketch
**Status:** Proposal, 2026-04-15
**Companion document:** [`README.md`](README.md) in this folder for the overview and motivation

## 1. Platform

### Hardware

A stereo pair of BTL Advanced Organic Digital Loudspeakers, conforming to the BTL (Below Threshold Loudspeaker) certification standards documented in the RWA repository's `docs/btl-lab/` folder. The "Advanced" designation refers to the current flagship design produced by the Organic Digital Loudspeakers v2.6 framework (see `docs/papers/Organic_Digital_Loudspeakers_v2.6.docx`).

Pair configuration:

- Matched production units (serial-number-paired or QC-matched to DADC tolerance)
- Symmetric placement with respect to the listening position
- Cabinet dimensions documented to DADC-relevant precision (H, W, D in meters to ±0.001 m)
- Driver-level pairing matched at the level DADC/DADI inference can resolve

### Measurement stack

**Smaart v9** (Rational Acoustics) as the primary measurement platform. Smaart v9 provides:

- Dual-channel FFT transfer-function measurement
- Impulse-response capture via log-swept sine or pink-noise stimulus
- Time-gated frequency response for pseudo-anechoic measurements inside the BTL lab boundary
- Real-time SPL with calibrated reference
- Coherence analysis between stimulus and response
- Spatial averaging across multiple microphone positions
- Export to CSV/text for offline HUF-side analysis

**Measurement microphones:**

- Reference-class omnidirectional microphone for primary measurements
- Matched pair for dual-mic coherence checks if available
- Calibration cross-check against known reference (sound-level calibrator, or certified reference mic exchange) before each measurement session

**Data path from Smaart to HUF:**

Exported Smaart traces (frequency response, impulse response, SPL, coherence) flow into a Python processing layer that converts each measurement into a compositional object on an appropriate simplex. This layer is part of the HUF repo's `chem_eitt_pipeline.py` lineage and will be extended as needed.

## 2. Measurement protocol sketch

### Baseline measurements (one-time, establish reference)

1. Calibration of microphone and SPL reference.
2. DADC prediction for each cabinet from measured physical dimensions: produce predicted gain apportionment (G_H, G_W, G_D) and corner frequencies (f_cH, f_cW, f_cD).
3. Gated anechoic frequency response for L and R channels, 10 Hz – 20 kHz, at 1 m, on-axis.
4. Impulse response capture for each channel.
5. Off-axis response at ±15°, ±30°, ±45°, ±60° horizontal, 0° vertical.
6. Cross-channel comparison baseline: L minus R frequency response, coherence, and residual energy.

### Time-series measurements (for Line 2, EITT validation)

A program of measurements taken over time. Duration ranges: hours (environmental drift within a single session), days (overnight thermal and humidity cycles), weeks (long-term drift and aging). At each time point, capture:

- Gated frequency response at the reference position
- SPL at calibration point
- Ambient conditions (temperature, humidity, ambient SPL floor)
- Channel imbalance (L vs R) as computed from simultaneous dual-channel capture

Each frequency response is normalized to a composition on the frequency simplex (energy per band / total energy). The resulting sequence is a compositional time series. Apply EITT decimation at block sizes M = 2, 5, 10, 20, 50 and compare observed entropy variation against the Hessian bound in `EITT_HESSIAN_BOUND.md`.

### Level-sweep measurements (for Line 3, shape/magnitude)

At a single time point, sweep stimulus level across a range (e.g., -20 dB to +10 dB relative to reference). At each level, capture frequency response.

- **Shape test:** normalize each response to a composition and compute shape-functional quantities (entropy, log-ratio covariance, principal balances). These should be approximately invariant across the level sweep. Quantify any drift.
- **Magnitude test:** compute absolute variance in clr space and total-variation distance against the reference. These should scale predictably with level. Quantify scaling exponent and compare to expectation.

### Pair-comparison measurements (for Line 4, HUF-GOV)

Simultaneous dual-channel capture running continuously across a measurement session. Treat L-vs-R comparison as the monitored compositional quantity. Apply HUF-GOV's three-diagnostic protocol (Total Variation, Aitchison distance, coherence residual) to the L-vs-R pair.

- Record all flags.
- When a flag is raised, a human (Peter) decides whether to investigate, whether the drift is measurement artifact or real, whether to intervene.
- Do not auto-intervene. Do not auto-compensate. The point of HUF-GOV is to preserve the open-loop doctrine even under conditions where auto-compensation is tempting.
- Log each flag with human disposition ("investigate further," "measurement artifact," "environmental drift, not unit issue," "calibration drift, recalibrate mic," etc.). The log itself becomes evidence about whether the HUF-GOV flags are well-calibrated.

### DADC/DADI validation measurements (for Line 1)

From the gated anechoic baselines, extract the diffraction-region frequency response (typically 100 Hz – 2 kHz depending on cabinet size). Fit the low-pass shelving model. Extract measured (G_H, G_W, G_D) and (f_cH, f_cW, f_cD). Compare to DADC predictions. Run DADI in reverse: given the measured gains and corner frequencies, infer physical dimensions; compare to the known physical dimensions.

Do this for left and right channels independently. Asymmetries exceed DADC tolerance specifications are diagnostic of production variation.

## 3. Success criteria

Each line has its own success criterion.

**Line 1 (DADC/DADI validation):**
- Predicted vs measured gain apportionment agrees to within ±0.3 dB per dimension at the corner frequencies
- DADI-inferred dimensions match physical dimensions to within ±2% for each dimension
- L/R channel asymmetry is within documented production tolerance, or the asymmetry is quantified and documented

**Line 2 (EITT validation on measured time series):**
- Observed entropy variation falls inside the Hessian bound for at least three of the five tested block sizes
- The scaling of the residual with M approximately follows the 1/M prediction
- Anomalies — if any — are diagnosable as specific drift events (environmental, setup, drift of a specific driver) rather than unexplained method failure

**Line 3 (shape/magnitude validation):**
- Shape functionals show < 2% drift across a 30 dB level sweep
- Magnitude functionals scale with level to within ±0.5 dB of prediction
- Any deviation is consistent with known nonlinearity (e.g., driver compression at high SPL) rather than unexplained

**Line 4 (HUF-GOV in operation):**
- At least 10 flag events logged with human disposition across the measurement campaign
- False-positive rate (flags that the human finds to be measurement artifact) is documented
- False-negative rate (drift the human catches that HUF-GOV missed) is documented
- The open-loop discipline is maintained: no auto-intervention happens regardless of how compelling the flag

## 4. Failure modes and what they mean

**Line 1 fails** — DADC is wrong for Advanced ODLs, or the production tolerance is wider than predicted. Either outcome is a genuine RWA engineering finding independent of HUF.

**Line 2 fails** — either EITT doesn't generalize to acoustic hardware time series, or the measurement chain introduces artifacts at the block sizes tested. The failure mode is distinguishable if Line 3 also fails (suggests measurement artifact) or if Line 3 passes (suggests genuine limitation of EITT in this regime).

**Line 3 fails** — the shape/magnitude decomposition does not hold in acoustic space, despite holding in energy/chemistry/climate. This would be a significant finding and would require revision of HUF's claims about the generality of the decomposition.

**Line 4 fails** — either HUF-GOV's flag threshold is wrong (too sensitive or not sensitive enough), or the human operator finds that the open-loop doctrine is impractical in real hardware use. Either is a legitimate finding about the governance architecture's applicability.

## 5. Documentation and publication

All measurement data, processing code, and analysis results will be committed to one of:

- This RWA repo (`concepts/btl-lab-study/data/` and `concepts/btl-lab-study/results/`, to be added as the study progresses)
- The HUF repo (`science/loudspeaker-analogy/`) if findings are HUF-methodology-focused

Publication venues: depending on findings, possible targets include the Audio Engineering Society (AES) for Line 1 and Line 4 results, CoDaWork or information-geometry venues for Line 2 and Line 3 results.

## 6. Timeline

No fixed timeline. The study runs in parallel with HUF Phase 2 work. Expected to span months rather than weeks. Initial baseline measurements are the near-term priority once hardware availability and Smaart v9 integration are confirmed.

## 7. Provenance

This proposal is the first document in `concepts/btl-lab-study/` as of 2026-04-15. It encodes a measurement program that has been informally discussed for months within the HUF project context. The shape-preservation math and HUF-GOV doctrine were both developed largely outside acoustic hardware; this study brings them back into contact with the hardware they came from.

The study is one of the seven tracks in HUF Phase 2 (`science/eitt/EITT_PHASE_2_ROADMAP.md`, Track 3 — second external domain validation). Though "acoustic hardware" is not an external domain to RWA, it is external to the energy/chemistry/climate datasets HUF has been validated against so far. The Advanced ODL pair is therefore the cross-validation platform where RWA engineering and HUF scientific method meet in physical hardware for the first time.

Driven by a systems perfectionist. Discovery was as inevitable as entropy itself.
