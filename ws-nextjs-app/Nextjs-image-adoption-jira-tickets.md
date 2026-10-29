# Proposed Jira Tickets - Full Next.js Image Adoption

These tickets translate the investigation recommendation into incremental work
for the development team. Production migration must remain gated by adapter
parity, performance validation and explicit approval.

## Epic

**Summary:** Replace the legacy Simorgh Image primitive with a BBC-owned
adapter using Next.js Image while preserving canonical, AMP, Lite, placeholder,
attribution and source-policy behaviour.

## Tickets

### 1. Finalise BBC Image Adapter Contract

**Type:** Story  
**Priority:** High

Define and approve the adapter API, including supported props, canonical/AMP/Lite
contracts, loading and preload behaviour, placeholders, captions, attribution,
aspect ratios, format fallback and invalid-source handling.

**Acceptance criteria**

- The adapter API and defaults are documented and approved.
- Existing Image behaviours are mapped to adapter props.
- Unsupported or intentionally changed behaviour is documented.
- Consumers can use the adapter without importing the legacy Image primitive.

### 2. Harden iChef Loader and Image Source Policy

**Type:** Story  
**Priority:** High

Productionise iChef URL validation, candidate widths, responsive `sizes`,
portrait/crop handling, WebP/JPEG fallback and remote image configuration.

**Acceptance criteria**

- Invalid protocols, hosts, paths, query strings and widths are rejected.
- Valid templates generate the expected iChef URLs.
- Candidate widths and `sizes` values are agreed and tested.
- WebP-capable browsers receive WebP with a valid JPEG fallback.

**Depends on:** Finalise BBC Image Adapter Contract.

### 3. Complete Canonical Page Adapter Implementation

**Type:** Story  
**Priority:** High

Implement the production adapter for canonical pages using Next.js Image,
including eager/lazy loading, preload, fetch priority, dimensions, fluid/fill
layouts, captions, attribution, refs, styles and duplicate-request prevention.

**Acceptance criteria**

- Representative canonical consumers render through the adapter.
- Existing supported behaviours remain available.
- CLS does not regress.
- Focused unit and integration tests pass.

**Depends on:** Tickets 1 and 2.

### 4. Implement Adapter-Owned Placeholder and Missing-Image States

**Type:** Story  
**Priority:** High

Move default, dark, disabled and missing-source placeholder behaviour into the
adapter, including state changes after load and source changes.

**Acceptance criteria**

- Placeholder states match approved BBC designs.
- Missing sources do not produce broken-image UI.
- Loading and source-change transitions work correctly.
- Visual regression coverage is included.

**Depends on:** Finalise BBC Image Adapter Contract.

### 5. Implement AMP and Lite Rendering Paths

**Type:** Story  
**Priority:** High

Preserve AMP and Lite behaviour through adapter-owned output rather than native
Next.js Image output.

**Acceptance criteria**

- AMP output passes validation for responsive and fill layouts.
- Lite pages emit no image or preload markup.
- Lite pages make zero image requests.
- Representative AMP and Lite tests pass.

**Depends on:** Tickets 1 and 2.

### 6. Inventory and Migrate Production Image Consumers

**Type:** Story  
**Priority:** High

Inventory all legacy Image consumers, categorise their behaviour and migrate
them incrementally to the BBC adapter.

**Acceptance criteria**

- Every legacy import is identified and assigned a migration status.
- Representative high-traffic consumers are migrated.
- Required behaviour is preserved for each migrated consumer.
- Remaining exceptions have an owner and approved migration plan.

**Depends on:** Tickets 3, 4 and 5.

### 7. Add Feature Flag and Rollback Support

**Type:** Story  
**Priority:** High

Provide controlled rollout, observability and safe rollback to the existing
renderer.

**Acceptance criteria**

- The adapter can be enabled and disabled through the agreed rollout control.
- Rollback restores the existing renderer safely.
- Flag state and rendering failures are observable.
- Ownership and escalation procedures are documented.

**Depends on:** Tickets 3 and 5.

### 8. Benchmark Next.js Image Against the Existing Renderer

**Type:** Task  
**Priority:** High

Compare both implementations in production mode using equivalent fixtures.

**Metrics**

- LCP and p75 LCP
- CLS
- Selected candidate and transferred bytes
- Request count and preload reuse
- Client JavaScript and hydration cost
- Server render time
- Process memory and heap usage
- Mobile, desktop, high-DPI and cold-cache performance

**Acceptance criteria**

- Fixtures and methodology are documented.
- Results are comparable and reviewed.
- Regression budgets are agreed.
- Regressions have remediation tickets before approval.

**Depends on:** Tickets 2 and 3.

### 9. Run Browser, RTL and Accessibility Validation

**Type:** Task  
**Priority:** Medium

Validate supported browsers, viewport sizes, RTL services, loading states,
missing images, alt text, captions and attribution.

**Acceptance criteria**

- The supported browser matrix is tested.
- RTL layout and image positioning are correct.
- No accessibility regressions remain unresolved.
- Visual differences are fixed or documented.

**Depends on:** Complete Canonical Page Adapter Implementation.

### 10. Remove the Legacy Simorgh Image Primitive

**Type:** Story  
**Priority:** Medium

Retire the legacy primitive and obsolete utilities only after migration,
benchmarking, validation and production approval are complete.

**Acceptance criteria**

- No approved production consumer imports the legacy primitive.
- AMP, Lite, placeholders, attribution and captions are adapter-owned.
- Obsolete utilities, configuration, tests and snapshots are removed.
- Full regression, performance and accessibility suites pass.
- Team approval is recorded before deletion.

**Depends on:** Tickets 6, 7, 8 and 9.

## Suggested Sprint Sequence

### Sprint 1 - Contract and foundations

- Finalise the adapter contract.
- Harden the iChef loader and source policy.
- Implement placeholder and missing-image states.

### Sprint 2 - Rendering paths

- Complete the canonical adapter.
- Implement AMP and Lite paths.
- Add focused unit and integration coverage.

### Sprint 3 - Controlled migration

- Add feature flag and rollback support.
- Inventory and migrate representative consumers.
- Run browser, RTL and accessibility validation.

### Sprint 4 - Approval and retirement

- Benchmark the new adapter against the existing renderer.
- Review compatibility and performance results.
- Obtain production migration approval.
- Remove the legacy primitive only after approval.

## Compact Decision Text

## Decision

- Proceed toward full Next.js adoption through a BBC-owned image adapter.
- Use Next.js Image for canonical pages; keep AMP, Lite, placeholders,
  attribution and source policy adapter-owned.
- Migrate incrementally behind a feature flag with rollback support.
- Require compatibility, browser/accessibility and production performance
  validation before migration approval.
- Retire the legacy Simorgh Image primitive only after all consumers migrate and
  the agreed performance budgets are met.
