import newsMostReadData from '#data/news/mostRead';
import { service as arabicConfig } from '#app/lib/config/services/arabic';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  renderMostReadContainer,
} from '../utilities/testHelpers';

let container;

const services = {
  arabic: {
    variant: null,
    data: newsMostReadData,
    config: arabicConfig.default,
    expectedLastUpdated: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
  },
};

describe('MostReadContainerCanonical', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
    fetch.resetMocks();
  });

  Object.keys(services).forEach(service => {
    it(`should not render most read when lastRecordTimeStamp is not fresh for ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];

      fetch.mockResponse(JSON.stringify(mostReadData));

      await renderMostReadContainer({
        container,
        isAmp: false,
        service,
        variant,
        mostReadToggle: true,
      });

      expect(container.innerHTML).toEqual('');
    });

    it(`should render items without timestamps for ${service}`, async () => {
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
      expect(container.querySelectorAll('time').length).toEqual(0);
    });

    it(`should render items with timestamps as they are older than 60 days for ${service}`, async () => {
      const {
        variant,
        data: mostReadData,
        config,
        expectedLastUpdated,
      } = services[service];
      const mostReadHeader = config.mostRead.header;

      fetch.mockResponse(JSON.stringify(setStalePromoTimestamp(mostReadData)));

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
      expect(container.querySelectorAll('time')[0].textContent).toEqual(
        expectedLastUpdated,
      );
    });
  });
});
