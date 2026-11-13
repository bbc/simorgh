# Ticketwriter output templates

Use the mode matching the scope. Replace guidance in square brackets with the actual content or `TBC`; do not copy bracketed instructions verbatim. Omit irrelevant subpoints, but retain mode section headings unless the user supplies a different team template.

## Mode 1: Development ticket

Generated with Ticketwriter

**Recommended format:** Development ticket - [one-line rationale if not already requested]

### 🧾 Title / Summary
[Short, actionable title.]

### 📖 User Story
As a [user type], I want [goal], so that [benefit].

[For additional genuine personas, put each story in a separate paragraph.]

### 📝 Detail
[Problem, context, affected platforms/systems, current and desired behaviour, scope and exclusions, essential edge cases. Separate decisions from suggestions.]

### 🔗 Related Tickets or Epics
[Verified issue references, or `TBC`.]

### 🎨 Design & Reference Links
[Verified URL or repository path and what it is for, or `TBC`.]

### 📈 Business Value
[User benefit, business outcome, supporting evidence or proposed metric. Do not invent targets.]

### ⚠️ Operational, Delivery or Compliance Risks
[Only credible risks, blockers and dependencies. State `None identified from supplied context` if truly none are identified.]

### ✅ Acceptance Criteria (BDD)

1. [Scenario title]

   GIVEN [initial situation]

   WHEN [user or system action]

   THEN [observable expected result]

   AND [additional expected result, if necessary]

2. [Scenario title]

   GIVEN [initial situation]

   WHEN [user or system action]

   THEN [observable expected result]

[Add only the scenarios the requirement warrants, covering failure or empty states where relevant.]

### 🧪 Testing Information
[Test levels, devices/browsers, test data/assets, QA coverage, analytics checks and acceptance environment as relevant. Do not fabricate.] 

### 🧮 Estimation
[Confirmed estimate, `TBC - team estimation required`, or an explicitly labelled provisional estimate when requested.]

### 🔐 Threat Model & Risk Mitigation (if needed)
[Specific risk and mitigation, `Security/privacy assessment required`, or `Not applicable based on described change` with a short reason.]

### 🤝 External Help Needed
[Only relevant discipline names and the concrete decision, approval, asset or input needed. Common disciplines: Product, Delivery, UX, Accessibility, QA, Software Engineering, Architecture, Data/Analytics, Security/Privacy, Editorial. If none, state `None currently identified`.]

### 📋 Definition of Ready
[Optional succinct status: `Ready for refinement`, `Not yet ready`, or `Ready for delivery`, plus critical gaps. Do not declare ready when unresolved blockers remain.]

---

## Mode 2: Epic

Generated with Ticketwriter

**Recommended format:** Epic - [one-line rationale if not already requested]

### 📚 Epic Summary
[Objective, problem, audience, intended capability and high-level scope.]

### 📖 Epic User Stories
As a [user type], I want [goal], so that [benefit].

[Separate each story by a blank paragraph.]

### 🧩 Suggested Breakdown
1. [Child development ticket title] - [independent deliverable and dependency if known].
2. [Child development ticket title] - [independent deliverable and dependency if known].

[These are proposed child tickets, not pre-existing IDs.]

### 📈 Business Value
[Evidence, expected improvement and measurement approach.]

### ⚠️ Risks & Dependencies
[Technical, organisational, privacy, delivery and integration risks.]

### ✅ High-Level Acceptance Criteria
[Observable done-state and release outcomes. BDD can be used if helpful, but do not repeat full child-ticket criteria.]

### 🎨 Design / Reference Links
[Verified references or `TBC`.]

### 🔗 Related Initiatives
[Verified links or `TBC`.]

### 🧮 Estimation
[Confirmed estimate, team sizing needed, or explicitly labelled provisional range.]

### 🤝 External Help Needed (by discipline)
[Concrete dependencies, approvals and input required.]

### 📋 Definition of Ready
[Optional readiness status and blockers.]

---

## Mode 3: Initiative

Generated with Ticketwriter

**Recommended format:** Initiative - [one-line rationale if not already requested]

### 🏁 Initiative Goal
[Clear strategic outcome and intended users.]

### 🧭 Strategic Context
[Why now, current evidence, strategy alignment and boundaries.]

### 📊 Metrics of Success
[Primary and supporting metrics, baselines and targets only if provided; otherwise `TBC`.]

### 🧩 Related Epics or Workstreams
[Known epics and proposed workstreams, clearly distinguished.]

### 🗺️ Suggested Roadmap or Phasing
[Now/Next/Later, discovery/delivery stages or other user-preferred framing; never invent commitment dates.]

### 📈 Organisational Value
[Audience, business or operational outcomes and trade-offs.]

### 👥 Stakeholders
[Known sponsors and cross-functional groups; do not invent names.]

### ⚠️ Strategic Risks
[Capacity, feasibility, policy, data, uptake and cross-team constraints as applicable.]

### 🤝 External Help Needed (by discipline)
[Specific strategic decisions, evidence, staffing or approvals required.]

---

## Short answer conventions

- If the user requests a Jira ticket only, omit the `Recommended format` line but keep the generated-by line.
- If the supplied team template differs, follow that template while preserving relevant requirements, testability and unknowns.
- Keep `TBC` items grouped where possible instead of scattering dozens of placeholders.
- Do not paste template guidance into an artefact.
