import { use, useMemo, useRef, useState } from 'react';
import Image from '#app/components/Image';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  createImageSources,
  POC_IMAGE_SIZES,
  POC_IMAGE_TEMPLATE,
  POC_PORTRAIT_SIZES,
} from '#nextjs/utilities/imagePoc';
import ImagePocAdapter from './ImagePocAdapter';

const sources = createImageSources(POC_IMAGE_TEMPLATE);
const scenarios = {
  eager: '01 - Eager image (most common)',
  missing: '02 - Missing source / BBC placeholder',
  ratio: '03 - Width/height aspect ratio',
  lazy: '04 - Lazy image',
  caption: '05 - Caption and child content',
  hero: '06 - Preload / high fetch priority',
  portrait: '07 - Portrait crop (3:4)',
  amp: '08 - AMP rendering (markup preview, not a valid AMP page)',
  lite: '09 - Lite rendering (no image)',
  noPlaceholder: '10 - Placeholder disabled',
  darkPlaceholder: '11 - Dark placeholder',
  jpeg: '12 - JPEG-only image',
  fluid: '13 - Fluid image without dimensions',
  ref: '14 - Native image ref',
};
type Scenario = keyof typeof scenarios;

const isScenario = (value: string): value is Scenario => value in scenarios;

export const ImagePocExample = ({
  renderer,
  scenario,
}: {
  renderer: 'current' | 'next';
  scenario: Scenario;
}) => {
  const requestContext = use(RequestContext);
  const isAmp = requestContext.isAmp || scenario === 'amp';
  const isLite = requestContext.isLite || scenario === 'lite';
  // Override only each example's context to preview AMP/Lite on a canonical page.
  // This exercises rendering branches, not full AMP document validity.
  const exampleContext = useMemo(
    () => ({ ...requestContext, isAmp, isLite }),
    [requestContext, isAmp, isLite],
  );
  const portrait = scenario === 'portrait';
  const hero = scenario === 'hero';
  const missing = scenario === 'missing';
  const fluid = scenario === 'fluid';
  const jpeg = scenario === 'jpeg';
  const customRatio = scenario === 'ratio';
  const caption = scenario === 'caption';
  const imageRef = useRef<HTMLImageElement>(null);
  const height = (() => {
    if (fluid) return undefined;
    return portrait ? 832 : 351;
  })();
  const width = fluid ? undefined : 624;
  const sizes = portrait ? POC_PORTRAIT_SIZES : POC_IMAGE_SIZES;
  const aspectRatio: [number, number] = (() => {
    if (portrait) return [3, 4];
    if (customRatio) return [4, 3];
    return [16, 9];
  })();
  const currentSrc = (() => {
    if (missing) return undefined;
    if (jpeg) return sources.fallbackSrcSet.split(', ')[1].split(' ')[0];
    return sources.src;
  })();
  const currentSrcSet = (() => {
    if (missing) return undefined;
    return jpeg ? sources.fallbackSrcSet : sources.primarySrcSet;
  })();
  const alt = 'Autumn trees surrounding a lake at Watergate Forest Park';

  // Only the reference card uses the legacy primitive. Both cards receive matched
  // layout/loading inputs, but each renderer controls its own candidate generation.
  if (renderer === 'current') {
    return (
      <RequestContext.Provider value={exampleContext}>
        <Image
          alt={alt}
          src={currentSrc}
          srcSet={currentSrcSet}
          sizes={sizes}
          fallbackSrcSet={jpeg || missing ? undefined : sources.fallbackSrcSet}
          mediaType={jpeg ? 'image/jpeg' : 'image/webp'}
          fallbackMediaType={jpeg ? undefined : 'image/jpeg'}
          width={width}
          height={height}
          aspectRatio={fluid ? undefined : aspectRatio}
          lazyLoad={scenario === 'lazy'}
          preload={hero && !missing}
          fetchPriority={hero ? 'high' : undefined}
          attribution="BBC News"
          placeholder={!['noPlaceholder', 'darkPlaceholder'].includes(scenario)}
          darkPlaceholder={scenario === 'darkPlaceholder'}
          hasCaption={caption}
          className={scenario === 'caption' ? 'image-poc-caption' : undefined}
          style={scenario === 'caption' ? { borderRadius: 8 } : undefined}
          imageRef={scenario === 'ref' ? imageRef : undefined}
        >
          {caption && (
            <span data-testid="image-child">Image child content</span>
          )}
        </Image>
      </RequestContext.Provider>
    );
  }

  return (
    <RequestContext.Provider value={exampleContext}>
      <ImagePocAdapter
        alt={alt}
        src={missing ? undefined : POC_IMAGE_TEMPLATE}
        width={width}
        height={height}
        sizes={sizes}
        aspectRatio={fluid ? undefined : aspectRatio}
        lazyLoad={scenario === 'lazy'}
        preload={hero}
        fetchPriority={hero ? 'high' : undefined}
        attribution="BBC News"
        format={jpeg ? 'jpeg' : 'webp'}
        placeholder={!['noPlaceholder', 'darkPlaceholder'].includes(scenario)}
        darkPlaceholder={scenario === 'darkPlaceholder'}
        hasCaption={caption}
        className={scenario === 'caption' ? 'image-poc-caption' : undefined}
        style={scenario === 'caption' ? { borderRadius: 8 } : undefined}
        imageRef={scenario === 'ref' ? imageRef : undefined}
      >
        {caption && <span data-testid="image-child">Image child content</span>}
      </ImagePocAdapter>
    </RequestContext.Provider>
  );
};

// Inspect what the browser actually selected, rather than inferring it from src.
// Shared-page caching means this readout is not an isolated performance benchmark.
const readImage = (container: HTMLDivElement | null) => {
  if (!container)
    throw new Error('Image PoC comparison container is not mounted');
  const image = container.querySelector('img');
  if (!image) return 'No canonical <img>: placeholder, AMP or Lite path.';
  const sourceSets = [
    ...Array.from(container.querySelectorAll('source')).map(
      source => `${source.type}: ${source.srcset}`,
    ),
    `img: ${image.srcset || '(no srcset)'}`,
  ];
  return [
    `Selected URL: ${image.currentSrc || '(not selected yet)'}`,
    `Decoded: ${image.complete && image.naturalWidth > 0 ? 'yes' : 'not yet / failed'}`,
    `Rendered: ${Math.round(image.getBoundingClientRect().width)} × ${Math.round(image.getBoundingClientRect().height)} CSS px`,
    `Intrinsic: ${image.naturalWidth} × ${image.naturalHeight}`,
    `Loading: ${image.loading}; fetch priority: ${image.fetchPriority || 'auto'}`,
    `Sizes: ${container.querySelector('source')?.sizes || image.sizes}`,
    ...sourceSets,
  ].join('\n');
};

const rendererAssessments = [
  {
    title: 'Next.js Image',
    difference:
      'Next.js generates responsive candidates through a custom iChef loader. The adapter still owns format fallback and BBC-specific behaviour.',
    pros: [
      {
        keyword: 'Standard API',
        text: 'with framework-maintained image functionality.',
      },
      {
        keyword: 'Responsive candidates',
        text: 'and loading and priority controls.',
      },
      {
        keyword: 'Less bespoke preparation',
        text: 'if adoption simplifies the canonical-image implementation.',
      },
    ],
    cons: [
      {
        keyword: 'Not drop-in',
        text: 'for BBC placeholders, missing sources, AMP or Lite.',
      },
      {
        keyword: 'Custom integration',
        text: 'is required for the loader, WebP/JPEG markup and preload.',
      },
      {
        keyword: 'BBC adapter maintenance',
        text: 'remains necessary for placeholders, AMP markup and Lite omission.',
      },
      {
        keyword: 'No proven saving',
        text: 'or performance advantage has been demonstrated in this spike.',
      },
    ],
  },
  {
    title: 'Current Simorgh Image',
    difference:
      'Existing preparation utilities control responsive candidates. The primitive already handles BBC-specific rendering and separate AMP/Lite paths.',
    pros: [
      {
        keyword: 'Existing coverage',
        text: 'for canonical, AMP and Lite rendering behaviour.',
      },
      {
        keyword: 'BBC-specific behaviour',
        text: 'including placeholders, missing sources, aspect ratios and attribution.',
      },
      {
        keyword: 'Lower migration risk',
        text: 'by avoiding a replacement project today.',
      },
    ],
    cons: [
      {
        keyword: 'BBC maintenance',
        text: 'remains responsible for the component and preparation utilities.',
      },
      {
        keyword: 'Broad validation',
        text: 'is required across consumers and rendering modes for changes.',
      },
      {
        keyword: 'No automatic Next.js updates',
        text: 'are inherited by the current primitive.',
      },
    ],
  },
];

const getRecommendation = (scenario: Scenario) => {
  const recommendations: Record<
    Scenario,
    { reason: string; nextStep: string }
  > = {
    eager: {
      reason:
        'The candidate renders a real Next.js Image with responsive iChef candidates and explicit eager loading.',
      nextStep:
        'Benchmark both implementations before considering a canonical-page pilot.',
    },
    lazy: {
      reason:
        'The candidate uses Next.js lazy loading without calling the legacy primitive.',
      nextStep:
        'Compare deferred request timing, selected candidates and bytes under a controlled viewport test.',
    },
    hero: {
      reason:
        'The candidate supplies a format-aware WebP preload and a high-priority Next.js image. JPEG preload parity remains outstanding.',
      nextStep:
        'Verify that either implementation preloads exactly one candidate without duplicate downloads.',
    },
    jpeg: {
      reason:
        'The adapter can render a JPEG-only source without adding a WebP source.',
      nextStep:
        'Confirm JPEG-only consumers retain their existing candidate and cache behaviour.',
    },
    portrait: {
      reason:
        'The adapter supplies crop-aware sizes and a reserved aspect ratio to the Next.js image.',
      nextStep:
        'Test portrait crops across page types, breakpoints and RTL layouts before considering adoption.',
    },
    ratio: {
      reason:
        'The adapter accepts an explicit custom aspect ratio independently of source dimensions.',
      nextStep:
        'Compare crop positioning and reserved space across representative consumers.',
    },
    fluid: {
      reason:
        'The adapter supports Next.js fill-style rendering when dimensions are unavailable.',
      nextStep:
        'Validate fluid images and AMP fill output in every consumer that omits dimensions.',
    },
    ref: {
      reason:
        'The adapter forwards a ref to the native Next.js image element for imperative consumers.',
      nextStep:
        'Confirm ref usage is limited to supported browser-side interactions before migration.',
    },
    missing: {
      reason:
        'The candidate owns the BBC placeholder and missing-source layout without importing the legacy primitive.',
      nextStep:
        'Verify placeholder appearance across services and slow-loading images before production adoption.',
    },
    noPlaceholder: {
      reason:
        'The adapter can disable the BBC loading placeholder while retaining the image.',
      nextStep:
        'Confirm consumers that opt out do not depend on placeholder layout or colour.',
    },
    darkPlaceholder: {
      reason: 'The adapter preserves the dark BBC placeholder variant.',
      nextStep: 'Check dark placeholder contrast against every service theme.',
    },
    caption: {
      reason:
        'The adapter preserves children, consumer styles and caption overflow behaviour.',
      nextStep:
        'Migrate caption consumers only after ref and child-content contracts are agreed.',
    },
    amp: {
      reason:
        'The candidate owns dedicated amp-img markup and attribution. This is adapter output, not native Next.js Image rendering.',
      nextStep:
        'Validate a real AMP page; a canonical markup preview does not prove AMP validity.',
    },
    lite: {
      reason:
        'The candidate returns null before producing image or preload markup, independently of Simorgh.',
      nextStep:
        'Confirm that Lite pages produce no image requests in the production build.',
    },
  };

  return recommendations[scenario];
};

const getMainDifferences = (scenario: Scenario) => {
  const differences: Record<
    Scenario,
    { next: string; current: string; outcome: string }
  > = {
    eager: {
      next: 'Renders a real Next.js Image with a custom iChef loader.',
      current: 'Renders the existing Simorgh Image primitive and its prepared srcSet.',
      outcome: 'Both render the image successfully; no performance winner is proven.',
    },
    lazy: {
      next: 'Uses Next.js rendering with lazy loading enabled.',
      current: 'Uses the native loading="lazy" attribute on the existing image.',
      outcome: 'Both defer loading to the browser.',
    },
    hero: {
      next: 'Uses an adapter-owned preload matched to the Next.js candidates.',
      current: 'Uses the existing Simorgh preload implementation.',
      outcome: 'Both support a high-priority hero; duplicate requests must be checked.',
    },
    portrait: {
      next: 'Uses the adapter for crop-aware sizes and aspect-ratio styling.',
      current: 'Uses the existing Simorgh aspect-ratio and crop styles.',
      outcome: 'Both support portrait images; visual parity needs validation.',
    },
    ratio: {
      next: 'Applies the custom ratio through the adapter wrapper.',
      current: 'Applies the custom ratio through the existing image styles.',
      outcome: 'Both reserve the requested ratio.',
    },
    jpeg: {
      next: 'Renders a JPEG-only image without a WebP source.',
      current: 'Uses the existing JPEG source and fallback behaviour.',
      outcome: 'Both support JPEG-only output.',
    },
    fluid: {
      next: 'Uses Next.js fill-style rendering when dimensions are unavailable.',
      current: 'Uses the existing responsive-ratio behaviour.',
      outcome: 'Both support images without fixed dimensions.',
    },
    ref: {
      next: 'Forwards the ref to the Next.js image element.',
      current: 'Forwards the ref to the existing native image element.',
      outcome: 'Both preserve access for supported browser-side consumers.',
    },
    missing: {
      next: 'Owns the missing-source placeholder without rendering an image.',
      current: 'Uses the existing Simorgh missing-source behaviour.',
      outcome: 'Both avoid broken-image output.',
    },
    noPlaceholder: {
      next: 'Disables the loading placeholder in the adapter.',
      current: 'Disables the existing Simorgh loading placeholder.',
      outcome: 'Both render without a loading placeholder.',
    },
    darkPlaceholder: {
      next: 'Applies the dark placeholder through adapter styles.',
      current: 'Applies the dark placeholder through Simorgh styles.',
      outcome: 'Both support the dark placeholder state.',
    },
    caption: {
      next: 'Keeps captions and child content around the Next.js image.',
      current: 'Keeps captions and child content around the existing image.',
      outcome: 'Both preserve caption content and attribution.',
    },
    amp: {
      next: 'Uses a dedicated adapter-owned amp-img branch, not Next.js Image.',
      current: 'Uses the existing Simorgh amp-img branch.',
      outcome: 'Both require a separate AMP rendering path.',
    },
    lite: {
      next: 'Returns no image or preload markup.',
      current: 'The existing primitive also omits image output.',
      outcome: 'Both support Lite pages without image markup.',
    },
  };

  return differences[scenario];
};

const RendererAssessment = ({ scenario }: { scenario: Scenario }) => {
  const recommendation = getRecommendation(scenario);
  const differences = getMainDifferences(scenario);

  return (
    <section
      aria-labelledby="renderer-assessment-heading"
      style={{ marginTop: 24 }}
    >
      <h3 id="renderer-assessment-heading">Main differences</h3>
      <div
        style={{
          background: '#fff',
          border: '1px solid #d8d8d8',
          display: 'grid',
          gap: 12,
          lineHeight: 1.5,
          marginBottom: 24,
          padding: 20,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Next.js Image:</strong> {differences.next}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Current Simorgh Image:</strong> {differences.current}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Outcome:</strong> {differences.outcome}
        </p>
      </div>
      <h3>Pros and cons</h3>
      <div
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        }}
      >
        {rendererAssessments.map(assessment => (
          <article
            key={assessment.title}
            style={{
              background: '#fff',
              border: '1px solid #d8d8d8',
              padding: 20,
              minWidth: 0,
              lineHeight: 1.5,
            }}
          >
            <h4 style={{ fontSize: 20, margin: '0 0 12px' }}>
              {assessment.title}
            </h4>
            <p>{assessment.difference}</p>
            <h5 style={{ fontSize: 16, marginBottom: 8 }}>Pros</h5>
            <ul style={{ paddingInlineStart: 20 }}>
              {assessment.pros.map(pro => (
                <li key={pro.keyword}>
                  <strong>{pro.keyword}</strong> {pro.text}
                </li>
              ))}
            </ul>
            <h5 style={{ fontSize: 16, marginBottom: 8 }}>Cons</h5>
            <ul style={{ paddingInlineStart: 20 }}>
              {assessment.cons.map(con => (
                <li key={con.keyword}>
                  <strong>{con.keyword}</strong> {con.text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p>
        Both approaches still use iChef for image transformation and delivery.
        Next.js Image does not automatically reduce delivery costs in this
        setup. Eager means loading without waiting for viewport proximity; lazy
        defers loading until the image approaches the viewport. Preload and high
        fetch priority are separate controls for critical images, not proof of
        faster rendering.
      </p>
      <aside
        aria-labelledby="renderer-recommendation-heading"
        style={{
          background: '#fff',
          borderInlineStart: '4px solid #b80000',
          padding: 20,
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        <h3 id="renderer-recommendation-heading" style={{ marginTop: 0 }}>
          Adoption assessment: {scenarios[scenario]}
        </h3>
        <p>
          <strong>
            Target: Next.js-based BBC adapter, not a proven performance winner.
          </strong>{' '}
          {recommendation.reason}
        </p>
        <p>
          <strong>Next step:</strong> {recommendation.nextStep}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>
            Overall recommendation: full replacement through a Next.js-based
            adapter.
          </strong>{' '}
          This test candidate owns its rendering paths without delegating to the
          legacy primitive. Full consumer compatibility and performance remain
          unproven. No production migration without team agreement.
        </p>
      </aside>
    </section>
  );
};

const ImagePocComparison = () => {
  const { dir } = use(ServiceContext);
  const [scenario, setScenario] = useState<Scenario>('eager');
  const [readout, setReadout] = useState<{
    next: string;
    current: string;
  } | null>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  return (
    <section aria-labelledby="comparison-heading" dir={dir}>
      <h2 id="comparison-heading">Compare the actual renderers</h2>
      <p>
        Identical source, sizes, dimensions and loading settings. The candidate
        uses Next.js for canonical images and owns BBC placeholders, AMP markup
        and Lite omission without delegating to Simorgh. Both keep attribution
        as a visible caption.
      </p>
      <p>
        Scenarios are ranked by estimated codebase popularity: default
        production behaviour and frequency of related Image props/call sites.
        This is not runtime traffic or audience analytics.
      </p>
      <label htmlFor="image-poc-scenario">
        <span style={{ display: 'inline-block', marginInlineEnd: 8 }}>
          Example:
        </span>
        <select
          id="image-poc-scenario"
          value={scenario}
          onChange={event => {
            if (!isScenario(event.target.value)) {
              throw new TypeError('Unknown Image PoC scenario');
            }
            setScenario(event.target.value);
            setReadout(null);
          }}
          style={{
            border: '1px solid #141414',
            font: 'inherit',
            marginBottom: 16,
            minHeight: 44,
            padding: 8,
          }}
        >
          {Object.entries(scenarios).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <div
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        }}
      >
        {(['next', 'current'] as const).map(renderer => (
          <article
            key={renderer}
            style={{
              background: '#fff',
              border: '1px solid #d8d8d8',
              minWidth: 0,
            }}
          >
            <h3 style={{ margin: 0, padding: 20 }}>
              {renderer === 'next'
                ? 'Next.js candidate'
                : 'Current Simorgh Image'}
            </h3>
            <div ref={renderer === 'next' ? nextRef : currentRef}>
              <ImagePocExample
                key={scenario}
                renderer={renderer}
                scenario={scenario}
              />
            </div>
            {scenario !== 'missing' && scenario !== 'lite' && (
              <p style={{ margin: 0, padding: '12px 20px', fontSize: 14 }}>
                Source: BBC News
              </p>
            )}
            {readout && (
              <pre
                style={{
                  padding: 20,
                  margin: 0,
                  fontSize: 12,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  borderTop: '1px solid #d8d8d8',
                }}
              >
                {readout[renderer]}
              </pre>
            )}
          </article>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setReadout({
            next: readImage(nextRef.current),
            current: readImage(currentRef.current),
          })
        }
        style={{ font: 'inherit', padding: '10px 16px', marginTop: 16 }}
      >
        Inspect rendered images
      </button>
      <p role="status">
        {readout
          ? 'DOM readout captured. Refresh after resizing or changing examples.'
          : 'Load or scroll to both images, then inspect to see selected URLs and candidates.'}
      </p>
      <p>
        This shared page is not an isolated benchmark: the browser may reuse
        cached requests. Cross-origin byte counts and timings may be restricted.
        Measure each renderer separately in production mode for performance
        conclusions.
      </p>
      <RendererAssessment scenario={scenario} />
    </section>
  );
};

export default ImagePocComparison;
