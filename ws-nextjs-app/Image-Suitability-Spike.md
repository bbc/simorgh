# Spike: investigate Next.js Image suitability

## Objective

Assess whether Next.js `Image` can replace or support Simorgh's current primitive
`Image` implementation without losing existing required behaviour.

**Recommendation: revisit later.** Retain Simorgh pending compatibility and
performance evidence. Selective canonical-page support is technically feasible,
but a full replacement is not justified by this PoC.

This position was agreed with the spike requester. Wider engineering, product and
platform agreement remains pending. **No production migration is authorised.**

## Acceptance criteria and evidence

| Acceptance criterion                                                      | Status                                | Evidence and remaining work                                                                                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A small proof of concept is created or technical findings are documented. | Met                                   | An isolated route compares real Simorgh Image with a Next.js candidate. This report records the findings.                                                         |
| Compatibility gaps and required configuration are identified.             | Met for spike scope                   | The matrix below identifies fallback, placeholder, AMP/Lite, preload, width and source-validation requirements. It does not claim complete browser compatibility. |
| Performance and rendering trade-offs are recorded.                        | Met for qualitative findings          | Candidate selection, cropping, caching, preloading and BFF implications are documented. Controlled production measurements remain outstanding.                    |
| A recommendation is agreed: adopt, do not adopt, or revisit later.        | Requester agreed; team review pending | Revisit later. Confirm the decision with engineering, product and platform before closing this criterion as team-agreed.                                          |
| No production migration starts without agreement on the recommendation.   | Preserved                             | The PoC does not change the production primitive, existing consumers or global image configuration. A future pilot requires explicit approval.                    |

## Proof of concept

- Route: `http://localhost:7081/mundo/image-poc`.
- [Page entry point](./pages/%5Bservice%5D/image-poc.page.tsx).
- [Visual comparison and candidate adapter](./pages/ws/ImagePocComparison.tsx).
- [iChef loader and source preparation](./utilities/imagePoc.ts).
- Baseline: the actual [Simorgh Image primitive](../src/app/components/Image/index.tsx),
  not a plain HTML reference image.
- Both examples share the source, display dimensions, responsive sizing and
  selected loading settings.
- Examples: eager, lazy, preload/high priority, portrait crop, missing source,
  AMP delegation and Lite delegation.
- "Inspect rendered images" exposes selected URLs, decoding state, dimensions,
  loading, fetch priority, sizes and candidate sets. This is a DOM snapshot,
  not a performance score.
- Missing sources, AMP and Lite deliberately use Simorgh in both cards.
  Successful output in these scenarios proves delegation, not native Next.js parity.

## Technical comparison

| Scope                        | Next.js candidate                                                                                             | Current Simorgh behaviour                                                                           | Gap or configuration required                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iChef `{width}` templates    | A component-level loader replaces the token with each requested width.                                        | Preparation utilities produce concrete URLs and source sets.                                        | Agree a stable template contract and supported iChef paths.                                                                                                      |
| Responsive `srcSet`          | Next.js generates candidates using its configured defaults.                                                   | The PoC supplies a ladder from 240 to 2560px.                                                       | The PoC ladder was extended for high-DPI/crop inspection; it is not a production width-policy change. Agree `deviceSizes`/`imageSizes` before adoption.          |
| `sizes`                      | Layout-specific sizing is passed to Next.js and the WebP source.                                              | The same sizing is passed to the primitive.                                                         | Portrait sizing accounts for magnification when a landscape source is cropped to 3:4. Revalidate other layouts and breakpoints.                                  |
| WebP/JPEG fallback           | `getImageProps` generates a WebP source before a Next.js JPEG image fallback.                                 | On homepages, WebP and JPEG sources precede the image. Other page types use the primary source set. | Explicit picture markup remains necessary with this custom loader; default optimiser format negotiation is not being used.                                       |
| AMP                          | Delegates to Simorgh.                                                                                         | Renders `amp-img`, including dimensions and attribution.                                            | The dropdown is a markup preview, not an AMP-valid page. Retain the AMP renderer and validate real AMP pages separately.                                         |
| Lite                         | Delegates to Simorgh.                                                                                         | Omits the image.                                                                                    | Keep the no-image behaviour.                                                                                                                                     |
| Lazy/eager loading           | Explicitly matched to the selected scenario.                                                                  | Existing lazy/eager props are used.                                                                 | Verify request deferral under scrolling and throttling; matching attributes alone is not a timing benchmark.                                                     |
| Preload/fetch priority       | Hero scenario uses a typed WebP preload and high-priority eager image.                                        | Existing Helmet preload and high fetch priority.                                                    | The candidate does not supply an equivalent JPEG preload. Check request duplication and actual preload reuse.                                                    |
| Placeholders/missing sources | Missing-source rendering delegates to Simorgh. Normal Next.js loading does not reproduce the BBC placeholder. | BBC placeholder, missing-source handling and reserved space.                                        | Next.js blur placeholders require blur data and are not BBC placeholder parity.                                                                                  |
| Aspect ratios/crops          | Dimensions plus CSS aspect-ratio and object-fit.                                                              | Primitive aspect-ratio and crop behaviour.                                                          | Landscape and 3:4 examples work locally; wider crop and legacy-browser coverage is pending.                                                                      |
| Attribution                  | Shared visible source caption around the canonical image.                                                     | Shared visible caption; primitive passes attribution to AMP.                                        | Keep accurate credits and test real caption/attribution consumers.                                                                                               |
| External sources             | Loader validates HTTPS, iChef host, credentials, query/hash, template path and positive integer widths.       | Existing source-preparation contract.                                                               | `remotePatterns` does not enforce this custom loader's URL policy. If the default optimiser is adopted later, configure its permitted remote sources separately. |

### Required configuration

No global Next.js image settings were changed. Adoption would require agreement on:

1. Permitted source hosts and template paths; the current PoC accepts the iChef
   `/ace/ws/{width}/` form only.
2. Width ladders and layout-specific sizing, including high-DPI and portrait crops.
3. Quality handling: the custom loader currently ignores Next.js `quality`;
   iChef controls encoding.
4. Format-aware source generation and preload rules.
5. Which canonical consumers are eligible and which Simorgh paths must remain.
6. Placeholder, missing-source, attribution and supported-browser requirements.

## Performance, rendering and BFF trade-offs

### Observed locally

- Both canonical cards rendered and decoded WebP.
- Making the WebP source ineligible caused both cards to select and decode JPEG.
  This was a format-selection simulation, not a JPEG-only browser certification.
- Eager/lazy attributes, hero fetch priority and the typed WebP preload were inspected.
- Portrait crops reserved matching dimensions; missing-source examples emitted no image.
- AMP preview emitted two `amp-img` elements; Lite emitted no image.
- With the current lake fixture, portrait sizing and a browser device pixel ratio
  of 1.25, both renderers selected a 1920px WebP for a roughly 569px-wide,
  758px-high portrait crop.

Earlier width observations used different fixtures and ladders and should not be
treated as current benchmark results. Candidate selection varies with viewport,
device pixel ratio, crop, cache and browser.

### Trade-offs

- **Delivery remains on iChef.** The custom loader bypasses the Next.js optimiser.
  There is no demonstrated transformation-cost or bandwidth saving.
- **More candidates are not automatically better.** Larger widths may improve
  high-DPI crops but increase bytes and cache variants.
- **Preload needs format awareness.** An incorrectly matched preload can download
  an unused candidate or format. The fallback-only case lacks JPEG preload parity.
- **Framework support does not remove BBC-specific code.** Picture fallbacks,
  placeholders and retained AMP/Lite paths can offset maintenance reductions.
- **Reserved dimensions help avoid layout movement**, but no controlled CLS or
  LCP comparison has been completed.
- **The BFF need not generate Next.js-specific output.** The frontend loader
  accepts a template without a BFF schema change. A stable template, dimension and
  attribution contract still needs agreement.
- **The shared comparison is not a benchmark.** The cards share cache and network
  conditions, and cross-origin resource timings may restrict byte/timing visibility.

### Measurements still required

Test each renderer separately in production mode using matching fixtures and
settings, repeated cold/warm-cache runs, mobile/desktop viewports and agreed
network conditions. Record:

- Selected candidate, format, transferred bytes, request counts and cache behaviour.
- Request start/completion and preload reuse or duplication.
- LCP, CLS, client JavaScript/hydration overhead and server rendering work.
- Missing-source, slow-load placeholder, attribution and crop behaviour.
- Supported browsers, high-DPI displays, RTL services and real AMP validation.

Agree regression budgets before deciding whether the candidate passes. Do not
invent performance percentages or treat visual parity as measured improvement.

## Potential benefits and cost case

Potential benefits are a standard framework API, generated responsive candidates,
shared loading controls and less bespoke canonical-image preparation. They remain
conditional: retaining multiple implementations could increase maintenance instead.

**Measured financial saving: not quantified.** The spike has no BBC traffic,
contract rates, engineering-cost baseline, migration estimate or support estimate.

### Illustrative planning assumptions only

The following values were displayed on the PoC page and are retained here for
traceability. They are **not BBC figures, measured results or a financial forecast**.
They must not be used to approve adoption.

| Assumption                                       | Low         | Base        | High      |
| ------------------------------------------------ | ----------- | ----------- | --------- |
| Monthly image requests                           | 250 million | 500 million | 1 billion |
| Average delivered image                          | 90 KB       | 120 KB      | 160 KB    |
| Engineering time avoided per year                | 0.1 FTE     | 0.25 FTE    | 0.5 FTE   |
| Illustrative maintenance capacity value per year | £15k        | £35k        | £70k      |
| Hypothetical bandwidth reduction                 | 0%          | 0%          | 10%       |

All monetary amounts are UK pounds sterling (GBP). The 10% reduction is an
unvalidated sensitivity assumption, **not a saving demonstrated by this PoC**.
Maintenance capacity is not necessarily a cash saving.

Previously displayed "net annual benefit" ranges of £0-15k, £10-40k and £30-90k
were not derived from specified delivery rates, migration costs or support costs.
They are recorded as unsupported illustrative ranges, not adopted as findings.

A defensible model needs actual traffic and bytes, delivery/cache rates, any
additional hosting/optimisation cost, maintenance hours, migration/testing effort
and ongoing support costs. Report separately:

- Annual recurring cash benefit = avoided cash delivery/operating costs minus
  additional recurring cash costs.
- First-year cash benefit = annual recurring cash benefit minus one-off migration costs.
- Engineering capacity released = avoided maintenance hours, valued using an agreed
  rate but not counted again as cash savings unless it changes actual expenditure.
- Payback period only where a positive recurring cash benefit is established.

## Recommendation and decision gate

**Revisit later: retain the current Simorgh primitive.**

It remains the best fit for the existing required behaviour, not a proven
performance winner. The PoC demonstrates that Next.js can support canonical
images through an adapter; it does not establish full replacement suitability,
better production performance or financial savings.

The scenario recommendation on the page explains the requirement-based rationale
for each example. It is qualitative guidance, not a live benchmark ranking.

Requester agreement has been obtained. Wider team sign-off remains open.
**No production migration, pilot or removal of shared utilities should begin
without explicit agreement and the relevant go/no-go checks below.**

## Follow-up plan if investigation is approved

| Step                                | Deliverable                                                                                                                                  | Exit gate                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1. Prove compatibility              | Agree the delivery contract and test real consumers, formats, crops, placeholders, attribution, RTL and supported browsers. Retain AMP/Lite. | Compatibility matrix with gaps accepted or resolved.                    |
| 2. Measure delivery and performance | Agree configuration and budgets; run isolated production-mode comparisons, including BFF and server/client overhead.                         | Repeatable evidence meets agreed budgets.                               |
| 3. Build the cost case              | Use actual rates and traffic; estimate migration, testing, maintenance and support. Separate capacity from cash.                             | Reviewed assumptions and defensible costs/benefits.                     |
| 4. Agree the recommendation         | Engineering, product and platform choose selective adoption, do not adopt, or revisit later.                                                 | Recorded decision and approved scope.                                   |
| 5. Run a controlled pilot           | If approved, use one canonical page type behind a flag with baseline monitoring and tested rollback.                                         | Pilot meets agreed compatibility, performance and operating thresholds. |
| 6. Consolidate and verify value     | Expand approved consumers incrementally; remove unused code only after checking dependencies. Retain required AMP/Lite paths.                | Verified outcomes, ownership and monitoring.                            |

## Validation evidence

The latest focused run before this documentation move passed **31 tests** across:

- [Loader/source preparation tests](./utilities/imagePoc.test.ts).
- [Rendering contract and interaction tests](./pages/ws/ImagePocComparison.test.tsx).

Next.js TypeScript, ESLint and formatting checks passed for the preceding image
changes. These checks establish code/rendering contracts, not production
performance, full browser coverage or financial benefit.
