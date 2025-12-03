import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { render, screen } from '../react-testing-library-with-providers';
import DisclaimerComponent from '.';

const DISCLAIMER_FIXTURE = {
  para1: 'Приложение Русской службы BBC News доступно для ',
  para2: {
    text: 'IOS',
    url: 'https://apps.apple.com/us/app/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8-%D0%B1%D0%B8-%D0%B1%D0%B8-%D1%81%D0%B8/id504278066',
    isExternal: true,
  },
  para3: ' и ',
  para4: {
    text: 'Android',
    url: 'https://play.google.com/store/apps/details?id=uk.co.bbc.russian',
    isExternal: false,
  },
  para5: '. Вы можете также подписаться на наш канал в ',
  para6: {
    text: 'Telegram',
    url: 'https://t.me/bbcrussian',
    isExternal: true,
  },
  para7: '.',
};
const externalLinkText = ', внешняя';

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
      {/* @ts-expect-error - to diagnose */}
      <ServiceContext.Provider value={{ disclaimer, externalLinkText }}>
        <DisclaimerComponent />
      </ServiceContext.Provider>
    </ToggleContextProvider>,
  );
describe('Disclaimer Component', () => {
  it('should render a section with role region', () => {
    const { container } = renderComponent();
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
  it('should render disclaimer text correctly', () => {
    const { getByText } = renderComponent();
    expect(
      getByText(
        'Приложение Русской службы BBC News доступно для и . Вы можете также подписаться на наш канал в .',
      ),
    ).toBeInTheDocument();
    expect(getByText('IOS')).toBeInTheDocument();
    expect(getByText('Android')).toBeInTheDocument();
    expect(getByText('Telegram')).toBeInTheDocument();
  });
  it('should render links correctly', () => {
    const { getAllByRole } = renderComponent();
    expect(getAllByRole('link').length).toBe(3);
  });
  it('should not render the disclaimer when the disclaimer toggle is not enabled', () => {
    const { container } = renderComponent({ enabled: false });
    expect(container).toBeEmptyDOMElement();
  });
  it('should not render when disclaimer is null', () => {
    // @ts-expect-error - not expecting null
    const { container } = renderComponent({ enabled: true }, null);
    expect(container).toBeEmptyDOMElement();
  });
  it('should not render when disclaimer is empty object', () => {
    // @ts-expect-error - not expecting empty object
    const { container } = renderComponent({ enabled: true }, {});
    expect(container).toBeEmptyDOMElement();
  });
  it('should render links with external label if links are external', () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText('IOS, внешняя')).toBeInTheDocument();
  });
});
