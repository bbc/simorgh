import { act } from '@testing-library/react';

import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import { render } from '../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MostReadPage from './MostReadPage';

jest.mock('#lib/analyticsUtils', () => {
  return {
    ...jest.requireActual('#lib/analyticsUtils'),
  };
});

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const MostReadPageWithContext = () => (
  <ToggleContextProvider>
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={false}
        pageType={MOST_READ_PAGE}
        pathname="/pathname"
        service="pidgin"
        statusCode={200}
      >
        <MostReadPage pageData={pidginMostReadData} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

describe('Most Read Page Main', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => pidginMostReadData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should match snapshot for most read page', () => {
    const { container } = render(<MostReadPageWithContext service="pidgin" />, {
      service: 'pidgin',
    });

    expect(container).toMatchSnapshot();
  });

  it('shoulder render most read page', async () => {
    let container;
    await act(async () => {
      container = await render(<MostReadPageWithContext service="pidgin" />, {
        service: 'pidgin',
      }).container;
    });

    expect(container.querySelector('h1').textContent).toEqual(
      'Di one wey dem dey read well well',
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li a').length).toEqual(5);
  });
});
