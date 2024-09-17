import React from 'react';
import { render } from '#components/react-testing-library-with-providers';

import { ServiceContext } from '#contexts/ServiceContext';

import latin from '#components/ThemeProvider/fontScripts/latin';
import CpsTable from '.';
import fixtures from './fixtures';

const renderComponent = ({
  fixture = fixtures[0],
  supportedServices = ['sport'],
  service = 'sport',
} = {}) =>
  render(
    <ServiceContext.Provider value={{ script: latin, service, dir: 'ltr' }}>
      <CpsTable supportedServices={supportedServices} blocks={fixture} />
    </ServiceContext.Provider>,
  );

describe('CpsTable', () => {
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

  it('should render header rows inside a thead', () => {
    const { getByText } = renderComponent();
    expect(getByText('Men').closest('thead')).toBeInTheDocument();
  });

  it('should render body rows inside a tbody', () => {
    const { getByText } = renderComponent();
    expect(getByText('Joe Root').closest('tbody')).toBeInTheDocument();
  });

  it('should render header cells as a th with a background colour', () => {
    const { getByText } = renderComponent();
    const cell = getByText('Men').closest('th');

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveStyle('background: #f7f7f5;');
  });

  it('should render body cells as a td without a background colour', () => {
    const { getByText } = renderComponent();
    const cell = getByText('Joe Root').closest('td');

    expect(cell).toBeInTheDocument();
    expect(cell).not.toHaveStyle('background: #f7f7f5;');
  });

  it.each(fixtures)('should match snapshot - fixture %#', fixture => {
    const { container } = renderComponent(fixture);
    expect(container).toMatchSnapshot();
  });
});
