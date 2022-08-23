import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import Subhead from '.';

/* eslint-disable react/prop-types */
const SubheadWithContext = ({
  children = '',
  href = '',
  service = 'mundo',
} = {}) => (
  <ServiceContextProvider service={service}>
    <Subhead href={href}>{children}</Subhead>
  </ServiceContextProvider>
);

describe('Curation Subhead Component', () => {
  it('should render a link correctly with the url contained in the href', () => {
    const { container } = render(
      <SubheadWithContext>My Text</SubheadWithContext>,
    );

    const headingElement = container.querySelector('h2');
    expect(headingElement?.innerHTML).toBe('My Text');
  });

  it('should render children within an h2', () => {
    const { container } = render(
      <SubheadWithContext href="https://bbc.com">My Text</SubheadWithContext>,
    );

    const anchorElement = container.querySelector('a');
    expect(anchorElement?.getAttribute('href')).toBe('https://bbc.com');
  });
});
