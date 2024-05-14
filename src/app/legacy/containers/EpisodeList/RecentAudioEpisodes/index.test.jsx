import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { indonesian, zhongwen, arabic } from './fixtures';
import RecentAudioEpisodes from '.';

const RecentAudioEpisodesWithContext = ({
  masterBrand,
  brandId,
  pageType,
  episodes,
  service,
  variant,
}) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      service={service}
      pageType="media"
      pathname={`/${service}`}
      isAmp={false}
      variant={variant}
    >
      <ToggleContextProvider
        toggles={{
          eventTracking: {
            enabled: true,
          },
        }}
      >
        <RecentAudioEpisodes
          masterBrand={masterBrand}
          episodes={episodes}
          brandId={brandId}
          pageType={pageType}
        />
      </ToggleContextProvider>
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('RecentAudioEpisodes', () => {
  it('should render audio episodes correctly', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the translated section label', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    const recentEpisodesLabel = getByText('Siaran sebelumnya');
    expect(recentEpisodesLabel).toBeInTheDocument();
  });

  it('should render the list items', async () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(container.querySelectorAll('li').length).toEqual(4);
  });

  it('should not render a list when there is only one episode', () => {
    const { queryByRole } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={[indonesian[0]]}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render the episode title when supplied', async () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    const episodeTitle = getByText('Wednesday Evening');
    expect(episodeTitle).toBeInTheDocument();
  });

  it('should render the brand title', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(getAllByText('Dunia Pagi Ini')[0]).toBeInTheDocument();
  });

  it('should render the correct list item links for OD Radio', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    const links = getAllByText('Dunia Pagi Ini').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/indonesia/bbc_indonesian_radio/w172xnm8j4tz686',
      'http://localhost/indonesia/bbc_indonesian_radio/w172xnm84wjrkv2',
      'http://localhost/indonesia/bbc_indonesian_radio/w172xnm84wjrg2y',
      'http://localhost/indonesia/bbc_indonesian_radio/w172xnm84wjgw3s',
    ]);
  });

  it('should render the correct list item links for OD Radio services with variants', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_cantonese_radio"
        episodes={zhongwen}
        service="zhongwen"
        variant="trad"
        pageType="On Demand Radio"
      />,
    );

    const links = getAllByText('時事一周').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/zhongwen/trad/bbc_cantonese_radio/w172xn6kwd4bx3h',
      'http://localhost/zhongwen/trad/bbc_cantonese_radio/w172xn6kj3tkrhn',
    ]);
  });

  it('should include the visually hidden audio and date', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    const visuallyHiddenAudioLabel = getAllByText('Audio,');
    const visuallyHiddenDate = getAllByText('Durasi 15,30');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should render the correct list item links for podcasts', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        brandId="p02pc9qc"
        masterBrand="bbc_arabic_radio"
        episodes={arabic}
        service="arabic"
        pageType="Podcast"
      />,
    );

    const links = getAllByText('BBC Xtra').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/arabic/podcasts/p02pc9qc/p094gcc1',
      'http://localhost/arabic/podcasts/p02pc9qc/p094c9sr',
      'http://localhost/arabic/podcasts/p02pc9qc/p0940sdx',
      'http://localhost/arabic/podcasts/p02pc9qc/p093szlg',
      'http://localhost/arabic/podcasts/p02pc9qc/p093q652',
      'http://localhost/arabic/podcasts/p02pc9qc/p093cdkh',
      'http://localhost/arabic/podcasts/p02pc9qc/p09343mp',
      'http://localhost/arabic/podcasts/p02pc9qc/p0930xyh',
    ]);
  });

  it('should render the correct list item links for podcast services with variants', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        brandId="p0340tsy"
        masterBrand="bbc_cantonese_radio"
        episodes={zhongwen}
        service="zhongwen"
        variant="trad"
        pageType="Podcast"
      />,
    );

    const links = getAllByText('時事一周').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/zhongwen/trad/podcasts/p0340tsy/w172xn6kwd4bx3h',
      'http://localhost/zhongwen/trad/podcasts/p0340tsy/w172xn6kj3tkrhn',
    ]);
  });

  it('should render the media indicator', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs).toHaveLength(4);
  });

  it('should render the duration', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(getAllByText('Durasi 15:30')[0]).toBeInTheDocument();
  });

  it('should render the date', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(getByText('17 November 2020')).toBeInTheDocument();
  });

  it('should not render a border when list contains only one element', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={[indonesian[0]]}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );
    const wrappingDiv = container.querySelector("div[class*='Wrapper']");
    expect(wrappingDiv.style.borderBottom).toBe('');
  });

  it('should render a border between two DateTimeDuration elements when there is an episode title', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );
    const spanEl = getByText('17 November 2020');
    const style = window.getComputedStyle(spanEl);

    expect(style.borderLeft).toBe('0.0625rem solid #AEAEB5');
    expect(style.borderRight).toBe('');
  });

  it('should aria-hide the duration', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    const hiddenDuration = container.querySelector('span[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('Durasi 15:30');
  });

  it('should render a span with role=text to avoid text splitting in screenreaders', () => {
    const { getAllByRole } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
      />,
    );

    expect(getAllByRole('text')[0].closest('a')).toBeInTheDocument();
  });

  it('should include the data-e2e attribute if passed', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
        pageType="On Demand Radio"
        ulProps={{ 'data-e2e': 'recent-episode-list' }}
        liProps={{ 'data-e2e': 'recent-episode-list-item' }}
      />,
    );

    expect(container.querySelector('ul')).toHaveAttribute(
      'data-e2e',
      'recent-episodes-list',
    );
    expect(container.querySelector('li')).toHaveAttribute(
      'data-e2e',
      'recent-episodes-list-item',
    );
  });
});

describe('Event Tracking', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
  const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

  it('should call the event tracking hooks with the correct params on a podcast page', () => {
    const expectedEventTrackingData = {
      componentName: 'episodes-audio',
      campaignID: 'player-episode-podcast',
    };

    render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        pageType="Podcast"
        episodes={indonesian}
        service="indonesia"
      />,
    );

    expect(viewTrackerSpy).toHaveBeenCalledTimes(1);
    expect(viewTrackerSpy).toHaveBeenCalledWith(expectedEventTrackingData);
    expect(clickTrackerSpy).toHaveBeenCalledTimes(1);
    expect(clickTrackerSpy).toHaveBeenCalledWith(expectedEventTrackingData);
  });

  it('should call the event tracking hooks with the correct params on an od radio page', () => {
    const expectedEventTrackingData = {
      componentName: 'episodes-audio',
      campaignID: 'player-episode-radio',
    };

    render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        pageType="On Demand Radio"
        episodes={indonesian}
        service="indonesia"
      />,
    );

    expect(viewTrackerSpy).toHaveBeenCalledTimes(1);
    expect(viewTrackerSpy).toHaveBeenCalledWith(expectedEventTrackingData);
    expect(clickTrackerSpy).toHaveBeenCalledTimes(1);
    expect(clickTrackerSpy).toHaveBeenCalledWith(expectedEventTrackingData);
  });
});
