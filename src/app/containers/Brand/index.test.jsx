import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import BrandContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';

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

const BrandContainerWithContext = (context, skipLink, scriptLink) => (
  <ServiceContext.Provider value={context}>
    <BrandContainer skipLink={skipLink} scriptLink={scriptLink} />
  </ServiceContext.Provider>
);

const mockSkipLink = <div data-testid="skip-link">Skip Link</div>;
const mockScriptLink = <div data-testid="script-link">Script Link</div>;

describe(`BrandContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(newsServiceContextStub),
  );

  describe('Assertions', () => {
    it('should render skip to content link if provided', () => {
      const { getByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub, mockSkipLink),
      );

      const skipLink = getByTestId('skip-link');
      expect(skipLink).not.toBeNull();
    });

    it('should render script switch link if provided', () => {
      const { getByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub, null, mockScriptLink),
      );

      const scriptLink = getByTestId('script-link');
      expect(scriptLink).not.toBeNull();
    });
  });
});
