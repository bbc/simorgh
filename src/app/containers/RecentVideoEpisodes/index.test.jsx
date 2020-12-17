import React from 'react';
import { render } from '@testing-library/react';
import RecentVideoEpisodes from '.';
import recentVideoFixtures from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';

/* eslint-disable react/prop-types */
const RecentVideoEpisodesWithContext = ({ episodes }) => (
  <ServiceContextProvider service="afrique">
    <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={episodes} />
  </ServiceContextProvider>
);

describe('RecentAudioEpisodes', () => {
  it('should render the translated section label', () => {
    const { getByText } = render(
      <RecentVideoEpisodesWithContext episodes={recentVideoFixtures} />,
    );

    const recentEpisodesLabel = getByText('Editions Précédentes');
    expect(recentEpisodesLabel).toBeInTheDocument();
  });

  it('should render the list items', async () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={recentVideoFixtures} />,
    );

    expect(container.querySelectorAll('li').length).toEqual(3);
  });

  it('should render the list item links', async () => {
    const { getAllByText } = render(
      <RecentVideoEpisodesWithContext episodes={recentVideoFixtures} />,
    );

    const links = getAllByText('BBC Info').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2gllfk',
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2ghpjg',
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2gdsmc',
    ]);
  });

  it('should include the visually hidden audio and date', () => {
    const { getAllByText } = render(
      <RecentVideoEpisodesWithContext episodes={recentVideoFixtures} />,
    );

    const visuallyHiddenAudioLabel = getAllByText('Vidéo,');
    const visuallyHiddenDate = getAllByText('Durée 15,00');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should aria-hide the duration on the video', () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={recentVideoFixtures} />,
    );

    const hiddenDuration = container.querySelector('div[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('15:00');
  });
});
