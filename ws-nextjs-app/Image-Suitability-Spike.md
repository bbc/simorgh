# Next.js Image Suitability Investigation

## What is Next.js Image?

Next.js Image is the framework-provided image component imported from
`next/image`. It is a React component that extends the standard HTML
`<img>` element with framework-managed image rendering features, including
responsive `srcSet` generation, `sizes` support, intrinsic dimension handling,
lazy loading and preload controls.

In this investigation, Next.js Image is not an image-hosting or image
transformation service. The BBC's iChef service remains responsible for
generating and delivering the image bytes. Next.js Image selects and renders
the appropriate iChef URL, while a BBC-owned adapter preserves Simorgh-specific
behaviour such as placeholders, AMP output, Lite omission, attribution and
source validation.

**Jira:** [WS-3220](https://bbc.atlassian.net/browse/WS-3220)

**Status:** PoC implemented. Full Next.js adoption recommended; production approval pending.

**Production impact:** None. No production migration is authorised by this PoC.

## Code Changes Referenced by This Investigation

The findings are based on an isolated implementation in this repository. The
following files contain the PoC code, tests and documentation changes:

| File                                                                             | Change                                                                                                                                                                            |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`pages/ws/ImagePocAdapter.tsx`](./pages/ws/ImagePocAdapter.tsx)                 | Adds the independent BBC adapter around `next/image`, including canonical, AMP and Lite branches, placeholders, loading state, captions, refs, aspect ratios and format handling. |
| [`utilities/imagePoc.ts`](./utilities/imagePoc.ts)                               | Adds the validated iChef loader, candidate width ladder, responsive `sizes`, WebP/JPEG source generation and source-set helpers.                                                  |
| [`pages/ws/ImagePocComparison.tsx`](./pages/ws/ImagePocComparison.tsx)           | Adds the isolated comparison UI for rendering the existing Simorgh primitive beside the Next.js adapter across representative scenarios.                                          |
| [`pages/ws/ImagePocAdapter.test.tsx`](./pages/ws/ImagePocAdapter.test.tsx)       | Tests the adapter output and guards against accidental delegation to the legacy Simorgh Image component.                                                                          |
| [`pages/ws/ImagePocComparison.test.tsx`](./pages/ws/ImagePocComparison.test.tsx) | Tests scenario selection, renderer output, RTL direction, loading, formats, dimensions, placeholders, AMP and Lite behaviour.                                                     |
| [`utilities/imagePoc.test.ts`](./utilities/imagePoc.test.ts)                     | Tests iChef URL validation, width validation, format conversion and source-set generation.                                                                                        |
| [`pages/[service]/image-poc.page.tsx`](./pages/[service]/image-poc.page.tsx)     | Exposes the isolated PoC route without changing production image consumers.                                                                                                       |
| [`pages/ws/ImagePocAdapter.module.scss`](./pages/ws/ImagePocAdapter.module.scss) | Provides the adapter presentation styles, aspect-ratio reservation, placeholder states and caption handling.                                                                      |
| [`Image-Suitability-Spike.md`](./Image-Suitability-Spike.md)                     | Documents the compatibility findings, trade-offs, migration conditions and recommendation.                                                                                        |

## Executive Summary

This investigation assesses whether Next.js Image can replace Simorgh's existing
Image primitive while preserving BBC-specific behaviour.

**Recommendation:** proceed with full replacement through a BBC-owned image
adapter built around Next.js Image.

Next.js Image will handle standard canonical images. The adapter will retain the
required BBC output contracts for:

- iChef URL generation and source validation
- Responsive `srcSet` and `sizes`
- WebP/JPEG selection
- Placeholders and missing-source states
- AMP `amp-img` rendering
- Lite image omission
- Attribution, captions and aspect ratios

These are adapter responsibilities, not reasons to retain the legacy Simorgh
Image component indefinitely.

## Component Overview

### Next.js Image

Next.js Image provides responsive candidates, reserved dimensions and loading
controls:

```tsx
import Image from 'next/image';

<Image
  src={imageTemplate}
  width={1200}
  height={675}
  sizes="(max-width: 600px) 100vw, 600px"
  alt="Autumn trees surrounding a lake"
  loading="lazy"
/>;
```

The `width`, `height` and `sizes` values allow the browser to select an
appropriate candidate and reserve layout space.

### BBC iChef Loader

The PoC keeps image transformation and delivery on iChef:

```tsx
const ichefLoader = ({ src, width }: ImageLoaderProps) => {
  validateIchefTemplate(src);
  return src.replace('{width}', String(width));
};
```

Example source template:

```text
https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/example.jpg
```

The loader generates the requested URL. It does not optimise image bytes or
reduce iChef delivery costs.

### BBC Image Adapter

The target API hides framework and BBC-specific details from consumers:

```tsx
<BbcImage
  src={imageTemplate}
  width={624}
  height={351}
  sizes="(max-width: 775px) calc(100vw - 34px), 587px"
  alt="Autumn trees surrounding a lake"
  lazyLoad
  attribution="BBC News"
/>
```

The adapter selects the correct output:

```tsx
if (isLite) return null;

if (isAmp) {
  return <amp-img {...ampProps} />;
}

return (
  <picture>
    <source type="image/webp" srcSet={webpSrcSet} />
    <NextImage {...nextImageProps} />
  </picture>
);
```

## Proof of Concept

The isolated comparison page renders the existing Simorgh primitive and the
independent Next.js adapter with matched assets and layout settings.

**Local route:** `http://localhost:7081/mundo/image-poc`

```text
BFF metadata
    |
    v
BBC image adapter
    |-- Canonical pages -> Next.js Image -> iChef
    |-- AMP pages       -> amp-img -> iChef
    |-- Lite pages      -> no image output
    |-- All paths       -> BBC placeholders and attribution
```

The PoC covers eager, lazy, preload, portrait, custom-ratio, JPEG-only, fluid,
missing-source, placeholder, caption, ref, AMP and Lite cases.

## Compatibility Caveats

Full adoption requires the adapter to preserve the following behaviours:

| Area              | Required treatment                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| iChef templates   | Validate HTTPS iChef hosts, permitted paths and positive width values                                     |
| Responsive images | Define shared candidate widths and layout-specific `sizes`                                                |
| Cropping          | Pass dimensions and crop intent so portrait images are not unnecessarily magnified                        |
| WebP/JPEG         | Use explicit `<picture>` fallback; a failed WebP request is not automatically retried as JPEG             |
| Loading           | Support lazy, eager, preload and high fetch priority without duplicate requests                           |
| Placeholders      | Reproduce light, dark, loading and missing-source BBC states                                              |
| Aspect ratios     | Preserve dimensions, custom ratios and fluid/fill layouts                                                 |
| Captions          | Preserve attribution, children, styles and overflow behaviour                                             |
| AMP               | Render valid `amp-img` output and validate complete AMP documents                                         |
| Lite              | Return no image or preload markup and verify zero image requests                                          |
| BFF boundary      | Keep image templates and editorial metadata in the BFF; keep Next.js candidate generation in the frontend |
| Browser support   | Validate Chromium, Safari, Firefox, Edge and RTL services                                                 |

The test adapter demonstrates these behaviours for representative cases. It
does not yet prove that every production consumer has migrated successfully.

## Performance and Cost

The PoC demonstrates rendering behaviour but is not a production benchmark.

Measure the old and new implementations independently using equivalent fixtures:

- LCP and p75 LCP
- CLS
- Selected image candidate and transferred bytes
- Request count and preload reuse
- Client JavaScript and hydration cost
- Server render time
- Process memory, heap and restart behaviour
- Mobile, desktop, high-DPI and cold/warm-cache scenarios

Next.js does not automatically reduce delivery cost because iChef remains
responsible for image transformation and delivery. The primary expected benefit
is reduced bespoke image-rendering maintenance.

Any cost or memory saving must be measured. Synthetic financial models must not
be treated as production results.

## Adoption Plan

1. **Agree the adapter contract**
   - Supported props and consumers
   - Candidate widths and `sizes`
   - Format and preload policy
   - Placeholder and attribution behaviour
   - AMP and Lite output contracts

2. **Complete the adapter**
   - Migrate representative canonical, portrait, caption and promo consumers
   - Validate browser and RTL behaviour
   - Validate real AMP documents
   - Confirm no legacy Image imports remain after migration

3. **Run production-mode benchmarks**
   - Compare rendering, network, memory and reliability metrics
   - Apply agreed regression budgets
   - Record measured results separately from PoC observations

4. **Roll out safely**
   - Use a feature flag
   - Monitor errors, image requests, LCP and memory
   - Maintain rollback to the existing renderer during the migration window

5. **Retire the legacy primitive**
   - Remove it only after all consumers migrate
   - Confirm AMP, Lite, placeholders and captions are adapter-owned
   - Remove obsolete preparation utilities and configuration

## Acceptance Criteria

| Criterion                                       | Status                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| PoC or technical findings documented            | **Met** - independent Next.js adapter and comparison implemented        |
| Compatibility gaps and configuration identified | **Met** - adapter contract and caveats documented                       |
| Performance and rendering trade-offs recorded   | **Met qualitatively** - production benchmarks pending                   |
| Recommendation agreed                           | **Full Next.js adoption through a BBC adapter proposed**                |
| No production migration without agreement       | **Preserved** - approval, parity and performance gates remain mandatory |

## Decision

Proceed toward **full Next.js adoption through a BBC image adapter**.

The migration should be incremental, but the intended end state is one BBC image
API with Next.js handling canonical images and the adapter owning the required
AMP, Lite, placeholder, attribution and source-policy behaviour.

Production migration should begin only after the adapter meets the compatibility
contract, agreed performance budgets and explicit team approval.
