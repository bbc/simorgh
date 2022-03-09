import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import DisclaimerComponent from '.';

const DISCLAIMER_FIXTURE = {
  para1: 'Приложение Русской службы BBC News доступно для ',
  para2: {
    text: 'IOS',
    url: 'https://apps.apple.com/us/app/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8-%D0%B1%D0%B8-%D0%B1%D0%B8-%D1%81%D0%B8/id504278066',
  },
  para3: ' и ',
  para4: {
    text: 'Android',
    url: 'https://play.google.com/store/apps/details?id=uk.co.bbc.russian',
  },
  para5:
    '. Грузите его на ваш девайс и продолжайте получать новости от Би-би-си.',
};

// eslint-disable-next-line react/prop-types
const renderComponent = (
  { enabled = true } = {},
  disclaimer = DISCLAIMER_FIXTURE,
) =>
  render(
    <ToggleContextProvider
      toggles={{
        disclaimer: {
          enabled,
        },
      }}
    >
      <ServiceContext.Provider value={{ disclaimer }}>
        <DisclaimerComponent />
      </ServiceContext.Provider>
    </ToggleContextProvider>,
  );

describe('Disclaimer Component', () => {
  it('should render a section with role region', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('region', { container: 'section' })).toBeInTheDocument();
  });

  it('should render disclaimer text correctly', () => {
    const { getByText } = renderComponent();
    expect(
      getByText(
        'Приложение Русской службы BBC News доступно для IOS и Android. Вы можете также подписаться на наш канал в Telegram.',
      ),
    ).toBeInTheDocument();

    expect(getByText('IOS')).toBeInTheDocument();

    expect(getByText('Android')).toBeInTheDocument();
  });

  it('should render links correctly', () => {
    const { getAllByRole } = renderComponent();
    expect(getAllByRole('link').length).toBe(2);
  });

  it('should not render the disclaimer when the disclaimer toggle is not enabled', () => {
    const { container } = renderComponent({ enabled: false });
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when disclaimer is null', () => {
    const { container } = renderComponent({ enabled: true }, null);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when disclaimer is empty object', () => {
    const { container } = renderComponent({ enabled: true }, {});
    expect(container).toBeEmptyDOMElement();
  });
});
