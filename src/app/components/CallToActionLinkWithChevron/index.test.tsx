import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import CallToActionLinkWithChevron from '.';

describe('Call To Action Link With Chevron', () => {
  it('should render children as link text', () => {
    render(
      <CallToActionLinkWithChevron href="https://www.bbc.com/ws/languages">
        My Link Text
      </CallToActionLinkWithChevron>,
    );
    const link = screen.getByText('My Link Text');
    expect(link).toBeInTheDocument();
  });

  it('should render a link with the correct href', () => {
    render(
      <CallToActionLinkWithChevron href="https://www.bbc.com/ws/languages">
        My Link Text
      </CallToActionLinkWithChevron>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toEqual(
      'https://www.bbc.com/ws/languages',
    );
  });
});
