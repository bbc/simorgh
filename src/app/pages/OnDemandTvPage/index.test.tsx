import pashtoPageData from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import { Services } from '#app/models/types/global';
import {
  act,
  render,
} from '../../components/react-testing-library-with-providers';
import _OnDemandTvPage, { OnDemandTVProps } from './OnDemandTvPage';

const pageType = TV_PAGE;

const OnDemandTvPage = withMediaError(_OnDemandTvPage);

const toggles = {
  recentVideoEpisodes: {
    enabled: false,
    value: 4,
  },
};

interface Props {
  pageData: OnDemandTVProps['pageData'];
  service: Services;
}

const renderPage = async ({ pageData, service }: Props) => {
  let result;
  await act(async () => {
    result = render(<OnDemandTvPage pageData={pageData} />, {
      bbcOrigin: 'https://www.test.bbc.com',
      derivedPageType: 'On Demand TV',
      pageType,
      pathname: '/pathname',
      service,
      statusCode: 200,
      toggles,
    });
  });

  return result;
};

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const { env } = process;

describe('OnDemand TV Page ', () => {
  beforeEach(() => {
    process.env = { ...env };
  });

  it('a11y - should render a visually hidden headline', async () => {
    await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    const visuallyHiddenHeadline = document.querySelector(
      'h1[class*="visuallyHiddenText"]',
    );

    expect(visuallyHiddenHeadline).toBeInTheDocument();
    expect(visuallyHiddenHeadline?.innerHTML).toEqual(
      ' د بي بي سي خبرونه , ۲۱ نومبر ۲۰۲۴',
    );
  });

  it('should show the brand title for OnDemand TV Pages', async () => {
    const { getByTestId } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    const brandTitle = getByTestId('brand-title');

    expect(brandTitle).toBeInTheDocument();
    expect(brandTitle).toHaveTextContent('د بي بي سي خبرونه');
  });

  it('a11y - should aria-hide the title', async () => {
    const { container } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    const hiddenHeadline = container.querySelector('strong[aria-hidden=true]');

    expect(hiddenHeadline).toBeDefined();
    expect(hiddenHeadline).toContainHTML('د بي بي سي خبرونه');
  });

  it('a11y - should have a "content" id on the h1', async () => {
    const { container } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    expect(container.querySelector('h1#content')).toBeDefined();
  });

  it('Dark Mode Design - should match snapshot', async () => {
    const { container } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    expect(container).toMatchSnapshot();
  });

  it('should show the datestamp correctly for Pashto OnDemand TV Pages', async () => {
    const { getByText } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    expect(getByText('۲۱ نومبر ۲۰۲۴')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand TV Pages', async () => {
    const { getByText } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    expect(
      getByText('نړۍ دا وخت، د نړۍ او سیمې وروستۍ پرمختیاوې یادوي'),
    ).toBeInTheDocument();
  });

  it('should show the video player', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const { container } = await renderPage({
      pageData: pashtoPageData?.data as unknown as OnDemandTVProps['pageData'],
      service: 'pashto',
    });

    const videoPlayer = container.querySelector(
      '[data-e2e="media-loader__container"]',
    );

    expect(videoPlayer).toBeInTheDocument();
  });

  it('should show the expired content message if episode is expired', async () => {
    const pageData = {
      ...pashtoPageData?.data,
      episodeAvailability: 'expired',
    } as unknown as OnDemandTVProps['pageData'];

    const { container, getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });
    const expiredMessageEl = getByText('دغه فایل نور د لاسرسي وړ نه دی.');

    expect(expiredMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show the future content message if episode is not yet available', async () => {
    const pageData = {
      ...pashtoPageData?.data,
      episodeAvailability: 'not-yet-available',
    } as unknown as OnDemandTVProps['pageData'];

    const { container, getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });
    const notYetAvailableEl = getByText(
      'دغه پروګرام د خپرولو لپاره چمتو نه دی.',
    );

    expect(notYetAvailableEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
