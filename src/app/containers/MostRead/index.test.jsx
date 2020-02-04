import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';
import { service as newsConfig } from '#app/lib/config/services/news';
import { service as zhongwenConfig } from '#app/lib/config/services/zhongwen';
import {
  setFreshPromoTimestamp,
  renderMostReadContainer,
} from './utilities/testHelper';

let container;

const services = {
  news: {
    variant: null,
    data: newsMostReadData,
    config: newsConfig.default,
  },
  zhongwen: {
    variant: 'simp',
    data: zhongwenSimpMostReadData,
    config: zhongwenConfig.simp,
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

    it(`should return empty string when mostRead toggle is disabled - ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];
      fetch.mockResponse(JSON.stringify(mostReadData));
      await renderMostReadContainer({
        container,
        isAmp: false,
        service,
        variant,
      });
      expect(container.querySelectorAll('li').length).toEqual(0);
      expect(container.innerHTML).toEqual('');
    });
  });
});
