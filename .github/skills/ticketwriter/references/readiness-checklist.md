# Definition of Ready and quality checklist

Assess only the dimensions relevant to the artefact, using evidence available in the conversation and accessible repository. Never imply checks or approvals have happened when they have not. Distinguish a missing piece of context from a genuinely blocking dependency.

## Development ticket

- **User and outcome:** Is the user story concrete, with a real need and articulated value?
- **Scope:** Is the intended behaviour and boundary of the ticket clear? Is the work small enough to estimate and test?
- **Requirements:** Are expected, empty, error and edge states covered where relevant? Are integrations and platforms identified?
- **UX and accessibility:** Are required designs and accessible interaction patterns available or explicitly awaiting review? Consider keyboard use, semantics, screen readers, focus, contrast and responsive layouts for relevant UI work.
- **Evidence and business value:** Is the rationale backed by supplied evidence or clearly identified as a hypothesis?
- **Acceptance:** Are BDD scenarios unambiguous, observable and non-contradictory?
- **Testing:** Are necessary test assets, data, environments, automated checks, manual QA and analytics validation identified?
- **Dependencies and ownership:** Are blockers, upstream work, cross-team support and relevant links named?
- **Estimation:** Has the delivery team estimated the work? If not, label the estimate `TBC`.
- **Security, privacy and compliance:** Is review identified when the work changes authentication, permissions, personal data, tracking, consent, external dependencies or other sensitive behaviour? Is the threat model proportionate?
- **Risk:** Are the highest-impact delivery or operational risks visible, with mitigations or explicit owners for investigation?

## Epic

- Is the outcome coherent and bounded?
- Are the suggested child tickets independently testable slices rather than duplicated or arbitrary tasks?
- Are major dependencies, uncertainty, discovery needs and release conditions visible?
- Can success be measured without claiming unverified baselines or targets?
- Is cross-discipline input explicit?

## Initiative

- Is there a clear strategic outcome and reason to act?
- Are hypotheses, proposed workstreams and committed work clearly distinguished?
- Are measurable outcomes, milestones, stakeholder decisions and strategic risks identified at the right level?
- Are cross-team ownership and dependencies visible?

## Reporting gaps

- **Blocking:** Without this, a team could implement the wrong thing, breach a material constraint, or cannot meaningfully verify the result.
- **Important but not blocking:** Needed for efficient delivery, but can be resolved during refinement.
- **Optional:** Helpful extra detail, not necessary to proceed.

Use compact readiness labels such as `Not yet ready - awaiting UX flow and analytics event specification`. Do not mark an artefact ready merely because every heading has some text.
