import { use, useMemo, type PropsWithChildren } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RequestContext } from '#contexts/RequestContext';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import ImageWithCaption from '../ImageWithCaption';
import {
  imageData,
  landscape,
  portrait,
} from '../ImageWithCaption/fixtureData';
import { KyrgyzWithTwoSummaries } from '../Billboard/index.stories';
import { Example as MaskedImage } from '../MaskedImage/index.stories';
import { CPSNewsPromo } from '../FrostedGlassPromo/index.stories';
import {
  Example as CurationPromo,
  Media as MediaPromos,
} from '../Curation/CurationPromo/index.stories';
import MessageBanner from '../MessageBanner';
import PortraitVideoCarousel from '../PortraitVideoCarousel';
import portraitVideoFixture from '../PortraitVideoCarousel/fixture';
import { SingleItem as EpisodeStory } from '../../legacy/containers/EpisodeList/RecentVideoEpisodes/index.stories';
import PromoImage from '../../legacy/components/Promo/image';
import Image, { type ImageProps } from '.';

const template =
  'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/164AF/production/_110911319_antartica.jpg';
const src = template.replace('{width}', '624');
const alt = 'A penguin stands on an ice floe';
const prepared = createIchefSrcSet({
  originCode: 'cpsprodpb',
  locator: '164AF/production/_110911319_antartica.jpg',
  originalImageWidth: 624,
  srcResolution: 624,
});
const responsive = {
  src: prepared.src,
  srcSet: prepared.primarySrcset,
  mediaType: prepared.primaryMimeType || undefined,
  fallbackSrcSet: prepared.fallbackSrcset,
  fallbackMediaType: prepared.fallbackMimeType || undefined,
  sizes: '(min-width: 900px) 400px, 100vw',
};

const Card = ({
  title,
  expected,
  children,
}: PropsWithChildren<{ title: string; expected: string }>) => (
  <section
    style={{
      minWidth: 0,
      alignSelf: 'start',
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 16,
      background: '#fff',
      color: '#222',
    }}
  >
    <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{title}</h3>
    <p style={{ margin: '0 0 16px', fontSize: 14 }}>{expected}</p>
    <div
      style={{
        position: 'relative',
        display: 'flow-root',
        isolation: 'isolate',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {children}
    </div>
  </section>
);

const Grid = ({ children }: PropsWithChildren) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
      gap: 24,
      alignItems: 'start',
    }}
  >
    {children}
  </div>
);

const variants: {
  title: string;
  expected: string;
  props: Partial<ImageProps>;
}[] = [
  {
    title: 'Responsive WebP / JPEG',
    expected:
      'Homepage picture sources; browser selects a supported candidate.',
    props: responsive,
  },
  {
    title: 'JPEG only',
    expected: 'An ordinary JPEG image; no format source elements.',
    props: { src },
  },
  {
    title: 'Lazy loading',
    expected:
      'loading="lazy"; browser controls request timing near the viewport.',
    props: { ...responsive, lazyLoad: true },
  },
  {
    title: 'Hero / preload',
    expected: 'Eager image with high fetch priority and an image preload.',
    props: { src, preload: true, fetchPriority: 'high' },
  },
  {
    title: 'Missing source / light placeholder',
    expected: 'Reserved placeholder space; no img element or invalid request.',
    props: { src: undefined },
  },
  {
    title: 'Missing source / dark placeholder',
    expected: 'Dark BBC placeholder; no img element.',
    props: { src: undefined, darkPlaceholder: true },
  },
  {
    title: 'No loading placeholder',
    expected: 'Image renders without the loading-placeholder background.',
    props: { src, placeholder: false },
  },
  {
    title: 'Square crop',
    expected: 'A 1:1 reserved frame with a centred crop.',
    props: { src, aspectRatio: [1, 1] },
  },
  {
    title: 'Custom wide ratio',
    expected: 'A 21:9 reserved frame; surrounding content does not jump.',
    props: { src, aspectRatio: [21, 9] },
  },
  {
    title: 'Fluid / no fixed dimensions',
    expected: 'Image follows its intrinsic ratio without supplied dimensions.',
    props: { src, width: undefined, height: undefined },
  },
];

const Showcase = () => {
  const request = use(RequestContext);
  const canonical = useMemo(
    () => ({
      ...request,
      isAmp: false,
      isLite: false,
      pageType: 'home' as const,
    }),
    [request],
  );
  const amp = useMemo(
    () => ({ ...canonical, isAmp: true, pageType: 'article' as const }),
    [canonical],
  );
  const lite = useMemo(() => ({ ...canonical, isLite: true }), [canonical]);

  return (
    <RequestContext.Provider value={canonical}>
      <main
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 24,
          background: '#f5f5f5',
          color: '#222',
          fontFamily: 'sans-serif',
        }}
      >
        <h1>Simorgh images: what the shared component supports</h1>
        <p>
          One page showing image options and the real components that use them:
          promos, banners, captions and more. These examples use the existing
          Simorgh Image component, not Next.js Image.
        </p>
        <p>
          Scroll through the cards to see what each option does. Each card
          explains what to look for. This is a visual showcase, not a
          performance test.
        </p>
        <h2>1. Shared Image behaviour</h2>
        <Grid>
          {variants.map(({ title, expected, props }) => (
            <Card key={title} title={title} expected={expected}>
              <Image alt={alt} width={624} height={351} {...props} />
            </Card>
          ))}
          <Card
            title="AMP markup"
            expected="Responsive amp-img, dimensions and attribution. This canvas has no AMP runtime: inspect markup, not an AMP rendering or validation result."
          >
            <RequestContext.Provider value={amp}>
              <Image
                src={src}
                alt={alt}
                width={624}
                height={351}
                attribution="BBC"
              />
            </RequestContext.Provider>
            <code>amp-img: layout=responsive, width=624, height=351</code>
          </Card>
          <Card
            title="Lite omission"
            expected="No image markup from Image; the surrounding text remains."
          >
            <RequestContext.Provider value={lite}>
              <div data-testid="showcase-lite">
                <Image src={src} alt={alt} width={624} height={351} />
                <p>Text remains available without the image.</p>
              </div>
            </RequestContext.Provider>
          </Card>
        </Grid>
        <h2>2. Real consumers of the shared renderer</h2>
        <Grid>
          <Card
            title="MaskedImage"
            expected="Shared sources with a gradient mask."
          >
            <div style={{ position: 'relative', aspectRatio: '800 / 533' }}>
              <MaskedImage />
            </div>
          </Card>
          <Card
            title="Frosted Glass Promo"
            expected="Image, readable frosted panel, headline and timestamp. Scroll into view to load the panel."
          >
            <CPSNewsPromo />
          </Card>
          <Card
            title="Curation Promo"
            expected="Editorial promo image and headline from an existing fixture."
          >
            <CurationPromo />
          </Card>
          <Card
            title="Promo.Image / programme artwork"
            expected="Programme recipe and responsive candidates; no duplicated WebP suffix."
          >
            <PromoImage
              src="https://ichef.bbci.co.uk/images/ic/{width}xn/p06vzdgj.jpg"
              alt="Programme artwork"
            />
          </Card>
          <Card
            title="Promo.Image / portrait background"
            expected="Portrait presentation with a blurred background from the legacy wrapper, using the shared Image renderer."
          >
            <PromoImage
              src={`https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/${portrait.locator}`}
              alt={portrait.alt}
              isPortraitImage
            />
          </Card>
          <Card
            title="Media overlays"
            expected="Existing video and photo-gallery promos keep their media indicators alongside the shared image."
          >
            <MediaPromos />
          </Card>
          <Card
            title="Landscape with caption"
            expected="Caption and attribution handling around the shared Image."
          >
            <ImageWithCaption {...imageData(landscape)} />
          </Card>
          <Card
            title="Portrait with caption"
            expected="Real portrait fixture with its intended proportions and attribution."
          >
            <ImageWithCaption {...imageData(portrait)} />
          </Card>
        </Grid>
        <h2>3. Larger layouts</h2>
        <Grid>
          <Card
            title="Billboard"
            expected="Existing two-summary fixture with MaskedImage and editorial links."
          >
            <KyrgyzWithTwoSummaries />
          </Card>
          <Card
            title="MessageBanner"
            expected="Banner image and call to action; responsive candidates from shared preparation."
          >
            <MessageBanner
              description="Shared image preparation also supports message banners."
              link="https://www.bbc.com/ws/languages"
              linkText="Explore BBC languages"
              image={template}
            >
              <h3>Message banner</h3>
            </MessageBanner>
          </Card>
        </Grid>
        <Card
          title="Portrait video promos"
          expected="Existing carousel fixture: portrait images, media indicators and navigation."
        >
          <PortraitVideoCarousel
            title={portraitVideoFixture.title}
            blocks={portraitVideoFixture.blocks}
            eventTrackingData={{ componentName: 'portrait-video-carousel' }}
          />
        </Card>
        <Card
          title="EpisodeList"
          expected="Existing video episode story, sharing the Image renderer with a media overlay."
        >
          {EpisodeStory.render({}, { service: 'afrique' })}
        </Card>
        <p>
          Scope: current Image options and representative consumers, not every
          possible prop combination. Lite omission here does not prove that
          consumer CSS backgrounds make zero image requests. Missing-source
          handling in legacy Promo.Image is not exercised by this page.
        </p>
      </main>
    </RequestContext.Provider>
  );
};

const meta = {
  title: 'Components/Image/Temporary showcase',
  component: Showcase,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOptions: Story = {};
