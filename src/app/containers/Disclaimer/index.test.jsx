import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import DisclaimerComponent from '.';

// eslint-disable-next-line react/prop-types
const renderComponent = ({
  disclaimerText = 'Disclaimer Text',
  enabled = true,
} = {}) =>
  render(
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled,
        },
      }}
    >
      <ServiceContext.Provider value={{ disclaimer: { text: disclaimerText } }}>
        <DisclaimerComponent />
      </ServiceContext.Provider>
    </ToggleContextProvider>,
  );

describe('Disclaimer Component', () => {
  it.skip('Renders the text from the service config', () => {
    const { getByText } = renderComponent();
    expect(getByText('Disclaimer Text')).toBeInTheDocument();
  });

  it('Does not render the disclaimer when toggled off', () => {
    const { container } = renderComponent({ enabled: false });
    expect(container).toBeEmptyDOMElement();
  });
});
