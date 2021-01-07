import React from 'react';
import { render } from '@testing-library/react';
import RecentAudioEpisodes from '.';
import { indonesian, zhongwen } from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({
  masterBrand,
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
      <RecentAudioEpisodes masterBrand={masterBrand} episodes={episodes} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('RecentAudioEpisodes', () => {
  it('should render the translated section label', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
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
      />,
    );

    expect(container.querySelectorAll('li').length).toEqual(4);
  });

  it('should render the episode title when supplied', async () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
      />,
    );

    const episodeTitle = getByText('Wednesday Evening');
    expect(episodeTitle).toBeInTheDocument();
  });

  it('should render the list item links', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
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

  it('should render the correct list item links for services with variants', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_cantonese_radio"
        episodes={zhongwen}
        service="zhongwen"
        variant="trad"
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
      />,
    );

    const visuallyHiddenAudioLabel = getAllByText('Audio,');
    const visuallyHiddenDate = getAllByText('Durasi 15,30');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should aria-hide the duration', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        masterBrand="bbc_indonesian_radio"
        episodes={indonesian}
        service="indonesia"
      />,
    );

    const hiddenDuration = container.querySelector('span[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('Durasi 15:30');
  });
});
