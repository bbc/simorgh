import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';
import { service as newsConfig } from '#app/lib/config/services/news';
import { service as zhongwenConfig } from '#app/lib/config/services/zhongwen';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  renderMostReadContainer,
} from '../utilities/testHelpers';

let container;

const services = {
  news: {
    variant: null,
    data: newsMostReadData,
    config: newsConfig.default,
    expectedLastUpdated: 'Last updated: 11 January 1970',
  },
  zhongwen: {
    variant: 'simp',
    data: zhongwenSimpMostReadData,
    config: zhongwenConfig.simp,
    expectedLastUpdated: '最近更新： 1970年1月11日',
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
