import React from 'react';
import dissocPath from 'ramda/src/dissocPath';
import identity from 'ramda/src/identity';
import { render } from '@testing-library/react';

import { ToggleContextProvider } from '#contexts/ToggleContext';

import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';

import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { service as russianServiceConfig } from '../../../lib/config/services/russian';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { InlinePodcastPromo, SecondaryColumnPodcastPromo } from '.';

/* eslint-disable react/prop-types */
const PromoWithContext = ({
  inline = false,
  serviceConfigTransformer = identity,
}) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
    }}
  >
    <ServiceContext.Provider
      value={serviceConfigTransformer(russianServiceConfig.default)}
    >
      {inline ? <InlinePodcastPromo /> : <SecondaryColumnPodcastPromo />}
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

// Service config values to assert against
const {
  title,
  brandTitle,
  brandDescription,
  skipLink: { text: skipLinkText },
} = russianServiceConfig.default.podcastPromo;

describe('Inline', () => {
  shouldMatchSnapshot('Should render correctly', <PromoWithContext inline />);

  it('should show when all props are available', () => {
    const { getByText, getByRole } = render(<PromoWithContext inline />);
    const section = getByRole('region');
    const element = getByText(brandTitle);

    expect(element).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });

  it('should not show when props are not available', () => {
    const { container } = render(
      <PromoWithContext
        serviceConfigTransformer={dissocPath(['podcastPromo'])}
        inline
      />,
    );
    const sections = container.getElementsByTagName('section');
    expect(sections.length).toBe(0);
  });

  it('should render the wrapping section element with role=region attribute', () => {
    const { getByRole } = render(<PromoWithContext inline />);

    expect(getByRole('region')).toBeInTheDocument();
  });

  it('should render podcast in a strong element', () => {
    const { getByText } = render(<PromoWithContext inline />);

    expect(getByText(title).closest('strong')).toBeInTheDocument();
  });

  it('should contain a link to skip to end of podcast component', () => {
    const { container } = render(<PromoWithContext inline />);

    const links = container.querySelectorAll('a');
    const skipLink = links[0];

    expect(skipLink.getAttribute('href')).toEqual('#end-of-podcasts');
    expect(skipLink.textContent).toEqual(
      skipLinkText.replace('%title%', title),
    );
  });

  it('should fall back to english when the skipLink object is missing from the service config', () => {
    const { getByText } = render(
      <PromoWithContext
        inline
        serviceConfigTransformer={dissocPath(['podcastPromo', 'skipLink'])}
      />,
    );

    expect(getByText(`Skip ${title} and continue reading`)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should render the section header/label', () => {
    const { getByRole, getByText } = render(<PromoWithContext inline />);
    const section = getByRole('region');
    const ariaLabelledByAttr = section.getAttribute('aria-labelledby');

    expect(getByText(title).closest('strong').getAttribute('id')).toEqual(
      ariaLabelledByAttr,
    );
  });

  it('should render the title text in a <a> element', () => {
    const { getByText } = render(<PromoWithContext inline />);

    expect(getByText(brandTitle).closest('a')).toBeInTheDocument();
  });

  it('should render the description in a paragraph element', () => {
    const { getByText } = render(<PromoWithContext inline />);

    expect(getByText(brandDescription).closest('p')).toBeInTheDocument();
  });

  it('should render the "Episodes" call to action in a paragraph element', () => {
    const { getByText } = render(<PromoWithContext inline />);

    expect(getByText('эпизоды').closest('p')).toBeInTheDocument();
  });

  it('SVGs should use focusable=false and aria-hidden=true to ensure the icon is not focusable in the tabbing order (IE 11)', () => {
    const { container } = render(<PromoWithContext inline />);
    const svgEls = Array.from(container.querySelectorAll('svg'));
    const focusableAttrs = svgEls.map(svgEl => svgEl.getAttribute('focusable'));
    const ariaHiddenAttrs = svgEls.map(svgEl =>
      svgEl.getAttribute('aria-hidden'),
    );

    expect(focusableAttrs.every(attr => attr === 'false')).toBe(true);
    expect(ariaHiddenAttrs.every(attr => attr === 'true')).toBe(true);
  });
});

describe('SecondaryColumn', () => {
  shouldMatchSnapshot('Should render correctly', <PromoWithContext />);

  it('should show when all props are available', () => {
    const { getByText, getByRole } = render(<PromoWithContext />);
    const section = getByRole('region');
    const element = getByText(brandTitle);

    expect(element).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });

  it('should not show when props are not available', () => {
    const { container } = render(
      <PromoWithContext
        serviceConfigTransformer={dissocPath(['podcastPromo'])}
      />,
    );
    const sections = container.getElementsByTagName('section');
    expect(sections.length).toBe(0);
  });

  it('should render the wrapping section element with role=region attribute', () => {
    const { getByRole } = render(<PromoWithContext />);

    expect(getByRole('region')).toBeInTheDocument();
  });

  it('should render podcast in a h2 element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText(title).closest('h2')).toBeInTheDocument();
  });

  it('should render the section header/label', () => {
    const { getByRole, getByText } = render(<PromoWithContext />);
    const section = getByRole('region');
    const ariaLabelledByAttr = section.getAttribute('aria-labelledby');

    expect(getByText(title).closest('h2').getAttribute('id')).toEqual(
      ariaLabelledByAttr,
    );
  });

  it('should render the title text in a h3 element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText(brandTitle).closest('h3')).toBeInTheDocument();
  });

  it('should render the link inside the h3 element and should wrap the title text', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(
      getByText(brandTitle).closest('a').closest('h3'),
    ).toBeInTheDocument();
  });

  it('should render the description in a paragraph element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText(brandDescription).closest('p')).toBeInTheDocument();
  });

  it('should render the "Episodes" call to action in a paragraph element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText('эпизоды').closest('p')).toBeInTheDocument();
  });

  it('SVGs should use focusable=false and aria-hidden=true to ensure the icon is not focusable in the tabbing order (IE 11)', () => {
    const { container } = render(<PromoWithContext />);
    const svgEls = Array.from(container.querySelectorAll('svg'));
    const focusableAttrs = svgEls.map(svgEl => svgEl.getAttribute('focusable'));
    const ariaHiddenAttrs = svgEls.map(svgEl =>
      svgEl.getAttribute('aria-hidden'),
    );

    expect(focusableAttrs.every(attr => attr === 'false')).toBe(true);
    expect(ariaHiddenAttrs.every(attr => attr === 'true')).toBe(true);
  });
});

describe('Event Tracking', () => {
  it('should call the view tracking hook with the correct params', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
    render(<PromoWithContext />);

    expect(viewTrackerSpy).toHaveBeenCalledWith({
      componentName: 'promo-podcast',
    });
  });

  it('should call the click tracking hook with the correct params', () => {
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    render(<PromoWithContext />);

    expect(clickTrackerSpy).toHaveBeenCalledWith({
      componentName: 'promo-podcast',
    });
  });
});
