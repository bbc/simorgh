import React from 'react';

import { RequestContextProvider } from '#contexts/RequestContext';

import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { promoProps, cpsPromoFixture, linkPromoFixture } from './fixtures';

import Promo from '.';

/* eslint-disable react/prop-types */
const Component = ({ service = 'mundo', variant, ...rest }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider
        isAmp={false}
        service={service}
        pathname="/"
        pageType={STORY_PAGE}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <Promo {...rest} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

describe('Frosted Glass Promo', () => {
  it('when given props directly', () => {
    const { container } = render(<Component {...promoProps} />);
    expect(container).toMatchSnapshot();
  });

  it('when given props for a CPS promo', () => {
    const { container } = render(<Component {...cpsPromoFixture} />);
    expect(container).toMatchSnapshot();
  });

  it('when given props for a Link promo', () => {
    const { container } = render(<Component {...linkPromoFixture} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the appropriate elements - CPS Promo', () => {
    const { container, getByText } = render(<Component {...cpsPromoFixture} />);

    expect(getByText('5 mayo 2016'));
    expect(getByText(cpsPromoFixture.item.headlines.headline));
    // Main image is lazy-loaded
    expect(container.querySelector('noscript')).toBeInTheDocument();
    expect(
      container.querySelector(
        `a[href="${cpsPromoFixture.item.locators.assetUri}"]`,
      ),
    ).toBeInTheDocument();
  });

  it('should render the appropriate elements - Link Promo', () => {
    const { container, getByText } = render(
      <Component {...linkPromoFixture} service="pidgin" />,
    );
    expect(getByText('17th February 2020'));
    expect(getByText(linkPromoFixture.item.summary));
    // Main image is lazy-loaded
    expect(container.querySelector('noscript')).toBeInTheDocument();
    expect(
      container.querySelector('a[href="/pidgin/sport-51434980"]'),
    ).toBeInTheDocument();
  });

  // Only expecting clicks to be emitted from here - view tracking is handled at
  // the list level - eg containers/CpsFeatureAnalysis
  it('should track clicks', () => {
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    render(<Component {...cpsPromoFixture} />);

    expect(clickTrackerSpy).toHaveBeenCalledWith({
      componentName: 'features',
      url: cpsPromoFixture.item.locators.assetUri,
    });
  });

  it('should render lazyload component for frosted glass section', () => {
    const { container, getByTestId } = render(
      <Component {...linkPromoFixture} service="pidgin" />,
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
    expect(
      getByTestId('frosted-glass-lazyload-placeholder'),
    ).toBeInTheDocument();
  });
});
