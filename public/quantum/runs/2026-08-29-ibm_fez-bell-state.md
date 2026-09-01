# Run 001 — Bell state on ibm_fez

**29 August 2026 · first run on real quantum hardware**

| | |
|---|---|
| Machine | `ibm_fez` — 156 qubits, IBM Quantum |
| Job ID | `da9argmrbfbs73cheqrg` |
| Shots | 5,000 |
| Circuit | 2 qubits: `H(0)`, then `CX(0,1)` |
| Depth | 2 as written → **7** after rewriting for the chip |
| Chart | `qiskit/results/da9argmrbfbs73cheqrg.png` |
| Raw data | `qiskit/results/da9argmrbfbs73cheqrg.json` |

## What I ran

```
.venv/bin/python qiskit/bell-hardware.py --real
.venv/bin/python qiskit/plot_results.py
```

Two gates. `H` puts qubit 0 into a superposition; `CX` ties qubit 1 to it.
That's the whole program — the shortest thing that produces entanglement.

## Results

| Observable | Value | ± | What it asked |
|---|---|---|---|
| `ZZ` | **+0.955** | 0.007 | do both qubits agree? |
| `XX` | **+0.981** | 0.006 | do both qubits agree (other way of asking)? |
| `IZ` | +0.002 | 0.018 | what is qubit 0 doing alone? |
| `IX` | +0.011 | 0.016 | what is qubit 0 doing alone? |
| `ZI` | −0.009 | 0.019 | what is qubit 1 doing alone? |
| `XI` | +0.012 | 0.015 | what is qubit 1 doing alone? |

Singles average **+0.004**. Pairs average **+0.968**.

Reading the labels: `I` means *ignore this qubit*. So `IZ` looks at one qubit
on its own, and `ZZ` looks at both together. `Z` and `X` are just two different
questions you can ask — like measuring someone's height versus their weight.

## What it means

**Each qubit alone is a coin flip.** All four single measurements sit on zero.
Zero means "no tendency either way" — heads as often as tails. There is no
information in one qubit by itself.

**Together they agree, nearly always.** Ask whether the two match and you get
yes ~97% of the time.

That combination is the strange part, and it's the whole point. Neither qubit
has a value of its own. The *pair* has a relationship. You can't find the
relationship by examining either half — it only exists between them.

## The 3.2% gap is the real finding

A simulator would have returned exactly 1.000 for `ZZ` and `XX`. Mine came back
at 0.955 and 0.981.

That shortfall is not a mistake in my code. It's the machine being a physical
object — superconducting circuits chilled near absolute zero, with real errors
in the gates and real errors when reading the answer out. **Measuring that gap
is the entire reason to run on hardware instead of a simulator.**

Related: my 2-gate circuit became **depth 7** after being rewritten. Real chips
have a fixed set of gates and fixed wiring between qubits, so the compiler has
to translate. More gates means more chances to pick up error. That's part of
where the 3.2% came from.

## To repeat this

```
.venv/bin/python qiskit/bell-hardware.py --real   # submit (uses free-plan minutes)
.venv/bin/python qiskit/plot_results.py           # chart the newest result
```

Every run saves itself to `qiskit/results/<job_id>.json`, so nothing is lost and
old runs can be re-charted by job ID:

```
.venv/bin/python qiskit/plot_results.py da9argmrbfbs73cheqrg
```

Rehearse for free first — drop `--real` and it runs on a noisy simulator
instantly, no queue and no quota spent.

## Things I learned the hard way

- **Don't keep code in `.venv/`.** That folder is installed libraries. The next
  `pip install` can wipe it and take your work with it.
- **Never paste an API key into a chat or a script.** Credentials go in once via
  `qiskit/save_credentials.py`, which hides what you type. They live in
  `~/.qiskit/qiskit-ibm.json` after that.
- **Hardware jobs queue.** The Job ID prints immediately — save it. The job keeps
  running on IBM's side even if your laptop sleeps.
- **`measure_all()` is for counting bitstrings, not for the Estimator.** The
  Estimator does its own measuring because it returns averages, not raw outcomes.

## Next

- [ ] Run the same circuit on `ibm_marrakesh` and `ibm_kingston` — different
      machines, different noise. How much do they differ?
- [ ] Try 3 qubits (a GHZ state) and see whether the correlation holds up.
- [ ] Watch what happens to the numbers with fewer shots — 100 instead of 5,000.
