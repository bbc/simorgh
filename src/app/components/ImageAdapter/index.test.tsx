import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../react-testing-library-with-providers';
import ImageAdapter, { type ImageAdapterProps } from '.';

// Production BFF shape: content summaries return WebP iChef templates.
const TEMPLATE =
  'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg.webp';
const FALLBACK_TEMPLATE = TEMPLATE.replace(/\.webp$/, '');

const defaultProps: ImageAdapterProps = {
  src: TEMPLATE,
  alt: 'Example alt text',
  width: 800,
  height: 450,
  sizes: '(min-width: 63rem) 232px, (min-width: 37.5rem) 50vw, 33vw',
};

const renderAdapter = (
  props: Partial<ImageAdapterProps> = {},
  options: { isAmp?: boolean; isLite?: boolean } = {},
) => render(<ImageAdapter {...defaultProps} {...props} />, options);

describe('ImageAdapter', () => {
  it('renders a WebP source with a fallback image when the BFF supplies a WebP template', () => {
    const { container } = renderAdapter();

    const source = container.querySelector('picture > source');
    const img = container.querySelector('picture > img');

    expect(source).toHaveAttribute('type', 'image/webp');
    expect(source).toHaveAttribute('sizes', defaultProps.sizes);
    expect(img).toHaveAttribute('alt', defaultProps.alt);
    expect(img).toHaveAttribute('sizes', defaultProps.sizes);
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '450');

    const webpCandidates = source?.getAttribute('srcset')?.split(', ') ?? [];
    const fallbackCandidates = img?.getAttribute('srcset')?.split(', ') ?? [];

    expect(webpCandidates.length).toBeGreaterThan(0);
    expect(webpCandidates.length).toBe(fallbackCandidates.length);
    webpCandidates.forEach(candidate => {
      expect(candidate).toMatch(
        /^https:\/\/ichef\.bbci\.co\.uk\/ace\/ws\/\d+\/cpsprodpb\/.+\.jpg\.webp \d+w$/,
      );
    });
    fallbackCandidates.forEach(candidate => {
      expect(candidate).toMatch(
        /^https:\/\/ichef\.bbci\.co\.uk\/ace\/ws\/\d+\/cpsprodpb\/.+\.jpg \d+w$/,
      );
    });
  });

  it('does not add a WebP source when the template is not WebP', () => {
    const { container } = renderAdapter({ src: FALLBACK_TEMPLATE });

    expect(container.querySelector('picture')).toBeNull();
    expect(container.innerHTML).not.toContain('.webp');
    expect(container.querySelector('img')?.getAttribute('srcset')).toContain(
      '.jpg ',
    );
  });

  it('uses the 240px template as src for browsers without srcset support', () => {
    const { container } = renderAdapter();

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      TEMPLATE.replace('{width}', '240'),
    );
  });

  it('does not use the Next.js optimisation endpoint', () => {
    const { container } = renderAdapter();

    expect(container.innerHTML).not.toContain('/_next/image');
  });

  it('reserves space using the width and height ratio', () => {
    const { container } = renderAdapter({ width: 4, height: 3 });

    expect(container.firstElementChild).toHaveStyle({ paddingBottom: '75%' });
    expect(container.querySelector('img')).toHaveStyle({
      aspectRatio: '4 / 3',
    });
  });

  it('lazy loads by default', () => {
    const { container } = renderAdapter();

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).not.toHaveAttribute('fetchpriority');
  });

  it('loads eagerly without high fetch priority when loading is eager', () => {
    const { container } = renderAdapter({ loading: 'eager' });

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).not.toHaveAttribute('fetchpriority');
  });

  it('loads eagerly with high fetch priority and no preload when loading is priority', async () => {
    const { container } = renderAdapter({ loading: 'priority' });

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    await waitFor(() => {
      expect(document.head.querySelector('link[rel="preload"]')).toBeNull();
    });
  });

  it('shows the placeholder until the image loads', async () => {
    const { container } = renderAdapter();
    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveClass('placeholder');
    fireEvent.load(container.querySelector('img') as HTMLImageElement);
    await waitFor(() => expect(wrapper).not.toHaveClass('placeholder'));
  });

  it('uses the dark placeholder when requested', () => {
    const { container } = renderAdapter({ placeholder: 'dark' });

    expect(container.firstElementChild).toHaveClass(
      'placeholder',
      'darkPlaceholder',
    );
  });

  it('does not show a placeholder when placeholder is none', () => {
    const { container } = renderAdapter({ placeholder: 'none' });

    expect(container.firstElementChild).not.toHaveClass('placeholder');
  });

  it.each([
    ['missing', undefined],
    ['unsupported', 'https://example.com/{width}/image.jpg'],
  ])(
    'renders only the placeholder when the source is %s',
    (_, src?: string) => {
      const { container } = renderAdapter({ src, placeholder: 'none' });

      expect(container.querySelector('img')).toBeNull();
      expect(container.firstElementChild).toHaveClass('placeholder');
    },
  );

  it('applies the consumer class name', () => {
    const { container } = renderAdapter({ className: 'consumer' });

    expect(container.firstElementChild).toHaveClass('wrapper', 'consumer');
  });

  it.each([
    ['AMP', { isAmp: true }],
    ['Lite', { isLite: true }],
  ])('renders nothing on %s', (_, options) => {
    const { container } = renderAdapter({}, options);

    expect(container).toBeEmptyDOMElement();
  });
});
