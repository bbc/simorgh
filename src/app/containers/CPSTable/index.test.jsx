import React from 'react';
import { render } from '@testing-library/react';
import { latin } from '@bbc/gel-foundations/scripts';

import { ServiceContext } from '#contexts/ServiceContext';

import CPSTable from '.';
import fixtures from './fixtures';

const renderComponent = ({
  fixture = fixtures[0],
  supportedServices = ['sport'],
  service = 'sport',
} = {}) =>
  render(
    <ServiceContext.Provider value={{ script: latin, service, dir: 'ltr' }}>
      <CPSTable supportedServices={supportedServices} blocks={[fixture]} />
    </ServiceContext.Provider>,
  );

describe('CPSTable', () => {
  it('should render a table', () => {
    const { container } = renderComponent();
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('should not render a table if service is not supported', () => {
    const { container } = renderComponent({
      service: 'news',
    });
    expect(container.querySelector('table')).not.toBeInTheDocument();
  });

  it.each(fixtures)('should match snapshot - fixture %#', fixture => {
    const { container } = renderComponent(fixture);
    expect(container).toMatchSnapshot();
  });
});
