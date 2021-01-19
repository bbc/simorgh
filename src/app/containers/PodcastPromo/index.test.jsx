import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import PodcastPromo from '.';

/* eslint-disable react/prop-types */
const PromoWithContext = ({ service = 'russian', variant = null }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <PodcastPromo />
  </ServiceContextProvider>
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

  it('should render podcast in a h2 element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText('Подкаст').closest('h2')).toBeInTheDocument();
  });

  it('should render the section header/label', () => {
    const { getByRole, getByText } = render(<PromoWithContext />);
    const section = getByRole('region');
    const ariaLabelledByAttr = section.getAttribute('aria-labelledby');

    expect(getByText('Подкаст').closest('h2').getAttribute('id')).toEqual(
      ariaLabelledByAttr,
    );
  });

  it('should render the title text in a h3 element', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(getByText('Что это было?').closest('h3')).toBeInTheDocument();
  });

  it('should render the link inside the h3 element and should wrap the title text', () => {
    const { getByText } = render(<PromoWithContext />);

    expect(
      getByText('Что это было?').closest('a').closest('h3'),
    ).toBeInTheDocument();
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
