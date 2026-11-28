import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { createRef } from 'react';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import {
  POC_IMAGE_SIZES,
  POC_IMAGE_TEMPLATE,
} from '#nextjs/utilities/imagePoc';
import ImagePocAdapter from './ImagePocAdapter';
import { ImagePocExample } from './ImagePocComparison';

// Expose head hints in the test DOM so preload/source matching can be asserted.
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

// Fail on legacy delegation while keeping next/image real in candidate tests.
jest.mock('#app/components/Image', () => ({
  __esModule: true,
  default: () => {
    throw new Error('The candidate must not call the legacy Image primitive');
  },
}));

const props = {
  src: POC_IMAGE_TEMPLATE,
  alt: 'Autumn lake',
  width: 624,
  height: 351,
  sizes: POC_IMAGE_SIZES,
};

describe('Independent Next.js PoC adapter', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it.each(['eager', 'lazy', 'hero', 'portrait'] as const)(
    '%s uses the actual Next.js component without legacy rendering',
    async scenario => {
      render(<ImagePocExample renderer="next" scenario={scenario} />);
      expect(await screen.findByRole('img')).toHaveAttribute('data-nimg', '1');
    },
  );

  it('owns missing-source rendering without legacy delegation', () => {
    const { container } = render(
      <ImagePocExample renderer="next" scenario="missing" />,
    );
    expect(container.querySelector('.placeholder')).toBeInTheDocument();
    expect(container.querySelector('img, amp-img, link')).toBeNull();
  });

  it('owns AMP output without rendering Next.js Image or the legacy primitive', () => {
    const { container } = render(
      <ImagePocExample renderer="next" scenario="amp" />,
    );
    expect(container.querySelector('amp-img')).toHaveAttribute(
      'attribution',
      'BBC News',
    );
    expect(container.querySelector('amp-img')).toHaveAttribute('srcset');
    expect(container.querySelector('img, picture')).toBeNull();
  });

  it('omits images and preloads on Lite, including a hero request', () => {
    const { container } = render(
      <ImagePocExample renderer="next" scenario="hero" />,
      { isLite: true },
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('matches its single WebP preload to the rendered source candidates', () => {
    const { container } = render(
      <ImagePocExample renderer="next" scenario="hero" />,
    );
    const source = container.querySelector('source');
    const preload = container.querySelector('link[rel="preload"]');
    expect(container.querySelectorAll('link')).toHaveLength(1);
    expect(preload).toHaveAttribute('type', 'image/webp');
    expect(preload).toHaveAttribute(
      'imagesrcset',
      source?.getAttribute('srcset'),
    );
    expect(preload).toHaveAttribute(
      'imagesizes',
      source?.getAttribute('sizes'),
    );
    expect(preload).toHaveAttribute('fetchpriority', 'high');
  });

  it('does not preload a missing source', () => {
    const { container } = render(
      <ImagePocAdapter {...props} src={undefined} preload />,
    );
    expect(container.querySelector('link, img, amp-img')).toBeNull();
  });

  it('removes the loading placeholder after load and restores it for a new source', async () => {
    const { container, rerender } = render(<ImagePocAdapter {...props} />);
    const image = await screen.findByRole('img');
    expect(container.querySelector('.wrapper')).toHaveClass('placeholder');
    fireEvent.load(image);
    await waitFor(() =>
      expect(container.querySelector('.wrapper')).not.toHaveClass(
        'placeholder',
      ),
    );
    rerender(
      <ImagePocAdapter
        {...props}
        src={POC_IMAGE_TEMPLATE.replace('34c4', 'abcd')}
      />,
    );
    expect(container.querySelector('.wrapper')).toHaveClass('placeholder');
  });

  it('allows loading placeholders to be disabled', () => {
    const { container } = render(
      <ImagePocAdapter {...props} placeholder={false} />,
    );
    expect(container.querySelector('.wrapper')).not.toHaveClass('placeholder');
  });

  it('supports JPEG-only output without a WebP source', () => {
    const { container } = render(<ImagePocAdapter {...props} format="jpeg" />);
    expect(container.querySelector('source')).toBeNull();
    expect(screen.getByRole('img')).toHaveAttribute('src');
    expect(screen.getByRole('img').getAttribute('src')).toMatch(/\.jpg$/);
  });

  it('supports fluid images without dimensions using Next.js fill mode', () => {
    const { container } = render(
      <ImagePocAdapter {...props} width={undefined} height={undefined} />,
    );
    expect(screen.getByRole('img')).toHaveAttribute('data-nimg', 'fill');
    expect(container.querySelector('.wrapper')).toHaveStyle({
      '--image-aspect-ratio': 'auto',
    });
  });

  it('preserves refs, children, styles and caption overflow behaviour', () => {
    const imageRef = createRef<HTMLImageElement>();
    const { container } = render(
      <ImagePocAdapter
        {...props}
        imageRef={imageRef}
        hasCaption
        className="consumer-class"
        style={{ borderRadius: 8 }}
      >
        <span data-testid="child">Caption</span>
      </ImagePocAdapter>,
    );
    expect(imageRef.current).toBe(screen.getByRole('img'));
    expect(container.querySelector('.wrapper')).toHaveClass('consumer-class');
    expect(screen.getByRole('img')).toHaveStyle({
      borderRadius: '8px',
    });
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container.querySelector('.wrapper')).not.toHaveClass('clip');
  });

  it('uses fill AMP layout when dimensions are unavailable', () => {
    const { container } = render(
      <ImagePocAdapter {...props} width={undefined} height={undefined} />,
      { isAmp: true },
    );
    expect(container.querySelector('amp-img')).toHaveAttribute(
      'layout',
      'fill',
    );
  });

  it('preserves a dark missing-source placeholder even when loading placeholders are disabled', () => {
    const { container } = render(
      <ImagePocAdapter
        {...props}
        src={undefined}
        placeholder={false}
        darkPlaceholder
      />,
    );
    expect(container.querySelector('.wrapper')).toHaveClass(
      'placeholder',
      'darkPlaceholder',
    );
  });

  it('owns AMP hero attributes', () => {
    const { container } = render(
      <ImagePocAdapter {...props} preload fetchPriority="high" />,
      { isAmp: true },
    );
    expect(container.querySelector('amp-img')).toHaveAttribute(
      'data-hero',
      'true',
    );
    expect(container.querySelector('amp-img')).toHaveAttribute(
      'layout',
      'responsive',
    );
  });
});
