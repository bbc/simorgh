import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import RecentAudioEpisodes from '.';
import { indonesian, zhongwen, arabic } from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

/* eslint-disable react/prop-types */
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
      <RecentAudioEpisodes
        masterBrand={masterBrand}
        episodes={episodes}
        brandId={brandId}
        pageType={pageType}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('RecentAudioEpisodes', () => {
  shouldMatchSnapshot(
    'should render audio episodes correctly',
    <RecentAudioEpisodesWithContext episodes={indonesian} />,
  );
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
});
