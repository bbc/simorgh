import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { C_POSTBOX, C_WHITE } from '#psammead/psammead-styles/src/colours';
import brandSVG from '../../../components/ThemeProvider/chameleonLogos/news';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import BrandContainer from '.';

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

const BrandContainerWithContext = (context, skipLink, scriptLink, linkId) => (
  <ThemeProvider service="news" variant="default">
    <ServiceContext.Provider value={context}>
      <BrandContainer
        skipLink={skipLink}
        scriptLink={scriptLink}
        linkId={linkId}
      />
    </ServiceContext.Provider>
  </ThemeProvider>
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

    it('should render script link if provided', () => {
      const { getByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub, null, mockScriptLink),
      );

      const scriptLink = getByTestId('script-link');
      expect(scriptLink).not.toBeNull();
    });

    it('should not render skip to content link if not provided', () => {
      const { queryByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub),
      );

      const skipLink = queryByTestId('skip-link');
      expect(skipLink).toBeNull();
    });

    it('should not render script link if not provided', () => {
      const { queryByTestId } = render(
        BrandContainerWithContext(newsServiceContextStub, mockSkipLink),
      );

      const scriptLink = queryByTestId('script-link');
      expect(scriptLink).toBeNull();
    });

    it('should render a focussable linkId if provided', () => {
      const { container } = render(
        BrandContainerWithContext(
          newsServiceContextStub,
          mockSkipLink,
          mockScriptLink,
          'brandLink',
        ),
      );

      expect(container.querySelector('#brandLink')).toBe(
        container.querySelector('a[href="/news"]'),
      );
    });
  });
});
