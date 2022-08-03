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

describe('A11y', () => {
  it('should render a link correctly with the url contained in the href', () => {
    render(<SubheadWithContext>My Text</SubheadWithContext>);

    const headingElement = document.querySelector('h2');
    expect(headingElement).toMatchSnapshot();
    expect(headingElement.innerHTML).toBe('My Text');
  });

  it('should render children within an h2', () => {});
});
