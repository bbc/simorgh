import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import BrandContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';

const newsServiceContextStub = {
  product: 'BBC News',
  service: 'news',
  brandSVG,
  svgHeight: 24,
  maxWidth: 280,
  minWidth: 180,
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
};

const variantServiceContextStub = {
  ...newsServiceContextStub,
  script: latin,
  scriptLink: {
    text: 'Test',
    offscreenText: 'Test-variant',
  },
};

const BrandContainerWithContext = (context, skipLink) => (
  <ServiceContext.Provider value={context}>
    <RequestContext.Provider value={{ variant: 'test' }}>
      <BrandContainer skipLink={skipLink} />
    </RequestContext.Provider>
  </ServiceContext.Provider>
);

const mockSkipLink = <div data-testid="skip-link">Skip Link</div>;

describe(`BrandContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(newsServiceContextStub),
  );

  shouldMatchSnapshot(
    'should render correctly with script link and skip link',
    BrandContainerWithContext(variantServiceContextStub, mockSkipLink),
  );

  describe('Assertions', () => {
    it('should render skip to content link if provided', () => {
      const { getByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub, mockSkipLink),
      );

      const skipLink = getByTestId('skip-link');
      expect(skipLink).not.toBeNull();
    });
  });
});
