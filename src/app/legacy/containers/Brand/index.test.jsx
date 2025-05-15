import React from 'react';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';
import { suppressPropWarnings } from '../../psammead/psammead-test-helpers/src';
import BrandContainer from '.';

const BrandContainerWithContext = (skipLink, scriptLink, linkId) => (
  <BrandContainer skipLink={skipLink} scriptLink={scriptLink} linkId={linkId} />
);

const mockSkipLink = <div data-testid="skip-link">Skip Link</div>;
const mockScriptLink = <div data-testid="script-link">Script Link</div>;

describe(`BrandContainer`, () => {
  suppressPropWarnings(['linkId', 'StyledBrand', 'null']);
  suppressPropWarnings(['linkId', 'LocalisedBrandName', 'null']);

  it('should render correctly', () => {
    const { container } = render(BrandContainerWithContext());

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Assertions', () => {
    it('should render skip to content link if provided', () => {
      render(BrandContainerWithContext(mockSkipLink));

      const skipLink = screen.getByTestId('skip-link');
      expect(skipLink).not.toBeNull();
    });

    it('should render script link if provided', () => {
      render(BrandContainerWithContext(null, mockScriptLink));

      const scriptLink = screen.getByTestId('script-link');
      expect(scriptLink).not.toBeNull();
    });

    it('should not render skip to content link if not provided', () => {
      render(BrandContainerWithContext());

      const skipLink = screen.queryByTestId('skip-link');
      expect(skipLink).toBeNull();
    });

    it('should not render script link if not provided', () => {
      render(BrandContainerWithContext(mockSkipLink));

      const scriptLink = screen.queryByTestId('script-link');
      expect(scriptLink).toBeNull();
    });

    it('should render a focussable linkId if provided', () => {
      const { container } = render(
        BrandContainerWithContext(mockSkipLink, mockScriptLink, 'brandLink'),
      );

      expect(container.querySelector('#brandLink')).toBe(
        container.querySelector('a[href="/news"]'),
      );
    });

    it.each`
      service       | variant   | expectedHref
      ${'serbian'}  | ${'lat'}  | ${'/serbian/lat'}
      ${'serbian'}  | ${'cyr'}  | ${'/serbian/cyr'}
      ${'zhongwen'} | ${'trad'} | ${'/zhongwen/trad'}
      ${'zhongwen'} | ${'simp'} | ${'/zhongwen/simp'}
      ${'uzbek'}    | ${'lat'}  | ${'/uzbek/lat'}
      ${'uzbek'}    | ${'cyr'}  | ${'/uzbek/cyr'}
    `(
      'should render correctly with link provided for $service $variant',
      ({ service, variant, expectedHref }) => {
        const { container } = render(
          BrandContainerWithContext(mockSkipLink, mockScriptLink, 'brandLink'),
          {
            service,
            variant,
          },
        );

        const brandLink = container.querySelector('a');

        expect(brandLink.getAttribute('href')).toEqual(expectedHref);
      },
    );
  });
});
