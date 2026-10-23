import { use, useMemo, useRef, useState } from 'react';
import NextImage, { getImageProps } from 'next/image';
import Head from 'next/head';
import Image from '#app/components/Image';
import { RequestContext } from '#app/contexts/RequestContext';
import {
  createImageSources,
  ichefLoader,
  POC_IMAGE_SIZES,
  POC_IMAGE_TEMPLATE,
  POC_PORTRAIT_SIZES,
} from '#nextjs/utilities/imagePoc';

const sources = createImageSources(POC_IMAGE_TEMPLATE);
const scenarios = {
  eager: 'Eager image',
  lazy: 'Lazy image',
  hero: 'Preload / high fetch priority',
  portrait: 'Portrait crop (3:4)',
  missing: 'Missing source / BBC placeholder',
  amp: 'AMP delegation (markup preview, not a valid AMP page)',
  lite: 'Lite delegation (no image)',
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
  const exampleContext = useMemo(
    () => ({ ...requestContext, isAmp, isLite }),
    [requestContext, isAmp, isLite],
  );
  const portrait = scenario === 'portrait';
  const hero = scenario === 'hero';
  const missing = scenario === 'missing';
  const height = portrait ? 832 : 351;
  const sizes = portrait ? POC_PORTRAIT_SIZES : POC_IMAGE_SIZES;
  const alt = 'Autumn trees surrounding a lake at Watergate Forest Park';

  if (renderer === 'current' || isAmp || isLite || missing) {
    return (
      <RequestContext.Provider value={exampleContext}>
        <Image
          alt={alt}
          src={missing ? undefined : sources.src}
          srcSet={missing ? undefined : sources.primarySrcSet}
          sizes={sizes}
          fallbackSrcSet={missing ? undefined : sources.fallbackSrcSet}
          mediaType="image/webp"
          fallbackMediaType="image/jpeg"
          width={624}
          height={height}
          aspectRatio={portrait ? [3, 4] : [16, 9]}
          lazyLoad={scenario === 'lazy'}
          preload={hero && !missing}
          fetchPriority={hero ? 'high' : undefined}
          attribution="BBC News"
        />
      </RequestContext.Provider>
    );
  }

  const { props: webp } = getImageProps({
    alt,
    src: sources.primaryTemplate,
    loader: ichefLoader,
    width: 624,
    height,
    sizes,
  });

  return (
    <>
      {hero && (
        <Head>
          <link
            key="image-poc-webp-preload"
            rel="preload"
            as="image"
            type="image/webp"
            imageSrcSet={webp.srcSet}
            imageSizes={sizes}
            fetchPriority="high"
          />
        </Head>
      )}
      <picture>
        <source type="image/webp" srcSet={webp.srcSet} sizes={sizes} />
        <NextImage
          alt={alt}
          src={POC_IMAGE_TEMPLATE}
          loader={ichefLoader}
          width={624}
          height={height}
          sizes={sizes}
          loading={scenario === 'lazy' ? 'lazy' : 'eager'}
          fetchPriority={hero ? 'high' : undefined}
          style={{
            aspectRatio: portrait ? '3 / 4' : '16 / 9',
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          }}
        />
      </picture>
    </>
  );
};

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
        keyword: 'Dual-renderer complexity',
        text: 'may increase while Simorgh is retained alongside Next.js.',
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
    { winner: string; reason: string; nextStep: string }
  > = {
    eager: {
      winner: 'Current Simorgh Image',
      reason:
        'It delivers the same eager image behaviour while retaining the existing BBC rendering contract.',
      nextStep:
        'Benchmark both implementations before considering a canonical-page pilot.',
    },
    lazy: {
      winner: 'Current Simorgh Image',
      reason:
        'It already supports lazy loading without introducing a second renderer or adapter layer.',
      nextStep:
        'Compare deferred request timing, selected candidates and bytes under a controlled viewport test.',
    },
    hero: {
      winner: 'Current Simorgh Image',
      reason:
        'Its existing preload and fetch-priority path is already available, while the Next.js path needs format-aware preload integration.',
      nextStep:
        'Verify that either implementation preloads exactly one candidate without duplicate downloads.',
    },
    portrait: {
      winner: 'Current Simorgh Image',
      reason:
        'It preserves the established aspect-ratio and attribution behaviour without adding a new integration contract.',
      nextStep:
        'Test portrait crops across page types, breakpoints and RTL layouts before considering adoption.',
    },
    missing: {
      winner: 'Current Simorgh Image',
      reason:
        'It retains the BBC placeholder and missing-source behaviour; the Next.js candidate deliberately delegates this case.',
      nextStep:
        'Keep missing-source rendering on Simorgh unless placeholder parity is explicitly implemented and tested.',
    },
    amp: {
      winner: 'Current Simorgh Image',
      reason:
        'It renders the existing amp-img path, including AMP attributes and attribution, while Next.js is not an AMP replacement here.',
      nextStep:
        'Keep AMP on the existing renderer and validate any canonical-only pilot separately.',
    },
    lite: {
      winner: 'Current Simorgh Image',
      reason:
        'It preserves the existing Lite behaviour by omitting the image entirely.',
      nextStep:
        'Keep Lite on the existing renderer; no Next.js image should be introduced for this path.',
    },
  };

  return recommendations[scenario];
};

const RendererAssessment = ({ scenario }: { scenario: Scenario }) => {
  const recommendation = getRecommendation(scenario);

  return (
    <section
      aria-labelledby="renderer-assessment-heading"
      style={{ marginTop: 24 }}
    >
      <h3 id="renderer-assessment-heading">Main differences, pros and cons</h3>
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
          Overall winner for “{scenarios[scenario]}”: {recommendation.winner}
        </h3>
        <p>
          <strong>
            Best fit for this scenario, not a proven performance winner.
          </strong>{' '}
          {recommendation.reason}
        </p>
        <p>
          <strong>Next step:</strong> {recommendation.nextStep}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Overall recommendation: revisit later.</strong> The current
          primitive remains the baseline until compatibility and performance
          evidence support a change. No production migration without team
          agreement.
        </p>
      </aside>
    </section>
  );
};

const ImagePocComparison = () => {
  const [scenario, setScenario] = useState<Scenario>('eager');
  const [readout, setReadout] = useState<{
    next: string;
    current: string;
  } | null>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  return (
    <section aria-labelledby="comparison-heading">
      <h2 id="comparison-heading">Compare the actual renderers</h2>
      <p>
        Identical source, sizes, dimensions and loading settings. The candidate
        uses Next.js for canonical images, retaining Simorgh for missing
        sources, AMP and Lite. Both keep attribution as a visible caption.
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
