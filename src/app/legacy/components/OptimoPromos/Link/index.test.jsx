import React from 'react';
import {
  render,
  screen,
} from '../../../../components/react-testing-library-with-providers';
import PromoContext from '../PromoContext';
import PromoLink from '.';

// eslint-disable-next-line react/prop-types
const LinkFixture = ({ to }) => (
  <PromoContext.Provider value={{ to }}>
    <PromoLink>Test Link</PromoLink>
  </PromoContext.Provider>
);

describe('Promo - Link', () => {
  it('should render the link element with a relative href URL when given an absolute URL', () => {
    render(<LinkFixture to="https://www.bbc.co.uk/news" />);
    const linkElement = screen.getByTestId('promo-link');

    expect(linkElement).toHaveAttribute('href', '/news');
  });

  it('should render the link element with a relative href URL when given an absolute URL with service and page ID', () => {
    render(
      <LinkFixture to="https://www.bbc.com/persian/articles/crg6gk74v0wo" />,
    );
    const linkElement = screen.getByTestId('promo-link');

    expect(linkElement).toHaveAttribute(
      'href',
      '/persian/articles/crg6gk74v0wo',
    );
  });

  it('should render the link element with a relative href URL when given a relative URL', () => {
    render(<LinkFixture to="/news" />);
    const linkElement = screen.getByTestId('promo-link');

    expect(linkElement).toHaveAttribute('href', '/news');
  });
});
