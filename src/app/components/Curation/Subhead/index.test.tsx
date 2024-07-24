import React, { PropsWithChildren } from 'react';
import { render } from '../../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Subhead from '.';

import { Services } from '../../../models/types/global';

interface Props {
  service?: Services;
  link?: string;
}

const SubheadWithContext = ({
  children = '',
  link = '',
  service = 'mundo',
}: PropsWithChildren<Props>) => (
  <ServiceContextProvider service={service}>
    <Subhead link={link}>{children}</Subhead>
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
      <SubheadWithContext link="https://bbc.com">My Text</SubheadWithContext>,
    );

    const anchorElement = container.querySelector('a');
    expect(anchorElement?.getAttribute('href')).toBe('https://bbc.com');
  });
});
