import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import BrandContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
import * as cookies from '#contexts/UserContext/cookies';

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
  variant: 'test',
  scriptLinkVariants: {
    test: {
      scriptLinkText: 'Test',
      scriptLinkOffscreenText: 'Test-variant',
    },
  },
};

jest.mock('#lib/utilities/variantHandler');
const variantHandlers = require('#lib/utilities/variantHandler');

variantHandlers.getOtherVariant.mockImplementation(() => 'test');

const spy = jest.spyOn(cookies, 'setPreferredVariantCookie');
const userContextMock = {
  setPreferredVariantCookie: cookies.setPreferredVariantCookie,
};

const BrandContainerWithContext = context => (
  <ServiceContext.Provider value={context}>
    <UserContext.Provider value={userContextMock}>
      <BrandContainer />
    </UserContext.Provider>
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

  describe('Assertions', () => {
    it('should render a Brand with a Skip to content link, linking to #content', () => {
      const { container } = render(
        BrandContainerWithContext(newsServiceContextStub),
      );

      const skipLink = container.querySelectorAll('a')[1];
      const skipLinkHref = skipLink.getAttribute('href');

      expect(skipLinkHref).toBe('#content');
    });

    describe('preffered variant cookie', () => {
      let container;

      beforeEach(() => {
        container = render(
          BrandContainerWithContext({
            ...variantServiceContextStub,
          }),
        ).container;
      });

      afterEach(() => {
        document.cookie = '';
        jest.clearAllMocks();
      });

      it('should be set when ScriptLink is clicked and cookie is not defined', () => {
        document.cookie = '';

        const scriptLink = container.querySelector('a[data-variant="test"]');
        fireEvent.click(scriptLink);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(document.cookie).toEqual('; ckps_news=test');
      });

      it('should be updated when ScriptLink is clicked and cookie exists', () => {
        document.cookie = 'ckps_news=lat';

        const scriptLink = container.querySelector('a[data-variant="test"]');
        fireEvent.click(scriptLink);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(document.cookie).toEqual('; ckps_news=test');
      });
    });
  });
});
