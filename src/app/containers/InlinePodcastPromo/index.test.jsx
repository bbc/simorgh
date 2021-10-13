import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import PodcastPromo from '.';

import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';

/* eslint-disable react/prop-types */
const PromoWithContext = ({ service = 'russian', variant = null }) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
    }}
  >
    <ServiceContextProvider service={service} variant={variant}>
      <PodcastPromo />
    </ServiceContextProvider>
  </ToggleContextProvider>
);

describe('PodcastPromo', () => {
  shouldMatchSnapshot('Should render correctly', <PromoWithContext />);

  it('should show when all props are available', () => {
    const { getByText, getByRole } = render(<PromoWithContext />);
    const section = getByRole('region');
    const element = getByText('Что это было?');

    expect(element).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });

  it('should not show when props are not available', () => {
    const { container } = render(<PromoWithContext service="pidgin" />);
    const sections = container.getElementsByTagName('section');
    expect(sections.length).toBe(0);
  });

  it('should render the wrapping section element with role=region attribute', () => {
    const { getByRole } = render(<PromoWithContext />);

    expect(getByRole('region')).toBeInTheDocument();
  });

  it('should render podcast in a strong element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText('Подкаст').closest('strong')).toBeInTheDocument();
  });

  it('should contain a link to skip to end of podcast component', () => {
    const { container } = render(<PromoWithContext />);

    const links = container.querySelectorAll('a');
    const skipLink = links[0];

    expect(skipLink.getAttribute('href')).toEqual('#end-of-podcasts');
    // Need to change this to match the text we have in skiplink.
    // Currently, there is no skiplink in podcasts config.
    // expect(skipLink.textContent).toEqual(
    //   'Saltar Quizás también te interese y continuar leyendo',
    // );
  });

  it('should render the section header/label', () => {
    const { getByRole, getByText } = render(<PromoWithContext />);
    const section = getByRole('region');
    const ariaLabelledByAttr = section.getAttribute('aria-labelledby');

    expect(getByText('Подкаст').closest('strong').getAttribute('id')).toEqual(
      ariaLabelledByAttr,
    );
  });

  it('should render the title text in a <a> element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText('Что это было?').closest('a')).toBeInTheDocument();
  });

  it('should render the description in a paragraph element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(
      getByText(
        'Мы быстро, просто и понятно объясняем, что случилось, почему это важно и что будет дальше. Никаких ненужных подробностей и передергиваний - только факты и взвешенная аналитика.',
      ).closest('p'),
    ).toBeInTheDocument();
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
