import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import DisclaimerComponent from '.';

// eslint-disable-next-line react/prop-types
const renderComponent = ({ enabled = true } = {}) =>
  render(
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled,
        },
      }}
    >
      <ServiceContext.Provider
        value={{
          disclaimer: {
            block: [
              { text: 'Приложение Русской службы BBC News доступно для ' },
              {
                link: {
                  text: 'IOS ',
                  href: 'https://apps.apple.com/us/app/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8-%D0%B1%D0%B8-%D0%B1%D0%B8-%D1%81%D0%B8/id504278066',
                },
              },
              { text: 'и ' },
              {
                link: {
                  text: 'Android',
                  href: 'https://play.google.com/store/apps/details?id=uk.co.bbc.russian',
                },
              },
              {
                text: '. Грузите его на ваш девайс и продолжайте получать новости от Би-би-си.',
              },
            ],
          },
        }}
      >
        <DisclaimerComponent />
      </ServiceContext.Provider>
    </ToggleContextProvider>,
  );

describe('Disclaimer Component', () => {
  it('Renders a section with role region', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('region', { container: 'section' })).toBeInTheDocument();
  });

  it('Renders disclaimer text correctly', () => {
    const { getByText } = renderComponent();
    expect(
      getByText(
        'Приложение Русской службы BBC News доступно для и . Грузите его на ваш девайс и продолжайте получать новости от Би-би-си.',
      ),
    ).toBeInTheDocument();

    expect(getByText('IOS')).toBeInTheDocument();

    expect(getByText('Android')).toBeInTheDocument();
  });

  it('Renders links correctly', () => {
    const { getAllByRole } = renderComponent();
    expect(getAllByRole('link').length).toBe(2);
  });

  it('Does not render the disclaimer when toggled off', () => {
    const { container } = renderComponent({ enabled: false });
    expect(container).toBeEmptyDOMElement();
  });
});
