import arabicMostReadData from '#data/arabic/mostRead';

import {
  setFreshPromoTimestamp,
  renderMostReadContainer,
} from './utilities/testHelpers';
import { service as arabicConfig } from '#lib/config/services/arabic';

const services = {
  arabic: {
    variant: null,
    data: arabicMostReadData,
    config: arabicConfig.default,
    expectedLastUpdated: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
  },
};

describe('MostReadContainerCanonical', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
    fetch.resetMocks();
  });

  Object.keys(services).forEach(service => {
    it(`renders most read as expected on canonical for ${service}`, async () => {
      const { variant, data: mostReadData, config } = services[service];
      const mostReadHeader = config.mostRead.header;
      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

      await renderMostReadContainer({
        container,
        isAmp: false,
        service,
        variant,
        mostReadToggle: true,
      });

      expect(container.querySelector('h2').textContent).toEqual(mostReadHeader);
      expect(container.querySelectorAll('li').length).toEqual(
        config.mostRead.numberOfItems,
      );
      expect(container).toMatchSnapshot();
    });

    it(`should return empty string when mostRead feature toggle is disabled - ${service}`, async () => {
      const { variant } = services[service];
      await renderMostReadContainer({
        container,
        isAmp: false,
        service,
        variant,
      });
      expect(container.querySelectorAll('li').length).toEqual(0);
      expect(container.innerHTML).toEqual('');
    });

    it(`should return empty string on AMP pages - ${service}`, async () => {
      const { variant } = services[service];
      await renderMostReadContainer({
        container,
        isAmp: true,
        service,
        variant,
      });
      expect(container.querySelectorAll('li').length).toEqual(0);
      expect(container.innerHTML).toEqual('');
    });
  });

  it(`should return empty string when mostRead service toggle is disabled`, async () => {
    await renderMostReadContainer({
      container,
      isAmp: false,
      service: 'archive', // hasMostRead = false for this service
    });
    expect(container.querySelectorAll('li').length).toEqual(0);
    expect(container.innerHTML).toEqual('');
  });
});
