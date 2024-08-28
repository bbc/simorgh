/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren } from 'react';

import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import { STORY_PAGE } from '#routes/utils/pageTypes';
import makeRelativeUrlPath from '../../lib/utilities/makeRelativeUrlPath';
import * as clickTracking from '../../hooks/useClickTrackerHandler';
import { render } from '../react-testing-library-with-providers';
import { Services, Variants } from '#models/types/global';

import {
  promoProps,
  cpsPromoFixture,
  linkPromoFixture,
  makeOptimoPromoFixture,
} from './fixtures';

import Promo from '.';
import { PromoProps } from './types';

interface Props extends PromoProps {
  service?: Services;
  variant?: Variants;
}

const Component = ({
  service = 'mundo',
  variant,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider
        isAmp={false}
        isApp={false}
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
    const { container } = render(
      <Component {...(promoProps as unknown as PromoProps)} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('when given props for a Optimo promo', () => {
    const validOptimoPromoFixture = makeOptimoPromoFixture({
      type: 'rawImage',
      model: {
        width: 800,
        height: 450,
        locator: '2105/test/a7436f40-a2dd-11ed-9015-6935ab4fa6ca.jpg',
        originCode: 'cpsdevpb',
        copyrightHolder: 'BBC',
        suitableForSyndication: true,
      },
    });
    const { container } = render(<Component {...validOptimoPromoFixture} />);
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

  it('when given props for an a Optimo promo with no image', () => {
    const optimoPromoFixtureNoImage = makeOptimoPromoFixture({});
    const { container } = render(<Component {...optimoPromoFixtureNoImage} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the appropriate elements - Optimo Promo', () => {
    const validOptimoPromoFixture = makeOptimoPromoFixture({
      type: 'rawImage',
      model: {
        width: 800,
        height: 450,
        locator: '2105/test/a7436f40-a2dd-11ed-9015-6935ab4fa6ca.jpg',
        originCode: 'cpsdevpb',
        copyrightHolder: 'BBC',
        suitableForSyndication: true,
      },
    });
    const { container, getByText } = render(
      <Component {...validOptimoPromoFixture} />,
    );

    const promoHeadline = validOptimoPromoFixture?.item?.headlines
      ?.promoHeadline as any;

    expect(getByText('2 febrero 2023'));
    expect(getByText(promoHeadline.blocks[0].model.blocks[0].model.text));
    expect(
      container.querySelector(
        `a[href="${makeRelativeUrlPath(
          validOptimoPromoFixture.item.locators?.canonicalUrl,
        )}"]`,
      ),
    ).toBeInTheDocument();
  });

  it('should render the appropriate elements - CPS Promo', () => {
    const { container, getByText } = render(<Component {...cpsPromoFixture} />);

    expect(getByText('5 mayo 2016'));
    expect(getByText(cpsPromoFixture.item.headlines.headline));
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
    expect(
      container.querySelector('a[href="/pidgin/sport-51434980"]'),
    ).toBeInTheDocument();
  });

  it('should render the appropriate elements - Optimo Promo No Image', () => {
    const optimoPromoFixtureNoImage = makeOptimoPromoFixture({});
    const { container, getByText } = render(
      <Component {...optimoPromoFixtureNoImage} />,
    );

    const promoHeadline = optimoPromoFixtureNoImage?.item?.headlines
      ?.promoHeadline as any;

    expect(getByText('2 febrero 2023'));
    expect(getByText(promoHeadline.blocks[0].model.blocks[0].model.text));
    expect(
      container.querySelector(
        `a[href="${makeRelativeUrlPath(
          optimoPromoFixtureNoImage.item.locators?.canonicalUrl,
        )}"]`,
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        `img[src="https://ichef.bbci.co.uk/ace/ws/400/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png.webp"]`,
      ),
    ).toBeInTheDocument();
  });

  it('should render null - Invalid Optimo Promo', () => {
    const optimoPromoFixture = makeOptimoPromoFixture({});
    const invalidOptimoPromoFixture = {
      item: { ...optimoPromoFixture.item, headlines: {} },
    };

    const { container } = render(<Component {...invalidOptimoPromoFixture} />);
    expect(container).toBeEmptyDOMElement();
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
    const { getByTestId } = render(
      <Component {...linkPromoFixture} service="pidgin" />,
    );
    expect(
      getByTestId('frosted-glass-lazyload-placeholder'),
    ).toBeInTheDocument();
  });
});
