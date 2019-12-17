import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
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
  translations: {
    skipLinkText: 'Skip to content',
  },
};

const variantServiceContextStub = {
  ...newsServiceContextStub,
  script: latin,
  scriptLinkVariant: 'test',
  scriptLinkText: 'Test',
  scriptLinkOffscreenText: 'Test-variant',
  translations: {
    skipLinkText: 'Skip to content',
  },
};

const BrandContainerWithContext = context => (
  <ServiceContext.Provider value={context}>
    <BrandContainer />
  </ServiceContext.Provider>
);

describe(`BrandContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(newsServiceContextStub),
  );

  shouldMatchSnapshot(
    'should render script link correctly',
    BrandContainerWithContext(variantServiceContextStub),
  );

  describe('assertions', () => {
    afterEach(() => {
      document.cookie = '';
      jest.clearAllMocks();
    });

    it('should render a Brand with a Skip to content link, linking to #content', () => {
      const { container } = render(
        BrandContainerWithContext(newsServiceContextStub),
      );

      const skipLink = container.querySelectorAll('a')[1];
      const skipLinkHref = skipLink.getAttribute('href');

      expect(skipLinkHref).toBe('#content');
    });

    it('should update cookie to preffered variant when ScriptLink is clicked', () => {
      document.cookie = '';

      const { container } = render(
        BrandContainerWithContext({
          ...variantServiceContextStub,
          scriptLinkVariant: 'cyr',
        }),
      );

      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      fireEvent.click(scriptLink);
      expect(document.cookie).toEqual('; ckps_news=cyr');
    });
  });
});
