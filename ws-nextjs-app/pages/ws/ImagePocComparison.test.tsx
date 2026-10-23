import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import { POC_PORTRAIT_SIZES } from '#nextjs/utilities/imagePoc';
import ImagePocComparison, { ImagePocExample } from './ImagePocComparison';

describe('Image suitability PoC', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('explains both renderers and qualifies the recommendation', async () => {
    render(<ImagePocComparison />);
    expect(
      await screen.findByRole('heading', {
        name: 'Main differences, pros and cons',
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Pros' })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { name: 'Cons' })).toHaveLength(2);
    expect(
      screen.getByRole('heading', {
        name: 'Overall winner for “Eager image”: Current Simorgh Image',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Best fit for this scenario, not a proven performance winner.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Overall recommendation: revisit later/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No production migration without team agreement/),
    ).toBeInTheDocument();
  });

  it('updates the winner explanation when the selected scenario changes', () => {
    render(<ImagePocComparison />);
    fireEvent.change(screen.getByLabelText('Example:'), {
      target: { value: 'missing' },
    });
    expect(
      screen.getByRole('heading', {
        name: 'Overall winner for “Missing source / BBC placeholder”: Current Simorgh Image',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /retains the BBC placeholder and missing-source behaviour/,
      ),
    ).toBeInTheDocument();
  });

  it.each(['next', 'current'] as const)(
    '%s renders WebP before JPEG with reserved dimensions',
    async renderer => {
      const { container } = render(
        <ImagePocExample renderer={renderer} scenario="eager" />,
        { pageType: HOME_PAGE },
      );
      const image = await screen.findByRole('img');
      const picture = container.querySelector('picture');
      expect(picture?.querySelector('source')).toHaveAttribute(
        'type',
        'image/webp',
      );
      expect(picture?.querySelector('source')).toHaveAttribute('sizes');
      expect(picture?.querySelector('source')?.srcset).toContain('.webp ');
      expect(image).toHaveAttribute('width', '624');
      expect(image).toHaveAttribute('height', '351');
      expect(image).toHaveAttribute('loading', 'eager');
      expect(container.innerHTML).not.toContain('{width}');
      if (renderer === 'next') {
        expect(image.getAttribute('src')).toMatch(/\.jpg$/);
        expect(image.getAttribute('srcset')).not.toContain('.webp');
      } else {
        expect(picture?.querySelectorAll('source')[1]).toHaveAttribute(
          'type',
          'image/jpeg',
        );
      }
    },
  );

  it.each(['next', 'current'] as const)(
    '%s supports lazy loading',
    renderer => {
      render(<ImagePocExample renderer={renderer} scenario="lazy" />);
      expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
    },
  );

  it.each(['next', 'current'] as const)(
    '%s supports a high-priority hero',
    renderer => {
      render(<ImagePocExample renderer={renderer} scenario="hero" />);
      expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
      expect(screen.getByRole('img')).toHaveAttribute('fetchpriority', 'high');
    },
  );

  it.each(['next', 'current'] as const)(
    '%s reserves a portrait crop',
    renderer => {
      const { container } = render(
        <ImagePocExample renderer={renderer} scenario="portrait" />,
        { pageType: HOME_PAGE },
      );
      expect(screen.getByRole('img')).toHaveAttribute('height', '832');
      expect(screen.getByRole('img')).toHaveStyle({ aspectRatio: '3 / 4' });
      expect(container.querySelector('source')).toHaveAttribute(
        'sizes',
        POC_PORTRAIT_SIZES,
      );
    },
  );

  it.each(['next', 'current'] as const)(
    '%s retains the missing-source placeholder',
    renderer => {
      const { container } = render(
        <ImagePocExample renderer={renderer} scenario="missing" />,
      );
      expect(
        container.querySelector('img, picture, source'),
      ).not.toBeInTheDocument();
      expect(container.firstChild).toHaveStyle({ paddingBottom: '56.25%' });
      expect(container.innerHTML).not.toContain('undefined');
    },
  );

  it.each(['next', 'current'] as const)(
    '%s delegates AMP to amp-img',
    renderer => {
      const { container } = render(
        <ImagePocExample renderer={renderer} scenario="eager" />,
        { isAmp: true },
      );
      expect(container.querySelector('amp-img')).toHaveAttribute(
        'layout',
        'responsive',
      );
      expect(container.querySelector('amp-img')).toHaveAttribute(
        'attribution',
        'BBC News',
      );
      expect(container.querySelector('img')).not.toBeInTheDocument();
    },
  );

  it.each(['next', 'current'] as const)('%s omits images on Lite', renderer => {
    const { container } = render(
      <ImagePocExample renderer={renderer} scenario="eager" />,
      { isLite: true },
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows live DOM information and resets it when the scenario changes', () => {
    render(<ImagePocComparison />, { pageType: HOME_PAGE });
    fireEvent.click(
      screen.getByRole('button', { name: 'Inspect rendered images' }),
    );
    expect(screen.getAllByText(/Selected URL:/)).toHaveLength(2);
    fireEvent.change(screen.getByLabelText('Example:'), {
      target: { value: 'missing' },
    });
    expect(screen.queryByText(/Selected URL:/)).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('exposes AMP and Lite delegation as explicitly labelled examples', () => {
    const { container } = render(<ImagePocComparison />);
    fireEvent.change(screen.getByLabelText('Example:'), {
      target: { value: 'amp' },
    });
    expect(container.querySelectorAll('amp-img')).toHaveLength(2);
    expect(
      screen.getByRole('option', {
        name: 'AMP delegation (markup preview, not a valid AMP page)',
      }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Example:'), {
      target: { value: 'lite' },
    });
    expect(
      container.querySelector('img, amp-img, picture'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Source: BBC News')).not.toBeInTheDocument();
  });
});
