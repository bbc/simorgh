# Reading Behaviour Spike: Execution Plan

Source: [spike-ticket.md](spike-ticket.md). Scope: investigation and optional lightweight proof of concept, not production tracking or recommendation UI.

Current code-review findings and developer next steps are recorded separately in [reading-behaviour-spike-findings.md](docs/reading-behaviour-spike-findings.md). Use this file as the ordered task plan; keep evidence and final conclusions in the findings document.

## Starting Evidence

These are code-review observations, not runtime-validated findings:

- [Storage writer](src/app/components/PageLayoutWrapper/setPageWrapperInlineJs/index.ts#L117): `ws_bbc_topics` stores `{ service: { topicName: { count, id, path } } }`; counts increase for supplied topics on each invocation. This writer does not store article IDs, per-visit timestamps or scroll depth.
- The same writer maintains `ws_bbc_wrapped`: yearly/monthly visit aggregates, page-type/service/topic counts, cumulative word count and duration. Wrapped data is persisted when visibility becomes hidden; duration measures elapsed visible intervals, not verified reading.
- [Existing tests](src/app/components/PageLayoutWrapper/setPageWrapperInlineJs/index.test.ts#L216) cover topic increments, wrapped persistence and visibility cycles. They provide a cheap check of the starting assumptions.
- [UAS integration guide](src/app/lib/uasApi/README.md) documents saved articles (`favourites`) and followed topics (`follows`), browser-session authentication, a shared `world-service-news` domain, service filtering and direct browser requests. It does **not** establish support for consumption events, anonymous activity or historical imports.

## Execution Order

### 1. Agree Scope and Evidence Rules

- [ ] T001 [Plan:1] Developer/product owner selects initial services, supported page types/platforms and what counts as a visit versus engagement. Include an RTL service and a multi-variant service in validation; define whether interests may cross services and whether sign-up growth is an experiment goal.
- [ ] T002 [Plan:1] Agent updates `docs/reading-behaviour-spike-findings.md` as evidence is gathered. Label each conclusion **verified**, **hypothesis** or **blocked**; attach a code reference or dated API evidence.

**Exit:** agreed scope and questions. Steps 2 and 3 can then run independently.

### 2. Audit Local Capture and Retrieval

- [ ] T003 [Plan:2] Agent traces the storage writer's callers and all readers of `ws_bbc_topics` / `ws_bbc_wrapped`. Document topic provenance, execution frequency, navigation/platform gating, consent checks and any existing website consumers. Do not infer article/topic-page coverage from the writer alone.
- [ ] T004 [Plan:2] Agent runs the focused storage tests and records commands/results. Document both schemas, origin/device boundaries, retention/reset behaviour, name-based topic keys, taxonomy changes and whether service variants remain distinguishable.
- [ ] T005 [Plan:2] Agent demonstrates safe retrieval using synthetic browser data or a small test: parse and validate records, select the active service, rank by count and exclude topics already followed. Inspect malformed JSON, unavailable/quota-full storage and missing fields; do not modify production tracking during this audit.
- [ ] T006 [Plan:2] Developer verifies real browser behaviour: anonymous/signed-in sessions, first/repeat article visits, topic-page visits, client navigation, two tabs, private browsing and storage clearing. Check whether aggregate read-modify-write updates lose counts and whether visibility handlers conflict.

**Exit:** sample payloads, reader/caller map, confirmed limitations and a minimal proposal for article-level data. Legacy topic totals cannot reconstruct which articles were visited or when.

### 3. Establish the Actual UAS Contract

- [ ] T007 [Plan:3] Agent reviews [request implementation](src/app/lib/uasApi/index.ts), [payload helpers](src/app/lib/uasApi/uasUtility.ts), [activity retrieval](src/app/lib/uasApi/getRecentActivity.ts) and [account context](src/app/contexts/AccountContext/index.tsx). Trace identity, sign-in/platform gates, refresh, pagination, caching and service isolation. Treat existing saved/followed activity as separate from inferred interests.
- [ ] T008 [Plan:3] Developer obtains current UAS documentation and owner confirmation. Build a capability table: article views, associated topics, repeat counts, timestamps, scroll/dwell metadata, anonymous identity, import/batch writes, query/filter/sort, pagination, deletion and retention. Record supported action/resource types, payload limits, rate limits, overwrite versus append semantics and deduplication guarantees.
- [ ] T009 [Plan:3] With approved access, agent probes documented endpoints in the test environment using synthetic resources; developer verifies browser cookies/CORS, expired sessions, signed-out requests and cross-device retrieval. Follow the test-environment instructions linked in the UAS guide. Never invent endpoints or treat mocks as proof of server capabilities.

**Exit:** owner-confirmed capability table plus request/response evidence. Unsupported capabilities stay explicit; no consumption API implementation before this gate.

### 4. Resolve Privacy and Identity Before New Capture

- [ ] T010 [Plan:4] Privacy/security and product owners confirm lawful basis/consent requirements for existing local data, new reading history and upload on sign-in. Agree minimisation, sensitive-topic treatment, retention/expiry, user controls and deletion/withdrawal behaviour across device and UAS stores.
- [ ] T011 [Plan:4] Developer defines account-switch/sign-out handling, anonymous-to-account attribution and shared-device risks. Agent records proposed state transitions and failure cases; historical local activity must not silently become a newly signed-in user's history.

**Exit:** approved capture/upload rules. Investigation with synthetic data may continue, but new user-data collection or historical upload requires approval.

### 5. Compare Integration Options

- [ ] T012 [Plan:5] Agent compares **local only**, **direct UAS capture**, **periodic local synchronisation** and **hybrid capture with a bounded retry queue**. Score each against anonymous use, offline reliability, repeat engagement, retrieval, privacy, consistency and mobile bandwidth; cite Steps 2-4 rather than assume capabilities.
- [ ] T013 [Plan:5] Agent proposes a minimal versioned event/summary contract for owner review: stable article/topic IDs, service/variant, event ID, event time and only approved engagement fields. Define visit/session semantics, refresh behaviour, clock skew and schema migration. Use stable IDs rather than topic names as identity.
- [ ] T014 [Plan:5] Developer and UAS owner decide deduplication/upsert semantics, bounded retries/backoff, queue limits/expiry, acknowledgement-before-removal and multi-tab coordination. Test the server-accepted/client-timeout case; client-only bookkeeping cannot guarantee exactly-once delivery.
- [ ] T015 [Plan:5] Decide whether legacy aggregates can be imported as clearly labelled interest summaries through an approved contract. Do not send raw local-storage JSON, fabricate historical events or translate inferred interests into `follows`/`favourites`. If unsupported, retain local-only candidates or start fresh capture.

**Exit:** one conditional recommendation, rejected alternatives and a retrieval flow showing UAS/local ownership, service filtering, cache refresh and loading/offline/error states without exposing personal history in shared SSR caches.

### 6. Validate a Narrow Proof of Concept

- [ ] T016 [Plan:6] After privacy review, agent prototypes a local-only My News section using synthetic or existing browser topic counts. Show most-visited eligible topics first, exclude already-followed topics, and reuse the existing FollowTopicButton. Keep it separate from the followed-topic list; do not add production tracking or UAS writes in this prototype.
- [ ] T017 [Plan:6] Agent tests count-based ordering, followed-topic exclusion, empty/corrupt storage and service isolation. Developer checks the guest Follow-to-registration flow and identifies eligible non-personalized page placements. Product/analytics owners define a control and measure registration completion, follow completion and page-exit/performance guardrails; treat uplift as unproven until measured. Validate UAS separately with synthetic data only if its contract is approved.
- [ ] T018 [Plan:6] If scroll signals are supported and justified, evaluate maximum **article-content** depth and visible dwell time without sending every scroll event. Check short articles, dynamic media/layout changes, restored scroll positions, background tabs and RTL/mobile layouts. Report these as engagement proxies, never evidence that an article was read.

**Exit:** recorded commands, synthetic payloads/read-back, pass/fail cases and unresolved risks. If UAS access is blocked, complete local/mock checks and list the exact owner/access dependency; do not claim end-to-end validation.

### 7. Publish Findings and Development Tickets

- [ ] T019 [Plan:7] Agent completes the short findings document and drafts tickets below; developer/product/UAS/privacy owners review claims and approve the recommendation. Record ownership and unresolved dependencies so the next agent can resume without repeating the audit.

**Exit:** all four ticket acceptance scenarios have evidence or an explicit blocker with an owner and next action.

## Provisional Direction

Test this hypothesis: local data can support same-browser My News suggestions, ranked by count as an imperfect first signal, while approved UAS consumption storage could support signed-in, cross-device interests. Keep the suggestions separate from followed topics and exclude already-followed topics. Prefer direct capture with a small retry queue only if the server contract and privacy gates support it. Keep anonymous data local unless an approved anonymous UAS identity exists. Follow Topics remains an explicit user action; never auto-follow from reading behaviour. See the [My News findings](docs/reading-behaviour-spike-findings.md#my-news-feasibility).

## Follow-Up Ticket Candidates

Create only those justified by the findings, in dependency order:

| Ticket                                  | Dependency                           | Acceptance Focus                                                                            |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| Consent, identity and retention rules   | Owner decisions                      | Approved state transitions, expiry and deletion rules                                       |
| Safe local engagement storage/reader    | Storage audit + privacy              | Versioned ID-based schema, bounded retention, corruption/quota handling and legacy strategy |
| UAS consumption contract/provisioning   | UAS owner agreement                  | Supported write/read/delete contract, test access and duplicate semantics                   |
| Article engagement capture              | Approved event definition + storage  | Correct page/service/platform gates; repeats and timestamps tested                          |
| Upload/retry and account transitions    | Capture + UAS + privacy              | No duplicate inflation or cross-account attribution; offline recovery tested                |
| Interest retrieval and topic candidates | Reliable data + taxonomy review      | Service filtering, ranking/recency policy, empty/error states; no implicit follows          |
| Optional scroll/dwell pilot             | Demonstrated need + API support      | Bounded telemetry, measured mobile cost and documented signal limitations                   |
| Topic discovery/sign-up experiment      | Product placement + measurement plan | Control, completed registrations/follows and page-exit/performance guardrails               |

Each ticket needs an owner, exact code anchors, acceptance checks, toggle/rollout plan and deletion/retention implications. Do not bundle the recommendation UI into the capture spike.

## Acceptance Mapping and Agent Handoff

| Ticket Scenario       | Plan Steps | Required Evidence                                                 |
| --------------------- | ---------- | ----------------------------------------------------------------- |
| 1. Local capabilities | 2          | Schemas, caller/reader map and repeat/retrieval checks            |
| 2. UAS capabilities   | 3, 6       | Owner-confirmed capability table and test API evidence            |
| 3. Synchronisation    | 4-6        | Identity/import decision and duplicate/failure checks             |
| 4. Recommendation     | 5, 7       | Trade-off decision, privacy constraints, dependencies and tickets |

Agents can inspect code, execute existing tests, draft contracts/options and implement approved synthetic experiments. Developers and service owners must validate live contracts/authentication, real browser behaviour, operational limits and production rollout; privacy/product owners approve collection, attribution and recommendation semantics.

Future agents: re-check the anchors on the current branch; read applicable repository/component/styling instructions before code edits. Do not alter production endpoints, consent policy, tracking, secrets or account data without explicit scope. Keep one evidence log in the findings document with date, branch/commit, commands/results, redacted samples and blockers. No personal browsing history, tokens or cookies in committed artifacts.
