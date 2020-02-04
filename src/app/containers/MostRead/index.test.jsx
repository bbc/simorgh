import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';
import {
  setFreshPromoTimestamp,
  renderMostReadContainer,
} from './utilities/testHelper';

let container;

const services = {
  news: {
    variant: null,
    data: newsMostReadData,
  },
  zhongwen: {
    variant: 'simp',
    data: zhongwenSimpMostReadData,
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
      const { variant, data: mostReadData } = services[service];

      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

      await renderMostReadContainer({
        container,
        isAmp: false,
        service,
        variant,
        mostReadToggle: true,
      });

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
      expect(container.innerHTML).toEqual('');
    });
  });
});
