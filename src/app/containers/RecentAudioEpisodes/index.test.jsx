import React from 'react';
import { render } from '@testing-library/react';
import RecentAudioEpisodes from '.';
import recentAudioFixtures from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({ episodes }) => (
  <ServiceContextProvider service="indonesia">
    <RecentAudioEpisodes
      masterBrand="bbc_indonesian_radio"
      episodes={episodes}
    />
  </ServiceContextProvider>
);

describe('RecentAudioEpisodes', () => {
  it('should render the translated section label', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
    );

    const recentEpisodesLabel = getByText('Siaran sebelumnya');
    expect(recentEpisodesLabel).toBeInTheDocument();
  });

  it('should render the list items', async () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
    );

    expect(container.querySelectorAll('li').length).toEqual(4);
  });

  it('should render the episode title when supplied', async () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
    );

    const episodeTitle = getByText('Wednesday Evening');
    expect(episodeTitle).toBeInTheDocument();
  });

  it('should render the list item links', async () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
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

  it('should include the visually hidden audio and date', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
    );

    const visuallyHiddenAudioLabel = getAllByText('Audio,');
    const visuallyHiddenDate = getAllByText('Durasi 15,30');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should aria-hide the duration', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext episodes={recentAudioFixtures} />,
    );

    const hiddenDuration = container.querySelector('span[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('Durasi 15:30');
  });
});
