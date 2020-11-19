import React from 'react';
import { render } from '@testing-library/react';
import RecentAudioEpisodes from '.';
import recentAudioFixtures from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({ episodes }) => (
  <ServiceContextProvider service="indonesia">
    <RecentAudioEpisodes episodes={episodes} />
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
