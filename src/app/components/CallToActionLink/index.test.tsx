import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import CallToActionLink from '.';

describe('Call To Action Link', () => {
  it('should render children as link text', () => {
    render(
      <CallToActionLink href="https://www.bbc.com/send/u94753086">
        My Link Text
      </CallToActionLink>,
    );
    const link = screen.getByText('My Link Text');
    expect(link).toBeInTheDocument();
  });

  it('should render a link with the correct href', () => {
    render(
      <CallToActionLink href="https://www.bbc.com/send/u94753086">
        My Link Text
      </CallToActionLink>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toEqual(
      'https://www.bbc.com/send/u94753086',
    );
  });
});
