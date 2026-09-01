# Run 002 — Bell state on ibm_kingston

**29 August 2026 · comparison run — ⚠️ RESULT INVALID, see below**

Same circuit as [Run 001](2026-08-29-ibm_fez-bell-state.md), different machine.
The point is to see how much of the 3.2% noise was `ibm_fez` specifically.

| | |
|---|---|
| Machine | `ibm_kingston` — 156 qubits |
| Job ID | `da9b339qtnsc73d1d42g` |
| Status | DONE — but the numbers are unphysical |
| Shots | 5,000 |
| Circuit | 2 qubits: `H(0)`, then `CX(0,1)` — identical to Run 001 |
| Depth | 2 as written → **7** after rewriting (same as fez) |

## What I ran

```
.venv/bin/python qiskit/bell-hardware.py --real --backend ibm_kingston
```

The `--backend` flag pins the run to a named machine. Without it, the script
takes whichever machine has the shortest queue — fine for a single run, wrong
for a comparison, where the machine is the variable under test.

## Results — and why they are wrong

| Observable | ibm_fez | ibm_kingston | |
|---|---|---|---|
| `ZZ` | +0.955 ± 0.007 | **+1.429 ± 0.048** | ⚠️ impossible |
| `XX` | +0.981 ± 0.006 | **+1.149 ± 0.044** | ⚠️ impossible |
| `IZ` | +0.002 ± 0.018 | −0.000 ± 0.116 | error bar 6× larger |
| `IX` | +0.011 ± 0.016 | −0.004 ± 0.110 | error bar 7× larger |
| `ZI` | −0.009 ± 0.019 | +0.026 ± 0.038 | |
| `XI` | +0.012 ± 0.015 | −0.010 ± 0.036 | |

**`ZZ` cannot be 1.429.** The observable `ZZ` has only two possible outcomes,
+1 and −1. An average of those can never exceed +1, the way an average of
coin flips scored ±1 can never come out at 1.4. The bound is arithmetic, not
a property of good hardware.

So the correct reading is **not** "kingston beat fez." It is "this run is
invalid and must be thrown out."

## What I checked

**Was it my code?** No. Both jobs used identical settings — same script, same
5,024 shots, same options, no explicit resilience level on either.

**Was kingston running on bad qubits?** No — the opposite. Both runs landed on
physical qubits 0 and 1, and kingston's are better on paper:

| | readout error | T1 | T2 |
|---|---|---|---|
| fez q0 / q1 | 0.0195 / 0.0175 | 50 µs / 155 µs | 53 µs / 184 µs |
| kingston q0 / q1 | 0.0149 / 0.0071 | 323 µs / 208 µs | 326 µs / 290 µs |

**The clue is the error bars.** Kingston's are 6–7× larger on identical shot
counts. Statistical error should be about the same for the same number of
shots — unless something is *scaling the numbers up*, which scales the
uncertainty up with them.

## Best explanation (not yet proven)

The Estimator applies **readout-error mitigation by default** (the result
metadata shows `num_randomizations: 32`, the signature of readout twirling).
Mitigation works by estimating how often the machine misreports a qubit, then
dividing that effect back out.

Divide by a badly estimated correction factor and you **overshoot** — the
answer sails past the true value and out of the legal range. That fits every
symptom: values too high, uncertainty inflated by the same multiplier, and no
difference in the code.

What I cannot confirm from here is *why* the correction was so far off. The
calibration numbers above are the latest available, which may post-date the
run — the machine may have drifted badly at run time and been recalibrated
since.

## The decisive test

Re-run with mitigation switched off and look at the raw numbers:

```python
estimator.options.resilience_level = 0    # no mitigation, raw values
```

Raw values are *always* pulled toward zero by noise, never pushed past 1. If
the unmitigated run comes back at, say, +0.89, that confirms the machine was
noisier than fez all along and the mitigation overcorrected.

## What this run actually taught me

Sanity-check against physics before believing a number. `ZZ = 1.429` looks
like a great result if you only compare it to `0.955` and assume bigger is
better. Knowing the value is capped at 1 is what turns an exciting number into
an obvious error.

A tool will happily plot an impossible value. **The plotting scripts now flag
anything outside |value| ≤ 1 rather than drawing it as a taller bar.**

## A detour: ibm_marrakesh

The first attempt at this comparison went to `ibm_marrakesh` (job
`da9b0s4e74ec73ajilng`) and was **cancelled before it ran**.

The machine reported `status=maintenance` while still showing
`operational=True`. Those mean different things: operational says the machine
accepts jobs, maintenance says it is not really working through them. The job
queued and sat. Cancelling cost nothing — a job that never runs never spends
quota.

**Lesson:** check `backend.status()` before submitting, not just whether the
machine appears in the list.

```python
for b in service.backends():
    st = b.status()
    print(b.name, st.operational, st.status_msg, st.pending_jobs)
```

## Queue depth is not machine quality

When Run 001 went to `ibm_fez`, that machine had **1** job pending, so it came
back quickly. `ibm_kingston` had 22 when this was submitted and 24 shortly
after — the queue grew while waiting.

Queue depth swings by the minute and says nothing about how noisy a machine is.
Fast turnaround is not evidence of a better machine, which is exactly why this
comparison needs measured numbers rather than impressions.

## To finish this entry

```
.venv/bin/python qiskit/compare_runs.py     # -> qiskit/results/comparison.png
```

## Next

- [ ] Re-run kingston with `resilience_level = 0` and compare raw vs mitigated
- [ ] Re-run fez the same way — how much is fez's +0.968 also a correction?
- [ ] Only then is the machine-vs-machine comparison meaningful

---

# Follow-up — the raw test (mitigation off)

**Job `da9c0gke74ec73ajjm50` · same machine, same circuit, correction switched off**

```
.venv/bin/python qiskit/bell-hardware.py --real --backend ibm_kingston --raw
```

## Result: the mystery is solved

| Observable | raw (no correction) | corrected | ibm_fez (corrected) |
|---|---|---|---|
| `ZZ` | **+0.537** | +1.429 ⚠️ | +0.955 |
| `XX` | **+0.458** | +1.149 ⚠️ | +0.981 |
| pairs average | **+0.497** | +1.289 ⚠️ | +0.968 |

Raw, kingston scores **0.497** — about halfway between "no correlation" and
"perfect correlation." The entanglement is there, but half of it is buried in
noise.

That is the answer. Kingston was in poor shape. The correction step saw a
badly degraded signal, tried to scale it back up to compensate, and pushed it
straight past the maximum to 1.289.

**Kingston was not better than fez. It was roughly twice as noisy**, and the
correction hid that behind an impossible number.

## A second clue I had missed

Look at the raw single-qubit values: −0.255, −0.230, −0.120, −0.111.

Those should all sit at **zero** — each qubit alone is supposed to be a coin
flip. They are noticeably negative instead, meaning the machine was
systematically misreading qubits in one direction. On fez the same
measurements landed within 0.012 of zero.

That bias is the thing the correction was trying to undo.

## The general lesson

Error mitigation is a **correction factor**, not magic. It measures how wrong
the machine tends to be, then scales the answer to compensate.

- Machine slightly off → small correction → good answer (fez).
- Machine badly off → large correction → the correction itself becomes
  unreliable and can overshoot (kingston).

**When mitigated results look too good, check them raw.** Raw values can only
be dragged *toward* zero by noise; they can never exceed the maximum. That
makes the raw run a reality check that cannot lie in the same direction.

## Confirmed on the simulator too

The free noisy simulator shows the same pattern in miniature — raw `ZZ` 0.822,
corrected 1.000. Same mechanism, small enough not to overshoot.
